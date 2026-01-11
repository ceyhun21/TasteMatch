import React from 'react';
import { Restaurant } from '@types/index';
import { Star, MapPin, CheckCircle } from 'react-icons/fa';

interface RestaurantCardProps {
  restaurant: Restaurant;
  compact?: boolean;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, compact = false }) => {
  return (
    <div className={`card overflow-hidden hover:shadow-xl transition-all ${compact ? 'flex gap-4' : ''}`}>
      {compact && (
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
        />
      )}

      <div className="flex-1">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-lg text-slate-900">{restaurant.name}</h3>
          {restaurant.isVerified && (
            <CheckCircle className="text-green-500" size={20} />
          )}
        </div>

        <div className="flex items-center gap-2 mb-2">
          <Star className="text-yellow-500" size={16} />
          <span className="font-semibold">{restaurant.rating.toFixed(1)}</span>
          <span className="text-slate-500 text-sm">({restaurant.reviewCount})</span>
        </div>

        <div className="flex items-center gap-1 text-slate-600 text-sm mb-2">
          <MapPin size={14} />
          <span>{restaurant.location.address}</span>
        </div>

        {!compact && (
          <p className="text-slate-600 text-sm mb-3 line-clamp-2">
            {restaurant.description}
          </p>
        )}

        <div className="flex gap-2 flex-wrap">
          {restaurant.cuisine.slice(0, 2).map((c) => (
            <span key={c} className="bg-slate-100 px-2 py-1 rounded text-xs text-slate-700">
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
