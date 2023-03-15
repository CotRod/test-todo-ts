import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import todoReducer from './todoSlice';
import { persistReducer, persistStore, REGISTER, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: storage,
};

const rootReducer = combineReducers({
  todos: todoReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
