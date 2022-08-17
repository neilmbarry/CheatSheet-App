import { configureStore } from '@reduxjs/toolkit';
import { cocktailReducer, configReducer } from './cocktails';

const store = configureStore({
  reducer: {
    cocktails: cocktailReducer,
    config: configReducer,
  },
});

export default store;
