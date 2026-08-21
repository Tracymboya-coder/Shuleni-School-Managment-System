import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest, ApiError } from '../api';
const initialState = {
  sessions: [],
  myRecords: [],
  status: 'idle',
  error: null
};

// Educator/Admin: submit or overwrite attendance for a class on a given date.
export const takeAttendance = createAsyncThunk('attendance/take', async (payload, {
  getState,
  rejectWithValue
}) => {
  const token = getState().auth.token;
  try {
    return await apiRequest('/attendance', {
      method: 'POST',
      body: payload,
      token
    });
  } catch (err) {
    return rejectWithValue(err instanceof ApiError ? err.message : 'Could not save attendance');
  }
});

// Educator/Admin: attendance history for a class.
export const fetchAttendanceHistory = createAsyncThunk('attendance/fetchHistory', async (classId, {
  getState,
  rejectWithValue
}) => {
  const token = getState().auth.token;
  try {
    return await apiRequest(`/attendance?classId=${classId}`, {
      token
    });
  } catch (err) {
    return rejectWithValue(err instanceof ApiError ? err.message : 'Could not load attendance history');
  }
});

// Student: their own attendance record.
export const fetchMyAttendance = createAsyncThunk('attendance/fetchMine', async (_, {
  getState,
  rejectWithValue
}) => {
  const token = getState().auth.token;
  try {
    return await apiRequest('/attendance/me', {
      token
    });
  } catch (err) {
    return rejectWithValue(err instanceof ApiError ? err.message : 'Could not load your attendance');
  }
});
const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAttendanceHistory.pending, state => {
      state.status = 'loading';
      state.error = null;
    }).addCase(fetchAttendanceHistory.fulfilled, (state, action) => {
      state.status = 'idle';
      state.sessions = action.payload;
    }).addCase(fetchAttendanceHistory.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload || 'Could not load attendance history';
    }).addCase(takeAttendance.fulfilled, (state, action) => {
      const idx = state.sessions.findIndex(s => s.id === action.payload.id);
      if (idx >= 0) state.sessions[idx] = action.payload;else state.sessions.unshift(action.payload);
    }).addCase(fetchMyAttendance.fulfilled, (state, action) => {
      state.myRecords = action.payload;
    });
  }
});
export default attendanceSlice.reducer;