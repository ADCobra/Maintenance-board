import { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Ticket,
  FolderOpen,
  Settings,
  LogOut,
  TrendingUp,
  Users,
  BarChart3,
  Grid3x3,
  MessageSquare,
  FileText,
  Star,
  Menu,
  X,
  Sun,
  Moon,
} from 'lucide-react';

const CoalIndiaLogo = () => (
  <div className="ci-keep-white flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-full border-2 sm:border-4 border-amber-400 bg-white shadow-lg overflow-hidden shrink-0">
    <div className="flex flex-col items-center leading-none">
      <span className="text-[7px] sm:text-[9px] font-black text-green-800 tracking-tighter">COAL</span>
      <span className="text-[7px] sm:text-[9px] font-black text-green-800 tracking-tighter">INDIA</span>
      <div className="w-full h-px bg-amber-500 my-0.5" />
      <span className="text-[5px] sm:text-[6px] text-green-700 font-semibold tracking-tighter text-center leading-tight">A MAHARATNA<br/>COMPANY</span>
    </div>
  </div>
);

const navItems = (user) => [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard', roles: null },
  { to: '/tickets', icon: Ticket, label: 'Tickets', roles: null },
  { to: '/analytics', icon: BarChart3, label: 'Analytics', roles: null },
  { to: '/dashboard/custom', icon: Grid3x3, label: 'Custom Dashboard', roles: null },
  { to: '/surveys', icon: Star, label: 'Surveys', roles: null },
  { to: '/saved-replies', icon: MessageSquare, label: 'Saved Replies', roles: ['admin', 'agent'] },
  { to: '/ticket-templates', icon: FileText, label: 'Ticket Templates', roles: ['admin', 'agent'] },
  { to: '/departments', icon: FolderOpen, label: 'Departments', roles: ['admin', 'agent'] },
  { to: '/statuses', icon: Settings, label: 'Statuses', roles: ['admin', 'agent'] },
  { to: '/users', icon: Users, label: 'Users', roles: ['admin', 'agent'] },
  { to: '/escalations', icon: TrendingUp, label: 'Escalation Rules', roles: ['admin'] },
].filter(item => !item.roles || item.roles.includes(user?.role));

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // Drawer state — only relevant on mobile (< lg). On desktop the sidebar is always shown.
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('ci-theme');
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('ci-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // Close the mobile drawer whenever the route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const items = navItems(user);

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div className="flex flex-col h-dvh overflow-hidden" style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}>

      {/* Top utility bar – Coal India black bar */}
      <div className="w-full bg-black text-white text-[11px] sm:text-xs flex items-center justify-between px-3 sm:px-4 py-1 shrink-0 z-50">
        <span className="text-gray-300 truncate">{today}</span>
        <div className="hidden sm:flex items-center gap-4 text-gray-300">
          <span className="border-r border-gray-600 pr-4 text-white font-semibold">Coal India Limited</span>
          <span>Maintenance Management System</span>
        </div>
      </div>

      {/* Header bar – Coal India branding (white in light, deep green in dark) */}
      <div
        className="w-full flex items-center justify-between px-3 sm:px-6 py-2 shrink-0 z-40 border-b-4 gap-2"
        style={{ backgroundColor: isDark ? '#0d3a1c' : '#fff', borderBottomColor: '#f5a623' }}
      >
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          {/* Hamburger – mobile only */}
          <button
            onClick={() => setSidebarOpen(o => !o)}
            className="p-1.5 rounded transition-colors lg:hidden shrink-0"
            style={{ color: isDark ? '#c8e6c9' : '#374151' }}
            aria-label="Toggle navigation menu"
          >
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <CoalIndiaLogo />
          <div className="flex flex-col leading-tight min-w-0">
            <span className="text-lg sm:text-2xl font-black tracking-tight truncate" style={{ color: isDark ? '#f5a623' : '#1a5c28' }}>
              COAL INDIA
            </span>
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest truncate" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
              Maintenance Board
            </span>
          </div>
        </div>

        {/* User info + theme toggle in header */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => setIsDark(d => !d)}
            className="p-2 rounded-full border transition-colors"
            style={{
              borderColor: '#1a5c28',
              backgroundColor: isDark ? '#1a5c28' : '#f0fdf4',
              color: isDark ? '#f5a623' : '#1a5c28',
            }}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{user?.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role}</p>
          </div>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
            style={{ backgroundColor: '#1a5c28' }}
          >
            {user?.name?.[0]?.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Golden accent ticker bar */}
      <div
        className="w-full flex items-center gap-0 shrink-0 overflow-hidden"
        style={{ backgroundColor: '#f5a623', minHeight: '28px' }}
      >
        <div
          className="px-3 sm:px-4 py-1 text-xs font-black text-white shrink-0 flex items-center gap-1"
          style={{ backgroundColor: '#1a5c28' }}
        >
          <span>⚡</span>
          <span>UPDATES</span>
        </div>
        <div className="flex items-center gap-4 sm:gap-6 px-3 sm:px-4 text-xs font-semibold text-gray-900 overflow-hidden whitespace-nowrap">
          <span>Welcome to Coal India Maintenance Management System</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">Raise tickets for electrical, mechanical &amp; civil maintenance</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">For emergencies contact the control room immediately</span>
        </div>
      </div>

      {/* Body: sidebar + main */}
      <div className="flex flex-1 overflow-hidden relative">

        {/* Mobile backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Sidebar – static column on desktop, slide-in drawer on mobile */}
        <aside
          className={`
            fixed lg:static inset-y-0 left-0 z-40
            w-64 shrink-0 flex flex-col overflow-y-auto
            transform transition-transform duration-200 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0
          `}
          style={{ backgroundColor: '#0d3a1c' }}
        >
          {/* Section label */}
          <div
            className="px-4 pt-4 pb-2 text-xs font-bold tracking-widest uppercase shrink-0"
            style={{ color: '#f5a623' }}
          >
            Navigation
          </div>
          <div
            className="mx-4 mb-3 shrink-0"
            style={{ height: '2px', backgroundColor: '#1a5c28' }}
          />

          <nav className="flex-1 pb-2">
            {items.map(({ to, icon: Icon, label }) => {
              const active = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all whitespace-nowrap"
                  style={{
                    color: active ? '#f5a623' : '#c8e6c9',
                    backgroundColor: active ? '#1a5c28' : 'transparent',
                    borderLeft: active ? '3px solid #f5a623' : '3px solid transparent',
                  }}
                  onMouseEnter={e => {
                    if (!active) {
                      e.currentTarget.style.backgroundColor = '#1a5c28';
                      e.currentTarget.style.color = '#fff';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#c8e6c9';
                    }
                  }}
                >
                  <Icon size={17} className="shrink-0" />
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div
            className="p-4 shrink-0 border-t"
            style={{ borderColor: '#1a5c28' }}
          >
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-3 py-2.5 rounded text-sm font-semibold transition-all"
              style={{ backgroundColor: '#7f1d1d', color: '#fca5a5' }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#991b1b';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = '#7f1d1d';
                e.currentTarget.style.color = '#fca5a5';
              }}
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 w-full min-w-0">
          {/* Page content header strip */}
          <div
            className="w-full px-3 sm:px-6 py-2 text-xs font-semibold text-white flex items-center gap-2"
            style={{ backgroundColor: '#1a5c28' }}
          >
            <span>Coal India Limited</span>
            <span style={{ color: '#f5a623' }}>›</span>
            <span style={{ color: '#f5a623' }}>Maintenance Board</span>
          </div>
          <div className="p-3 sm:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
