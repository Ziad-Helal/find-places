import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type loading = "places";

interface GeneralState {
  loading: {
    places: boolean;
  };
}

const initialState: GeneralState = {
  loading: { places: false },
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    isLoading(state, action: PayloadAction<loading>) {
      state.loading[action.payload] = true;
    },
    isLoaded(state, action: PayloadAction<loading>) {
      state.loading[action.payload] = false;
    },
  },
});

export const { isLoading, isLoaded } = generalSlice.actions;

export default generalSlice.reducer;
