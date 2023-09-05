// src/redux/apiSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { product } from "../../services/product.service";

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

const apiSlice = createSlice({
  name: "api",
  initialState: {
    data: [],
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
      });
  },
});

export const { setActiveImageIndex } = apiSlice.actions;

export const selectproducts = (state) => state.api.data.products;

export const selectProductDetail = (state) => state.api.productDetail;

export const selectActiveImageIndex = (state) => state.api.activeImageIndex;

export default apiSlice.reducer;
