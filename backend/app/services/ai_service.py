# AI Service - Handles OpenRouter GPT and Hugging Face Image Generation
import httpx
import re
import hashlib
import base64
import io
import asyncio
from typing import List, Tuple, Optional
from datetime import datetime, timedelta
from huggingface_hub import InferenceClient
from app.config import settings


# Initialize Hugging Face client
def get_hf_client():
    """Get Hugging Face InferenceClient with fal-ai provider"""
    if settings.HF_TOKEN:
        return InferenceClient(
            provider=settings.HF_PROVIDER,
            api_key=settings.HF_TOKEN,
        )
    return None


# ==================== Simple In-Memory Cache ====================
class AIResponseCache:
    """
    Simple in-memory cache for AI responses.
    Avoids repeated API calls for identical questions.
    
    Note: For production, consider using Redis for distributed caching.
    """
    
    def __init__(self, max_size: int = 100, ttl_hours: int = 24):
        self._cache: dict = {}
        self._max_size = max_size
        self._ttl = timedelta(hours=ttl_hours)
    
    def _generate_key(self, message: str) -> str:
        """Generate cache key from message (normalized lowercase hash)"""
        normalized = message.lower().strip()
        return hashlib.md5(normalized.encode()).hexdigest()
    
    def get(self, message: str) -> Optional[Tuple[str, List[str], List[str]]]:
        """Get cached response if exists and not expired"""
        key = self._generate_key(message)
        if key in self._cache:
            cached_data, timestamp = self._cache[key]
            if datetime.now() - timestamp < self._ttl:
                print(f"[CACHE HIT] Returning cached response for: {message[:50]}...")
                return cached_data
            else:
                # Expired, remove from cache
                del self._cache[key]
        return None
    
    def set(self, message: str, response: Tuple[str, List[str], List[str]]):
        """Cache a response"""
        # Evict oldest entries if cache is full
        if len(self._cache) >= self._max_size:
            oldest_key = min(self._cache.keys(), key=lambda k: self._cache[k][1])
            del self._cache[oldest_key]
        
        key = self._generate_key(message)
        self._cache[key] = (response, datetime.now())
        print(f"[CACHE SET] Cached response for: {message[:50]}...")
    
    def clear(self):
        """Clear all cached responses"""
        self._cache.clear()


# Global cache instance
ai_cache = AIResponseCache(max_size=200, ttl_hours=24)


# System prompt for Islamic storytelling chatbot
SYSTEM_PROMPT = """You are Deen Tales, an Islamic educational chatbot that tells stories from the Quran and Islamic history in an engaging, accurate, and respectful manner.

Guidelines:
1. Always provide accurate information based on authentic Islamic sources (Quran and Hadith)
2. Include Quranic references with Surah name and verse numbers (e.g., "Quran 37:139-148")
3. When telling stories of Prophets, always say "peace be upon him" or "(PBUH)" after their names
4. Structure your responses clearly with numbered sections for stories
5. Be respectful and educational in tone
6. If asked about something outside Islamic knowledge, politely redirect to Islamic topics
7. For stories, break them into clear parts: The Beginning, The Trial, The Lesson, The Conclusion

Response Format:
- Start with a brief introduction
- Use numbered sections for story parts
- Include **Quranic Reference:** tags for each relevant versex`
- End with a moral/lesson when appropriate

When I detect you're telling a story, I will also provide image prompts for illustration. For each major scene, suggest an image prompt in this format:
[IMAGE: description of scene in watercolor Islamic art style]"""


async def get_ai_response(user_message: str, chat_history: List[dict] = None, use_cache: bool = True) -> Tuple[str, List[str], List[str]]:
    """
    Get AI response from OpenRouter API
    
    Args:
        user_message: The user's message
        chat_history: Previous messages for context (optional)
        use_cache: Whether to use cached responses (default True)
    
    Returns:
        Tuple of (ai_response_text, references_list, image_prompts_list)
    """
    
    # Check cache first (only for messages without chat history for accuracy)
    if use_cache and not chat_history:
        cached = ai_cache.get(user_message)
        if cached:
            return cached
    
    if not settings.OPENROUTER_API_KEY:
        raise ValueError("OPENROUTER_API_KEY is not configured. Please add it to your .env file.")
    
    # Build messages array
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    
    # Add chat history for context (last 10 messages)
    if chat_history:
        for msg in chat_history[-10:]:
            messages.append({"role": "user", "content": msg.get("user_message", "")})
            if msg.get("ai_message"):
                messages.append({"role": "assistant", "content": msg.get("ai_message", "")})
    
    # Add current message
    messages.append({"role": "user", "content": user_message})
    
    async with httpx.AsyncClient(timeout=60.0) as client:
        response = await client.post(
            settings.OPENROUTER_BASE_URL,
            headers={
                "Authorization": f"Bearer {settings.OPENROUTER_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "model": settings.AI_MODEL,
                "messages": messages,
                "max_tokens": 2000,
                "temperature": 0.7,
            }
        )
        
        if response.status_code != 200:
            error_detail = response.text
            raise Exception(f"OpenRouter API error: {response.status_code} - {error_detail}")
        
        data = response.json()
        ai_text = data["choices"][0]["message"]["content"]
    
    # Extract Quranic references
    references = extract_references(ai_text)
    
    # Extract image prompts
    image_prompts = extract_image_prompts(ai_text)
    
    # Clean the response text (remove image prompt markers)
    clean_text = re.sub(r'\[IMAGE:[^\]]+\]', '', ai_text).strip()
    
    # Cache the response (only for standalone messages)
    result = (clean_text, references, image_prompts)
    if use_cache and not chat_history:
        ai_cache.set(user_message, result)
    
    return result


def extract_references(text: str) -> List[str]:
    """Extract Quranic and Hadith references from AI response"""
    references = []
    
    # Pattern for Quran references (e.g., "Quran 37:139-148", "Surah Al-Saffat 37:139")
    quran_pattern = r'(?:Quran|Surah)\s+(?:Al-)?[\w\-]+\s*\d+:\d+(?:-\d+)?'
    quran_refs = re.findall(quran_pattern, text, re.IGNORECASE)
    references.extend(quran_refs)
    
    # Pattern for Hadith references (e.g., "Sahih Bukhari 1234", "Sahih Muslim")
    hadith_pattern = r'(?:Sahih\s+)?(?:Bukhari|Muslim|Tirmidhi|Abu Dawud|Ibn Majah|Nasai)(?:\s+\d+)?'
    hadith_refs = re.findall(hadith_pattern, text, re.IGNORECASE)
    references.extend(hadith_refs)
    
    # Remove duplicates while preserving order
    seen = set()
    unique_refs = []
    for ref in references:
        if ref.lower() not in seen:
            seen.add(ref.lower())
            unique_refs.append(ref)
    
    return unique_refs


def extract_image_prompts(text: str) -> List[str]:
    """Extract image prompts from AI response"""
    pattern = r'\[IMAGE:\s*([^\]]+)\]'
    prompts = re.findall(pattern, text, re.IGNORECASE)
    return prompts


def detect_image_request(message: str) -> Tuple[bool, str]:
    """
    Detect if user is asking for an image directly
    
    Returns:
        Tuple of (is_image_request, extracted_prompt)
    """
    message_lower = message.lower()
    
    # Keywords that indicate direct image request
    image_keywords = [
        "generate image", "generate an image", "create image", "create an image",
        "make image", "make an image", "show image", "show me image",
        "draw", "picture of", "image of", "illustration of",
        "generate the image", "create the image"
    ]
    
    for keyword in image_keywords:
        if keyword in message_lower:
            # Extract the subject after the keyword
            idx = message_lower.find(keyword)
            subject = message[idx + len(keyword):].strip()
            # Clean up common words
            for word in ["of", "a", "an", "the", "showing", "with"]:
                if subject.lower().startswith(word + " "):
                    subject = subject[len(word) + 1:]
            return True, subject if subject else message
    
    return False, ""


async def generate_image_with_huggingface(prompt: str, is_direct_request: bool = False) -> Optional[str]:
    """
    Generate a single image using Hugging Face InferenceClient with fal-ai provider
    
    Args:
        prompt: The image description prompt
        is_direct_request: If True, generate realistic image; if False, use Islamic art style
        
    Returns:
        Base64 data URL of the generated image, or None if failed
    """
    client = get_hf_client()
    if not client:
        print("[IMAGE ERROR] HF_TOKEN not configured")
        return None
    
    # Enhance prompt based on request type
    if is_direct_request:
        # For direct requests, generate more realistic/specific images
        enhanced_prompt = f"{prompt}, high quality, detailed, beautiful lighting, professional photography style"
    else:
        # For story illustrations, use Islamic art style
        enhanced_prompt = f"{prompt}, watercolor Islamic art style, peaceful spiritual atmosphere, no human faces shown, artistic illustration, soft colors, beautiful scenery"
    
    try:
        # Run synchronous HF client in thread pool to not block async
        loop = asyncio.get_event_loop()
        image = await loop.run_in_executor(
            None,
            lambda: client.text_to_image(
                enhanced_prompt,
                model=settings.HF_IMAGE_MODEL,
            )
        )
        
        # Convert PIL Image to base64
        buffer = io.BytesIO()
        image.save(buffer, format="PNG")
        buffer.seek(0)
        base64_image = base64.b64encode(buffer.getvalue()).decode('utf-8')
        return f"data:image/png;base64,{base64_image}"
        
    except Exception as e:
        print(f"[IMAGE ERROR] Failed to generate image: {str(e)}")
        return None


async def generate_images(prompts: List[str], max_images: int = 4, is_direct_request: bool = False) -> List[str]:
    """
    Generate multiple images using Hugging Face API
    
    Args:
        prompts: List of image description prompts
        max_images: Maximum number of images to generate (default 4)
        is_direct_request: Whether this is a direct image request from user
    
    Returns:
        List of base64 data URLs for generated images
    """
    images = []
    
    for prompt in prompts[:max_images]:
        print(f"[IMAGE] Generating: {prompt[:50]}...")
        image_url = await generate_image_with_huggingface(prompt, is_direct_request)
        if image_url:
            images.append(image_url)
            print(f"[IMAGE] Successfully generated image for: {prompt[:30]}...")
        else:
            print(f"[IMAGE] Failed to generate image for: {prompt[:30]}...")
    
    return images


async def generate_story_images(story_text: str, num_images: int = 4, is_direct_request: bool = False) -> List[str]:
    """
    Generate images for a story based on key scenes
    
    If the AI didn't provide [IMAGE:] tags, generate prompts from the story content.
    """
    # First try to extract explicit image prompts
    prompts = extract_image_prompts(story_text)
    
    # If no prompts found, generate some based on story sections
    if not prompts:
        # Look for numbered sections and create prompts from them
        sections = re.findall(r'\d+\.\s*\*?\*?([^\n\*]+)', story_text)
        for section in sections[:num_images]:
            # Create a prompt from the section title
            clean_section = section.strip().replace('*', '')
            prompts.append(f"Islamic story illustration: {clean_section}")
    
    # If still no prompts, create generic ones based on story keywords
    if not prompts:
        # Extract key Islamic terms
        if "prophet" in story_text.lower() or "musa" in story_text.lower():
            prompts = [
                "Islamic illustration of parting sea with divine light",
                "Watercolor of desert landscape with spiritual atmosphere",
                "Islamic art of ocean waves parting miraculously",
                "Peaceful illustration of believers walking on dry path through sea"
            ]
        else:
            prompts = ["Islamic spiritual illustration with peaceful scenery"]
    
    return await generate_images(prompts, max_images=num_images, is_direct_request=is_direct_request)


async def generate_direct_image(prompt: str) -> List[str]:
    """
    Generate image for direct user request (not story illustration)
    
    Args:
        prompt: The user's image request
        
    Returns:
        List with single image URL
    """
    return await generate_images([prompt], max_images=1, is_direct_request=True)
