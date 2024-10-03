import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import reportReducer from "./slices/reportSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    report: reportReducer,
  },
});

export default store;
