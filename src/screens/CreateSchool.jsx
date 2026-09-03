import { useState } from 'react';
import { AlertCircle, ImagePlus, ShieldCheck } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createSchool } from '../store/slices/authSlice';

const steps = ['School details', 'Branding', 'Admin account'];
const counties = ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Machakos', 'Meru', 'Nyeri', 'Kakamega'];
const types = ['National School', 'County School', 'Sub-County School', 'Private School', 'International School'];
const brandColors = ['#FF6B00', '#16A34A', '#F59E0B', '#1A3A5C', '#7C3AED', '#1A1208'];

export default function CreateSchool({ navigate }) {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(state => state.auth.status);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: '', subdomain: '', county: '', type: '', adminName: '', adminEmail: '', password: '' });
  const [error, setError] = useState('');
  const set = (key, value) => setForm(previous => ({ ...previous, [key]: value }));

  const handleNext = async () => {
    if (step < steps.length - 1) {
      setStep(current => current + 1);
      return;
    }

    setError('');
    if (!form.adminName || !form.adminEmail || !form.password) {
      setError('Please fill in your name, email, and password.');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    const result = await dispatch(createSchool({
      schoolName: form.name,
      subdomain: form.subdomain,
      county: form.county || undefined,
      type: form.type || undefined,
      adminName: form.adminName,
      adminEmail: form.adminEmail,
      password: form.password,
    }));

    if (!createSchool.fulfilled.match(result)) {
      setError(result.payload || 'Could not create your school. Please try again.');
      return;
    }
    navigate('admin-dashboard');
  };

  return (
    <div className="school-create-layout" style={{ minHeight: '100vh', background: '#FFF8F2', display: 'flex' }}>
      <aside className="school-create-sidebar" style={{ width: 400, background: '#0B1A0E', padding: '48px 40px', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 48 }}>
          <div style={{ width: 36, height: 36, borderRadius: 9, background: 'linear-gradient(135deg, #FF6B00, #FF9B4A)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ color: '#fff', fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 18 }}>S</span></div>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 22, color: '#F8FAFC' }}>Shuleni</span>
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 28, color: '#F8FAFC', lineHeight: 1.2, marginBottom: 10 }}>Create your school</h2>
          <p style={{ fontSize: 14, color: 'rgba(248,250,252,0.55)', lineHeight: 1.7, marginBottom: 40 }}>Each school on Shuleni has its own isolated space. Your students, educators, and data are completely private.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {steps.map((label, index) => <button type="button" key={label} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 14px', border: 0, borderRadius: 10, background: index === step ? 'rgba(255,107,0,0.15)' : 'transparent', cursor: index <= step ? 'pointer' : 'default', textAlign: 'left', color: '#fff' }} onClick={() => index <= step && setStep(index)}>
              <span style={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: index < step ? '#16A34A' : index === step ? '#FF6B00' : '#162B1A', fontSize: 12, fontWeight: 700, color: '#fff' }}>{index < step ? '✓' : index + 1}</span>
              <span style={{ fontSize: 14, fontWeight: index === step ? 700 : 400, color: index === step ? '#F8FAFC' : index < step ? '#94A3B8' : '#64748B' }}>{label}</span>
            </button>)}
          </div>
        </div>
        <div style={{ borderTop: '1px solid #2A4A30', paddingTop: 24 }}>
          <div style={{ background: '#DCFCE7', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}><ShieldCheck size={13} color="#15803D" strokeWidth={2} /><span style={{ fontSize: 13, fontWeight: 700, color: '#15803D' }}>Multi-tenant isolation</span></div>
            <div style={{ fontSize: 12, color: '#166534', lineHeight: 1.6 }}>Your school's data is completely separate. No other school can see your students, resources, or any records.</div>
          </div>
        </div>
      </aside>

      <div className="school-create-form" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 40px' }}>
        <div style={{ width: '100%', maxWidth: 460 }}>
          <div style={{ marginBottom: 6, fontSize: 13, color: '#94A3B8', fontWeight: 600 }}>Step {step + 1} of {steps.length}</div>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 28, color: '#1A1208', marginBottom: 26, letterSpacing: '-0.02em' }}>{steps[step]}</h1>

          {step === 0 && <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div><label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#3D3730', marginBottom: 6 }} htmlFor="school-name">School name</label><input id="school-name" className="input-field" placeholder="e.g. Makini Academy" value={form.name} onChange={e => set('name', e.target.value)} /></div>
            <div><label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#3D3730', marginBottom: 6 }} htmlFor="school-subdomain-create">School subdomain</label><div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #E8DDD2', borderRadius: 10, overflow: 'hidden', background: '#fff' }}><input id="school-subdomain-create" style={{ flex: 1, border: 'none', outline: 'none', padding: '10px 14px', fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#1A1208' }} placeholder="makini" value={form.subdomain} onChange={e => set('subdomain', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))} /><span style={{ background: '#F5EFE8', padding: '10px 14px', fontSize: 13, color: '#64748B', borderLeft: '1.5px solid #E8DDD2', flexShrink: 0 }}>.shuleni.app</span></div></div>
            <div><label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#3D3730', marginBottom: 6 }} htmlFor="school-county">County</label><select id="school-county" className="input-field" value={form.county} onChange={e => set('county', e.target.value)}><option value="">Select county…</option>{counties.map(county => <option key={county}>{county}</option>)}</select></div>
            <div><label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#3D3730', marginBottom: 6 }} htmlFor="school-type">School type</label><select id="school-type" className="input-field" value={form.type} onChange={e => set('type', e.target.value)}><option value="">Select type…</option>{types.map(type => <option key={type}>{type}</option>)}</select></div>
          </div>}

          {step === 1 && <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div><label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#3D3730', marginBottom: 6 }}>School logo</label><div className="upload-dropzone" style={{ border: '2px dashed #E8DDD2', borderRadius: 10, padding: '32px', textAlign: 'center', background: '#fff', cursor: 'pointer' }}><div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}><div style={{ width: 52, height: 52, borderRadius: '50%', background: '#F5EFE8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ImagePlus size={22} color="#94A3B8" strokeWidth={1.6} /></div></div><div style={{ fontSize: 14, fontWeight: 600, color: '#3D3730', marginBottom: 4 }}>Upload your school logo</div><div style={{ fontSize: 13, color: '#94A3B8' }}>PNG or SVG · 512×512px recommended</div></div></div>
            <div><label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#3D3730', marginBottom: 8 }}>Primary colour</label><div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>{brandColors.map(color => <button type="button" aria-label={`Choose ${color}`} key={color} className="brand-color-swatch" style={{ width: 36, height: 36, borderRadius: 8, background: color, cursor: 'pointer', border: '2px solid #fff', boxShadow: '0 0 0 2px #E8DDD2', transition: 'transform 0.1s' }} />)}</div></div>
            <div><label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#3D3730', marginBottom: 6 }} htmlFor="school-motto">School motto (optional)</label><input id="school-motto" className="input-field" placeholder="e.g. Knowledge is Power" /></div>
            <div style={{ background: '#fff', border: '1px solid #E8DDD2', borderRadius: 10, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}><div style={{ width: 44, height: 44, borderRadius: 10, background: '#FF6B00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 900, color: '#fff', fontFamily: "'Outfit', sans-serif" }}>{(form.name || 'S').charAt(0)}</div><div><div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 15, color: '#1A1208' }}>{form.name || 'Your School Name'}</div><div style={{ fontSize: 13, color: '#94A3B8' }}>{form.subdomain || 'yourschool'}.shuleni.app</div></div></div>
          </div>}

          {step === 2 && <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ background: '#FEF3C7', border: '1px solid #F3D58A', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: '#92400E' }}>You will be the School Owner. You can invite educators and add students after setup.</div>
            <div><label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#3D3730', marginBottom: 6 }} htmlFor="admin-name">Full name</label><input id="admin-name" className="input-field" placeholder="e.g. Alice Kamau" value={form.adminName} onChange={e => set('adminName', e.target.value)} /></div>
            <div><label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#3D3730', marginBottom: 6 }} htmlFor="admin-email">Email address</label><input id="admin-email" className="input-field" type="email" placeholder="alice@school.ac.ke" value={form.adminEmail} onChange={e => set('adminEmail', e.target.value)} /></div>
            <div><label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#3D3730', marginBottom: 6 }} htmlFor="admin-password">Password</label><input id="admin-password" className="input-field" type="password" placeholder="Min. 8 characters" value={form.password} onChange={e => set('password', e.target.value)} /></div>
            <div><label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#3D3730', marginBottom: 6 }} htmlFor="admin-password-confirm">Confirm password</label><input id="admin-password-confirm" className="input-field" type="password" placeholder="Repeat your password" /></div>
          </div>}

          <div style={{ marginTop: 28, display: 'flex', gap: 10 }}>{step > 0 && <button type="button" className="btn-ghost" onClick={() => setStep(current => current - 1)}>← Back</button>}<button type="button" className="btn-primary" style={{ flex: 1, fontSize: 15, padding: '13px' }} onClick={handleNext} disabled={authStatus === 'loading'}>{authStatus === 'loading' ? 'Setting up your school…' : step === steps.length - 1 ? 'Create school →' : 'Continue →'}</button></div>
          {error && <div role="alert" style={{ marginTop: 14, background: '#FEE2E2', border: '1px solid #F2B8B5', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#B91C1C', display: 'flex', gap: 8, alignItems: 'center' }}><AlertCircle size={14} strokeWidth={2} style={{ flexShrink: 0 }} />{error}</div>}
          <p style={{ marginTop: 16, textAlign: 'center', fontSize: 13, color: '#94A3B8' }}>Already have an account? <button type="button" className="auth-text-button" onClick={() => navigate('login')}>Sign in</button></p>
        </div>
      </div>
    </div>
  );
}
