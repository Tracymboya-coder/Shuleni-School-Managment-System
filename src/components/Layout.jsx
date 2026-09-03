import {
  LayoutDashboard,
  Users,
  School,
  FolderOpen,
  ClipboardCheck,
  FileText,
  MessageSquare,
  LogOut,
  Bell,
  Search,
  BarChart2,
  BookOpen,
  GraduationCap,
  ShieldCheck,
} from 'lucide-react';

const adminNav = [
  { id: 'admin-dashboard', label: 'Overview', Icon: LayoutDashboard },
  { id: 'manage-users', label: 'People', Icon: Users },
  { id: 'classes', label: 'Classes', Icon: School },
  { id: 'resources', label: 'Resources', Icon: FolderOpen },
  { id: 'attendance', label: 'Attendance', Icon: ClipboardCheck },
  { id: 'exam-builder', label: 'Exams', Icon: FileText },
  { id: 'class-chat', label: 'Class Chat', Icon: MessageSquare },
];

const educatorNav = [
  { id: 'educator-dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { id: 'classes', label: 'Classes', Icon: School },
  { id: 'resources', label: 'Resources', Icon: FolderOpen },
  { id: 'attendance', label: 'Attendance', Icon: ClipboardCheck },
  { id: 'exam-builder', label: 'Exams', Icon: FileText },
  { id: 'class-chat', label: 'Class Chat', Icon: MessageSquare },
];

const studentNav = [
  { id: 'student-dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { id: 'resources', label: 'Resources', Icon: FolderOpen },
  { id: 'exam-student', label: 'Assessments', Icon: FileText },
  { id: 'student-attendance', label: 'My Attendance', Icon: ClipboardCheck },
  { id: 'student-results', label: 'My Results', Icon: BarChart2 },
  { id: 'class-chat', label: 'Class Chat', Icon: MessageSquare },
];

const mobileAdminNav = [
  { id: 'admin-dashboard', label: 'Home', Icon: LayoutDashboard },
  { id: 'classes', label: 'Classes', Icon: School },
  { id: 'attendance', label: 'Attend.', Icon: ClipboardCheck },
  { id: 'exam-builder', label: 'Exams', Icon: FileText },
  { id: 'class-chat', label: 'Chat', Icon: MessageSquare },
];

const mobileEducatorNav = [
  { id: 'educator-dashboard', label: 'Home', Icon: LayoutDashboard },
  { id: 'classes', label: 'Classes', Icon: School },
  { id: 'attendance', label: 'Attend.', Icon: ClipboardCheck },
  { id: 'exam-builder', label: 'Exams', Icon: FileText },
  { id: 'class-chat', label: 'Chat', Icon: MessageSquare },
];

const mobileStudentNav = [
  { id: 'student-dashboard', label: 'Home', Icon: LayoutDashboard },
  { id: 'resources', label: 'Resources', Icon: FolderOpen },
  { id: 'exam-student', label: 'Exams', Icon: FileText },
  { id: 'student-results', label: 'Results', Icon: BarChart2 },
  { id: 'class-chat', label: 'Chat', Icon: MessageSquare },
];

const roleConfig = {
  admin: { label: 'School Owner', name: 'Alice Kamau', initials: 'AK', accent: '#FF6B00' },
  educator: { label: 'Educator', name: 'Ms. Grace Njeri', initials: 'GN', accent: '#16A34A' },
  student: { label: 'Student', name: 'Brian Otieno', initials: 'BO', accent: '#F59E0B' },
};

const roleOptions = [
  { role: 'admin', label: 'School Owner', Icon: ShieldCheck, screen: 'admin-dashboard' },
  { role: 'educator', label: 'Educator', Icon: BookOpen, screen: 'educator-dashboard' },
  { role: 'student', label: 'Student', Icon: GraduationCap, screen: 'student-dashboard' },
];

export default function Layout({ screen, navigate, role, children }) {
  const nav = role === 'admin' ? adminNav : role === 'educator' ? educatorNav : studentNav;
  const mobileNav = role === 'admin' ? mobileAdminNav : role === 'educator' ? mobileEducatorNav : mobileStudentNav;
  const rc = roleConfig[role];
  const isActive = id => screen === id || (id === 'classes' && screen === 'class-detail');

  return (
    <div className="flex min-h-dvh bg-forest">
      <aside className="app-sidebar">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 30% 20%, rgba(255,107,0,0.06) 0%, transparent 60%)' }}
        />

        <div className="relative border-b border-white/[0.06] px-[18px] pb-4 pt-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-flame to-[#FF9B4A] shadow-[0_4px_14px_rgba(255,107,0,0.4)]">
              <span className="font-sans text-[17px] font-black tracking-[-0.03em] text-white">S</span>
            </div>
            <div>
              <div className="font-sans text-[17px] font-extrabold leading-none tracking-[-0.02em] text-ink">Shuleni</div>
              <div className="mt-0.5 text-[11px] font-medium text-flame/80">Makini Academy</div>
            </div>
          </div>
        </div>

        <nav aria-label="Primary navigation" className="relative flex-1 overflow-y-auto px-2.5 py-3">
          <div className="mb-1.5 px-2 text-[10px] font-bold uppercase tracking-[0.1em] text-white/25">Menu</div>
          {nav.map(item => {
            const active = isActive(item.id);
            return (
              <button
                key={item.id}
                type="button"
                className={`sidebar-link w-full ${active ? 'active' : ''}`}
                aria-current={active ? 'page' : undefined}
                onClick={() => navigate(item.id)}
              >
                <item.Icon size={16} strokeWidth={active ? 2.2 : 1.7} />
                <span>{item.label}</span>
                {active && <span aria-hidden="true" className="ml-auto h-[5px] w-[5px] rounded-full bg-flame" />}
              </button>
            );
          })}

          <div className="mt-2 border-t border-white/[0.05] px-2 pb-1 pt-3 text-[10px] font-bold uppercase tracking-[0.1em] text-white/20">
            Switch role
          </div>
          {roleOptions.map(item => (
            <button
              key={item.role}
              type="button"
              className={`sidebar-link w-full !py-[7px] text-xs ${role === item.role ? 'active' : ''}`}
              aria-pressed={role === item.role}
              onClick={() => navigate(item.screen)}
            >
              <item.Icon size={13} strokeWidth={1.8} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="relative border-t border-white/[0.06] px-3.5 py-3">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px] font-sans text-xs font-extrabold text-white"
              style={{ background: rc.accent }}
            >
              {rc.initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate font-sans text-[13px] font-semibold text-ink">{rc.name}</div>
              <div className="text-[11px] text-white/35">{rc.label}</div>
            </div>
            <button
              type="button"
              aria-label="Sign out"
              title="Sign out"
              className="flex min-h-11 min-w-11 items-center justify-center rounded-md border-0 bg-transparent p-2 text-white/40 transition-colors hover:text-white/80"
              onClick={() => navigate('login')}
            >
              <LogOut size={15} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </aside>

      <div className="app-main">
        <header className="app-topbar">
          <div className="flex-1">
            <label className="sr-only" htmlFor="global-search">Search people, classes, and exams</label>
            <div className="app-topbar-search flex max-w-[300px] items-center gap-2 rounded-[10px] border-[1.5px] border-border bg-[#F8F5F0] px-3.5 py-[7px] transition-colors focus-within:border-flame">
              <Search size={13} color="#B8A898" strokeWidth={2} aria-hidden="true" />
              <input
                id="global-search"
                aria-label="Search people, classes, and exams"
                className="w-full border-0 bg-transparent text-[13px] text-charcoal outline-none placeholder:text-[#B8A898]"
                placeholder="Search people, classes, exams…"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="View notifications"
              className="relative flex min-h-11 min-w-11 items-center justify-center rounded-[10px] border-0 bg-flame-light text-flame transition-colors hover:bg-[#FFE5CC]"
            >
              <Bell size={16} strokeWidth={2} />
              <span aria-hidden="true" className="absolute right-[9px] top-[9px] h-[7px] w-[7px] rounded-full border-[1.5px] border-white bg-flame" />
            </button>
            <div className="flex cursor-pointer items-center gap-2" aria-label={`${rc.name}, ${rc.label}`}>
              <div
                className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px] font-sans text-xs font-extrabold text-white"
                style={{ background: rc.accent }}
              >
                {rc.initials}
              </div>
              <div className="app-topbar-user-copy">
                <div className="font-sans text-[13px] font-semibold leading-[1.1] text-charcoal">
                  {rc.name.split(' ')[0]} {rc.name.split(' ')[1]?.[0]}.
                </div>
                <div className="text-[11px] text-ink-muted">{rc.label}</div>
              </div>
            </div>
          </div>
        </header>

        <main className="app-main-content">
          <div className="fade-in">{children}</div>
        </main>

        <nav aria-label="Mobile navigation" className="app-mobile-nav">
          {mobileNav.map(item => {
            const active = isActive(item.id);
            return (
              <button
                key={item.id}
                type="button"
                aria-current={active ? 'page' : undefined}
                onClick={() => navigate(item.id)}
                className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1 border-0 bg-transparent px-1.5 py-1.5"
              >
                <item.Icon size={18} strokeWidth={active ? 2.2 : 1.6} color={active ? '#FF6B00' : 'rgba(255,255,255,0.3)'} />
                <span className={`font-sans text-[10px] leading-none ${active ? 'font-bold text-flame' : 'font-medium text-white/30'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
