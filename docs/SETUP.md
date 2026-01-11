# Setup & Installation Guide

## Prerequisites
- Node.js 18+ 
- npm oder yarn
- Firebase Project
- Google Maps API Key

## Frontend Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env.local` and fill in your keys:
```bash
cp .env.example .env.local
```

**Required Variables:**
- `VITE_API_URL` - Backend API URL (http://localhost:5000)
- `VITE_GOOGLE_MAPS_KEY` - Google Maps API Key
- `VITE_FIREBASE_*` - Firebase Configuration

### 3. Get Google Maps API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable "Maps JavaScript API"
4. Create an API key (restrictions: HTTP referrers)
5. Copy the key to `.env.local`

### 4. Setup Firebase
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable Authentication (Email/Password, Google)
4. Create a Firestore Database
5. Copy the configuration to `.env.local`

### 5. Start Development Server
```bash
npm run dev
```
App opens at `http://localhost:3000`

## Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env` and fill in:
```bash
cp .env.example .env
```

**Required Variables:**
- `PORT` - Server port (5000)
- `FIREBASE_PROJECT_ID` - From Firebase Console
- `FIREBASE_PRIVATE_KEY` - Service Account Key
- `FIREBASE_CLIENT_EMAIL` - Service Account Email
- `GOOGLE_MAPS_API_KEY` - Google Maps Key

### 3. Get Firebase Service Account
1. Firebase Console → Project Settings → Service Accounts
2. Generate new private key (JSON)
3. Copy values to `.env`:
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_PRIVATE_KEY` (replace newlines with `\n`)
   - `FIREBASE_CLIENT_EMAIL`

### 4. Start Development Server
```bash
npm run dev
```
API runs at `http://localhost:5000`

## Firestore Setup

### Create Collections
1. Firebase Console → Firestore Database
2. Create these collections:
   - `users`
   - `restaurants`
   - `reviews`
   - `verificationRequests`

### Set Firestore Rules
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    match /restaurants/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /reviews/{document=**} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.userId;
    }
  }
}
```

## Troubleshooting

### CORS Errors
- Check `VITE_API_URL` matches backend URL
- Ensure backend CORS is configured

### Firebase Connection Issues
- Verify service account credentials
- Check Firebase project ID
- Ensure Firestore Database is initialized

### Google Maps Not Loading
- Verify API key is valid
- Check API key restrictions
- Ensure Maps API is enabled in Cloud Console

## Production Build

### Frontend
```bash
npm run build
npm run preview
```

### Backend
```bash
npm run build
npm run serve
```

## Docker Setup (Optional)

### Build Images
```bash
docker build -t tastematch-frontend ./frontend
docker build -t tastematch-backend ./backend
```

### Run Containers
```bash
docker-compose up
```
