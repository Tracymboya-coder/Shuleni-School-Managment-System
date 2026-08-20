import { useState } from 'react';
import { LayoutDashboard, Users, FolderOpen, ClipboardCheck, FileText, MessageSquare, ArrowLeft, PlayCircle, PenLine } from 'lucide-react';
const students = [{
  name: 'Aisha Muthoni',
  admission: 'MKN/2022/0147',
  attendance: 94,
  lastActive: 'Today'
}, {
  name: 'Brian Otieno',
  admission: 'MKN/2022/0158',
  attendance: 88,
  lastActive: 'Today'
}, {
  name: 'Caroline Wanjiku',
  admission: 'MKN/2022/0162',
  attendance: 97,
  lastActive: 'Yesterday'
}, {
  name: 'David Mwangi',
  admission: 'MKN/2022/0175',
  attendance: 79,
  lastActive: '3 days ago'
}, {
  name: 'Elizabeth Chebet',
  admission: 'MKN/2022/0188',
  attendance: 100,
  lastActive: 'Today'
}, {
  name: 'Felix Odhiambo',
  admission: 'MKN/2022/0201',
  attendance: 85,
  lastActive: 'Today'
}];
const resources = [{
  name: 'Biology Revision Notes Ch.5-8.pdf',
  type: 'pdf',
  added: 'Jan 18',
  by: 'Ms. Njeri'
}, {
  name: 'Cell Division Explained (Video)',
  type: 'video',
  added: 'Jan 14',
  by: 'Ms. Njeri'
}, {
  name: 'Chemistry Past Papers 2020-2024',
  type: 'pdf',
  added: 'Jan 16',
  by: 'Ms. Njeri'
}];
const exams = [{
  name: 'Biology CAT 2',
  date: 'Wed 22 Jan',
  status: 'Scheduled',
  submitted: 0,
  total: 47
}, {
  name: 'Biology CAT 1',
  date: 'Dec 5',
  status: 'Graded',
  submitted: 44,
  total: 47
}, {
  name: 'Chemistry Practical',
  date: 'Nov 28',
  status: 'Graded',
  submitted: 47,
  total: 47
}];
const attendanceHistory = [{
  date: 'Mon 20 Jan',
  present: 45,
  absent: 1,
  late: 1,
  rate: '95.7%',
  signed: 'Ms. Njeri'
}, {
  date: 'Fri 17 Jan',
  present: 43,
  absent: 3,
  late: 1,
  rate: '91.5%',
  signed: 'Ms. Njeri'
}, {
  date: 'Thu 16 Jan',
  present: 46,
  absent: 1,
  late: 0,
  rate: '97.9%',
  signed: 'Ms. Njeri'
}];
const tabList = [{
  id: 'overview',
  label: 'Overview',
  Icon: LayoutDashboard
}, {
  id: 'students',
  label: 'Students',
  Icon: Users
}, {
  id: 'resources',
  label: 'Resources',
  Icon: FolderOpen
}, {
  id: 'attendance',
  label: 'Attendance',
  Icon: ClipboardCheck
}, {
  id: 'exams',
  label: 'Exams',
  Icon: FileText
}, {
  id: 'chat',
  label: 'Chat',
  Icon: MessageSquare
}];
const quickNavigate = [{
  label: 'Take attendance',
  screen: 'attendance',
  Icon: ClipboardCheck,
  color: '#2D6A4F',
  bg: '#D4EDE2'
}, {
  label: 'Resources',
  screen: 'resources',
  Icon: FolderOpen,
  color: '#D4922A',
  bg: '#FBF0D8'
}, {
  label: 'Create exam',
  screen: 'exam-builder',
  Icon: FileText,
  color: '#C1440E',
  bg: '#F4E4DC'
}, {
  label: 'Class chat',
  screen: 'class-chat',
  Icon: MessageSquare,
  color: '#6B2D8E',
  bg: '#EDD4F0'
}];
export default function ClassDetail({
  navigate
}) {
  const [tab, setTab] = useState('overview');
  return <div style={{
    padding: '28px 32px',
    maxWidth: 1100,
    margin: '0 auto'
  }}>
      <div style={{
      marginBottom: 20
    }}>
        <button style={{
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        color: '#C1440E',
        fontSize: 13,
        fontWeight: 500,
        padding: 0,
        marginBottom: 10
      }} onClick={() => navigate('classes')}>
          <ArrowLeft size={14} strokeWidth={2} /> Classes
        </button>
        <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      }}>
          <div>
            <h1 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: 26,
            color: '#1E1A16',
            marginBottom: 4
          }}>Form 3 East</h1>
            <div style={{
            display: 'flex',
            gap: 12,
            alignItems: 'center'
          }}>
              <span style={{
              fontSize: 14,
              color: '#6B6259'
            }}>Sciences stream</span>
              <span style={{
              color: '#E4DDD4'
            }}>·</span>
              <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 14,
              color: '#6B6259'
            }}>
                <div style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: '#D4EDE2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 10,
                fontWeight: 700,
                color: '#2D6A4F'
              }}>GN</div>
                Ms. Grace Njeri
              </div>
              <span style={{
              color: '#E4DDD4'
            }}>·</span>
              <span style={{
              fontSize: 14,
              color: '#6B6259'
            }}>47 students</span>
            </div>
          </div>
          <div style={{
          display: 'flex',
          gap: 8
        }}>
            <button className="btn-ghost" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }} onClick={() => navigate('attendance')}>
              <ClipboardCheck size={13} strokeWidth={1.8} /> Take attendance
            </button>
            <button className="btn-primary" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }} onClick={() => navigate('exam-builder')}>
              <FileText size={13} strokeWidth={1.8} /> Create exam
            </button>
          </div>
        </div>
      </div>

      <div style={{
      display: 'flex',
      gap: 2,
      borderBottom: '2px solid #E4DDD4',
      marginBottom: 24
    }}>
        {tabList.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '10px 16px',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        fontFamily: "'Inter', sans-serif",
        fontSize: 14,
        fontWeight: tab === t.id ? 600 : 400,
        color: tab === t.id ? '#C1440E' : '#6B6259',
        borderBottom: tab === t.id ? '2px solid #C1440E' : '2px solid transparent',
        marginBottom: -2,
        transition: 'color 0.15s'
      }}>
            <t.Icon size={13} strokeWidth={1.8} />
            {t.label}
          </button>)}
      </div>

      {tab === 'overview' && <div>
          <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 14,
        marginBottom: 20
      }}>
            {[{
          label: 'Students',
          value: '47',
          color: '#C1440E',
          bg: '#F4E4DC'
        }, {
          label: 'Avg attendance',
          value: '94%',
          color: '#2D6A4F',
          bg: '#D4EDE2'
        }, {
          label: 'Resources',
          value: '12',
          color: '#D4922A',
          bg: '#FBF0D8'
        }, {
          label: 'Exams this term',
          value: '3',
          color: '#1A3A5C',
          bg: '#D4E4F0'
        }].map(s => <div key={s.label} className="stat-card">
                <div style={{
            fontSize: 11,
            fontWeight: 700,
            color: '#B5A99C',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: 8
          }}>{s.label}</div>
                <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: 28,
            color: s.color
          }}>{s.value}</div>
              </div>)}
          </div>
          <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16
      }}>
            <div className="card" style={{
          padding: '20px'
        }}>
              <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 15,
            color: '#1E1A16',
            marginBottom: 14
          }}>Subjects</div>
              <div style={{
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap'
          }}>
                {['Biology', 'Chemistry', 'Mathematics', 'English', 'Kiswahili', 'CRE'].map(s => <span key={s} style={{
              background: '#F4E4DC',
              color: '#8E3008',
              fontSize: 13,
              fontWeight: 600,
              padding: '5px 12px',
              borderRadius: 20
            }}>{s}</span>)}
              </div>
            </div>
            <div className="card" style={{
          padding: '20px'
        }}>
              <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 15,
            color: '#1E1A16',
            marginBottom: 14
          }}>Quick navigate</div>
              <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 8
          }}>
                {quickNavigate.map(a => <button key={a.label} onClick={() => navigate(a.screen)} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 12px',
              borderRadius: 8,
              border: `1px solid ${a.bg}`,
              background: a.bg,
              cursor: 'pointer',
              textAlign: 'left',
              fontSize: 12,
              fontWeight: 600,
              color: '#1E1A16',
              transition: 'border-color 0.12s'
            }} onMouseEnter={e => e.currentTarget.style.borderColor = a.color} onMouseLeave={e => e.currentTarget.style.borderColor = a.bg}>
                    <a.Icon size={14} color={a.color} strokeWidth={1.8} />
                    {a.label}
                  </button>)}
              </div>
            </div>
          </div>
        </div>}

      {tab === 'students' && <div className="card" style={{
      overflow: 'hidden'
    }}>
          <div className="table-row" style={{
        gridTemplateColumns: '2fr 1.5fr 1fr 1fr 80px',
        background: '#FAF7F0'
      }}>
            {['Student', 'Admission No.', 'Attendance', 'Last active', ''].map(h => <span key={h} style={{
          fontSize: 11,
          fontWeight: 700,
          color: '#B5A99C',
          textTransform: 'uppercase',
          letterSpacing: '0.06em'
        }}>{h}</span>)}
          </div>
          {students.map((s, i) => <div key={i} className="table-row" style={{
        gridTemplateColumns: '2fr 1.5fr 1fr 1fr 80px',
        cursor: 'pointer'
      }}>
              <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10
        }}>
                <div style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: '#F4E4DC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 11,
            fontWeight: 700,
            color: '#C1440E',
            flexShrink: 0
          }}>
                  {s.name.split(' ').map(n => n[0]).join('')}
                </div>
                <span style={{
            fontSize: 14,
            fontWeight: 600,
            color: '#1E1A16'
          }}>{s.name}</span>
              </div>
              <span style={{
          fontSize: 13,
          color: '#6B6259',
          fontFamily: 'monospace'
        }}>{s.admission}</span>
              <span style={{
          fontSize: 13,
          fontWeight: 600,
          color: s.attendance >= 90 ? '#1A4A35' : s.attendance >= 75 ? '#9A6A18' : '#8E3008'
        }}>{s.attendance}%</span>
              <span style={{
          fontSize: 13,
          color: '#6B6259'
        }}>{s.lastActive}</span>
              <button className="btn-ghost" style={{
          padding: '4px 10px',
          fontSize: 12
        }}>View</button>
            </div>)}
        </div>}

      {tab === 'resources' && <div>
          <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: 14
      }}>
            <button className="btn-primary" onClick={() => navigate('resources')}>+ Upload resource</button>
          </div>
          <div className="card" style={{
        overflow: 'hidden'
      }}>
            {resources.map((r, i) => <div key={i} style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '14px 20px',
          borderBottom: i < resources.length - 1 ? '1px solid #F0EAE0' : 'none',
          cursor: 'pointer'
        }}>
                <div style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: r.type === 'video' ? '#EDD4F0' : '#F4E4DC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
                  {r.type === 'video' ? <PlayCircle size={17} color="#6B2D8E" strokeWidth={1.6} /> : <FileText size={17} color="#C1440E" strokeWidth={1.6} />}
                </div>
                <div style={{
            flex: 1
          }}>
                  <div style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#1E1A16'
            }}>{r.name}</div>
                  <div style={{
              fontSize: 12,
              color: '#B5A99C'
            }}>Added {r.added} by {r.by}</div>
                </div>
                <button className="btn-ghost" style={{
            padding: '5px 12px',
            fontSize: 12
          }}>Open</button>
              </div>)}
          </div>
        </div>}

      {tab === 'attendance' && <div>
          <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: 14
      }}>
            <button className="btn-primary" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }} onClick={() => navigate('attendance')}>
              <ClipboardCheck size={13} strokeWidth={1.8} /> Take today's attendance
            </button>
          </div>
          <div className="card" style={{
        overflow: 'hidden'
      }}>
            <div className="table-row" style={{
          gridTemplateColumns: '2fr 1fr 1fr 1fr 1.5fr 1fr',
          background: '#FAF7F0'
        }}>
              {['Date', 'Present', 'Absent', 'Late', 'Signed by', 'Rate'].map(h => <span key={h} style={{
            fontSize: 11,
            fontWeight: 700,
            color: '#B5A99C',
            textTransform: 'uppercase',
            letterSpacing: '0.06em'
          }}>{h}</span>)}
            </div>
            {attendanceHistory.map((a, i) => <div key={i} className="table-row" style={{
          gridTemplateColumns: '2fr 1fr 1fr 1fr 1.5fr 1fr'
        }}>
                <span style={{
            fontSize: 14,
            fontWeight: 600,
            color: '#1E1A16'
          }}>{a.date}</span>
                <span style={{
            fontSize: 14,
            color: '#2D6A4F',
            fontWeight: 600
          }}>{a.present}</span>
                <span style={{
            fontSize: 14,
            color: '#C1440E',
            fontWeight: 600
          }}>{a.absent}</span>
                <span style={{
            fontSize: 14,
            color: '#D4922A',
            fontWeight: 600
          }}>{a.late}</span>
                <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}>
                  <PenLine size={12} color="#B5A99C" strokeWidth={1.6} />
                  <span style={{
              fontSize: 13,
              color: '#6B6259'
            }}>{a.signed}</span>
                </div>
                <span className="badge-green">{a.rate}</span>
              </div>)}
          </div>
        </div>}

      {tab === 'exams' && <div>
          <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: 14
      }}>
            <button className="btn-primary" onClick={() => navigate('exam-builder')}>+ Create exam</button>
          </div>
          <div className="card" style={{
        overflow: 'hidden'
      }}>
            {exams.map((e, i) => <div key={i} style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '14px 20px',
          borderBottom: i < exams.length - 1 ? '1px solid #F0EAE0' : 'none',
          cursor: 'pointer'
        }}>
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
            }}>{e.date} · {e.submitted}/{e.total} submitted</div>
                </div>
                <div style={{
            display: 'flex',
            gap: 10,
            alignItems: 'center'
          }}>
                  <span className={e.status === 'Graded' ? 'badge-green' : 'badge-gold'}>{e.status}</span>
                  <button className="btn-ghost" style={{
              padding: '5px 12px',
              fontSize: 12
            }} onClick={() => navigate('exam-builder')}>
                    {e.status === 'Graded' ? 'Results' : 'Edit'}
                  </button>
                </div>
              </div>)}
          </div>
        </div>}

      {tab === 'chat' && <div style={{
      textAlign: 'center',
      padding: '40px'
    }}>
          <div style={{
        width: 64,
        height: 64,
        borderRadius: '50%',
        background: '#EDD4F0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 16px'
      }}>
            <MessageSquare size={28} color="#6B2D8E" strokeWidth={1.6} />
          </div>
          <div style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 700,
        fontSize: 18,
        color: '#1E1A16',
        marginBottom: 8
      }}>Form 3 East chat</div>
          <p style={{
        fontSize: 14,
        color: '#6B6259',
        marginBottom: 24
      }}>Open the full class chat to send messages and share files.</p>
          <button className="btn-primary" onClick={() => navigate('class-chat')}>Open class chat</button>
        </div>}
    </div>;
}