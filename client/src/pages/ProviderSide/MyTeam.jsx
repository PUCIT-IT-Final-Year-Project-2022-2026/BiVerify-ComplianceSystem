import React, { useState } from 'react';
import { UserPlus, Users, Trash2, Mail, Shield, Eye, EyeOff } from 'lucide-react';
import './MyTeam.css';

// ── Icons Helper ──
const Ico = ({ n, s = 15, c = "#fff" }) => {
  const icons = {
    bell:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
    users:  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  };
  return icons[n] || null;
};

// ── Top Navbar Style ──
const TopNavbar = ({ title, icon }) => {
  const G = "#2b9d4e";   
  return (
    <nav style={{
      width: "calc(100% - 240px)", height: 60, background: G, padding: "0 28px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      position: "fixed", top: 0, left: 240, zIndex: 100,
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)", boxSizing: "border-box",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 36, height: 36, background: "rgba(255,255,255,0.12)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Ico n={icon} s={16} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={{ color: "#fff", fontSize: 15, fontWeight: 700, letterSpacing: "-0.3px", lineHeight: 1.2 }}>{title}</span>
          <span style={{ color: "rgba(255,255,255,0.65)", fontSize: 11 }}>PROVIDER PORTAL</span>
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

export default function MyTeam() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [teamMembers, setTeamMembers] = useState([
    { name: 'Sarah Ahmed', email: 'sarah@example.com', role: 'Site Inspector', status: 'Active' },
    { name: 'John Doe', email: 'john.doe@example.com', role: 'Site Inspector', status: 'Active' },
    { name: 'David Smith', email: 'david@example.com', role: 'Admin', status: 'Inactive' },
    { name: 'Maria Garcia', email: 'm.garcia@example.com', role: 'Site Inspector', status: 'Active' },
    { name: 'Robert Wilson', email: 'r.wilson@example.com', role: 'Editor', status: 'Active' },
    { name: 'Jessica Chen', email: 'j.chen@example.com', role: 'Supervisor', status: 'Active' }
  ]);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleCreateAccount = (e) => {
    e.preventDefault();
    if (fullName && email) {
      setTeamMembers([...teamMembers, { name: fullName, email, role: 'Site Inspector', status: 'Active' }]);
      setIsFormOpen(false);
      setShowSuccess(true);
      setFullName('');
      setEmail('');
      setPassword('');
    }
  };

  const handleDelete = (index) => {
    const newMembers = [...teamMembers];
    newMembers.splice(index, 1);
    setTeamMembers(newMembers);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f0fdf4' }}>
      <TopNavbar title="My Team" icon="users" />
      <main style={{ marginTop: 60, padding: '32px', boxSizing: 'border-box' }}>
        <div className="my-team-container" style={{ padding: 0, maxWidth: 'none', margin: 0 }}>
          <div className="page-header">
            <div>
              <p className="page-subtitle">Manage your organization's login-active personnel.</p>
            </div>
            {!isFormOpen && (
              <button className="btn-add-member" onClick={() => setIsFormOpen(true)}>
                <UserPlus size={18} />
                <span>Add Team Member</span>
              </button>
            )}
          </div>
          {showSuccess && !isFormOpen && (
            <div className="success-banner">
              <Shield size={18} className="success-icon" />
              <span>Staff account created successfully!</span>
            </div>
          )}
          {isFormOpen ? (
            <div className="form-card">
              <h2 className="form-card-title">Create New Personnel Account</h2>
              <form className="member-form" onSubmit={handleCreateAccount}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" placeholder="e.g. John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} className="input-field" required />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" placeholder="goodme@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field blue-bg" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Password</label>
                    <div className="password-input-wrapper">
                      <input type={showPassword ? "text" : "password"} placeholder="••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field blue-bg" required />
                      <button type="button" className="password-toggle-btn" onClick={() => setShowPassword(!showPassword)} tabIndex="-1">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Assigned Role</label>
                    <input type="text" value="Client" disabled className="input-field disabled-field" />
                    <span className="field-hint">Auto-assigned based on your organization type.</span>
                  </div>
                </div>
                <div className="form-actions">
                  <button type="button" className="btn-cancel" onClick={() => setIsFormOpen(false)}>Cancel</button>
                  <button type="submit" className="btn-create">Create Account</button>
                </div>
              </form>
            </div>
          ) : (
            <div className="table-container">
              <div className="table-header">
                <div className="col-member">Team Member</div>
                <div className="col-role">Role</div>
                <div className="col-status">Status</div>
                <div className="col-actions">Actions</div>
              </div>
              {teamMembers.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon-wrapper">
                    <Users size={48} className="empty-icon" />
                  </div>
                  <p className="empty-text">No personnel accounts created for your team yet.</p>
                </div>
              ) : (
                <div className="table-body">
                  {teamMembers.map((member, index) => (
                    <div className="table-row" key={index}>
                      <div className="col-member member-info">
                        <span className="member-name">{member.name}</span>
                        <span className="member-email"><Mail size={14} />{member.email}</span>
                      </div>
                      <div className="col-role"><span className="role-badge">{member.role}</span></div>
                      <div className="col-status"><span className={`status-badge ${member.status?.toLowerCase()}`}><span className="status-dot"></span>{member.status}</span></div>
                      <div className="col-actions"><button className="btn-icon" onClick={() => handleDelete(index)}><Trash2 size={18} /></button></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
