import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAuthor } from "../../models/IAuthor";
import { ILocation } from "../../models/ILocation";
import { IYears } from "../../models/IYears";

interface FilterOverlayState {
  displayOverlay: boolean;
  filterByAuthor: IAuthor;
  filterByLocation: ILocation;
  filterByYears: IYears;
  filterByAuthorQuery: string;
  filterByLocationQuery: string;
  filterByYearsQuery: IYears;
}

const initialState: FilterOverlayState = {
  displayOverlay: false,
  filterByAuthor: { id: 0, name: "" },
  filterByLocation: { id: 0, location: "" },
  filterByYears: { greaterThen: "", lessThen: "" },
  filterByAuthorQuery: "",
  filterByLocationQuery: "",
  filterByYearsQuery: { greaterThen: "", lessThen: "" },
};

export const filterOverlaySlice = createSlice({
  name: "filterOverlay",
  initialState,
  reducers: {
    setDisplayOverlay: (state) => {
      state.displayOverlay = !state.displayOverlay;
    },
    setFilterByAuthor: (state, action: PayloadAction<IAuthor>) => {
      state.filterByAuthor = action.payload;
      state.filterByAuthorQuery = `authorId=${action.payload.id}&`;
    },
    setFilterByLocation: (state, action: PayloadAction<ILocation>) => {
      state.filterByLocation = action.payload;
      state.filterByLocationQuery = `locationId=${action.payload.id}&`;
    },
    setFilterByYear: (state, action: PayloadAction<IYears>) => {
      state.filterByYears = action.payload;
      state.filterByYearsQuery.greaterThen =
        action.payload.greaterThen.length > 0
          ? `created_gte=${action.payload.greaterThen}&`
          : "";
      state.filterByYearsQuery.lessThen =
        action.payload.lessThen.length > 0
          ? `created_lte=${action.payload.lessThen}&`
          : "";
    },
  },
});

export default filterOverlaySlice.reducer;
export const {
  setDisplayOverlay,
  setFilterByAuthor,
  setFilterByLocation,
  setFilterByYear,
} = filterOverlaySlice.actions;
