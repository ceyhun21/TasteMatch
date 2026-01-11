# TasteMatch - Architecture & Features

## 🏗️ System Architecture

### Frontend (React + TypeScript)
- **Vite** - Fast build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Zustand** - State Management
- **Firebase** - Authentication

### Backend (Node.js + Express)
- **Express.js** - API Framework
- **Firebase Admin SDK** - Database & Auth
- **TypeScript** - Type Safety

### Database (Firebase Firestore)
- Real-time database
- Cloud Storage for images
- User authentication

## 🎯 Core Features

### 1. Allergie-Filtering System
```
- Multi-select allergen filter
- 12 common allergens supported
- Restaurant-specific allergen info
- User preference storage
- Filter persistence
```

### 2. Tinder-like Swipe Interface
```
- Drag-to-swipe gestures
- Like/Dislike animations
- Restaurant card stacking
- Smooth transitions (Framer Motion)
- Mobile-optimized
```

### 3. Restaurant Discovery
```
- Geolocation-based search
- Google Maps integration
- Distance calculation
- Real-time restaurant data
- Filter by cuisine, rating, etc.
```

### 4. Restaurant Verification
```
- Email-based verification
- Verification codes
- Admin approval process
- Verified badge display
- Allergen information confirmation
```

### 5. Real User Reviews & Ratings
```
- 5-star rating system
- Photo uploads
- Allergen-specific comments
- Helpful voting
- User profiles & avatars
```

## 📊 Data Flow

```
User (React App)
  ↓
Firebase Auth (Login/Register)
  ↓
Zustand Store (State Management)
  ↓
API Client (Axios)
  ↓
Backend API (Express)
  ↓
Firestore Database
```

## 🔐 Security

- Firebase Authentication
- JWT Token validation
- Firestore Security Rules
- API rate limiting
- CORS protection

## 📱 Responsive Design

- Mobile-first approach
- Tailwind CSS breakpoints
- Touch-friendly gestures
- Optimized images

## 🚀 Performance

- Lazy loading
- Image optimization
- Code splitting
- Caching strategies
- Efficient state management

## 🌐 Supported Allergens

1. Gluten 🌾
2. Milk 🥛
3. Eggs 🥚
4. Fish 🐟
5. Shellfish 🦐
6. Tree Nuts 🌰
7. Peanuts 🥜
8. Sesame
9. Soy 
10. Mustard
11. Celery
12. Sulfites

## 📈 Scalability

- Firebase auto-scaling
- CDN for images
- Geospatial indexing
- Caching strategies
- Batch operations

## 🎨 UI/UX Components

- SwipeCard - Restaurant swiping
- RestaurantCard - Compact view
- AllergyFilter - Filter UI
- ReviewList - Comments & ratings
- AllergyInfo - Allergen display
- MapCard - Location & contact

## 🔄 API Endpoints Summary

### Restaurants
- `GET /api/restaurants/nearby`
- `GET /api/restaurants/:id`
- `POST /api/restaurants/:id/like`

### Reviews
- `GET /api/reviews/restaurant/:id`
- `POST /api/reviews`
- `POST /api/reviews/:id/helpful`

### Users
- `GET /api/users/:id`
- `PUT /api/users/:id/allergies`

### Verification
- `POST /api/verification/request`
- `POST /api/verification/:id`

## 🎓 Learning Resources

- React 18 Docs
- Firebase Documentation
- Express.js Guide
- Tailwind CSS
- Framer Motion Docs
