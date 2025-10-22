# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Location

The main application is located at: `Inner-voice/Chatbot/`
The backend API server is located at: `Inner-voice/Backend/`

## Commands

### Frontend (Chatbot)
- `npm i` - Install dependencies
- `npm run dev` - Start development server (Vite, runs on port 3000)
- `npm run build` - Build the application for production

Note: No separate lint, test, or typecheck commands are configured in package.json. The project uses basic Vite setup.

### Backend (API Server)
- `npm i` - Install dependencies
- `npm run dev` - Start development server with hot reload (tsx watch, runs on port 5000)
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with initial data
- `npm run lint` - Lint TypeScript files
- `npm run lint:fix` - Fix linting issues
- `npm run type-check` - TypeScript type checking
- `npm test` - Run tests with Jest
- `npm run test:watch` - Run Jest in watch mode

Backend requires Node.js >= 18.0.0 and uses PostgreSQL, Redis, and OpenAI API.

## Google OAuth Setup

The application supports Google OAuth 2.0 for authentication. To set it up:

### 1. Google Cloud Console Configuration
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Configure OAuth consent screen with app name, logo, and support email
6. Add authorized JavaScript origins:
   - Development: `http://localhost:3000`
   - Production: `https://your-domain.com`
7. Add authorized redirect URIs:
   - Development: `http://localhost:5000/api/auth/google/callback`
   - Production: `https://your-api-domain.com/api/auth/google/callback`

### 2. Environment Variables
**Backend (.env):**
```
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

**Frontend (.env):**
```
VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
```

### 3. Database Migration
Run the Google OAuth migration:
```bash
cd Backend
npm run db:migrate
```

This adds: `google_id`, `oauth_provider`, and `avatar_url` columns to the users table.

## Core Mission

**"A private AI companion for when you're distressed and don't want friends involved."**

Inner Voice is designed for those moments when you need emotional support but prefer not to burden friends or family. It provides a judgment-free, completely private space to express feelings, work through challenges, and receive empathetic guidance without the social complexities of human relationships.

### Why Inner Voice Exists

Sometimes you need to talk, but:
- You don't want to burden your friends with your problems
- You need support at 3 AM when no one is available
- You want privacy without judgment or social consequences
- You need guidance but aren't ready for professional therapy yet
- You want to process emotions before talking to real people

Inner Voice fills this gap: **private, always available, judgment-free emotional support.**

## Project Structure

This is a sophisticated React chatbot interface application featuring multiple AI character personalities. Built with Vite, TypeScript, and Tailwind CSS, it provides a private emotional support experience with three distinct AI companions.

### Core Architecture

- **Framework**: React 18 with TypeScript, built using Vite 6.3.5
- **Styling**: Tailwind CSS 3.4.4 with custom nature theme system and glass-morphism effects
- **UI Components**: Comprehensive Radix UI component library for accessible primitives
- **Icons**: Lucide React icon library
- **Build Tool**: Vite with React SWC plugin for fast development
- **Theme System**: Custom nature-based theme context with forest and mountain color palettes
- **Project Origin**: Based on a Figma design from https://www.figma.com/design/HCUxqSgaIedgzcFVYS6PbS/Chatbot-Interface-Draft

### Dependencies

#### Frontend Dependencies
- **React Ecosystem**: React 18.3.1, React DOM 18.3.1
- **UI Components**:
  - `@radix-ui/react-dialog` - Dialog/modal components
  - `@radix-ui/react-popover` - Popover components
  - `@radix-ui/react-select` - Select dropdown components
- **HTTP Client**: `axios` 1.12.2 - API communication with backend
- **Icons**: `lucide-react` 0.487.0 - Icon library
- **Authentication**: `@react-oauth/google` 0.12.2 - Google OAuth integration
- **Styling**: Tailwind CSS 3.4.4 with PostCSS and Autoprefixer

#### Frontend Dev Dependencies
- **Build Tools**: Vite 6.3.5, @vitejs/plugin-react-swc 3.10.2
- **TypeScript**: TypeScript 5.9.2 with React types
- **Types**: @types/node 20.10.0, @types/react 18.3.3, @types/react-dom 18.3.0
- **Minification**: Terser 5.36.0 for production builds

#### Backend Dependencies
- **Server**: Express 4.18.2 with CORS, Helmet, Compression
- **Authentication**: bcryptjs 2.4.3, jsonwebtoken 9.0.2, cookie-parser 1.4.6, express-session 1.18.2
- **OAuth**: passport 0.7.0, passport-google-oauth20 2.0.0, google-auth-library 10.4.0
- **Database**: pg 8.11.3 (PostgreSQL), Redis 4.6.10
- **AI Integration**: OpenAI 4.20.1
- **Security**: express-rate-limit 7.1.5, express-validator 7.0.1
- **Logging**: Winston 3.11.0
- **Utilities**: dotenv 16.3.1, uuid 9.0.1

#### Backend Dev Dependencies
- **TypeScript**: TypeScript 5.3.2 with tsx 4.6.0 for hot reload
- **Testing**: Jest 29.7.0 with ts-jest 29.1.1
- **Linting**: ESLint 8.54.0 with TypeScript plugins
- **Types**: Full type definitions for all backend dependencies

### File Structure

#### Frontend (Chatbot)
```
src/
├── App.tsx                           # Main application component with auth & theme
├── main.tsx                          # Application entry point
├── index.css                         # Tailwind CSS and global styles
├── components/
│   ├── ChatMessage.tsx               # Message display component
│   ├── Sidebar.tsx                   # Character selection sidebar
│   ├── TypingIndicator.tsx           # AI typing animation
│   ├── SendIcon.tsx                  # Send button icon
│   ├── Logo.tsx                      # Application logo component
│   ├── CharacterSwitchDialog.tsx     # Character switching confirmation dialog
│   ├── ErrorBoundary.tsx             # Error boundary wrapper
│   ├── SettingsPanel.tsx             # User settings panel
│   ├── SwitchRole.tsx                # Role switching component
│   ├── NatureThemeSelector.tsx       # Nature theme selection
│   ├── auth/                         # Authentication components
│   │   ├── AuthPage.tsx              # Authentication page wrapper
│   │   ├── Login.tsx                 # Login form component
│   │   └── Register.tsx              # Registration form component
│   ├── avatars/                      # Character avatar components
│   │   ├── BaseAvatar.tsx            # Base avatar component
│   │   ├── FoxAvatar.tsx             # Fox character avatar
│   │   ├── RabbitAvatar.tsx          # Rabbit character avatar
│   │   ├── SheepAvatar.tsx           # Sheep character avatar
│   │   └── index.ts                  # Avatar exports
│   └── ui/                           # Radix UI components
│       ├── Dialog.tsx                # Dialog component
│       └── Popover.tsx               # Popover component
├── contexts/
│   ├── ThemeContext.tsx              # Theme management context
│   └── AuthContext.tsx               # Authentication context with JWT
├── services/
│   ├── api.ts                        # Axios API client configuration
│   ├── authService.ts                # Authentication API service
│   └── chatService.ts                # Chat/messaging API service
├── types/
│   ├── Character.ts                  # Character type definitions
│   └── Auth.ts                       # Authentication type definitions
├── data/
│   └── characters.ts                 # Character data and configurations
├── themes/
│   └── nature-themes.ts              # Nature theme definitions
└── utils/
    └── responseGenerator.ts          # Fallback AI response generation (mock)
```

#### Backend (API Server)
```
src/
├── app.ts                            # Express application setup and middleware configuration
├── index.ts                          # Server startup and graceful shutdown handling
├── controllers/
│   ├── authController.ts             # Authentication endpoints
│   ├── chatController.ts             # Chat endpoints with OpenAI
│   └── userController.ts             # User profile and preferences endpoints
├── middleware/
│   └── auth.ts                       # JWT authentication middleware
├── models/
│   ├── User.ts                       # User database model
│   └── Usage.ts                      # Usage analytics model
├── routes/
│   ├── auth.ts                       # Auth routes
│   ├── chat.ts                       # Chat routes
│   └── user.ts                       # User routes
├── services/
│   ├── auth.ts                       # Authentication service
│   ├── database.ts                   # PostgreSQL connection and queries
│   └── redis.ts                      # Redis caching and session service
├── scripts/
│   └── migrate.ts                    # Database migration script
├── types/
│   ├── api.ts                        # API response type definitions
│   ├── character.ts                  # Character type definitions
│   ├── express.d.ts                  # Express type extensions
│   └── user.ts                       # User type definitions
└── utils/
    ├── config.ts                     # Configuration and environment variables
    ├── logger.ts                     # Winston logging utility
    └── response.ts                   # Standardized API response helpers
```

### Character System

The application features three distinct AI character personalities:

#### 1. Daisy (黛西) - The Sheep 🐑
- **Role**: The Nurturer
- **Personality**: Gentle, supportive, comforting, warm, caring
- **Color Theme**: Pink gradient (#FFA0C1, #FFB8D1)
- **Response Style**: Warm and caring, uses soft language, focuses on emotional comfort
- **Timing**: 2.5-3.5 second response delays
- **Specialties**: Emotional validation, daily check-ins, comfort responses

#### 2. Luna (月月) - The Rabbit 🐰
- **Role**: The Thoughtful Worrier
- **Personality**: Sensitive, detail-oriented, empathetic, anxious, understanding
- **Color Theme**: Lavender gradient (#B19CD9, #D1C4E9)
- **Response Style**: Gentle but thoughtful, acknowledges concerns, validates anxious feelings
- **Timing**: 4-5.5 second response delays (slower, more thoughtful)
- **Specialties**: Anxiety support, breathing exercises, worry categorization, coping strategies

#### 3. Zara (灵灵) - The Fox 🦊
- **Role**: The Clever Motivator
- **Personality**: Smart, confident, playful, solution-focused, energetic
- **Color Theme**: Orange gradient (#FF6B35, #FF8C69)
- **Response Style**: Encouraging and clever, uses analogies, slightly playful but focused
- **Timing**: 1.8-2.8 second response delays (quick, energetic)
- **Specialties**: Problem-solving framework, motivation boost, achievement celebration, confidence building

### State Management

The application uses React's built-in state management with sophisticated character-aware features:

- **Authentication State**: `AuthContext` manages user authentication, JWT tokens, and login/logout
- **Character State**: `currentCharacter` manages active AI personality
- **Message System**: `messages` array with character attribution and categorization
- **Session Management**: `sessionId` tracks conversation sessions across messages
- **Input Management**: `inputValue` for user text input with auto-focus for better UX
- **UI States**: `isTyping`, `sidebarCollapsed` for interface control
- **API Toggle**: `useRealAPI` switches between OpenAI backend and mock responses
- **Intelligent Responses**: Context-aware response generation based on user input analysis
- **Character Switching**: Dynamic character changes with personalized introductions from OpenAI

### Response Generation System

The application uses a dual-mode response system:

#### Backend API Mode (Primary - OpenAI Integration)
- **OpenAI GPT Integration**: Real AI responses powered by OpenAI API
- **Character-Specific Prompts**: Each character has unique system prompts and personalities
- **Context-Aware Conversations**: Full conversation history and session management
- **Category Classification**: AI responses are categorized (supportive, analytical, motivational, etc.)
- **Performance Tracking**: Response times logged and monitored
- **Session Persistence**: Redis-based session caching for conversation continuity

#### Fallback Mock Mode (Development/Testing)
- **Trigger Keywords**: Analyzes user input for emotional states (anxiety, problems, confusion, motivation)
- **Character-Specific Responses**: Each character has unique response pools with appropriate personality
- **Intelligent Timing**: Variable response delays matching character personalities (Sheep: 2.5-3.5s, Rabbit: 4-5.5s, Fox: 1.8-2.8s)
- **Context Awareness**: Response categorization based on keywords
- **Introduction Messages**: Personalized character introductions when switching

### Styling Approach

- **Tailwind CSS 3.4.4**: Modern utility-first CSS framework
- **Glass-morphism Design**: Backdrop-blur effects and semi-transparent overlays
- **Character Theming**: Color schemes matching each character's personality
- **Nature-Based Backgrounds**: Forest and Mountain theme gradients with layered textures
- **Responsive Layout**: Flexible sidebar and chat area
- **Chinese Language Interface**: Designed for Chinese text and typography
- **Shadow and Blur Effects**: Sophisticated visual depth with modern aesthetics

### Configuration Files

#### Frontend Configuration
- **`vite.config.ts`**: Vite configuration with `@` alias pointing to src/, React SWC plugin, port 3000 server, code splitting, Terser minification
- **`tsconfig.json`**: TypeScript configuration targeting ESNext with React JSX support, includes path mapping for `@/*`
- **`package.json`**: Comprehensive dependency management with Radix UI components, only dev and build scripts
- **`tailwind.config.js`**: Custom Tailwind configuration with nature theme colors (forest, mountain), custom fonts, animations, and backdrop blur
- **`postcss.config.js`**: PostCSS configuration with Tailwind and Autoprefixer
- **Path Alias**: `@` points to `src/` directory for clean imports

#### Backend Configuration
- **`tsconfig.json`**: TypeScript ES2022 target with ESNext modules, strict type checking, path aliases (`@/*` maps to `src/*` with subdirectory support)
- **`package.json`**: Full backend dependencies with Express, PostgreSQL, Redis, OpenAI, authentication, and security packages
- **Environment Variables**: Configuration via .env for database, Redis, JWT, OpenAI, and security settings

### Theme System Architecture

The application features a sophisticated nature-based theme system:

- **ThemeContext**: Centralized theme management with nature backgrounds and color palettes
- **Nature Themes**: Forest and Mountain themes with gradient backgrounds and layered textures
  - **Forest Theme**: Deep woodland sanctuary with dappled sunlight, moss-covered paths, dark green color scheme
  - **Mountain Theme**: Serene alpine retreat with crystalline snow, morning mist, light gray/white color scheme
- **Layered Visual Effects**: Each theme has multi-layer textures (atmosphere, elements, details, grain, lighting)
- **Character Integration**: Each character (Sheep, Rabbit, Fox) has theme-aware styling with their own color schemes
- **Dynamic Styling**: CSS custom properties and class-based theming with backdrop filters
- **Accessibility**: Proper contrast ratios and screen reader support

### Key Development Considerations

- **Error Handling**: Comprehensive error boundaries and fallback responses in responseGenerator.ts:190-196
- **Character Safety**: Safe character resolution with fallbacks in App.tsx:30-36
- **State Management**: React hooks-based state management with character-aware messaging
- **Accessibility**: Screen reader support, ARIA labels, and semantic HTML throughout
- **Debugging**: Development debug utilities with DEBUG flag in App.tsx:15-20
- **Performance**: Optimized rendering with proper key props and memo usage where needed

### Features

#### Core Features
- **Private Emotional Support**: A safe space when you're distressed and don't want to involve friends
- **Always Available**: 24/7 access without depending on others' schedules or availability
- **Multi-Character Chat**: Three AI personalities with distinct approaches to emotional support
- **Complete Privacy**: Conversations stored temporarily (1 hour) and never shared with third parties
- **OpenAI Integration**: Real AI-powered conversations using GPT models via backend API
- **No Social Pressure**: Express yourself freely without fear of judgment, social consequences, or burdening others
- **User Authentication**: JWT-based login/registration system with secure password hashing
- **Google OAuth Login**: One-click sign-in with Google account using OAuth 2.0
- **Session Management**: Persistent conversation sessions tracked across messages

#### UI/UX Features
- **Nature Theme System**: Dynamic background and styling based on selected nature themes (Forest, Mountain)
- **Character Switch Protection**: Warning dialog prevents accidental conversation loss
- **Collapsible Sidebar**: Space-efficient character selection and settings
- **Auto-Focus Input**: Cursor automatically returns to input field after sending messages for enhanced UX
- **Typing Indicators**: Visual feedback when AI is generating responses
- **Glass-morphism Design**: Modern backdrop-blur effects and semi-transparent overlays
- **Layered Textures**: Multi-layer visual effects for realistic nature themes
- **Responsive Layout**: Flexible sidebar and chat area
- **Chinese Language Interface**: Native Chinese language support with appropriate typography

#### Technical Features
- **Error Boundaries**: Comprehensive error handling with graceful fallbacks
- **API Error Handling**: Automatic fallback to mock responses if backend unavailable
- **Performance Optimization**:
  - Code splitting for React, Radix UI, and utilities
  - Terser minification with console removal in production
  - CSS code splitting for faster initial loads
  - SWC plugin for fast development builds
- **Development Debugging**: Debug utilities with conditional logging
- **Accessibility**: Screen reader support, ARIA labels, and semantic HTML throughout

#### Backend Features
- **OpenAI API Integration**: Character-specific system prompts and conversation handling via GPT-4
- **PostgreSQL Database**: User accounts and usage analytics (privacy-focused, no conversation storage)
- **Redis Caching**: Session caching and rate limiting
- **Google OAuth 2.0**: Full Passport.js implementation with automatic account linking
- **Dual Auth Methods**: Email/password + Google OAuth, works seamlessly together
- **Rate Limiting**: Configurable per-endpoint rate limiting with IP-based tracking
- **Request Validation**: Express-validator for input sanitization
- **Comprehensive Logging**: Winston-based structured logging with multiple levels
- **Security**: Helmet for HTTP headers, CORS with origin allowlist, JWT access/refresh tokens, bcrypt password hashing
- **Health Monitoring**: /api/health endpoint with database, Redis, and OpenAI status checks
- **Graceful Shutdown**: Proper connection cleanup on SIGTERM/SIGINT
- **Standardized API Responses**: Consistent response format across all endpoints

## Target User Persona

**The core user** is someone who:
- Feels distressed or emotionally overwhelmed
- Values their privacy and doesn't want to burden friends/family
- Needs immediate support (3 AM, during work, traveling, etc.)
- Wants to process emotions privately before (or instead of) talking to real people
- Seeks non-judgmental guidance without social consequences
- May not be ready for professional therapy but needs more than self-help articles
- Appreciates having control over when and how they seek support

**Use Cases:**
- Late-night anxiety when everyone is asleep
- Workplace stress you can't discuss with colleagues
- Relationship problems you're not ready to share with friends
- Processing grief or loss in private
- Daily emotional check-ins without social obligations
- Practicing coping strategies before difficult conversations
- Getting perspective without feeling like a burden

## Privacy & Safety Philosophy

Inner Voice is built on three core principles:

1. **Privacy First**: Conversations are temporary (1-hour Redis TTL), not permanently stored. We don't sell or share your emotional data.

2. **Not Therapy**: We're explicit that Inner Voice is NOT a replacement for professional mental health care. We direct users to crisis resources when needed.

3. **Empowerment Without Dependency**: The goal is to help users process emotions and develop coping skills, not create dependency on AI companionship.

---

The application is a production-ready private emotional support companion with multiple AI personalities powered by OpenAI. It's designed for those moments when you need guidance but don't want friends involved - providing different types of psychological and emotional assistance through natural, character-driven conversations.