import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [],
    total: 0, // Thêm giá trị total vào initialState
  },
  reducers: {
    addToCart: (state, action) => {
      const { newItem, quantity } = action.payload;

      const existingItem = state.carts.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.subTotal = existingItem.price * existingItem.quantity;
      } else {
        const newCartItem = {
          ...newItem,
          quantity,
          subTotal: newItem.price * quantity,
        };
        state.carts.push(newCartItem);
      }

      // Cập nhật lại stock sau khi thêm vào giỏ hàng
      if (newItem.stock !== undefined) {
        newItem.stock -= quantity;
      }

      // Tính lại tổng giá trị total
      state.total = state.carts.reduce(
        (total, item) => total + item.subTotal,
        0
      );
    },

    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.carts = state.carts.filter((item) => item.id !== itemId);

      // Tính lại tổng giá trị total sau khi xóa sản phẩm
      state.total = state.carts.reduce(
        (total, item) => total + item.subTotal,
        0
      );
    },
  },
});

// Trong cartSlice.js

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
