import { create } from 'zustand';

interface ScreenSize {
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
}

const useScreenSize = create<ScreenSize>((set) => ({
  isMobile: window.innerWidth <= 768,
  setIsMobile: (isMobile: boolean) =>
    set({
      isMobile: isMobile,
    }),
}));

export default useScreenSize;
