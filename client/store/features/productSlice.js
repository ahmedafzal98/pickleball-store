import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import loadash from "lodash";

const API_URL = import.meta.env.VITE_API_URL;
const AMAZON_API_URL = import.meta.env.VITE_AMAZON_API_URL;
// 👉 Example: "https://pickleball-store-backend.onrender.com/api/amazon"

// Debounced search (already exists)
export const debouncedFetch = loadash.debounce((dispatch, query) => {
  dispatch(debouncedSearchProducts(query));
}, 500);

// Fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch(API_URL);
    return response.json();
  }
);

// Debounced search products
export const debouncedSearchProducts = createAsyncThunk(
  "debounce/fetchProducts",
  async (query) => {
    const response = await fetch(`${API_URL}?q=pickleball ${query || ""}`);
    return await response.json();
  }
);

// Fetch category-based products
export const fetchCategoryProducts = createAsyncThunk(
  "category/fetchProducts",
  async (category) => {
    const url = `${API_URL}?q=${category || ""}`;
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    return data;
  }
);

// ✅ Fetch Amazon products by keyword
// ✅ Fetch Amazon products by keyword
export const fetchAmazonProducts = createAsyncThunk(
  "products/fetchAmazon",
  async (keyword) => {
    try {
      const url = `${AMAZON_API_URL}/search?keyword=pickleball ${keyword}`;
      const response = await fetch(url);
      const data = await response.json();

      console.log(data);

      return (
        data?.SearchResult?.Items?.map((item) => ({
          id: item.ASIN,
          source: "amazon",
          title: item.ItemInfo?.Title?.DisplayValue || "Amazon Product",
          image_url: item.Images?.Primary?.Medium?.URL,
          price: {
            value: item.Offers?.Listings?.[0]?.Price?.Amount || "N/A",
            currency: item.Offers?.Listings?.[0]?.Price?.Currency || "USD",
          },
          itemWebUrl: item.DetailPageURL || "#",
        })) || []
      );
    } catch (error) {
      console.log("Amazon Error:", error);
      return [];
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle",
    searchStatus: "idle",
    searchedProducts: [],
    amazonProducts: [], // ✅ new
    amazonStatus: "idle", // ✅ new
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
      // Category products
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

      // Debounced search
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

      // ✅ Amazon products
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
