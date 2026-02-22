import { useState } from 'react';
import { toast } from 'sonner';

export function RegisterScreen({ onRegister, onLogin, onBack }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    setErrors((p) => ({ ...p, [field]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'At least 6 characters';
    if (!form.confirm) errs.confirm = 'Please confirm your password';
    else if (form.confirm !== form.password) errs.confirm = 'Passwords do not match';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Account created! Welcome 🎉');
      onRegister();
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
          <h1>Create account</h1>
          <p>Join SwiftDeliver today</p>
        </div>

        <form className="auth-screen__form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="reg-name">Full Name</label>
            <input id="reg-name" className="form-input" type="text" placeholder="Alex Johnson"
              value={form.name} onChange={set('name')} autoComplete="name" />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="reg-email">Email</label>
            <input id="reg-email" className="form-input" type="email" placeholder="you@example.com"
              value={form.email} onChange={set('email')} autoComplete="email" />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="reg-password">Password</label>
            <input id="reg-password" className="form-input" type="password" placeholder="••••••••"
              value={form.password} onChange={set('password')} autoComplete="new-password" />
            {errors.password && <span className="form-error">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="reg-confirm">Confirm Password</label>
            <input id="reg-confirm" className="form-input" type="password" placeholder="••••••••"
              value={form.confirm} onChange={set('confirm')} autoComplete="new-password" />
            {errors.confirm && <span className="form-error">{errors.confirm}</span>}
          </div>

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="auth-screen__switch">
          Already have an account?{' '}
          <button type="button" className="auth-screen__link" onClick={onLogin}>
            Log In
          </button>
        </p>
      </div>

      <style>{`
        .auth-screen { padding: 0; }
        .auth-screen__header { padding: 16px 20px 0; }
        .auth-screen__content {
          padding: 24px 24px 40px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          flex: 1;
        }
        .auth-screen__heading h1 { font-size: 28px; font-weight: 800; letter-spacing: -0.5px; }
        .auth-screen__heading p { font-size: 15px; color: var(--text-muted); margin-top: 6px; }
        .auth-screen__form { display: flex; flex-direction: column; gap: 16px; }
        .auth-screen__switch { text-align: center; font-size: 14px; color: var(--text-muted); }
        .auth-screen__link { color: var(--primary); font-weight: 600; background: none; border: none; cursor: pointer; font-size: 14px; }
      `}</style>
    </div>
  );
}
