import React from 'react';
import { MapPin, Phone, Globe, Clock } from 'react-icons/fa';
import { Restaurant } from '@types/index';

interface MapCardProps {
  restaurant: Restaurant;
}

const MapCard: React.FC<MapCardProps> = ({ restaurant }) => {
  const handleOpenMaps = () => {
    const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(
      `${restaurant.name} ${restaurant.location.address}`
    )}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <div className="card">
      <h3 className="text-xl font-bold mb-4">Kontakt & Standort</h3>

      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <MapPin className="text-red-500 flex-shrink-0 mt-1" />
          <div>
            <p className="font-semibold">{restaurant.location.address}</p>
            <p className="text-sm text-slate-600">{restaurant.location.city}</p>
            <button
              onClick={handleOpenMaps}
              className="text-xs text-blue-500 hover:underline mt-1"
            >
              In Google Maps öffnen →
            </button>
          </div>
        </div>

        {restaurant.phone && (
          <div className="flex items-center gap-3">
            <Phone className="text-blue-500 flex-shrink-0" />
            <a href={`tel:${restaurant.phone}`} className="text-blue-500 hover:underline">
              {restaurant.phone}
            </a>
          </div>
        )}

        {restaurant.hours && (
          <div className="flex items-start gap-3">
            <Clock className="text-green-500 flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold">Öffnungszeiten</p>
              <p className="text-sm text-slate-600">{restaurant.hours}</p>
            </div>
          </div>
        )}

        {restaurant.website && (
          <div className="flex items-center gap-3">
            <Globe className="text-purple-500 flex-shrink-0" />
            <a href={restaurant.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              Zur Website
            </a>
          </div>
        )}
      </div>

      {/* Distance Info */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-900">
          📍 <strong>{restaurant.distance?.toFixed(1)} km</strong> von dir entfernt
        </p>
      </div>
    </div>
  );
};

export default MapCard;
