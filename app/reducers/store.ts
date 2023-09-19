import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import { persistReducer, FLUSH, REGISTER, PERSIST, REHYDRATE, PURGE, PAUSE } from 'redux-persist'
import { combineReducers } from "@reduxjs/toolkit";

import propertyReducer from "./property/propertySlice";

const persistConfig = {
    key: 'root',
    storage: storage
}

export const reducer = combineReducers({
  property: propertyReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})