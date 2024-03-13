import { configureStore } from "@reduxjs/toolkit";
import generalReducer from "./general-slice";
import placesReducer from "./places-slice";

export const store = configureStore({
  reducer: {
    general: generalReducer,
    places: placesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
