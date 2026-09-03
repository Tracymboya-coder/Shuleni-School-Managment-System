import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiError, apiRequest } from '../api';

const TOKEN_KEY = 'shuleni_token';
const USER_KEY = 'shuleni_user';
const storage = typeof window === 'undefined' ? null : window.localStorage;

const initialState = {
  token: storage?.getItem(TOKEN_KEY) ?? null,
  user: JSON.parse(storage?.getItem(USER_KEY) || 'null'),
  school: null,
  status: 'idle',
  error: null,
};

const postAuth = (type, path, fallback) => createAsyncThunk(
  type,
  async (payload, { rejectWithValue }) => {
    try {
      return await apiRequest(path, { method: 'POST', body: payload });
    } catch (error) {
      return rejectWithValue(error instanceof ApiError ? error.message : fallback);
    }
  },
);

export const login = postAuth('auth/login', '/auth/login', 'Login failed');
export const createSchool = postAuth(
  'auth/createSchool',
  '/auth/create-school',
  'Could not create school',
);

const saveSession = (token, user) => {
  storage?.setItem(TOKEN_KEY, token);
  if (user) storage?.setItem(USER_KEY, JSON.stringify(user));
};

const setLoading = state => {
  state.status = 'loading';
  state.error = null;
};

const setError = fallback => (state, action) => {
  state.status = 'failed';
  state.error = action.payload || fallback;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      state.school = null;
      storage?.removeItem(TOKEN_KEY);
      storage?.removeItem(USER_KEY);
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, setLoading)
      .addCase(createSchool.pending, setLoading)
      .addCase(login.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        state.token = payload.token;
        state.user = payload.user;
        saveSession(payload.token, payload.user);
      })
      .addCase(createSchool.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        state.token = payload.token;
        state.school = payload.school;
        storage?.setItem(TOKEN_KEY, payload.token);
      })
      .addCase(login.rejected, setError('Login failed'))
      .addCase(createSchool.rejected, setError('Could not create school'));
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
