// supplierReconciliationSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch supplier reconciliation data
export const fetchSupplierReconciliationData = createAsyncThunk(
  'supplierReconciliation/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/api/V1/getSupplierReconcilationData');
      return response.data;
    } catch (error) {
      // Handle errors
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const supplierReconciliationSlice = createSlice({
  name: 'supplierReconciliation',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    // Any additional synchronous actions can go here
  },
  extraReducers: (builder) => {
    builder
      // Handle pending state
      .addCase(fetchSupplierReconciliationData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Handle fulfilled state
      .addCase(fetchSupplierReconciliationData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      // Handle rejected state
      .addCase(fetchSupplierReconciliationData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the reducer to be used in the store
export default supplierReconciliationSlice.reducer;
