import React from 'react';
import { useCustomizationStore } from '../../store/customizationStore';
import { GlovePattern } from '../../types/glove';

const patterns: GlovePattern[] = [
  {
    name: 'None',
    imageUrl: '',
    price: 0,
  },
  {
    name: 'Lightning Bolt',
    imageUrl: 'pattern-lightning.png',
    price: 12.99,
  },
  {
    name: 'Stars',
    imageUrl: 'pattern-stars.png',
    price: 12.99,
  },
  { 
    name: 'Tribal',
    imageUrl: 'pattern-tribal.png',
    price: 14.99,
  },
  {
    name: 'Camouflage',
    imageUrl: 'pattern-camo.png',
    price: 14.99,
  },
  {
    name: 'Flames',
    imageUrl: 'pattern-flames.png',
    price: 14.99,
  },
  {
    name: 'Dragon',
    imageUrl: 'pattern-dragon.png',
    price: 19.99,
  },
  {
    name: 'Flag',
    imageUrl: 'pattern-flag.png',
    price: 19.99,
  },
];

const PatternSelector: React.FC = () => {
  const { glove, updatePattern } = useCustomizationStore();
  
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Choose Pattern</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {patterns.map((pattern) => (
          <button
            key={pattern.name}
            onClick={() => updatePattern(pattern)}
            className={`
              p-3 rounded-lg border text-center relative aspect-square flex flex-col items-center justify-center
              ${glove.pattern.name === pattern.name 
                ? 'border-gold bg-gold/10' 
                : 'border-neutral-700 hover:border-gold/50 bg-navy/50'
              }
              transition-colors
            `}
          >
            {pattern.name === 'None' ? (
              <div className="text-3xl opacity-20">Ø</div>
            ) : (
              <div className="text-2xl">
                {pattern.name === 'Lightning Bolt' && '⚡'}
                {pattern.name === 'Stars' && '★'}
                {pattern.name === 'Tribal' && '▲'}
                {pattern.name === 'Camouflage' && '◈'}
                {pattern.name === 'Flames' && '🔥'}
                {pattern.name === 'Dragon' && '🐉'}
                {pattern.name === 'Flag' && '🏁'}
              </div>
            )}
            <h4 className="font-medium text-sm mt-2">{pattern.name}</h4>
            {pattern.price > 0 && (
              <div className="mt-1 text-xs text-neutral-400">
                +${pattern.price.toFixed(2)}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PatternSelector;