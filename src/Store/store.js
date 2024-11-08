import { configureStore } from '@reduxjs/toolkit';
import greetingSlice from './slices/testStringSlice';

const store = configureStore({
  reducer: {
    greeting: greetingSlice
  },
});

export default store;
