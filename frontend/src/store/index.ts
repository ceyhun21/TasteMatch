import { create } from 'zustand';
import { User, FilterOptions, AllergyType, Restaurant } from '@types/index';

interface UserStore {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoading: false,
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
}));

interface FilterStore {
  filters: FilterOptions;
  setAllergies: (allergies: AllergyType[]) => void;
  setMaxDistance: (distance: number) => void;
  setCuisines: (cuisines: string[]) => void;
  setMinRating: (rating: number) => void;
  setOnlyVerified: (verified: boolean) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  filters: {
    allergies: [],
    maxDistance: 5,
    onlyVerified: true,
  },
  setAllergies: (allergies) => 
    set((state) => ({ filters: { ...state.filters, allergies } })),
  setMaxDistance: (maxDistance) => 
    set((state) => ({ filters: { ...state.filters, maxDistance } })),
  setCuisines: (cuisines) => 
    set((state) => ({ filters: { ...state.filters, cuisines } })),
  setMinRating: (minRating) => 
    set((state) => ({ filters: { ...state.filters, minRating } })),
  setOnlyVerified: (onlyVerified) => 
    set((state) => ({ filters: { ...state.filters, onlyVerified } })),
}));

interface SwipeStore {
  likedRestaurants: Set<string>;
  dislikedRestaurants: Set<string>;
  addLike: (restaurantId: string) => void;
  addDislike: (restaurantId: string) => void;
  clearSwipes: () => void;
}

export const useSwipeStore = create<SwipeStore>((set) => ({
  likedRestaurants: new Set(),
  dislikedRestaurants: new Set(),
  addLike: (restaurantId) =>
    set((state) => ({
      likedRestaurants: new Set([...state.likedRestaurants, restaurantId]),
    })),
  addDislike: (restaurantId) =>
    set((state) => ({
      dislikedRestaurants: new Set([...state.dislikedRestaurants, restaurantId]),
    })),
  clearSwipes: () =>
    set({
      likedRestaurants: new Set(),
      dislikedRestaurants: new Set(),
    }),
}));
