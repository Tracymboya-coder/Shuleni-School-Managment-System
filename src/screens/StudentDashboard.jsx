import { ArrowRight, BarChart2, ClipboardCheck, Clock, ExternalLink, FileText, FolderOpen, MessageSquare } from 'lucide-react';

const schedule = [
  { subject: 'Mathematics', time: '8:00 – 9:00 AM', teacher: 'Mr. Kimani', status: 'past' },
  { subject: 'Biology', time: '9:00 – 10:00 AM', teacher: 'Ms. Njeri', status: 'now' },
  { subject: 'English', time: '11:00 – 12:00 PM', teacher: 'Mr. Ochieng', status: 'upcoming' },
  { subject: 'Chemistry', time: '1:00 – 2:00 PM', teacher: 'Ms. Wanjiru', status: 'upcoming' },
];

const pendingExams = [
  { name: 'Biology CAT 2', due: 'Tomorrow 9:00 AM', cls: 'Form 3 East', urgency: 'urgent' },
  { name: 'English Comprehension', due: 'Thu 23 Jan', cls: 'Form 3 East', urgency: 'normal' },
];

const recentResources = [
  { name: 'Biology Revision Notes Ch.5-8.pdf', cls: 'Form 3 East', added: '2 hr ago' },
  { name: 'Mathematics Past Papers 2020-2024', cls: 'Form 3 East', added: 'Yesterday' },
  { name: 'Chemistry Lab Report Template', cls: 'Form 3 East', added: '2 days ago' },
];

const quickAccess = [
  { label: 'Take Biology CAT 2', sub: 'Due tomorrow · Tap to start', Icon: FileText, screen: 'exam-student', color: '#FF6B00', bg: 'rgba(255,107,0,0.12)', border: 'rgba(255,107,0,0.2)' },
  { label: 'My results', sub: '5 exams graded this term', Icon: BarChart2, screen: 'student-results', color: '#4ADE80', bg: 'rgba(74,222,128,0.1)', border: 'rgba(74,222,128,0.2)' },
  { label: 'My attendance', sub: '94% this term', Icon: ClipboardCheck, screen: 'student-attendance', color: '#FBBF24', bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.2)' },
  { label: 'Class chat', sub: '3 new messages', Icon: MessageSquare, screen: 'class-chat', color: '#818CF8', bg: 'rgba(129,140,248,0.1)', border: 'rgba(129,140,248,0.2)' },
];

export default function StudentDashboard({ navigate }) {
  return (
    <div style={{ background: '#0B1A0E', minHeight: '100%' }}>
      <div className="dashboard-hero" style={{ background: 'linear-gradient(135deg, #0B1A0E 0%, #0F2214 100%)' }}>
        <div aria-hidden="true" style={{ position: 'absolute', top: 0, right: 0, width: 400, height: 280, background: 'radial-gradient(ellipse, rgba(251,191,36,0.08) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ marginBottom: 28 }}><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}><span aria-hidden="true" style={{ color: '#FBBF24', fontSize: 18 }}>✦</span><span style={{ fontSize: 13, color: 'rgba(251,191,36,0.9)', fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>Good morning</span></div><h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 30, color: '#F8FAFC', marginBottom: 4, letterSpacing: '-0.03em' }}>Brian Otieno</h1><p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>Monday, 20 January 2025 · Form 3 East · Makini Academy</p></div>
          <button type="button" className="student-attendance-banner" onClick={() => navigate('student-attendance')}><div><div className="student-banner-label">My attendance this term</div><div className="student-banner-value">94%</div><div className="student-banner-meta">47 of 50 days · View full record</div></div><div className="student-attendance-breakdown">{[{ label: 'Present', value: 47, color: '#4ADE80' }, { label: 'Absent', value: 2, color: '#FF6B00' }, { label: 'Late', value: 1, color: '#FBBF24' }].map(s => <div key={s.label} style={{ textAlign: 'center' }}><div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 24, color: s.color }}>{s.value}</div><div className="student-banner-meta">{s.label}</div></div>)}<ArrowRight className="student-banner-arrow" size={18} color="rgba(255,255,255,0.3)" /></div></button>
          <div className="student-quick-grid">{quickAccess.map(a => <button type="button" key={a.label} className="student-quick-card" onClick={() => navigate(a.screen)} style={{ borderColor: a.border, background: a.bg }}><span className="student-quick-icon"><a.Icon size={17} color={a.color} strokeWidth={1.8} /></span><span><span className="student-quick-title">{a.label}</span><span className="student-quick-meta">{a.sub}</span></span></button>)}</div>
        </div>
      </div>

      <div className="dashboard-content" style={{ paddingTop: 32 }}><div className="student-dashboard-grid" style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <div className="card" style={{ overflow: 'hidden' }}><div className="panel-heading"><Clock size={14} color="#FF6B00" strokeWidth={1.8} /><span className="panel-title">Today's classes</span></div>{schedule.map((s, i) => <div key={i} className={`schedule-row ${s.status === 'now' ? 'schedule-row-now' : ''}`}><span className={`schedule-marker schedule-marker-${s.status}`} /><div style={{ flex: 1 }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span className={`schedule-subject ${s.status === 'past' ? 'schedule-subject-past' : ''}`}>{s.subject}</span>{s.status === 'now' && <span className="badge-green" style={{ fontSize: 10 }}>Now</span>}</div><div className="list-meta">{s.time} · {s.teacher}</div></div></div>)}</div>
        <div className="card" style={{ overflow: 'hidden' }}><div className="panel-heading"><FileText size={14} color="#FF6B00" strokeWidth={1.8} /><span className="panel-title">Pending assessments</span></div>{pendingExams.map((e, i) => <button type="button" key={i} className="list-row-button" onClick={() => navigate('exam-student')}><div><div className="list-title">{e.name}</div><div className="list-meta">{e.cls} · Due {e.due}</div></div><div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><span className={e.urgency === 'urgent' ? 'badge-orange' : 'badge-gold'}>{e.urgency === 'urgent' ? 'Due tomorrow' : 'Upcoming'}</span><ArrowRight size={13} color="#B8A898" /></div></button>)}<div style={{ padding: '12px 18px' }}><button type="button" className="btn-ghost" style={{ width: '100%', fontSize: 13 }} onClick={() => navigate('exam-student')}>View all assessments</button></div></div>
        <div className="card" style={{ overflow: 'hidden' }}><div className="panel-heading panel-heading-between"><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><FolderOpen size={14} color="#FF6B00" strokeWidth={1.8} /><span className="panel-title">Recent resources</span></div><button type="button" className="btn-ghost compact-action" onClick={() => navigate('resources')}>View all</button></div>{recentResources.map((r, i) => <button type="button" key={i} className="resource-row" onClick={() => navigate('resources')}><span className="resource-icon"><FileText size={15} color="#FF6B00" strokeWidth={1.6} /></span><span style={{ flex: 1, minWidth: 0 }}><span className="list-title list-title-truncate">{r.name}</span><span className="list-meta">{r.cls} · {r.added}</span></span><ExternalLink size={13} color="#B8A898" /></button>)}</div>
        <div className="student-photo-card"><img src="https://images.unsplash.com/photo-1637148734636-906c24feeb55?w=580&h=320&fit=crop&auto=format&q=85" alt="Students at desks in a classroom" /><div aria-hidden="true" className="student-photo-overlay" /><div className="student-photo-copy"><div className="student-photo-title">Keep going, Brian!</div><p>Your Biology CAT 2 is tomorrow. You've got this.</p><button type="button" className="student-photo-action" onClick={() => navigate('exam-student')}>Start exam now →</button></div></div>
      </div></div>
    </div>
  );
}
