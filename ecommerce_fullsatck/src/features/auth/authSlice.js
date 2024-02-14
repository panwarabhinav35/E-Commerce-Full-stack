import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser } from './authAPI';

const initialState = {
  loggedInUser: null,
  status: 'idle',
};


export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    console.log(userData)
    const response = await createUser(userData);
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
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log(action)
        state.loggedInUser = action.payload;
      });
  },
});

export const { increment} = userSlice.actions;

export const selectLoggedInUser = (state) => state.auth.loggedInUser;

export default userSlice.reducer;
