import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/loginSlice";
import userPlaylist from "./features/UserPlaylist";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";

import storage from "redux-persist/lib/storage"; // uses localStorage for web

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  userPlaylist: userPlaylist,
});

// Config for redux-persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "userPlaylist"], // <- persist only these
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Fix for redux-persist non-serializable action warnings
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }),
});

// Create persistor
export const persistor = persistStore(store);

// Types for useSelector and useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
