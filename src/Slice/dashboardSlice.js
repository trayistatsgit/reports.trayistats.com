import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks for API calls
export const fetchCurrentDashboardData = createAsyncThunk(
  'dashboard/fetchCurrentDashboardData',
  async () => {
    const response = await axios.get('http://localhost:5000/api/V1/currentDashboardData');
    return response.data.ResponseData;
  }
);

export const fetchMonthWiseRevenue = createAsyncThunk(
  'dashboard/fetchMonthWiseRevenue',
  async () => {
    const response = await axios.get('http://localhost:5000/api/V1/monthWiseRevenue');
    return response.data.ResponseData;
  }
);

export const fetchWeeklyRevenue = createAsyncThunk(
  'dashboard/fetchWeeklyRevenue',
  async () => {
    const response = await axios.get('http://localhost:5000/api/V1/weeklyRevenue');
    return response.data.ResponseData;
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    currentDashboardData: {},
    monthWiseRevenue: {},
    weeklyRevenue: {},
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentDashboardData.fulfilled, (state, action) => {
        state.currentDashboardData = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchMonthWiseRevenue.fulfilled, (state, action) => {
        state.monthWiseRevenue = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchWeeklyRevenue.fulfilled, (state, action) => {
        state.weeklyRevenue = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchCurrentDashboardData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCurrentDashboardData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default dashboardSlice.reducer;
