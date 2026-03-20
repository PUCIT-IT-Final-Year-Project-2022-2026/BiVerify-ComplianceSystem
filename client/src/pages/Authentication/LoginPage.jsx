import React from 'react';
import { Infinity } from 'lucide-react'; 
import './LoginPage.css'; // Make sure this imports your CSS file

export default function LoginPage() {
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

              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input type="email" className="form-input" placeholder="john@example.com" />
                </div>

                <div className="form-group" style={{ marginBottom: '8px' }}>
                  <label className="form-label">Password</label>
                  <input type="password" className="form-input" placeholder="••••••••" />
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
                  <a href="/forgot-password" style={{ fontSize: '13px', color: 'var(--primary-green)', textDecoration: 'none', fontWeight: 500 }}>
                    Forgot Password?
                  </a>
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '8px' }}>Sign in</button>
                
                <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--muted-text)' }}>
                  Don't have an account? <a href="#" style={{ color: 'var(--primary-green)', textDecoration: 'none', fontWeight: 600 }}>Sign up here</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
