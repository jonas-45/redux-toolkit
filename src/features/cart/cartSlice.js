import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
  cartItems : [],
  amount: 0,
  total: 0,
  isLoading: true,
}

export const getCartItems = createAsyncThunk('cart/getCartItems', () => {
  return fetch(url).then((resp) => resp.json()).catch((err) => console.log(err));
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem : (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase : (state, {payload}) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease : (state, {payload}) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals : (state) => {
      let total = 0;
      let amount = 0;
      state.cartItems.forEach((item) => {
        total += (item.amount * item.price);
        amount += item.amount;
      })
      state.total = total;
      state.amount = amount;
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = true;
    }
  }
});

export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;