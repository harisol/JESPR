import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    authed: false,
    username: '',
  },
  // reducers is just like list of function (action) for mutating the states
  reducers: {
    login: (state, action) => {
      state.authed = true;
      state.username = action.payload.username;
    },
    logout: (state) => {
      state.authed = false;
      state.username = '';
    }
  },
})

export const { login, logout } = userSlice.actions;

export default userSlice;
