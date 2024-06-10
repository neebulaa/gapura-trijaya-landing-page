// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// interface CartItem {
//   id: string;
//   cartId: string;
//   productId: string;
//   quantity: number;
//   meta: any;
//   createdAt: string;
//   updatedAt: string;
//   product: any;
// }

// interface CartState {
//   items: CartItem[];
//   setItem: (item: CartItem) => void;
//   removeItem: (id: string) => void;
// }

// const initialState: CartState = {
//   items: [],
//   setItem: () => {},
//   removeItem: () => {},
// };

// const useCartStore = create<CartState>()(
//   persist(
//     (set) => ({
//       // items: [],
//       ...initialState,
//       setItem: (newItem: CartItem) =>
//         set((state) => {
//           const existingItemIndex = state.items.findIndex((item) => item.id === newItem.id);

//           if (existingItemIndex !== -1) {
//             // Item already exists, update its quantity
//             const updatedItems = state.items.map((item, index) =>
//               index === existingItemIndex
//                 ? { ...item, quantity: item.quantity + newItem.quantity }
//                 : item
//             );
//             return { items: updatedItems };
//           } else {
//             // Item does not exist, add it to the array
//             return { items: [...state.items, newItem] };
//           }
//         }),
//       removeItem: (id: string) =>
//         set((state) => ({
//           items: state.items.filter((item) => item.id !== id),
//         })),
//     }),
//     {
//       name: 'cartStorage',
//       storage: {
//         getItem: (name) => {
//           const str = localStorage.getItem(name);
//           if (!str) return null;
//           const { state, version } = JSON.parse(str);
//           return {
//             state,
//             version,
//           };
//         },
//         setItem: (name, newValue) => {
//           const str = JSON.stringify({
//             state: newValue.state,
//             version: newValue.version,
//           });
//           localStorage.setItem(name, str);
//         },
//         removeItem: (name) => localStorage.removeItem(name),
//       },
//     }
//   )
// );

// export default useCartStore;

// V2
// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// interface ICartItem {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
//   quantity: number;
//   meta: any;
//   product: any;
// }

// interface CartState {
//   items: ICartItem[];
//   addItem: (item: ICartItem) => void;
//   updateItem: (id: string, quantity: number) => void;
//   removeItem: (id: string) => void;
//   clearCart: () => void;
// }

// const useCartStore = create<CartState>()(
//   persist(
//     (set) => ({
//       items: [],
//       addItem: (newItem: ICartItem) =>
//         set((state) => {
//           const existingItemIndex = state.items.findIndex((item) => item.id === newItem.id);

//           if (existingItemIndex !== -1) {
//             // Item already exists, update its quantity
//             const updatedItems = state.items.map((item, index) =>
//               index === existingItemIndex
//                 ? { ...item, quantity: item.quantity + newItem.quantity }
//                 : item
//             );
//             return { items: updatedItems };
//           } else {
//             // Item does not exist, add it to the array
//             return { items: [...state.items, newItem] };
//           }
//         }),
//       updateItem: (id: string, quantity: number) => {
//         set((state) => {
//           const updatedItems = state.items.map((item) =>
//             item.id === id ? { ...item, quantity } : item
//           );
//           return { items: updatedItems };
//         });
//       },
//       removeItem: (id: string) =>
//         set((state) => ({
//           items: state.items.filter((item) => item.id !== id),
//         })),
//       clearCart: () =>
//         set(() => ({
//           items: [],
//         })),
//     }),
//     {
//       name: 'cartStorage', // Name of the storage (localStorage key)
//       // getStorage: () => localStorage, // Specify the storage type
//       storage: {
//         getItem: (name) => {
//           const str = localStorage.getItem(name);
//           if (!str) return null;
//           const { state, version } = JSON.parse(str);
//           return {
//             state,
//             version,
//           };
//         },
//         setItem: (name, newValue) => {
//           const str = JSON.stringify({
//             state: newValue.state,
//             version: newValue.version,
//           });
//           localStorage.setItem(name, str);
//         },
//         removeItem: (name) => localStorage.removeItem(name),
//       },
//     }
//   )
// );

// export default useCartStore;

// V3
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ICartItem {
  id: string;
  name: string;
  slug: string;
  queryUrl?: string;
  price: number;
  image: string;
  quantity: number;
  // meta?: any;
  // product?: any;
}

interface CartState {
  items: ICartItem[];
  subTotal: number;
  total: number;
  addItem: (item: ICartItem) => void;
  updateItem: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  calculateCart: () => void;
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      subTotal: 0,
      total: 0,
      isLoading: false,
      setLoading: (loading: boolean) => set({ isLoading: loading }),
      addItem: (newItem: ICartItem) => {
        set({ isLoading: true });
        setTimeout(() => {
          set((state) => {
            const existingItemIndex = state.items.findIndex((item) => item.id === newItem.id);

            if (existingItemIndex !== -1) {
              // Item already exists, update its quantity
              const updatedItems = state.items.map((item, index) =>
                index === existingItemIndex
                  ? { ...item, quantity: item.quantity + newItem.quantity }
                  : item
              );
              return { items: updatedItems, isLoading: false };
            } else {
              // Item does not exist, add it to the array
              return { items: [...state.items, newItem], isLoading: false };
            }
          });
          get().calculateCart();
        }, 2); // Simulate loading delay
      },
      updateItem: (id: string, quantity: number) => {
        set({ isLoading: true });
        setTimeout(() => {
          set((state) => {
            const updatedItems = state.items.map((item) =>
              item.id === id ? { ...item, quantity } : item
            );
            return { items: updatedItems, isLoading: false };
          });
          get().calculateCart();
        }, 1); // Simulate loading delay
      },
      removeItem: (id: string) => {
        set({ isLoading: true });
        setTimeout(() => {
          set((state) => ({
            items: state.items.filter((item) => item.id !== id),
            isLoading: false,
          }));
          get().calculateCart();
        }, 1); // Simulate loading delay
      },
      clearCart: () => {
        set({ isLoading: true });
        setTimeout(() => {
          set(() => ({
            items: [],
            isLoading: false,
          }));
          get().calculateCart();
        }, 1); // Simulate loading delay
      },
      calculateCart: () => {
        const items = get().items;
        const subTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const shippingCost = 0; // Adjust this value as needed
        const total = subTotal + shippingCost;
        set({ subTotal, total });
      },
    }),
    {
      name: 'cartStorage', // Name of the storage (localStorage key)
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
