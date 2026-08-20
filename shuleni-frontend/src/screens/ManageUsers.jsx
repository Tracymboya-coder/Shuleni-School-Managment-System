import { useState } from 'react';
import { Search, Upload, Plus } from 'lucide-react';
const students = [{
  name: 'Brian Otieno',
  class: 'Form 3 East',
  admission: 'MKN/2022/0147',
  status: 'Active',
  attendance: 94
}, {
  name: 'Aisha Muthoni',
  class: 'Form 1 South',
  admission: 'MKN/2024/0312',
  status: 'Active',
  attendance: 88
}, {
  name: 'Kevin Wafula',
  class: 'Form 4 West',
  admission: 'MKN/2021/0089',
  status: 'Active',
  attendance: 97
}, {
  name: 'Fatuma Hassan',
  class: 'Form 2 North',
  admission: 'MKN/2023/0204',
  status: 'Active',
  attendance: 91
}, {
  name: 'Daniel Kiprop',
  class: 'Form 3 East',
  admission: 'MKN/2022/0158',
  status: 'Inactive',
  attendance: 61
}, {
  name: 'Mercy Chebet',
  class: 'Form 4 West',
  admission: 'MKN/2021/0103',
  status: 'Active',
  attendance: 99
}, {
  name: 'James Njoroge',
  class: 'Form 2 North',
  admission: 'MKN/2023/0211',
  status: 'Active',
  attendance: 85
}];
const educators = [{
  name: 'Ms. Grace Njeri',
  subject: 'Biology, Chemistry',
  classes: 'Form 3 East, Form 2',
  email: 'g.njeri@makini.ac.ke',
  status: 'Active'
}, {
  name: 'Mr. Peter Kimani',
  subject: 'Mathematics',
  classes: 'Form 4 West, Form 3',
  email: 'p.kimani@makini.ac.ke',
  status: 'Active'
}, {
  name: 'Mr. John Ochieng',
  subject: 'English, Literature',
  classes: 'Form 4 West',
  email: 'j.ochieng@makini.ac.ke',
  status: 'Active'
}, {
  name: 'Ms. Sarah Wanjiru',
  subject: 'Kiswahili, CRE',
  classes: 'Form 1 South',
  email: 's.wanjiru@makini.ac.ke',
  status: 'Pending'
}];
export default function ManageUsers() {
  const [tab, setTab] = useState('students');
  const [showInvite, setShowInvite] = useState(false);
  const [search, setSearch] = useState('');
  const filteredStudents = students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.class.toLowerCase().includes(search.toLowerCase()));
  const filteredEducators = educators.filter(e => e.name.toLowerCase().includes(search.toLowerCase()));
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
        }}>People</h1>
          <p style={{
          fontSize: 14,
          color: '#6B6259'
        }}>847 students · 52 educators · Makini Academy</p>
        </div>
        <div style={{
        display: 'flex',
        gap: 10
      }}>
          <button className="btn-ghost" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }}>
            <Upload size={13} strokeWidth={2} /> Bulk import CSV
          </button>
          <button className="btn-primary" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }} onClick={() => setShowInvite(true)}>
            <Plus size={14} strokeWidth={2.5} /> {tab === 'students' ? 'Add student' : 'Invite educator'}
          </button>
        </div>
      </div>

      <div style={{
      display: 'flex',
      gap: 4,
      background: '#F0EAE0',
      borderRadius: 10,
      padding: 4,
      marginBottom: 20,
      width: 'fit-content'
    }}>
        <button className={`tab-btn ${tab === 'students' ? 'active' : ''}`} onClick={() => setTab('students')}>Students (847)</button>
        <button className={`tab-btn ${tab === 'educators' ? 'active' : ''}`} onClick={() => setTab('educators')}>Educators (52)</button>
      </div>

      <div style={{
      display: 'flex',
      gap: 10,
      marginBottom: 16
    }}>
        <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: '#fff',
        border: '1.5px solid #E4DDD4',
        borderRadius: 8,
        padding: '9px 14px',
        flex: 1,
        maxWidth: 360
      }}>
          <Search size={14} color="#B5A99C" strokeWidth={1.8} />
          <input placeholder={tab === 'students' ? 'Search students…' : 'Search educators…'} style={{
          border: 'none',
          outline: 'none',
          fontSize: 13,
          color: '#1E1A16',
          background: 'transparent',
          width: '100%'
        }} value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="input-field" style={{
        width: 160
      }}>
          <option>All classes</option>
          <option>Form 1 South</option>
          <option>Form 2 North</option>
          <option>Form 3 East</option>
          <option>Form 4 West</option>
        </select>
        <select className="input-field" style={{
        width: 130
      }}>
          <option>All status</option>
          <option>Active</option>
          <option>Inactive</option>
          <option>Pending</option>
        </select>
      </div>

      <div className="card" style={{
      overflow: 'hidden'
    }}>
        {tab === 'students' ? <>
            <div className="table-row" style={{
          gridTemplateColumns: '2fr 1.5fr 1.5fr 1fr 1fr 80px',
          background: '#FAF7F0'
        }}>
              {['Student', 'Class', 'Admission No.', 'Attendance', 'Status', ''].map(h => <span key={h} style={{
            fontSize: 11,
            fontWeight: 700,
            color: '#B5A99C',
            textTransform: 'uppercase',
            letterSpacing: '0.06em'
          }}>{h}</span>)}
            </div>
            {filteredStudents.map((s, i) => <div key={i} className="table-row" style={{
          gridTemplateColumns: '2fr 1.5fr 1.5fr 1fr 1fr 80px',
          cursor: 'pointer'
        }}>
                <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10
          }}>
                  <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: '#F4E4DC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
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
            color: '#6B6259'
          }}>{s.class}</span>
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
                <span><span className={s.status === 'Active' ? 'badge-green' : 'badge-gray'}>{s.status}</span></span>
                <span><button className="btn-ghost" style={{
              padding: '4px 10px',
              fontSize: 12
            }}>Edit</button></span>
              </div>)}
          </> : <>
            <div className="table-row" style={{
          gridTemplateColumns: '2fr 2fr 2fr 1fr 80px',
          background: '#FAF7F0'
        }}>
              {['Educator', 'Subject(s)', 'Classes', 'Status', ''].map(h => <span key={h} style={{
            fontSize: 11,
            fontWeight: 700,
            color: '#B5A99C',
            textTransform: 'uppercase',
            letterSpacing: '0.06em'
          }}>{h}</span>)}
            </div>
            {filteredEducators.map((e, i) => <div key={i} className="table-row" style={{
          gridTemplateColumns: '2fr 2fr 2fr 1fr 80px',
          cursor: 'pointer'
        }}>
                <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10
          }}>
                  <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: '#D4EDE2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 700,
              color: '#2D6A4F',
              flexShrink: 0
            }}>
                    {e.name.split(' ').filter(n => n.length > 1).map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <div style={{
                fontSize: 14,
                fontWeight: 600,
                color: '#1E1A16'
              }}>{e.name}</div>
                    <div style={{
                fontSize: 12,
                color: '#B5A99C'
              }}>{e.email}</div>
                  </div>
                </div>
                <span style={{
            fontSize: 13,
            color: '#6B6259'
          }}>{e.subject}</span>
                <span style={{
            fontSize: 13,
            color: '#6B6259'
          }}>{e.classes}</span>
                <span><span className={e.status === 'Active' ? 'badge-green' : 'badge-gold'}>{e.status}</span></span>
                <span><button className="btn-ghost" style={{
              padding: '4px 10px',
              fontSize: 12
            }}>Edit</button></span>
              </div>)}
          </>}
      </div>

      {showInvite && <div style={{
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
        width: 460,
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
          }}>
                {tab === 'students' ? 'Add student' : 'Invite educator'}
              </h2>
              <button onClick={() => setShowInvite(false)} style={{
            background: 'none',
            border: 'none',
            fontSize: 20,
            cursor: 'pointer',
            color: '#6B6259',
            lineHeight: 1
          }}>×</button>
            </div>
            {tab === 'educators' && <div style={{
          background: '#D4EDE2',
          borderRadius: 8,
          padding: '10px 14px',
          fontSize: 13,
          color: '#1A4A35',
          marginBottom: 20
        }}>
                An invite email will be sent. They can set their own password.
              </div>}
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
            }}>Full name</label>
                <input className="input-field" placeholder="e.g. Aisha Muthoni" />
              </div>
              <div>
                <label style={{
              display: 'block',
              fontSize: 13,
              fontWeight: 600,
              color: '#3D3730',
              marginBottom: 6
            }}>Email address</label>
                <input className="input-field" type="email" placeholder="student@example.com" />
              </div>
              {tab === 'students' && <>
                  <div>
                    <label style={{
                display: 'block',
                fontSize: 13,
                fontWeight: 600,
                color: '#3D3730',
                marginBottom: 6
              }}>Admission number</label>
                    <input className="input-field" placeholder="MKN/2025/0001" />
                  </div>
                  <div>
                    <label style={{
                display: 'block',
                fontSize: 13,
                fontWeight: 600,
                color: '#3D3730',
                marginBottom: 6
              }}>Assign to class</label>
                    <select className="input-field">
                      <option>Form 1 South</option>
                      <option>Form 2 North</option>
                      <option>Form 3 East</option>
                      <option>Form 4 West</option>
                    </select>
                  </div>
                </>}
              {tab === 'educators' && <div>
                  <label style={{
              display: 'block',
              fontSize: 13,
              fontWeight: 600,
              color: '#3D3730',
              marginBottom: 6
            }}>Subjects</label>
                  <input className="input-field" placeholder="e.g. Mathematics, Physics" />
                </div>}
            </div>
            <div style={{
          display: 'flex',
          gap: 10,
          marginTop: 24
        }}>
              <button className="btn-ghost" style={{
            flex: 1
          }} onClick={() => setShowInvite(false)}>Cancel</button>
              <button className="btn-primary" style={{
            flex: 2
          }} onClick={() => setShowInvite(false)}>
                {tab === 'students' ? 'Add student' : 'Send invite'}
              </button>
            </div>
          </div>
        </div>}
    </div>;
}