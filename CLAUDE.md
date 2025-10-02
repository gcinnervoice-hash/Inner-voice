# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Location

The main application is located at: `Inner-voice/Chatbot Interface Draft/`

## Commands

- `npm i` - Install dependencies
- `npm run dev` - Start development server (Vite, runs on port 3000)
- `npm run build` - Build the application for production

Note: No separate lint, test, or typecheck commands are configured in package.json. The project uses basic Vite setup.

## Project Structure

This is a sophisticated React chatbot interface application featuring multiple AI character personalities. Built with Vite, TypeScript, and Tailwind CSS, it provides an emotional support chat experience with three distinct AI companions.

### Core Architecture

- **Framework**: React 18 with TypeScript, built using Vite 6.3.5
- **Styling**: Tailwind CSS 3.4.4 with custom nature theme system and glass-morphism effects
- **UI Components**: Comprehensive Radix UI component library for accessible primitives
- **Icons**: Lucide React icon library
- **Build Tool**: Vite with React SWC plugin for fast development
- **Theme System**: Custom nature-based theme context with forest, mountain, and plain color palettes
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
├── App.tsx                           # Main application component with theme system
├── main.tsx                          # Application entry point
├── index.css                         # Tailwind CSS and global styles
├── components/
│   ├── ChatMessage.tsx               # Message display component
│   ├── Sidebar.tsx                   # Character selection sidebar
│   ├── TypingIndicator.tsx           # AI typing animation
│   ├── SendIcon.tsx                  # Send button icon
│   ├── CharacterSwitchDialog.tsx     # Character switching confirmation dialog
│   ├── ErrorBoundary.tsx             # Error boundary wrapper
│   ├── SettingsPanel.tsx             # User settings panel
│   ├── SwitchRole.tsx                # Role switching component
│   ├── ThemeTestComponent.tsx        # Theme testing utility
│   ├── NatureThemeSelector.tsx       # Nature theme selection
│   ├── avatars/
│   │   ├── BaseAvatar.tsx            # Base avatar component
│   │   ├── FoxAvatar.tsx             # Fox character avatar
│   │   ├── RabbitAvatar.tsx          # Rabbit character avatar
│   │   ├── SheepAvatar.tsx           # Sheep character avatar
│   │   └── index.ts                  # Avatar exports
│   └── ui/                           # Radix UI components (Dialog, Popover)
├── contexts/
│   └── ThemeContext.tsx              # Theme management context
├── types/
│   └── Character.ts                  # TypeScript type definitions
├── data/
│   └── characters.ts                 # Character data and configurations
├── themes/
│   └── nature-themes.ts              # Nature theme definitions
└── utils/
    └── responseGenerator.ts          # AI response generation logic
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

- **`vite.config.ts`**: Vite configuration with `@` alias pointing to src/, React SWC plugin, port 3000 server
- **`tsconfig.json`**: TypeScript configuration targeting ESNext with React JSX support, includes path mapping for `@/*`
- **`package.json`**: Comprehensive dependency management with 30+ Radix UI components, only dev and build scripts
- **`tailwind.config.js`**: Custom Tailwind configuration with nature theme colors (forest, mountain, plain), custom fonts, animations, and backdrop blur
- **`postcss.config.js`**: PostCSS configuration with Tailwind and Autoprefixer
- **Path Alias**: `@` points to `src/` directory for clean imports

### Theme System Architecture

The application features a sophisticated nature-based theme system:

- **ThemeContext**: Centralized theme management with nature backgrounds and color palettes
- **Nature Themes**: Forest, Mountain, and Plain themes with gradient backgrounds
- **Character Integration**: Each character (Sheep, Rabbit, Fox) has theme-aware styling
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

- **Multi-Character Chat**: Switch between three AI personalities with distinct responses and confirmation dialogs
- **Emotional Support Focus**: Designed for mental health and emotional wellness conversations
- **Nature Theme System**: Dynamic background and styling based on selected nature themes
- **Character Switch Protection**: Warning dialog prevents accidental conversation loss
- **Collapsible Sidebar**: Space-efficient character selection and settings
- **Intelligent Response Timing**: Character-appropriate response delays (Sheep: 2.5-3.5s, Rabbit: 4-5.5s, Fox: 1.8-2.8s)
- **Error Boundaries**: Comprehensive error handling with graceful fallbacks
- **Chinese Language Interface**: Native Chinese language support with appropriate typography

The application is a sophisticated emotional support chatbot with multiple AI personalities, each designed to provide different types of psychological and emotional assistance through natural, character-driven conversations.