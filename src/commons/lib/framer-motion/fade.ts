import { Transition, Variants } from 'framer-motion';

export const pageVariants: Variants = {
  initial: { scale: 0.98, opacity: 0 },
  in: { scale: 1, opacity: 1 },
  out: { scale: 0.98, opacity: 0 },
};

export const pageTransition: Transition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.5,
};
