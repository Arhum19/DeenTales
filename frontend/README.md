## Group Members

- **Eishal Khan** (SP23-BSCS-0031)  
- **Muhammad Bassam Yousaf** (SP23-BSCS-0072)  
- **Arhum bin Abid** (SP23-BSCS-0040)  
- **Safiyah Asif Khan** (SP23-BSCS-0037)  
- **Waniya Khan** (SP23-BSCS-0010)
# DeenTales Frontend

React frontend application for DeenTales AI-powered storytelling and visual creation platform.


## Features

- **Landing Page**: Showcase features with hero section, features, and visuals
- **Authentication**: Login, Signup, and Google OAuth support
- **AI Chat**: GPT-like interface for interactive storytelling
- **Image Generation**: AI-powered visual creation
- **Try Free**: Demo interface for users to try features without signup

## Tech Stack

- **Framework**: React 18 with Vite
- **Routing**: React Router v6
- **State Management**: React Context API
- **Styling**: CSS Modules

## Project Structure

```
frontend/
├── public/
│   ├── images/
│   │   ├── public/          # Public assets
│   │   └── private/         # User-generated content
│   └── index.html
│
├── src/
│   ├── assets/              # Static assets
│   ├── components/          # Reusable components
│   │   ├── Navbar/
│   │   ├── HeroSection/
│   │   ├── Features/
│   │   ├── VisualsSection/
│   │   ├── TryNow/
│   │   └── Footer/
│   │
│   ├── pages/               # Page components
│   │   ├── Home/
│   │   ├── Login/
│   │   ├── Signup/
│   │   ├── OAuth/
│   │   ├── MainChat/
│   │   └── TryFree/
│   │
│   ├── context/             # React contexts
│   │   ├── AuthContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── ChatContext.jsx
│   │
│   ├── hooks/               # Custom hooks
│   │   ├── useFetch.js
│   │   ├── useLocalStorage.js
│   │   └── useDebounce.js
│   │
│   ├── services/            # API services
│   │   ├── authService.js
│   │   ├── chatService.js
│   │   └── imageService.js
│   │
│   ├── styles/              # Global styles
│   ├── App.jsx
│   ├── main.jsx
│   └── router.js
│
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

3. Update the `.env` file with your backend API URL:

```
VITE_API_URL=http://localhost:8000
```

### Development

Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Available Routes

- `/` - Home page
- `/login` - Login page
- `/signup` - Signup page
- `/oauth` - OAuth callback handler
- `/chat` - Main chat interface (requires authentication)
- `/try-free` - Free trial interface

## API Integration

The frontend communicates with the backend through service files located in `src/services/`:

- **authService**: Handles authentication (login, signup, OAuth)
- **chatService**: Manages AI chat interactions
- **imageService**: Handles image generation requests

All services use the `VITE_API_URL` environment variable for the backend endpoint.

## Context Providers

- **AuthContext**: Manages user authentication state
- **ThemeContext**: Handles light/dark theme switching
- **ChatContext**: Manages chat conversations and messages

## Custom Hooks

- **useFetch**: Generic hook for API data fetching
- **useLocalStorage**: Hook for localStorage persistence
- **useDebounce**: Hook for debouncing values

## License

Copyright © 2025 DeenTales. All rights reserved.
