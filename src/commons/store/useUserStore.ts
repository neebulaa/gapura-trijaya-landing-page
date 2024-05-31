import { create } from 'zustand';
import { logger } from '@/commons/store/logger';
import { setItem } from '@/commons/lib/localStorage';

interface UserDataStore {
  userData: any;
  setUserData: (user: any) => void;
}

// const useUserStore = create<UserStore>((set) => ({
//   userData: null,
//   setUserData: (userData) => set(() => ({ userData })),
// }));

const useUserStore = create<UserDataStore>()(
  logger<UserDataStore>(
    (set) => ({
      userData: null,
      setUserData: (userData) => {
        set(() => ({ userData }));
        setItem('userData', userData);
      },
    }),
    'userStore'
  )
);

export default useUserStore;
