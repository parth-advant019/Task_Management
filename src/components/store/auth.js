import { createSlice } from "@reduxjs/toolkit";
import validator from "validator";

const initialAuthState = {
  isAuthenticated: localStorage.getItem("userEmail") ? true : false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;

export const loginUser = (email, navigate, setEmailError) => {
  return (dispatch) => {
    if (!validator.isEmail(email)) {
      setEmailError("Enter a valid email first!");
      return;
    }
    localStorage.setItem("userEmail", email);
    dispatch(authAction.login());
    navigate("/dashboard");
  };
};
