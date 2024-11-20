import { createSlice } from '@reduxjs/toolkit';

// Initial state for message
const initialState = {
  message: '', // Store the message as a string
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    // Sets a new message
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    // Clears the current message
    clearMessage: (state) => {
      state.message = '';
    },
  },
});

// Extract the actions and reducer
const { reducer, actions } = messageSlice;
export const { setMessage, clearMessage } = actions;
export default reducer;
