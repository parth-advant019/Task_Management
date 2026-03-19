import { createSlice } from "@reduxjs/toolkit";

const initialThemeState = {
  isDark: localStorage.getItem("theme") ? true : false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialThemeState,
  reducers: {
    toggleTheme(state) {
      state.isDark = !state.isDark;
      localStorage.setItem("theme", state.isDark);
    },
  },
});

export const themeAction = themeSlice.actions;
export default themeSlice.reducer;
