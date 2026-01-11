# API Documentation

## Base URL
- Development: `http://localhost:5000`
- Production: `https://api.tastematch.com`

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer {firebaseIdToken}
```

## Endpoints

### Restaurants

#### Get Nearby Restaurants
```
GET /api/restaurants/nearby?lat={lat}&lng={lng}&maxDistance={km}&allergies={allergy1,allergy2}&onlyVerified={true|false}
```
Response:
```json
[
  {
    "id": "rest123",
    "name": "Restaurant Name",
    "rating": 4.5,
    "distance": 2.3,
    "isVerified": true,
    ...
  }
]
```

#### Get Restaurant Details
```
GET /api/restaurants/{restaurantId}
```

#### Like Restaurant
```
POST /api/restaurants/{restaurantId}/like
Body: { "userId": "user123" }
```

#### Unlike Restaurant
```
POST /api/restaurants/{restaurantId}/unlike
Body: { "userId": "user123" }
```

### Reviews

#### Get Reviews
```
GET /api/reviews/restaurant/{restaurantId}
```
Response:
```json
[
  {
    "id": "review123",
    "userName": "John",
    "rating": 5,
    "text": "Great food!",
    "images": ["url1", "url2"],
    "allergyRelevant": {
      "gluten": "Glutenfrei"
    },
    "createdAt": "2024-01-10T10:00:00Z"
  }
]
```

#### Create Review
```
POST /api/reviews
Body: {
  "restaurantId": "rest123",
  "userId": "user123",
  "rating": 4,
  "text": "Delicious!",
  "images": ["base64_image"],
  "allergyRelevant": {
    "gluten": "Glutenfrei Optionen verfügbar"
  }
}
```

#### Mark Review Helpful
```
POST /api/reviews/{reviewId}/helpful
```

### Users

#### Get User Profile
```
GET /api/users/{userId}
```

#### Update Allergies
```
PUT /api/users/{userId}/allergies
Body: { "allergies": ["gluten", "milk"] }
```

#### Get User's Liked Restaurants
```
GET /api/users/{userId}/likes
```

### Verification

#### Request Verification
```
POST /api/verification/request
Body: {
  "restaurantId": "rest123",
  "email": "owner@restaurant.com",
  "phone": "+491234567890",
  "contactPerson": "Owner Name"
}
```

#### Verify Restaurant
```
POST /api/verification/{restaurantId}
Body: {
  "verificationCode": "CODE123456",
  "allergyInfo": {
    "gluten": true,
    "milk": false
  }
}
```

#### Check Verification Status
```
GET /api/verification/{restaurantId}/status
```

## Error Responses
```json
{
  "error": "Error message",
  "status": 400
}
```

## Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error
