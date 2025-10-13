import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartRedux";
import userReducer from "./userRedux";
import wishlistReducer from "./wishListRedux"; // Import your wishlist reducer
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const userPersistConfig = {
  key: "user",
  version: 1,
  storage,
  whitelist: ["currentUser", "isAuthenticated"],
};

// persist everything else at root EXCEPT user (to avoid double persistence)
const rootPersistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["user"],
};

const rootReducer = combineReducers({ 
  user: persistReducer(userPersistConfig, userReducer),
  cart: cartReducer,
  wishlist: wishlistReducer, // Add wishlist to rootReducer
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
