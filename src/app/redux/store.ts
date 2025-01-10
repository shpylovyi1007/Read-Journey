import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./auth/slice";
import { booksReducer } from "./books/slice";

const persistAuthConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "refreshToken", "user"],
};

const persistAuthReducer = persistReducer(persistAuthConfig, authReducer);

const persistBooksConfig = {
  key: "books",
  storage,
};

const persistBooksReducer = persistReducer(persistBooksConfig, booksReducer);

export const store = configureStore({
  reducer: {
    auth: persistAuthReducer,
    books: persistBooksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
