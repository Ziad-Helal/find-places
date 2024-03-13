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

interface place {
  position: number;
  title: string;
  address: string;
  latitude: number;
  longitude: number;
  thumbnailUrl: string;
  rating: number;
  ratingCount: number;
  category: string;
  cid: string;
}

interface PlacesState {
  searchParameters: parameters;
  places: place[];
}

const initialState: PlacesState = {};

const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {},
});

export const {} = placesSlice.actions;

export default placesSlice.reducer;
