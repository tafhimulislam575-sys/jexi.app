# Jexi Web Version

React-based web version of the Jexi AI chatbot, deployable to Vercel for free.

## Local Development

### Prerequisites
- Node.js 14+ installed
- Backend API running (see `../server/README.md`)

### Setup

1. Navigate to web directory:
```bash
cd web
```

2. Start local development server:
```bash
npm run dev
```

Server will run on `http://localhost:3001`

3. Update the `BACKEND_URL` in `index.html` if your backend is on a different URL:
```javascript
const BACKEND_URL = 'http://localhost:3000'; // Change this if needed
```

## Deployment to Vercel (Free)

### Option 1: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
cd web
vercel
```

3. Follow the prompts to connect your GitHub account and deploy

### Option 2: Using GitHub + Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure:
   - **Framework**: Static Site
   - **Root Directory**: `web`
   - **Build Command**: (leave empty)
   - **Output Directory**: `.`
6. Add environment variable:
   - Key: `REACT_APP_BACKEND_URL`
   - Value: Your backend URL (e.g., `https://jexi-backend.onrender.com`)
7. Click "Deploy"

Your web app will be live at `https://your-project.vercel.app`

## Environment Variables

Update the `BACKEND_URL` in `index.html` to point to your deployed backend:

```javascript
const BACKEND_URL = 'https://jexi-backend.onrender.com'; // Your Render backend URL
```

Or use environment variables in Vercel:
- `REACT_APP_BACKEND_URL`: Your backend API URL

## File Structure

- `index.html` - Complete React app in single HTML file
- `package.json` - Dependencies and scripts
- `vercel.json` - Vercel deployment configuration

## Features

- Dark theme optimized for chat
- Real-time message streaming
- Typing indicator animation
- Responsive design (desktop, tablet, mobile)
- Message history within session
- Error handling with Jexi personality

## Troubleshooting

**"Cannot reach backend"**
- Ensure backend is running and accessible
- Check CORS is enabled in backend
- Verify backend URL is correct in `index.html`

**"CORS error"**
- Backend must have CORS enabled for your web domain
- In production, add your Vercel domain to backend CORS whitelist

**"Blank page"**
- Check browser console for errors (F12)
- Ensure React CDN links are accessible
- Try hard refresh (Ctrl+Shift+R)
