import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reportData: null,
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setReportData: (state, action) => {
      state.reportData = action.payload;
    },
    clearReportData: (state) => {
      state.reportData = null;
    },
  },
});

export const { setReportData, clearReportData } = reportSlice.actions;
export default reportSlice.reducer;
