import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProduct } from './productAPI';
import {fetchAllProductByFilter} from './productAPI'

const initialState = {
  total_Items:0,
  products: [],
  status: 'idle',
};


export const fetchAllProductAsync = createAsyncThunk(
  'product/fetchAllProduct',
  async () => {
    const response = await fetchAllProduct();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllProductByFilterAsync = createAsyncThunk(
  'product/fetchAllProductByFilter',
  async ({filter,sort,pagination}) => {
    const response = await fetchAllProductByFilter(filter,sort,pagination);
        // The value we return becomes the `fulfilled` action payload
    if(sort.order=="desc"){
      response.data.data.reverse();
      
    }
    return response.data;
  }
);
 
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchAllProductByFilterAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductByFilterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.data;
        state.total_Items=action.payload.items
      });
  },
});

export const { increment} = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const total_Items = (state) => state.product.total_Items;

export default productSlice.reducer;
