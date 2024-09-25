import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  apiSlice,
  errorReducer,
  docsReducer,
  tabReducer,
  responseReducer
} from "@/store/slices";

const rootReducer = combineReducers({
  tab: tabReducer,
  docs: docsReducer,
  error: errorReducer,
  response: responseReducer,
  [apiSlice.reducerPath]: apiSlice.reducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false
      }).concat(apiSlice.middleware)
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppState = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
