import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import greetingSlice from './slices/testStringSlice';
import userSlice from './slices/userSlice';

const persistConfig = {
  key: 'user',
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userSlice);

const store = configureStore({
  reducer: {
    greeting: greetingSlice,
    user: persistedUserReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
export type RootState = ReturnType<typeof store.getState>;
