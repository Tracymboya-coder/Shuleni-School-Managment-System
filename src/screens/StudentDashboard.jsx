import { FileText, BarChart2, ClipboardCheck, MessageSquare, FolderOpen, ArrowRight, ExternalLink, Clock } from 'lucide-react';
const schedule = [{
  subject: 'Mathematics',
  time: '8:00 – 9:00 AM',
  teacher: 'Mr. Kimani',
  status: 'past'
}, {
  subject: 'Biology',
  time: '9:00 – 10:00 AM',
  teacher: 'Ms. Njeri',
  status: 'now'
}, {
  subject: 'English',
  time: '11:00 – 12:00 PM',
  teacher: 'Mr. Ochieng',
  status: 'upcoming'
}, {
  subject: 'Chemistry',
  time: '1:00 – 2:00 PM',
  teacher: 'Ms. Wanjiru',
  status: 'upcoming'
}];
const pendingExams = [{
  name: 'Biology CAT 2',
  due: 'Tomorrow 9:00 AM',
  cls: 'Form 3 East',
  urgency: 'urgent'
}, {
  name: 'English Comprehension',
  due: 'Thu 23 Jan',
  cls: 'Form 3 East',
  urgency: 'normal'
}];
const recentResources = [{
  name: 'Biology Revision Notes Ch.5-8.pdf',
  cls: 'Form 3 East',
  added: '2 hr ago'
}, {
  name: 'Mathematics Past Papers 2020-2024',
  cls: 'Form 3 East',
  added: 'Yesterday'
}, {
  name: 'Chemistry Lab Report Template',
  cls: 'Form 3 East',
  added: '2 days ago'
}];
const quickAccess = [{
  label: 'Take Biology CAT 2',
  sub: 'Due tomorrow · Tap to start',
  Icon: FileText,
  screen: 'exam-student',
  bg: '#F4E4DC',
  color: '#C1440E'
}, {
  label: 'My results',
  sub: '5 exams graded this term',
  Icon: BarChart2,
  screen: 'student-results',
  bg: '#D4EDE2',
  color: '#2D6A4F'
}, {
  label: 'My attendance record',
  sub: '94% this term',
  Icon: ClipboardCheck,
  screen: 'student-attendance',
  bg: '#FBF0D8',
  color: '#D4922A'
}, {
  label: 'Class chat',
  sub: '3 new messages',
  Icon: MessageSquare,
  screen: 'class-chat',
  bg: '#EDD4F0',
  color: '#6B2D8E'
}];
export default function StudentDashboard({
  navigate
}) {
  return <div style={{
    padding: '28px 32px',
    maxWidth: 1100,
    margin: '0 auto'
  }}>
      <div style={{
      marginBottom: 24
    }}>
        <h1 style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 800,
        fontSize: 26,
        color: '#1E1A16',
        marginBottom: 4
      }}>Good morning, Brian</h1>
        <p style={{
        fontSize: 14,
        color: '#6B6259'
      }}>Monday, 20 January 2025 · Form 3 East · Makini Academy</p>
      </div>

      {/* Attendance banner */}
      <div onClick={() => navigate('student-attendance')} style={{
      background: 'linear-gradient(135deg, #1E1A16 0%, #3D3730 100%)',
      borderRadius: 14,
      padding: '20px 26px',
      marginBottom: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      cursor: 'pointer',
      overflow: 'hidden',
      position: 'relative',
      transition: 'opacity 0.15s'
    }} onMouseEnter={e => e.currentTarget.style.opacity = '0.92'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
        <div style={{
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: 160,
        backgroundImage: 'repeating-linear-gradient(45deg, rgba(193,68,14,0.07) 0, rgba(193,68,14,0.07) 1px, transparent 0, transparent 50%)',
        backgroundSize: '8px 8px'
      }} />
        <div>
          <div style={{
          fontSize: 12,
          color: 'rgba(250,247,240,0.55)',
          marginBottom: 2
        }}>My attendance this term</div>
          <div style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          fontSize: 38,
          color: '#FAF7F0',
          lineHeight: 1
        }}>94%</div>
          <div style={{
          fontSize: 13,
          color: 'rgba(250,247,240,0.55)',
          marginTop: 2
        }}>47 of 50 days · View full record</div>
        </div>
        <div style={{
        display: 'flex',
        gap: 16,
        zIndex: 1
      }}>
          {[{
          label: 'Present',
          value: 47,
          color: '#2D6A4F'
        }, {
          label: 'Absent',
          value: 2,
          color: '#C1440E'
        }, {
          label: 'Late',
          value: 1,
          color: '#D4922A'
        }].map(s => <div key={s.label} style={{
          textAlign: 'center'
        }}>
              <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: 22,
            color: s.color
          }}>{s.value}</div>
              <div style={{
            fontSize: 11,
            color: 'rgba(250,247,240,0.55)'
          }}>{s.label}</div>
            </div>)}
        </div>
      </div>

      <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 18,
      marginBottom: 18
    }}>
        {/* Today's classes */}
        <div className="card" style={{
        overflow: 'hidden'
      }}>
          <div style={{
          padding: '15px 18px',
          borderBottom: '1px solid #F0EAE0',
          display: 'flex',
          alignItems: 'center',
          gap: 7
        }}>
            <Clock size={14} color="#6B6259" strokeWidth={1.8} />
            <span style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 15,
            color: '#1E1A16'
          }}>Today's classes</span>
          </div>
          {schedule.map((s, i) => <div key={i} style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 18px',
          borderBottom: i < schedule.length - 1 ? '1px solid #F8F4EE' : 'none',
          background: s.status === 'now' ? 'rgba(212,237,226,0.2)' : 'transparent'
        }}>
              <div style={{
            width: 3,
            height: 36,
            borderRadius: 2,
            flexShrink: 0,
            background: s.status === 'now' ? '#2D6A4F' : s.status === 'past' ? '#E4DDD4' : '#F0EAE0'
          }} />
              <div style={{
            flex: 1
          }}>
                <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
                  <span style={{
                fontSize: 14,
                fontWeight: 600,
                color: s.status === 'past' ? '#B5A99C' : '#1E1A16'
              }}>{s.subject}</span>
                  {s.status === 'now' && <span className="badge-green" style={{
                fontSize: 10
              }}>Now</span>}
                </div>
                <div style={{
              fontSize: 12,
              color: '#6B6259',
              marginTop: 1
            }}>{s.time} · {s.teacher}</div>
              </div>
            </div>)}
        </div>

        {/* Pending exams */}
        <div className="card" style={{
        overflow: 'hidden'
      }}>
          <div style={{
          padding: '15px 18px',
          borderBottom: '1px solid #F0EAE0',
          display: 'flex',
          alignItems: 'center',
          gap: 7
        }}>
            <FileText size={14} color="#6B6259" strokeWidth={1.8} />
            <span style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 15,
            color: '#1E1A16'
          }}>Pending assessments</span>
          </div>
          {pendingExams.map((e, i) => <div key={i} style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '13px 18px',
          borderBottom: i < pendingExams.length - 1 ? '1px solid #F8F4EE' : 'none',
          cursor: 'pointer'
        }} onClick={() => navigate('exam-student')}>
              <div>
                <div style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#1E1A16',
              marginBottom: 2
            }}>{e.name}</div>
                <div style={{
              fontSize: 12,
              color: '#6B6259'
            }}>{e.cls} · Due {e.due}</div>
              </div>
              <div style={{
            display: 'flex',
            gap: 8,
            alignItems: 'center'
          }}>
                <span className={e.urgency === 'urgent' ? 'badge-red' : 'badge-gold'}>{e.urgency === 'urgent' ? 'Due tomorrow' : 'Upcoming'}</span>
                <ArrowRight size={13} color="#B5A99C" />
              </div>
            </div>)}
          <div style={{
          padding: '12px 18px',
          borderTop: '1px solid #F8F4EE'
        }}>
            <button className="btn-ghost" style={{
            width: '100%',
            fontSize: 13
          }} onClick={() => navigate('exam-student')}>View all assessments</button>
          </div>
        </div>
      </div>

      <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 18
    }}>
        {/* Recent resources */}
        <div className="card" style={{
        overflow: 'hidden'
      }}>
          <div style={{
          padding: '15px 18px',
          borderBottom: '1px solid #F0EAE0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
            <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7
          }}>
              <FolderOpen size={14} color="#6B6259" strokeWidth={1.8} />
              <span style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: 15,
              color: '#1E1A16'
            }}>Recent resources</span>
            </div>
            <button className="btn-ghost" style={{
            padding: '4px 10px',
            fontSize: 12
          }} onClick={() => navigate('resources')}>View all</button>
          </div>
          {recentResources.map((r, i) => <div key={i} style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '11px 18px',
          borderBottom: i < recentResources.length - 1 ? '1px solid #F8F4EE' : 'none',
          cursor: 'pointer'
        }} onClick={() => navigate('resources')}>
              <div style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            background: '#F4E4DC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
                <FileText size={15} color="#C1440E" strokeWidth={1.6} />
              </div>
              <div style={{
            flex: 1,
            minWidth: 0
          }}>
                <div style={{
              fontSize: 13,
              fontWeight: 600,
              color: '#1E1A16',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>{r.name}</div>
                <div style={{
              fontSize: 12,
              color: '#6B6259'
            }}>{r.cls} · {r.added}</div>
              </div>
              <ExternalLink size={13} color="#B5A99C" />
            </div>)}
        </div>

        {/* Quick access */}
        <div className="card" style={{
        padding: '18px'
      }}>
          <div style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700,
          fontSize: 15,
          color: '#1E1A16',
          marginBottom: 14
        }}>Quick access</div>
          <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8
        }}>
            {quickAccess.map(a => <button key={a.label} onClick={() => navigate(a.screen)} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '11px 14px',
            borderRadius: 9,
            border: `1px solid ${a.bg}`,
            background: a.bg,
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'border-color 0.12s'
          }} onMouseEnter={e => e.currentTarget.style.borderColor = a.color} onMouseLeave={e => e.currentTarget.style.borderColor = a.bg}>
                <div style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
                  <a.Icon size={15} color={a.color} strokeWidth={1.8} />
                </div>
                <div style={{
              flex: 1
            }}>
                  <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontSize: 13,
                color: '#1E1A16'
              }}>{a.label}</div>
                  <div style={{
                fontSize: 11,
                color: '#6B6259'
              }}>{a.sub}</div>
                </div>
                <ArrowRight size={13} color={a.color} />
              </button>)}
          </div>
        </div>
      </div>
    </div>;
}