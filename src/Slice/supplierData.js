import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchSupplierData = createAsyncThunk(
  'supplier/fetchSupplierData',
  async (filters, { rejectWithValue }) => {
    try {
      const { supplierName, customerName, lanCode, dateRange } = filters;
      const startDate = dateRange[0].toISOString();
      const endDate = dateRange[1].toISOString();

      const response = await axios.get('http://localhost:5000/api/V1/getSupplierData', {
        params: {
          supplierName,
          customerName,
          lanCode,
          startDate,
          endDate,
        },
      });

      return response.data.ResponseData;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

const supplierSlice = createSlice({
  name: 'supplier',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSupplierData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSupplierData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSupplierData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default supplierSlice.reducer;
