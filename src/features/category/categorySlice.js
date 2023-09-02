// src/redux/categorySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { category } from "./../../services/category.service";

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    const response = await category.getCategories();
    return response;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectCategories = (state) => state.category.categories;

export default categorySlice.reducer;
