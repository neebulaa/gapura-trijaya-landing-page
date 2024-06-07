import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  meta: any;
  createdAt: string;
  updatedAt: string;
  product: any;
}

interface CartState {
  items: CartItem[];
  setItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
}

const initialState: CartState = {
  items: [],
  setItem: () => {},
  removeItem: () => {},
};

const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      // items: [],
      ...initialState,
      setItem: (newItem: CartItem) =>
        set((state) => {
          const existingItemIndex = state.items.findIndex((item) => item.id === newItem.id);

          if (existingItemIndex !== -1) {
            // Item already exists, update its quantity
            const updatedItems = state.items.map((item, index) =>
              index === existingItemIndex
                ? { ...item, quantity: item.quantity + newItem.quantity }
                : item
            );
            return { items: updatedItems };
          } else {
            // Item does not exist, add it to the array
            return { items: [...state.items, newItem] };
          }
        }),
      removeItem: (id: string) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
    }),
    {
      name: 'cartStorage',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const { state, version } = JSON.parse(str);
          return {
            state,
            version,
          };
        },
        setItem: (name, newValue) => {
          const str = JSON.stringify({
            state: newValue.state,
            version: newValue.version,
          });
          localStorage.setItem(name, str);
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);

export default useCartStore;
