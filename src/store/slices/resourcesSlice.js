import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest, ApiError } from '../api';
const initialState = {
  items: [],
  status: 'idle',
  error: null
};
export const fetchResources = createAsyncThunk('resources/fetchByClass', async (classId, {
  getState,
  rejectWithValue
}) => {
  const token = getState().auth.token;
  try {
    return await apiRequest(`/resources?classId=${classId}`, {
      token
    });
  } catch (err) {
    return rejectWithValue(err instanceof ApiError ? err.message : 'Could not load resources');
  }
});
export const uploadResource = createAsyncThunk('resources/upload', async (payload, {
  getState,
  rejectWithValue
}) => {
  const token = getState().auth.token;
  const form = new FormData();
  form.append('title', payload.title);
  form.append('category', payload.category);
  if (payload.description) form.append('description', payload.description);
  form.append('classId', payload.classId);
  form.append('file', payload.file);
  try {
    return await apiRequest('/resources', {
      method: 'POST',
      body: form,
      token,
      isFormData: true
    });
  } catch (err) {
    return rejectWithValue(err instanceof ApiError ? err.message : 'Could not upload resource');
  }
});
const resourcesSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchResources.pending, state => {
      state.status = 'loading';
      state.error = null;
    }).addCase(fetchResources.fulfilled, (state, action) => {
      state.status = 'idle';
      state.items = action.payload;
    }).addCase(fetchResources.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload || 'Could not load resources';
    }).addCase(uploadResource.fulfilled, (state, action) => {
      state.items.unshift(action.payload);
    });
  }
});
export default resourcesSlice.reducer;