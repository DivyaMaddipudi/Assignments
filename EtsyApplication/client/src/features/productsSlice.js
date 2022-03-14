import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "items",
  initialState: {
    products: [],
  },
  reducers: {
    productsList: (state, action) => {
      state.products = action.payload;
    },
    removeProductsState: (state) => {
      state.products = null;
    },
    updateProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const {
  productsList,
  removeProductsState,
  updateProducts,
} = productSlice.actions;

export const getProducts = (state) => state.product.products;

export default productSlice.reducer;
