import { useState } from 'react';
import { ImagePlus, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createSchool } from '../store/slices/authSlice';
const steps = ['School details', 'Branding', 'Admin account'];
export default function CreateSchool({
  navigate
}) {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(state => state.auth.status);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '',
    subdomain: '',
    county: '',
    type: '',
    adminName: '',
    adminEmail: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const set = (k, v) => setForm(p => ({
    ...p,
    [k]: v
  })); 
  const handleNext = async () => {
    if (step < steps.length - 1) {
      setStep(s => s + 1);
      return;
    }
    setError('');
    if (!form.name || !form.subdomain || !form.adminName || !form.adminEmail || !form.password) {
      setError('Please fill in all required school and admin details.');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    const result = await dispatch(createSchool({
      schoolName: form.name,
      subdomain: form.subdomain,
      county: form.county || undefined,
      type: form.type || undefined,
      adminName: form.adminName,
      adminEmail: form.adminEmail,
      password: form.password
    }));
    if (createSchool.fulfilled.match(result)) {
      navigate('admin-dashboard');
    } else {
      setError(result.payload || 'Could not create your school. Please try again.');
    }
  };
  const counties = ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Machakos', 'Meru', 'Nyeri', 'Kakamega'];
  const types = ['National School', 'County School', 'Sub-County School', 'Private School', 'International School'];
  return <div style={{
    minHeight: '100vh',
    background: '#FAF7F0',
    display: 'flex'
  }}>
      <div style={{
      width: 400,
      background: '#1E1A16',
      padding: '48px 40px',
      display: 'flex',
      flexDirection: 'column',
      position: 'sticky',
      top: 0,
      height: '100vh'
    }}>
        <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: 48
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
          color: '#FAF7F0'
        }}>Shuleni</span>
        </div>

        <div style={{
        flex: 1
      }}>
          <h2 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          fontSize: 26,
          color: '#FAF7F0',
          lineHeight: 1.2,
          marginBottom: 10
        }}>Create your school</h2>
          <p style={{
          fontSize: 14,
          color: '#6B6259',
          lineHeight: 1.7,
          marginBottom: 40
        }}>
            Each school on Shuleni has its own isolated space. Your students, educators, and data are completely private.
          </p>

          <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}>
            {steps.map((s, i) => <div key={s} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '12px 14px',
            borderRadius: 10,
            background: i === step ? 'rgba(193,68,14,0.15)' : 'transparent',
            cursor: i <= step ? 'pointer' : 'default'
          }} onClick={() => i <= step && setStep(i)}>
                <div style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: i < step ? '#2D6A4F' : i === step ? '#C1440E' : '#3D3730',
              fontSize: 12,
              fontWeight: 700,
              color: '#fff'
            }}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span style={{
              fontSize: 14,
              fontWeight: i === step ? 600 : 400,
              color: i === step ? '#FAF7F0' : i < step ? '#6B6259' : '#4A4540'
            }}>{s}</span>
              </div>)}
          </div>
        </div>

        <div style={{
        borderTop: '1px solid #3D3730',
        paddingTop: 24
      }}>
          <div style={{
          background: '#D4EDE2',
          borderRadius: 10,
          padding: '14px 16px'
        }}>
            <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            marginBottom: 4
          }}>
              <ShieldCheck size={13} color="#1A4A35" strokeWidth={2} />
              <span style={{
              fontSize: 13,
              fontWeight: 700,
              color: '#1A4A35'
            }}>Multi-tenant isolation</span>
            </div>
            <div style={{
            fontSize: 12,
            color: '#2D6A4F',
            lineHeight: 1.6
          }}>Your school's data is completely separate. No other school can see your students, resources, or any records.</div>
          </div>
        </div>
      </div>

      <div style={{
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 40px'
    }}>
        <div style={{
        width: '100%',
        maxWidth: 460
      }}>
          <div style={{
          marginBottom: 6,
          fontSize: 13,
          color: '#B5A99C',
          fontWeight: 500
        }}>Step {step + 1} of {steps.length}</div>
          <h1 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          fontSize: 26,
          color: '#1E1A16',
          marginBottom: 26
        }}>{steps[step]}</h1>

          {step === 0 && <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 18
        }}>
              <div>
                <label style={{
              display: 'block',
              fontSize: 13,
              fontWeight: 600,
              color: '#3D3730',
              marginBottom: 6
            }}>School name</label>
                <input className="input-field" placeholder="e.g. Makini Academy" value={form.name} onChange={e => set('name', e.target.value)} />
              </div>
              <div>
                <label style={{
              display: 'block',
              fontSize: 13,
              fontWeight: 600,
              color: '#3D3730',
              marginBottom: 6
            }}>School subdomain</label>
                <div style={{
              display: 'flex',
              alignItems: 'center',
              border: '1.5px solid #E4DDD4',
              borderRadius: 8,
              overflow: 'hidden',
              background: '#fff'
            }}>
                  <input style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                padding: '10px 14px',
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                color: '#1E1A16'
              }} placeholder="makini" value={form.subdomain} onChange={e => set('subdomain', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))} />
                  <span style={{
                background: '#F0EAE0',
                padding: '10px 14px',
                fontSize: 13,
                color: '#6B6259',
                borderLeft: '1.5px solid #E4DDD4',
                flexShrink: 0
              }}>.shuleni.app</span>
                </div>
              </div>
              <div>
                <label style={{
              display: 'block',
              fontSize: 13,
              fontWeight: 600,
              color: '#3D3730',
              marginBottom: 6
            }}>County</label>
                <select className="input-field" value={form.county} onChange={e => set('county', e.target.value)}>
                  <option value="">Select county…</option>
                  {counties.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{
              display: 'block',
              fontSize: 13,
              fontWeight: 600,
              color: '#3D3730',
              marginBottom: 6
            }}>School type</label>
                <select className="input-field" value={form.type} onChange={e => set('type', e.target.value)}>
                  <option value="">Select type…</option>
                  {types.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>}

          {step === 1 && <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 18
        }}>
              <div>
                <label style={{
              display: 'block',
              fontSize: 13,
              fontWeight: 600,
              color: '#3D3730',
              marginBottom: 6
            }}>School logo</label>
                <div style={{
              border: '2px dashed #E4DDD4',
              borderRadius: 10,
              padding: '32px',
              textAlign: 'center',
              background: '#fff',
              cursor: 'pointer'
            }} onMouseEnter={e => e.currentTarget.style.borderColor = '#C1440E'} onMouseLeave={e => e.currentTarget.style.borderColor = '#E4DDD4'}>
                  <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 10
              }}>
                    <div style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: '#F0EAE0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                      <ImagePlus size={22} color="#B5A99C" strokeWidth={1.6} />
                    </div>
                  </div>
                  <div style={{
                fontSize: 14,
                fontWeight: 600,
                color: '#3D3730',
                marginBottom: 4
              }}>Upload your school logo</div>
                  <div style={{
                fontSize: 13,
                color: '#B5A99C'
              }}>PNG or SVG · 512×512px recommended</div>
                </div>
              </div>
              <div>
                <label style={{
              display: 'block',
              fontSize: 13,
              fontWeight: 600,
              color: '#3D3730',
              marginBottom: 8
            }}>Primary colour</label>
                <div style={{
              display: 'flex',
              gap: 10,
              flexWrap: 'wrap'
            }}>
                  {['#C1440E', '#2D6A4F', '#D4922A', '#1A3A5C', '#6B2D8E', '#1E1A16'].map(c => <div key={c} style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: c,
                cursor: 'pointer',
                border: '2px solid #fff',
                boxShadow: '0 0 0 2px #E4DDD4',
                transition: 'transform 0.1s'
              }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.12)'} onMouseLeave={e => e.currentTarget.style.transform = ''} />)}
                </div>
              </div>
              <div>
                <label style={{
              display: 'block',
              fontSize: 13,
              fontWeight: 600,
              color: '#3D3730',
              marginBottom: 6
            }}>School motto (optional)</label>
                <input className="input-field" placeholder="e.g. Knowledge is Power" />
              </div>
              <div style={{
            background: '#fff',
            border: '1px solid #E4DDD4',
            borderRadius: 10,
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 14
          }}>
                <div style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: '#C1440E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
              fontWeight: 800,
              color: '#fff',
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}>
                  {(form.name || 'S').charAt(0)}
                </div>
                <div>
                  <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: 15,
                color: '#1E1A16'
              }}>{form.name || 'Your School Name'}</div>
                  <div style={{
                fontSize: 13,
                color: '#B5A99C'
              }}>{form.subdomain || 'yourschool'}.shuleni.app</div>
                </div>
              </div>
            </div>}

          {step === 2 && <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 18
        }}>
              <div style={{
            background: '#FBF0D8',
            border: '1px solid #E8C980',
            borderRadius: 8,
            padding: '12px 16px',
            fontSize: 13,
            color: '#7A5218'
          }}>
                You will be the School Owner. You can invite educators and add students after setup.
              </div>
              <div>
                <label style={{
              display: 'block',
              fontSize: 13,
              fontWeight: 600,
              color: '#3D3730',
              marginBottom: 6
            }}>Full name</label>
                <input className="input-field" placeholder="e.g. Alice Kamau" value={form.adminName} onChange={e => set('adminName', e.target.value)} />
              </div>
              <div>
                <label style={{
              display: 'block',
              fontSize: 13,
              fontWeight: 600,
              color: '#3D3730',
              marginBottom: 6
            }}>Email address</label>
                <input className="input-field" type="email" placeholder="alice@school.ac.ke" value={form.adminEmail} onChange={e => set('adminEmail', e.target.value)} />
              </div>
              <div>
                <label style={{
              display: 'block',
              fontSize: 13,
              fontWeight: 600,
              color: '#3D3730',
              marginBottom: 6
            }}>Password</label>
                <input className="input-field" type="password" placeholder="Min. 8 characters" value={form.password} onChange={e => set('password', e.target.value)} />
              </div>
              <div>
                <label style={{
              display: 'block',
              fontSize: 13,
              fontWeight: 600,
              color: '#3D3730',
              marginBottom: 6
            }}>Confirm password</label>
                <input className="input-field" type="password" placeholder="Repeat your password" value={form.confirmPassword} onChange={e => set('confirmPassword', e.target.value)} />
              </div>
            </div>}

          <div style={{
          marginTop: 28,
          display: 'flex',
          gap: 10
        }}>
            {step > 0 && <button className="btn-ghost" onClick={() => setStep(s => s - 1)}>← Back</button>}
            <button className="btn-primary" style={{
            flex: 1,
            fontSize: 15,
            padding: '13px',
            opacity: authStatus === 'loading' ? 0.7 : 1
          }} onClick={handleNext} disabled={authStatus === 'loading'}>
              {authStatus === 'loading' ? 'Setting up your school…' : step === steps.length - 1 ? 'Create school →' : 'Continue →'}
            </button>
          </div>

          {error && <div style={{
          marginTop: 14,
          background: '#F4E4DC',
          border: '1px solid #E8C0A8',
          borderRadius: 8,
          padding: '10px 14px',
          fontSize: 13,
          color: '#8E3008',
          display: 'flex',
          gap: 8,
          alignItems: 'center'
        }}>
              <AlertCircle size={14} strokeWidth={2} style={{
            flexShrink: 0
          }} />
              {error}
            </div>}

          <p style={{
          marginTop: 16,
          textAlign: 'center',
          fontSize: 13,
          color: '#B5A99C'
        }}>
            Already have an account?{' '}
            <span style={{
            color: '#C1440E',
            fontWeight: 600,
            cursor: 'pointer'
          }} onClick={() => navigate('login')}>Sign in</span>
          </p>
        </div>
      </div>
    </div>;
}