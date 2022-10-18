import { configureStore } from '@reduxjs/toolkit';

import { cocktailReducer } from './localCocktailsSlice';
import { configReducer } from './configSlice';
import { createCocktailReducer } from './createCocktailSlice';

const store = configureStore({
  reducer: {
    cocktails: cocktailReducer,
    config: configReducer,
    create: createCocktailReducer,
  },
});

export default store;
