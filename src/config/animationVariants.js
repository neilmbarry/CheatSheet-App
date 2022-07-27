export const addCocktailVariants = {
  hidden: {
    x: 100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,

    transition: {
      type: 'spring',
      // delay: 0.5,
      duration: 0.5,
    },
  },
  exit: {
    x: -100,
    opacity: 0,
    // scale: 0.9,
    transition: {
      type: 'spring',
      // delay: 0.5,
      duration: 0.3,
    },
  },
};
