import { useState } from 'react';
import { ShieldCheck, BookOpen, GraduationCap, ArrowRight, AlertCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { login } from '../store/slices/authSlice';
import classroomImg from '../../Public/Assets/classroom.png';
export default function Login({
  navigate,
  setRole
}) {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(state => state.auth.status);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [subdomain, setSubdomain] = useState('makini');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const quickLogin = role => {
    setError('');
    setLoading(true);
    setTimeout(() => {
      setRole(role);
      setLoading(false);
      if (role === 'student') navigate('student-dashboard');else if (role === 'educator') navigate('educator-dashboard');else navigate('admin-dashboard');
    }, 700);
  };

  // Real sign-in against the Flask API. The demo buttons below (quickLogin) stay as a
  // fast local-only shortcut for exploring the UI without a backend running.
  const handleSignIn = async () => {
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }
    setError('');
    const result = await dispatch(login({
      subdomain,
      email,
      password
    }));
    if (login.fulfilled.match(result)) {
      const role = result.payload.user.role.toLowerCase();
      setRole(role);
      if (role === 'student') navigate('student-dashboard');else if (role === 'educator') navigate('educator-dashboard');else navigate('admin-dashboard');
    } else {
      setError(result.payload || 'Could not sign in. Check your details and try again.');
    }
  };
  const demoRoles = [{
    role: 'admin',
    label: 'School Owner / Manager',
    sub: 'Alice Kamau · Makini Academy',
    Icon: ShieldCheck,
    color: '#C1440E',
    bg: '#F4E4DC'
  }, {
    role: 'educator',
    label: 'Educator',
    sub: 'Ms. Grace Njeri · Form 3 East',
    Icon: BookOpen,
    color: '#2D6A4F',
    bg: '#D4EDE2'
  }, {
    role: 'student',
    label: 'Student',
    sub: 'Brian Otieno · Form 3 East',
    Icon: GraduationCap,
    color: '#D4922A',
    bg: '#FBF0D8'
  }];
  return <div style={{
    minHeight: '100vh',
    background: '#FAF7F0',
    display: 'flex'
  }}>
      {/* Left: image */}
      <div style={{
      flex: 1,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end'
    }}>
        <img src={classroomImg} alt="Students in a classroom" style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }} />
        <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(30,26,22,0.88) 0%, rgba(30,26,22,0.1) 60%)'
      }} />
        <div style={{
        position: 'relative',
        zIndex: 2,
        padding: '40px 48px',
        marginBottom: 32
      }}>
          <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 28
        }}>
            <div style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            background: '#C1440E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
              <span style={{
              color: '#fff',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: 17
            }}>S</span>
            </div>
            <span style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: 20,
            color: '#FAF7F0'
          }}>Shuleni</span>
          </div>
          <h2 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 26,
          fontWeight: 800,
          color: '#FAF7F0',
          lineHeight: 1.3,
          marginBottom: 8
        }}>
            "Elimu ni ufunguo<br />wa maisha."
          </h2>
          <p style={{
          fontSize: 13,
          color: 'rgba(250,247,240,0.65)'
        }}>Education is the key to life.</p>
        </div>
      </div>

      {/* Right: form */}
      <div style={{
      width: 440,
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '56px 44px',
      borderLeft: '1px solid #E4DDD4',
      overflowY: 'auto'
    }}>
        <div style={{
        marginBottom: 28
      }}>
          <h1 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          fontSize: 26,
          color: '#1E1A16',
          marginBottom: 5
        }}>Welcome back</h1>
          <p style={{
          fontSize: 14,
          color: '#6B6259'
        }}>Sign in to your school.</p>
        </div>

        <div style={{
        marginBottom: 14
      }}>
          <label style={{
          display: 'block',
          fontSize: 13,
          fontWeight: 600,
          color: '#3D3730',
          marginBottom: 6
        }}>School</label>
          <div style={{
          display: 'flex',
          alignItems: 'center',
          border: '1.5px solid #E4DDD4',
          borderRadius: 8,
          overflow: 'hidden',
          background: '#FAF7F0'
        }}>
            <input style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            padding: '10px 14px',
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            color: '#1E1A16',
            background: 'transparent'
          }} value={subdomain} onChange={e => setSubdomain(e.target.value)} />
            <span style={{
            padding: '10px 14px',
            fontSize: 13,
            color: '#6B6259',
            borderLeft: '1.5px solid #E4DDD4',
            flexShrink: 0
          }}>.shuleni.app</span>
          </div>
        </div>

        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 13,
        marginBottom: 6
      }}>
          <div>
            <label style={{
            display: 'block',
            fontSize: 13,
            fontWeight: 600,
            color: '#3D3730',
            marginBottom: 6
          }}>Email address</label>
            <input className="input-field" type="email" placeholder="you@school.ac.ke" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 6
          }}>
              <label style={{
              fontSize: 13,
              fontWeight: 600,
              color: '#3D3730'
            }}>Password</label>
              <span style={{
              fontSize: 13,
              color: '#C1440E',
              cursor: 'pointer',
              fontWeight: 500
            }} onClick={() => navigate('forgot-password')}>Forgot password?</span>
            </div>
            <input className="input-field" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSignIn()} />
          </div>
        </div>

        {error && <div style={{
        background: '#F4E4DC',
        border: '1px solid #E8C0A8',
        borderRadius: 8,
        padding: '10px 14px',
        fontSize: 13,
        color: '#8E3008',
        marginBottom: 10,
        display: 'flex',
        gap: 8,
        alignItems: 'center'
      }}>
            <AlertCircle size={14} strokeWidth={2} style={{
          flexShrink: 0
        }} />
            {error}
          </div>}

        <button className="btn-primary" style={{
        width: '100%',
        fontSize: 15,
        padding: '12px',
        marginBottom: 18,
        marginTop: 8,
        opacity: loading || authStatus === 'loading' ? 0.7 : 1
      }} onClick={handleSignIn} disabled={loading || authStatus === 'loading'}>
          {authStatus === 'loading' ? 'Signing in…' : 'Sign in'}
        </button>

        <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: 14
      }}>
          <div style={{
          flex: 1,
          height: 1,
          background: '#E4DDD4'
        }} />
          <span style={{
          fontSize: 12,
          color: '#B5A99C'
        }}>demo — sign in as</span>
          <div style={{
          flex: 1,
          height: 1,
          background: '#E4DDD4'
        }} />
        </div>

        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }}>
          {demoRoles.map(r => <button key={r.role} onClick={() => quickLogin(r.role)} disabled={loading} style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '11px 14px',
          borderRadius: 9,
          border: `1.5px solid ${r.bg}`,
          background: r.bg,
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'border-color 0.15s',
          opacity: loading ? 0.6 : 1
        }} onMouseEnter={e => e.currentTarget.style.borderColor = r.color} onMouseLeave={e => e.currentTarget.style.borderColor = r.bg}>
              <div style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
                <r.Icon size={16} color={r.color} strokeWidth={1.8} />
              </div>
              <div style={{
            flex: 1
          }}>
                <div style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: 13,
              color: '#1E1A16'
            }}>{r.label}</div>
                <div style={{
              fontSize: 12,
              color: '#6B6259'
            }}>{r.sub}</div>
              </div>
              <ArrowRight size={14} color={r.color} />
            </button>)}
        </div>

        <p style={{
        marginTop: 22,
        textAlign: 'center',
        fontSize: 13,
        color: '#B5A99C'
      }}>
          New school?{' '}
          <span style={{
          color: '#C1440E',
          fontWeight: 600,
          cursor: 'pointer'
        }} onClick={() => navigate('create-school')}>Create your school</span>
        </p>
      </div>
    </div>;
}