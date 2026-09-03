import { Activity, AlertCircle, ArrowRight, BarChart2, ClipboardCheck, FileText, FolderOpen, MessageSquare, Plus, School, Users } from 'lucide-react';

const classes = [
  { name: 'Form 3 East', students: 47, attendance: 94, nextExam: 'Biology CAT 2 · Wed', unread: 3 },
  { name: 'Form 2 North', students: 39, attendance: 91, nextExam: 'Chemistry Quiz · Fri', unread: 0 },
  { name: 'Form 4 West', students: 42, attendance: 97, nextExam: 'Maths Mock · Mon', unread: 1 },
];

const actionNeeded = [
  { text: 'Take attendance for Form 2 North', urgent: true },
  { text: 'Grade Biology CAT 1 — 44 submissions pending', urgent: true },
  { text: "Upload Chemistry notes before Thursday's class", urgent: false },
];

const recentActivity = [
  { action: 'Aisha Muthoni submitted Biology CAT 1', time: '12 min ago', color: '#16A34A', initials: 'AM' },
  { action: 'New message in Form 3 East chat', time: '28 min ago', color: '#FF6B00', initials: '3E' },
  { action: 'Brian Otieno flagged Q3 for review', time: '1 hr ago', color: '#F59E0B', initials: 'BO' },
  { action: 'You uploaded Biology Ch.5 notes', time: '2 hr ago', color: '#818CF8', initials: 'ME' },
];

const quickActions = [
  { label: 'Take Attendance', Icon: ClipboardCheck, screen: 'attendance', color: '#4ADE80', bg: 'rgba(74,222,128,0.12)', border: 'rgba(74,222,128,0.2)' },
  { label: 'Create Exam', Icon: FileText, screen: 'exam-builder', color: '#FF6B00', bg: 'rgba(255,107,0,0.12)', border: 'rgba(255,107,0,0.2)' },
  { label: 'Upload Resource', Icon: FolderOpen, screen: 'resources', color: '#FBBF24', bg: 'rgba(251,191,36,0.12)', border: 'rgba(251,191,36,0.2)' },
  { label: 'Class Chat', Icon: MessageSquare, screen: 'class-chat', color: '#F472B6', bg: 'rgba(244,114,182,0.12)', border: 'rgba(244,114,182,0.2)' },
  { label: 'View Results', Icon: BarChart2, screen: 'exam-builder', color: '#818CF8', bg: 'rgba(129,140,248,0.12)', border: 'rgba(129,140,248,0.2)' },
];

const stats = [
  { label: 'My Students', value: '86', sub: 'Across 2 classes', Icon: Users, color: '#FF6B00', bg: 'rgba(255,107,0,0.15)', border: 'rgba(255,107,0,0.25)' },
  { label: 'Avg. Attendance', value: '94%', sub: 'This term', Icon: ClipboardCheck, color: '#4ADE80', bg: 'rgba(74,222,128,0.12)', border: 'rgba(74,222,128,0.25)' },
  { label: 'Resources', value: '12', sub: 'Uploaded', Icon: FolderOpen, color: '#FBBF24', bg: 'rgba(251,191,36,0.12)', border: 'rgba(251,191,36,0.25)' },
  { label: 'Exams', value: '3', sub: 'This term', Icon: FileText, color: '#818CF8', bg: 'rgba(129,140,248,0.12)', border: 'rgba(129,140,248,0.25)' },
];

export default function EducatorDashboard({ navigate }) {
  return (
    <div style={{ background: '#0B1A0E', minHeight: '100%' }}>
      <div className="dashboard-hero" style={{ background: 'linear-gradient(135deg, #0B1A0E 0%, #112816 100%)' }}>
        <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: '20%', width: 400, height: 300, background: 'radial-gradient(ellipse, rgba(74,222,128,0.08) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="dashboard-hero-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}><div><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}><span aria-hidden="true" style={{ color: '#4ADE80', fontSize: 18 }}>✦</span><span style={{ fontSize: 13, color: 'rgba(74,222,128,0.9)', fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>Good morning</span></div><h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 30, color: '#F8FAFC', marginBottom: 4, letterSpacing: '-0.03em' }}>Ms. Grace Njeri</h1><p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>Monday, 20 January · Makini Academy</p></div><div className="dashboard-hero-actions" style={{ display: 'flex', gap: 10 }}><button type="button" className="btn-ghost-dark" onClick={() => navigate('resources')}>Upload resource</button><button type="button" className="dashboard-flame-action" onClick={() => navigate('exam-builder')}><Plus size={14} strokeWidth={2.5} /> New exam</button></div></div>
          <div className="dashboard-stats">{stats.map(s => <div key={s.label} className="dashboard-stat-dark" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${s.border}`, borderRadius: 16, padding: '18px 20px', transition: 'background 0.18s, transform 0.18s' }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}><div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'Outfit', sans-serif" }}>{s.label}</div><div style={{ width: 32, height: 32, borderRadius: 8, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><s.Icon size={15} color={s.color} strokeWidth={1.8} /></div></div><div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 28, color: '#F8FAFC', lineHeight: 1, marginBottom: 4, letterSpacing: '-0.03em' }}>{s.value}</div><div style={{ fontSize: 12, color: s.color, fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>{s.sub}</div></div>)}</div>
        </div>
      </div>

      <div className="dashboard-content" style={{ paddingTop: 32 }}><div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="dashboard-grid" style={{ marginBottom: 18 }}>
          <div className="card" style={{ overflow: 'hidden' }}><div style={{ padding: '16px 20px', borderBottom: '1px solid #F5EFE8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span className="section-dot section-dot-flame" /><span className="panel-title">My classes</span></div><button type="button" className="btn-ghost compact-action" onClick={() => navigate('classes')}>All classes →</button></div>{classes.map((cls, i) => <div key={i} className="class-list-row" onClick={() => navigate('class-detail')}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><div className="class-icon"><School size={16} color="#FF6B00" strokeWidth={1.8} /></div><div><div className="list-title">{cls.name}</div><div className="list-meta">{cls.students} students</div></div></div><div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>{cls.unread > 0 && <span className="unread-count">{cls.unread}</span>}<span style={{ fontSize: 14, fontWeight: 700, color: cls.attendance >= 93 ? '#16A34A' : '#D97706', fontFamily: "'Outfit', sans-serif" }}>{cls.attendance}%</span></div></div><div className="progress-track progress-track-wide"><span className="progress-fill" style={{ width: `${cls.attendance}%`, background: cls.attendance >= 93 ? '#16A34A' : '#F59E0B' }} /></div><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}><span className="list-meta">Next: {cls.nextExam}</span><div style={{ display: 'flex', gap: 6 }}><button type="button" className="mini-action mini-action-green" onClick={e => { e.stopPropagation(); navigate('attendance'); }}>Attend.</button><button type="button" className="mini-action mini-action-flame" onClick={e => { e.stopPropagation(); navigate('exam-builder'); }}>Exam</button><button type="button" className="mini-action mini-action-gray" onClick={e => { e.stopPropagation(); navigate('class-chat'); }}>Chat</button></div></div></div>)}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}><div className="card" style={{ overflow: 'hidden' }}><div style={{ padding: '14px 18px', borderBottom: '1px solid #F5EFE8', display: 'flex', alignItems: 'center', gap: 8 }}><AlertCircle size={14} color="#FF6B00" strokeWidth={2} /><span className="panel-title panel-title-small">Needs attention</span></div>{actionNeeded.map((a, i) => <button type="button" key={i} className="attention-row" onClick={() => navigate('attendance')}><span className="attention-dot" style={{ background: a.urgent ? '#FF6B00' : '#F59E0B' }} /><span>{a.text}</span><ArrowRight size={13} color="#B8A898" /></button>)}</div><div className="card" style={{ overflow: 'hidden' }}><div style={{ padding: '14px 18px', borderBottom: '1px solid #F5EFE8', display: 'flex', alignItems: 'center', gap: 8 }}><Activity size={14} color="#16A34A" strokeWidth={2} /><span className="panel-title panel-title-small">Recent activity</span></div>{recentActivity.map((a, i) => <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 18px', borderBottom: i < recentActivity.length - 1 ? '1px solid #F5EFE8' : 'none', alignItems: 'flex-start' }}><div style={{ width: 28, height: 28, borderRadius: 8, background: a.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, color: '#fff', flexShrink: 0, fontFamily: "'Outfit', sans-serif" }}>{a.initials}</div><div><div style={{ fontSize: 12, color: '#1A1208', lineHeight: 1.5 }}>{a.action}</div><div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>{a.time}</div></div></div>)}</div></div>
        </div>
        <div className="card" style={{ padding: 20 }}><div className="panel-title" style={{ marginBottom: 14 }}>Quick actions</div><div className="dashboard-quick-actions" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>{quickActions.map(a => <button type="button" key={a.label} className="quick-action-button quick-action-inline" onClick={() => navigate(a.screen)} style={{ borderColor: a.border, background: a.bg }}><a.Icon size={14} color={a.color} strokeWidth={1.8} /><span>{a.label}</span></button>)}</div></div>
      </div></div>
    </div>
  );
}
