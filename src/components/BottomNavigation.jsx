const NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'Home',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 9.5L11 3L19 9.5V19a1 1 0 0 1-1 1H14v-5h-4v5H4a1 1 0 0 1-1-1V9.5Z"
          stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'orders',
    label: 'Orders',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="3" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.75"/>
        <path d="M7 8h8M7 12h8M7 16h5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'tracking',
    label: 'Track',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="9" r="3" stroke="currentColor" strokeWidth="1.75"/>
        <path d="M11 3C7.686 3 5 5.686 5 9c0 5.25 6 11 6 11s6-5.75 6-11c0-3.314-2.686-6-6-6Z"
          stroke="currentColor" strokeWidth="1.75"/>
      </svg>
    ),
  },
  {
    id: 'support',
    label: 'Support',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M8 12s1 2 3 2 3-2 3-2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
        <circle cx="8.5" cy="9" r="1" fill="currentColor"/>
        <circle cx="13.5" cy="9" r="1" fill="currentColor"/>
        <path d="M4 11a7 7 0 1 1 14 0c0 4-3.5 7-7 7a6.97 6.97 0 0 1-4-1.26V19l2-1" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export function BottomNavigation({ currentScreen, onNavigate, onLogout }) {
  return (
    <nav className="bottom-nav" role="navigation" aria-label="Main navigation">
      {NAV_ITEMS.map((item) => {
        const active = currentScreen === item.id;
        return (
          <button
            key={item.id}
            className={`bottom-nav__item${active ? ' bottom-nav__item--active' : ''}`}
            onClick={() => onNavigate(item.id)}
            aria-current={active ? 'page' : undefined}
          >
            <span className="bottom-nav__icon">{item.icon}</span>
            <span className="bottom-nav__label">{item.label}</span>
          </button>
        );
      })}

      {/* Logout button */}
      <button className="bottom-nav__item bottom-nav__item--logout" onClick={onLogout} aria-label="Log out">
        <span className="bottom-nav__icon">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M9 3H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
            <path d="M15 15l4-4-4-4M19 11H9" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
        <span className="bottom-nav__label">Logout</span>
      </button>

      <style>{`
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 430px;
          height: var(--nav-height);
          background: var(--white);
          border-top: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-around;
          z-index: 100;
          padding: 0 4px;
          box-shadow: 0 -2px 12px rgba(0,0,0,0.06);
        }
        .bottom-nav__item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-muted);
          padding: 8px 4px;
          border-radius: var(--radius-sm);
          transition: color 0.15s;
          min-width: 0;
        }
        .bottom-nav__item--active {
          color: var(--primary);
        }
        .bottom-nav__item--logout {
          color: var(--error);
        }
        .bottom-nav__icon { line-height: 0; }
        .bottom-nav__label { font-size: 10px; font-weight: 600; white-space: nowrap; }
      `}</style>
    </nav>
  );
}
