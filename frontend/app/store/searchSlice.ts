import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  searchInput: string;
}

const initialState: SearchState = {
  searchInput: '',
};
const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchInput: (state, action: PayloadAction<string>) => {
      state.searchInput = action.payload;
    },
  },
});

export const { setSearchInput } = searchSlice.actions;

export default searchSlice.reducer;
