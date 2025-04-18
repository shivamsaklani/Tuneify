import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  refresh_token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  refresh_token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(
      state,
      action: PayloadAction<{ token: string; refresh_token: string }>
    ) {
      state.token = action.payload.token;
      state.refresh_token = action.payload.refresh_token;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.token = null;
      state.refresh_token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
