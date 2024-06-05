import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface GalleryState {
  page: number;
  limit: number;
  filterParam: string;
}

const initialState: GalleryState = {
  page: 1,
  limit: 6,
  filterParam: "",
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
    setFilterParam: (state, action: PayloadAction<string>) => {
      state.filterParam = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(
  //     fetchPaintings.fulfilled.type,
  //     (state, action: PayloadAction<ICardData[]>) => {
  //       state.cards = action.payload;
  //       state.isLoading = false;
  //       state.error = "";
  //     }
  //   );
  //   builder.addCase(fetchPaintings.pending.type, (state) => {
  //     state.isLoading = true;
  //   });
  //   builder.addCase(
  //     fetchPaintings.rejected.type,
  //     (state, action: PayloadAction<string>) => {
  //       state.isLoading = false;
  //       state.error = action.payload;
  //     }
  //   );
  // },
});

export default gallerySlice.reducer;
export const { setPage, setLimit, setFilterParam } = gallerySlice.actions;
