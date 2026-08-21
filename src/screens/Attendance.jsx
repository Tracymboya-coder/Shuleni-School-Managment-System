import { useState } from 'react';
import { CheckCircle2, ClipboardList, PenLine, ArrowRight, ArrowLeft } from 'lucide-react';
const roster = ['Aisha Muthoni', 'Brian Otieno', 'Caroline Wanjiku', 'David Mwangi', 'Elizabeth Chebet', 'Felix Odhiambo', 'Grace Kamau', 'Hassan Abdi', 'Irene Njeri', 'James Kiplagat', 'Kendi Wambua', 'Lawrence Mutua', 'Mary Achieng', 'Nathan Kimani', 'Olivia Wafula', 'Peter Ochieng', 'Queen Adhiambo', 'Robert Gitonga', 'Sophia Muthee', 'Timothy Baraza'];
const history = [{
  date: 'Fri 17 Jan',
  present: 19,
  absent: 1,
  late: 0,
  rate: '95.0%',
  signed: 'Ms. Grace Njeri',
  signedAt: '9:04 AM'
}, {
  date: 'Thu 16 Jan',
  present: 18,
  absent: 1,
  late: 1,
  rate: '90.0%',
  signed: 'Ms. Grace Njeri',
  signedAt: '9:02 AM'
}, {
  date: 'Wed 15 Jan',
  present: 20,
  absent: 0,
  late: 0,
  rate: '100%',
  signed: 'Ms. Grace Njeri',
  signedAt: '9:01 AM'
}, {
  date: 'Tue 14 Jan',
  present: 19,
  absent: 0,
  late: 1,
  rate: '95.0%',
  signed: 'Ms. Grace Njeri',
  signedAt: '9:03 AM'
}];
export default function Attendance() {
  const [tab, setTab] = useState('roll-call');
  const [phase, setPhase] = useState('roll-call');
  const [attendance, setAttendance] = useState({});
  const [selectedDate, setSelectedDate] = useState('2025-01-20');
  const [selectedClass, setSelectedClass] = useState('Form 3 East');
  const [note, setNote] = useState('');
  const setStatus = (name, status) => {
    setAttendance(prev => ({
      ...prev,
      [name]: prev[name] === status ? null : status
    }));
  };
  const summary = {
    present: roster.filter(n => attendance[n] === 'present').length,
    absent: roster.filter(n => attendance[n] === 'absent').length,
    late: roster.filter(n => attendance[n] === 'late').length,
    unmarked: roster.filter(n => !attendance[n]).length
  };
  const handleProceedToReview = () => {
    if (summary.unmarked > 0) {
      const all = {
        ...attendance
      };
      roster.filter(n => !attendance[n]).forEach(n => {
        all[n] = 'absent';
      });
      setAttendance(all);
    }
    setPhase('review');
  };
  return <div style={{
    padding: '28px 32px',
    maxWidth: 900,
    margin: '0 auto'
  }}>
      <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 22
    }}>
        <div>
          <h1 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          fontSize: 26,
          color: '#1E1A16',
          marginBottom: 4
        }}>Attendance</h1>
          <p style={{
          fontSize: 14,
          color: '#6B6259'
        }}>Ms. Grace Njeri · Makini Academy</p>
        </div>
        <div style={{
        display: 'flex',
        gap: 10
      }}>
          <select className="input-field" style={{
          width: 170
        }} value={selectedClass} onChange={e => setSelectedClass(e.target.value)}>
            <option>Form 3 East</option>
            <option>Form 2 North</option>
            <option>Form 4 West</option>
            <option>Form 1 South</option>
          </select>
          <input className="input-field" type="date" style={{
          width: 160
        }} value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
        </div>
      </div>

      <div style={{
      display: 'flex',
      gap: 4,
      background: '#F0EAE0',
      borderRadius: 10,
      padding: 4,
      width: 'fit-content',
      marginBottom: 24
    }}>
        <button className={`tab-btn ${tab === 'roll-call' ? 'active' : ''}`} onClick={() => {
        setTab('roll-call');
        setPhase('roll-call');
      }}>Roll call</button>
        <button className={`tab-btn ${tab === 'history' ? 'active' : ''}`} onClick={() => setTab('history')}>History</button>
      </div>

      {tab === 'roll-call' && phase === 'roll-call' && <>
          <div style={{
        display: 'flex',
        gap: 8,
        marginBottom: 18,
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
            {[{
          label: 'Present',
          color: '#2D6A4F',
          bg: '#D4EDE2'
        }, {
          label: 'Absent',
          color: '#8E3008',
          bg: '#F4E4DC'
        }, {
          label: 'Late',
          color: '#9A6A18',
          bg: '#FBF0D8'
        }].map(s => <div key={s.label} style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '4px 12px',
          borderRadius: 20,
          background: s.bg
        }}>
                <span style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: s.color,
            display: 'inline-block'
          }} />
                <span style={{
            fontSize: 12,
            fontWeight: 600,
            color: s.color
          }}>{s.label}</span>
              </div>)}
            <div style={{
          marginLeft: 'auto',
          display: 'flex',
          gap: 16
        }}>
              <span style={{
            fontSize: 13,
            color: '#B5A99C'
          }}>{summary.unmarked} unmarked</span>
              <span style={{
            fontSize: 13,
            fontWeight: 600,
            color: '#2D6A4F'
          }}>{summary.present} present</span>
              <span style={{
            fontSize: 13,
            fontWeight: 600,
            color: '#C1440E'
          }}>{summary.absent} absent</span>
              <span style={{
            fontSize: 13,
            fontWeight: 600,
            color: '#D4922A'
          }}>{summary.late} late</span>
            </div>
          </div>

          <div className="card" style={{
        overflow: 'hidden',
        marginBottom: 18
      }}>
            {roster.map((name, i) => {
          const status = attendance[name];
          return <div key={name} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '11px 18px',
            borderBottom: i < roster.length - 1 ? '1px solid #F8F4EE' : 'none',
            background: status === 'present' ? 'rgba(212,237,226,0.25)' : status === 'absent' ? 'rgba(244,228,220,0.25)' : status === 'late' ? 'rgba(251,240,216,0.25)' : 'transparent',
            transition: 'background 0.12s'
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
                background: '#F0EAE0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                fontWeight: 700,
                color: '#6B6259'
              }}>
                      {name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span style={{
                fontSize: 14,
                fontWeight: 500,
                color: '#1E1A16'
              }}>{name}</span>
                  </div>
                  <div style={{
              display: 'flex',
              gap: 6
            }}>
                    {['present', 'absent', 'late'].map(s => <button key={s} onClick={() => setStatus(name, s)} style={{
                padding: '5px 13px',
                borderRadius: 6,
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: 12,
                background: status === s ? s === 'present' ? '#2D6A4F' : s === 'absent' ? '#C1440E' : '#D4922A' : '#F0EAE0',
                color: status === s ? '#fff' : '#6B6259',
                transition: 'all 0.1s'
              }}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </button>)}
                  </div>
                </div>;
        })}
          </div>

          <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
            <div style={{
          display: 'flex',
          gap: 8
        }}>
              <button className="btn-ghost" style={{
            fontSize: 13,
            display: 'flex',
            alignItems: 'center',
            gap: 5
          }} onClick={() => {
            const all = {};
            roster.forEach(n => {
              all[n] = 'present';
            });
            setAttendance(all);
          }}>
                <CheckCircle2 size={13} strokeWidth={2} color="#2D6A4F" /> All present
              </button>
              <button className="btn-ghost" style={{
            fontSize: 13
          }} onClick={() => setAttendance({})}>Reset</button>
            </div>
            <button className="btn-primary" style={{
          padding: '11px 26px',
          fontSize: 14,
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }} onClick={handleProceedToReview}>
              Review & sign <ArrowRight size={14} />
            </button>
          </div>
        </>}

      {tab === 'roll-call' && phase === 'review' && <div>
          <div style={{
        background: '#FBF0D8',
        border: '1px solid #E8C980',
        borderRadius: 10,
        padding: '14px 18px',
        marginBottom: 20,
        display: 'flex',
        gap: 12,
        alignItems: 'flex-start'
      }}>
            <ClipboardList size={18} color="#9A6A18" strokeWidth={1.6} style={{
          flexShrink: 0,
          marginTop: 1
        }} />
            <div>
              <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 14,
            color: '#7A5218',
            marginBottom: 2
          }}>Review before signing</div>
              <div style={{
            fontSize: 13,
            color: '#7A5218'
          }}>Check the records below. Once you sign, this attendance record is confirmed.</div>
            </div>
          </div>

          <div className="card" style={{
        padding: '20px',
        marginBottom: 16
      }}>
            <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 14,
          marginBottom: 16
        }}>
              {[{
            label: 'Present',
            value: summary.present,
            color: '#2D6A4F',
            bg: '#D4EDE2'
          }, {
            label: 'Absent',
            value: summary.absent,
            color: '#C1440E',
            bg: '#F4E4DC'
          }, {
            label: 'Late',
            value: summary.late,
            color: '#D4922A',
            bg: '#FBF0D8'
          }, {
            label: 'Total',
            value: roster.length,
            color: '#1A3A5C',
            bg: '#D4E4F0'
          }].map(s => <div key={s.label} style={{
            background: s.bg,
            borderRadius: 10,
            padding: '12px',
            textAlign: 'center'
          }}>
                  <div style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: 26,
              color: s.color
            }}>{s.value}</div>
                  <div style={{
              fontSize: 12,
              color: '#6B6259'
            }}>{s.label}</div>
                </div>)}
            </div>
            <div style={{
          borderTop: '1px solid #F0EAE0',
          paddingTop: 14
        }}>
              <div style={{
            fontSize: 13,
            fontWeight: 600,
            color: '#3D3730',
            marginBottom: 8
          }}>Absent / Late students</div>
              <div style={{
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap'
          }}>
                {roster.filter(n => attendance[n] === 'absent' || attendance[n] === 'late').map(n => <span key={n} style={{
              padding: '4px 12px',
              borderRadius: 20,
              fontSize: 13,
              fontWeight: 500,
              background: attendance[n] === 'absent' ? '#F4E4DC' : '#FBF0D8',
              color: attendance[n] === 'absent' ? '#8E3008' : '#9A6A18'
            }}>
                    {n} {attendance[n] === 'late' ? '(late)' : ''}
                  </span>)}
                {roster.filter(n => attendance[n] === 'absent' || attendance[n] === 'late').length === 0 && <span style={{
              fontSize: 13,
              color: '#2D6A4F',
              fontWeight: 500
            }}>All students present</span>}
              </div>
            </div>
            <div style={{
          marginTop: 14
        }}>
              <label style={{
            display: 'block',
            fontSize: 13,
            fontWeight: 600,
            color: '#3D3730',
            marginBottom: 6
          }}>Notes (optional)</label>
              <textarea className="input-field" rows={2} placeholder="e.g. Field trip scheduled, assembly cancelled…" value={note} onChange={e => setNote(e.target.value)} style={{
            resize: 'vertical'
          }} />
            </div>
          </div>

          <div style={{
        display: 'flex',
        gap: 10
      }}>
            <button className="btn-ghost" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 5
        }} onClick={() => setPhase('roll-call')}>
              <ArrowLeft size={13} /> Back to roll call
            </button>
            <button className="btn-primary" style={{
          flex: 1,
          fontSize: 15,
          padding: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6
        }} onClick={() => setPhase('sign')}>
              Proceed to sign <ArrowRight size={14} />
            </button>
          </div>
        </div>}

      {tab === 'roll-call' && phase === 'sign' && <div style={{
      maxWidth: 520
    }}>
          <div className="card" style={{
        padding: '28px',
        marginBottom: 16
      }}>
            <div style={{
          textAlign: 'center',
          marginBottom: 22
        }}>
              <div style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: '#D4EDE2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 14px'
          }}>
                <PenLine size={24} color="#2D6A4F" strokeWidth={1.6} />
              </div>
              <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 20,
            color: '#1E1A16',
            marginBottom: 6
          }}>Sign attendance record</h2>
              <p style={{
            fontSize: 14,
            color: '#6B6259',
            lineHeight: 1.6
          }}>
                By signing, you confirm that this attendance record for <strong>{selectedClass}</strong> on <strong>{new Date(selectedDate).toDateString()}</strong> is accurate.
              </p>
            </div>
            <div style={{
          background: '#FAF7F0',
          borderRadius: 10,
          padding: '16px',
          marginBottom: 20
        }}>
              <div style={{
            fontSize: 12,
            color: '#B5A99C',
            fontWeight: 600,
            marginBottom: 10,
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>Record summary</div>
              <div style={{
            display: 'flex',
            gap: 20
          }}>
                <span style={{
              fontSize: 14
            }}><strong style={{
                color: '#2D6A4F'
              }}>{summary.present}</strong> present</span>
                <span style={{
              fontSize: 14
            }}><strong style={{
                color: '#C1440E'
              }}>{summary.absent}</strong> absent</span>
                <span style={{
              fontSize: 14
            }}><strong style={{
                color: '#D4922A'
              }}>{summary.late}</strong> late</span>
              </div>
              <div style={{
            marginTop: 8,
            fontSize: 13,
            color: '#6B6259'
          }}>Class: {selectedClass} · {new Date(selectedDate).toDateString()}</div>
              <div style={{
            marginTop: 2,
            fontSize: 13,
            color: '#6B6259'
          }}>Educator: Ms. Grace Njeri</div>
            </div>
            <div style={{
          marginBottom: 20
        }}>
              <label style={{
            display: 'block',
            fontSize: 13,
            fontWeight: 600,
            color: '#3D3730',
            marginBottom: 6
          }}>Confirm your password to sign</label>
              <input className="input-field" type="password" placeholder="Enter your password to confirm" />
            </div>
            <div style={{
          display: 'flex',
          gap: 10
        }}>
              <button className="btn-ghost" style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 5
          }} onClick={() => setPhase('review')}>
                <ArrowLeft size={13} /> Back
              </button>
              <button className="btn-primary" style={{
            flex: 2,
            padding: '12px',
            fontSize: 15,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6
          }} onClick={() => setPhase('confirmed')}>
                <PenLine size={14} strokeWidth={2} /> Sign and confirm
              </button>
            </div>
          </div>
        </div>}

      {tab === 'roll-call' && phase === 'confirmed' && <div style={{
      textAlign: 'center',
      padding: '60px 40px'
    }}>
          <div style={{
        width: 72,
        height: 72,
        borderRadius: '50%',
        background: '#D4EDE2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 20px'
      }}>
            <CheckCircle2 size={32} color="#2D6A4F" strokeWidth={1.8} />
          </div>
          <h2 style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 700,
        fontSize: 24,
        color: '#1E1A16',
        marginBottom: 8
      }}>Attendance confirmed</h2>
          <p style={{
        fontSize: 15,
        color: '#6B6259',
        marginBottom: 6
      }}>{selectedClass} · {new Date(selectedDate).toDateString()}</p>
          <p style={{
        fontSize: 13,
        color: '#B5A99C',
        marginBottom: 28
      }}>Signed by Ms. Grace Njeri at {new Date().toLocaleTimeString('en-KE', {
          hour: '2-digit',
          minute: '2-digit'
        })}</p>
          <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 28,
        marginBottom: 32
      }}>
            {[{
          label: 'Present',
          value: summary.present,
          color: '#2D6A4F'
        }, {
          label: 'Absent',
          value: summary.absent,
          color: '#C1440E'
        }, {
          label: 'Late',
          value: summary.late,
          color: '#D4922A'
        }].map(s => <div key={s.label} style={{
          textAlign: 'center'
        }}>
                <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: 30,
            color: s.color
          }}>{s.value}</div>
                <div style={{
            fontSize: 13,
            color: '#6B6259'
          }}>{s.label}</div>
              </div>)}
          </div>
          <button className="btn-secondary" onClick={() => {
        setPhase('roll-call');
        setAttendance({});
      }}>Take another roll call</button>
        </div>}

      {tab === 'history' && <div className="card" style={{
      overflow: 'hidden'
    }}>
          <div className="table-row" style={{
        gridTemplateColumns: '2fr 1fr 1fr 1fr 2fr 1fr',
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
          {history.map((h, i) => <div key={i} className="table-row" style={{
        gridTemplateColumns: '2fr 1fr 1fr 1fr 2fr 1fr'
      }}>
              <span style={{
          fontSize: 14,
          fontWeight: 600,
          color: '#1E1A16'
        }}>{h.date}</span>
              <span style={{
          fontSize: 14,
          color: '#2D6A4F',
          fontWeight: 600
        }}>{h.present}</span>
              <span style={{
          fontSize: 14,
          color: '#C1440E',
          fontWeight: 600
        }}>{h.absent}</span>
              <span style={{
          fontSize: 14,
          color: '#D4922A',
          fontWeight: 600
        }}>{h.late}</span>
              <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }}>
                <PenLine size={12} color="#B5A99C" strokeWidth={1.6} />
                <div>
                  <div style={{
              fontSize: 13,
              color: '#3D3730',
              fontWeight: 500
            }}>{h.signed}</div>
                  <div style={{
              fontSize: 11,
              color: '#B5A99C'
            }}>{h.signedAt}</div>
                </div>
              </div>
              <span className="badge-green">{h.rate}</span>
            </div>)}
        </div>}
    </div>;
}