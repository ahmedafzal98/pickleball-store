import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import loadash from "lodash";

import {
  fetchAllProducts,
  searchProducts,
  fetchProductsByCategory,
  fetchAmazonProductsByKeyword,
} from "../../api/product.service";

export const debouncedFetch = loadash.debounce((dispatch, query) => {
  dispatch(debouncedSearchProducts(query));
}, 500);

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    return await fetchAllProducts();
  }
);

export const debouncedSearchProducts = createAsyncThunk(
  "debounce/fetchProducts",
  async (query) => {
    return await searchProducts(query);
  }
);

export const fetchCategoryProducts = createAsyncThunk(
  "category/fetchProducts",
  async (category) => {
    return await fetchProductsByCategory(category);
  }
);

export const fetchAmazonProducts = createAsyncThunk(
  "products/fetchAmazon",
  async (keyword) => {
    return await fetchAmazonProductsByKeyword(keyword);
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle", // For category/all products
    searchStatus: "idle", // For debounced search results
    searchedProducts: [],
    amazonProducts: [],
    amazonStatus: "idle", // For Amazon product results
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
      // --- Fetch All Products ---
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // --- Fetch Category Products ---
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

      // --- Debounced Search ---
      .addCase(debouncedSearchProducts.pending, (state) => {
        state.searchStatus = "loading";
      })
      .addCase(debouncedSearchProducts.fulfilled, (state, action) => {
        state.searchStatus = "success";
        state.searchedProducts = action.payload;
      })
      .addCase(debouncedSearchProducts.rejected, (state, action) => {
        state.searchStatus = "failed";
        state.error = action.error.message;
      })

      // --- Amazon Products ---
      .addCase(fetchAmazonProducts.pending, (state) => {
        state.amazonStatus = "loading";
      })
      .addCase(fetchAmazonProducts.fulfilled, (state, action) => {
        state.amazonStatus = "success";
        state.amazonProducts = action.payload;
      })
      .addCase(fetchAmazonProducts.rejected, (state, action) => {
        state.amazonStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSelectedProduct, setSelectedCategory } = productSlice.actions;
export default productSlice.reducer;
