import { useState } from 'react';
import { toast } from 'sonner';

export function LoginScreen({ onLogin, onRegister, onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const next = {};
    if (!email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Enter a valid email';
    if (!password) next.password = 'Password is required';
    else if (password.length < 6) next.password = 'Password must be at least 6 characters';
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Welcome back! 👋');
      onLogin();
    }, 900);
  };

  return (
    <div className="screen screen--no-nav auth-screen">
      <div className="auth-screen__header">
        <button className="icon-btn" onClick={onBack} aria-label="Back">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="auth-screen__content">
        <div className="auth-screen__heading">
          <h1>Welcome back</h1>
          <p>Log in to track your deliveries</p>
        </div>

        <form className="auth-screen__form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="login-email">Email</label>
            <input
              id="login-email"
              className="form-input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: '' })); }}
              autoComplete="email"
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="login-password">Password</label>
            <input
              id="login-password"
              className="form-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: '' })); }}
              autoComplete="current-password"
            />
            {errors.password && <span className="form-error">{errors.password}</span>}
            <button type="button" className="auth-screen__forgot">Forgot password?</button>
          </div>

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Logging in…' : 'Log In'}
          </button>
        </form>

        <p className="auth-screen__switch">
          Don't have an account?{' '}
          <button type="button" className="auth-screen__link" onClick={onRegister}>
            Register
          </button>
        </p>
      </div>

      <style>{`
        .auth-screen {
          padding: 0;
        }
        .auth-screen__header {
          padding: 16px 20px 0;
        }
        .auth-screen__content {
          padding: 24px 24px 40px;
          display: flex;
          flex-direction: column;
          gap: 28px;
          flex: 1;
        }
        .auth-screen__heading h1 {
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -0.5px;
        }
        .auth-screen__heading p {
          font-size: 15px;
          color: var(--text-muted);
          margin-top: 6px;
        }
        .auth-screen__form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .auth-screen__forgot {
          font-size: 13px;
          color: var(--primary);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          text-align: right;
          align-self: flex-end;
        }
        .auth-screen__switch {
          text-align: center;
          font-size: 14px;
          color: var(--text-muted);
        }
        .auth-screen__link {
          color: var(--primary);
          font-weight: 600;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}
