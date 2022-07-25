import { createSlice } from '@reduxjs/toolkit';
import dummy from './dummyCocktail.json';

const initialState = {
  // cocktails: [],
  cocktails: dummy,
  faves: [],
};

export const gameSlice = createSlice({
  name: 'cocktails',
  initialState: { value: initialState },
  reducers: {
    addCocktail: (state, action) => {
      state.value.cocktails = [...state.value.cocktails, action.payload];
    },

    deleteCocktail: (state, action) => {
      state.value = {
        ...state.value,
      };
    },
    modifyCocktail: (state, action) => {
      state.value = {
        ...state.value,
      };
    },
    // addFave: (state, action) => {
    //   state.value.faves = [...state.value.faves, action.payload];
    // },
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

export const { addCocktail, deleteCocktail, toggleFave } = gameSlice.actions;

export default gameSlice.reducer;
