import { ImageType } from '@/pages/Shop/ShopDetail/components/ShopDetailGallery/ShopDetailGallery';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function useShopDetailGalleryController(images: ImageType[]) {
  // State to store the currently highlighted image, initializing with the first image if available
  const [highlightedImage, setHighlightedImage] = useState<ImageType>(() =>
    images.length ? images[0] : ({} as ImageType)
  );

  // State to track if the current view is on a mobile device
  const [isMobile, setIsMobile] = useState(() => {
    return window.innerWidth <= 768;
  });

  // Effect to handle window resize and update the isMobile state accordingly
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }

    addEventListener('resize', handleResize);

    // Cleanup function to remove the resize event listener
    return () => {
      removeEventListener('resize', handleResize);
    };
  }, []);

  // Function to get a CSS property value of a given HTML element
  const getElementProperty = (el: HTMLElement, prop: string) => {
    const value = getComputedStyle(el).getPropertyValue(prop);
    return value;
  };

  // Reference to the gallery element
  const gallery = useRef<HTMLElement>(null);

  // Number of thumbnail images to show in the gallery
  const subsCount = 4;

  // State to track the current index of the gallery navigation
  const [index, setIndex] = useState(0);

  // Memoized value to calculate the maximum index based on the number of images and subsCount
  const maxIndex = useMemo(() => {
    const n = images.length;
    return n <= subsCount ? 0 : Math.ceil((n - subsCount) / 2);
  }, [images, gallery]);

  // Effect to update the highlighted image when the images array changes
  useEffect(() => {
    if (images.length) {
      setHighlightedImage(images[0]);
    }
  }, [images]);

  // Return the state and functions to be used by the component
  return {
    highlightedImage, // Currently highlighted image
    setHighlightedImage, // Function to set the highlighted image
    isMobile, // Boolean indicating if the view is mobile
    setIsMobile, // Function to set the mobile view state
    getElementProperty, // Function to get a CSS property value
    gallery, // Ref to the gallery element
    subsCount, // Number of thumbnails to display
    index, // Current index of the gallery navigation
    setIndex, // Function to set the current index
    maxIndex, // Maximum index for navigation
  };
}
