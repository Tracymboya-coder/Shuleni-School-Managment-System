import { useState } from 'react';
const classes = [{
  name: 'Form 4 West',
  stream: 'Sciences',
  educator: 'Mr. Peter Kimani',
  students: 42,
  subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'],
  attendance: 97,
  nextLesson: 'Mathematics · Today 9:00 AM'
}, {
  name: 'Form 3 East',
  stream: 'Sciences',
  educator: 'Ms. Grace Njeri',
  students: 47,
  subjects: ['Biology', 'Chemistry', 'Mathematics', 'English', 'Kiswahili'],
  attendance: 94,
  nextLesson: 'Biology · Today 11:00 AM'
}, {
  name: 'Form 2 North',
  stream: 'Arts',
  educator: 'Mr. John Ochieng',
  students: 39,
  subjects: ['English', 'Literature', 'History', 'Geography', 'CRE'],
  attendance: 91,
  nextLesson: 'English · Tomorrow 8:00 AM'
}, {
  name: 'Form 1 South',
  stream: 'General',
  educator: 'Ms. Sarah Wanjiru',
  students: 45,
  subjects: ['Mathematics', 'English', 'Kiswahili', 'Biology', 'Geography'],
  attendance: 88,
  nextLesson: 'Mathematics · Tomorrow 10:00 AM'
}];
export default function Classes() {
  const [showCreate, setShowCreate] = useState(false);
  const [selected, setSelected] = useState(null);
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
        }}>Classes</h1>
          <p style={{
          fontSize: 14,
          color: '#6B6259'
        }}>24 active classes · 4 streams</p>
        </div>
        <button className="btn-primary" onClick={() => setShowCreate(true)}>+ Create class</button>
      </div>

      <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 16
    }}>
        {classes.map((c, i) => <div key={i} className="card" style={{
        padding: '22px',
        cursor: 'pointer',
        transition: 'transform 0.15s, box-shadow 0.15s'
      }} onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(30,26,22,0.1)';
      }} onMouseLeave={e => {
        e.currentTarget.style.transform = '';
        e.currentTarget.style.boxShadow = '';
      }} onClick={() => setSelected(c)}>
            <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 14
        }}>
              <div>
                <div style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: 18,
              color: '#1E1A16',
              marginBottom: 2
            }}>{c.name}</div>
                <div style={{
              fontSize: 13,
              color: '#6B6259'
            }}>{c.stream} stream</div>
              </div>
              <span className="badge-green">{c.students} students</span>
            </div>

            <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 14
        }}>
              <div style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: '#D4EDE2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 11,
            fontWeight: 700,
            color: '#2D6A4F'
          }}>
                {c.educator.split(' ').filter(n => n.length > 1).map(n => n[0]).join('').slice(0, 2)}
              </div>
              <span style={{
            fontSize: 13,
            color: '#3D3730'
          }}>{c.educator}</span>
            </div>

            <div style={{
          display: 'flex',
          gap: 6,
          flexWrap: 'wrap',
          marginBottom: 14
        }}>
              {c.subjects.map(s => <span key={s} style={{
            background: '#F0EAE0',
            color: '#3D3730',
            fontSize: 11,
            fontWeight: 600,
            padding: '3px 9px',
            borderRadius: 20
          }}>{s}</span>)}
            </div>

            <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 14,
          borderTop: '1px solid #F0EAE0'
        }}>
              <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}>
                <span style={{
              fontSize: 12,
              color: '#6B6259'
            }}>Attendance</span>
                <div style={{
              height: 5,
              width: 60,
              background: '#F0EAE0',
              borderRadius: 3
            }}>
                  <div style={{
                height: '100%',
                width: `${c.attendance}%`,
                background: c.attendance >= 93 ? '#2D6A4F' : '#D4922A',
                borderRadius: 3
              }} />
                </div>
                <span style={{
              fontSize: 13,
              fontWeight: 600,
              color: c.attendance >= 93 ? '#1A4A35' : '#9A6A18'
            }}>{c.attendance}%</span>
              </div>
              <span style={{
            fontSize: 12,
            color: '#B5A99C'
          }}>{c.nextLesson}</span>
            </div>
          </div>)}
      </div>

      {/* Class detail modal */}
      {selected && <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(30,26,22,0.5)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(4px)'
    }}>
          <div className="card" style={{
        width: 520,
        maxHeight: '80vh',
        overflow: 'auto',
        padding: '32px',
        animation: 'fadeIn 0.2s ease'
      }}>
            <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20
        }}>
              <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 22,
            color: '#1E1A16'
          }}>{selected.name}</h2>
              <button onClick={() => setSelected(null)} style={{
            background: 'none',
            border: 'none',
            fontSize: 22,
            cursor: 'pointer',
            color: '#6B6259',
            lineHeight: 1
          }}>×</button>
            </div>

            <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
          marginBottom: 24
        }}>
              {[{
            label: 'Class teacher',
            value: selected.educator
          }, {
            label: 'Stream',
            value: selected.stream
          }, {
            label: 'Students',
            value: selected.students
          }, {
            label: 'Attendance',
            value: `${selected.attendance}%`
          }].map(s => <div key={s.label} style={{
            background: '#FAF7F0',
            borderRadius: 8,
            padding: '12px 14px'
          }}>
                  <div style={{
              fontSize: 11,
              color: '#B5A99C',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: 4
            }}>{s.label}</div>
                  <div style={{
              fontSize: 16,
              fontWeight: 700,
              color: '#1E1A16'
            }}>{s.value}</div>
                </div>)}
            </div>

            <div style={{
          marginBottom: 20
        }}>
              <div style={{
            fontSize: 13,
            fontWeight: 600,
            color: '#3D3730',
            marginBottom: 10
          }}>Subjects</div>
              <div style={{
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap'
          }}>
                {selected.subjects.map(s => <span key={s} style={{
              background: '#F4E4DC',
              color: '#8E3008',
              fontSize: 13,
              fontWeight: 600,
              padding: '5px 12px',
              borderRadius: 20
            }}>{s}</span>)}
              </div>
            </div>

            <div style={{
          display: 'flex',
          gap: 10
        }}>
              <button className="btn-ghost" style={{
            flex: 1
          }}>Manage students</button>
              <button className="btn-primary" style={{
            flex: 1
          }}>Edit class</button>
            </div>
          </div>
        </div>}

      {/* Create class modal */}
      {showCreate && <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(30,26,22,0.5)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(4px)'
    }}>
          <div className="card" style={{
        width: 480,
        padding: '32px',
        animation: 'fadeIn 0.2s ease'
      }}>
            <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24
        }}>
              <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 20,
            color: '#1E1A16'
          }}>Create class</h2>
              <button onClick={() => setShowCreate(false)} style={{
            background: 'none',
            border: 'none',
            fontSize: 20,
            cursor: 'pointer',
            color: '#6B6259',
            lineHeight: 1
          }}>×</button>
            </div>
            <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16
        }}>
              <div>
                <label style={{
              display: 'block',
              fontSize: 13,
              fontWeight: 600,
              color: '#3D3730',
              marginBottom: 6
            }}>Class name</label>
                <input className="input-field" placeholder="e.g. Form 1 East" />
              </div>
              <div>
                <label style={{
              display: 'block',
              fontSize: 13,
              fontWeight: 600,
              color: '#3D3730',
              marginBottom: 6
            }}>Stream / specialisation</label>
                <select className="input-field">
                  <option>General</option>
                  <option>Sciences</option>
                  <option>Arts</option>
                  <option>Technical</option>
                </select>
              </div>
              <div>
                <label style={{
              display: 'block',
              fontSize: 13,
              fontWeight: 600,
              color: '#3D3730',
              marginBottom: 6
            }}>Class teacher</label>
                <select className="input-field">
                  <option>Ms. Grace Njeri</option>
                  <option>Mr. Peter Kimani</option>
                  <option>Mr. John Ochieng</option>
                  <option>Ms. Sarah Wanjiru</option>
                </select>
              </div>
              <div>
                <label style={{
              display: 'block',
              fontSize: 13,
              fontWeight: 600,
              color: '#3D3730',
              marginBottom: 6
            }}>Subjects (comma-separated)</label>
                <input className="input-field" placeholder="e.g. Mathematics, Physics, Chemistry" />
              </div>
            </div>
            <div style={{
          display: 'flex',
          gap: 10,
          marginTop: 24
        }}>
              <button className="btn-ghost" style={{
            flex: 1
          }} onClick={() => setShowCreate(false)}>Cancel</button>
              <button className="btn-primary" style={{
            flex: 2
          }} onClick={() => setShowCreate(false)}>Create class</button>
            </div>
          </div>
        </div>}
    </div>;
}