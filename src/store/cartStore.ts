import { create } from 'zustand';
import {
  TextSettings,
  CustomImage,
  Zone,
  GloveColor,
  GloveMaterial,
} from '../store/customizationStore';

export type FullCartItem = {
  id: string;
  glove: {
    size: string;
    fingersColor: GloveColor;
    outerPalmColor: GloveColor;
    innerPalmColor: GloveColor;
    innerThumbColor: GloveColor;
    outerThumbColor: GloveColor;
    strapColor: GloveColor;
    wristColor: GloveColor;
    wristOutlineColor: GloveColor;
    outlineColor: GloveColor;
    material: GloveMaterial;
  };
  textZones: Record<Zone, TextSettings>;
  customImages: Record<Zone, CustomImage[]>;
  price: number;
  quantity: number;
};

interface CartStore {
  items: FullCartItem[];
  addToCart: (
      glove: FullCartItem['glove'],
      textZones: Record<Zone, TextSettings>,
      customImages: Record<Zone, CustomImage[]>,
      image: string,
      price: number,
      quantity: number
  ) => void;
  addCartItem: (item: FullCartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addCartItem: (item: FullCartItem) => {
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
          ),
        };
      }

      return {
        items: [...state.items, item],
      };
    });
  },

  addToCart: (glove, textZones, customImages, image, price, quantity) => {
    const id = glove.material.name + '-' + Date.now(); // générer un ID unique simple
    const item: FullCartItem = {
      id,
      glove,
      textZones,
      customImages,
      image,
      price,
      quantity,
    };
    get().addCartItem(item);
  },

  removeFromCart: (id) =>
      set((state) => ({
        items: state.items.filter((item) => item.id !== id),
      })),

  updateQuantity: (id, quantity) =>
      set((state) => ({
        items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
        ),
      })),

  clearCart: () => set({ items: [] }),

  getTotalPrice: () =>
      get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
      ),
}));
