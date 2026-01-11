import React, { useState, useEffect } from 'react';
import { Restaurant, FilterOptions, AllergyType } from '@types/index';
import { useGeolocation } from '@hooks/useGeolocation';
import { useFilterStore, useSwipeStore } from '@store/index';
import { restaurantAPI } from '@services/api';
import RestaurantCard from '@components/RestaurantCard';
import AllergyFilter from '@components/AllergyFilter';
import SwipeCard from '@components/SwipeCard';

const ALLERGIES: AllergyType[] = [
  'gluten', 'milk', 'eggs', 'fish', 'shellfish', 
  'tree-nuts', 'peanuts', 'sesame', 'soy', 'mustard', 'celery', 'sulphites'
];

const Discover: React.FC = () => {
  const { location, loading: geoLoading } = useGeolocation();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMap, setShowMap] = useState(false);
  
  const filters = useFilterStore((state) => state.filters);
  const { likedRestaurants, addLike, addDislike } = useSwipeStore();

  useEffect(() => {
    if (location) {
      loadRestaurants();
    }
  }, [location, filters]);

  const loadRestaurants = async () => {
    if (!location) return;
    
    setLoading(true);
    try {
      const data = await restaurantAPI.getNearby(
        location.lat,
        location.lng,
        filters
      );
      setRestaurants(data);
    } catch (error) {
      console.error('Error loading restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSwipe = async (restaurantId: string, liked: boolean) => {
    if (liked) {
      addLike(restaurantId);
      await restaurantAPI.like(restaurantId);
    } else {
      addDislike(restaurantId);
    }
    
    if (currentIndex < restaurants.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Show recommended restaurant
      showRecommendation();
    }
  };

  const showRecommendation = () => {
    const mostLiked = Array.from(likedRestaurants).reduce((prev, curr) => {
      const prevRest = restaurants.find((r) => r.id === prev);
      const currRest = restaurants.find((r) => r.id === curr);
      return (currRest?.likes || 0) > (prevRest?.likes || 0) ? curr : prev;
    });

    if (mostLiked) {
      alert(`Unser Tipp für dich: ${restaurants.find((r) => r.id === mostLiked)?.name}`);
    }
  };

  if (geoLoading) {
    return <div className="flex justify-center items-center h-screen">Laden...</div>;
  }

  if (!location) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Standortzugriff erforderlich</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Restaurants in deiner Nähe 🗺️
          </h1>
          
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setShowMap(!showMap)}
              className="btn-secondary px-6 py-2"
            >
              {showMap ? 'Karten-Ansicht' : 'Swipe-Ansicht'}
            </button>
          </div>

          <AllergyFilter allergies={ALLERGIES} />
        </header>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-slate-600">Restaurants werden geladen...</p>
          </div>
        ) : restaurants.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">
              Keine Restaurants mit deinen Filtereinstellungen gefunden.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Swipe Section */}
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold mb-6">Swipe & Wähle</h2>
              {currentIndex < restaurants.length ? (
                <SwipeCard
                  restaurant={restaurants[currentIndex]}
                  onSwipe={handleSwipe}
                />
              ) : (
                <div className="card text-center py-12">
                  <p className="text-lg text-slate-600 mb-4">
                    🎉 Alle Restaurants durchgesehen!
                  </p>
                  <button
                    onClick={() => {
                      setCurrentIndex(0);
                      loadRestaurants();
                    }}
                    className="btn-primary"
                  >
                    Neu laden
                  </button>
                </div>
              )}
            </div>

            {/* Liked Restaurants List */}
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold mb-6">
                Deine Favoriten ({likedRestaurants.size})
              </h2>
              <div className="space-y-4 flex-1 overflow-y-auto">
                {Array.from(likedRestaurants).map((id) => {
                  const restaurant = restaurants.find((r) => r.id === id);
                  return restaurant ? (
                    <RestaurantCard key={id} restaurant={restaurant} compact />
                  ) : null;
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover;
