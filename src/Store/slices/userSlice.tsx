import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isOrdinaryAuthenticated: boolean;
  user: any;
}

const initialState: UserState = {
  isOrdinaryAuthenticated: false,
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ user: any;}>) {
      state.user = action.payload.user;
      state.isOrdinaryAuthenticated = true;
    },
    clearUser(state) {
      state.user = null;
      state.isOrdinaryAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
