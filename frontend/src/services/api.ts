import axios from 'axios';
import { Restaurant, Review, FilterOptions } from '@types/index';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Restaurants API
export const restaurantAPI = {
  getNearby: async (lat: number, lng: number, filters: FilterOptions) => {
    const response = await apiClient.get('/api/restaurants/nearby', {
      params: {
        lat,
        lng,
        maxDistance: filters.maxDistance,
        allergies: filters.allergies.join(','),
        onlyVerified: filters.onlyVerified,
        minRating: filters.minRating,
      },
    });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get(`/api/restaurants/${id}`);
    return response.data;
  },

  search: async (query: string, filters: FilterOptions) => {
    const response = await apiClient.get('/api/restaurants/search', {
      params: {
        query,
        allergies: filters.allergies.join(','),
        onlyVerified: filters.onlyVerified,
      },
    });
    return response.data;
  },

  like: async (restaurantId: string) => {
    const response = await apiClient.post(`/api/restaurants/${restaurantId}/like`);
    return response.data;
  },

  unlike: async (restaurantId: string) => {
    const response = await apiClient.post(`/api/restaurants/${restaurantId}/unlike`);
    return response.data;
  },
};

// Reviews API
export const reviewAPI = {
  getByRestaurant: async (restaurantId: string) => {
    const response = await apiClient.get(`/api/reviews/restaurant/${restaurantId}`);
    return response.data;
  },

  create: async (restaurantId: string, review: Omit<Review, 'id' | 'createdAt'>) => {
    const response = await apiClient.post(`/api/reviews`, {
      restaurantId,
      ...review,
    });
    return response.data;
  },

  delete: async (reviewId: string) => {
    const response = await apiClient.delete(`/api/reviews/${reviewId}`);
    return response.data;
  },

  markHelpful: async (reviewId: string) => {
    const response = await apiClient.post(`/api/reviews/${reviewId}/helpful`);
    return response.data;
  },
};

// User API
export const userAPI = {
  getProfile: async (userId: string) => {
    const response = await apiClient.get(`/api/users/${userId}`);
    return response.data;
  },

  updateAllergies: async (userId: string, allergies: string[]) => {
    const response = await apiClient.put(`/api/users/${userId}/allergies`, { allergies });
    return response.data;
  },

  getLikes: async (userId: string) => {
    const response = await apiClient.get(`/api/users/${userId}/likes`);
    return response.data;
  },
};

export default apiClient;
