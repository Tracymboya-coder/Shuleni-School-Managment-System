import { ClipboardCheck, FileText, FolderOpen, LayoutDashboard, MessageSquare, Plus, School, TrendingUp, Users } from 'lucide-react';

const stats = [
  { label: 'Total Students', value: '847', delta: '+12 this week', Icon: Users, color: '#FF6B00', bg: 'rgba(255,107,0,0.15)', border: 'rgba(255,107,0,0.25)' },
  { label: 'Educators', value: '52', delta: '3 pending invite', Icon: School, color: '#4ADE80', bg: 'rgba(74,222,128,0.12)', border: 'rgba(74,222,128,0.25)' },
  { label: "Today's Attendance", value: '94.2%', delta: '798 of 847 present', Icon: ClipboardCheck, color: '#FBBF24', bg: 'rgba(251,191,36,0.12)', border: 'rgba(251,191,36,0.25)' },
  { label: 'Active Classes', value: '24', delta: 'Across 4 streams', Icon: LayoutDashboard, color: '#818CF8', bg: 'rgba(129,140,248,0.12)', border: 'rgba(129,140,248,0.25)' },
];

const recentActivity = [
  { user: 'Ms. Grace Njeri', action: 'Submitted attendance', target: 'Form 3 East', time: '8 min ago', initials: 'GN', color: '#16A34A' },
  { user: 'Brian Otieno', action: 'Submitted exam', target: 'Mathematics Mock', time: '14 min ago', initials: 'BO', color: '#F59E0B' },
  { user: 'Mr. Peter Kimani', action: 'Uploaded resource', target: 'Chemistry Notes Ch.7', time: '1 hr ago', initials: 'PK', color: '#FF6B00' },
  { user: 'Admin', action: 'Added student', target: 'Aisha Muthoni (Form 1)', time: '2 hr ago', initials: 'AK', color: '#818CF8' },
  { user: 'Ms. Grace Njeri', action: 'Created exam', target: 'Biology CAT 2', time: '3 hr ago', initials: 'GN', color: '#16A34A' },
];

const topClasses = [
  { name: 'Form 4 West', educator: 'Mr. Ochieng', students: 42, attendance: 97, exam: 82 },
  { name: 'Form 3 East', educator: 'Ms. Njeri', students: 47, attendance: 94, exam: 78 },
  { name: 'Form 2 North', educator: 'Mr. Kimani', students: 39, attendance: 91, exam: 71 },
  { name: 'Form 1 South', educator: 'Ms. Wanjiru', students: 45, attendance: 88, exam: 68 },
];

const upcomingExams = [
  { name: 'Mathematics KCSE Mock', cls: 'Form 4', date: 'Mon 20 Jan', status: 'Scheduled' },
  { name: 'Biology CAT 2', cls: 'Form 3', date: 'Wed 22 Jan', status: 'Draft' },
  { name: 'English Comprehension', cls: 'Form 2', date: 'Thu 23 Jan', status: 'Scheduled' },
];

const quickActions = [
  { label: 'Take Attendance', Icon: ClipboardCheck, screen: 'attendance', color: '#4ADE80', bg: 'rgba(74,222,128,0.12)', border: 'rgba(74,222,128,0.2)' },
  { label: 'Create Exam', Icon: FileText, screen: 'exam-builder', color: '#FF6B00', bg: 'rgba(255,107,0,0.12)', border: 'rgba(255,107,0,0.2)' },
  { label: 'Add Student', Icon: Users, screen: 'manage-users', color: '#FBBF24', bg: 'rgba(251,191,36,0.12)', border: 'rgba(251,191,36,0.2)' },
  { label: 'Upload Resource', Icon: FolderOpen, screen: 'resources', color: '#818CF8', bg: 'rgba(129,140,248,0.12)', border: 'rgba(129,140,248,0.2)' },
  { label: 'Class Chat', Icon: MessageSquare, screen: 'class-chat', color: '#F472B6', bg: 'rgba(244,114,182,0.12)', border: 'rgba(244,114,182,0.2)' },
  { label: 'Manage Classes', Icon: School, screen: 'classes', color: '#34D399', bg: 'rgba(52,211,153,0.12)', border: 'rgba(52,211,153,0.2)' },
];

export default function AdminDashboard({ navigate }) {
  return (
    <div style={{ background: '#0B1A0E', minHeight: '100%' }}>
      <div className="dashboard-hero">
        <div aria-hidden="true" style={{ position: 'absolute', top: 0, right: 0, width: 440, height: 220, background: 'radial-gradient(ellipse at 80% 0%, rgba(255,107,0,0.1) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: '30%', width: 300, height: 200, background: 'radial-gradient(ellipse, rgba(22,163,74,0.08) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="dashboard-hero-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}><span aria-hidden="true" style={{ color: '#FF6B00', fontSize: 18 }}>✦</span><span style={{ fontSize: 13, color: 'rgba(255,107,0,0.9)', fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>Good morning</span></div>
              <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 32, color: '#F8FAFC', marginBottom: 4, letterSpacing: '-0.03em', lineHeight: 1 }}>Alice Kamau</h1>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', fontFamily: "'Inter', sans-serif" }}>Monday, 20 January 2025 · Makini Academy, Nairobi</p>
            </div>
            <div className="dashboard-hero-actions" style={{ display: 'flex', gap: 10 }}><button type="button" className="btn-ghost-dark" onClick={() => navigate('manage-users')}>Invite Educator</button><button type="button" className="dashboard-flame-action" onClick={() => navigate('manage-users')}><Plus size={15} strokeWidth={2.5} /> Add Student</button></div>
          </div>
          <div className="dashboard-stats">
            {stats.map(s => <div key={s.label} className="dashboard-stat-dark" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${s.border}`, borderRadius: 16, padding: '20px', transition: 'background 0.18s, transform 0.18s', backdropFilter: 'blur(4px)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}><div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'Outfit', sans-serif" }}>{s.label}</div><div style={{ width: 34, height: 34, borderRadius: 9, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><s.Icon size={16} color={s.color} strokeWidth={1.8} /></div></div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 32, color: '#F8FAFC', lineHeight: 1, marginBottom: 6, letterSpacing: '-0.03em' }}>{s.value}</div><div style={{ fontSize: 12, color: s.color, fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>{s.delta}</div>
            </div>)}
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="dashboard-grid" style={{ marginBottom: 20 }}>
            <div className="card" style={{ overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #F5EFE8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span aria-hidden="true" className="section-dot section-dot-flame" /><span className="panel-title">Class performance</span></div><button type="button" className="btn-ghost compact-action" onClick={() => navigate('classes')}>View all →</button></div>
              <div className="table-scroll"><div className="table-row" style={{ gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr', background: '#FFF8F2' }}>{['Class', 'Educator', 'Students', 'Attendance', 'Avg. Score'].map(h => <span key={h} className="table-heading">{h}</span>)}</div>{topClasses.map((c, i) => <button type="button" key={i} className="table-row table-row-button" style={{ gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr' }} onClick={() => navigate('classes')}><span className="table-primary">{c.name}</span><span className="table-muted">{c.educator}</span><span className="table-number">{c.students}</span><span style={{ fontSize: 13, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: c.attendance >= 93 ? '#16A34A' : c.attendance >= 88 ? '#D97706' : '#DC2626' }}>{c.attendance}%</span><span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span className="progress-track"><span className="progress-fill" style={{ width: `${c.exam}%`, background: c.exam >= 80 ? '#16A34A' : c.exam >= 70 ? '#F59E0B' : '#FF6B00' }} /></span><span className="table-number">{c.exam}%</span></span></button>)}</div>
            </div>
            <div className="card" style={{ overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #F5EFE8', display: 'flex', alignItems: 'center', gap: 8 }}><TrendingUp size={15} color="#FF6B00" strokeWidth={2} /><span className="panel-title">Live activity</span></div>
              <div style={{ padding: '6px 0' }}>{recentActivity.map((a, i) => <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 16px', borderBottom: i < recentActivity.length - 1 ? '1px solid #F5EFE8' : 'none', alignItems: 'flex-start' }}><div style={{ width: 32, height: 32, borderRadius: 9, background: a.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: '#fff', flexShrink: 0, fontFamily: "'Outfit', sans-serif" }}>{a.initials}</div><div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 13, color: '#1A1208' }}><span style={{ fontWeight: 600 }}>{a.user}</span> {a.action}</div><div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>{a.target}</div><div style={{ fontSize: 11, color: '#B8A898', marginTop: 2 }}>{a.time}</div></div></div>)}</div>
            </div>
          </div>

          <div className="dashboard-grid-two">
            <div className="card" style={{ overflow: 'hidden' }}><div style={{ padding: '16px 20px', borderBottom: '1px solid #F5EFE8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span aria-hidden="true" className="section-dot section-dot-gold" /><span className="panel-title">Upcoming exams</span></div><button type="button" className="btn-ghost compact-action" onClick={() => navigate('exam-builder')}>Create</button></div><div style={{ padding: '8px 0' }}>{upcomingExams.map((exam, i) => <button type="button" key={i} className="list-row-button" onClick={() => navigate('exam-builder')}><div><div className="list-title">{exam.name}</div><div className="list-meta">{exam.cls} · {exam.date}</div></div><span className={exam.status === 'Scheduled' ? 'badge-green' : 'badge-gold'}>{exam.status}</span></button>)}</div></div>
            <div className="card" style={{ padding: 20 }}><div className="panel-title panel-title-with-dot"><span aria-hidden="true" className="section-dot section-dot-flame" />Quick actions</div><div className="dashboard-quick-actions" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}>{quickActions.map(a => <button type="button" key={a.label} className="quick-action-button" onClick={() => navigate(a.screen)} style={{ borderColor: a.border, background: a.bg }}><span className="quick-action-icon"><a.Icon size={14} color={a.color} strokeWidth={1.8} /></span><span>{a.label}</span></button>)}</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
