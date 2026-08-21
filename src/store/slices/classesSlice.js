import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest, ApiError } from '../api';
const initialState = {
  items: [],
  status: 'idle',
  error: null
};
export const fetchClasses = createAsyncThunk('classes/fetchAll', async (_, {
  getState,
  rejectWithValue
}) => {
  const token = getState().auth.token;
  try {
    return await apiRequest('/classes', {
      token
    });
  } catch (err) {
    return rejectWithValue(err instanceof ApiError ? err.message : 'Could not load classes');
  }
});
export const createClass = createAsyncThunk('classes/create', async (name, {
  getState,
  rejectWithValue
}) => {
  const token = getState().auth.token;
  try {
    return await apiRequest('/classes', {
      method: 'POST',
      body: {
        name
      },
      token
    });
  } catch (err) {
    return rejectWithValue(err instanceof ApiError ? err.message : 'Could not create class');
  }
});
const classesSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchClasses.pending, state => {
      state.status = 'loading';
      state.error = null;
    }).addCase(fetchClasses.fulfilled, (state, action) => {
      state.status = 'idle';
      state.items = action.payload;
    }).addCase(fetchClasses.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload || 'Could not load classes';
    }).addCase(createClass.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
  }
});
export default classesSlice.reducer;