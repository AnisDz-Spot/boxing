import React from 'react';
import { useCustomizationStore } from '../../store/customizationStore';
import { GloveMaterial } from '../../types/glove';

const materials: GloveMaterial[] = [
  {
    name: 'Premium Leather',
    description: 'Genuine leather for durability and comfort',
    price: 0,
  },
  {
    name: 'Synthetic Leather',
    description: 'Durable vegan-friendly alternative',
    price: 0,
  },
  {
    name: 'Microfiber',
    description: 'Lightweight and breathable material',
    price: 10.99,
  }, 
  {
    name: 'Pro Performance',
    description: 'Advanced composite for professional fighters',
    price: 24.99,
  },
  {
    name: 'Vintage Leather',
    description: 'Classic look with modern protection',
    price: 19.99,
  },
  {
    name: 'Carbon Fiber Reinforced',
    description: 'Ultra-durable with lightweight construction',
    price: 34.99,
  },
];

const MaterialSelector: React.FC = () => {
  const { glove, updateMaterial } = useCustomizationStore();
  
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Choose Material</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {materials.map((material) => (
          <button
            key={material.name}
            onClick={() => updateMaterial(material)}
            className={`
              p-4 rounded-lg border text-left relative
              ${glove.material.name === material.name 
                ? 'border-gold bg-gold/10' 
                : 'border-neutral-700 hover:border-gold/50 bg-navy/50'
              }
              transition-colors
            `}
          >
            <h4 className="font-semibold">{material.name}</h4>
            <p className="text-sm text-neutral-400 mt-1">{material.description}</p>
            {material.price > 0 && (
              <div className="mt-2 inline-block bg-navy/80 px-2 py-1 rounded text-xs">
                +${material.price.toFixed(2)}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MaterialSelector;