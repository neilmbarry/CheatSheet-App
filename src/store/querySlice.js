import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: null,
  page: null,
  sort: null,
};

export const querySlice = createSlice({
  name: 'query',
  initialState: { value: initialState },
  reducers: {
    setQuery: (state, action) => {
      state.value.query = action.payload;
    },
    setPage: (state, action) => {
      state.value.page = action.payload;
    },
    setSort: (state, action) => {
      state.value.sort = action.payload;
    },
  },
});

export default querySlice.actions;

export const queryReducer = querySlice.reducer;
