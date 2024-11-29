import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from "../../Interfaces/User";

interface FetchedUserState {
  user: User | null;
}

const initialState: FetchedUserState = {
  user: null,
};

const fetchedUserSlice = createSlice({
  name: 'fetchedUser',
  initialState,
  reducers: {
    setFetchedUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    clearFetchedUser(state) {
      state.user = null;
    },
  },
});

export const { setFetchedUser, clearFetchedUser } = fetchedUserSlice.actions;
export default fetchedUserSlice.reducer;
