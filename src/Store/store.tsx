import { configureStore } from '@reduxjs/toolkit';
import greetingSlice from './slices/testStringSlice';

const store = configureStore({
  reducer: {
    greeting: greetingSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;