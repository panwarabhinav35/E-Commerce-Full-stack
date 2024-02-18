import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoggedinUser, fetchLoggedinUserOrders, updateUser } from './userAPI';

const initialState = {
  userOrders : [],
  userInfo : null,
  status: 'idle',
};


export const fetchLoggedinUserOrdersAsync = createAsyncThunk(
  'user/fetchLoggedinUserOrders',
  async (id) => {
    const response = await fetchLoggedinUserOrders(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchLoggedinUserAsync = createAsyncThunk(
  'user/fetchLoggedinUser',
  async (id) => {
    const response = await fetchLoggedinUser(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
    console.log(response.data)
  }
);
export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (update) => { 
    const response = await updateUser(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedinUserOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedinUserOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userOrders = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // state.userOrders = action.payload;
      })
      .addCase(fetchLoggedinUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedinUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      });
  },
});

export const { increment} = userSlice.actions;

export const selectUserOrders = (state) => state.user.userOrders;
export const selectUserInfo = (state) => state.user.userInfo;

export default userSlice.reducer;
