import { getItem, setItem } from '@/commons/lib/localStorage';
import { logger } from '@/commons/store/logger';
import { create } from 'zustand';

interface UserDataStore {
  userData: any;
  setUserData: (user: any) => void;
}

// const useUserStore = create<UserStore>((set) => ({
//   userData: null,
//   setUserData: (userData) => set(() => ({ userData })),
// }));

const initialState: Pick<UserDataStore, keyof UserDataStore> = {
  userData: getItem('userData') ?? null,
  setUserData: () => {},
};

const useUserStore = create<UserDataStore>()(
  logger<UserDataStore>(
    (set) => ({
      ...initialState,
      setUserData: (userData) => {
        set(() => ({ userData }));
        setItem('userData', userData);
      },
    }),
    'userStore'
  )
);

export default useUserStore;
