import React from 'react';
import { motion } from 'framer-motion';
import { Restaurant } from '@types/index';
import { Heart, MapPin, Star, CheckCircle } from 'react-icons/fa';

interface SwipeCardProps {
  restaurant: Restaurant;
  onSwipe: (id: string, liked: boolean) => void;
}

const SwipeCard: React.FC<SwipeCardProps> = ({ restaurant, onSwipe }) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragX, setDragX] = React.useState(0);

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 100;
    
    if (info.offset.x > threshold) {
      onSwipe(restaurant.id, true);
    } else if (info.offset.x < -threshold) {
      onSwipe(restaurant.id, false);
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: -200, right: 200 }}
      onDragEnd={handleDragEnd}
      onDrag={(event, info) => setDragX(info.offset.x)}
      className="cursor-grab active:cursor-grabbing"
    >
      <div className="card relative overflow-hidden h-96 bg-cover bg-center" 
           style={{ backgroundImage: `url(${restaurant.image})` }}>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>

        {/* Like/Dislike Indicators */}
        {dragX > 50 && (
          <div className="absolute top-4 left-4 text-green-400 text-4xl font-bold">
            ❤️ LIKE
          </div>
        )}
        {dragX < -50 && (
          <div className="absolute top-4 right-4 text-red-400 text-4xl font-bold">
            PASS ✕
          </div>
        )}

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">{restaurant.name}</h2>
              <div className="flex items-center gap-2 mb-2">
                {restaurant.isVerified && (
                  <CheckCircle className="text-green-400" size={20} />
                )}
                <span className="text-sm font-semibold">
                  {restaurant.isVerified ? 'Verifiziertes Restaurant' : 'Nicht verifiziert'}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 mb-2">
                <Star className="text-yellow-400" size={20} />
                <span className="text-xl font-bold">{restaurant.rating.toFixed(1)}</span>
              </div>
              <span className="text-sm">({restaurant.reviewCount} Bewertungen)</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <MapPin size={16} />
            <span className="text-sm">{restaurant.distance?.toFixed(1)} km entfernt</span>
          </div>

          <p className="text-sm mb-3 line-clamp-2">{restaurant.description}</p>

          <div className="flex gap-2 flex-wrap">
            {restaurant.cuisine.map((c) => (
              <span key={c} className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-xs font-medium">
                {c}
              </span>
            ))}
          </div>

          {/* Allergie Hinweis */}
          <div className="mt-4 bg-yellow-500 bg-opacity-80 rounded p-2 text-xs">
            Allergie-Info verfügbar • Klick für Details
          </div>
        </div>
      </div>

      {/* Swipe Instructions */}
      <div className="text-center mt-4 text-slate-600 text-sm">
        👈 Nach links = Nicht interessiert | Nach rechts = Like ❤️
      </div>
    </motion.div>
  );
};

export default SwipeCard;
