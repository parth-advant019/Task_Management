import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import themeReducer from "./theme";
import projectReducer from "./project";
const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    project: projectReducer,
  },
});

export default store;
