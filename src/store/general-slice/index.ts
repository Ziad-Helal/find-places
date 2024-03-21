import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type loading = "places" | "place";

interface Country {
  name: string;
  countryCode: string;
  geonameId: number;
}

interface City {
  name: string;
  countryCode: string;
  geonameId: number;
  adminCode1: string;
}

interface GeneralState {
  loading: {
    places: boolean;
    place: boolean;
  };
  countries?: Country[];
  cities?: City[];
  districts?: string[];
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
    setCountries(state, action: PayloadAction<Country[]>) {
      state.countries = action.payload;
    },
    setCities(state, action: PayloadAction<City[]>) {
      state.cities = action.payload;
    },
    setDistrict(state, action: PayloadAction<string[]>) {
      state.districts = action.payload;
    },
  },
});

export const { isLoading, isLoaded, setCountries, setCities, setDistrict } =
  generalSlice.actions;

export default generalSlice.reducer;

export * from "./general-action-creators";
