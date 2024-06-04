import { IProduct } from '@/types/product';
import create from 'zustand';

interface ProductState {
  products: IProduct[];
  selectedProduct: IProduct | null;
  setProducts: (products: IProduct[]) => void;
  addProduct: (product: IProduct) => void;
  updateProduct: (updatedProduct: IProduct) => void;
  removeProduct: (productId: number) => void;
  selectProduct: (product: IProduct) => void;
  clearSelectedProduct: () => void;
}

const useProductStore = create<ProductState>((set) => ({
  products: [],
  selectedProduct: null,
  setProducts: (products: IProduct[]) => set({ products }),
  addProduct: (product: IProduct) => set((state) => ({ products: [...state.products, product] })),
  updateProduct: (updatedProduct: IProduct) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      ),
    })),
  removeProduct: (productId: number) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== productId),
    })),
  selectProduct: (product: IProduct) => set({ selectedProduct: product }),
  clearSelectedProduct: () => set({ selectedProduct: null }),
}));

export default useProductStore;
