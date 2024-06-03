// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// interface CartState {
//   items: any[];
//   addItem: (item: any) => void;
//   removeItem: (id: number) => void;
// }

// const useCartStore = create<CartState>()(
//   persist(
//     (set) => ({
//       items: [],
//       addItem: (item) => set({ items: [...items, item] }),
//       removeItem: (id) =>
//         set({
//           items: items.filter((item) => item.id !== id),
//         }),
//     }),
//     {
//       name: 'cart-storage',
//       storage: {
//         getItem: (name) => {
//           const str = localStorage.getItem(name);
//           if (!str) return null;
//           const { state, version } = JSON.parse(str);
//           return {
//             state: {
//               ...state,
//               transactions: new Map(state.transactions),
//             },
//             version,
//           };
//         },
//         setItem: (name, newValue: any) => {
//           const str = JSON.stringify({
//             state: {
//               ...newValue,
//               transactions: Array.from(newValue.transactions.entries()),
//             },
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

// ## 
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartState {
  items: any[];
  addItem: (item: any) => void;
  removeItem: (id: number) => void;
}

const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => ({
          items: [...state.items, item],
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
    }),
    {
      name: 'cart-storage',
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
