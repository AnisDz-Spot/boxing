import React from 'react';
import { useCustomizationStore } from '../../store/customizationStore';

const sizes = [
  { size: '8oz', description: 'Training for juniors & competition' },
  { size: '10oz', description: 'Competition (lightweight divisions)' },
  { size: '12oz', description: 'Training & mid-weight competition' },
  { size: '14oz', description: 'All-purpose training' },
  { size: '16oz', description: 'Heavy bag & sparring' },
  { size: '18oz', description: 'Heavyweight sparring & training' },
];

const SizeSelector: React.FC = () => {
  const { glove, updateSize } = useCustomizationStore();
  
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Choose Size</h3>
      <div className="grid grid-cols-1 gap-3">
        {sizes.map((item) => (
          <button
            key={item.size} 
            onClick={() => updateSize(item.size)}
            className={`
              p-4 rounded-lg border flex items-center justify-between
              ${glove.size === item.size 
                ? 'border-gold bg-gold/10' 
                : 'border-neutral-700 hover:border-gold/50 bg-navy/50'
              }
              transition-colors
            `}
          >
            <div className="text-left">
              <h4 className="font-semibold">{item.size}</h4>
              <p className="text-sm text-neutral-400">{item.description}</p>
            </div>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${
              glove.size === item.size 
                ? 'border-gold bg-gold' 
                : 'border-neutral-500'
            }`}>
              {glove.size === item.size && (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              )}
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-6 p-4 rounded-lg bg-navy/50 border border-neutral-700">
        <h4 className="font-semibold mb-2">Sizing Guide</h4>
        <p className="text-sm text-neutral-400 mb-2">
          Weight class generally determines which glove size is appropriate:
        </p>
        <ul className="text-sm text-neutral-400 space-y-1">
          <li>• <span className="text-neutral-300">8-10oz</span>: Competition gloves (125-147 lbs)</li>
          <li>• <span className="text-neutral-300">12-14oz</span>: Training & medium-weight competition (147-167 lbs)</li>
          <li>• <span className="text-neutral-300">16-18oz</span>: Heavy bag work & sparring (167+ lbs)</li>
        </ul>
      </div>
    </div>
  );
};

export default SizeSelector;