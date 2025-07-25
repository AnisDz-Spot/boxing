export interface GloveOrder {
  id: string;
  createdAt: string;
  gloveConfiguration: {
    // Colors
    fingersColor: { name: string; hex: string };
    innerPalmColor: { name: string; hex: string };
    outerPalmColor: { name: string; hex: string };
    innerThumbColor: { name: string; hex: string };
    outerThumbColor: { name: string; hex: string };
    strapColor: { name: string; hex: string };
    wristColor: { name: string; hex: string };
    wristOutlineColor: { name: string; hex: string };
    outlineColor: { name: string; hex: string };
    
    // Material & Size
    material: { name: string; description: string };
    size: string;
    
    // Custom Elements
    textElements: Array<{
      zone: string;
      text: string;
      font: string;
      color: string;
      size: number;
      rotation: number;
      position: { x: number; y: number };
    }>;
    
    imageElements: Array<{
      zone: string;
      url: string;
      transform: {
        x: number;
        y: number;
        scale: number;
        rotation: number;
      };
    }>;
  };
  
  // Manufacturing details
  manufacturingInstructions: string;
  qualityChecklist: Array<{
    category: string;
    items: Array<{ description: string; completed: boolean }>;
  }>;
  
  // Customer details
  customerDetails: {
    id: string;
    name: string;
    email: string;
    shippingAddress: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
  };
  
  // Order status
  status: 'pending' | 'confirmed' | 'manufacturing' | 'quality-check' | 'shipped';
  statusHistory: Array<{
    status: string;
    timestamp: string;
    note?: string;
  }>;
  
  // Pricing
  pricing: {
    basePrice: number;
    colorUpcharges: number;
    materialUpcharge: number;
    customizationCharges: number;
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
  };
}