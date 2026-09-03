import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest, ApiError } from '../api';
// Restore session from localStorage so a page refresh doesn't log the user out.
// (This is plain localStorage on the app's own domain — unrelated to the artifact
// sandbox restriction on window.storage; this is a normal Vite/React app.)
const savedToken = typeof window !== 'undefined' ? localStorage.getItem('shuleni_token') : null;
const savedUser = typeof window !== 'undefined' ? localStorage.getItem('shuleni_user') : null;
const savedSchool = typeof window !== 'undefined' ? localStorage.getItem('shuleni_school') : null;
const initialState = {
  token: savedToken,
  user: savedUser ? JSON.parse(savedUser) : null,
  school: savedSchool ? JSON.parse(savedSchool) : null,
  status: 'idle',
  error: null
};
export const login = createAsyncThunk('auth/login', async (payload, {
  rejectWithValue
}) => {
  try {
    return await apiRequest('/auth/login', {
      method: 'POST',
      body: payload
    });
  } catch (err) {
    return rejectWithValue(err instanceof ApiError ? err.message : 'Login failed');
  }
});
export const createSchool = createAsyncThunk('auth/createSchool', async (payload, {
  rejectWithValue
}) => {
  try {
    return await apiRequest('/auth/create-school', {
      method: 'POST',
      body: payload
    });
  } catch (err) {
    return rejectWithValue(err instanceof ApiError ? err.message : 'Could not create school');
  }
});
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      state.school = null;
      localStorage.removeItem('shuleni_token');
      localStorage.removeItem('shuleni_user');
      localStorage.removeItem('shuleni_school');
    },
    clearAuthError(state) {
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.status = 'loading';
      state.error = null;
    }).addCase(login.fulfilled, (state, action) => {
      state.status = 'idle';
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem('shuleni_token', action.payload.token);
      localStorage.setItem('shuleni_user', JSON.stringify(action.payload.user));
      if (action.payload.school) {
        state.school = action.payload.school;
        localStorage.setItem('shuleni_school', JSON.stringify(action.payload.school));
      }
    }).addCase(login.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload || 'Login failed';
    }).addCase(createSchool.pending, state => {
      state.status = 'loading';
      state.error = null;
    }).addCase(createSchool.fulfilled, (state, action) => {
      state.status = 'idle';
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.school = action.payload.school;
      localStorage.setItem('shuleni_token', action.payload.token);
      localStorage.setItem('shuleni_user', JSON.stringify(action.payload.user));
      localStorage.setItem('shuleni_school', JSON.stringify(action.payload.school));
    }).addCase(createSchool.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload || 'Could not create school';
    });
  }
});
export const {
  logout,
  clearAuthError
} = authSlice.actions;
export default authSlice.reducer;