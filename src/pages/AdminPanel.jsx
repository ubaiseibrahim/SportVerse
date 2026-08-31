import React, { useState, useEffect, useCallback, useRef } from 'react';
import { API_BASE_URL, getImageUrl } from '../utils/api';

// ─── Auth helpers ─────────────────────────────────────────────────────────────
function getToken() { return localStorage.getItem('admin_token'); }
function setToken(t) { localStorage.setItem('admin_token', t); }
function clearToken() { localStorage.removeItem('admin_token'); }

async function apiRequest(path, opts = {}) {
  const token = getToken();
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(opts.headers || {}),
    },
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || `Error ${res.status}`);
  return json;
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
function Avatar({ src, name, size = 44 }) {
  const [err, setErr] = useState(false);
  const url = src ? getImageUrl(src) : null;
  const initials = (name || '?').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  const style = { width: size, height: size, fontSize: size * 0.36 };

  if (!url || err) {
    return <div className="adm-avatar" style={style}>{initials}</div>;
  }
  return (
    <img
      src={url} alt={name}
      className="adm-avatar"
      style={style}
      onError={() => setErr(true)}
    />
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────
function Badge({ label, color = 'gray' }) {
  return <span className={`adm-badge adm-badge--${color}`}>{label}</span>;
}

function statusColor(s) {
  return { active: 'green', inactive: 'red', suspended: 'orange', pending: 'yellow', verified: 'green' }[s] || 'gray';
}

function userStatusLabel(u) {
  if (u.isSuspended) return { label: 'Suspended', color: 'orange' };
  if (u.isDeactivated) return { label: 'Deactivated', color: 'red' };
  if (u.isActive === false) return { label: 'Inactive', color: 'red' };
  return { label: 'Active', color: 'green' };
}

// ─── Search bar ───────────────────────────────────────────────────────────────
function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="adm-search">
      <svg className="adm-search__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
      </svg>
      <input
        type="text" className="adm-search__input"
        value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {value && <button className="adm-search__clear" onClick={() => onChange('')}>×</button>}
    </div>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────
function Pagination({ page, totalPages, onChange }) {
  if (!totalPages || totalPages <= 1) return null;
  const pages = Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1);
  return (
    <div className="adm-pagination">
      <button className="adm-pag-btn" onClick={() => onChange(page - 1)} disabled={page <= 1}>‹</button>
      {pages.map(p => (
        <button key={p} className={`adm-pag-btn${p === page ? ' adm-pag-btn--active' : ''}`} onClick={() => onChange(p)}>{p}</button>
      ))}
      <button className="adm-pag-btn" onClick={() => onChange(page + 1)} disabled={page >= totalPages}>›</button>
    </div>
  );
}

// ─── Users Tab ────────────────────────────────────────────────────────────────
function UsersTab() {
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState({});
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const debounce = useRef(null);

  const fetch_ = useCallback(async (p, q, r) => {
    setLoading(true); setError('');
    try {
      const params = new URLSearchParams({ page: p, limit: 20 });
      if (q) params.set('search', q);
      if (r) params.set('role', r);
      const res = await apiRequest(`/admin/users?${params}`);
      setUsers(res.data || []);
      setMeta(res.meta || {});
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => {
    clearTimeout(debounce.current);
    debounce.current = setTimeout(() => { setPage(1); fetch_(1, search, role); }, 350);
  }, [search, role]);

  useEffect(() => { fetch_(page, search, role); }, [page]);

  const roles = ['', 'user', 'owner', 'admin'];

  return (
    <div className="adm-tab-content">
      <div className="adm-toolbar">
        <SearchBar value={search} onChange={setSearch} placeholder="Search name, email or phone…" />
        <div className="adm-filter-pills">
          {roles.map(r => (
            <button key={r || 'all'} className={`adm-pill${role === r ? ' adm-pill--active' : ''}`} onClick={() => { setRole(r); setPage(1); }}>
              {r || 'All'}
            </button>
          ))}
        </div>
      </div>

      {meta.total != null && <p className="adm-count-label">{users.length} of {meta.total} users</p>}
      {error && <div className="adm-error">{error}</div>}

      {loading ? (
        <div className="adm-loader-wrap"><div className="adm-spinner" /></div>
      ) : (
        <div className="adm-card-grid">
          {users.map(u => {
            const { label, color } = userStatusLabel(u);
            return (
              <div key={u._id} className="adm-card">
                <div className="adm-card__header">
                  <Avatar src={u.photo} name={u.name} size={46} />
                  <div className="adm-card__info">
                    <p className="adm-card__name">{u.name || '—'}</p>
                    <span className="adm-card__email">{u.email || '—'}</span>
                  </div>
                  <Badge label={label} color={color} />
                </div>
                <div className="adm-card__body">
                  {[
                    ['📱', u.mobile || '—'],
                    ['🏷', u.role || '—'],
                    ['📍', [u.city, u.state].filter(Boolean).join(', ') || '—'],
                    u.player?.playingRole && ['🏏', u.player.playingRole],
                    ['📅', u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'],
                  ].filter(Boolean).map(([label, value]) => (
                    <div key={label} className="adm-card__row">
                      <span className="adm-card__label">{label}</span>
                      <span className="adm-card__value" style={{ textTransform: label === '🏷' ? 'capitalize' : undefined }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          {users.length === 0 && !loading && <div className="adm-empty">No users found</div>}
        </div>
      )}

      <Pagination page={page} totalPages={meta.totalPages} onChange={setPage} />
    </div>
  );
}

// ─── Turfs Tab ────────────────────────────────────────────────────────────────
function TurfsTab() {
  const [turfs, setTurfs] = useState([]);
  const [meta, setMeta] = useState({});
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetch_ = useCallback(async (p, s) => {
    setLoading(true); setError('');
    try {
      const params = new URLSearchParams({ page: p, limit: 20 });
      if (s) params.set('status', s);
      const res = await apiRequest(`/admin/turfs?${params}`);
      setTurfs(res.data || []);
      setMeta(res.meta || {});
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { setPage(1); fetch_(1, status); }, [status]);
  useEffect(() => { fetch_(page, status); }, [page]);

  const statuses = ['', 'active', 'pending', 'inactive', 'suspended'];

  return (
    <div className="adm-tab-content">
      <div className="adm-toolbar">
        <div className="adm-filter-pills">
          {statuses.map(s => (
            <button key={s || 'all'} className={`adm-pill${status === s ? ' adm-pill--active' : ''}`} onClick={() => setStatus(s)}>
              {s || 'All'}
            </button>
          ))}
        </div>
      </div>

      {meta.total != null && <p className="adm-count-label">{turfs.length} of {meta.total} turfs</p>}
      {error && <div className="adm-error">{error}</div>}

      {loading ? (
        <div className="adm-loader-wrap"><div className="adm-spinner" /></div>
      ) : (
        <div className="adm-turf-grid">
          {turfs.map(t => {
            const img = (t.images || [])[0];
            const ownerName = t.owner?.userId?.name || t.owner?.name || '—';
            const ownerEmail = t.owner?.userId?.email || t.owner?.email || '—';
            return (
              <div key={t._id} className="adm-turf-card">
                <div className="adm-turf-card__img-wrap">
                  {img
                    ? <img src={getImageUrl(img)} alt={t.name} className="adm-turf-card__img" onError={e => { e.target.style.display = 'none'; }} />
                    : <div className="adm-turf-card__placeholder">🏟</div>
                  }
                  <div className="adm-turf-card__badges">
                    <Badge label={t.status || 'unknown'} color={statusColor(t.status)} />
                    {t.isVerified && <Badge label="✓ Verified" color="green" />}
                  </div>
                </div>
                <div className="adm-turf-card__body">
                  <p className="adm-turf-card__name">{t.name || '—'}</p>
                  <div className="adm-card__row"><span className="adm-card__label">📍</span><span className="adm-card__value">{[t.city, t.state].filter(Boolean).join(', ') || '—'}</span></div>
                  <div className="adm-card__row"><span className="adm-card__label">🏅 Sports</span><span className="adm-card__value">{(t.sports || []).join(', ') || '—'}</span></div>
                  <div className="adm-card__row"><span className="adm-card__label">💰 Price</span><span className="adm-card__value">₹{t.pricePerHour || '—'}/hr</span></div>
                  <div className="adm-card__row"><span className="adm-card__label">📅 Listed</span><span className="adm-card__value">{t.createdAt ? new Date(t.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}</span></div>
                  <div className="adm-turf-owner">
                    <Avatar src={t.owner?.profileImage} name={ownerName} size={30} />
                    <div>
                      <p className="adm-turf-owner__name">{ownerName}</p>
                      <p className="adm-turf-owner__email">{ownerEmail}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {turfs.length === 0 && !loading && <div className="adm-empty">No turfs found</div>}
        </div>
      )}

      <Pagination page={page} totalPages={meta.totalPages} onChange={setPage} />
    </div>
  );
}

// ─── Login ────────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await apiRequest('/auth/login', { method: 'POST', body: JSON.stringify({ identifier: email, password }) });
      const payload = res.data || res;
      const user = payload.user || payload;
      const tok = payload.accessToken || payload.token;
      if (!tok) throw new Error('No token received');
      if (user?.role !== 'admin') throw new Error('Access denied — admin accounts only.');
      setToken(tok);
      onLogin(user);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="adm-login-bg">
      <div className="adm-login-card">
        <div className="adm-login-logo">
          <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
            <rect width="48" height="48" rx="13" fill="#FFD400"/>
            <path d="M12 34L24 14l12 20H12z" fill="#111" fillOpacity="0.9"/>
            <circle cx="24" cy="26" r="4" fill="#111" fillOpacity="0.9"/>
          </svg>
          <div>
            <p className="adm-login-title">ScoreVerse</p>
            <p className="adm-login-subtitle">Admin Panel</p>
          </div>
        </div>

        <form className="adm-login-form" onSubmit={handleSubmit}>
          <div className="adm-field">
            <label className="adm-field__label">Email / Mobile</label>
            <input type="email" className="adm-field__input" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@scoreverse.in" required autoComplete="username" />
          </div>
          <div className="adm-field">
            <label className="adm-field__label">Password</label>
            <div className="adm-field__pw-wrap">
              <input type={showPw ? 'text' : 'password'} className="adm-field__input" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required autoComplete="current-password" />
              <button type="button" className="adm-field__eye" onClick={() => setShowPw(p => !p)}>{showPw ? '🙈' : '👁'}</button>
            </div>
          </div>
          {error && <div className="adm-login-error">{error}</div>}
          <button type="submit" className="adm-login-btn" disabled={loading}>
            {loading ? <><div className="adm-spinner adm-spinner--sm" />Signing in…</> : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── ScoreVerse Logo SVG ──────────────────────────────────────────────────────
function Logo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="13" fill="#FFD400"/>
      <path d="M12 34L24 14l12 20H12z" fill="#111" fillOpacity="0.9"/>
      <circle cx="24" cy="26" r="4" fill="#111" fillOpacity="0.9"/>
    </svg>
  );
}

// ─── Logout SVG ───────────────────────────────────────────────────────────────
function LogoutIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  );
}

// ─── AdminPanel ───────────────────────────────────────────────────────────────
export default function AdminPanel() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('users');
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) { setBooted(true); return; }
    apiRequest('/auth/me')
      .then(res => {
        const u = res.data || res.user || res;
        if (u?.role === 'admin') setUser(u);
        else clearToken();
      })
      .catch(() => clearToken())
      .finally(() => setBooted(true));
  }, []);

  const handleLogout = () => { clearToken(); setUser(null); };

  if (!booted) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d0f14' }}>
        <div className="adm-spinner" />
      </div>
    );
  }

  if (!user) return <LoginScreen onLogin={setUser} />;

  const tabs = [
    { key: 'users', icon: '👥', label: 'Users' },
    { key: 'turfs', icon: '🏟', label: 'Turfs' },
  ];
  const activeTabMeta = tabs.find(t => t.key === activeTab);

  return (
    <div className="adm-root">
      {/* ── Desktop Sidebar ── */}
      <aside className="adm-sidebar">
        <div className="adm-sidebar__brand">
          <Logo size={30} />
          <span className="adm-sidebar__brand-name">ScoreVerse</span>
        </div>

        <nav className="adm-sidebar__nav">
          {tabs.map(t => (
            <button key={t.key} className={`adm-nav-item${activeTab === t.key ? ' adm-nav-item--active' : ''}`} onClick={() => setActiveTab(t.key)}>
              <span className="adm-nav-item__icon">{t.icon}</span>
              <span className="adm-nav-item__label">{t.label}</span>
            </button>
          ))}
        </nav>

        <div className="adm-sidebar__footer">
          <Avatar src={user.photo} name={user.name} size={32} />
          <div className="adm-sidebar__user">
            <p className="adm-sidebar__user-name">{user.name}</p>
            <p className="adm-sidebar__user-role">Admin</p>
          </div>
          <button className="adm-logout-btn" onClick={handleLogout} title="Logout"><LogoutIcon /></button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="adm-main">
        {/* Mobile top nav */}
        <div className="adm-mobile-nav">
          <div className="adm-mobile-nav__brand"><Logo size={24} /><span>ScoreVerse</span></div>
          <div className="adm-mobile-nav__tabs">
            {tabs.map(t => (
              <button key={t.key} className={`adm-mobile-tab${activeTab === t.key ? ' adm-mobile-tab--active' : ''}`} onClick={() => setActiveTab(t.key)}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>
          <button className="adm-mobile-logout" onClick={handleLogout}><LogoutIcon /></button>
        </div>

        {/* Header */}
        <header className="adm-header">
          <div className="adm-header__icon">{activeTabMeta?.icon}</div>
          <div>
            <p className="adm-header__title">{activeTab === 'users' ? 'Registered Users' : 'Listed Turfs'}</p>
            <p className="adm-header__sub">ScoreVerse Admin • Platform overview</p>
          </div>
        </header>

        {activeTab === 'users' ? <UsersTab key="users" /> : <TurfsTab key="turfs" />}
      </main>
    </div>
  );
}
