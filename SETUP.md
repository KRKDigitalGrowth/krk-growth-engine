# KRK Growth Engine – Setup Guide

## 🚀 Quick Start (No installation needed!)

Just open `index.html` in **Google Chrome** browser on your computer or phone.

## 📲 Installing as PWA (Mobile App)

### On Android:
1. Open `index.html` in Chrome
2. Tap the **3-dot menu** → "Add to Home Screen"
3. Tap **Add** – icon appears on home screen!

### On iPhone/iPad:
1. Open in **Safari**
2. Tap the **Share button** (box with arrow)
3. Scroll down → tap **"Add to Home Screen"**

## 🌐 Hosting Online (Firebase – Free)

1. Go to [console.firebase.google.com](https://console.firebase.google.com/)
2. Create a new project → Enable **Hosting**
3. Download Firebase CLI: `npm install -g firebase-tools`
4. Run: `firebase login` → `firebase init hosting` → `firebase deploy`

Your app will be live at: `https://YOUR-PROJECT.web.app`

## 📁 File Structure

```
krk-growth-engine/
├── index.html       # Main app shell
├── style.css        # Design system & animations
├── data.js          # Templates & state (6 languages)
├── app.js           # Navigation, dashboard, content engine
├── pages2.js        # Campaign, calendar, share, leads, viral
├── pages3.js        # Gamification, insurance, admin, bootstrap
├── sw.js            # Service worker (offline/PWA)
├── manifest.json    # PWA manifest
└── icons/           # App icons
```

## ✨ Features Included

| Feature | Status |
|---|---|
| AI Content Engine (6 languages) | ✅ Ready |
| Smart Campaign Builder | ✅ Ready |
| Auto Content Calendar | ✅ Ready |
| One-Click Multi-Share | ✅ Ready |
| WhatsApp Lead Capture | ✅ Ready |
| Viral Prediction Engine | ✅ Ready |
| Gamification & Badges | ✅ Ready |
| Insurance Expert Mode | ✅ Ready |
| Analytics Dashboard | ✅ Ready |
| Admin Super Panel | ✅ Ready |
| Dark / Light Mode | ✅ Ready |
| PWA Installable | ✅ Ready |

## 🔌 Firebase Integration (Optional)

To connect real Firebase backend:
1. Create `firebase-config.js`
2. Add your Firebase project credentials
3. Enable Auth, Firestore, and Hosting in Firebase Console

---
Built with ❤️ by KRK Growth Engine
