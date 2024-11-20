import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to fetch all languages
export const fetchAllLanguages = createAsyncThunk(
  'language/fetchAllLanguages',
  async () => {
    const response = await axios.get('http://localhost:5000/api/V1/getAllLanguages');
    return response.data.ResponseData;
  }
);

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    languages: [], // Initialize as an array
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllLanguages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllLanguages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.languages = action.payload; // Store fetched languages here
      })
      .addCase(fetchAllLanguages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default languageSlice.reducer;
