import { useState } from 'react';
import { KeyRound, Mail, ArrowRight } from 'lucide-react';
export default function ForgotPassword({
  navigate
}) {
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
  return <div style={{
    minHeight: '100vh',
    background: '#FAF7F0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24
  }}>
      <div style={{
      width: '100%',
      maxWidth: 420
    }}>
        <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 32
      }}>
          <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10
        }}>
            <div style={{
            width: 36,
            height: 36,
            borderRadius: 9,
            background: '#C1440E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
              <span style={{
              color: '#fff',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: 18
            }}>S</span>
            </div>
            <span style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: 22,
            color: '#1E1A16'
          }}>Shuleni</span>
          </div>
        </div>

        <div className="card" style={{
        padding: '36px 32px'
      }}>
          {!sent ? <>
              <div style={{
            textAlign: 'center',
            marginBottom: 28
          }}>
                <div style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: '#F4E4DC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
                  <KeyRound size={24} color="#C1440E" strokeWidth={1.8} />
                </div>
                <h1 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: 22,
              color: '#1E1A16',
              marginBottom: 8
            }}>Reset your password</h1>
                <p style={{
              fontSize: 14,
              color: '#6B6259',
              lineHeight: 1.6
            }}>
                  Enter the email address linked to your account and we'll send a reset link.
                </p>
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
            }}>Email address</label>
                <input className="input-field" type="email" placeholder="you@school.ac.ke" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
              </div>

              <button className="btn-primary" style={{
            width: '100%',
            fontSize: 15,
            padding: '12px',
            opacity: loading ? 0.7 : 1
          }} onClick={handleSubmit} disabled={loading}>
                {loading ? 'Sending…' : 'Send reset link'}
              </button>
            </> : <div style={{
          textAlign: 'center'
        }}>
              <div style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: '#D4EDE2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
                <Mail size={24} color="#2D6A4F" strokeWidth={1.8} />
              </div>
              <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 20,
            color: '#1E1A16',
            marginBottom: 10
          }}>Check your inbox</h2>
              <p style={{
            fontSize: 14,
            color: '#6B6259',
            lineHeight: 1.7,
            marginBottom: 22
          }}>
                We've sent a reset link to <strong>{email}</strong>. The link expires in 30 minutes.
              </p>
              <div style={{
            background: '#FBF0D8',
            border: '1px solid #E8C980',
            borderRadius: 8,
            padding: '12px 16px',
            fontSize: 13,
            color: '#7A5218',
            marginBottom: 22
          }}>
                Didn't receive it? Check your spam folder or try again.
              </div>
              <button className="btn-ghost" style={{
            width: '100%'
          }} onClick={() => setSent(false)}>Try a different email</button>
            </div>}
        </div>

        <p style={{
        marginTop: 20,
        textAlign: 'center',
        fontSize: 13,
        color: '#B5A99C'
      }}>
          Remember your password?{' '}
          <span style={{
          color: '#C1440E',
          fontWeight: 600,
          cursor: 'pointer'
        }} onClick={() => navigate('login')}>Sign in</span>
        </p>
      </div>
    </div>;
}