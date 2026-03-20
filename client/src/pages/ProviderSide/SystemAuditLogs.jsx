import React from 'react';
import './SystemAuditLogs.css';

// ── Icons Helper ──
const Ico = ({ n, s = 15, c = "#fff" }) => {
  const icons = {
    bell:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
    logs:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>,
  };
  return icons[n] || null;
};

// ── Top Navbar Style ──
const TopNavbar = ({ title, icon }) => {
  const G = "#2b9d4e";   
  const GD = "#1f7a3b";  
  return (
    <nav style={{
      width: "100%", height: 60, background: G, padding: "0 28px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      position: "fixed", top: 0, left: 0, zIndex: 100,
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)", boxSizing: "border-box",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 36, height: 36, background: "rgba(255,255,255,0.12)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Ico n={icon} s={16} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={{ color: "#fff", fontSize: 15, fontWeight: 700, letterSpacing: "-0.3px", lineHeight: 1.2 }}>{title}</span>
          <span style={{ color: "rgba(255,255,255,0.65)", fontSize: 11 }}>ADMIN PORTAL</span>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          <Ico n="bell" s={15} />
          <span style={{ position: "absolute", top: 5, right: 6, width: 8, height: 8, background: "#F59E0B", borderRadius: "50%", border: `2px solid ${G}` }} />
        </button>
        <div style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.18)", border: "2px solid rgba(255,255,255,0.35)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 600 }}>AO</div>
        <span style={{ color: "#fff", fontSize: 13, fontWeight: 500 }}>Asset Owner</span>
      </div>
    </nav>
  );
};

export default function SystemAuditLogs() {
  const logs = [
    { id: 1, time: '3/3/2026, 1:06:24 PM', user: 'Asset Owner', action: 'CREATE_CLIENT', details: 'Admin created a new Client: Sarah (sarah@example.com)' },
    { id: 2, time: '3/3/2026, 1:15:10 PM', user: 'Asset Owner', action: 'UPDATE_ORG', details: 'Organization site URL updated to https://biverify.com' },
    { id: 3, time: '3/3/2026, 2:30:45 PM', user: 'Sarah', action: 'LOGIN', details: 'User sarah@example.com logged in' },
    { id: 4, time: '3/3/2026, 3:00:12 PM', user: 'Asset Owner', action: 'ADD_TEAM', details: 'New team member added: John Doe' }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f0fdf4' }}>
      <TopNavbar title="System Audit Logs" icon="logs" />
      <main style={{ marginTop: 60, padding: '32px', boxSizing: 'border-box' }}>
        <div className="logs-container" style={{ padding: 0, maxWidth: 'none', margin: 0 }}>
          <div className="logs-table-wrapper">
            <div className="logs-table-header">
              <div className="col-time">Time</div>
              <div className="col-user">User</div>
              <div className="col-action">Action</div>
              <div className="col-details">Details</div>
            </div>
            <div className="logs-table-body">
              {logs.map((log) => (
                <div className="logs-table-row" key={log.id}>
                  <div className="col-time">{log.time}</div>
                  <div className="col-user">{log.user}</div>
                  <div className="col-action">
                    <span className={`action-badge ${log.action.toLowerCase()}`}>
                      {log.action}
                    </span>
                  </div>
                  <div className="col-details">{log.details}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
