import { combineReducers, configureStore } from "@reduxjs/toolkit";
import galleryReducer from "./reducers/gallerySlice";
import filterOverlayReducer from "./reducers/filterOverlaySlice";
import { galleryAPI } from "../services/GalleryService";
import { filterServiceAPI } from "../services/FilterService";
const rootReducer = combineReducers({
  galleryReducer,
  filterOverlayReducer,
  [galleryAPI.reducerPath]: galleryAPI.reducer,
  [filterServiceAPI.reducerPath]: filterServiceAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDeffaultMiddleWare) =>
      getDeffaultMiddleWare().concat(
        galleryAPI.middleware,
        filterServiceAPI.middleware
      ),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type Appstore = ReturnType<typeof setupStore>;
export type AppDispatch = Appstore["dispatch"];
