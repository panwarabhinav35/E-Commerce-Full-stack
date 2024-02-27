import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, fetchAllOrders, updateOrder } from './orderApi';

const initialState = {
  orders: [],
  adminOrders:[],
  totalOrders : 0,
  status: 'idle',
  currentOrder:null,
};


export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (order) => {
    const response = await createOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchAllOrdersAsync = createAsyncThunk(
  'order/fetchAllOrders',
  async (pagination) => {
    const response = await fetchAllOrders(pagination);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const updateOrderAsync = createAsyncThunk(
  'order/updateOrder',
  async (update) => {
    const response = await updateOrder(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    resetOrder : (state)=>{
      state.currentOrder = null;
    }
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.adminOrders = action.payload.data;
        state.totalOrders = action.payload.items;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        let index = state.adminOrders.findIndex(e => e.id === action.payload.id)
        state.adminOrders[index]=action.payload;
      });
  },
});

export const { resetOrder } = orderSlice.actions;

export const selectOrders = (state) => state.order.orders;
export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectadminOrder = (state) => state.order.adminOrders;
export const selecttotalOrder = (state) => state.order.totalOrders;

export default orderSlice.reducer;
