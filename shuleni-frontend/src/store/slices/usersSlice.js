import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest, ApiError } from '../api';
const initialState = {
  items: [],
  status: 'idle',
  error: null
};
export const fetchUsers = createAsyncThunk('users/fetchAll', async (role, {
  getState,
  rejectWithValue
}) => {
  const token = getState().auth.token;
  try {
    const query = role ? `?role=${role}` : '';
    return await apiRequest(`/users${query}`, {
      token
    });
  } catch (err) {
    return rejectWithValue(err instanceof ApiError ? err.message : 'Could not load users');
  }
});
export const createUser = createAsyncThunk('users/create', async (payload, {
  getState,
  rejectWithValue
}) => {
  const token = getState().auth.token;
  try {
    return await apiRequest('/users', {
      method: 'POST',
      body: payload,
      token
    });
  } catch (err) {
    return rejectWithValue(err instanceof ApiError ? err.message : 'Could not create user');
  }
});
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, state => {
      state.status = 'loading';
      state.error = null;
    }).addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = 'idle';
      state.items = action.payload;
    }).addCase(fetchUsers.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload || 'Could not load users';
    }).addCase(createUser.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
  }
});
export default usersSlice.reducer;