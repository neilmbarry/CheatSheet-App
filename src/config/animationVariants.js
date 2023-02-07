export const addCocktailVariants = {
  hidden: {
    x: 50,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,

    transition: {
      type: 'spring',

      duration: 0.5,
    },
  },
  exit: {
    x: -50,
    opacity: 0,

    transition: {
      type: 'spring',

      duration: 0.5,
    },
  },
};

export const homePageVariants = {
  hidden: {
    y: 50,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,

    transition: {
      type: 'spring',

      duration: 0.5,
    },
  },
  exit: {
    y: 50,
    opacity: 0,

    transition: {
      type: 'spring',

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

export const favouritesVariants = {
  hidden: {
    x: 450,
  },
  visible: {
    x: 0,
    transition: {
      type: 'spring',

      duration: 0.3,
    },
  },
  exit: {
    x: 450,

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

export const overlayVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,

    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,

    transition: {
      duration: 0.3,
    },
  },
};

export const modalVariants = {
  hidden: {
    y: '-30%',
    x: '-50%',
    opacity: 0,
  },
  visible: {
    y: '-50%',
    opacity: 1,

    transition: {
      type: 'spring',

      duration: 0.5,
    },
  },
  exit: {
    y: -30,
    opacity: 0,

    transition: {
      duration: 0.3,
    },
  },
};

export const cocktailGridVariants = {
  hidden: {
    y: -100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,

    transition: {
      type: 'spring',

      duration: 0.5,
    },
  },
  exit: {
    y: 100,
    opacity: 0,

    transition: {
      type: 'spring',

      duration: 0.3,
    },
  },
};
export const notificationVariants = {
  hidden: {
    y: 50,
    x: '-50%',
    opacity: 0,
  },
  visible: {
    y: 0,
    x: '-50%',
    opacity: 1,
  },
  exit: {
    y: 30,
    x: '-50%',
    opacity: 0,

    transition: {
      type: 'spring',

      duration: 0.6,
    },
  },
};

export const authVariants = {
  hidden: {
    x: 50,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,

    transition: {
      type: 'spring',

      duration: 0.5,
    },
  },
  exit: {
    x: -50,
    opacity: 0,

    transition: {
      type: 'spring',

      duration: 0.5,
    },
  },
};
