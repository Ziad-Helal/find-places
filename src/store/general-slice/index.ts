import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type loading = "places" | "place";

interface State {
  name: string;
  sc: string;
  cities: string[];
}

interface GeneralState {
  loading: {
    places: boolean;
    place: boolean;
  };
  states?: State[];
  cities?: string[];
}

const initialState: GeneralState = {
  loading: { places: false, place: false },
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
    setStates(state, action: PayloadAction<{ states: State[] }>) {
      state.states = action.payload.states;
    },
    setCities(state, action: PayloadAction<{ cities: string[] }>) {
      state.cities = action.payload.cities;
    },
  },
});

export const { isLoading, isLoaded, setStates, setCities } =
  generalSlice.actions;

export default generalSlice.reducer;

export * from "./general-action-creators";
