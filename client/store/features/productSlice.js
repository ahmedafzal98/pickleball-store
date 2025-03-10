import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "https://pickleball-store-backend.onrender.com/api/ebay";
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = fetch(API_URL);
    return (await response).json();
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle",
    error: null,
    selectedProduct: null,
  },
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
