import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, fetchItemByUserID } from './cartAPI';

const initialState = {
  value: 0,
  items: [],
  userItems : [],
  status: 'idle',
};


export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchItemByUserIDAsync = createAsyncThunk(
  'cart/fetchItemByUserID',
  async (id) => {
    const response = await fetchItemByUserID(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(fetchItemByUserIDAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemByUserIDAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userItems=action.payload;
      });
  },
});

export const { increment} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectUserCartItems = (state) => state.cart.userItems;

export default cartSlice.reducer;
