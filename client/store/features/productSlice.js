import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import loadash from "lodash";

const API_URL = "https://pickleball-store-backend.onrender.com/api/ebay";

export const debouncedFetch = loadash.debounce((dispatch, query) => {
  dispatch(debouncedSearchProducts(query));
}, 500);
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch(API_URL);
    return response.json();
  }
);

export const debouncedSearchProducts = createAsyncThunk(
  "debounce/fetchProducts",
  async (query) => {
    const response = await fetch(`${API_URL}?q=pickleball ${query || ""}`);

    return await response.json();
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle",
    searchStatus: "idle",
    searchedProducts: [],
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
      })
      .addCase(debouncedSearchProducts.pending, (state) => {
        state.searchStatus = "loading";
      })
      .addCase(debouncedSearchProducts.fulfilled, (state, action) => {
        state.searchStatus = "success";
        state.searchedProducts = action.payload;
      })
      .addCase(debouncedSearchProducts.rejected, (state) => {
        state.searchStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
