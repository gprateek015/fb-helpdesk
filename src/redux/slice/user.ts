import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AUTH_TOKEN } from '@/constants';
import { fetchSelf, loginUser, registerUser } from '@/actions/auth';

type InitialStateType = {
  authToken: string;
  data: {
    name?: string;
    email?: string;
  };
  page: {
    page_id?: string;
    _id?: string;
    admin_user?: string;
    name?: string;
    access_token?: string;
  };
  isLoggedin: boolean;
  previousPath: string;
};

const initialState: InitialStateType = {
  authToken: '',
  data: {},
  page: {},
  isLoggedin: false,
  previousPath: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserData: state => {
      state.authToken = '';
      state.data = {};
      state.page = {};
    },
    addAuthToken: (state, action) => {
      state.authToken = action.payload || '';
    },
    clearPage: state => {
      state.page = {};
    },
    clearPrevPath: state => {
      state.previousPath = '';
    },
    updatePrevPath: (state, action) => {
      state.previousPath = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = { ...action.payload.user, page: undefined };
        state.authToken = action.payload.token;
        state.page = action.payload.user.page;
        state.isLoggedin = true;

        localStorage.setItem(AUTH_TOKEN, action.payload.token);
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.authToken = action.payload.token;
        state.isLoggedin = true;

        localStorage.setItem(AUTH_TOKEN, action.payload.token);
      })
      .addCase(fetchSelf.fulfilled, (state, action) => {
        state.data = { ...action.payload.user, page: undefined };
        state.page = action.payload.user.page;
        state.isLoggedin = true;
      });
  }
});

export const {
  clearUserData,
  addAuthToken,
  clearPage,
  clearPrevPath,
  updatePrevPath
} = userSlice.actions;

export default userSlice.reducer;
