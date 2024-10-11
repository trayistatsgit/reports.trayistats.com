import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from '../Slice/dashboardSlice'; // Import dashboard reducer
import supplierReducer from '../Slice/supplierSlice';   // Import supplier reducer

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer, // Register dashboard slice
    supplier: supplierReducer,   // Register supplier slice
  },
});
