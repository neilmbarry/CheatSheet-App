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

export const searchResultsVariants = {
  hidden: {
    x: -450,
  },
  visible: {
    x: 0,
    transition: {
      type: 'spring',

      duration: 0.3,
    },
  },
  exit: {
    x: -450,

    transition: {
      duration: 0.2,
    },
  },
};

export const backdropVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,

    transition: {
      duration: 0.2,
    },
  },
};
