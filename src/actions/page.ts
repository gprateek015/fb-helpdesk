import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '.';
import { fetchSelf } from './auth';

export const createPage = createAsyncThunk(
  'create/page',
  async ({
    access_token,
    user_id
  }: {
    access_token: string;
    user_id: string;
  }) => {
    const response = await Axios.post('/api/page', { access_token, user_id });
    return response.data;
  }
);
export const deletePage = createAsyncThunk(
  'delete/page',
  async (_, { dispatch }) => {
    const response = await Axios.delete('/api/page');
    await dispatch(fetchSelf());
    return response.data;
  }
);
