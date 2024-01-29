// reducers/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  _id: string;
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  coverImage: string;
  watchHistory: Array<object>; // Update the type accordingly based on the actual structure
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface AuthState {
  status: boolean;
  user: UserData | null;
}

const initialState: AuthState = {
  status: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserData>) => {
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
