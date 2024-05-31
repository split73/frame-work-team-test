import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cardsReducer from "./reducers/cardsSlice";
import { cardAPI } from "../services/CardService";
const rootReducer = combineReducers({
  cardsReducer,
  [cardAPI.reducerPath]: cardAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDeffaultMiddleWare) =>
      getDeffaultMiddleWare().concat(cardAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type Appstore = ReturnType<typeof setupStore>;
export type AppDispatch = Appstore["dispatch"];
