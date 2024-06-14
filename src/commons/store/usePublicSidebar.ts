import { create } from 'zustand';

interface PublicSidebar {
  openSidebar: boolean;
  setOpenSidebar: (isMobile: boolean) => void;
}

const usePublicSidebar = create<PublicSidebar>((set) => ({
  openSidebar: false,
  setOpenSidebar: (openSidebar: boolean) => set({ openSidebar }),
}));

export default usePublicSidebar;
