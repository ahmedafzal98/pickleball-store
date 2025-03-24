import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import loadash from "lodash";

const API_URL = import.meta.env.VITE_API_URL;

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
export const fetchCategoryProducts = createAsyncThunk(
  "category/fetchProducts",
  async (category) => {
    const url = `${API_URL}?q=${category || ""}`;

    const response = await fetch(url);

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
    selectedCategory: null,
  },
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoryProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload;
      })
      .addCase(fetchCategoryProducts.rejected, (state, action) => {
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

export const { setSelectedProduct, setSelectedCategory } = productSlice.actions;
export default productSlice.reducer;
