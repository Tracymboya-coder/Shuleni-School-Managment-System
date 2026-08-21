import { LayoutDashboard, Users, School, FolderOpen, ClipboardCheck, FileText, MessageSquare, LogOut, Bell, Search, ChevronRight, BarChart2, BookOpen, GraduationCap, ShieldCheck } from 'lucide-react';
const adminNav = [{
  id: 'admin-dashboard',
  label: 'Overview',
  Icon: LayoutDashboard
}, {
  id: 'manage-users',
  label: 'People',
  Icon: Users
}, {
  id: 'classes',
  label: 'Classes',
  Icon: School
}, {
  id: 'resources',
  label: 'Resources',
  Icon: FolderOpen
}, {
  id: 'attendance',
  label: 'Attendance',
  Icon: ClipboardCheck
}, {
  id: 'exam-builder',
  label: 'Exams',
  Icon: FileText
}, {
  id: 'class-chat',
  label: 'Class Chat',
  Icon: MessageSquare
}];
const educatorNav = [{
  id: 'educator-dashboard',
  label: 'Dashboard',
  Icon: LayoutDashboard
}, {
  id: 'classes',
  label: 'Classes',
  Icon: School
}, {
  id: 'resources',
  label: 'Resources',
  Icon: FolderOpen
}, {
  id: 'attendance',
  label: 'Attendance',
  Icon: ClipboardCheck
}, {
  id: 'exam-builder',
  label: 'Exams',
  Icon: FileText
}, {
  id: 'class-chat',
  label: 'Class Chat',
  Icon: MessageSquare
}];
const studentNav = [{
  id: 'student-dashboard',
  label: 'Dashboard',
  Icon: LayoutDashboard
}, {
  id: 'resources',
  label: 'Resources',
  Icon: FolderOpen
}, {
  id: 'exam-student',
  label: 'Assessments',
  Icon: FileText
}, {
  id: 'student-attendance',
  label: 'My Attendance',
  Icon: ClipboardCheck
}, {
  id: 'student-results',
  label: 'My Results',
  Icon: BarChart2
}, {
  id: 'class-chat',
  label: 'Class Chat',
  Icon: MessageSquare
}];
const mobileAdminNav = [{
  id: 'admin-dashboard',
  label: 'Home',
  Icon: LayoutDashboard
}, {
  id: 'classes',
  label: 'Classes',
  Icon: School
}, {
  id: 'attendance',
  label: 'Attend.',
  Icon: ClipboardCheck
}, {
  id: 'exam-builder',
  label: 'Exams',
  Icon: FileText
}, {
  id: 'class-chat',
  label: 'Chat',
  Icon: MessageSquare
}];
const mobileEducatorNav = [{
  id: 'educator-dashboard',
  label: 'Home',
  Icon: LayoutDashboard
}, {
  id: 'classes',
  label: 'Classes',
  Icon: School
}, {
  id: 'attendance',
  label: 'Attend.',
  Icon: ClipboardCheck
}, {
  id: 'exam-builder',
  label: 'Exams',
  Icon: FileText
}, {
  id: 'class-chat',
  label: 'Chat',
  Icon: MessageSquare
}];
const mobileStudentNav = [{
  id: 'student-dashboard',
  label: 'Home',
  Icon: LayoutDashboard
}, {
  id: 'resources',
  label: 'Resources',
  Icon: FolderOpen
}, {
  id: 'exam-student',
  label: 'Exams',
  Icon: FileText
}, {
  id: 'student-results',
  label: 'Results',
  Icon: BarChart2
}, {
  id: 'class-chat',
  label: 'Chat',
  Icon: MessageSquare
}];
const roleConfig = {
  admin: {
    label: 'School Owner',
    name: 'Alice Kamau',
    initials: 'AK',
    color: '#C1440E',
    Icon: ShieldCheck
  },
  educator: {
    label: 'Educator',
    name: 'Ms. Grace Njeri',
    initials: 'GN',
    color: '#2D6A4F',
    Icon: BookOpen
  },
  student: {
    label: 'Student',
    name: 'Brian Otieno',
    initials: 'BO',
    color: '#D4922A',
    Icon: GraduationCap
  }
};
export default function Layout({
  screen,
  navigate,
  role,
  children
}) {
  const nav = role === 'admin' ? adminNav : role === 'educator' ? educatorNav : studentNav;
  const mobileNav = role === 'admin' ? mobileAdminNav : role === 'educator' ? mobileEducatorNav : mobileStudentNav;
  const rc = roleConfig[role];
  const isActive = id => screen === id || id === 'classes' && screen === 'class-detail';
  return <div style={{
    display: 'flex',
    minHeight: '100vh',
    background: '#FAF7F0'
  }}>
      {/* Desktop sidebar */}
      <aside style={{
      width: 216,
      minWidth: 216,
      background: '#fff',
      borderRight: '1px solid #E4DDD4',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'sticky',
      top: 0
    }}>
        {/* Logo */}
        <div style={{
        padding: '18px 18px 14px',
        borderBottom: '1px solid #F0EAE0'
      }}>
          <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 9
        }}>
            <div style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: '#C1440E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
              <span style={{
              color: '#fff',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: 15
            }}>S</span>
            </div>
            <div>
              <div style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: 14,
              color: '#1E1A16',
              lineHeight: 1.1
            }}>Shuleni</div>
              <div style={{
              fontSize: 11,
              color: '#B5A99C',
              fontWeight: 500
            }}>Makini Academy</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{
        flex: 1,
        padding: '10px 8px',
        overflowY: 'auto'
      }}>
          <div style={{
          fontSize: 10,
          fontWeight: 700,
          color: '#B5A99C',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          padding: '0 8px',
          marginBottom: 4
        }}>Navigation</div>
          {nav.map(item => {
          const active = isActive(item.id);
          return <div key={item.id} className={`sidebar-link ${active ? 'active' : ''}`} onClick={() => navigate(item.id)}>
                <item.Icon size={15} strokeWidth={active ? 2.2 : 1.8} />
                {item.label}
              </div>;
        })}

          <div style={{
          fontSize: 10,
          fontWeight: 700,
          color: '#B5A99C',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          padding: '10px 8px 4px',
          marginTop: 6
        }}>Demo roles</div>
          {[{
          r: 'admin',
          label: 'School Owner',
          Icon: ShieldCheck,
          screen: 'admin-dashboard'
        }, {
          r: 'educator',
          label: 'Educator',
          Icon: BookOpen,
          screen: 'educator-dashboard'
        }, {
          r: 'student',
          label: 'Student',
          Icon: GraduationCap,
          screen: 'student-dashboard'
        }].map(item => <div key={item.r} className={`sidebar-link ${role === item.r ? 'active' : ''}`} style={{
          fontSize: 12
        }} onClick={() => navigate(item.screen)}>
              <item.Icon size={13} strokeWidth={1.8} />
              {item.label}
            </div>)}
        </nav>

        {/* User */}
        <div style={{
        padding: '12px 14px',
        borderTop: '1px solid #F0EAE0',
        display: 'flex',
        alignItems: 'center',
        gap: 9
      }}>
          <div style={{
          width: 30,
          height: 30,
          borderRadius: '50%',
          background: rc.color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 11,
          fontWeight: 700,
          color: '#fff',
          flexShrink: 0
        }}>
            {rc.initials}
          </div>
          <div style={{
          flex: 1,
          minWidth: 0
        }}>
            <div style={{
            fontSize: 12,
            fontWeight: 600,
            color: '#1E1A16',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>{rc.name}</div>
            <div style={{
            fontSize: 11,
            color: '#B5A99C'
          }}>{rc.label}</div>
          </div>
          <button onClick={() => navigate('login')} title="Sign out" style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#B5A99C',
          display: 'flex',
          padding: 2
        }}>
            <LogOut size={14} strokeWidth={1.8} />
          </button>
        </div>
      </aside>

      {/* Main */}
      <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0,
      maxWidth: 'calc(100vw - 216px)'
    }}>
        {/* Top bar */}
        <header style={{
        background: '#fff',
        borderBottom: '1px solid #E4DDD4',
        padding: '0 24px',
        height: 54,
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
          <div style={{
          flex: 1
        }}>
            <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            background: '#FAF7F0',
            border: '1.5px solid #E4DDD4',
            borderRadius: 8,
            padding: '6px 12px',
            maxWidth: 320
          }}>
              <Search size={13} color="#B5A99C" strokeWidth={2} />
              <input placeholder="Search…" style={{
              border: 'none',
              background: 'transparent',
              outline: 'none',
              fontSize: 13,
              color: '#1E1A16',
              width: '100%'
            }} />
            </div>
          </div>
          <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10
        }}>
            <button style={{
            position: 'relative',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#6B6259',
            display: 'flex',
            padding: 2
          }}>
              <Bell size={18} strokeWidth={1.8} />
              <span style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 7,
              height: 7,
              background: '#C1440E',
              borderRadius: '50%',
              border: '1.5px solid #fff'
            }} />
            </button>
            <div style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: rc.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 11,
            fontWeight: 700,
            color: '#fff',
            cursor: 'pointer'
          }}>
              {rc.initials}
            </div>
          </div>
        </header>

        <main style={{
        flex: 1,
        overflowY: 'auto',
        paddingBottom: 72
      }}>
          <div className="fade-in">
            {children}
          </div>
        </main>

        {/* Mobile bottom nav */}
        <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 216,
        right: 0,
        background: '#fff',
        borderTop: '1px solid #E4DDD4',
        display: 'flex',
        height: 58,
        zIndex: 10
      }}>
          {mobileNav.map(item => {
          const active = isActive(item.id);
          return <button key={item.id} onClick={() => navigate(item.id)} style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            padding: '6px 4px'
          }}>
                <item.Icon size={18} strokeWidth={active ? 2.2 : 1.7} color={active ? '#C1440E' : '#B5A99C'} />
                <span style={{
              fontSize: 10,
              fontWeight: active ? 700 : 500,
              color: active ? '#C1440E' : '#B5A99C',
              lineHeight: 1
            }}>{item.label}</span>
              </button>;
        })}
        </nav>
      </div>
    </div>;
}