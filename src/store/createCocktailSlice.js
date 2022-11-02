import { createSlice } from '@reduxjs/toolkit';

const dummyState = {
  name: null,
  author: null,
  glass: null,
  flavour: null,
  garnish: null,
  ingredients: [],
  method: [],
  image: null,
};
const initialState = {
  ingredients: [],
  method: [],
};

export const createCocktailSlice = createSlice({
  name: 'create',
  initialState: { value: initialState },
  reducers: {
    changeName: (state, action) => {
      state.value.name = action.payload;
    },
    changeAuthor: (state, action) => {
      state.value.author = action.payload;
    },
    changeGlass: (state, action) => {
      state.value.glass = action.payload;
    },
    changeFlavour: (state, action) => {
      state.value.flavour = action.payload;
    },
    changeGarnish: (state, action) => {
      state.value.garnish = action.payload;
    },
    changeIngredients: (state, action) => {
      state.value.ingredients = action.payload;
    },
    changeMethod: (state, action) => {
      state.value.method = action.payload;
    },
    changeImage: (state, action) => {
      state.value.image = action.payload;
    },
    updateCocktail: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default createCocktailSlice.actions;

export const createCocktailReducer = createCocktailSlice.reducer;
