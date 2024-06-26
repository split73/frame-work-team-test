import { createSlice } from "@reduxjs/toolkit";
enum viewModeThemeEnum {
  dark = "dark",
  light = "light",
}

interface AppState {
  viewModeTheme: viewModeThemeEnum;

  accentColor: string;
  primaryColor: string;
  primaryGray: string;
  secondaryColor: string;
  minusIconColor: string;
}

const initialState: AppState = {
  viewModeTheme: viewModeThemeEnum.dark,
  primaryColor: "#121212",
  accentColor: "#9b4b4b",
  primaryGray: "#dedede",
  secondaryColor: "#1a1818",
  minusIconColor: "#575757",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeViewModeTheme: (state) => {
      if (state.viewModeTheme === viewModeThemeEnum.dark) {
        state.viewModeTheme = viewModeThemeEnum.light;
        state.accentColor = "#ab8956";
        state.primaryColor = "#ffffff";
        state.primaryGray = "#575757";
        state.secondaryColor = "#fcfcfc";
        state.minusIconColor = "#9c9c9c";
      } else {
        state.viewModeTheme = viewModeThemeEnum.dark;
        state.accentColor = "#121212";
        state.primaryColor = "#9b4b4b";
        state.primaryGray = "#dedede";
        state.secondaryColor = "#1a1818";
        state.minusIconColor = "#575757";
      }
    },
  },
});

export default appSlice.reducer;
export const { changeViewModeTheme } = appSlice.actions;
