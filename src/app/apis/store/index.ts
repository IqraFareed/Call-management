// src/redux/store.ts

import { createStore, applyMiddleware, Store } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducers from "../reducers/rootReducers";

export const configureStore = (initialState: any): Store => {
  const store = createStore(
    rootReducers,
    initialState,
    applyMiddleware(thunkMiddleware)
  );

  return store;
};
