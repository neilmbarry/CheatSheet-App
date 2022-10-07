import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  token: null,
  name: null,
  authMessage: false,
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
  },
});

export default configSlice.actions;

export const configReducer = configSlice.reducer;
