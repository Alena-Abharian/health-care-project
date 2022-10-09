import { createSlice } from '@reduxjs/toolkit';
import { register, login, logout, refresh } from './authOperations';

const initialState = {
  user: { username: '', email: '', id: '' },
  refreshToken: null,
  accessToken: null,
  sid: '',
  userData: {
    weight: null,
    height: null,
    age: null,
    bloodType: null,
    desiredWeight: null,
    dailyRate: null,
    notAllowedProducts: [],
  },
  isLoggedIn: false,
  isLoading: false,
  error: null,
  isFetchingCurrentUser: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    // --------------------REGISTER OPERATION--------------------

    [register.pending]: state => {
      state.isLoading = true;
    },
    [register.fulfilled]: (state, { payload: { user } }) => {
      state.user = user;
      //   state.token = token;
      state.error = null;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    [register.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    // --------------------LOG IN OPERATION--------------------(fulfilled?)

    [login.pending]: state => {
      state.isLoading = true;
    },
    [login.fulfilled]: (
      state,
      { payload: { user, accessToken, refreshToken, id, sid } }
    ) => {
      state.user = user;

      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.sid = sid;

      state.userData = user.userData;
      state.user.id = id;

      state.isLoggedIn = true;
      state.isLoading = false;
    },
    [login.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    // --------------------LOG OUT OPERATION-------------------- (fulfilled?)

    [logout.pending]: state => {
      state.isLoading = true;
    },
    [logout.fulfilled]: state => {
      state.user = { name: '', email: '', id: '' };
      state.accessToken = null;
      state.refreshToken = null;

      state.isLoggedIn = false;
      state.isLoading = false;
    },
    [logout.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    // --------------------REFRESH OPERATION--------------------(sid сохранять надо?)

    [refresh.pending]: state => {
      state.isLoading = true;
      state.isFetchingCurrentUser = true;
    },
    [refresh.fulfilled]: (
      state,
      { payload: { newRefreshToken, newAccessToken } }
    ) => {
      state.accessToken = newAccessToken;
      state.refreshToken = newRefreshToken;

      state.isLoggedIn = true;
      state.isLoading = false;
      state.isFetchingCurrentUser = false;
    },
    [refresh.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
      state.isFetchingCurrentUser = false;
    },
  },
});

export default authSlice.reducer;
