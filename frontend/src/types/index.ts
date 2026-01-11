// Allergies Type Definition
export type AllergyType = 
  | 'gluten'
  | 'milk'
  | 'eggs'
  | 'fish'
  | 'shellfish'
  | 'tree-nuts'
  | 'peanuts'
  | 'sesame'
  | 'soy'
  | 'mustard'
  | 'celery'
  | 'sulphites';

// User Type
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  allergies: AllergyType[];
  createdAt: Date;
  isVerified: boolean;
}

// Restaurant Type
export interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisine: string[];
  rating: number;
  reviewCount: number;
  location: {
    lat: number;
    lng: number;
    address: string;
    city: string;
  };
  image: string;
  hours: string;
  phone: string;
  website?: string;
  allergyInfo: {
    [key in AllergyType]?: boolean; // true = contains allergen
  };
  isVerified: boolean;
  verificationDate?: Date;
  likes: number;
  distance?: number; // in km
}

// Review/Rating Type
export interface Review {
  id: string;
  restaurantId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  text: string;
  images: string[];
  allergyRelevant?: {
    [key in AllergyType]?: string; // comment about allergen handling
  };
  createdAt: Date;
  helpful: number;
}

// Swipe Result Type
export interface SwipeResult {
  restaurantId: string;
  liked: boolean;
  timestamp: Date;
}

// Filter Options Type
export interface FilterOptions {
  allergies: AllergyType[];
  maxDistance: number; // in km
  cuisines?: string[];
  minRating?: number;
  onlyVerified: boolean;
}
