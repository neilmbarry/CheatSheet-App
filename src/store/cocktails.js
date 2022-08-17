import { createSlice } from '@reduxjs/toolkit';
import dummy from './dummyCocktail.json';

const initialState = {
  // cocktails: [],
  cocktails: dummy,
  faves: [],
};

const initialConfig = {
  loading: false,
};

export const gameSlice = createSlice({
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

export const configSlice = createSlice({
  name: 'config',
  initialState: { value: initialConfig },
  reducers: {
    setLoading: (state, action) => {
      state.value.loading = action.payload;
    },
  },
});

export const { addCocktail, deleteCocktail, toggleFave, updateCocktail } =
  gameSlice.actions;

export const { setLoading } = configSlice.actions;

export const cocktailReducer = gameSlice.reducer;
export const configReducer = configSlice.reducer;
