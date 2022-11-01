import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  token: null,
  id: null,
  name: null,
  authMessage: false, // warning that you must be signed in to add cocktail etc.
  notification: null,
  modal: null,
  openSearchResults: false,
  openFavourites: false,
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
    setNotification: (state, action) => {
      state.value.notification = action.payload;
    },
    setModal: (state, action) => {
      state.value.modal = action.payload;
    },
  },
});

export default configSlice.actions;

export const configReducer = configSlice.reducer;
