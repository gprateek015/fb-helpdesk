import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '.';

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await Axios.post('/api/user/login', { email, password });
    return response.data;
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async ({
    email,
    password,
    name
  }: {
    email: string;
    password: string;
    name: string;
  }) => {
    const response = await Axios.post('/api/user', {
      name,
      email,
      password
    });
    return response.data;
  }
);

export const fetchSelf = createAsyncThunk('user/self', async () => {
  const response = await Axios.get('/api/user');
  return response.data;
});
