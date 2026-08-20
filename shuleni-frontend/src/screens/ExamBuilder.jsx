import { useState } from 'react';
import { Trash2, ChevronDown, ChevronUp } from 'lucide-react';
const defaultQuestions = [{
  id: 1,
  type: 'mcq',
  text: 'Which process converts glucose to pyruvate?',
  options: ['Photosynthesis', 'Glycolysis', 'Krebs cycle', 'Fermentation'],
  marks: 2
}, {
  id: 2,
  type: 'mcq',
  text: 'The powerhouse of the cell is the:',
  options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Vacuole'],
  marks: 2
}, {
  id: 3,
  type: 'short',
  text: 'State two differences between mitosis and meiosis.',
  marks: 4
}, {
  id: 4,
  type: 'essay',
  text: 'With the aid of a diagram, describe the process of photosynthesis.',
  marks: 12
}];
export default function ExamBuilder({
  navigate
}) {
  const [questions, setQuestions] = useState(defaultQuestions);
  const [tab, setTab] = useState('builder');
  const [expandedQ, setExpandedQ] = useState(1);
  const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);
  const addQuestion = type => {
    const newQ = {
      id: Date.now(),
      type,
      text: '',
      options: type === 'mcq' ? ['Option A', 'Option B', 'Option C', 'Option D'] : undefined,
      marks: type === 'mcq' ? 2 : type === 'short' ? 4 : 10
    };
    setQuestions([...questions, newQ]);
    setExpandedQ(newQ.id);
  };
  const results = [{
    name: 'Kevin Wafula',
    score: 76,
    total: 100,
    grade: 'A',
    time: '48 min'
  }, {
    name: 'Mercy Chebet',
    score: 82,
    total: 100,
    grade: 'A+',
    time: '51 min'
  }, {
    name: 'Brian Otieno',
    score: 65,
    total: 100,
    grade: 'B+',
    time: '55 min'
  }, {
    name: 'Fatuma Hassan',
    score: 71,
    total: 100,
    grade: 'A-',
    time: '44 min'
  }, {
    name: 'James Njoroge',
    score: 58,
    total: 100,
    grade: 'B',
    time: '60 min'
  }, {
    name: 'Caroline Wanjiku',
    score: 88,
    total: 100,
    grade: 'A+',
    time: '39 min'
  }];
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
        }}>Biology CAT 2</h1>
          <p style={{
          fontSize: 14,
          color: '#6B6259'
        }}>Form 3 East · {totalMarks} marks · Ms. Grace Njeri</p>
        </div>
        <div style={{
        display: 'flex',
        gap: 10
      }}>
          <button className="btn-ghost" onClick={() => navigate('exam-student')}>Preview as student</button>
          <button className="btn-primary" onClick={() => navigate('exam-results')}>View results</button>
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
        <button className={`tab-btn ${tab === 'builder' ? 'active' : ''}`} onClick={() => setTab('builder')}>Question builder</button>
        <button className={`tab-btn ${tab === 'settings' ? 'active' : ''}`} onClick={() => setTab('settings')}>Settings & security</button>
        <button className={`tab-btn ${tab === 'results' ? 'active' : ''}`} onClick={() => setTab('results')}>Results (6)</button>
      </div>

      {tab === 'builder' && <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 280px',
      gap: 20
    }}>
          <div>
            <div className="card" style={{
          padding: '20px',
          marginBottom: 16
        }}>
              <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 14
          }}>
                <div>
                  <label style={{
                display: 'block',
                fontSize: 12,
                fontWeight: 600,
                color: '#6B6259',
                marginBottom: 5
              }}>EXAM TITLE</label>
                  <input className="input-field" defaultValue="Biology CAT 2" style={{
                fontSize: 15,
                fontWeight: 600
              }} />
                </div>
                <div>
                  <label style={{
                display: 'block',
                fontSize: 12,
                fontWeight: 600,
                color: '#6B6259',
                marginBottom: 5
              }}>CLASS</label>
                  <select className="input-field"><option>Form 3 East</option></select>
                </div>
                <div>
                  <label style={{
                display: 'block',
                fontSize: 12,
                fontWeight: 600,
                color: '#6B6259',
                marginBottom: 5
              }}>DATE</label>
                  <input className="input-field" type="date" defaultValue="2025-01-22" />
                </div>
                <div>
                  <label style={{
                display: 'block',
                fontSize: 12,
                fontWeight: 600,
                color: '#6B6259',
                marginBottom: 5
              }}>DURATION (minutes)</label>
                  <input className="input-field" type="number" defaultValue={60} />
                </div>
              </div>
            </div>

            {questions.map((q, i) => <div key={q.id} className="card" style={{
          marginBottom: 12,
          overflow: 'hidden'
        }}>
                <div style={{
            padding: '14px 18px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            background: expandedQ === q.id ? '#FAF7F0' : '#fff'
          }} onClick={() => setExpandedQ(expandedQ === q.id ? null : q.id)}>
                  <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12
            }}>
                    <span style={{
                fontSize: 12,
                fontWeight: 700,
                color: '#B5A99C',
                width: 20
              }}>Q{i + 1}</span>
                    <span style={{
                padding: '2px 10px',
                borderRadius: 20,
                fontSize: 11,
                fontWeight: 700,
                background: q.type === 'mcq' ? '#D4EDE2' : q.type === 'short' ? '#FBF0D8' : '#F4E4DC',
                color: q.type === 'mcq' ? '#1A4A35' : q.type === 'short' ? '#9A6A18' : '#8E3008'
              }}>
                      {q.type === 'mcq' ? 'MCQ' : q.type === 'short' ? 'Short answer' : 'Essay'}
                    </span>
                    <span style={{
                fontSize: 14,
                fontWeight: q.text ? 500 : 400,
                color: q.text ? '#1E1A16' : '#B5A99C'
              }}>
                      {q.text || 'Untitled question…'}
                    </span>
                  </div>
                  <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10
            }}>
                    <span style={{
                fontSize: 13,
                color: '#C1440E',
                fontWeight: 700
              }}>{q.marks} mk{q.marks !== 1 ? 's' : ''}</span>
                    {expandedQ === q.id ? <ChevronUp size={15} color="#B5A99C" /> : <ChevronDown size={15} color="#B5A99C" />}
                  </div>
                </div>

                {expandedQ === q.id && <div style={{
            padding: '16px 18px',
            borderTop: '1px solid #F0EAE0'
          }}>
                    <textarea style={{
              width: '100%',
              border: '1.5px solid #E4DDD4',
              borderRadius: 8,
              padding: '10px 14px',
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              color: '#1E1A16',
              resize: 'vertical',
              minHeight: 72,
              outline: 'none'
            }} defaultValue={q.text} placeholder="Enter question text…" />
                    {q.type === 'mcq' && q.options && <div style={{
              marginTop: 12,
              display: 'flex',
              flexDirection: 'column',
              gap: 8
            }}>
                        <div style={{
                fontSize: 12,
                fontWeight: 600,
                color: '#6B6259'
              }}>Answer options (tick correct)</div>
                        {q.options.map((opt, j) => <div key={j} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10
              }}>
                            <input type="radio" name={`q${q.id}`} style={{
                  accentColor: '#2D6A4F',
                  width: 16,
                  height: 16
                }} />
                            <input style={{
                  flex: 1,
                  border: '1px solid #E4DDD4',
                  borderRadius: 6,
                  padding: '7px 12px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  outline: 'none'
                }} defaultValue={opt} />
                          </div>)}
                      </div>}
                    <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginTop: 14
            }}>
                      <label style={{
                fontSize: 13,
                fontWeight: 600,
                color: '#3D3730'
              }}>Marks:</label>
                      <input type="number" style={{
                width: 70,
                border: '1.5px solid #E4DDD4',
                borderRadius: 7,
                padding: '6px 10px',
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                outline: 'none'
              }} defaultValue={q.marks} />
                      <button style={{
                marginLeft: 'auto',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 13,
                color: '#C1440E',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: 5
              }} onClick={() => setQuestions(questions.filter(x => x.id !== q.id))}>
                        <Trash2 size={13} strokeWidth={1.8} /> Remove
                      </button>
                    </div>
                  </div>}
              </div>)}

            <div style={{
          display: 'flex',
          gap: 8,
          marginTop: 8
        }}>
              <button className="btn-ghost" onClick={() => addQuestion('mcq')}>+ MCQ</button>
              <button className="btn-ghost" onClick={() => addQuestion('short')}>+ Short answer</button>
              <button className="btn-ghost" onClick={() => addQuestion('essay')}>+ Essay</button>
            </div>
          </div>

          <div>
            <div className="card" style={{
          padding: '18px',
          marginBottom: 12
        }}>
              <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 15,
            color: '#1E1A16',
            marginBottom: 14
          }}>Summary</div>
              <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10
          }}>
                {[{
              label: 'MCQ questions',
              value: questions.filter(q => q.type === 'mcq').length
            }, {
              label: 'Short answer',
              value: questions.filter(q => q.type === 'short').length
            }, {
              label: 'Essay',
              value: questions.filter(q => q.type === 'essay').length
            }, {
              label: 'Total marks',
              value: totalMarks,
              bold: true
            }].map(s => <div key={s.label} style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 14
            }}>
                    <span style={{
                color: '#6B6259'
              }}>{s.label}</span>
                    <span style={{
                fontWeight: s.bold ? 700 : 600,
                color: '#1E1A16'
              }}>{s.value}</span>
                  </div>)}
              </div>
            </div>
            <button className="btn-primary" style={{
          width: '100%',
          marginBottom: 8
        }}>Publish exam</button>
            <button className="btn-ghost" style={{
          width: '100%'
        }}>Save draft</button>
          </div>
        </div>}

      {tab === 'settings' && <div style={{
      maxWidth: 600
    }}>
          <div className="card" style={{
        padding: '24px',
        marginBottom: 16
      }}>
            <div style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700,
          fontSize: 16,
          color: '#1E1A16',
          marginBottom: 18
        }}>Anti-cheat & security</div>
            <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16
        }}>
              {[{
            label: 'Tab-switch detection',
            desc: 'Auto-flag when student leaves exam tab. 3 warnings then auto-submit.',
            enabled: true
          }, {
            label: 'Randomise question order',
            desc: 'Each student sees questions in a different sequence.',
            enabled: true
          }, {
            label: 'Randomise option order (MCQ)',
            desc: 'Answer options shuffled for each student.',
            enabled: true
          }, {
            label: 'Disable copy & paste',
            desc: "Students can't copy questions or paste external text.",
            enabled: true
          }, {
            label: 'Countdown timer',
            desc: 'Visible timer counts down. Auto-submits when time expires.',
            enabled: true
          }, {
            label: 'Require webcam verification',
            desc: 'Student must enable camera before starting (optional).',
            enabled: false
          }].map(setting => <div key={setting.label} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            paddingBottom: 14,
            borderBottom: '1px solid #F0EAE0'
          }}>
                  <div style={{
              flex: 1
            }}>
                    <div style={{
                fontSize: 14,
                fontWeight: 600,
                color: '#1E1A16',
                marginBottom: 2
              }}>{setting.label}</div>
                    <div style={{
                fontSize: 13,
                color: '#6B6259'
              }}>{setting.desc}</div>
                  </div>
                  <div style={{
              width: 42,
              height: 24,
              borderRadius: 12,
              background: setting.enabled ? '#C1440E' : '#E4DDD4',
              position: 'relative',
              cursor: 'pointer',
              flexShrink: 0,
              marginLeft: 16,
              marginTop: 2
            }}>
                    <div style={{
                position: 'absolute',
                top: 3,
                left: setting.enabled ? 20 : 3,
                width: 18,
                height: 18,
                borderRadius: '50%',
                background: '#fff',
                transition: 'left 0.15s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
              }} />
                  </div>
                </div>)}
            </div>
          </div>
          <div className="card" style={{
        padding: '24px'
      }}>
            <div style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700,
          fontSize: 16,
          color: '#1E1A16',
          marginBottom: 16
        }}>Access window</div>
            <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 14
        }}>
              <div>
                <label style={{
              display: 'block',
              fontSize: 13,
              fontWeight: 600,
              color: '#3D3730',
              marginBottom: 6
            }}>Available from</label>
                <input className="input-field" type="datetime-local" defaultValue="2025-01-22T09:00" />
              </div>
              <div>
                <label style={{
              display: 'block',
              fontSize: 13,
              fontWeight: 600,
              color: '#3D3730',
              marginBottom: 6
            }}>Available until</label>
                <input className="input-field" type="datetime-local" defaultValue="2025-01-22T10:30" />
              </div>
            </div>
          </div>
        </div>}

      {tab === 'results' && <div>
          <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 14,
        marginBottom: 20
      }}>
            {[{
          label: 'Avg. score',
          value: '73.3%',
          color: '#2D6A4F'
        }, {
          label: 'Top score',
          value: '88%',
          color: '#D4922A'
        }, {
          label: 'Submitted',
          value: '6 / 47',
          color: '#C1440E'
        }, {
          label: 'Avg. time',
          value: '49 min',
          color: '#1A3A5C'
        }].map(s => <div key={s.label} className="stat-card">
                <div style={{
            fontSize: 12,
            color: '#6B6259',
            fontWeight: 600,
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
          <div className="card" style={{
        overflow: 'hidden'
      }}>
            <div className="table-row" style={{
          gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
          background: '#FAF7F0'
        }}>
              {['Student', 'Score', 'Total', 'Grade', 'Time taken'].map(h => <span key={h} style={{
            fontSize: 11,
            fontWeight: 700,
            color: '#B5A99C',
            textTransform: 'uppercase',
            letterSpacing: '0.06em'
          }}>{h}</span>)}
            </div>
            {results.map((r, i) => <div key={i} className="table-row" style={{
          gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr'
        }}>
                <span style={{
            fontSize: 14,
            fontWeight: 600,
            color: '#1E1A16'
          }}>{r.name}</span>
                <span>
                  <div style={{
              height: 5,
              width: 80,
              background: '#F0EAE0',
              borderRadius: 3,
              overflow: 'hidden'
            }}>
                    <div style={{
                height: '100%',
                width: `${r.score}%`,
                background: r.score >= 80 ? '#2D6A4F' : r.score >= 60 ? '#D4922A' : '#C1440E',
                borderRadius: 3
              }} />
                  </div>
                  <span style={{
              fontSize: 13,
              fontWeight: 600,
              color: '#1E1A16',
              marginTop: 2,
              display: 'block'
            }}>{r.score}%</span>
                </span>
                <span style={{
            fontSize: 14,
            color: '#6B6259'
          }}>{r.total}</span>
                <span><span className={r.score >= 80 ? 'badge-green' : r.score >= 60 ? 'badge-gold' : 'badge-red'}>{r.grade}</span></span>
                <span style={{
            fontSize: 13,
            color: '#6B6259'
          }}>{r.time}</span>
              </div>)}
          </div>
        </div>}
    </div>;
}