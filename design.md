# JEXI App Design Specification

## Overview
JEXI is a sarcastic, brutally honest AI chatbot app inspired by the 2019 movie "Jexi". The app features a dark-themed chat interface with Jexi's personality powered by OpenAI-compatible API.

## Screen List

### 1. Chat Screen (Main)
- Full-screen chat interface with message history
- User messages appear on the right (light bubbles)
- Jexi messages appear on the left (darker bubbles with avatar)
- Animated typing indicator when Jexi is responding
- Text input field at bottom with send button
- Jexi's avatar/icon displayed in header

### 2. Settings Screen (Future)
- Theme toggle (dark/light)
- Clear chat history option
- About Jexi information

## Primary Content and Functionality

### Chat Screen
- **Header**: Jexi's name and avatar icon
- **Message List**: Scrollable list of conversation messages
  - User messages: right-aligned, light background, rounded corners
  - Jexi messages: left-aligned, dark background, rounded corners with avatar
- **Typing Indicator**: Animated dots when Jexi is thinking
- **Input Area**: 
  - Text input field (multiline support)
  - Send button (right side of input)
  - Auto-focus on mount
  - Keyboard handling for mobile
- **Functionality**:
  - Send messages to backend API
  - Display Jexi's responses with full conversation memory
  - Scroll to bottom on new messages
  - Handle loading states

## Key User Flows

1. **User Opens App**
   - Chat screen loads with empty conversation
   - Input field is focused and ready
   - Jexi greeting message displayed (optional)

2. **User Sends Message**
   - User types message in input field
   - Taps send button (or keyboard send on mobile)
   - Message appears immediately on right side
   - Input field clears
   - Typing indicator appears on left
   - Backend processes message with Jexi personality
   - Jexi's response appears on left side
   - Scroll auto-adjusts to show latest message

3. **User Continues Conversation**
   - Full conversation history maintained in session
   - Each new message includes entire conversation context
   - Jexi maintains personality throughout

## Color Choices

| Element | Light Mode | Dark Mode | Purpose |
|---------|-----------|-----------|---------|
| Background | #FFFFFF | #0F0F0F | Main screen background |
| User Bubble | #E3F2FD | #1E3A5F | User message background |
| Jexi Bubble | #F5F5F5 | #1A1A1A | Jexi message background |
| Text Primary | #000000 | #FFFFFF | Main text color |
| Text Secondary | #666666 | #AAAAAA | Secondary text |
| Accent (Send Button) | #0A7EA4 | #00D4FF | Interactive elements |
| Border | #E0E0E0 | #333333 | Dividers |

## Typography

- **Header**: 18px, Bold, Primary text color
- **Message Text**: 16px, Regular, Primary text color
- **Timestamp**: 12px, Regular, Secondary text color
- **Input Field**: 16px, Regular, Primary text color

## Layout Specifications

- **Safe Area**: Respects notch and home indicator on iOS
- **Message Bubbles**: Max width 85% of screen
- **Padding**: 16px horizontal, 8px vertical between messages
- **Border Radius**: 16px for message bubbles
- **Input Area Height**: 56px (expandable for multiline)
- **Avatar Size**: 40x40px

## Animation & Interaction

- **Typing Indicator**: 3 animated dots, 0.6s cycle
- **Message Entrance**: Subtle fade-in (200ms)
- **Scroll Behavior**: Auto-scroll to bottom on new messages
- **Send Button**: Haptic feedback on tap (light impact)
- **Loading State**: Opacity change on input during API call
