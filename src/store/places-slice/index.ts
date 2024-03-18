import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Coordinates {
  lat: number;
  lng: number;
}

export interface Place {
  business_status: string;
  formatted_address: string;
  geometry: {
    location: Coordinates;
    viewport: {
      northeast: Coordinates;
      southwest: Coordinates;
    };
  };
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  opening_hours?: {
    open_now: boolean;
  };
  photos: {
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
  }[];
  place_id: string;
  plus_code: {
    compound_code: string;
    global_code: string;
  };
  price_level?: number;
  rating: number;
  user_ratings_total: number;
  reference: string;
  types: string[];
}

interface PlaceDetails {
  name: string;
  formatted_address: string;
  business_status: string;
  opening_hours: {
    open_now: boolean;
    periods: {
      close: {
        day: 0 | 1 | 2 | 3 | 4 | 5 | 6;
        time: string;
      };
      open: {
        day: 0 | 1 | 2 | 3 | 4 | 5 | 6;
        time: string;
      };
    }[];
    weekday_text: string[];
  };
  photos: {
    height: number;
    width: number;
    photo_reference: string;
    html_attributions: string[];
  }[];
  place_id: string;
  rating: number;
  user_ratings_total: number;
  reviews: {
    author_name: string;
    author_url: string;
    language: string;
    original_language: string;
    profile_photo_url: string;
    rating: number;
    relative_time_description: string;
    text: string;
    time: number;
    translated: boolean;
  }[];
  types: string[];
  website: string;
  formatted_phone_number: string;
  url: string;
}

interface Pagination {
  page: number;
  lastPage: number;
  resultsPerPage: number;
  totalResults: number;
  currentResults: Place[];
}

interface PlacesState {
  pagination?: Pagination;
  places?: Place[];
  currentPlace?: PlaceDetails;
}

const initialState: PlacesState = {};

const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    setPlaces(state, action: PayloadAction<Place[]>) {
      const results = action.payload;
      const page = 1;
      const resultsPerPage = +localStorage.getItem("resultsPerPage")! || 10;
      const totalResults = results.length;
      const lastPage = Math.ceil(totalResults / resultsPerPage);
      const currentResults = results.slice(0, resultsPerPage);

      state.places = results;
      state.pagination = {
        page,
        lastPage,
        resultsPerPage,
        totalResults,
        currentResults,
      };
    },
    setCurrentPlace(state, action: PayloadAction<PlaceDetails>) {
      state.currentPlace = action.payload;
    },
    nextPage(state) {
      const startingIndex =
        state.pagination!.page * state.pagination!.resultsPerPage;
      state.pagination!.page = state.pagination!.page += 1;
      state.pagination!.currentResults = state.places!.slice(
        startingIndex,
        startingIndex + state.pagination!.resultsPerPage
      );
    },
    previousPage(state) {
      state.pagination!.page = state.pagination!.page -= 1;
      const startingIndex =
        state.pagination!.page * state.pagination!.resultsPerPage;
      state.pagination!.currentResults = state.places!.slice(
        startingIndex - state.pagination!.resultsPerPage,
        startingIndex
      );
    },
    firstPage(state) {
      state.pagination!.page = 1;
      state.pagination!.currentResults = state.places!.slice(
        0,
        state.pagination!.resultsPerPage
      );
    },
    lastPage(state) {
      const lastPage = state.pagination!.lastPage;
      state.pagination!.page = lastPage;
      state.pagination!.currentResults = state.places!.slice(
        lastPage * state.pagination!.resultsPerPage -
          state.pagination!.resultsPerPage
      );
    },
    setResultsPerPage(state, action: PayloadAction<string>) {
      const resultsPerPage = action.payload;
      localStorage.setItem("resultsPerPage", resultsPerPage);
      state.pagination!.resultsPerPage = +resultsPerPage;
      state.pagination!.lastPage = Math.ceil(
        state.pagination!.totalResults / +resultsPerPage
      );
      state.pagination!.page =
        state.pagination!.page > state.pagination!.lastPage
          ? (state.pagination!.page = state.pagination!.lastPage)
          : state.pagination!.page;
      const startingIndex =
        state.pagination!.page * state.pagination!.resultsPerPage;
      state.pagination!.currentResults = state.places!.slice(
        startingIndex - state.pagination!.resultsPerPage,
        startingIndex
      );
    },
  },
});

export const {
  setPlaces,
  setCurrentPlace,
  nextPage,
  previousPage,
  firstPage,
  lastPage,
  setResultsPerPage,
} = placesSlice.actions;

export default placesSlice.reducer;

export * from "./places-action-creators";
