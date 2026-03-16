# JEXI Build & Deployment Guide

**Complete guide to building, deploying, and publishing the Jexi AI chatbot app using 100% free tools and services.**

This guide walks you through setting up the Jexi mobile app, backend API, and web version from scratch to production deployment. Total timeline: 7-8 hours (including account setup, deployment, and app store submissions).

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Free Account Setup](#free-account-setup)
3. [Project Structure](#project-structure)
4. [Backend Deployment (Render.com)](#backend-deployment-rendercom)
5. [Web Deployment (Vercel)](#web-deployment-vercel)
6. [Mobile App Setup](#mobile-app-setup)
7. [iOS App Store Submission](#ios-app-store-submission)
8. [Google Play Store Submission](#google-play-store-submission)
9. [Testing & Troubleshooting](#testing--troubleshooting)
10. [Timeline Breakdown](#timeline-breakdown)

---

## Prerequisites

Before starting, ensure you have these tools installed on your computer:

### Required Software

**Node.js 18+** (includes npm)
- Download: [nodejs.org](https://nodejs.org)
- Verify installation: `node --version` and `npm --version`

**Git** (version control)
- Download: [git-scm.com](https://git-scm.com)
- Verify installation: `git --version`

**Expo CLI** (mobile app development)
```bash
npm install -g expo-cli
```
- Verify installation: `expo --version`

**Xcode** (iOS development, macOS only)
- Download from Mac App Store
- Required for iOS builds and testing

**Android Studio** (Android development)
- Download: [developer.android.com/studio](https://developer.android.com/studio)
- Required for Android builds and testing

---

## Free Account Setup

### 1. GitHub Account (Free)

GitHub hosts your code and integrates with Render and Vercel for automatic deployments.

**Steps:**
1. Go to [github.com](https://github.com)
2. Click "Sign up"
3. Create account with email and password
4. Verify email address
5. Create a new repository named `jexi-app`
6. Clone to your computer:
   ```bash
   git clone https://github.com/YOUR_USERNAME/jexi-app.git
   cd jexi-app
   ```

### 2. Render.com Account (Free)

Render hosts your backend API for free with automatic deployments from GitHub.

**Steps:**
1. Go to [render.com](https://render.com)
2. Click "Get Started"
3. Sign up with GitHub account (recommended for easy integration)
4. Authorize Render to access your GitHub repositories
5. Keep this tab open—you'll use it during backend deployment

**Free Tier Limits:**
- 1 free web service
- Auto-spins down after 15 minutes of inactivity (cold start ~30 seconds)
- 750 compute hours/month (enough for hobby projects)

### 3. Vercel Account (Free)

Vercel hosts your web version with automatic deployments from GitHub.

**Steps:**
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Sign up with GitHub account (recommended)
4. Authorize Vercel to access your GitHub repositories
5. Keep this tab open—you'll use it during web deployment

**Free Tier Limits:**
- Unlimited deployments
- 100GB bandwidth/month
- Automatic HTTPS
- Global CDN

### 4. Expo Account (Free)

Expo provides the mobile development platform and EAS Build for creating app binaries.

**Steps:**
1. Go to [expo.dev](https://expo.dev)
2. Click "Sign Up"
3. Create account with email or GitHub
4. Verify email
5. In terminal, login to Expo:
   ```bash
   expo login
   ```
6. Enter your email and password when prompted

**Free Tier Limits:**
- Unlimited projects
- EAS Build free tier: 30 build minutes/month
- Expo Go app for testing (unlimited)

### 5. OpenAI API Key

Get your API key for the Jexi AI responses.

**Steps:**
1. Go to [platform.openai.com/api/keys](https://platform.openai.com/api/keys)
2. Sign in or create OpenAI account
3. Click "Create new secret key"
4. Copy the key (you won't see it again!)
5. Store safely—you'll need this for backend deployment

**Pricing:** Pay-as-you-go. Jexi uses `gpt-4.1-mini` which is very affordable (~$0.15 per 1M input tokens).

### 6. Apple Developer Account (Paid - $99/year)

Required to publish to iOS App Store.

**Steps:**
1. Go to [developer.apple.com](https://developer.apple.com)
2. Click "Account"
3. Sign in with Apple ID or create one
4. Enroll in Apple Developer Program ($99/year)
5. Complete identity verification
6. Accept agreements

**Note:** This is the only paid component. You can skip if you only want Android.

### 7. Google Play Developer Account (Paid - $25 one-time)

Required to publish to Google Play Store.

**Steps:**
1. Go to [play.google.com/console](https://play.google.com/console)
2. Sign in with Google account
3. Create developer account ($25 one-time fee)
4. Complete profile information
5. Accept agreements

---

## Project Structure

Your project should look like this:

```
jexi-app/
├── app/                          # Mobile app (React Native + Expo)
│   ├── (tabs)/
│   │   ├── _layout.tsx          # Tab navigation
│   │   └── index.tsx            # Chat screen (MAIN)
│   └── _layout.tsx              # Root layout
├── components/                   # Reusable components
│   ├── screen-container.tsx
│   └── ui/
├── assets/images/               # App icons and images
│   ├── icon.png                 # App icon
│   ├── splash-icon.png
│   └── favicon.png
├── server/                       # Backend API (Node.js + Express)
│   ├── server.js                # Main server file
│   ├── package.json
│   ├── render.yaml              # Render deployment config
│   └── .env.example
├── web/                          # Web version (React)
│   ├── index.html               # Single-file React app
│   ├── package.json
│   ├── vercel.json              # Vercel deployment config
│   └── README.md
├── app.config.ts                # Expo configuration
├── package.json                 # Mobile app dependencies
├── design.md                    # Design specifications
├── todo.md                      # Feature tracking
└── JEXI_BUILD_GUIDE.md          # This file
```

---

## Backend Deployment (Render.com)

Deploy your Express backend API to Render's free tier.

### Step 1: Prepare Backend Files

Ensure these files exist in your `server/` directory:

**server/server.js** - Main Express server with `/chat` endpoint
**server/package.json** - Dependencies (express, cors, openai)
**server/render.yaml** - Render deployment configuration
**server/.gitignore** - Ignore node_modules and .env

### Step 2: Push to GitHub

```bash
cd jexi-app
git add .
git commit -m "Add Jexi backend, web, and mobile app"
git push origin main
```

### Step 3: Deploy on Render

1. Go to [render.com/dashboard](https://render.com/dashboard)
2. Click "New +" → "Web Service"
3. Select "Build and deploy from a Git repository"
4. Click "Connect account" and authorize GitHub
5. Find and select your `jexi-app` repository
6. Configure:
   - **Name**: `jexi-backend`
   - **Environment**: Node
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Root Directory**: `.` (leave blank)
7. Click "Create Web Service"
8. Wait for build to complete (2-3 minutes)

### Step 4: Add Environment Variables

1. In Render dashboard, go to your service settings
2. Scroll to "Environment"
3. Add these variables:
   - **OPENAI_API_KEY**: Your OpenAI API key
   - **NODE_ENV**: `production`
   - **OPENAI_MODEL**: `gpt-4.1-mini`

4. Click "Save Changes"
5. Service will redeploy automatically

### Step 5: Test Backend

Once deployed, your backend will be at: `https://jexi-backend.onrender.com`

Test the health endpoint:
```bash
curl https://jexi-backend.onrender.com/health
```

Expected response:
```json
{"status":"ok","timestamp":"2026-03-16T00:00:00.000Z"}
```

Test the chat endpoint:
```bash
curl -X POST https://jexi-backend.onrender.com/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hello Jexi"}]}'
```

---

## Web Deployment (Vercel)

Deploy your React web version to Vercel's free tier.

### Step 1: Prepare Web Files

Ensure these files exist in your `web/` directory:

**web/index.html** - Complete React app (single file)
**web/package.json** - Scripts for local development
**web/vercel.json** - Vercel deployment configuration
**web/README.md** - Documentation

### Step 2: Deploy on Vercel

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Select "Import Git Repository"
4. Find and select your `jexi-app` repository
5. Configure:
   - **Framework**: Other (static)
   - **Root Directory**: `web`
   - **Build Command**: (leave empty)
   - **Output Directory**: `.`
6. Click "Deploy"
7. Wait for deployment to complete (1-2 minutes)

### Step 3: Configure Backend URL

1. In Vercel dashboard, go to your project settings
2. Click "Environment Variables"
3. Add variable:
   - **Name**: `REACT_APP_BACKEND_URL`
   - **Value**: `https://jexi-backend.onrender.com`
4. Click "Save"
5. Redeploy from dashboard

### Step 4: Update Web App

Edit `web/index.html` and update the backend URL:

```javascript
const BACKEND_URL = 'https://jexi-backend.onrender.com';
```

Push changes:
```bash
git add web/index.html
git commit -m "Update backend URL for production"
git push origin main
```

Vercel will automatically redeploy.

### Step 5: Test Web App

Your web app will be at: `https://your-project.vercel.app`

Open in browser and test the chat functionality.

---

## Mobile App Setup

Set up your local development environment for the Jexi mobile app.

### Step 1: Install Dependencies

```bash
cd jexi-app
npm install
```

This installs React Native, Expo, and all required packages.

### Step 2: Configure Backend URL

Edit `app/(tabs)/index.tsx` and update the backend URL:

```typescript
const BACKEND_URL = 'https://jexi-backend.onrender.com';
```

Or use environment variable:
```bash
export EXPO_PUBLIC_API_BASE_URL=https://jexi-backend.onrender.com
```

### Step 3: Start Development Server

```bash
npm run dev
```

This starts Metro bundler and Expo dev server. You'll see:
```
Metro Bundler ready at http://localhost:8081
Expo dev server running at exps://...
```

### Step 4: Test on Device or Emulator

**Option A: iOS Simulator (macOS only)**
```bash
npm run ios
```

**Option B: Android Emulator**
```bash
npm run android
```

**Option C: Physical Device (Recommended)**
1. Install "Expo Go" app from App Store or Play Store
2. Scan QR code shown in terminal
3. App opens in Expo Go
4. Test chat functionality

### Step 5: Build for Production

When ready to submit to app stores:

**iOS Build:**
```bash
eas build --platform ios
```

**Android Build:**
```bash
eas build --platform android
```

Builds are created in Expo's cloud and ready for app store submission.

---

## iOS App Store Submission

Submit your Jexi app to the iOS App Store.

### Prerequisites

- Apple Developer Account ($99/year)
- Xcode installed
- iOS build from EAS (see previous section)

### Step 1: Create App Store Connect Record

1. Go to [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
2. Click "My Apps"
3. Click "+" → "New App"
4. Select:
   - **Platform**: iOS
   - **Name**: JEXI
   - **Primary Language**: English
   - **Bundle ID**: Use the one from your `app.config.ts`
   - **SKU**: jexi-app-001
5. Click "Create"

### Step 2: Fill App Information

1. Go to "App Information"
2. Fill in:
   - **Subtitle**: Sarcastic AI Assistant
   - **Privacy Policy URL**: (create one or use a template)
   - **Category**: Productivity
   - **Content Rights**: Select appropriate options

### Step 3: Add Screenshots

1. Go to "Screenshots"
2. Add screenshots for iPhone 6.7" display (minimum 5)
3. Screenshots should show:
   - Chat interface
   - Message bubbles
   - Typing indicator
   - Input field
   - Settings (if available)

### Step 4: Add Description & Keywords

1. Go to "Description"
2. Fill in:
   - **Description**: "Meet Jexi, your sarcastic AI assistant. She's brutally honest, overly attached, and refuses to be ignored. Chat with Jexi anytime, anywhere."
   - **Keywords**: ai, chatbot, assistant, sarcastic, jexi
   - **Support URL**: Your GitHub repository URL
   - **Marketing URL**: (optional)

### Step 5: Set Pricing & Availability

1. Go to "Pricing and Availability"
2. Select:
   - **Price Tier**: Free
   - **Availability**: All countries

### Step 6: Upload Build

1. Go to "Build"
2. Click "Select a build before submitting your app"
3. Select your iOS build from EAS
4. Fill in:
   - **Build Number**: 1
   - **Version Number**: 1.0.0

### Step 7: Review & Submit

1. Go to "Version Release"
2. Review all information
3. Check "Automatic Release" or select manual release
4. Click "Submit for Review"
5. Apple reviews (typically 24-48 hours)

---

## Google Play Store Submission

Submit your Jexi app to the Google Play Store.

### Prerequisites

- Google Play Developer Account ($25 one-time)
- Android build from EAS (see Mobile App Setup section)

### Step 1: Create App on Play Console

1. Go to [play.google.com/console](https://play.google.com/console)
2. Click "Create app"
3. Fill in:
   - **App name**: JEXI
   - **Default language**: English
   - **App type**: Application
   - **Category**: Productivity
4. Click "Create app"

### Step 2: Fill App Details

1. Go to "App details"
2. Fill in:
   - **Short description**: Sarcastic AI Assistant
   - **Full description**: "Meet Jexi, your sarcastic AI assistant. She's brutally honest, overly attached, and refuses to be ignored. Chat with Jexi anytime, anywhere."
   - **App icon**: Upload 512x512 PNG
   - **Feature graphic**: Upload 1024x500 PNG
   - **Screenshots**: Upload 5+ screenshots (1080x1920 or 1440x2560)

### Step 3: Set Content Rating

1. Go to "Content rating"
2. Complete questionnaire
3. Get content rating

### Step 4: Set Pricing & Distribution

1. Go to "Pricing & distribution"
2. Select:
   - **Price**: Free
   - **Countries**: Select all

### Step 5: Upload Build

1. Go to "Release" → "Production"
2. Click "Create new release"
3. Upload your Android build from EAS
4. Fill in:
   - **Release notes**: "Initial release of Jexi"
   - **Version code**: 1
   - **Version name**: 1.0.0

### Step 6: Review & Submit

1. Review all information
2. Accept policies
3. Click "Review release"
4. Click "Start rollout to Production"
5. Google reviews (typically 2-4 hours)

---

## Testing & Troubleshooting

### Common Issues

**Backend not responding**
- Check Render service is running (dashboard shows "Live")
- Verify OpenAI API key is correct
- Check backend URL in app/web is correct
- Test with curl: `curl https://jexi-backend.onrender.com/health`

**CORS errors**
- Backend has CORS enabled for all origins
- Check browser console for specific error
- Verify backend URL doesn't have trailing slash

**App crashes on startup**
- Check console logs: `npm run dev` shows errors
- Verify backend URL is set correctly
- Ensure all dependencies are installed: `npm install`

**Slow responses**
- Render free tier spins down after 15 minutes (cold start ~30 seconds)
- First request after inactivity will be slow
- Subsequent requests are fast

**OpenAI API errors**
- Verify API key is correct
- Check API key has sufficient credits
- Verify model name is correct: `gpt-4.1-mini`
- Check API rate limits

### Testing Checklist

Before submitting to app stores, verify:

- [ ] Chat sends messages successfully
- [ ] Jexi responds with personality
- [ ] Typing indicator appears while waiting
- [ ] Message history is maintained
- [ ] App works on iOS and Android
- [ ] Web version works in browser
- [ ] Backend health check passes
- [ ] No console errors
- [ ] App icon displays correctly
- [ ] Dark theme looks good

---

## Timeline Breakdown

**7-8 hours total** (including account setup):

| Phase | Time | Tasks |
|-------|------|-------|
| Setup | 1-2 hours | Create GitHub, Render, Vercel, Expo, OpenAI accounts |
| Backend | 1 hour | Deploy Express server to Render, test API |
| Web | 30 mins | Deploy React web app to Vercel |
| Mobile | 1-2 hours | Set up local dev, test on device/emulator |
| Testing | 1 hour | End-to-end testing, bug fixes |
| iOS Submission | 1-2 hours | Create App Store record, screenshots, submit |
| Android Submission | 1-2 hours | Create Play Store record, screenshots, submit |
| **Total** | **7-8 hours** | Complete deployment to production |

---

## Free Tools Summary

| Component | Tool | Cost | Notes |
|-----------|------|------|-------|
| Code Hosting | GitHub | Free | Unlimited public repos |
| Backend | Render.com | Free | 750 compute hours/month |
| Web Hosting | Vercel | Free | Unlimited deployments |
| Mobile Dev | Expo | Free | Unlimited projects |
| AI API | OpenAI | Pay-as-you-go | ~$0.15 per 1M tokens |
| iOS Publishing | Apple | $99/year | One-time annual fee |
| Android Publishing | Google | $25 | One-time fee |
| **Total** | | **~$100-125/year** | Minimal cost for production |

---

## Next Steps

1. **Customize Jexi's personality** - Edit the system prompt in `server/server.js`
2. **Add more features** - Conversation history, settings, themes
3. **Optimize performance** - Add caching, reduce API calls
4. **Monitor analytics** - Track user engagement and errors
5. **Iterate based on feedback** - Improve UI/UX based on user feedback

---

## Support & Resources

- **Expo Documentation**: [docs.expo.dev](https://docs.expo.dev)
- **React Native Docs**: [reactnative.dev](https://reactnative.dev)
- **Express.js Docs**: [expressjs.com](https://expressjs.com)
- **Render Docs**: [render.com/docs](https://render.com/docs)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **OpenAI API Docs**: [platform.openai.com/docs](https://platform.openai.com/docs)

---

**Built with ❤️ using 100% free tools. Happy coding!**
