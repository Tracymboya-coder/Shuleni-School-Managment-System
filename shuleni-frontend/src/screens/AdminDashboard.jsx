import { Users, School, ClipboardCheck, LayoutDashboard, Plus, FileText, FolderOpen, MessageSquare, TrendingUp } from 'lucide-react';
const stats = [{
  label: 'Total Students',
  value: '847',
  delta: '+12 this week',
  Icon: Users,
  color: '#C1440E',
  bg: '#F4E4DC'
}, {
  label: 'Educators',
  value: '52',
  delta: '3 pending invite',
  Icon: School,
  color: '#2D6A4F',
  bg: '#D4EDE2'
}, {
  label: "Today's Attendance",
  value: '94.2%',
  delta: '798 of 847 present',
  Icon: ClipboardCheck,
  color: '#D4922A',
  bg: '#FBF0D8'
}, {
  label: 'Active Classes',
  value: '24',
  delta: 'Across 4 streams',
  Icon: LayoutDashboard,
  color: '#1A3A5C',
  bg: '#D4E4F0'
}];
const recentActivity = [{
  user: 'Ms. Grace Njeri',
  action: 'Submitted attendance',
  target: 'Form 3 East',
  time: '8 min ago',
  initials: 'GN',
  color: '#2D6A4F'
}, {
  user: 'Brian Otieno',
  action: 'Submitted exam',
  target: 'Mathematics Mock',
  time: '14 min ago',
  initials: 'BO',
  color: '#D4922A'
}, {
  user: 'Mr. Peter Kimani',
  action: 'Uploaded resource',
  target: 'Chemistry Notes Ch.7',
  time: '1 hr ago',
  initials: 'PK',
  color: '#C1440E'
}, {
  user: 'Admin',
  action: 'Added student',
  target: 'Aisha Muthoni (Form 1)',
  time: '2 hr ago',
  initials: 'AK',
  color: '#6B6259'
}, {
  user: 'Ms. Grace Njeri',
  action: 'Created exam',
  target: 'Biology CAT 2',
  time: '3 hr ago',
  initials: 'GN',
  color: '#2D6A4F'
}];
const topClasses = [{
  name: 'Form 4 West',
  educator: 'Mr. Ochieng',
  students: 42,
  attendance: 97,
  exam: 82
}, {
  name: 'Form 3 East',
  educator: 'Ms. Njeri',
  students: 47,
  attendance: 94,
  exam: 78
}, {
  name: 'Form 2 North',
  educator: 'Mr. Kimani',
  students: 39,
  attendance: 91,
  exam: 71
}, {
  name: 'Form 1 South',
  educator: 'Ms. Wanjiru',
  students: 45,
  attendance: 88,
  exam: 68
}];
const upcomingExams = [{
  name: 'Mathematics KCSE Mock',
  cls: 'Form 4',
  date: 'Mon 20 Jan',
  status: 'Scheduled'
}, {
  name: 'Biology CAT 2',
  cls: 'Form 3',
  date: 'Wed 22 Jan',
  status: 'Draft'
}, {
  name: 'English Comprehension',
  cls: 'Form 2',
  date: 'Thu 23 Jan',
  status: 'Scheduled'
}];
const quickActions = [{
  label: 'Take Attendance',
  Icon: ClipboardCheck,
  screen: 'attendance',
  color: '#2D6A4F',
  bg: '#D4EDE2'
}, {
  label: 'Create Exam',
  Icon: FileText,
  screen: 'exam-builder',
  color: '#C1440E',
  bg: '#F4E4DC'
}, {
  label: 'Add Student',
  Icon: Users,
  screen: 'manage-users',
  color: '#D4922A',
  bg: '#FBF0D8'
}, {
  label: 'Upload Resource',
  Icon: FolderOpen,
  screen: 'resources',
  color: '#1A3A5C',
  bg: '#D4E4F0'
}, {
  label: 'Class Chat',
  Icon: MessageSquare,
  screen: 'class-chat',
  color: '#6B2D8E',
  bg: '#EDD4F0'
}, {
  label: 'Manage Classes',
  Icon: School,
  screen: 'classes',
  color: '#3D3730',
  bg: '#F0EAE0'
}];
export default function AdminDashboard({
  navigate
}) {
  return <div style={{
    padding: '28px 32px',
    maxWidth: 1200,
    margin: '0 auto'
  }}>
      <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 26
    }}>
        <div>
          <h1 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          fontSize: 26,
          color: '#1E1A16',
          marginBottom: 4
        }}>Good morning, Alice</h1>
          <p style={{
          fontSize: 14,
          color: '#6B6259'
        }}>Monday, 20 January 2025 · Makini Academy, Nairobi</p>
        </div>
        <div style={{
        display: 'flex',
        gap: 10
      }}>
          <button className="btn-ghost" onClick={() => navigate('manage-users')}>Invite Educator</button>
          <button className="btn-primary" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }} onClick={() => navigate('manage-users')}>
            <Plus size={15} strokeWidth={2.5} /> Add Student
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 16,
      marginBottom: 24
    }}>
        {stats.map(s => <div key={s.label} className="stat-card">
            <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 12
        }}>
              <div style={{
            fontSize: 12,
            fontWeight: 600,
            color: '#6B6259',
            textTransform: 'uppercase',
            letterSpacing: '0.06em'
          }}>{s.label}</div>
              <div style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: s.bg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
                <s.Icon size={15} color={s.color} strokeWidth={1.8} />
              </div>
            </div>
            <div style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          fontSize: 30,
          color: '#1E1A16',
          lineHeight: 1,
          marginBottom: 6
        }}>{s.value}</div>
            <div style={{
          fontSize: 12,
          color: s.color,
          fontWeight: 600
        }}>{s.delta}</div>
          </div>)}
      </div>

      {/* Main grid */}
      <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 320px',
      gap: 20,
      marginBottom: 20
    }}>
        {/* Top classes */}
        <div className="card" style={{
        overflow: 'hidden'
      }}>
          <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid #F0EAE0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
            <span style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 15,
            color: '#1E1A16'
          }}>Class performance</span>
            <button className="btn-ghost" style={{
            padding: '5px 12px',
            fontSize: 12
          }} onClick={() => navigate('classes')}>View all</button>
          </div>
          <div>
            <div className="table-row" style={{
            gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr',
            background: '#FAF7F0'
          }}>
              {['Class', 'Educator', 'Students', 'Attendance', 'Avg. Score'].map(h => <span key={h} style={{
              fontSize: 11,
              fontWeight: 700,
              color: '#B5A99C',
              textTransform: 'uppercase',
              letterSpacing: '0.06em'
            }}>{h}</span>)}
            </div>
            {topClasses.map((c, i) => <div key={i} className="table-row" style={{
            gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr',
            cursor: 'pointer'
          }} onClick={() => navigate('classes')}>
                <span style={{
              fontWeight: 600,
              color: '#1E1A16',
              fontSize: 14
            }}>{c.name}</span>
                <span style={{
              color: '#6B6259',
              fontSize: 13
            }}>{c.educator}</span>
                <span style={{
              color: '#3D3730',
              fontSize: 14
            }}>{c.students}</span>
                <span style={{
              fontSize: 13,
              fontWeight: 600,
              color: c.attendance >= 93 ? '#1A4A35' : c.attendance >= 88 ? '#9A6A18' : '#8E3008'
            }}>{c.attendance}%</span>
                <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}>
                  <div style={{
                height: 5,
                width: 44,
                background: '#F0EAE0',
                borderRadius: 3,
                overflow: 'hidden'
              }}>
                    <div style={{
                  height: '100%',
                  width: `${c.exam}%`,
                  background: c.exam >= 80 ? '#2D6A4F' : c.exam >= 70 ? '#D4922A' : '#C1440E',
                  borderRadius: 3
                }} />
                  </div>
                  <span style={{
                fontSize: 13,
                color: '#3D3730'
              }}>{c.exam}%</span>
                </span>
              </div>)}
          </div>
        </div>

        {/* Activity */}
        <div className="card" style={{
        overflow: 'hidden'
      }}>
          <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid #F0EAE0',
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
            <TrendingUp size={15} color="#6B6259" strokeWidth={1.8} />
            <span style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 15,
            color: '#1E1A16'
          }}>Recent activity</span>
          </div>
          <div style={{
          padding: '6px 0'
        }}>
            {recentActivity.map((a, i) => <div key={i} style={{
            display: 'flex',
            gap: 10,
            padding: '10px 16px',
            borderBottom: i < recentActivity.length - 1 ? '1px solid #F8F4EE' : 'none'
          }}>
                <div style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: a.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 11,
              fontWeight: 700,
              color: '#fff',
              flexShrink: 0
            }}>{a.initials}</div>
                <div style={{
              flex: 1,
              minWidth: 0
            }}>
                  <div style={{
                fontSize: 13,
                color: '#1E1A16'
              }}><span style={{
                  fontWeight: 600
                }}>{a.user}</span> {a.action}</div>
                  <div style={{
                fontSize: 12,
                color: '#6B6259',
                marginTop: 1
              }}>{a.target}</div>
                  <div style={{
                fontSize: 11,
                color: '#B5A99C',
                marginTop: 1
              }}>{a.time}</div>
                </div>
              </div>)}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 20
    }}>
        {/* Upcoming exams */}
        <div className="card" style={{
        overflow: 'hidden'
      }}>
          <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid #F0EAE0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
            <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
              <FileText size={15} color="#6B6259" strokeWidth={1.8} />
              <span style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: 15,
              color: '#1E1A16'
            }}>Upcoming exams</span>
            </div>
            <button className="btn-ghost" style={{
            padding: '5px 12px',
            fontSize: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 4
          }} onClick={() => navigate('exam-builder')}>
              <Plus size={12} strokeWidth={2.5} /> Create
            </button>
          </div>
          <div style={{
          padding: '8px 0'
        }}>
            {upcomingExams.map((e, i) => <div key={i} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 18px',
            borderBottom: i < upcomingExams.length - 1 ? '1px solid #F8F4EE' : 'none'
          }}>
                <div>
                  <div style={{
                fontSize: 14,
                fontWeight: 600,
                color: '#1E1A16'
              }}>{e.name}</div>
                  <div style={{
                fontSize: 12,
                color: '#6B6259'
              }}>{e.cls} · {e.date}</div>
                </div>
                <span className={e.status === 'Scheduled' ? 'badge-green' : 'badge-gold'}>{e.status}</span>
              </div>)}
          </div>
        </div>

        {/* Quick actions */}
        <div className="card" style={{
        padding: '20px'
      }}>
          <div style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700,
          fontSize: 15,
          color: '#1E1A16',
          marginBottom: 14
        }}>Quick actions</div>
          <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 9
        }}>
            {quickActions.map(a => <button key={a.label} onClick={() => navigate(a.screen)} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 9,
            padding: '11px 13px',
            borderRadius: 9,
            border: `1px solid ${a.bg}`,
            background: a.bg,
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'border-color 0.12s'
          }} onMouseEnter={e => e.currentTarget.style.borderColor = a.color} onMouseLeave={e => e.currentTarget.style.borderColor = a.bg}>
                <div style={{
              width: 28,
              height: 28,
              borderRadius: 7,
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
                  <a.Icon size={14} color={a.color} strokeWidth={1.8} />
                </div>
                <span style={{
              fontSize: 13,
              fontWeight: 600,
              color: '#1E1A16'
            }}>{a.label}</span>
              </button>)}
          </div>
        </div>
      </div>
    </div>;
}