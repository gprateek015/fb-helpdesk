import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '.';

export const fetchAllConversations = createAsyncThunk(
  'fetch/conversations',
  async () => {
    const response = await Axios.get('/api/conversation');
    return response.data;
  }
);

export const fetchMessages = createAsyncThunk(
  'fetch/messages',
  async ({ conversation_id }: { conversation_id: string }) => {
    const response = await Axios.get(`/api/conversation/${conversation_id}`);
    return response.data;
  }
);

export const sendMessage = createAsyncThunk(
  'send/message',
  async (
    {
      content,
      conversation_id
    }: {
      content: string;
      conversation_id: string;
    },
    { dispatch }
  ) => {
    const response = await Axios.post('/api/message', {
      content,
      conversation_id
    });
    await dispatch(fetchMessages({ conversation_id }));
    return response.data;
  }
);
