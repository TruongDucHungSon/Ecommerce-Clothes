// src/redux/orderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { order } from "../../services/order.service";

export const fetchOrderData = createAsyncThunk(
  "order/fetchOrderData", // Use a unique action type here
  async (thunkAPI) => {
    try {
      const response = await order.getOrders();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteOrderData = createAsyncThunk(
  "order/deleteOrder", // Use a unique action type here
  async (id, thunkAPI) => {
    try {
      const response = await order.deleteOrder(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    loading: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderData.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrderData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteOrderData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrderData.fulfilled, (state, action) => {
        state.loading = false;
        // Assuming you want to remove the deleted order from the state
        state.orders = state.orders.filter(
          (order) => order.id !== action.payload.id
        );
      })
      .addCase(deleteOrderData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectOrder = (state) => state.order.orders;

export default orderSlice.reducer;
