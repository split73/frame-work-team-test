import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IYears } from "../../models/IYears";
interface GalleryState {
  page: number;
  limit: number;
  filterByName: string;
  filterByAuthorId: string;
  filterByLocationId: string;
  filterByYear: { greaterThen: string; lessThen: string };
}

const initialState: GalleryState = {
  page: 1,
  limit: 6,
  filterByName: "",
  filterByAuthorId: "",
  filterByLocationId: "",
  filterByYear: { greaterThen: "", lessThen: "" },
};

export const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setFilterByNameParam: (state, action: PayloadAction<string>) => {
      state.filterByName = action.payload;
    },
    setFilterByAuthorIdParam: (state, action: PayloadAction<string>) => {
      state.filterByAuthorId = action.payload;
    },
    setFilterByLoactionIdParam: (state, action: PayloadAction<string>) => {
      state.filterByLocationId = action.payload;
    },
    setFilterByYearParam: (state, action: PayloadAction<IYears>) => {
      state.filterByYear = action.payload;
    },
  },
});

export default gallerySlice.reducer;
export const {
  setPage,
  setLimit,
  setFilterByNameParam,
  setFilterByAuthorIdParam,
  setFilterByLoactionIdParam,
  setFilterByYearParam,
} = gallerySlice.actions;
