import { createSlice } from '@reduxjs/toolkit';
import dummy from './dummyCocktail.json';

const initialState = {
  cocktails: dummy,
  faves: [],
};

export const cocktailSlice = createSlice({
  name: 'cocktails',
  initialState: { value: initialState },
  reducers: {
    addCocktail: (state, action) => {
      state.value.cocktails = [...state.value.cocktails, action.payload];
    },

    deleteCocktail: (state, action) => {
      state.value.cocktails = [...state.value.cocktails].filter(
        (cocktail) => cocktail.slug !== action.payload
      );
    },
    updateCocktail: (state, action) => {
      state.value = {
        ...state.value,
      };
    },

    toggleFave: (state, action) => {
      if (state.value.faves.includes(action.payload)) {
        state.value.faves = [...state.value.faves].filter(
          (cocktail) => cocktail !== action.payload
        );
      } else {
        state.value.faves = [...state.value.faves, action.payload];
      }
    },
  },
});

export default cocktailSlice.actions;

export const cocktailReducer = cocktailSlice.reducer;
