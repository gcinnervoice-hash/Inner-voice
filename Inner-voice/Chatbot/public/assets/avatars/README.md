# Avatar SVG Files

This folder contains the SVG images used for the chatbot character avatars.

## Files to Replace

Replace these placeholder SVG files with your own character designs:

- **`sheep.svg`** - Sheep character (comfort and emotional support)
- **`rabbit.svg`** - Rabbit character (advice and guidance)
- **`fox.svg`** - Fox character (problem-solving and action)

## SVG Requirements

When replacing the placeholder files, ensure your SVG files:

1. **Use `viewBox="0 0 100 100"`** for consistent scaling
2. **Are optimized for small sizes** (will be displayed at 48px-80px)
3. **Have clear, recognizable silhouettes** since they'll be used in thinking animations
4. **Work well with bounce and pulse animations** applied by the BaseAvatar component

## Thinking Bubbles

The thinking bubbles are automatically added by the BaseAvatar component when `isThinking={true}`, so your SVG files don't need to include them.

## Animation Features

Your avatars will automatically get:
- ✨ Bounce animation when thinking
- ✨ Pulse animation overlay
- ✨ Thinking bubbles in the top-right corner
- ✨ Responsive sizing (small, medium, large)

## File Format

- **Format**: SVG
- **Naming**: Exact filenames (`sheep.svg`, `rabbit.svg`, `fox.svg`)
- **Location**: This folder (`public/assets/avatars/`)
- **Accessibility**: Descriptive alt text is already configured

Simply replace the placeholder files with your preferred character designs!