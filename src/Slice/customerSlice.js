import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to fetch all customers
export const fetchAllCustomers = createAsyncThunk(
  'customer/fetchAllCustomers',
  async () => {
    const response = await axios.get('http://localhost:5000/api/V1/getAllCustomers');
    return response.data.ResponseData;
  }
);

const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    customers: [], // Initialize as an array
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCustomers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCustomers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customers = action.payload; // Store fetched customers here
      })
      .addCase(fetchAllCustomers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default customerSlice.reducer;
