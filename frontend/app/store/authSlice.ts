// authSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import apiClient from '../api/apiClient'; // Import your API client
import * as Keychain from 'react-native-keychain';
import Toast from 'react-native-root-toast';

// Define the authentication state
interface AuthPayload {
  accessToken: string;
  refreshToken: string;
}
interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  username: string | null;
  tokens: AuthPayload | null;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  isLoading: false,
  username: null,
  tokens: null,
  error: null,
};

// Define asynchronous thunks for login and registration
export const loginAsync = createAsyncThunk<
  AuthPayload, // Return type of the successful login response
  { username: string; password: string },
  { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    if (response.status === 201) {
      await Keychain.setGenericPassword(response.data.accessToken, response.data.refreshToken);
    }
    return response.data as AuthPayload;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.stack);
    }
    return rejectWithValue('Login failed. Please check your credentials.');
  }
});

export const registerAsync = createAsyncThunk<
  AuthPayload, // Return type of the successful registration response
  { username: string; password: string },
  { rejectValue: string }
>('auth/register', async (credentials, { rejectWithValue }) => {
  try {
    const response = await apiClient.post('/auth/signup', credentials);
    return response.data as AuthPayload;
  } catch (error) {
    return rejectWithValue('Registration failed. Please try again.');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.tokens = null;
      state.isLoggedIn = false;
    },
    login: (state, action: PayloadAction<AuthPayload>) => {
      state.tokens = action.payload;
      state.isLoggedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.tokens = action.payload;
        state.username = action.meta.arg.username;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(registerAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectUser = (state: { auth: AuthState }) => state.auth.tokens;
export const selectIsLoggedIn = (state: { auth: AuthState }) => state.auth.isLoggedIn;
export const selectIsLoading = (state: { auth: AuthState }) => state.auth.isLoading;
export const selectError = (state: { auth: AuthState }) => state.auth.error;

export default authSlice.reducer;
