import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AUTH_TOKEN } from '@/constants';
import { fetchAllConversations, fetchMessages } from '@/actions/conversation';

export type Customer = {
  first_name?: string;
  last_name?: string;
  email?: string;
  profile_pic?: string;
  pasid?: string;
};

export type Message = {
  timestamp: string;
  _id: string;
  content: string;
  msg_by: 'user' | 'customer';
};

export type Conversation = {
  _id: string;
  customer: Customer;
  modified_at: string;
  last_msg?: Message;
};

type InitialStateType = {
  allConversations: Conversation[];
  data: Message[]; // Messages for selected conversation
  customer: Customer;
  selectedConversation: string;
};

const initialState: InitialStateType = {
  allConversations: [],
  data: [], // Messages for selected conversation
  customer: {
    first_name: '',
    last_name: '',
    email: '',
    profile_pic: ''
  },
  selectedConversation: ''
};

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    selectConversation: (state, action) => {
      state.selectedConversation = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllConversations.fulfilled, (state, action) => {
        state.allConversations = action.payload.conversations;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.data = action.payload.messages;
        state.customer = action.payload.customer;
      });
  }
});

export const { selectConversation } = conversationSlice.actions;

export default conversationSlice.reducer;
