import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    items: null,
  },
  reducers: {
    getItems: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { login, logout, activeShop, updateUser } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectShop = (state) => state.user.shop;

export default userSlice.reducer;
