import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest, ApiError } from '../api';
const initialState = {
  byClass: {},
  status: 'idle',
  error: null
};
export const fetchMessages = createAsyncThunk('chat/fetch', async (payload, {
  getState,
  rejectWithValue
}) => {
  const token = getState().auth.token;
  try {
    const query = payload.after ? `?after=${encodeURIComponent(payload.after)}` : '';
    const messages = await apiRequest(`/chat/${payload.classId}/messages${query}`, {
      token
    });
    return {
      classId: payload.classId,
      messages,
      isPoll: Boolean(payload.after)
    };
  } catch (err) {
    return rejectWithValue(err instanceof ApiError ? err.message : 'Could not load messages');
  }
});
export const sendMessage = createAsyncThunk('chat/send', async (payload, {
  getState,
  rejectWithValue
}) => {
  const token = getState().auth.token;
  try {
    const message = await apiRequest(`/chat/${payload.classId}/messages`, {
      method: 'POST',
      body: {
        body: payload.body
      },
      token
    });
    return {
      classId: payload.classId,
      message
    };
  } catch (err) {
    return rejectWithValue(err instanceof ApiError ? err.message : 'Could not send message');
  }
});
const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchMessages.pending, state => {
      state.status = 'loading';
      state.error = null;
    }).addCase(fetchMessages.fulfilled, (state, action) => {
      state.status = 'idle';
      const {
        classId,
        messages,
        isPoll
      } = action.payload;
      const existing = state.byClass[classId] || [];
      // On a poll (`after` was set), append only the new messages instead of replacing the list.
      state.byClass[classId] = isPoll ? [...existing, ...messages] : messages;
    }).addCase(fetchMessages.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload || 'Could not load messages';
    }).addCase(sendMessage.fulfilled, (state, action) => {
      const {
        classId,
        message
      } = action.payload;
      state.byClass[classId] = [...(state.byClass[classId] || []), message];
    });
  }
});
export default chatSlice.reducer;