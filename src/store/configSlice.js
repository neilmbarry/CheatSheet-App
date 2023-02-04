import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGQzZTM4NTc0MDBjYzcwYjE5NDBhNCIsImlhdCI6MTY3NTQ2MjUxNiwiZXhwIjoxNjgzMjM4NTE2fQ.S2nMGSo9wzSCBSRVhInuv-i_UruzFhC9auW4xTlOL8I',
  id: '63dd3e3857400cc70b1940a4',
  name: null,
  notification: null,
  modal: null,
  userFaves: [],
  openSearchResults: false,
  openFavourites: false,
  currentCocktailId: null,
  currentCocktailSlug: null,
  showMenu: false,
};

export const configSlice = createSlice({
  name: 'config',
  initialState: { value: initialState },
  reducers: {
    setLoading: (state, action) => {
      state.value.loading = action.payload;
    },
    setToken: (state, action) => {
      state.value.token = action.payload;
    },
    setId: (state, action) => {
      state.value.id = action.payload;
    },
    signOut: (state, action) => {
      state.value.id = null;
      state.value.token = null;
      state.value.name = null;
      state.value.notification = {
        message: 'Signed out',
        type: 'info',
      };
    },
    setNotification: (state, action) => {
      state.value.notification = action.payload;
    },
    setModal: (state, action) => {
      state.value.modal = action.payload;
    },
    setOpenSearchResults: (state, action) => {
      state.value.openSearchResults = action.payload;
    },
    toggleOpenSearch: (state, action) => {
      state.value.openSearchResults = !state.value.openSearchResults;
    },
    setOpenFavourites: (state, action) => {
      state.value.openFavourites = action.payload;
    },
    toggleOpenFavourites: (state, action) => {
      state.value.openFavourites = !state.value.openFavourites;
    },
    setSearchQuery: (state, action) => {
      state.value.searchQuery = action.payload;
    },
    setAuthMessage: (state) => {
      state.value.authMessage = true;
    },
    setCurrentCocktailId: (state, action) => {
      state.value.currentCocktailId = action.payload;
    },
    setCurrentCocktailSlug: (state, action) => {
      state.value.currentCocktailSlug = action.payload;
    },
    setSlugList: (state, action) => {
      state.value.slugList = action.payload;
    },
    resetPage: (state) => {
      state.value.modal = null;
      state.value.openFavourites = false;
      state.value.openSearchResults = false;
    },
    setShowMenu: (state, action) => {
      state.value.showMenu = action.payload;
    },
    toggleMenu: (state) => {
      state.value.showMenu = !state.value.showMenu;
    },
    setUserFaves: (state, action) => {
      state.value.userFaves = action.payload;
    },
  },
});

export default configSlice.actions;

export const configReducer = configSlice.reducer;
