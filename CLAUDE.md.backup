# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Location

The main application is located at: `Inner-voice/Chatbot Interface Draft/`

## Commands

- `npm i` - Install dependencies
- `npm run dev` - Start development server (Vite, runs on port 3000)
- `npm run build` - Build the application for production

## Project Structure

This is a sophisticated React chatbot interface application featuring multiple AI character personalities. Built with Vite, TypeScript, and Tailwind CSS, it provides an emotional support chat experience with three distinct AI companions.

### Core Architecture

- **Framework**: React 18 with TypeScript, built using Vite 6.3.5
- **Styling**: Tailwind CSS v4.1.3 with custom gradients and glass-morphism effects
- **UI Components**: Comprehensive Radix UI component library for accessible primitives
- **Icons**: Lucide React icon library
- **Build Tool**: Vite with React SWC plugin for fast development
- **Project Origin**: Based on a Figma design from https://www.figma.com/design/HCUxqSgaIedgzcFVYS6PbS/Chatbot-Interface-Draft

### Dependencies

#### Core Dependencies
- **React Ecosystem**: React 18.3.1, React DOM 18.3.1
- **UI Components**: Full Radix UI suite (30+ components including dialogs, dropdowns, forms, etc.)
- **Styling**: Tailwind CSS utilities (tailwind-merge, class-variance-authority, clsx)
- **Additional UI**:
  - `lucide-react` - Icon library
  - `cmdk` - Command palette
  - `sonner` - Toast notifications
  - `vaul` - Drawer component
  - `embla-carousel-react` - Carousel component
  - `recharts` - Charting library
  - `react-hook-form` - Form management
  - `react-day-picker` - Date picker
  - `next-themes` - Theme switching
  - `react-resizable-panels` - Resizable layouts
  - `input-otp` - OTP input component

#### Dev Dependencies
- **Build Tools**: Vite 6.3.5, @vitejs/plugin-react-swc 3.10.2
- **Types**: @types/node 20.10.0

### File Structure

```
src/
├── App.tsx                           # Main application component
├── main.tsx                          # Application entry point
├── index.css                         # Tailwind CSS and global styles
├── components/
│   ├── ChatMessage.tsx               # Message display component
│   ├── Sidebar.tsx                   # Character selection sidebar
│   ├── TypingIndicator.tsx           # AI typing animation
│   ├── SendIcon.tsx                  # Send button icon
│   ├── SheepAvatar.tsx               # Sheep character avatar
│   ├── avatars/
│   │   ├── BaseAvatar.tsx            # Base avatar component
│   │   ├── AvatarDemo.tsx            # Avatar demonstration
│   │   ├── FoxAvatar.tsx             # Fox character avatar
│   │   ├── RabbitAvatar.tsx          # Rabbit character avatar
│   │   └── SheepAvatar.tsx           # Alternative sheep avatar
│   ├── features/
│   │   ├── BreathingExercise.tsx     # Breathing exercise feature
│   │   └── ProblemSolver.tsx         # Problem-solving feature
│   ├── figma/
│   │   └── ImageWithFallback.tsx     # Figma image handling
│   └── ui/                           # Radix UI components (50+ files)
├── types/
│   └── Character.ts                  # TypeScript type definitions
├── data/
│   └── characters.ts                 # Character data and configurations
├── utils/
│   └── responseGenerator.ts          # AI response generation logic
├── styles/                           # Additional styling files
└── guidelines/                       # Project guidelines and documentation
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

- **Character State**: `currentCharacter` manages active AI personality
- **Message System**: `messages` array with character attribution and categorization
- **Input Management**: `inputValue` for user text input
- **UI States**: `isTyping`, `sidebarCollapsed` for interface control
- **Intelligent Responses**: Context-aware response generation based on user input analysis
- **Character Switching**: Dynamic character changes with personalized introductions

### Response Generation System

Advanced AI response system with:
- **Trigger Keywords**: Analyzes user input for emotional states (anxiety, problems, confusion, motivation)
- **Character-Specific Responses**: Each character has unique response pools with appropriate personality
- **Intelligent Timing**: Variable response delays matching character personalities
- **Context Awareness**: Response categorization (supportive, analytical, motivational, breathing, problem-solving)
- **Introduction Messages**: Personalized character introductions when switching

### Styling Approach

- **Tailwind CSS v4.1.3**: Modern utility-first CSS framework
- **Glass-morphism Design**: Backdrop-blur effects and semi-transparent overlays
- **Character Theming**: Color schemes matching each character's personality
- **Green Gradient Background**: Primary app background with subtle variations
- **Responsive Layout**: Flexible sidebar and chat area
- **Chinese Language Interface**: Designed for Chinese text and typography
- **Shadow and Blur Effects**: Sophisticated visual depth with modern aesthetics

### Configuration Files

- **`vite.config.ts`**: Comprehensive Vite configuration with extensive alias mapping for all Radix UI components, React SWC plugin, ESNext target, port 3000 server
- **`tsconfig.json`**: TypeScript configuration targeting ESNext with React JSX support
- **`package.json`**: Comprehensive dependency management with 30+ UI components
- **No Tailwind config file**: Uses Tailwind CSS v4.1.3 defaults with built-in CSS
- **Path Alias**: `@` points to `src/` directory for clean imports

### Features

- **Multi-Character Chat**: Switch between three AI personalities with distinct responses
- **Emotional Support Focus**: Designed for mental health and emotional wellness conversations
- **Breathing Exercises**: Built-in mindfulness and relaxation features
- **Problem-Solving Tools**: Structured approach to addressing user challenges
- **Collapsible Sidebar**: Space-efficient character selection and settings
- **Intelligent Response Timing**: Character-appropriate response delays for natural feel
- **Chinese Language Interface**: Native Chinese language support with appropriate typography

The application is a sophisticated emotional support chatbot with multiple AI personalities, each designed to provide different types of psychological and emotional assistance through natural, character-driven conversations.