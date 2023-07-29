// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import callsReducer from "../slice/callSlice";
import tokenReducer from "../slice/generateToken";
export function makeStore() {
  return configureStore({
    reducer: { call: callsReducer, accessToken: tokenReducer },
  });
}

export const store = makeStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
