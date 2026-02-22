export function WelcomeScreen({ onLogin, onRegister, onSkip }) {
  return (
    <div className="screen screen--no-nav welcome-screen">
      <div className="welcome-screen__hero">
        <div className="welcome-screen__icon-wrap">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true">
            <rect width="80" height="80" rx="24" fill="#E0F2FE" />
            <path
              d="M16 50V34a2 2 0 0 1 1.2-1.84l22-10a2 2 0 0 1 1.6 0l22 10A2 2 0 0 1 64 34v16"
              stroke="#0EA5E9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
            />
            <path d="M28 58V44l12-5 12 5v14" stroke="#0EA5E9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 50h48" stroke="#0EA5E9" strokeWidth="3" strokeLinecap="round" />
            <rect x="34" y="49" width="12" height="9" rx="1" fill="#0EA5E9" opacity="0.4" />
          </svg>
        </div>
        <h1 className="welcome-screen__title">SwiftDeliver</h1>
        <p className="welcome-screen__subtitle">
          Track your packages in real-time and manage all your deliveries from one place.
        </p>
      </div>

      <div className="welcome-screen__features">
        {[
          { icon: '📍', text: 'Real-time tracking' },
          { icon: '🔔', text: 'Instant notifications' },
          { icon: '📦', text: 'Order management' },
        ].map((f) => (
          <div key={f.text} className="welcome-screen__feature">
            <span className="welcome-screen__feature-icon">{f.icon}</span>
            <span className="welcome-screen__feature-text">{f.text}</span>
          </div>
        ))}
      </div>

      <div className="welcome-screen__actions">
        <button className="btn btn-primary" onClick={onLogin}>
          Log In
        </button>
        <button className="btn btn-outline" onClick={onRegister}>
          Create Account
        </button>
        <button className="btn btn-ghost" onClick={onSkip}>
          Continue as Guest
        </button>
      </div>

      <style>{`
        .welcome-screen {
          background: linear-gradient(180deg, #F0F9FF 0%, #FFFFFF 45%);
          justify-content: space-between;
          padding: 0 24px 40px;
        }
        .welcome-screen__hero {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 72px;
          text-align: center;
          gap: 16px;
        }
        .welcome-screen__icon-wrap {
          filter: drop-shadow(0 8px 20px rgba(14,165,233,0.25));
        }
        .welcome-screen__title {
          font-size: 32px;
          font-weight: 800;
          color: var(--text);
          letter-spacing: -0.5px;
        }
        .welcome-screen__subtitle {
          font-size: 16px;
          color: var(--text-muted);
          max-width: 280px;
          line-height: 1.6;
        }
        .welcome-screen__features {
          display: flex;
          justify-content: center;
          gap: 24px;
          padding: 32px 0;
        }
        .welcome-screen__feature {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        .welcome-screen__feature-icon {
          font-size: 24px;
        }
        .welcome-screen__feature-text {
          font-size: 12px;
          font-weight: 500;
          color: var(--text-muted);
          text-align: center;
        }
        .welcome-screen__actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
      `}</style>
    </div>
  );
}
