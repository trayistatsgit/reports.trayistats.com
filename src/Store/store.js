import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from '../Slice/dashboardSlice';
import supplierReducer from '../Slice/supplierSlice';
import customerReducer from '../Slice/customerSlice';
import supplierReconciliationReducer from '../Slice/supplierReconciliationSlice';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer, 
    supplier: supplierReducer,
    customer: customerReducer,
    supplierReconciliation: supplierReconciliationReducer,
  },
});
