import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';
import type { Login } from '../api/Api';

interface UserState {
  username: string;
  isAuthenticated: boolean;
  error?: string | null;
}

const initialState: UserState = {
  username: '',
  isAuthenticated: false,
  error: null,
};

// Async action for authorization
export const loginUserAsync = createAsyncThunk(
  'user/loginUserAsync',
  async (credentials: Login, { rejectWithValue }) => {
    try {
      await api.users.usersLoginCreate(credentials);
      // After successful login, fetch profile to get username
      const profileResponse = await api.users.usersProfileList();
      return profileResponse.data;
    } catch (error) {
      return rejectWithValue('Ошибка авторизации');
    }
  }
);

// Async action for logout
export const logoutUserAsync = createAsyncThunk(
  'user/logoutUserAsync',
  async (_, { rejectWithValue }) => {
    try {
      await api.users.usersLogoutCreate();
    } catch (error) {
      return rejectWithValue('Ошибка при выходе из системы');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.error = null;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        const { email } = action.payload; // user profile has email
        state.username = email;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })

      .addCase(logoutUserAsync.fulfilled, (state) => {
        state.username = '';
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUserAsync.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;