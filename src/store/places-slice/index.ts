import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface parameters {
  q: string;
  gl: string;
  hl: string;
  type: string;
  num: number;
  autocorrect: boolean;
  page: number;
  engine: string;
}

export interface place {
  position: number;
  title: string;
  address: string;
  latitude: number;
  longitude: number;
  thumbnailUrl: string;
  rating?: number;
  ratingCount?: number;
  category: string;
  phoneNumber?: string;
  cid: string;
}

interface PlacesState {
  searchParameters: parameters;
  places?: place[];
}

const initialState: PlacesState = {
  searchParameters: {
    q: "Sprots places in Cairo, Egypt",
    gl: "eg",
    hl: "en",
    type: "places",
    num: 10,
    autocorrect: false,
    page: 1,
    engine: "google",
  },
};

const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    setPlaces(state, action: PayloadAction<PlacesState>) {
      state.searchParameters = action.payload.searchParameters;
      state.places = action.payload.places;
    },
  },
});

export const { setPlaces } = placesSlice.actions;

export default placesSlice.reducer;

export * from "./places-action-creators";
