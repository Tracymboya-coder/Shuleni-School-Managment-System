import { useState } from 'react';
import { AlertCircle, ArrowRight, BookOpen, GraduationCap, ShieldCheck } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { login } from '../store/slices/authSlice';

const dashboardByRole = {
  admin: 'admin-dashboard',
  educator: 'educator-dashboard',
  student: 'student-dashboard',
};

const demoRoles = [
  { role: 'admin', label: 'School Owner / Manager', sub: 'Alice Kamau · Makini Academy', Icon: ShieldCheck, color: '#FF6B00', bg: '#FFF0E6' },
  { role: 'educator', label: 'Educator', sub: 'Ms. Grace Njeri · Form 3 East', Icon: BookOpen, color: '#16A34A', bg: '#DCFCE7' },
  { role: 'student', label: 'Student', sub: 'Brian Otieno · Form 3 East', Icon: GraduationCap, color: '#F59E0B', bg: '#FEF3C7' },
];

export default function Login({ navigate, setRole }) {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(state => state.auth.status);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [subdomain, setSubdomain] = useState('makini');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const goToDashboard = role => navigate(dashboardByRole[role] || dashboardByRole.admin);

  const quickLogin = role => {
    setError('');
    setLoading(true);
    setTimeout(() => {
      setRole(role);
      setLoading(false);
      goToDashboard(role);
    }, 700);
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setError('');
    const result = await dispatch(login({ subdomain, email, password }));
    if (!login.fulfilled.match(result)) {
      setError(result.payload || 'Could not sign in. Check your details and try again.');
      return;
    }

    const role = result.payload.user.role.toLowerCase();
    setRole(role);
    goToDashboard(role);
  };

  const isLoading = loading || authStatus === 'loading';

  return (
    <div className="auth-layout" style={{ minHeight: '100vh', background: '#FFF8F2', display: 'flex' }}>
      <div className="auth-visual" style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <img src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=900&fit=crop&auto=format" alt="Students learning together in a classroom" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,26,14,0.9) 0%, rgba(11,26,14,0.12) 60%)' }} />
        <div style={{ position: 'relative', zIndex: 2, padding: '40px 48px', marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: 'linear-gradient(135deg, #FF6B00, #FF9B4A)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ color: '#fff', fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 17 }}>S</span></div>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 20, color: '#F8FAFC' }}>Shuleni</span>
          </div>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 28, fontWeight: 900, color: '#F8FAFC', lineHeight: 1.25, marginBottom: 8 }}>"Elimu ni ufunguo<br />wa maisha."</h2>
          <p style={{ fontSize: 13, color: 'rgba(248,250,252,0.65)' }}>Education is the key to life.</p>
        </div>
      </div>

      <div className="auth-panel" style={{ width: 440, background: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '56px 44px', borderLeft: '1px solid #E8DDD2', overflowY: 'auto' }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 28, color: '#1A1208', marginBottom: 5, letterSpacing: '-0.02em' }}>Welcome back</h1>
          <p style={{ fontSize: 14, color: '#64748B' }}>Sign in to your school.</p>
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#3D3730', marginBottom: 6 }} htmlFor="school-subdomain">School</label>
          <div className="auth-subdomain" style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #E8DDD2', borderRadius: 10, overflow: 'hidden', background: '#FFF8F2' }}>
            <input id="school-subdomain" style={{ flex: 1, border: 'none', outline: 'none', padding: '10px 14px', fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#1A1208', background: 'transparent' }} value={subdomain} onChange={e => setSubdomain(e.target.value)} />
            <span style={{ padding: '10px 14px', fontSize: 13, color: '#64748B', borderLeft: '1.5px solid #E8DDD2', flexShrink: 0 }}>.shuleni.app</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 13, marginBottom: 6 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#3D3730', marginBottom: 6 }} htmlFor="login-email">Email address</label>
            <input id="login-email" className="input-field" type="email" placeholder="you@school.ac.ke" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, marginBottom: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#3D3730' }} htmlFor="login-password">Password</label>
              <button type="button" className="auth-text-button" onClick={() => navigate('forgot-password')}>Forgot password?</button>
            </div>
            <input id="login-password" className="input-field" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSignIn()} />
          </div>
        </div>

        {error && <div role="alert" style={{ background: '#FEE2E2', border: '1px solid #F2B8B5', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#B91C1C', marginBottom: 10, display: 'flex', gap: 8, alignItems: 'center' }}><AlertCircle size={14} strokeWidth={2} style={{ flexShrink: 0 }} />{error}</div>}

        <button type="button" className="btn-primary" style={{ width: '100%', fontSize: 15, padding: '12px', marginBottom: 18, marginTop: 8 }} onClick={handleSignIn} disabled={isLoading}>
          {authStatus === 'loading' ? 'Signing in…' : 'Sign in'}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ flex: 1, height: 1, background: '#E8DDD2' }} /><span style={{ fontSize: 12, color: '#94A3B8' }}>demo — sign in as</span><div style={{ flex: 1, height: 1, background: '#E8DDD2' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {demoRoles.map(r => <button type="button" key={r.role} onClick={() => quickLogin(r.role)} disabled={isLoading} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 58, padding: '11px 14px', borderRadius: 10, border: `1.5px solid ${r.bg}`, background: r.bg, cursor: 'pointer', textAlign: 'left', transition: 'border-color 0.15s, transform 0.15s', opacity: isLoading ? 0.6 : 1 }} onMouseEnter={e => { e.currentTarget.style.borderColor = r.color; e.currentTarget.style.transform = 'translateY(-1px)'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = r.bg; e.currentTarget.style.transform = ''; }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><r.Icon size={16} color={r.color} strokeWidth={1.8} /></div>
            <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 13, color: '#1A1208' }}>{r.label}</div><div style={{ fontSize: 12, color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.sub}</div></div>
            <ArrowRight size={14} color={r.color} />
          </button>)}
        </div>

        <p style={{ marginTop: 22, textAlign: 'center', fontSize: 13, color: '#94A3B8' }}>New school? <button type="button" className="auth-text-button" onClick={() => navigate('create-school')}>Create your school</button></p>
      </div>
    </div>
  );
}
