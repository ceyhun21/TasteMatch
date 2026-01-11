# Getting Started with TasteMatch

## 🚀 Quick Start

### 1. Prerequisites
- Node.js 18+
- Firebase Project
- Google Maps API Key

### 2. Clone & Install
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies  
cd ../backend
npm install
```

### 3. Configure Environment
- Copy `frontend/.env.example` → `frontend/.env.local`
- Copy `backend/.env.example` → `backend/.env`
- Fill in your Firebase and Google Maps keys

### 4. Run Development Servers
```bash
# Terminal 1 - Frontend
cd frontend
npm run dev

# Terminal 2 - Backend
cd backend
npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 📁 Project Structure

```
TasteMatch/
├── frontend/
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   │   ├── SwipeCard.tsx      # Tinder-like swiping
│   │   │   ├── RestaurantCard.tsx # Restaurant display
│   │   │   ├── AllergyFilter.tsx  # Filter UI
│   │   │   ├── ReviewList.tsx     # Reviews & ratings
│   │   │   ├── AllergyInfo.tsx    # Allergen warnings
│   │   │   └── MapCard.tsx        # Location & contact
│   │   ├── pages/                # Page components
│   │   │   ├── Home.tsx          # Landing page
│   │   │   ├── Discover.tsx      # Main app page
│   │   │   ├── Auth.tsx          # Login/register
│   │   │   ├── Profile.tsx       # User profile
│   │   │   └── RestaurantDetail.tsx
│   │   ├── hooks/                # Custom React hooks
│   │   │   └── useGeolocation.ts
│   │   ├── services/             # API & Firebase
│   │   │   ├── api.ts            # Axios API client
│   │   │   └── firebase.ts       # Firebase config
│   │   ├── store/                # Zustand stores
│   │   │   └── index.ts          # State management
│   │   ├── types/                # TypeScript types
│   │   │   └── index.ts          # Shared types
│   │   ├── styles/               # CSS
│   │   │   └── index.css
│   │   ├── App.tsx               # Main app component
│   │   └── main.tsx              # Entry point
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── .env.example
│
├── backend/
│   ├── src/
│   │   ├── controllers/          # Request handlers
│   │   │   ├── restaurantController.ts
│   │   │   ├── reviewController.ts
│   │   │   ├── userController.ts
│   │   │   └── verificationController.ts
│   │   ├── routes/               # API routes
│   │   ├── middlewares/          # Express middlewares
│   │   │   └── auth.ts
│   │   ├── services/             # Business logic
│   │   ├── types/                # TypeScript types
│   │   ├── firebase.ts           # Firebase init
│   │   └── index.ts              # Express server
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── docs/
│   ├── SETUP.md                  # Installation guide
│   ├── API.md                    # API documentation
│   ├── DATABASE_SCHEMA.md        # Firestore schema
│   └── ARCHITECTURE.md           # Architecture overview
│
├── docker-compose.yml            # Docker setup
└── README.md
```

## 🎯 Key Features

### 1. Allergie-Filtering
- Select your allergies
- Restaurants automatically filtered
- Allergen information displayed

### 2. Swipe Interface
- Drag left to pass ❌
- Drag right to like ❤️
- Smooth animations
- Mobile-friendly

### 3. Real Reviews
- See photos from diners
- 5-star ratings
- Allergen-specific comments
- Helpful voting

### 4. Restaurant Verification
- Restaurants register & verify
- Email-based verification
- Verified badge
- Safe allergen info

## 🔧 Development

### Available Scripts

**Frontend:**
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview build
```

**Backend:**
```bash
npm run dev      # Start dev server with nodemon
npm run build    # Build TypeScript
npm run start    # Run compiled code
npm run serve    # Run production build
```

## 🗄️ Database Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable Firestore Database
4. Create these collections:
   - `users`
   - `restaurants`
   - `reviews`
   - `verificationRequests`

## 🔐 API Keys

### Google Maps
1. [Google Cloud Console](https://console.cloud.google.com)
2. Create project
3. Enable "Maps JavaScript API"
4. Create API key
5. Add to `.env.local`

### Firebase
1. [Firebase Console](https://console.firebase.google.com)
2. Create project
3. Register app
4. Copy config to `.env.local`

## 📚 API Reference

See [docs/API.md](docs/API.md) for complete API documentation.

## 🐳 Docker

```bash
# Build & run with Docker
docker-compose up --build
```

## 🚀 Deployment

### Frontend (Vercel, Netlify)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Heroku, Railway, Cloud Run)
```bash
npm run build
npm run serve
```

## 🆘 Troubleshooting

**CORS Errors**
- Check API URL in `.env.local`
- Ensure backend CORS is enabled

**Firebase Issues**
- Verify credentials
- Check Firestore rules
- Ensure DB is initialized

**Geolocation Issues**
- Use HTTPS in production
- Allow location permission
- Check browser privacy settings

## 📖 Learn More

- [React Documentation](https://react.dev)
- [Firebase Docs](https://firebase.google.com/docs)
- [Express.js Guide](https://expressjs.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)

## 📝 License

MIT License - See LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Happy coding! 🎉** If you have questions, check the docs folder or create an issue.
