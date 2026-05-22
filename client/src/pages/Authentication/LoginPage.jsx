import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Infinity } from 'lucide-react';
import { auth, saveSession, apiErrorMessage } from '../../api/client';
import './LoginPage.css'; // Make sure this imports your CSS file

function getRoleHome(user) {
  if (user.role === 'org_admin') {
    return user.orgType === 'provider' ? '/provider/overview' : '/overview';
  }
  const MAP = {
    client_staff:       '/compliance',
    compliance_officer: '/verify-provider',
    provider_staff:     '/provider/jobs',
    super_admin:        '/admin-dashboard',
  };
  return MAP[user.role] || '/overview';
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [errorCode, setErrorCode] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setErrorCode('');
    setSubmitting(true);
    try {
      const { token, user } = await auth.login(email.trim(), password);
      saveSession(token, user);
      navigate(getRoleHome(user), { replace: true });
    } catch (err) {
      const code = err?.response?.data?.error?.code || '';
      setErrorCode(code);
      setError(apiErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="auth-container">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="logo-container">
            <div className="logo-icon">
              <Infinity size={20} color="#2b9d4e" strokeWidth={3} />
            </div>
            <span className="logo-text">Bi-Verify</span>
          </div>

          <div className="sidebar-footer">
            All rights reserved @Bi-Verify
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="right-card">
            <div className="form-container">
              <h1 className="form-title">Sign in</h1>
              <p className="form-subtitle">with your Biverify Account</p>

              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '8px' }}>
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
                  <a href="/forgot-password" style={{ fontSize: '13px', color: 'var(--primary-green)', textDecoration: 'none', fontWeight: 500 }}>
                    Forgot Password?
                  </a>
                </div>

                {error && errorCode === 'PENDING_APPROVAL' && (
                  <div style={{ marginBottom: 16, padding: '12px 14px', background: '#fffbeb', border: '1px solid #f59e0b', color: '#92400e', borderRadius: 8, fontSize: 13 }}>
                    <strong>Awaiting approval</strong> — your organization has been registered and is pending super admin review. You will be able to log in once approved.
                  </div>
                )}
                {error && errorCode === 'ORG_REJECTED' && (
                  <div style={{ marginBottom: 16, padding: '12px 14px', background: '#fef2f2', border: '1px solid #f87171', color: '#991b1b', borderRadius: 8, fontSize: 13 }}>
                    <strong>Registration rejected</strong> — your organization's registration was not approved. Please contact support for more information.
                  </div>
                )}
                {error && errorCode !== 'PENDING_APPROVAL' && errorCode !== 'ORG_REJECTED' && (
                  <div style={{ marginBottom: 16, padding: '10px 12px', background: '#fee2e2', color: '#991b1b', borderRadius: 8, fontSize: 13 }}>
                    {error}
                  </div>
                )}

                <button type="submit" disabled={submitting} className="btn-primary" style={{ width: '100%', marginTop: '8px', opacity: submitting ? 0.7 : 1 }}>
                  {submitting ? 'Signing in…' : 'Sign in'}
                </button>
                
                <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--muted-text)' }}>
                  Don't have an account? <a href="/signup" style={{ color: 'var(--primary-green)', textDecoration: 'none', fontWeight: 600 }}>Sign up here</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}