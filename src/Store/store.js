import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from '../Slice/dashboardSlice';
import supplierReducer from '../Slice/supplierSlice';
import customerReducer from '../Slice/customerSlice';
import supplierReconciliationReducer from '../Slice/supplierReconciliationSlice';
import authReducer from '../Slice/loginslice';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer, 
    supplier: supplierReducer,
    customer: customerReducer,
    supplierReconciliation: supplierReconciliationReducer,
    auth: authReducer
  },
});
