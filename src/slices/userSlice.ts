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

// Async action for registration
export const registerUserAsync = createAsyncThunk(
  'user/registerUserAsync',
  async (userData: Login, { rejectWithValue }) => {
    try {
      await api.users.usersRegisterCreate(userData);
      // Automatically login after registration or just return success?
      // Usually require login separate, but let's see. 
      // For now just return success.
      return; 
    } catch (error) {
      return rejectWithValue('Ошибка при регистрации');
    }
  }
);

// Async action for updating profile
export const updateUserProfileAsync = createAsyncThunk(
  'user/updateUserProfileAsync',
  async (userData: Login, { rejectWithValue }) => {
    try {
      const response = await api.users.usersProfileUpdate(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue('Ошибка при обновлении профиля');
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
      })
      
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      
      .addCase(updateUserProfileAsync.fulfilled, (state, action) => {
        const { email } = action.payload;
        state.username = email;
        state.error = null;
      })
      .addCase(updateUserProfileAsync.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;