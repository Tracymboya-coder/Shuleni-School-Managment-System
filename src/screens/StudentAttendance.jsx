import { ArrowLeft, PenLine } from 'lucide-react';
const records = [{
  date: 'Mon 20 Jan',
  status: 'present',
  cls: 'Form 3 East',
  signedBy: 'Ms. Njeri'
}, {
  date: 'Fri 17 Jan',
  status: 'present',
  cls: 'Form 3 East',
  signedBy: 'Ms. Njeri'
}, {
  date: 'Thu 16 Jan',
  status: 'late',
  cls: 'Form 3 East',
  signedBy: 'Ms. Njeri'
}, {
  date: 'Wed 15 Jan',
  status: 'present',
  cls: 'Form 3 East',
  signedBy: 'Ms. Njeri'
}, {
  date: 'Tue 14 Jan',
  status: 'present',
  cls: 'Form 3 East',
  signedBy: 'Ms. Njeri'
}, {
  date: 'Mon 13 Jan',
  status: 'absent',
  cls: 'Form 3 East',
  signedBy: 'Ms. Njeri'
}, {
  date: 'Fri 10 Jan',
  status: 'present',
  cls: 'Form 3 East',
  signedBy: 'Ms. Njeri'
}, {
  date: 'Thu 9 Jan',
  status: 'present',
  cls: 'Form 3 East',
  signedBy: 'Ms. Njeri'
}, {
  date: 'Wed 8 Jan',
  status: 'present',
  cls: 'Form 3 East',
  signedBy: 'Ms. Njeri'
}, {
  date: 'Tue 7 Jan',
  status: 'absent',
  cls: 'Form 3 East',
  signedBy: 'Ms. Njeri'
}];
export default function StudentAttendance({
  navigate
}) {
  const present = records.filter(r => r.status === 'present').length;
  const absent = records.filter(r => r.status === 'absent').length;
  const late = records.filter(r => r.status === 'late').length;
  const rate = Math.round(present / records.length * 100);
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
    }}>My Attendance</h1>
      <p style={{
      fontSize: 14,
      color: '#6B6259',
      marginBottom: 24
    }}>Brian Otieno · Form 3 East · Term 1, 2025</p>

      <div style={{
      background: '#1E1A16',
      borderRadius: 14,
      padding: '22px 28px',
      marginBottom: 24,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
        <div>
          <div style={{
          fontSize: 13,
          color: 'rgba(250,247,240,0.55)',
          marginBottom: 2
        }}>Attendance rate</div>
          <div style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          fontSize: 44,
          color: rate >= 90 ? '#2D6A4F' : rate >= 75 ? '#D4922A' : '#C1440E',
          lineHeight: 1
        }}>{rate}%</div>
          <div style={{
          fontSize: 13,
          color: 'rgba(250,247,240,0.55)',
          marginTop: 4
        }}>{records.length} school days recorded</div>
        </div>
        <div style={{
        display: 'flex',
        gap: 20
      }}>
          {[{
          label: 'Present',
          value: present,
          color: '#2D6A4F'
        }, {
          label: 'Absent',
          value: absent,
          color: '#C1440E'
        }, {
          label: 'Late',
          value: late,
          color: '#D4922A'
        }].map(s => <div key={s.label} style={{
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
            color: 'rgba(250,247,240,0.55)'
          }}>{s.label}</div>
            </div>)}
        </div>
      </div>

      <div style={{
      marginBottom: 24
    }}>
        <div style={{
        display: 'flex',
        gap: 2,
        height: 10,
        borderRadius: 5,
        overflow: 'hidden'
      }}>
          {records.map((r, i) => <div key={i} style={{
          flex: 1,
          background: r.status === 'present' ? '#2D6A4F' : r.status === 'late' ? '#D4922A' : '#C1440E'
        }} />)}
        </div>
        <div style={{
        display: 'flex',
        gap: 16,
        marginTop: 8
      }}>
          {[{
          color: '#2D6A4F',
          label: 'Present'
        }, {
          color: '#D4922A',
          label: 'Late'
        }, {
          color: '#C1440E',
          label: 'Absent'
        }].map(s => <div key={s.label} style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }}>
              <div style={{
            width: 10,
            height: 10,
            borderRadius: 2,
            background: s.color
          }} />
              <span style={{
            fontSize: 12,
            color: '#6B6259'
          }}>{s.label}</span>
            </div>)}
        </div>
      </div>

      <div className="card" style={{
      overflow: 'hidden'
    }}>
        <div style={{
        padding: '14px 18px',
        borderBottom: '1px solid #F0EAE0',
        background: '#FAF7F0'
      }}>
          <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 2fr',
          gap: 8
        }}>
            {['Date', 'Status', 'Signed by'].map(h => <span key={h} style={{
            fontSize: 11,
            fontWeight: 700,
            color: '#B5A99C',
            textTransform: 'uppercase',
            letterSpacing: '0.06em'
          }}>{h}</span>)}
          </div>
        </div>
        {records.map((r, i) => <div key={i} style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 2fr',
        gap: 8,
        padding: '13px 18px',
        borderBottom: i < records.length - 1 ? '1px solid #F8F4EE' : 'none',
        alignItems: 'center'
      }}>
            <span style={{
          fontSize: 14,
          fontWeight: 600,
          color: '#1E1A16'
        }}>{r.date}</span>
            <span>
              <span className={r.status === 'present' ? 'badge-green' : r.status === 'late' ? 'badge-gold' : 'badge-red'}>
                {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
              </span>
            </span>
            <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }}>
              <PenLine size={12} color="#B5A99C" strokeWidth={1.6} />
              <span style={{
            fontSize: 13,
            color: '#6B6259'
          }}>{r.signedBy}</span>
            </div>
          </div>)}
      </div>
    </div>;
}