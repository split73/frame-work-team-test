import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface GalleryState {
  page: number;
  limit: number;
  filterByName: string;
  filterByAuthorId: string;
  filterByLocationId: string;
  filterByYearGreaterThan: string;
  filterByYearLessThan: string;
}

const initialState: GalleryState = {
  page: 1,
  limit: 6,
  filterByName: "",
  filterByAuthorId: "",
  filterByLocationId: "",
  filterByYearGreaterThan: "",
  filterByYearLessThan: "",
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
    setFilterByName: (state, action: PayloadAction<string>) => {
      state.filterByName = action.payload;
    },
    setFilterByAuthorId: (state, action: PayloadAction<string>) => {
      state.filterByAuthorId = action.payload;
    },
    setFilterByLoactionId: (state, action: PayloadAction<string>) => {
      state.filterByLocationId = action.payload;
    },
  },
});

export default gallerySlice.reducer;
export const {
  setPage,
  setLimit,
  setFilterByName,
  setFilterByAuthorId,
  setFilterByLoactionId,
} = gallerySlice.actions;
