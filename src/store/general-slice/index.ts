import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface GeneralState {}

const initialState: GeneralState = {};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {},
});

export const {} = generalSlice.actions;

export default generalSlice.reducer;
