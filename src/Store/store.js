import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from '../Slice/dashboardSlice'; // Import your reducer

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer, // Register your slice reducer
  },
});
