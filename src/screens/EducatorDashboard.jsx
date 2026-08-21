import { School, ClipboardCheck, FileText, FolderOpen, MessageSquare, BarChart2, Plus, Users, ArrowRight, AlertCircle, Activity } from 'lucide-react';
const myClasses = [{
  name: 'Form 3 East',
  subject: 'Biology & Chemistry',
  students: 47,
  attendance: 94,
  nextLesson: 'Today 11:00 AM',
  pendingAttendance: true
}, {
  name: 'Form 2 North',
  subject: 'Biology',
  students: 39,
  attendance: 91,
  nextLesson: 'Tomorrow 8:00 AM',
  pendingAttendance: false
}];
const recentActivity = [{
  text: 'You submitted attendance for Form 3 East',
  time: '8:00 AM',
  Icon: ClipboardCheck
}, {
  text: 'Brian Otieno submitted Biology CAT 2',
  time: '8:14 AM',
  Icon: FileText
}, {
  text: 'You uploaded Biology Revision Notes Ch.5-8',
  time: 'Yesterday',
  Icon: FolderOpen
}, {
  text: '3 new messages in Form 3 East chat',
  time: 'Yesterday',
  Icon: MessageSquare
}];
const pendingTasks = [{
  label: 'Take attendance — Form 3 East',
  urgency: 'high',
  screen: 'attendance'
}, {
  label: 'Grade Biology CAT 2 (6 submitted)',
  urgency: 'medium',
  screen: 'exam-builder'
}, {
  label: 'Publish English Comprehension exam',
  urgency: 'low',
  screen: 'exam-builder'
}];
const quickActions = [{
  label: 'Attendance',
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
  label: 'Resources',
  Icon: FolderOpen,
  screen: 'resources',
  color: '#D4922A',
  bg: '#FBF0D8'
}, {
  label: 'Class Chat',
  Icon: MessageSquare,
  screen: 'class-chat',
  color: '#6B2D8E',
  bg: '#EDD4F0'
}, {
  label: 'Results',
  Icon: BarChart2,
  screen: 'exam-builder',
  color: '#1A3A5C',
  bg: '#D4E4F0'
}];
export default function EducatorDashboard({
  navigate
}) {
  return <div style={{
    padding: '28px 32px',
    maxWidth: 1100,
    margin: '0 auto'
  }}>
      <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 24
    }}>
        <div>
          <h1 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          fontSize: 26,
          color: '#1E1A16',
          marginBottom: 4
        }}>Good morning, Ms. Njeri</h1>
          <p style={{
          fontSize: 14,
          color: '#6B6259'
        }}>Monday, 20 January 2025 · Makini Academy</p>
        </div>
        <div style={{
        display: 'flex',
        gap: 10
      }}>
          <button className="btn-ghost" onClick={() => navigate('resources')}>Upload resource</button>
          <button className="btn-primary" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }} onClick={() => navigate('exam-builder')}>
            <Plus size={15} strokeWidth={2.5} /> Create exam
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 14,
      marginBottom: 22
    }}>
        {[{
        label: 'My classes',
        value: '2',
        Icon: School,
        color: '#C1440E',
        bg: '#F4E4DC'
      }, {
        label: 'My students',
        value: '86',
        Icon: Users,
        color: '#2D6A4F',
        bg: '#D4EDE2'
      }, {
        label: "Today's attendance",
        value: '94%',
        Icon: ClipboardCheck,
        color: '#D4922A',
        bg: '#FBF0D8'
      }, {
        label: 'Active exams',
        value: '2',
        Icon: FileText,
        color: '#1A3A5C',
        bg: '#D4E4F0'
      }].map(s => <div key={s.label} className="stat-card">
            <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 10
        }}>
              <span style={{
            fontSize: 11,
            fontWeight: 700,
            color: '#B5A99C',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>{s.label}</span>
              <div style={{
            width: 28,
            height: 28,
            borderRadius: 7,
            background: s.bg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
                <s.Icon size={13} color={s.color} strokeWidth={1.8} />
              </div>
            </div>
            <div style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          fontSize: 28,
          color: '#1E1A16',
          lineHeight: 1
        }}>{s.value}</div>
          </div>)}
      </div>

      <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 300px',
      gap: 18,
      marginBottom: 18
    }}>
        {/* My classes */}
        <div>
          <div style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700,
          fontSize: 15,
          color: '#1E1A16',
          marginBottom: 10
        }}>My classes</div>
          <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10
        }}>
            {myClasses.map((c, i) => <div key={i} className="card" style={{
            padding: '18px',
            cursor: 'pointer',
            transition: 'transform 0.12s, box-shadow 0.12s'
          }} onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(30,26,22,0.1)';
          }} onMouseLeave={e => {
            e.currentTarget.style.transform = '';
            e.currentTarget.style.boxShadow = '';
          }} onClick={() => navigate('class-detail')}>
                <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 12
            }}>
                  <div>
                    <div style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 16,
                  color: '#1E1A16',
                  marginBottom: 2
                }}>{c.name}</div>
                    <div style={{
                  fontSize: 13,
                  color: '#6B6259'
                }}>{c.subject}</div>
                  </div>
                  <div style={{
                display: 'flex',
                gap: 6
              }}>
                    {c.pendingAttendance && <span className="badge-red">Attendance due</span>}
                    <span className="badge-gray">{c.students} students</span>
                  </div>
                </div>
                <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              marginBottom: 14
            }}>
                  <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7
              }}>
                    <span style={{
                  fontSize: 12,
                  color: '#6B6259'
                }}>Attendance</span>
                    <div style={{
                  height: 5,
                  width: 52,
                  background: '#F0EAE0',
                  borderRadius: 3
                }}>
                      <div style={{
                    height: '100%',
                    width: `${c.attendance}%`,
                    background: '#2D6A4F',
                    borderRadius: 3
                  }} />
                    </div>
                    <span style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#2D6A4F'
                }}>{c.attendance}%</span>
                  </div>
                  <span style={{
                fontSize: 12,
                color: '#B5A99C',
                marginLeft: 'auto'
              }}>Next: {c.nextLesson}</span>
                </div>
                <div style={{
              display: 'flex',
              gap: 6,
              paddingTop: 12,
              borderTop: '1px solid #F0EAE0'
            }}>
                  {[{
                label: 'Attendance',
                Icon: ClipboardCheck,
                screen: 'attendance'
              }, {
                label: 'Exams',
                Icon: FileText,
                screen: 'exam-builder'
              }, {
                label: 'Resources',
                Icon: FolderOpen,
                screen: 'resources'
              }, {
                label: 'Chat',
                Icon: MessageSquare,
                screen: 'class-chat'
              }].map(btn => <button key={btn.label} className="btn-ghost" style={{
                padding: '5px 11px',
                fontSize: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 5
              }} onClick={e => {
                e.stopPropagation();
                navigate(btn.screen);
              }}>
                      <btn.Icon size={12} strokeWidth={1.8} /> {btn.label}
                    </button>)}
                </div>
              </div>)}
          </div>
        </div>

        {/* Right column */}
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 14
      }}>
          {/* Pending tasks */}
          <div className="card" style={{
          overflow: 'hidden'
        }}>
            <div style={{
            padding: '14px 16px',
            borderBottom: '1px solid #F0EAE0',
            display: 'flex',
            alignItems: 'center',
            gap: 7
          }}>
              <AlertCircle size={14} color="#C1440E" strokeWidth={1.8} />
              <span style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: 14,
              color: '#1E1A16'
            }}>Action needed</span>
            </div>
            <div style={{
            padding: '4px 0'
          }}>
              {pendingTasks.map((t, i) => <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 16px',
              borderBottom: i < pendingTasks.length - 1 ? '1px solid #F8F4EE' : 'none',
              cursor: 'pointer'
            }} onClick={() => navigate(t.screen)}>
                  <div style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                flexShrink: 0,
                background: t.urgency === 'high' ? '#C1440E' : t.urgency === 'medium' ? '#D4922A' : '#B5A99C'
              }} />
                  <span style={{
                fontSize: 13,
                color: '#1E1A16',
                flex: 1
              }}>{t.label}</span>
                  <ArrowRight size={13} color="#B5A99C" />
                </div>)}
            </div>
          </div>

          {/* Recent activity */}
          <div className="card" style={{
          overflow: 'hidden'
        }}>
            <div style={{
            padding: '14px 16px',
            borderBottom: '1px solid #F0EAE0',
            display: 'flex',
            alignItems: 'center',
            gap: 7
          }}>
              <Activity size={14} color="#6B6259" strokeWidth={1.8} />
              <span style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: 14,
              color: '#1E1A16'
            }}>Recent activity</span>
            </div>
            <div style={{
            padding: '4px 0'
          }}>
              {recentActivity.map((a, i) => <div key={i} style={{
              display: 'flex',
              gap: 10,
              padding: '10px 16px',
              borderBottom: i < recentActivity.length - 1 ? '1px solid #F8F4EE' : 'none'
            }}>
                  <div style={{
                width: 28,
                height: 28,
                borderRadius: 7,
                background: '#F0EAE0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                    <a.Icon size={13} color="#6B6259" strokeWidth={1.8} />
                  </div>
                  <div>
                    <div style={{
                  fontSize: 13,
                  color: '#1E1A16'
                }}>{a.text}</div>
                    <div style={{
                  fontSize: 11,
                  color: '#B5A99C',
                  marginTop: 2
                }}>{a.time}</div>
                  </div>
                </div>)}
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="card" style={{
      padding: '18px'
    }}>
        <div style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 700,
        fontSize: 14,
        color: '#1E1A16',
        marginBottom: 12
      }}>Quick actions</div>
        <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 9
      }}>
          {quickActions.map(a => <button key={a.label} onClick={() => navigate(a.screen)} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 7,
          padding: '13px 10px',
          borderRadius: 10,
          border: `1px solid ${a.bg}`,
          background: a.bg,
          cursor: 'pointer',
          transition: 'border-color 0.12s'
        }} onMouseEnter={e => e.currentTarget.style.borderColor = a.color} onMouseLeave={e => e.currentTarget.style.borderColor = a.bg}>
              <div style={{
            width: 34,
            height: 34,
            borderRadius: 9,
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
                <a.Icon size={16} color={a.color} strokeWidth={1.8} />
              </div>
              <span style={{
            fontSize: 12,
            fontWeight: 600,
            color: '#1E1A16',
            textAlign: 'center'
          }}>{a.label}</span>
            </button>)}
        </div>
      </div>
    </div>;
}