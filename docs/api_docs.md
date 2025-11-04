# DeenTales API Documentation

## Overview

DeenTales API provides AI-powered storytelling and visual creation capabilities.

## Base URL

```
http://localhost:8000
```

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <access_token>
```

## Endpoints

### Authentication

#### Register User

```http
POST /api/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "securepassword123"
}
```

Response:

```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "created_at": "2025-10-31T00:00:00",
  "is_active": true,
  "is_verified": false
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

Response:

```json
{
  "access_token": "eyJhbGci...",
  "token_type": "bearer",
  "user": { ... }
}
```

### Chat

#### Send Message

```http
POST /api/chat/message
Authorization: Bearer <token>
Content-Type: application/json

{
  "message": "Tell me a story",
  "conversation_id": "optional-uuid"
}
```

#### Create Conversation

```http
POST /api/chat/conversation
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My Story"
}
```

### Image Generation

#### Generate Image

```http
POST /api/image/generate
Authorization: Bearer <token>
Content-Type: application/json

{
  "prompt": "A beautiful sunset over mountains",
  "size": "1024x1024",
  "style": "realistic"
}
```

## Error Responses

All endpoints return standard HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

Error format:

```json
{
  "detail": "Error message"
}
```

## Rate Limiting

- Free tier: 10 requests/minute
- Authenticated: 100 requests/minute

## Webhooks

(Coming soon)

## SDKs

(Coming soon)
