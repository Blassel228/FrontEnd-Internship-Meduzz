import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UsersState {
  users: any[];
}

const initialState: UsersState = {
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<any[]>) {
      state.users = action.payload;
    },
    clearUsers(state) {
      state.users = [];
    },
  },
});

export const { setUsers, clearUsers } = usersSlice.actions;

export default usersSlice.reducer;
