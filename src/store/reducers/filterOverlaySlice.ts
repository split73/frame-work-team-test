import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAuthor } from "../../models/IAuthor";
import { ILocation } from "../../models/ILocation";
interface IYears {
  fromYear: number;
  toYear: number;
}
interface FilterOverlayState {
  displayOverlay: boolean;
  filterByAuthor: IAuthor;
  filterByLocation: ILocation;
  filterByYears: IYears;
  filterByAuthorQuery: string;
  filterByLocationQuery: string;
}

const initialState: FilterOverlayState = {
  displayOverlay: false,
  filterByAuthor: { id: 0, name: "" },
  filterByLocation: { id: 0, location: "" },
  filterByYears: { fromYear: 0, toYear: 3000 },
  filterByAuthorQuery: "",
  filterByLocationQuery: "",
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
      state.filterByAuthorQuery = `authorId=${action.payload.id}`;
      console.log("Q", state.filterByAuthorQuery)
    },
    setFilterByLocation: (state, action: PayloadAction<ILocation>) => {
      state.filterByLocation = action.payload;
      state.filterByLocationQuery = `locationId=${action.payload.id}`
    },
    setFilterByYear: (state, action: PayloadAction<IYears>) => {
      state.filterByYears = action.payload;
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
