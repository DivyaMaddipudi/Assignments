import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    shop: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.shop = null;
    },

    updateUser: (state, action) => {
      state.user.shopName = action.payload.shopName;
    },
    activeShop: (state, action) => {
      state.shop = action.payload.shopName;
    },
  },
});

export const { login, logout, activeShop, updateUser } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectShop = (state) => state.user.shop;

export default userSlice.reducer;
