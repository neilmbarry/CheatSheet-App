import { createSlice } from '@reduxjs/toolkit';
import dummy from './dummyCocktail.json';

const initialState = {
  // cocktails: [],
  cocktails: dummy,
};

export const gameSlice = createSlice({
  name: 'cocktails',
  initialState: { value: initialState },
  reducers: {
    addCocktail: (state, action) => {
      state.value = {
        ...state.value,
        cocktails: [...state.value.cocktails, action.payload],
      };
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
  },
});

export const { addCocktail, deleteCocktail } = gameSlice.actions;

export default gameSlice.reducer;
