import { combineReducers, configureStore } from "@reduxjs/toolkit";
import SliceReducer from './Slice'
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";


const persistConfig = {
  key: "root",
  storage,
  version:2,
 

};

const userReducer=combineReducers({
    product:SliceReducer
})

const persistedReducer = persistReducer(persistConfig, userReducer);
export const store=configureStore({
    reducer:persistedReducer,
     devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
})

export const presitor=persistStore(store)