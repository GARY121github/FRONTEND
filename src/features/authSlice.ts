import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  status: boolean;
  user: object | null;
}
const initialState: AuthState = {
  status: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.status = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
