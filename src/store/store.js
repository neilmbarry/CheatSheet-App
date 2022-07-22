import { configureStore } from '@reduxjs/toolkit';
import cocktailReducer from './cocktails';

const store = configureStore({
  reducer: {
    cocktails: cocktailReducer,
  },
});

export default store;
