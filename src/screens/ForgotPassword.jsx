import { useState } from 'react';
import { ArrowRight, KeyRound, Mail } from 'lucide-react';

export default function ForgotPassword({ navigate }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!email.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  };

  return (
    <div className="auth-recovery" style={{ minHeight: '100vh', background: '#FFF8F2', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: 'linear-gradient(135deg, #FF6B00, #FF9B4A)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ color: '#fff', fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 18 }}>S</span></div>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 22, color: '#1A1208' }}>Shuleni</span>
          </div>
        </div>

        <div className="card" style={{ padding: '36px 32px' }}>
          {!sent ? <>
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#FFF0E6', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}><KeyRound size={24} color="#FF6B00" strokeWidth={1.8} /></div>
              <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 24, color: '#1A1208', marginBottom: 8 }}>Reset your password</h1>
              <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.6 }}>Enter the email address linked to your account and we'll send a reset link.</p>
            </div>
            <div style={{ marginBottom: 20 }}><label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#3D3730', marginBottom: 6 }} htmlFor="recovery-email">Email address</label><input id="recovery-email" className="input-field" type="email" placeholder="you@school.ac.ke" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSubmit()} /></div>
            <button type="button" className="btn-primary" style={{ width: '100%', fontSize: 15, padding: '12px' }} onClick={handleSubmit} disabled={loading}>{loading ? 'Sending…' : 'Send reset link'} <ArrowRight size={14} /></button>
          </> : <div style={{ textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}><Mail size={24} color="#16A34A" strokeWidth={1.8} /></div>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 22, color: '#1A1208', marginBottom: 10 }}>Check your inbox</h2>
            <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.7, marginBottom: 22 }}>We've sent a reset link to <strong>{email}</strong>. The link expires in 30 minutes.</p>
            <div style={{ background: '#FEF3C7', border: '1px solid #F3D58A', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: '#92400E', marginBottom: 22 }}>Didn't receive it? Check your spam folder or try again.</div>
            <button type="button" className="btn-ghost" style={{ width: '100%' }} onClick={() => setSent(false)}>Try a different email</button>
          </div>}
        </div>

        <p style={{ marginTop: 20, textAlign: 'center', fontSize: 13, color: '#94A3B8' }}>Remember your password? <button type="button" className="auth-text-button" onClick={() => navigate('login')}>Sign in</button></p>
      </div>
    </div>
  );
}
