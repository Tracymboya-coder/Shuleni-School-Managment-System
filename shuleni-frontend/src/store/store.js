import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import classesReducer from './slices/classesSlice';
import usersReducer from './slices/usersSlice';
import resourcesReducer from './slices/resourcesSlice';
import attendanceReducer from './slices/attendanceSlice';
import examsReducer from './slices/examsSlice';
import chatReducer from './slices/chatSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    classes: classesReducer,
    users: usersReducer,
    resources: resourcesReducer,
    attendance: attendanceReducer,
    exams: examsReducer,
    chat: chatReducer
  }
});