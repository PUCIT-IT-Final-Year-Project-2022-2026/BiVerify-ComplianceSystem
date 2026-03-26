import React from 'react';
import { Infinity } from 'lucide-react'; 

export default function ForgotPassword() {
  return (
    <>
      <style>{`
        /* Color Palette from your guidelines injected directly into JSX */
        :root {
          --header-bg: #2b9d4e;
          --primary-green: #2b9d4e;
          --primary-dark: #1f7a3b;
          --primary-light: #4fb96e;
          --primary-soft: #8fd6a3;
          --page-bg: #F5F6FA;
          --card-bg: #FFFFFF;
          --dark-text: #1A1D23;
          --muted-text: #6B7280;
          --white-text: #FFFFFF;
          --warning-orange: #F59E0B;
          --danger-red: #EF4444;
          --border-light: rgba(43, 157, 78, 0.1);
          --border-medium: rgba(43, 157, 78, 0.15);
          --border-dark: rgba(43, 157, 78, 0.2);
          --primary-bg-light: rgba(43, 157, 78, 0.05);
          --primary-bg-medium: rgba(43, 157, 78, 0.08);
          --primary-bg-icon: rgba(43, 157, 78, 0.1);
          --warning-bg: rgba(245, 158, 11, 0.1);
        }

        .fp-container *, .fp-container *::before, .fp-container *::after {
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
        }

        .fp-login-wrapper {
          background: #f0fdf4;
          min-height: 100vh;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px 20px;
          box-sizing: border-box;
        }

        .fp-auth-container {
          display: flex;
          width: 100%;
          max-width: 1100px;
          min-height: 500px; /* Reduced to stop scrolling */
          height: 500px; /* Fixed height to keep it compact but centered */
          background-color: var(--page-bg);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
        }

        .fp-sidebar {
          width: 380px;
          background-color: var(--primary-green);
          color: var(--white-text);
          padding: 40px;
          display: flex;
          flex-direction: column;
          position: relative;
          border-top-left-radius: 20px;
          border-bottom-left-radius: 20px;
        }

        .fp-logo-container {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 60px;
        }

        .fp-logo-icon {
          width: 32px;
          height: 32px;
          background-color: var(--card-bg);
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;
          font-size: 16px;
          letter-spacing: -1px;
          color: var(--primary-green);
        }

        .fp-logo-text {
          font-size: 22px;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .fp-sidebar-footer {
          margin-top: auto;
          font-size: 12px;
          color: var(--primary-soft);
        }

        .fp-main-content {
          flex: 1;
          padding: 40px 60px;
          display: flex;
          flex-direction: column;
          background-color: var(--page-bg);
        }

        .fp-right-card {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .fp-form-container {
          background-color: transparent;
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .fp-form-title {
          font-size: 28px;
          font-weight: 700;
          color: var(--dark-text);
          margin-bottom: 8px;
        }

        .fp-form-subtitle {
          font-size: 14px;
          color: var(--muted-text);
          margin-bottom: 40px;
        }

        .fp-form-group {
          margin-bottom: 24px;
        }

        .fp-form-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: var(--dark-text);
          margin-bottom: 8px;
        }

        .fp-form-input {
          width: 100%;
          height: 48px;
          padding: 0 16px;
          border: 1px solid var(--border-medium);
          border-radius: 8px;
          font-size: 14px;
          color: #1a1a1a !important;
          background-color: var(--card-bg);
          transition: all 0.3s ease;
          outline: none;
          box-sizing: border-box;
        }

        .fp-form-input::placeholder {
          color: #A0AABF;
        }

        .fp-form-input:focus {
          border-color: var(--primary-green);
          box-shadow: 0 0 0 3px var(--primary-bg-light);
        }

        .fp-btn-primary {
          height: 48px;
          padding: 0 32px;
          background-color: var(--primary-green);
          color: var(--white-text);
          font-size: 15px;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
          margin-top: 24px;
        }

        .fp-btn-primary:hover {
          background-color: var(--primary-dark);
        }

        @media (max-width: 768px) {
          .fp-login-wrapper {
            padding: 0;
          }
          .fp-auth-container {
            flex-direction: column;
            margin: 0;
            border-radius: 0;
            min-height: 100vh;
          }
          .fp-sidebar {
            width: 100%;
            border-radius: 0;
            padding: 30px;
            min-height: auto;
          }
          .fp-sidebar-footer {
            display: none;
          }
          .fp-logo-container {
            margin-bottom: 30px;
          }
          .fp-main-content {
            padding: 30px 20px;
          }
        }
      `}</style>
      
      <div className="fp-container">
        <div className="fp-login-wrapper">
          <div className="fp-auth-container">
            {/* Sidebar */}
            <div className="fp-sidebar">
              <div className="fp-logo-container">
                <div className="fp-logo-icon">
                  <Infinity size={20} color="#2b9d4e" strokeWidth={3} />
                </div>
                <span className="fp-logo-text">Bi-Verify</span>
              </div>

              <div className="fp-sidebar-footer">
                All rights reserved @Bi-Verify
              </div>
            </div>

            {/* Main Content */}
            <div className="fp-main-content">
              <div className="fp-right-card">
                <div className="fp-form-container">
                  <h1 className="fp-form-title">Reset Password</h1>
                  <p className="fp-form-subtitle">Secure your account with a new password.</p>

                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="fp-form-group">
                      <label className="fp-form-label">New password</label>
                      <input type="password" className="fp-form-input" placeholder="••••••••" required />
                    </div>

                    <div className="fp-form-group" style={{ marginBottom: '8px' }}>
                      <label className="fp-form-label">Confirm password</label>
                      <input type="password" className="fp-form-input" placeholder="••••••••" required />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px' }}>
                      <button type="submit" className="fp-btn-primary" style={{ width: 'auto', marginTop: 0 }}>
                        RESET
                      </button>
                      <a href="/" style={{ fontSize: '14px', color: 'var(--primary-green)', textDecoration: 'none', fontWeight: 400 }}>
                        Return to login
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
