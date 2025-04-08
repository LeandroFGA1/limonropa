import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import chileReducer from "./chileSlice"
import orderReducer from "./orderSlice";
import { profileReducer } from "./profileSlice";
// // storage.removeItem("persist:root");

  // const savedProfile = storage.getItem("persist:profile");
  if (import.meta.env.MODE === "development" && !sessionStorage.getItem("storageCleared")) {
    storage.removeItem("persist:root");
    sessionStorage.setItem("storageCleared", "true");
  }
  // if (savedProfile) {
  //   storage.setItem("persist:profile", savedProfile);
  // }

const persistConfig = {
  key: "root",
  storage,
};

const asyncDispatchMiddleware = (store) => (next) => (action) => {
  if (
    typeof action === "object" &&
    action !== null &&
    typeof action.asyncDispatch === "function"
  ) {
    action.asyncDispatch = store.dispatch;
  }
  return next(action);
};


const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  chile: chileReducer,
  order: orderReducer,
  profile: profileReducer,
  
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(asyncDispatchMiddleware),
});

export const persistor = persistStore(store);


export default store;
