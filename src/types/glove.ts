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

export interface CustomText {
  content: string;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  scale: number;
}

export interface CustomImage {
  url: string;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  scale: number;
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
  material: GloveMaterial;
  pattern: GlovePattern;
  trim: GloveTrim;
  size: string;
  customText: string;
  customTexts: CustomText[];
  customImages: CustomImage[];
}