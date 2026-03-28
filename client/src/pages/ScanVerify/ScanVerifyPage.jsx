import React, { useState, useEffect } from 'react';
import './ScanVerifyPage.css';
import ProviderStaffSidebar from '../../components/ProviderStaffSidebar';

const Ico = ({ n, s = 15, c = "#fff" }) => {
  const icons = {
    shield: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
    jobs: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>,
    scan: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" /><path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" /><rect x="7" y="7" width="10" height="10" rx="1" /></svg>,
    bell: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg>,
    logout: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>,
    scanqr: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="3" height="3" /><rect x="18" y="14" width="3" height="3" /><rect x="14" y="18" width="3" height="3" /><rect x="18" y="18" width="3" height="3" /></svg>,
    menu: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>,
    close: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
  };
  return icons[n] || null;
};

const TopNav = ({ onMenuToggle, isSidebarOpen }) => (
  <nav className="top-navbar">
    <div className="navbar-left">
      <button className="navbar-menu-btn" onClick={onMenuToggle}>
        <Ico n={isSidebarOpen ? "close" : "menu"} s={20} c="#fff" />
      </button>
      <div className="navbar-icon-box">
        <Ico n="scanqr" s={16} c="#fff" />
      </div>
      <div className="navbar-titles">
        <span className="navbar-title">Scan &amp; Verify</span>
        <span className="navbar-subtitle">SERVICE PROVIDER</span>
      </div>
    </div>
    <div className="navbar-right">
      <button className="notif-btn">
        <Ico n="bell" s={15} c="#fff" />
        <span className="notif-dot" />
      </button>
      <div className="topnav-avatar">s</div>
      <span className="topnav-username">shawn</span>
    </div>
  </nav>
);

const ScanVerifyPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentTime, setCurrentTime] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (currentStep === 2 && !currentTime) {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', {
        hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true,
      }));
    }
  }, [currentStep, currentTime]);

  const handleNextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const handleReset = () => { setCurrentStep(1); setCurrentTime(""); setIsSidebarOpen(false); };

  return (
    <div className="layout-container">
      <ProviderStaffSidebar activeItem="scan" isOpen={isSidebarOpen} />
      {isSidebarOpen && <div className="staff-sidebar-overlay" onClick={() => setIsSidebarOpen(false)} />}

      <div className="body-row">
        <TopNav onMenuToggle={() => setIsSidebarOpen(p => !p)} isSidebarOpen={isSidebarOpen} />
        <main className="staff-main-content">
          <div className="progress-container">
            <div className="progress-steps">
              <div className={`step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'success' : ''}`}>
                <div className="step-circle">
                  {currentStep > 1 ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  ) : "1"}
                </div>
              </div>
              <div className={`step-line ${currentStep > 1 ? 'success-line' : ''}`}></div>
              <div className={`step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'success' : ''}`}>
                <div className="step-circle">
                  {currentStep > 2 ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  ) : "2"}
                </div>
              </div>
              <div className={`step-line ${currentStep > 2 ? 'success-line' : ''}`}></div>
              <div className={`step ${currentStep === 3 ? 'active' : ''}`}>
                <div className="step-circle">3</div>
              </div>
            </div>
          </div>

          <div className="scanner-section">
            {currentStep === 1 && (
              <>
                <div className="scanner-header">
                  <div className="scanner-icon-bg">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2b9d4e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path>
                      <path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path>
                      <rect x="7" y="7" width="10" height="10" rx="2"></rect>
                    </svg>
                  </div>
                  <h2>Security Check-In</h2>
                  <p className="scanner-subtitle">Scan the <strong>Site QR Code</strong> at the client location to verify your arrival.</p>
                </div>
                <div className="scanner-card-wrapper">
                  <div className="scanner-card">
                    <div className="scanner-info-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>
                      </svg>
                    </div>
                    <div className="scanner-display" onClick={handleNextStep} style={{ cursor: 'pointer' }} title="Click to simulate scan">
                      <div className="scanner-target">
                        <div className="corner corner-tl"></div><div className="corner corner-tr"></div>
                        <div className="corner corner-bl"></div><div className="corner corner-br"></div>
                        <div className="scanning-animation-line"></div>
                        <div className="qr-elements">
                          <div className="qr-box top-left"></div><div className="qr-box top-right"></div>
                          <div className="qr-box bottom-left"></div><div className="qr-dots"></div>
                        </div>
                      </div>
                    </div>
                    <div className="scanner-actions">
                      <button className="btn-primary" onClick={handleNextStep}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle>
                        </svg>
                        Request Camera Permissions
                      </button>
                      <button className="btn-secondary" onClick={handleNextStep}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                        Scan an Image File
                      </button>
                    </div>
                  </div>
                  <div className="card-glow"></div>
                </div>
              </>
            )}

            {currentStep === 2 && (
              <div className="verified-card-wrapper">
                <div className="verified-card">
                  <div className="verified-icon-container">
                    <div className="verified-icon-bg">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </div>
                  </div>
                  <h2 className="verified-title">Arrival Verified</h2>
                  <p className="verified-subtitle">You are checked in at <strong>west wing</strong>.<br />Please complete the scheduled tasks.</p>
                  <div className="time-block">
                    <p className="time-label">CHECK-IN TIME</p>
                    <p className="time-value">{currentTime}</p>
                  </div>
                  <button className="btn-success-full" onClick={handleNextStep}>Perform Completion Handover</button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="completion-container">
                <div className="completion-header">
                  <h2>Service Completion</h2>
                  <p className="completion-subtitle">Present this QR code to the Client Staff to verify work completion.</p>
                </div>
                <div className="qr-card-large">
                  <div className="qr-image-container">
                    <div className="qr-placeholder">
                      <svg width="180" height="180" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="6" height="6" strokeWidth="2"></rect><rect x="4" y="4" width="2" height="2" fill="currentColor"></rect>
                        <rect x="16" y="2" width="6" height="6" strokeWidth="2"></rect><rect x="18" y="4" width="2" height="2" fill="currentColor"></rect>
                        <rect x="2" y="16" width="6" height="6" strokeWidth="2"></rect><rect x="4" y="18" width="2" height="2" fill="currentColor"></rect>
                        <path d="M10 2h4M10 6h4M10 10h12M2 10h6M14 14h2M18 14h4M14 18h2M18 18h4M2 14h2M6 14h2M10 14h2M10 18h2M10 22h12" strokeWidth="1.5"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="qr-details">
                    <p className="po-number">PO-1772507457</p>
                    <p className="scan-instruction">Scan to Verify Completion</p>
                  </div>
                </div>
                <button className="finish-button" onClick={handleReset}>Finish Simulation (Back to Home)</button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ScanVerifyPage;