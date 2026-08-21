import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest, ApiError } from '../api';
const initialState = {
  byClass: {},
  active: null,
  lastSubmission: null,
  myResults: [],
  status: 'idle',
  error: null
};

// Educator/Admin: build a new exam with questions.
export const buildExam = createAsyncThunk('exams/build', async (payload, {
  getState,
  rejectWithValue
}) => {
  const token = getState().auth.token;
  try {
    return await apiRequest('/exams', {
      method: 'POST',
      body: payload,
      token
    });
  } catch (err) {
    return rejectWithValue(err instanceof ApiError ? err.message : 'Could not create exam');
  }
});
export const fetchExams = createAsyncThunk('exams/fetchByClass', async (classId, {
  getState,
  rejectWithValue
}) => {
  const token = getState().auth.token;
  try {
    const exams = await apiRequest(`/exams?classId=${classId}`, {
      token
    });
    return {
      classId,
      exams
    };
  } catch (err) {
    return rejectWithValue(err instanceof ApiError ? err.message : 'Could not load exams');
  }
});

// Student: start an exam — starts the server-side timer.
export const startExam = createAsyncThunk('exams/start', async (examId, {
  getState,
  rejectWithValue
}) => {
  const token = getState().auth.token;
  try {
    return await apiRequest(`/exams/${examId}/start`, {
      token
    });
  } catch (err) {
    return rejectWithValue(err instanceof ApiError ? err.message : 'Could not start exam');
  }
});

// Student: submit answers. The server — not the client countdown — enforces the deadline.
export const submitExam = createAsyncThunk('exams/submit', async (payload, {
  getState,
  rejectWithValue
}) => {
  const token = getState().auth.token;
  try {
    return await apiRequest(`/exams/${payload.examId}/submit`, {
      method: 'POST',
      body: {
        answers: payload.answers
      },
      token
    });
  } catch (err) {
    return rejectWithValue(err instanceof ApiError ? err.message : 'Could not submit exam');
  }
});
export const fetchMyResults = createAsyncThunk('exams/fetchMyResults', async (_, {
  getState,
  rejectWithValue
}) => {
  const token = getState().auth.token;
  try {
    return await apiRequest('/exams/results/me', {
      token
    });
  } catch (err) {
    return rejectWithValue(err instanceof ApiError ? err.message : 'Could not load your results');
  }
});
const examsSlice = createSlice({
  name: 'exams',
  initialState,
  reducers: {
    clearActiveExam(state) {
      state.active = null;
      state.lastSubmission = null;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchExams.pending, state => {
      state.status = 'loading';
      state.error = null;
    }).addCase(fetchExams.fulfilled, (state, action) => {
      state.status = 'idle';
      state.byClass[action.payload.classId] = action.payload.exams;
    }).addCase(fetchExams.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload || 'Could not load exams';
    }).addCase(buildExam.fulfilled, (state, action) => {
      const list = state.byClass[action.payload.classId] || [];
      state.byClass[action.payload.classId] = [action.payload, ...list];
    }).addCase(startExam.fulfilled, (state, action) => {
      state.active = action.payload;
    }).addCase(submitExam.fulfilled, (state, action) => {
      state.lastSubmission = action.payload;
      state.active = null;
    }).addCase(fetchMyResults.fulfilled, (state, action) => {
      state.myResults = action.payload;
    });
  }
});
export const {
  clearActiveExam
} = examsSlice.actions;
export default examsSlice.reducer;