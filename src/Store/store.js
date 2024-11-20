import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from '../Slice/dashboardSlice';
import supplierReducer from '../Slice/supplierSlice';
import customerReducer from '../Slice/customerSlice';
import supplierReconciliationReducer from '../Slice/supplierReconciliationSlice';
import authReducer from '../Slice/loginslice';
import languageReducer from '../Slice/languageSlice';
import supplierDataReducer from '../Slice/supplierData';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    supplier: supplierReducer,
    customer: customerReducer,
    supplierReconciliation: supplierReconciliationReducer,
    auth: authReducer,
    language: languageReducer,
    supplierData: supplierDataReducer,
  },
});
