import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/src/redux/store/store"; // Make sure this is correct

export interface User {
  name: string;
  email: string;
  image: string | null; // image might be null
  role: "user" | "admin";
  phoneNumber: string;
  isEmailVerified: boolean;
  _id: string;
}

type TAuthState = {
  user: User | null;
  token: string | null;
  showLoginToast: boolean;
  loginToastAction: string;
};

const initialState: TAuthState = {
  user: null,
  token: null,
  showLoginToast: false,
  loginToastAction: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User; token: string }>) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    showLoginToast: (state, action: PayloadAction<string>) => {
      state.showLoginToast = true;
      state.loginToastAction = action.payload;
    },
    hideLoginToast: (state) => {
      state.showLoginToast = false;
      state.loginToastAction = "";
    },
  },
});

export const { setUser, logout, showLoginToast, hideLoginToast } =
  authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState): User | null =>
  state.auth.user;
export const selectToken = (state: RootState): string | null =>
  state.auth.token;
