import React from 'react';
import { AllergyType } from '@types/index';
import { AlertTriangle } from 'react-icons/fa';

interface AllergyInfoProps {
  allergyInfo?: Record<AllergyType, boolean>;
}

const ALLERGY_LABELS: Record<AllergyType, string> = {
  'gluten': 'Gluten',
  'milk': 'Milchprodukte',
  'eggs': 'Eier',
  'fish': 'Fisch',
  'shellfish': 'Meeresfrüchte',
  'tree-nuts': 'Nussfrüchte',
  'peanuts': 'Erdnüsse',
  'sesame': 'Sesam',
  'soy': 'Soja',
  'mustard': 'Senf',
  'celery': 'Sellerie',
  'sulphites': 'Sulfite',
};

const AllergyInfo: React.FC<AllergyInfoProps> = ({ allergyInfo = {} }) => {
  const containsAllergens = Object.values(allergyInfo).some((contains) => contains);

  if (!containsAllergens) {
    return (
      <div className="card bg-green-50 border-l-4 border-green-500">
        <p className="text-green-800 font-semibold">✅ Allergie-freundlich</p>
        <p className="text-sm text-green-700">
          Dieses Restaurant hat für die meisten gängigen Allergien keine Produkte.
        </p>
      </div>
    );
  }

  return (
    <div className="card bg-orange-50 border-l-4 border-orange-500">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="text-orange-600" />
        <h3 className="font-bold text-orange-900">Allergie-Warnung</h3>
      </div>

      <p className="text-sm text-orange-800 mb-3">
        Dieses Restaurant enthält folgende Allergen-Zutaten:
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {Object.entries(allergyInfo).map(([allergen, contains]) => {
          if (!contains) return null;
          return (
            <div key={allergen} className="bg-white rounded p-2 border border-orange-200">
              <p className="text-xs font-semibold text-orange-900">
                ⚠️ {ALLERGY_LABELS[allergen as AllergyType]}
              </p>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-orange-700 mt-3">
        💡 <strong>Tipp:</strong> Kontaktiere das Restaurant, um sicherzustellen, dass 
        deine Allergie behandelt wird.
      </p>
    </div>
  );
};

export default AllergyInfo;
