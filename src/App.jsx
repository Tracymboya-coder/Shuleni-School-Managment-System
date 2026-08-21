import { useState } from 'react';
import Layout from './components/Layout';
import Landing from './screens/Landing';
import CreateSchool from './screens/CreateSchool';
import Login from './screens/Login';
import ForgotPassword from './screens/ForgotPassword';
import AdminDashboard from './screens/AdminDashboard';
import EducatorDashboard from './screens/EducatorDashboard';
import ManageUsers from './screens/ManageUsers';
import Classes from './screens/Classes';
import ClassDetail from './screens/ClassDetail';
import Resources from './screens/Resources';
import Attendance from './screens/Attendance';
import ExamBuilder from './screens/ExamBuilder';
import ExamStudent from './screens/ExamStudent';
import ClassChat from './screens/ClassChat';
import StudentDashboard from './screens/StudentDashboard';
import StudentAttendance from './screens/StudentAttendance';
import StudentResults from './screens/StudentResults';
export default function App() {
  const [screen, setScreen] = useState('landing');
  const [role, setRole] = useState('admin');
  const navigate = s => setScreen(s);

  // Handle role changes from login
  const handleSetRole = r => setRole(r);

  // Bare screens (no app shell)
  if (screen === 'landing') return <Landing navigate={navigate} />;
  if (screen === 'create-school') return <CreateSchool navigate={navigate} />;
  if (screen === 'login') return <Login navigate={navigate} setRole={handleSetRole} />;
  if (screen === 'forgot-password') return <ForgotPassword navigate={navigate} />;
  if (screen === 'exam-student') return <ExamStudent navigate={navigate} />;

  // Shell-wrapped app screens
  return <Layout screen={screen} navigate={navigate} role={role}>
      {screen === 'admin-dashboard' && <AdminDashboard navigate={navigate} />}
      {screen === 'educator-dashboard' && <EducatorDashboard navigate={navigate} />}
      {screen === 'manage-users' && <ManageUsers />}
      {screen === 'classes' && <Classes />}
      {screen === 'class-detail' && <ClassDetail navigate={navigate} />}
      {screen === 'resources' && <Resources />}
      {screen === 'attendance' && <Attendance />}
      {screen === 'exam-builder' && <ExamBuilder navigate={navigate} />}
      {screen === 'class-chat' && <ClassChat />}
      {screen === 'student-dashboard' && <StudentDashboard navigate={navigate} />}
      {screen === 'student-attendance' && <StudentAttendance navigate={navigate} />}
      {screen === 'student-results' && <StudentResults navigate={navigate} />}
    </Layout>;
}