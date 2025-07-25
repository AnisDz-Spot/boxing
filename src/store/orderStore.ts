import { create } from 'zustand';
import { GloveOrder } from '../types/order';
import { useCustomizationStore } from './customizationStore';

interface OrderState {
  orders: GloveOrder[];
  createOrder: (customerDetails: GloveOrder['customerDetails']) => GloveOrder;
  getOrder: (orderId: string) => GloveOrder | undefined;
  updateOrderStatus: (orderId: string, status: GloveOrder['status'], note?: string) => void;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],

  createOrder: (customerDetails) => {
    const glove = useCustomizationStore.getState().glove;
    const textZones = useCustomizationStore.getState().textZones;
    const customImages = useCustomizationStore.getState().customImages;

    const newOrder: GloveOrder = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      gloveConfiguration: {
        // Colors
        fingersColor: { 
          name: glove.fingersColor.name, 
          hex: glove.fingersColor.hex 
        },
        innerPalmColor: { 
          name: glove.innerPalmColor.name, 
          hex: glove.innerPalmColor.hex 
        },
        outerPalmColor: { 
          name: glove.outerPalmColor.name, 
          hex: glove.outerPalmColor.hex 
        },
        innerThumbColor: { 
          name: glove.innerThumbColor.name, 
          hex: glove.innerThumbColor.hex 
        },
        outerThumbColor: { 
          name: glove.outerThumbColor.name, 
          hex: glove.outerThumbColor.hex 
        },
        strapColor: { 
          name: glove.strapColor.name, 
          hex: glove.strapColor.hex 
        },
        wristColor: { 
          name: glove.wristColor.name, 
          hex: glove.wristColor.hex 
        },
        wristOutlineColor: { 
          name: glove.wristOutlineColor.name, 
          hex: glove.wristOutlineColor.hex 
        },
        outlineColor: { 
          name: glove.outlineColor.name, 
          hex: glove.outlineColor.hex 
        },

        // Material & Size
        material: {
          name: glove.material.name,
          description: glove.material.description,
        },
        size: glove.size,

        // Text Elements
        textElements: Object.entries(textZones)
          .filter(([zone, settings]) => settings.text.trim() !== '')
          .map(([zone, settings]) => ({
            zone,
            text: settings.text,
            font: settings.font,
            color: settings.color,
            size: settings.size,
            rotation: settings.rotation,
            position: { x: settings.x, y: settings.y },
          })),

        // Image Elements
        imageElements: Object.entries(customImages)
          .filter(([zone]) => zone !== 'WristOutline') // Exclude WristOutline as it mirrors Strap
          .flatMap(([zone, images]) =>
            images.map(img => ({
              zone,
              url: img.url,
              transform: img.transform,
            }))
          ),
      },

      manufacturingInstructions: generateManufacturingInstructions(glove),
      qualityChecklist: generateQualityChecklist(),
      customerDetails,
      
      status: 'pending',
      statusHistory: [{
        status: 'pending',
        timestamp: new Date().toISOString(),
        note: 'Order received',
      }],

      pricing: {
        basePrice: glove.basePrice,
        colorUpcharges: calculateColorUpcharges(glove),
        materialUpcharge: glove.material.price,
        customizationCharges: calculateCustomizationCharges(textZones, customImages),
        subtotal: 0, // Will be calculated below
        tax: 0, // Will be calculated below
        shipping: 0, // Will be calculated below
        total: 0, // Will be calculated below
      },
    };

    // Calculate final pricing
    newOrder.pricing.subtotal = 
      newOrder.pricing.basePrice +
      newOrder.pricing.colorUpcharges +
      newOrder.pricing.materialUpcharge +
      newOrder.pricing.customizationCharges;
    
    newOrder.pricing.tax = newOrder.pricing.subtotal * 0.08; // 8% tax rate
    newOrder.pricing.shipping = 15.99; // Standard shipping rate
    newOrder.pricing.total = 
      newOrder.pricing.subtotal +
      newOrder.pricing.tax +
      newOrder.pricing.shipping;

    set(state => ({
      orders: [...state.orders, newOrder],
    }));

    return newOrder;
  },

  getOrder: (orderId) => {
    return get().orders.find(order => order.id === orderId);
  },

  updateOrderStatus: (orderId, status, note) => {
    set(state => ({
      orders: state.orders.map(order => 
        order.id === orderId
          ? {
              ...order,
              status,
              statusHistory: [
                ...order.statusHistory,
                {
                  status,
                  timestamp: new Date().toISOString(),
                  note,
                },
              ],
            }
          : order
      ),
    }));
  },
}));

// Helper functions
function generateManufacturingInstructions(glove: any): string {
  return `
MANUFACTURING INSTRUCTIONS

1. BASE CONSTRUCTION
   - Size: ${glove.size}
   - Material: ${glove.material.name}
   - Primary construction method: Machine stitched with reinforced stress points

2. COLOR APPLICATION
   - Fingers: ${glove.fingersColor.name} (${glove.fingersColor.hex})
   - Inner Palm: ${glove.innerPalmColor.name} (${glove.innerPalmColor.hex})
   - Outer Palm: ${glove.outerPalmColor.name} (${glove.outerPalmColor.hex})
   - Inner Thumb: ${glove.innerThumbColor.name} (${glove.innerThumbColor.hex})
   - Outer Thumb: ${glove.outerThumbColor.name} (${glove.outerThumbColor.hex})
   - Strap: ${glove.strapColor.name} (${glove.strapColor.hex})
   - Wrist: ${glove.wristColor.name} (${glove.wristColor.hex})
   - Wrist Outline: ${glove.wristOutlineColor.name} (${glove.wristOutlineColor.hex})
   - Outline: ${glove.outlineColor.name} (${glove.outlineColor.hex})

3. PADDING AND PROTECTION
   - Multi-layered foam core
   - Reinforced knuckle protection
   - Ergonomic thumb positioning

4. QUALITY REQUIREMENTS
   - All stitching must be uniform and reinforced
   - Color matching must be exact to specified hex codes
   - No visible glue marks or excess material
   - Smooth transitions between different colored sections
   - Even padding distribution throughout
`.trim();
}

function generateQualityChecklist(): GloveOrder['qualityChecklist'] {
  return [
    {
      category: 'Materials',
      items: [
        { description: 'Correct material type and grade used', completed: false },
        { description: 'Colors match specified hex codes exactly', completed: false },
        { description: 'No material defects or imperfections', completed: false },
      ],
    },
    {
      category: 'Construction',
      items: [
        { description: 'Stitching is uniform and reinforced', completed: false },
        { description: 'Padding is evenly distributed', completed: false },
        { description: 'All seams are properly aligned', completed: false },
        { description: 'Thumb position is ergonomically correct', completed: false },
      ],
    },
    {
      category: 'Customization',
      items: [
        { description: 'Custom text is correctly positioned and clear', completed: false },
        { description: 'Custom images are properly applied', completed: false },
        { description: 'No bleeding or smearing of customizations', completed: false },
      ],
    },
    {
      category: 'Final Inspection',
      items: [
        { description: 'Overall appearance matches 3D model', completed: false },
        { description: 'No loose threads or excess material', completed: false },
        { description: 'Proper weight for specified size', completed: false },
        { description: 'Quality control photos taken', completed: false },
      ],
    },
  ];
}

function calculateColorUpcharges(glove: any): number {
  return Object.entries(glove)
    .filter(([key]) => key.endsWith('Color'))
    .reduce((total, [, color]: [string, any]) => total + (color.price || 0), 0);
}

function calculateCustomizationCharges(textZones: any, customImages: any): number {
  const textCount = Object.values(textZones)
    .filter((zone: any) => zone.text.trim() !== '')
    .length;

  const imageCount = Object.entries(customImages)
    .filter(([zone]) => zone !== 'WristOutline') // Exclude WristOutline as it mirrors Strap
    .reduce((total, [, images]: [string, any[]]) => total + images.length, 0);

  return (textCount * 4.99) + (imageCount * 7.99);
}