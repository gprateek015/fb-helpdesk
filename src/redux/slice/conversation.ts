import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AUTH_TOKEN } from '@/constants';

const initialState = {
  allConversations: [],
  data: [],
  customer: {
    first_name: '',
    last_name: '',
    email: '',
    profile_pic: ''
  }
};

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {},
  extraReducers: builder => {}
});

export const {} = conversationSlice.actions;

export default conversationSlice.reducer;
