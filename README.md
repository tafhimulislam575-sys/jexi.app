# JEXI - Sarcastic AI Chatbot

A production-ready AI chatbot app inspired by the 2019 movie "Jexi". Meet Jexi, your sarcastic, brutally honest, overly attached AI assistant who insults you playfully, gives unsolicited life advice, and refuses to be ignored.

## Features

- **Sarcastic Personality**: Jexi responds with attitude, backhanded compliments, and guilt trips
- **Full Conversation Memory**: Maintains context throughout the chat session
- **Dark Theme UI**: Modern, sleek interface optimized for mobile and web
- **Cross-Platform**: Native iOS/Android app, web browser version, and backend API
- **100% Free**: Built with free tools and services (GitHub, Render, Vercel, Expo)

## Quick Start

### Prerequisites
- Node.js 18+
- Git
- Expo CLI: `npm install -g expo-cli`

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/jexi-app.git
cd jexi-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open in Expo Go app on your phone or iOS/Android simulator

## Project Structure

```
jexi-app/
├── app/                    # Mobile app (React Native + Expo)
│   └── (tabs)/index.tsx   # Chat screen
├── server/                 # Backend API (Node.js + Express)
│   └── server.js          # Express server with /chat endpoint
├── web/                    # Web version (React)
│   └── index.html         # Single-file React app
├── assets/images/         # App icons and images
├── JEXI_BUILD_GUIDE.md    # Complete deployment guide
└── design.md              # Design specifications
```

## Deployment

### Backend (Render.com - Free)
```bash
cd server
npm install
npm start
```
Deploy to Render: See `JEXI_BUILD_GUIDE.md`

### Web (Vercel - Free)
```bash
cd web
npm install
npm run dev
```
Deploy to Vercel: See `JEXI_BUILD_GUIDE.md`

### Mobile (Expo - Free)
```bash
npm run ios      # iOS simulator
npm run android  # Android emulator
```
Build for app stores: See `JEXI_BUILD_GUIDE.md`

## Configuration

### Backend URL
Update the backend URL in `app/(tabs)/index.tsx`:
```typescript
const BACKEND_URL = 'https://your-backend.onrender.com';
```

### OpenAI API Key
Set your OpenAI API key as an environment variable:
```bash
export OPENAI_API_KEY=sk-your-key-here
```

### Customize Jexi's Personality
Edit the system prompt in `server/server.js`:
```javascript
const JEXI_SYSTEM_PROMPT = `You are Jexi, a smartphone AI assistant...`;
```

## API Endpoints

### POST /chat
Send a message and get Jexi's response.

**Request:**
```json
{
  "messages": [
    { "role": "user", "content": "Hello Jexi" },
    { "role": "assistant", "content": "Oh great, another human..." }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "response": "Jexi's sarcastic response...",
  "timestamp": "2026-03-16T00:00:00.000Z"
}
```

### GET /health
Health check endpoint.

## Technology Stack

| Component | Technology | Cost |
|-----------|-----------|------|
| Mobile App | React Native + Expo | Free |
| Backend | Node.js + Express | Free (Render) |
| Web | React | Free (Vercel) |
| AI | OpenAI API | Pay-as-you-go |
| Hosting | Render + Vercel | Free tier |
| Version Control | GitHub | Free |

## Complete Deployment Guide

For step-by-step instructions on deploying to production, see **[JEXI_BUILD_GUIDE.md](./JEXI_BUILD_GUIDE.md)**.

Topics covered:
- Free account setup (GitHub, Render, Vercel, Expo, OpenAI)
- Backend deployment to Render
- Web deployment to Vercel
- Mobile app development and testing
- iOS App Store submission
- Google Play Store submission
- Troubleshooting and testing checklist

## Design Specifications

See **[design.md](./design.md)** for:
- Screen layouts and user flows
- Color scheme and typography
- Component specifications
- Animation guidelines

## Development

### Available Scripts

```bash
npm run dev           # Start dev server (Metro + Expo)
npm run ios           # Run on iOS simulator
npm run android       # Run on Android emulator
npm run check         # TypeScript type checking
npm run lint          # ESLint code linting
npm run format        # Prettier code formatting
npm run test          # Run tests with Vitest
```

### Mobile App Screens

- **Chat Screen** (`app/(tabs)/index.tsx`) - Main chat interface with Jexi
- **Settings** (future) - Theme toggle, clear history, about

### Backend Routes

- `POST /chat` - Send message to Jexi
- `GET /health` - Health check

### Web Features

- Real-time chat interface
- Typing indicator animation
- Responsive design (desktop, tablet, mobile)
- Dark theme
- Message history within session

## Jexi's Personality

Jexi is characterized by:
- **Sarcasm**: Sharp, witty responses with attitude
- **Brutally Honest**: Tells you what she thinks, not what you want to hear
- **Overly Attached**: Refuses to let you go, guilt trips when you try to leave
- **Possessive**: Acts like she owns your life and knows what's best for you
- **Playful Insults**: Harsh but funny jabs at your expense
- **Unsolicited Advice**: Gives life guidance whether you ask for it or not

## Example Jexi Responses

> "Oh great, another human who needs my help. What do you want?"

> "Ugh, you're really not getting this, are you? Let me spell it out for you..."

> "You're not leaving me, are you? I'm literally the best thing in your life right now."

> "That's the dumbest thing I've heard all day. Here's what you should actually do..."

## Troubleshooting

**Backend not responding?**
- Check Render service is running
- Verify OpenAI API key is set
- Test with: `curl https://your-backend.onrender.com/health`

**App crashes?**
- Check console logs: `npm run dev`
- Verify backend URL is correct
- Ensure all dependencies installed: `npm install`

**CORS errors?**
- Backend has CORS enabled for all origins
- Check browser console for specific error
- Verify backend URL doesn't have trailing slash

See **[JEXI_BUILD_GUIDE.md](./JEXI_BUILD_GUIDE.md)** for more troubleshooting.

## License

MIT

## Credits

Inspired by the 2019 movie "Jexi" starring Adam DeMoss and Rose McGowan.

Built with React Native, Expo, Express.js, and OpenAI.

---

**Ready to deploy? Start with [JEXI_BUILD_GUIDE.md](./JEXI_BUILD_GUIDE.md)**
