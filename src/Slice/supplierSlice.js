import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to fetch all suppliers
export const fetchAllSuppliers = createAsyncThunk(
  'supplier/fetchAllSuppliers',
  async () => {
    const response = await axios.get('http://localhost:5000/api/V1/getAllSuppliers');
    return response.data.ResponseData;
  }
);

const supplierSlice = createSlice({
  name: 'supplier',
  initialState: {
    suppliers: [], // Initialize as an array
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSuppliers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllSuppliers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.suppliers = action.payload; // Store fetched suppliers here
      })
      .addCase(fetchAllSuppliers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default supplierSlice.reducer;
