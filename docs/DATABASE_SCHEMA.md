// Database Schema Documentation for TasteMatch

## Firestore Collections

### users
```
users/{userId}
├── email: string
├── name: string
├── avatar: string (URL)
├── allergies: AllergyType[]
├── createdAt: Timestamp
├── isVerified: boolean
├── profile:
│   ├── bio: string
│   ├── likeCount: number
│   └── reviewCount: number
└── likes/ (subcollection)
    ├── {restaurantId}
    │   ├── restaurantId: string
    │   ├── liked: boolean
    │   └── timestamp: Timestamp
```

### restaurants
```
restaurants/{restaurantId}
├── name: string
├── description: string
├── cuisine: string[]
├── rating: number
├── reviewCount: number
├── likes: number
├── location:
│   ├── lat: number
│   ├── lng: number
│   ├── address: string
│   └── city: string
├── image: string (URL)
├── images: string[] (gallery)
├── hours: string
├── phone: string
├── website: string (URL)
├── isVerified: boolean
├── verificationDate: Timestamp
├── allergyInfo: {
│   ├── gluten: boolean
│   ├── milk: boolean
│   ├── eggs: boolean
│   ├── fish: boolean
│   ├── shellfish: boolean
│   ├── tree-nuts: boolean
│   ├── peanuts: boolean
│   ├── sesame: boolean
│   ├── soy: boolean
│   ├── mustard: boolean
│   ├── celery: boolean
│   └── sulphites: boolean
├── owner:
│   ├── userId: string
│   ├── name: string
│   └── email: string
└── createdAt: Timestamp
```

### reviews
```
reviews/{reviewId}
├── restaurantId: string
├── userId: string
├── userName: string
├── userAvatar: string (URL)
├── rating: number (1-5)
├── text: string
├── images: string[] (URLs)
├── allergyRelevant: {
│   ├── gluten: string
│   ├── milk: string
│   ├── ... (allergen-specific comments)
│   └── sulphites: string
├── helpful: number
├── createdAt: Timestamp
└── updatedAt: Timestamp
```

### verificationRequests
```
verificationRequests/{requestId}
├── restaurantId: string
├── email: string
├── phone: string
├── contactPerson: string
├── status: 'pending' | 'verified' | 'rejected'
├── verificationCode: string
├── expiresAt: Timestamp
└── createdAt: Timestamp
```

## Indexes

### Recommended Firestore Indexes
- restaurants: verified, location.lat, location.lng
- restaurants: verified, rating (descending)
- reviews: restaurantId, createdAt (descending)
- reviews: userId, createdAt (descending)
