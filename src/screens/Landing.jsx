import {
  ArrowRight,
  BarChart2,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  FolderOpen,
  GraduationCap,
  MessageSquare,
  School,
  ShieldCheck,
  Star,
  Users,
  Zap,
} from 'lucide-react';

const features = [
  { Icon: ClipboardCheck, title: 'Attendance tracking', desc: 'Digital roll call in under 2 minutes. Educators sign off records and build a reliable attendance history.' },
  { Icon: FileText, title: 'Online assessments', desc: 'Build timed MCQ, short-answer, and essay exams. Anti-cheat and auto-grading built in.' },
  { Icon: FolderOpen, title: 'Resource library', desc: 'A school-specific digital library. Notes and materials shared per class with access controls.' },
  { Icon: MessageSquare, title: 'Class chat', desc: 'Private, class-based messaging. Educators and students communicate in a safe, school-managed space.' },
  { Icon: BarChart2, title: 'Role dashboards', desc: 'School owners, educators, and students each see only what their role allows — nothing more.' },
  { Icon: School, title: 'Multi-school platform', desc: 'Each school operates in complete isolation. Students, educators, and data never cross school boundaries.' },
];

const roles = [
  { role: 'School Owner', Icon: ShieldCheck, desc: 'Full visibility — manage educators, students, classes, resources, attendance, and exams across the whole school.', color: '#FF6B00', bg: '#FFF0E6', screen: 'admin-dashboard' },
  { role: 'Educator', Icon: BookOpen, desc: 'Manage your classes: take attendance, create exams, upload resources, and chat with students.', color: '#16A34A', bg: '#DCFCE7', screen: 'educator-dashboard' },
  { role: 'Student', Icon: GraduationCap, desc: 'Access your classes: view resources, take exams, check attendance, see results, and chat with educators.', color: '#F59E0B', bg: '#FEF3C7', screen: 'student-dashboard' },
];

const stats = [
  { value: '240+', label: 'Schools onboarded' },
  { value: '94K', label: 'Active students' },
  { value: '98%', label: 'Attendance accuracy' },
  { value: '47', label: 'Counties covered' },
];

const studentAccess = [
  { Icon: FileText, text: 'Take online exams', color: '#FF6B00', bg: '#FFF0E6' },
  { Icon: BarChart2, text: 'View my results', color: '#16A34A', bg: '#DCFCE7' },
  { Icon: ClipboardCheck, text: 'Check attendance', color: '#F59E0B', bg: '#FEF3C7' },
  { Icon: MessageSquare, text: 'Class chat', color: '#7C3AED', bg: '#EDE9FE' },
];

const educatorProof = [
  'Digital roll call in under 2 minutes',
  'Auto-grade MCQ exams instantly',
  'Share resources with specific classes',
  "Track every student's progress over time",
];

export default function Landing({ navigate }) {
  return (
    <div className="landing-page" style={{ background: '#FFF8F2', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      <nav className="landing-nav" style={{ background: 'rgba(255,248,242,0.95)', borderBottom: '1px solid #EDE5DC', padding: '0 48px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 20, backdropFilter: 'blur(8px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg, #FF6B00, #FF9B4A)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(255,107,0,0.35)' }}>
            <span style={{ color: '#fff', fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 19, letterSpacing: '-0.03em' }}>S</span>
          </div>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 22, color: '#1A1208', letterSpacing: '-0.02em' }}>Shuleni</span>
        </div>
        <div className="landing-nav-actions" style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button type="button" className="btn-ghost" onClick={() => navigate('login')}>Sign in</button>
          <button type="button" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14 }} onClick={() => navigate('create-school')}>
            Create your school <ArrowRight size={14} strokeWidth={2.5} />
          </button>
        </div>
      </nav>

      <section className="landing-hero" style={{ background: 'linear-gradient(160deg, #0B1A0E 0%, #0F2A14 60%, #162B1A 100%)', padding: '90px 48px 0', overflow: 'hidden', position: 'relative' }}>
        <div aria-hidden="true" style={{ position: 'absolute', top: '20%', left: '30%', width: 600, height: 600, background: 'radial-gradient(ellipse, rgba(255,107,0,0.12) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', top: 0, right: '10%', width: 400, height: 400, background: 'radial-gradient(ellipse, rgba(22,163,74,0.1) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div className="landing-container" style={{ maxWidth: 1120, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,107,0,0.12)', border: '1px solid rgba(255,107,0,0.3)', borderRadius: 20, padding: '5px 16px', marginBottom: 28 }}>
            <Zap size={12} color="#FF8C3A" strokeWidth={2.5} fill="#FF8C3A" />
            <span></span>
          </div>

          <div className="landing-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'flex-end' }}>
            <div style={{ paddingBottom: 64 }}>
              <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(40px, 5vw, 62px)', fontWeight: 900, color: '#F8FAFC', lineHeight: 1.05, marginBottom: 20, letterSpacing: '-0.03em' }}>
                Every school.<br />
                <span style={{ color: '#FF6B00' }}>Completely yours.</span>
              </h1>
              <p style={{ fontSize: 18, lineHeight: 1.75, color: 'rgba(248,250,252,0.65)', marginBottom: 36, maxWidth: 460, fontFamily: "'Inter', sans-serif" }}>
                Shuleni gives Kenyan schools a single platform for attendance, online exams, learning resources, and class communication — with every school in its own private space.
              </p>
              <div className="landing-hero-actions" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 44 }}>
                <button type="button" className="landing-hero-primary" onClick={() => navigate('create-school')}>
                  Create your school — free <ArrowRight size={15} strokeWidth={2.5} />
                </button>
                <button type="button" className="landing-hero-secondary" onClick={() => navigate('login')}>Sign in</button>
              </div>
              <div className="landing-stats" style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
                {stats.map(s => <div key={s.label}>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 24, color: '#FF8C3A', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 3, fontFamily: "'Inter', sans-serif" }}>{s.label}</div>
                </div>)}
              </div>
            </div>

            <div className="landing-hero-media" style={{ position: 'relative', paddingBottom: 0 }}>
              <div style={{ borderRadius: '16px 16px 0 0', overflow: 'hidden', boxShadow: '0 -8px 60px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderBottom: 'none' }}>
                <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=680&h=460&fit=crop&auto=format" alt="Students learning together in a classroom" style={{ width: '100%', height: 380, objectFit: 'cover', display: 'block', filter: 'brightness(0.92) saturate(1.1)' }} />
              </div>
              <div className="landing-attendance-card" style={{ position: 'absolute', bottom: 20, left: -24, background: '#fff', borderRadius: 14, padding: '14px 18px', boxShadow: '0 12px 36px rgba(0,0,0,0.2)', border: '1px solid #EDE5DC', minWidth: 180 }}>
                <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 3, fontFamily: "'Outfit', sans-serif", fontWeight: 500 }}>Today · Form 3 East</div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 28, color: '#16A34A', lineHeight: 1 }}>94%</div>
                <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>45 of 47 present</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-proof-bar" style={{ background: '#FF6B00', padding: '24px 48px' }}>
        <div className="landing-proof-grid" style={{ maxWidth: 1120, margin: '0 auto', display: 'flex', justifyContent: 'center', gap: 64, flexWrap: 'wrap' }}>
          {[
            { value: 'KCSE-Ready', label: 'Exam format aligned' },
            { value: 'Multi-tenant', label: 'Every school isolated' },
            { value: 'Real-time', label: 'Attendance & chat' },
            { value: '3 roles', label: 'Owner · Educator · Student' },
          ].map(s => <div key={s.label} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 18, color: '#fff', letterSpacing: '-0.02em' }}>{s.value}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', marginTop: 2, fontFamily: "'Inter', sans-serif" }}>{s.label}</div>
          </div>)}
        </div>
      </section>

      <section className="landing-light-section" style={{ background: '#FFF8F2', padding: '80px 48px' }}>
        <div className="landing-container" style={{ maxWidth: 1120, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ display: 'inline-block', background: '#FFF0E6', borderRadius: 8, padding: '4px 14px', fontSize: 12, fontWeight: 700, color: '#CC5500', marginBottom: 12, fontFamily: "'Outfit', sans-serif", letterSpacing: '0.05em', textTransform: 'uppercase' }}>Three roles</div>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 38, fontWeight: 900, color: '#1A1208', marginBottom: 10, letterSpacing: '-0.03em' }}>One platform for everyone.</h2>
            <p style={{ fontSize: 16, color: '#64748B' }}>Each role sees only what they're authorised to access.</p>
          </div>
          <div className="landing-role-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {roles.map(r => <button type="button" key={r.role} onClick={() => navigate(r.screen)} className="landing-role-card" style={{ background: '#fff', borderRadius: 16, border: `2px solid ${r.bg}`, padding: '28px 26px', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left', color: '#1A1208' }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: r.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                <r.Icon size={24} color={r.color} strokeWidth={1.8} />
              </div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 20, marginBottom: 10 }}>{r.role}</div>
              <p style={{ fontSize: 14, lineHeight: 1.75, color: '#64748B' }}>{r.desc}</p>
              <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 700, color: r.color, fontFamily: "'Outfit', sans-serif" }}>Try demo <ArrowRight size={13} strokeWidth={2.5} /></div>
            </button>)}
          </div>
        </div>
      </section>

      <section className="landing-dark-section" style={{ background: '#0B1A0E', padding: '80px 48px' }}>
        <div className="landing-container" style={{ maxWidth: 1120, margin: '0 auto' }}>
          <div className="landing-secondary-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center', marginBottom: 64 }}>
            <div style={{ position: 'relative' }}>
              <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
                <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=580&h=440&fit=crop&auto=format" alt="Teacher working with students in a classroom" style={{ width: '100%', height: 380, objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ position: 'absolute', top: -16, right: -16, background: '#FF6B00', borderRadius: 14, padding: '16px 20px', boxShadow: '0 8px 28px rgba(255,107,0,0.4)' }}>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 28, color: '#fff', lineHeight: 1 }}>2 min</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2 }}>avg roll call time</div>
              </div>
            </div>
            <div>
              <div style={{ display: 'inline-block', background: 'rgba(22,163,74,0.15)', borderRadius: 8, padding: '4px 14px', fontSize: 12, fontWeight: 700, color: '#4ADE80', marginBottom: 16, fontFamily: "'Outfit', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>Built for educators</div>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 36, fontWeight: 900, color: '#F8FAFC', marginBottom: 16, lineHeight: 1.15, letterSpacing: '-0.03em' }}>Less paperwork.<br />More teaching.</h2>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: 'rgba(248,250,252,0.6)', marginBottom: 28 }}>Shuleni removes the administrative burden so educators can focus on what matters — their students.</p>
              {educatorProof.map(item => <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: 'rgba(248,250,252,0.85)', marginBottom: 12, fontFamily: "'Inter', sans-serif" }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(22,163,74,0.2)', border: '1.5px solid #16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><CheckCircle2 size={11} color="#4ADE80" strokeWidth={2.5} /></div>
                {item}
              </div>)}
            </div>
          </div>

          <div className="landing-feature-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {features.map(f => <div key={f.title} className="landing-feature-card" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '24px 22px', transition: 'background 0.2s' }}>
              <div style={{ width: 42, height: 42, borderRadius: 11, background: 'rgba(255,107,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}><f.Icon size={19} color="#FF8C3A" strokeWidth={1.8} /></div>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 16, color: '#F8FAFC', marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.75, color: 'rgba(248,250,252,0.5)' }}>{f.desc}</p>
            </div>)}
          </div>
        </div>
      </section>

      <section className="landing-light-section" style={{ background: '#FFF8F2', padding: '80px 48px' }}>
        <div className="landing-secondary-grid landing-student-grid" style={{ maxWidth: 1120, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-block', background: '#FEF3C7', borderRadius: 8, padding: '4px 14px', fontSize: 12, fontWeight: 700, color: '#B45309', marginBottom: 16, fontFamily: "'Outfit', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>For students</div>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 36, fontWeight: 900, color: '#1A1208', marginBottom: 16, letterSpacing: '-0.03em', lineHeight: 1.15 }}>Everything a student needs in one place.</h2>
            <p style={{ fontSize: 15, lineHeight: 1.9, color: '#64748B', marginBottom: 28 }}>From taking exams to checking attendance records — students have full visibility into their academic journey.</p>
            <div className="landing-student-access" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {studentAccess.map(a => <div key={a.text} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 12, background: a.bg, border: `1px solid ${a.bg}` }}><a.Icon size={16} color={a.color} strokeWidth={1.8} /><span style={{ fontSize: 13, fontWeight: 600, color: '#1A1208', fontFamily: "'Outfit', sans-serif" }}>{a.text}</span></div>)}
            </div>
          </div>
          <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 16px 48px rgba(26,18,8,0.14)', border: '1px solid #EDE5DC' }}>
            <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=580&h=440&fit=crop&auto=format" alt="Students working at school desks" style={{ width: '100%', height: 380, objectFit: 'cover', display: 'block' }} />
          </div>
        </div>
      </section>

      <section className="landing-cta" style={{ background: 'linear-gradient(135deg, #FF6B00 0%, #E05A00 100%)', padding: '80px 48px', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', top: -40, right: -40, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
        <div className="landing-cta-inner" style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 20 }}>{[1, 2, 3, 4, 5].map(i => <Star key={i} size={18} color="#FFD700" fill="#FFD700" strokeWidth={1} />)}</div>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 40, fontWeight: 900, color: '#fff', marginBottom: 14, letterSpacing: '-0.03em', lineHeight: 1.1 }}>Ready to transform your school?</h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.85)', marginBottom: 36, lineHeight: 1.7 }}>Join hundreds of Kenyan schools already running on Shuleni. Free to start — no credit card needed.</p>
          <div className="landing-cta-actions" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button type="button" className="landing-cta-primary" onClick={() => navigate('create-school')}>Create your school <ArrowRight size={15} strokeWidth={2.5} /></button>
            <button type="button" className="landing-cta-secondary" onClick={() => navigate('login')}>View demo</button>
          </div>
        </div>
      </section>

      <footer className="landing-footer" style={{ borderTop: '1px solid #EDE5DC', background: '#0B1A0E', padding: '28px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg, #FF6B00, #FF9B4A)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ color: '#fff', fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 14 }}>S</span></div>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 16, color: '#F8FAFC' }}>Shuleni</span>
        </div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', fontFamily: "'Inter', sans-serif" }}>© 2025 Shuleni · Nairobi, Kenya</div>
        <div style={{ display: 'flex', gap: 20 }}>{['Privacy', 'Terms', 'Support'].map(l => <button type="button" key={l} className="landing-footer-link">{l}</button>)}</div>
      </footer>
    </div>
  );
}
