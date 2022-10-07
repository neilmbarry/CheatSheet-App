import { configureStore } from '@reduxjs/toolkit';

import { cocktailReducer } from './cocktailSlice';
import { configReducer } from './configSlice';

const store = configureStore({
  reducer: {
    cocktails: cocktailReducer,
    config: configReducer,
  },
});

export default store;
