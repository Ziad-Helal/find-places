import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// interface parameters {
//   q: string;
//   gl: string;
//   hl: string;
//   type: string;
//   num: number;
//   autocorrect: boolean;
//   page: number;
//   engine: string;
// }

// export interface place {
//   position: number;
//   title: string;
//   address: string;
//   latitude: number;
//   longitude: number;
//   thumbnailUrl: string;
//   rating?: number;
//   ratingCount?: number;
//   category: string;
//   phoneNumber?: string;
//   cid: string;
// }

// interface PlacesState {
//   searchParameters: parameters;
//   places?: place[];
// }

export interface Place {
  business_status: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
    viewport: {
      northeast: {
        lat: number;
        lng: number;
      };
      southwest: {
        lat: number;
        lng: number;
      };
    };
  };
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  opening_hours: {
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

interface PlacesState {
  next_page_token?: string;
  places?: Place[];
}

const initialState: PlacesState = {};

const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    setPlaces(state, action: PayloadAction<PlacesState>) {
      state.next_page_token = action.payload.next_page_token;
      state.places = action.payload.places;
    },
    // setPlaces(state, action: PayloadAction<PlacesState>) {
    //   state.searchParameters = action.payload.searchParameters;
    //   state.places = action.payload.places;
    // },
  },
});

export const { setPlaces } = placesSlice.actions;

export default placesSlice.reducer;

export * from "./places-action-creators";
