import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICard } from "../../models/ICard";
import { ICardData } from "../../models/ICard";
interface CardsState {
  cards: ICardData[];
  header: string | null | undefined;
}

const initialState: CardsState = {
  cards: [],
  header: ""
};

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    changeCards: (state, action: PayloadAction<ICard>) => {
      state.cards = action.payload.data,
      state.header = action.payload.paginationLastPageLink
    }
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

export default cardsSlice.reducer;
