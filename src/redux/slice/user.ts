import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AUTH_TOKEN } from '@/constants';

const initialState = {
  authToken: '',
  data: {}
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserData: state => {
      state.authToken = '';
      state.data = {};
    },
    addAuthToken: (state, action) => {
      state.authToken = action.payload || '';
    }
  },
  extraReducers: builder => {}
});

export const { clearUserData, addAuthToken } = userSlice.actions;

export default userSlice.reducer;
