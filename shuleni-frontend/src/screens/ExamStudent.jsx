import { useState, useEffect } from 'react';
import { Flag, Timer, AlertTriangle, CheckCircle2, ClipboardList, FileText } from 'lucide-react';
const questions = [{
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
  type: 'mcq',
  text: 'Which molecule carries genetic information from DNA to the ribosome?',
  options: ['tRNA', 'rRNA', 'mRNA', 'DNA polymerase'],
  marks: 2
}, {
  id: 4,
  type: 'short',
  text: 'State two differences between mitosis and meiosis.',
  marks: 4
}, {
  id: 5,
  type: 'essay',
  text: 'With the aid of a diagram, describe the process of photosynthesis in detail, including light-dependent and light-independent reactions.',
  marks: 12
}];
const TOTAL_SECONDS = 60 * 60;
export default function ExamStudent({
  navigate
}) {
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const [warnings, setWarnings] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  useEffect(() => {
    if (!started || submitted) return;
    const t = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(t);
          setSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [started, submitted]);
  useEffect(() => {
    if (!started || submitted) return;
    const handleVisibility = () => {
      if (document.hidden) {
        setWarnings(w => {
          const next = w + 1;
          setShowWarning(true);
          setTimeout(() => setShowWarning(false), 3500);
          if (next >= 3) setSubmitted(true);
          return next;
        });
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [started, submitted]);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const isLow = timeLeft < 600;
  const q = questions[current];
  const answered = Object.keys(answers).length;
  const totalMarks = questions.reduce((s, q) => s + q.marks, 0);
  const toggleFlag = id => {
    setFlagged(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);else next.add(id);
      return next;
    });
  };
  const getQuestionState = index => {
    const qid = questions[index].id;
    if (index === current) return 'current';
    if (flagged.has(qid)) return 'flagged';
    if (answers[qid]) return 'answered';
    return 'unanswered';
  };
  if (!started) {
    return <div style={{
      minHeight: '100vh',
      background: '#FAF7F0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 40
    }}>
        <div className="card" style={{
        maxWidth: 500,
        width: '100%',
        padding: '40px'
      }}>
          <div style={{
          textAlign: 'center',
          marginBottom: 28
        }}>
            <div style={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: '#F4E4DC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px'
          }}>
              <FileText size={26} color="#C1440E" strokeWidth={1.6} />
            </div>
            <h1 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: 22,
            color: '#1E1A16',
            marginBottom: 4
          }}>Biology CAT 2</h1>
            <p style={{
            fontSize: 13,
            color: '#6B6259'
          }}>Form 3 East · Ms. Grace Njeri</p>
          </div>

          <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 10,
          marginBottom: 24
        }}>
            {[{
            label: 'Duration',
            value: '60 minutes'
          }, {
            label: 'Total marks',
            value: `${totalMarks} marks`
          }, {
            label: 'Questions',
            value: `${questions.length} questions`
          }, {
            label: 'Date',
            value: 'Wed 22 Jan'
          }].map(s => <div key={s.label} style={{
            background: '#FAF7F0',
            borderRadius: 8,
            padding: '12px 14px',
            textAlign: 'center'
          }}>
                <div style={{
              fontSize: 11,
              color: '#B5A99C',
              fontWeight: 600,
              marginBottom: 4,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>{s.label}</div>
                <div style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: 16,
              color: '#1E1A16'
            }}>{s.value}</div>
              </div>)}
          </div>

          <div style={{
          background: '#F4E4DC',
          border: '1px solid #E8C0A8',
          borderRadius: 10,
          padding: '16px',
          marginBottom: 24
        }}>
            <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            marginBottom: 10
          }}>
              <AlertTriangle size={14} color="#8E3008" strokeWidth={2} />
              <span style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: 13,
              color: '#8E3008'
            }}>Assessment integrity notice</span>
            </div>
            <ul style={{
            margin: 0,
            paddingLeft: 18,
            fontSize: 13,
            color: '#3D3730',
            lineHeight: 1.8
          }}>
              <li>Switching tabs is recorded — 3 warnings trigger auto-submission</li>
              <li>Copy and paste is disabled during the assessment</li>
              <li>Questions are presented in randomised order</li>
              <li>The timer starts when you click "Start assessment"</li>
              <li>You can flag questions to review before submitting</li>
            </ul>
          </div>

          <button className="btn-primary" style={{
          width: '100%',
          fontSize: 15,
          padding: '13px'
        }} onClick={() => setStarted(true)}>
            Start assessment
          </button>
          <button className="btn-ghost" style={{
          width: '100%',
          marginTop: 10
        }} onClick={() => navigate('student-dashboard')}>
            Back to dashboard
          </button>
        </div>
      </div>;
  }
  if (submitted) {
    return <div style={{
      minHeight: '100vh',
      background: '#FAF7F0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 40
    }}>
        <div className="card" style={{
        maxWidth: 460,
        width: '100%',
        padding: '48px',
        textAlign: 'center'
      }}>
          <div style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: '#D4EDE2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px'
        }}>
            <CheckCircle2 size={30} color="#2D6A4F" strokeWidth={1.8} />
          </div>
          <h1 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          fontSize: 24,
          color: '#1E1A16',
          marginBottom: 8
        }}>Assessment submitted</h1>
          <p style={{
          fontSize: 14,
          color: '#6B6259',
          lineHeight: 1.7,
          marginBottom: 28
        }}>
            Your answers have been recorded. Ms. Njeri will publish results after grading.
          </p>
          <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 10,
          marginBottom: 28
        }}>
            {[{
            label: 'Answered',
            value: answered,
            color: '#2D6A4F',
            bg: '#D4EDE2'
          }, {
            label: 'Flagged',
            value: flagged.size,
            color: '#D4922A',
            bg: '#FBF0D8'
          }, {
            label: 'Unanswered',
            value: questions.length - answered,
            color: '#C1440E',
            bg: '#F4E4DC'
          }].map(s => <div key={s.label} style={{
            background: s.bg,
            borderRadius: 10,
            padding: '14px 8px',
            textAlign: 'center'
          }}>
                <div style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: 22,
              color: s.color
            }}>{s.value}</div>
                <div style={{
              fontSize: 12,
              color: '#6B6259'
            }}>{s.label}</div>
              </div>)}
          </div>
          <button className="btn-primary" style={{
          width: '100%',
          marginBottom: 10
        }} onClick={() => navigate('student-results')}>View my results</button>
          <button className="btn-ghost" style={{
          width: '100%'
        }} onClick={() => navigate('student-dashboard')}>Back to dashboard</button>
        </div>
      </div>;
  }
  return <div style={{
    minHeight: '100vh',
    background: '#FAF7F0'
  }} onCopy={e => e.preventDefault()} onPaste={e => e.preventDefault()}>
      <div style={{
      background: '#fff',
      borderBottom: '1px solid #E4DDD4',
      padding: '0 28px',
      height: 54,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 20
    }}>
        <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }}>
          <div style={{
          width: 26,
          height: 26,
          borderRadius: 6,
          background: '#C1440E',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
            <span style={{
            color: '#fff',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: 13
          }}>S</span>
          </div>
          <span style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700,
          fontSize: 14,
          color: '#1E1A16'
        }}>Biology CAT 2</span>
          <span style={{
          fontSize: 13,
          color: '#B5A99C'
        }}>Q{current + 1} / {questions.length}</span>
        </div>

        <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16
      }}>
          {warnings > 0 && <span style={{
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          fontSize: 12,
          color: '#C1440E',
          fontWeight: 600,
          background: '#F4E4DC',
          padding: '4px 10px',
          borderRadius: 20
        }}>
              <AlertTriangle size={12} strokeWidth={2} /> {warnings}/3 tab warnings
            </span>}
          <div style={{
          background: isLow ? '#F4E4DC' : '#FAF7F0',
          border: `1.5px solid ${isLow ? '#C1440E' : '#E4DDD4'}`,
          borderRadius: 8,
          padding: '5px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 7
        }}>
            <Timer size={13} color={isLow ? '#C1440E' : '#6B6259'} strokeWidth={1.8} />
            <span style={{
            fontFamily: 'monospace',
            fontWeight: 700,
            fontSize: 17,
            color: isLow ? '#C1440E' : '#1E1A16'
          }}>{timeStr}</span>
          </div>
          <button className="btn-primary" style={{
          padding: '7px 16px',
          fontSize: 13
        }} onClick={() => setConfirmSubmit(true)}>
            Submit
          </button>
        </div>
      </div>

      {showWarning && <div style={{
      position: 'fixed',
      top: 64,
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#C1440E',
      color: '#fff',
      padding: '10px 22px',
      borderRadius: 10,
      zIndex: 50,
      fontWeight: 600,
      fontSize: 13,
      boxShadow: '0 8px 24px rgba(193,68,14,0.4)',
      whiteSpace: 'nowrap',
      display: 'flex',
      alignItems: 'center',
      gap: 7
    }}>
          <AlertTriangle size={14} strokeWidth={2} /> Tab switch detected! Warning {warnings}/3
        </div>}

      <div style={{
      display: 'grid',
      gridTemplateColumns: '240px 1fr',
      height: 'calc(100vh - 54px)'
    }}>
        <div style={{
        background: '#fff',
        borderRight: '1px solid #E4DDD4',
        padding: '18px',
        overflowY: 'auto'
      }}>
          <div style={{
          fontSize: 11,
          fontWeight: 700,
          color: '#B5A99C',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: 10
        }}>Questions</div>
          <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 6,
          marginBottom: 18
        }}>
            {questions.map((_, i) => {
            const state = getQuestionState(i);
            const bg = state === 'current' ? '#C1440E' : state === 'answered' ? '#D4EDE2' : state === 'flagged' ? '#FBF0D8' : '#F0EAE0';
            const color = state === 'current' ? '#fff' : state === 'answered' ? '#1A4A35' : state === 'flagged' ? '#9A6A18' : '#6B6259';
            return <button key={i} onClick={() => setCurrent(i)} style={{
              width: '100%',
              aspectRatio: '1',
              borderRadius: 7,
              border: state === 'flagged' ? '1.5px solid #D4922A' : 'none',
              cursor: 'pointer',
              background: bg,
              color,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: 13,
              transition: 'all 0.12s',
              position: 'relative'
            }}>
                  {i + 1}
                  {state === 'flagged' && <span style={{
                position: 'absolute',
                top: -3,
                right: -3,
                width: 9,
                height: 9,
                background: '#D4922A',
                borderRadius: '50%',
                border: '1.5px solid #fff'
              }} />}
                </button>;
          })}
          </div>

          <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 5,
          marginBottom: 16
        }}>
            {[{
            bg: '#C1440E',
            border: 'none',
            label: 'Current',
            textColor: '#6B6259'
          }, {
            bg: '#D4EDE2',
            border: 'none',
            label: 'Answered',
            textColor: '#6B6259'
          }, {
            bg: '#FBF0D8',
            border: '1.5px solid #D4922A',
            label: 'Flagged for review',
            textColor: '#6B6259'
          }, {
            bg: '#F0EAE0',
            border: 'none',
            label: 'Unanswered',
            textColor: '#6B6259'
          }].map(s => <div key={s.label} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 12,
            color: s.textColor
          }}>
                <div style={{
              width: 14,
              height: 14,
              borderRadius: 3,
              background: s.bg,
              border: s.border,
              flexShrink: 0
            }} />
                {s.label}
              </div>)}
          </div>

          <div style={{
          background: '#F0EAE0',
          borderRadius: 8,
          padding: '12px'
        }}>
            <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 4
          }}>
              <span style={{
              fontSize: 11,
              color: '#6B6259'
            }}>Progress</span>
              <span style={{
              fontSize: 13,
              fontWeight: 700,
              color: '#1E1A16'
            }}>{answered}/{questions.length}</span>
            </div>
            <div style={{
            height: 5,
            background: '#E4DDD4',
            borderRadius: 3,
            overflow: 'hidden'
          }}>
              <div style={{
              height: '100%',
              width: `${answered / questions.length * 100}%`,
              background: '#2D6A4F',
              borderRadius: 3,
              transition: 'width 0.3s'
            }} />
            </div>
            {flagged.size > 0 && <div style={{
            fontSize: 11,
            color: '#9A6A18',
            marginTop: 6,
            display: 'flex',
            alignItems: 'center',
            gap: 4
          }}>
                <Flag size={10} color="#9A6A18" strokeWidth={2} /> {flagged.size} flagged for review
              </div>}
          </div>
        </div>

        <div style={{
        overflowY: 'auto',
        padding: '28px 36px'
      }}>
          <div style={{
          maxWidth: 660,
          margin: '0 auto'
        }}>
            <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 18
          }}>
              <div style={{
              display: 'flex',
              gap: 8,
              alignItems: 'center'
            }}>
                <span style={{
                padding: '3px 11px',
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 700,
                background: q.type === 'mcq' ? '#D4EDE2' : q.type === 'short' ? '#FBF0D8' : '#F4E4DC',
                color: q.type === 'mcq' ? '#1A4A35' : q.type === 'short' ? '#9A6A18' : '#8E3008'
              }}>
                  {q.type === 'mcq' ? 'Multiple choice' : q.type === 'short' ? 'Short answer' : 'Essay'}
                </span>
                <span style={{
                fontSize: 13,
                color: '#C1440E',
                fontWeight: 700
              }}>{q.marks} mark{q.marks !== 1 ? 's' : ''}</span>
              </div>
              <button onClick={() => toggleFlag(q.id)} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 12px',
              borderRadius: 7,
              border: `1.5px solid ${flagged.has(q.id) ? '#D4922A' : '#E4DDD4'}`,
              background: flagged.has(q.id) ? '#FBF0D8' : 'transparent',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 600,
              color: flagged.has(q.id) ? '#9A6A18' : '#6B6259',
              transition: 'all 0.12s'
            }}>
                <Flag size={12} color={flagged.has(q.id) ? '#9A6A18' : '#6B6259'} strokeWidth={flagged.has(q.id) ? 2.5 : 1.8} fill={flagged.has(q.id) ? '#D4922A' : 'none'} />
                {flagged.has(q.id) ? 'Flagged' : 'Flag for review'}
              </button>
            </div>

            <div className="card" style={{
            padding: '26px 26px 22px'
          }}>
              <p style={{
              fontSize: 16,
              lineHeight: 1.75,
              color: '#1E1A16',
              marginBottom: 22,
              fontWeight: 500
            }}>
                <span style={{
                color: '#C1440E',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                marginRight: 10
              }}>Q{current + 1}.</span>
                {q.text}
              </p>

              {q.type === 'mcq' && q.options && <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 9
            }}>
                  {q.options.map((opt, j) => {
                const letter = ['A', 'B', 'C', 'D'][j];
                const selected = answers[q.id] === opt;
                return <div key={j} onClick={() => setAnswers({
                  ...answers,
                  [q.id]: opt
                })} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '13px 16px',
                  borderRadius: 10,
                  cursor: 'pointer',
                  border: `2px solid ${selected ? '#C1440E' : '#E4DDD4'}`,
                  background: selected ? '#F4E4DC' : '#fff',
                  transition: 'all 0.12s'
                }} onMouseEnter={e => {
                  if (!selected) e.currentTarget.style.borderColor = '#D4C9BE';
                }} onMouseLeave={e => {
                  if (!selected) e.currentTarget.style.borderColor = '#E4DDD4';
                }}>
                        <div style={{
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    background: selected ? '#C1440E' : '#F0EAE0',
                    color: selected ? '#fff' : '#6B6259',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: 12,
                    flexShrink: 0
                  }}>
                          {letter}
                        </div>
                        <span style={{
                    fontSize: 15,
                    color: '#1E1A16',
                    fontWeight: selected ? 600 : 400
                  }}>{opt}</span>
                        {selected && <CheckCircle2 size={16} color="#C1440E" strokeWidth={2} style={{
                    marginLeft: 'auto'
                  }} />}
                      </div>;
              })}
                </div>}

              {(q.type === 'short' || q.type === 'essay') && <textarea style={{
              width: '100%',
              border: '1.5px solid #E4DDD4',
              borderRadius: 10,
              padding: '13px 16px',
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              color: '#1E1A16',
              resize: 'vertical',
              minHeight: q.type === 'essay' ? 220 : 110,
              outline: 'none',
              lineHeight: 1.7,
              transition: 'border-color 0.15s'
            }} placeholder={q.type === 'short' ? 'Write your answer here…' : 'Write your essay here. Be as detailed as possible.'} value={answers[q.id] || ''} onChange={e => setAnswers({
              ...answers,
              [q.id]: e.target.value
            })} onFocus={e => e.currentTarget.style.borderColor = '#C1440E'} onBlur={e => e.currentTarget.style.borderColor = '#E4DDD4'} />}
            </div>

            <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 18
          }}>
              <button className="btn-ghost" onClick={() => setCurrent(Math.max(0, current - 1))} style={{
              opacity: current === 0 ? 0.4 : 1
            }}>← Previous</button>
              {current < questions.length - 1 ? <button className="btn-primary" onClick={() => setCurrent(current + 1)}>Next →</button> : <button className="btn-primary" onClick={() => setConfirmSubmit(true)}>Review & submit →</button>}
            </div>
          </div>
        </div>
      </div>

      {confirmSubmit && <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(30,26,22,0.55)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(4px)'
    }}>
          <div className="card" style={{
        width: 420,
        padding: '32px',
        animation: 'fadeIn 0.2s ease'
      }}>
            <div style={{
          textAlign: 'center',
          marginBottom: 22
        }}>
              <div style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: '#F4E4DC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px'
          }}>
                <ClipboardList size={22} color="#C1440E" strokeWidth={1.6} />
              </div>
              <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 20,
            color: '#1E1A16',
            marginBottom: 6
          }}>Ready to submit?</h2>
              <p style={{
            fontSize: 14,
            color: '#6B6259'
          }}>Once submitted you cannot change your answers.</p>
            </div>
            <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 8,
          marginBottom: 22
        }}>
              {[{
            label: 'Answered',
            value: answered,
            color: '#2D6A4F',
            bg: '#D4EDE2'
          }, {
            label: 'Flagged',
            value: flagged.size,
            color: '#D4922A',
            bg: '#FBF0D8'
          }, {
            label: 'Unanswered',
            value: questions.length - answered,
            color: '#C1440E',
            bg: '#F4E4DC'
          }].map(s => <div key={s.label} style={{
            background: s.bg,
            borderRadius: 8,
            padding: '10px 8px',
            textAlign: 'center'
          }}>
                  <div style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: 20,
              color: s.color
            }}>{s.value}</div>
                  <div style={{
              fontSize: 11,
              color: '#6B6259'
            }}>{s.label}</div>
                </div>)}
            </div>
            {questions.length - answered > 0 && <div style={{
          background: '#F4E4DC',
          border: '1px solid #E8C0A8',
          borderRadius: 8,
          padding: '10px 14px',
          fontSize: 13,
          color: '#8E3008',
          marginBottom: 18
        }}>
                You have {questions.length - answered} unanswered question{questions.length - answered !== 1 ? 's' : ''}. Are you sure?
              </div>}
            <div style={{
          display: 'flex',
          gap: 10
        }}>
              <button className="btn-ghost" style={{
            flex: 1
          }} onClick={() => setConfirmSubmit(false)}>Go back</button>
              <button className="btn-primary" style={{
            flex: 2
          }} onClick={() => {
            setConfirmSubmit(false);
            setSubmitted(true);
          }}>
                Submit assessment
              </button>
            </div>
          </div>
        </div>}
    </div>;
}