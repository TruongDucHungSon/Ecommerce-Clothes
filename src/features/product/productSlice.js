// src/redux/apiSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { product } from "../../services/product.service";
import axios from "axios";

export const fetchApiData = createAsyncThunk(
  "api/fetchApiData", // Use a unique action type here
  async (params, thunkAPI) => {
    try {
      const response = await product.getProducts(params);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchProductByCategory = createAsyncThunk(
  "api/fetchProductByCategory", // Use a unique action type here
  async (id, thunkAPI) => {
    try {
      const response = await product.getProductsByCategory(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchProductDetail = createAsyncThunk(
  "products/fetchProductDetail",
  async (id, thunkAPI) => {
    try {
      const response = await product.getProductDetail(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const filterProduct = createAsyncThunk(
  "products/filterProduct",
  async ({name, minPrice, maxPrice, brand}) => {
    try {
      let query = "https://ecommerce-api-mcqr.onrender.com/product/filterProduct?";
      if(!!name) {
        query += "name=" + name;
      }
      if(!!minPrice) {
        query += "&minPrice=" + minPrice;
      }
      if(!!maxPrice) {
        query += "&maxPrice=" + maxPrice;
      }
      if(!!brand) {
        query += "&brand=" + brand;
      }
      const response = await axios.get(query);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

const apiSlice = createSlice({
  name: "api",
  initialState: {
    data: [],
    searchResults: [],
    searchResultsLoading: false,
    loading: false,
    error: null,
    productDetail: null,
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
    pageSize: 0,
    activeImageIndex: 0,
  },
  reducers: {
    setActiveImageIndex: (state, action) => {
      state.activeImageIndex = action.payload;
    },
    updateSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApiData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.totalProducts = action.payload.totalProducts;
        state.pageSize = action.payload.pageSize;
      })
      .addCase(fetchApiData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetail = action.payload;
      })
      .addCase(fetchProductByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.totalProducts = action.payload.totalProducts;
        state.pageSize = action.payload.pageSize;
      })

      .addCase(fetchProductByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(filterProduct.pending, (state) => {
        state.error = null;
        state.searchResultsLoading = true;
      })
      .addCase(filterProduct.fulfilled, (state, action) => {
        state.searchResults = action.payload;
        state.searchResultsLoading = false;
      })
      .addCase(filterProduct.rejected, (state, action) => {
        state.error = action.error.message;
        state.searchResultsLoading = false;
      });
  },
});

export const { setActiveImageIndex, updateSearchResults } = apiSlice.actions;

export const selectproducts = (state) => state.api.data.products;

export const selectProductDetail = (state) => state.api.productDetail;

export const selectActiveImageIndex = (state) => state.api.activeImageIndex;

export default apiSlice.reducer ;
