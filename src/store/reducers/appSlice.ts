import { createSlice } from "@reduxjs/toolkit";
enum viewModeThemeEnum {
  dark = "dark",
  light = "light",
}

interface AppState {
  viewModeTheme: viewModeThemeEnum;
}

const initialState: AppState = {
  viewModeTheme: viewModeThemeEnum.dark,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeViewModeTheme: (state) => {
      if (state.viewModeTheme === viewModeThemeEnum.dark) {
        state.viewModeTheme = viewModeThemeEnum.light;
      } else {
        state.viewModeTheme = viewModeThemeEnum.dark;
      }
    },
  },
});

export default appSlice.reducer;
export const { changeViewModeTheme } = appSlice.actions;
