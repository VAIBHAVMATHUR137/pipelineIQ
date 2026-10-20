import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: Number;
  name: string;
  email: string;
  password: string;
}
const initialUsernameState: User = {
  id: 0,
  name: "",
  email: "",
  password: "",
};
export const userSlice = createSlice({
  name: "userSlice",
  initialState: initialUsernameState,
  reducers: {
    resetUser: () => initialUsernameState,
    change: <T extends keyof User>(
      state: User,
      action: PayloadAction<{ field: T; value: User[T] }>,
    ) => {
      state[action.payload.field] = action.payload.value;
    },
  },
});
export const { resetUser, change } = userSlice.actions;
export const userReducer = userSlice.reducer;

interface loginInterface {
  email: string;
  password: string;
}
const initialLoginState: loginInterface = {
  email: "",
  password: "",
};
export const loginSlice = createSlice({
  name: "loginSlice",
  initialState: initialLoginState,
  reducers: {
    resetLogin: () => initialLoginState,
    updateLogin: <T extends keyof loginInterface>(
      state: loginInterface,
      action: PayloadAction<{ field: T; value: loginInterface[T] }>,
    ) => {
        state[action.payload.field]=action.payload.value
    },
  },
});
export const {resetLogin,updateLogin}=loginSlice.actions;
export const loginReducer=loginSlice.reducer;