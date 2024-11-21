import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FetchedUserState {
  user: any | null;
}

const initialState: FetchedUserState = {
  user: null,
};

const fetchedUserSlice = createSlice({
  name: 'fetchedUser',
  initialState,
  reducers: {
    setFetchedUser(state, action: PayloadAction<any>) {
      state.user = action.payload.user;
    },
    clearFetchedUser(state) {
      state.user = null;
    },
  },
});

export const { setFetchedUser, clearFetchedUser } = fetchedUserSlice.actions;
export default fetchedUserSlice.reducer;
