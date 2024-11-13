import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setMessage } from './message'; // Import setMessage action from the message slice

// Retrieve the auth token from local storage if it exists
const authToken = JSON.parse(localStorage.getItem('authToken'));

// Thunk to handle login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ userName, password }, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:5000/api/V1/login', {
        UserName: userName,
        password,
      });

      // Check if the response indicates a failure
      if (!response.data.ResponseData.success) {
        const message = response.data.ResponseData.message || 'Login failed';
        thunkAPI.dispatch(setMessage(message)); // Dispatch the error message
        return thunkAPI.rejectWithValue(); // Reject the login attempt
      }

      // Return the successful response data
      return response.data.ResponseData; // Assuming this contains user info or token

    } catch (error) {
      // Handle any other errors
      const message =
        (error.response && error.response.data.ResponseData && error.response.data.ResponseData.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message)); // Dispatch the error message
      return thunkAPI.rejectWithValue(); // Pass the error message to the rejected action
    }
  }
);

// Initial state based on whether the token is available in local storage
const initialState = authToken ? { loading: false, authToken, user: null } : { loading: false, authToken: null, user: null };

const LoginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetLogin: (state) => {
      state.authToken = '';
      state.user = '';
      localStorage.removeItem('authToken'); // Optionally clear token from local storage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.authToken = action.payload?.authToken || null;
          state.UserRoleId = action.payload?.UserRoleId || null;
          state.user = action.payload?.user || null; // Add user info if available
          localStorage.setItem('authToken', JSON.stringify(action.payload?.authToken || null)); // Store the token if available
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.authToken = null;
        state.user = null;
        state.error = action.payload || 'Unable to login';
      });
  },
});

// Export the reset action and the reducer
export const { resetLogin } = LoginSlice.actions;
export default LoginSlice.reducer;
