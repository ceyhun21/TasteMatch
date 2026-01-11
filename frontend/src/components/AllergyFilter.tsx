import React from 'react';
import { AllergyType } from '@types/index';
import { useFilterStore } from '@store/index';

interface AllergyFilterProps {
  allergies: AllergyType[];
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

const AllergyFilter: React.FC<AllergyFilterProps> = ({ allergies }) => {
  const { filters, setAllergies, setMaxDistance, setOnlyVerified } = useFilterStore();
  const [expanded, setExpanded] = React.useState(false);

  const toggleAllergy = (allergy: AllergyType) => {
    const newAllergies = filters.allergies.includes(allergy)
      ? filters.allergies.filter((a) => a !== allergy)
      : [...filters.allergies, allergy];
    setAllergies(newAllergies);
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">Filter</h3>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-blue-500 hover:text-blue-600"
        >
          {expanded ? 'Ausblenden' : 'Anzeigen'}
        </button>
      </div>

      {expanded && (
        <div className="space-y-6">
          {/* Allergie Auswahl */}
          <div>
            <h4 className="font-semibold mb-3">Meine Allergien</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {allergies.map((allergy) => (
                <button
                  key={allergy}
                  onClick={() => toggleAllergy(allergy)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    filters.allergies.includes(allergy)
                      ? 'bg-red-500 text-white'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  {ALLERGY_LABELS[allergy]}
                </button>
              ))}
            </div>
          </div>

          {/* Entfernung */}
          <div>
            <label className="block font-semibold mb-2">
              Maximale Entfernung: <span className="text-blue-500">{filters.maxDistance} km</span>
            </label>
            <input
              type="range"
              min="1"
              max="50"
              value={filters.maxDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Nur verifizierte */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.onlyVerified}
                onChange={(e) => setOnlyVerified(e.target.checked)}
                className="w-5 h-5"
              />
              <span className="font-semibold">Nur verifizierte Restaurants</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllergyFilter;
