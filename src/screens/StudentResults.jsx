import { ArrowLeft, ClipboardList } from 'lucide-react';
const results = [{
  exam: 'Biology CAT 2',
  cls: 'Form 3 East',
  date: 'Wed 22 Jan',
  status: 'Pending',
  score: null,
  total: 20,
  grade: null
}, {
  exam: 'Biology CAT 1',
  cls: 'Form 3 East',
  date: 'Dec 5',
  status: 'Graded',
  score: 15,
  total: 20,
  grade: 'A'
}, {
  exam: 'Chemistry Practical',
  cls: 'Form 3 East',
  date: 'Nov 28',
  status: 'Graded',
  score: 18,
  total: 20,
  grade: 'A+'
}, {
  exam: 'Mathematics Mock',
  cls: 'Form 3 East',
  date: 'Nov 14',
  status: 'Graded',
  score: 62,
  total: 100,
  grade: 'B+'
}, {
  exam: 'English Comprehension',
  cls: 'Form 3 East',
  date: 'Oct 30',
  status: 'Graded',
  score: 34,
  total: 40,
  grade: 'A-'
}, {
  exam: 'Kiswahili Insha',
  cls: 'Form 3 East',
  date: 'Oct 15',
  status: 'Graded',
  score: 28,
  total: 40,
  grade: 'B'
}];
const graded = results.filter(r => r.status === 'Graded' && r.score !== null);
const avgPct = graded.length ? Math.round(graded.reduce((s, r) => s + r.score / r.total * 100, 0) / graded.length) : 0;
export default function StudentResults({
  navigate
}) {
  return <div style={{
    padding: '28px 32px',
    maxWidth: 800,
    margin: '0 auto'
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
      marginBottom: 20
    }} onClick={() => navigate('student-dashboard')}>
        <ArrowLeft size={14} strokeWidth={2} /> Dashboard
      </button>

      <h1 style={{
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 800,
      fontSize: 26,
      color: '#1E1A16',
      marginBottom: 4
    }}>My Results</h1>
      <p style={{
      fontSize: 14,
      color: '#6B6259',
      marginBottom: 24
    }}>Brian Otieno · Form 3 East · Term 1, 2025</p>

      <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 14,
      marginBottom: 24
    }}>
        {[{
        label: 'Average score',
        value: `${avgPct}%`,
        color: avgPct >= 80 ? '#2D6A4F' : avgPct >= 60 ? '#D4922A' : '#C1440E',
        bg: avgPct >= 80 ? '#D4EDE2' : avgPct >= 60 ? '#FBF0D8' : '#F4E4DC'
      }, {
        label: 'Exams graded',
        value: graded.length,
        color: '#1A3A5C',
        bg: '#D4E4F0'
      }, {
        label: 'Pending results',
        value: results.filter(r => r.status === 'Pending').length,
        color: '#9A6A18',
        bg: '#FBF0D8'
      }].map(s => <div key={s.label} style={{
        background: s.bg,
        borderRadius: 12,
        padding: '18px 20px'
      }}>
            <div style={{
          fontSize: 11,
          fontWeight: 700,
          color: '#6B6259',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: 8
        }}>{s.label}</div>
            <div style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          fontSize: 30,
          color: s.color
        }}>{s.value}</div>
          </div>)}
      </div>

      <div className="card" style={{
      overflow: 'hidden'
    }}>
        <div style={{
        padding: '14px 20px',
        borderBottom: '1px solid #F0EAE0',
        background: '#FAF7F0'
      }}>
          <div style={{
          display: 'grid',
          gridTemplateColumns: '3fr 1fr 1.5fr 1fr 80px',
          gap: 8
        }}>
            {['Assessment', 'Date', 'Score', 'Grade', 'Status'].map(h => <span key={h} style={{
            fontSize: 11,
            fontWeight: 700,
            color: '#B5A99C',
            textTransform: 'uppercase',
            letterSpacing: '0.06em'
          }}>{h}</span>)}
          </div>
        </div>
        {results.map((r, i) => <div key={i} style={{
        display: 'grid',
        gridTemplateColumns: '3fr 1fr 1.5fr 1fr 80px',
        gap: 8,
        padding: '14px 20px',
        borderBottom: i < results.length - 1 ? '1px solid #F8F4EE' : 'none',
        alignItems: 'center'
      }}>
            <div>
              <div style={{
            fontSize: 14,
            fontWeight: 600,
            color: '#1E1A16'
          }}>{r.exam}</div>
              <div style={{
            fontSize: 12,
            color: '#B5A99C'
          }}>{r.cls}</div>
            </div>
            <span style={{
          fontSize: 13,
          color: '#6B6259'
        }}>{r.date}</span>
            <div>
              {r.score !== null ? <>
                  <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}>
                    <div style={{
                height: 5,
                width: 56,
                background: '#F0EAE0',
                borderRadius: 3
              }}>
                      <div style={{
                  height: '100%',
                  width: `${r.score / r.total * 100}%`,
                  background: r.score / r.total >= 0.8 ? '#2D6A4F' : r.score / r.total >= 0.6 ? '#D4922A' : '#C1440E',
                  borderRadius: 3
                }} />
                    </div>
                    <span style={{
                fontSize: 13,
                fontWeight: 600,
                color: '#1E1A16'
              }}>{r.score}/{r.total}</span>
                  </div>
                  <div style={{
              fontSize: 11,
              color: '#B5A99C',
              marginTop: 2
            }}>{Math.round(r.score / r.total * 100)}%</div>
                </> : <span style={{
            fontSize: 13,
            color: '#B5A99C'
          }}>—</span>}
            </div>
            <span>
              {r.grade ? <span className={r.grade.startsWith('A') ? 'badge-green' : r.grade.startsWith('B') ? 'badge-gold' : 'badge-red'}>{r.grade}</span> : <span style={{
            fontSize: 13,
            color: '#B5A99C'
          }}>—</span>}
            </span>
            <span><span className={r.status === 'Graded' ? 'badge-green' : 'badge-gray'}>{r.status}</span></span>
          </div>)}
      </div>

      {results.length === 0 && <div style={{
      textAlign: 'center',
      padding: '80px 40px'
    }}>
          <div style={{
        width: 64,
        height: 64,
        borderRadius: '50%',
        background: '#F0EAE0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 16px'
      }}>
            <ClipboardList size={28} color="#B5A99C" strokeWidth={1.4} />
          </div>
          <div style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 700,
        fontSize: 18,
        color: '#1E1A16',
        marginBottom: 8
      }}>No results yet</div>
          <p style={{
        fontSize: 14,
        color: '#6B6259'
      }}>Your results will appear here once your educator grades your assessments.</p>
        </div>}
    </div>;
}