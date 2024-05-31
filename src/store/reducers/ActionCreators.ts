// import axios from "axios";
// import { ICard } from "../../models/ICard";
// import { createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchPaintings = createAsyncThunk(
//   "card/fetchAll",
//   async (_, thunkAPI) => {
//     try {
//       const response = await axios.get<ICard>(
//         "https://test-front.framework.team/paintings"
//       );
//       console.log(response)
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue("error");
//     }
//   }
// );
