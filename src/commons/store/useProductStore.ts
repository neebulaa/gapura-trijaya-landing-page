import { IProduct } from '@/types/product';
import { create } from 'zustand';

interface ProductState {
  selectedVariant: IProduct | null;
  setSelectedVariant: (variant: IProduct | null) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  selectedVariant: null,
  setSelectedVariant: (variant) => set({ selectedVariant: variant }),
}));
