import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'react-icons/fa';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-400 via-red-500 to-red-600">
      <div className="text-center text-white px-4 max-w-2xl">
        <div className="mb-8 flex justify-center">
          <Heart size={80} className="animate-bounce" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6">TasteMatch</h1>
        <p className="text-xl md:text-2xl mb-8 text-red-100">
          Finde dein perfektes Restaurant – mit Allergie-Filter und echten Bewertungen
        </p>
        
        <div className="space-y-4">
          <button
            onClick={() => navigate('/discover')}
            className="w-full md:w-auto btn-primary text-lg px-8 py-3 mb-4"
          >
            Jetzt Restaurants entdecken 🍽️
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 text-left">
            <div className="bg-white bg-opacity-20 backdrop-blur rounded-lg p-6">
              <h3 className="text-2xl mb-2 font-bold">🔍 Allergie-Filter</h3>
              <p>Finde Restaurants die deine Allergien berücksichtigen</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur rounded-lg p-6">
              <h3 className="text-2xl mb-2 font-bold">💬 Echte Bewertungen</h3>
              <p>Lese Kommentare & Fotos von echten Essern</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur rounded-lg p-6">
              <h3 className="text-2xl mb-2 font-bold">🗺️ In deiner Nähe</h3>
              <p>Restaurants in deinem Umkreis mit Google Maps</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
