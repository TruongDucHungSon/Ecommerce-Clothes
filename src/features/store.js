import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./product/productSlice";
import categoryReducer from "./category/categorySlice";
import cartReducer from "./cart/CartSlice";
import modalReducer from "./modal/modalSlice";
import authReducer from "./auth/authSlice";
import orderReducer from "./oder/orderSlice";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["cart", "auth"],
};

const rootReducer = combineReducers({
  api: productReducer,
  category: categoryReducer,
  cart: cartReducer,
  auth: authReducer,
  modal: modalReducer,
  order: orderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
