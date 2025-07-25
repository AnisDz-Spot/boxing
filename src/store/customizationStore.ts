import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export interface GloveColor {
  name: string;
  hex: string;
  price: number;
}

export interface GloveMaterial {
  name: string;
  description: string;
  price: number;
}

export interface GlovePattern {
  name: string;
  imageUrl: string;
  price: number;
}

export interface GloveTrim {
  name: string;
  description: string;
  price: number;
}

export interface CustomImage {
  id: string;
  url: string;
  transform: ImageTransform;
}

export type Zone = 
  | 'Wrist'
  | 'InnerThumb'
  | 'OutterThumb'
  | 'InnerPalm'
  | 'OutterPalm'
  | 'Strap'
  | 'WristOutline';

export interface TextSettings {
  text: string;
  font: string;
  color: string;
  size: number;
  rotation: number;
  x: number;
  y: number;
}

export interface ImageTransform {
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

export interface CustomGlove {
  id: string;
  basePrice: number;
  customizationCost: number;

  palmColor: GloveColor;
  thumbColor: GloveColor;
  mainColor: GloveColor;
  wristColor: GloveColor;
  laceColor: GloveColor;
  trimColor: GloveColor;

  fingersColor: GloveColor;
  innerPalmColor: GloveColor;
  outerPalmColor: GloveColor;
  innerThumbColor: GloveColor;
  outerThumbColor: GloveColor;
  strapColor: GloveColor;
  wristOutlineColor: GloveColor;
  outlineColor: GloveColor;

  material: GloveMaterial;
  pattern: GlovePattern;
  trim: GloveTrim;
  size: string;

  customTexts: TextSettings[];
  customImages: CustomImage[];
}

interface CustomizationState {
  glove: CustomGlove;
  textZones: Record<Zone, TextSettings>;
  customImages: Record<Zone, CustomImage[]>;
  updateColor: (part: string, color: GloveColor) => void;
  updateSize: (size: string) => void;
  updateTextZone: (zone: Zone, updates: Partial<TextSettings>) => void;
  addCustomImage: (zone: Zone, url: string) => void;
  removeCustomImage: (zone: Zone, imageId: string) => void;
  updateImageTransform: (zone: Zone, imageId: string, transform: ImageTransform) => void;
  resetCustomization: () => void;
  calculatePrice: () => number;
}

const defaultColor: GloveColor = {
  name: 'Classic Black',
  hex: '#000000',
  price: 0,
};

const defaultTextSettings: TextSettings = {
  text: '',
  font: 'Arial',
  color: '#FFFFFF',
  size: 64,
  rotation: 0,
  x: 256,
  y: 256,
};

const defaultImageTransform: ImageTransform = {
  x: 0,
  y: 0,
  scale: 1,
  rotation: 0,
};

const zones: Zone[] = [
  'Wrist',
  'InnerThumb',
  'OutterThumb',
  'InnerPalm',
  'OutterPalm',
  'Strap',
  'WristOutline'
];

const initialGlove: CustomGlove = {
  id: uuidv4(),
  basePrice: 129.99,
  customizationCost: 0,

  palmColor: defaultColor,
  thumbColor: defaultColor,
  mainColor: defaultColor,
  wristColor: defaultColor,
  laceColor: defaultColor,
  trimColor: defaultColor,

  fingersColor: defaultColor,
  innerPalmColor: defaultColor,
  outerPalmColor: defaultColor,
  innerThumbColor: defaultColor,
  outerThumbColor: defaultColor,
  strapColor: defaultColor,
  wristOutlineColor: defaultColor,
  outlineColor: defaultColor,

  material: {
    name: 'Premium Leather',
    description: 'Genuine leather for durability and comfort',
    price: 0,
  },
  pattern: {
    name: 'None',
    imageUrl: '',
    price: 0,
  },
  trim: {
    name: 'Standard',
    description: 'Classic boxing glove trim',
    price: 0,
  },
  size: '12oz',

  customTexts: [],
  customImages: [],
};

export const useCustomizationStore = create<CustomizationState>((set, get) => ({
  glove: initialGlove,

  textZones: {
    Wrist: {
      text: '',
      font: 'Arial',
      color: '#FFFFFF',
      size: 36,
      rotation: 90,
      x: 260,
      y: 360,
    },
    InnerThumb: {
      text: '',
      font: 'Arial',
      color: '#FFFFFF',
      size: 28,
      rotation: 300,
      x: 250,
      y: 220,
    },
    OutterThumb: {
      text: '',
      font: 'Arial',
      color: '#FFFFFF',
      size: 70,
      rotation: 30,
      x: 180,
      y: 230,
    },
    InnerPalm: {
      text: '',
      font: 'Arial',
      color: '#FFFFFF',
      size: 36,
      rotation: 0,
      x: 200,
      y:110,
    },
    OutterPalm: {
      text: '',
      font: 'Arial',
      color: '#FFFFFF',
      size: 32,
      rotation: 0,
      x: 350,
      y: 400,
    },
    Strap: {
      text: '',
      font: 'Arial',
      color: '#FFFFFF',
      size: 32,
      rotation: 90,
      x: 110,
      y: 450,
    },
    WristOutline: {
      text: '',
      font: 'Arial',
      color: '#FFFFFF',
      size: 64,
      rotation: 0,
      x: 256,
      y: 256,
    },
  },


  customImages: zones.reduce((acc, zone) => {
    acc[zone] = [];
    return acc;
  }, {} as Record<Zone, CustomImage[]>),

  updateColor: (part, color) => {
    set((state) => {
      const updatedGlove = { ...state.glove };
      updatedGlove[`${part}Color`] = color;
      updatedGlove.customizationCost = get().calculatePrice() - updatedGlove.basePrice;
      return { glove: updatedGlove };
    });
  },

  updateSize: (size) => {
    set((state) => ({
      glove: {
        ...state.glove,
        size,
      },
    }));
  },

  updateTextZone: (zone, updates) => {
    set((state) => {
      const updatedZones = {
        ...state.textZones,
        [zone]: {
          ...state.textZones[zone],
          ...updates,
        }
      };

      if (zone === 'Strap') {
        updatedZones.WristOutline = {
          ...state.textZones.WristOutline,
          ...updates,
        };
      }

      return { textZones: updatedZones };
    });
  },

  addCustomImage: (zone, url) => {
    const newImage = {
      id: uuidv4(),
      url,
      transform: { ...defaultImageTransform }
    };

    set((state) => {
      const updatedImages = {
        ...state.customImages,
        [zone]: [...state.customImages[zone], newImage]
      };

      if (zone === 'Strap') {
        updatedImages.WristOutline = [...state.customImages.WristOutline, newImage];
      }

      return { customImages: updatedImages };
    });
  },

  removeCustomImage: (zone, imageId) => {
    set((state) => {
      const updatedImages = {
        ...state.customImages,
        [zone]: state.customImages[zone].filter(img => img.id !== imageId)
      };

      if (zone === 'Strap') {
        updatedImages.WristOutline = state.customImages.WristOutline.filter(img => img.id !== imageId);
      }

      return { customImages: updatedImages };
    });
  },

  updateImageTransform: (zone, imageId, transform) => {
    set((state) => {
      const updatedImages = {
        ...state.customImages,
        [zone]: state.customImages[zone].map(img => 
          img.id === imageId ? { ...img, transform } : img
        )
      };

      if (zone === 'Strap') {
        updatedImages.WristOutline = state.customImages.WristOutline.map(img =>
          img.id === imageId ? { ...img, transform } : img
        );
      }

      return { customImages: updatedImages };
    });
  },

  resetCustomization: () => {
    set({
      glove: { ...initialGlove, id: uuidv4() },
      textZones: zones.reduce((acc, zone) => {
        acc[zone] = { ...defaultTextSettings };
        return acc;
      }, {} as Record<Zone, TextSettings>),
      customImages: zones.reduce((acc, zone) => {
        acc[zone] = [];
        return acc;
      }, {} as Record<Zone, CustomImage[]>),
    });
  },

  calculatePrice: () => {
    const { glove } = get();
    let total = glove.basePrice;

    total += glove.palmColor.price;
    total += glove.thumbColor.price;
    total += glove.mainColor.price;
    total += glove.wristColor.price;
    total += glove.laceColor.price;
    total += glove.trimColor.price;
    total += glove.fingersColor.price;
    total += glove.innerPalmColor.price;
    total += glove.outerPalmColor.price;
    total += glove.innerThumbColor.price;
    total += glove.outerThumbColor.price;
    total += glove.strapColor.price;
    total += glove.wristOutlineColor.price;
    total += glove.outlineColor.price;

    total += glove.material.price;
    total += glove.pattern.price;
    total += glove.trim.price;

    total += glove.customTexts.length * 4.99;

    const totalImages = Object.entries(get().customImages)
      .filter(([zone]) => zone !== 'WristOutline')
      .reduce((sum, [, zoneImages]) => sum + zoneImages.length, 0);
    total += totalImages * 7.99;

    return total;
  },
}));
