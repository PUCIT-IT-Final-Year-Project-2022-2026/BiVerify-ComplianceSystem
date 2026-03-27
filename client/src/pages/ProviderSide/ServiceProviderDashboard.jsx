import { useState } from "react";

const G  = "#2b9d4e";
const BG = "#F0F2F5";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', sans-serif; background: ${BG}; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 4px; }
  input, button { font-family: 'Inter', sans-serif; }
  input:focus { outline: none; }
`;

const PATHS = {
  dashboard: ["M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z","M9 22V12h6v10"],
  bell:      ["M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9","M13.73 21a2 2 0 01-3.46 0"],
  search:    ["M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0"],
  clock:     ["M12 2a10 10 0 100 20A10 10 0 0012 2z","M12 6v6l4 2"],
  check:     ["M22 11.08V12a10 10 0 11-5.93-9.14","M22 4L12 14.01l-3-3"],
  users:     ["M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2","M23 21v-2a4 4 0 00-3-3.87","M16 3.13a4 4 0 010 7.75","M9 7a4 4 0 100 8 4 4 0 000-8z"],
  alert:     ["M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z","M12 9v4","M12 17h.01"],
  inbox:     ["M22 12h-6l-2 3H10l-2-3H2","M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"],
  badge:     ["M9 12l2 2 4-4","M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"],
  upload:    ["M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4","M17 8l-5-5-5 5","M12 3v12"],
  scroll:    ["M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z","M14 2v6h6","M16 13H8","M16 17H8","M10 9H8"],
  chevron:   ["M9 18l6-6-6-6"],
  refresh:   ["M23 4v6h-6","M1 20v-6h6","M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"],
};

function Icon({ name, size = 16, color = "currentColor", sw = 1.8 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      {(PATHS[name] || []).map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

function StatCard({ label, value, icon, iconBg, iconColor, accentColor, badge, badgeBg, badgeColor }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      background: "#fff", borderRadius: 16, border: "1px solid #e8eaf0",
      boxShadow: hov ? "0 8px 28px rgba(0,0,0,0.10)" : "0 1px 4px rgba(0,0,0,0.05)",
      transform: hov ? "translateY(-2px)" : "translateY(0)",
      transition: "all 0.2s", padding: "22px 20px 20px",
      display: "flex", flexDirection: "column", gap: 14,
      position: "relative", overflow: "hidden", cursor: "pointer",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 4, background: accentColor, borderRadius: "16px 0 0 16px" }} />
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", paddingLeft: 8 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name={icon} size={20} color={iconColor} sw={1.9} />
        </div>
        <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: badgeBg, color: badgeColor }}>{badge}</span>
      </div>
      <div style={{ paddingLeft: 8 }}>
        <div style={{ fontSize: 32, fontWeight: 800, color: "#1a1f2e", letterSpacing: "-1.5px", lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4, fontWeight: 500 }}>{label}</div>
      </div>
    </div>
  );
}

const STATS = [
  { label: "Active Service Jobs",     value: 3,  icon: "clock",  accentColor: "#3b82f6", iconBg: "#eff6ff", iconColor: "#3b82f6", badge: "Live",     badgeBg: "#eff6ff", badgeColor: "#2563eb" },
  { label: "Jobs Completed",          value: 18, icon: "check",  accentColor: G,         iconBg: "#ecfdf5", iconColor: G,         badge: "All time", badgeBg: "#ecfdf5", badgeColor: "#059669" },
  { label: "Total Staff",             value: 7,  icon: "users",  accentColor: "#8b5cf6", iconBg: "#f5f3ff", iconColor: "#8b5cf6", badge: "Active",   badgeBg: "#f5f3ff", badgeColor: "#7c3aed" },
  { label: "Pending Compliance Docs", value: 2,  icon: "alert",  accentColor: "#f59e0b", iconBg: "#fffbeb", iconColor: "#f59e0b", badge: "Review",   badgeBg: "#fffbeb", badgeColor: "#d97706" },
];

const ACTIVITY = [
  { text: "New incoming request from TechCorp Ltd", time: "2 min ago", icon: "inbox",  iconBg: "#eff6ff", iconColor: "#3b82f6" },
  { text: "Certification ISO 9001 approved",         time: "1 hr ago",  icon: "badge",  iconBg: "#ecfdf5", iconColor: G         },
  { text: "Staff member Ahmad added",                time: "3 hrs ago", icon: "users",  iconBg: "#f5f3ff", iconColor: "#8b5cf6" },
  { text: "Compliance document uploaded",            time: "Yesterday", icon: "upload", iconBg: "#fffbeb", iconColor: "#f59e0b" },
  { text: "Request #1042 marked completed",          time: "Yesterday", icon: "check",  iconBg: "#ecfdf5", iconColor: G         },
];

const QUICK = [
  { label: "View Incoming Requests", icon: "inbox",  iconBg: "#eff6ff", iconColor: "#3b82f6" },
  { label: "Manage Certifications",  icon: "badge",  iconBg: "#ecfdf5", iconColor: G         },
  { label: "Upload Compliance Doc",  icon: "upload", iconBg: "#fffbeb", iconColor: "#f59e0b" },
  { label: "Manage Staff",           icon: "users",  iconBg: "#f5f3ff", iconColor: "#8b5cf6" },
];

export default function ServiceProviderDashboard() {
  return (
    <>
      <style>{CSS}</style>
      <div style={{ minHeight: "100vh", background: BG }}>

        {/* TOP NAV */}
        <nav style={{ height: 62, background: G, padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 12px rgba(0,0,0,0.10)", position: "sticky", top: 0, zIndex: 100 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="dashboard" size={17} color="#fff" sw={1.9} />
            </div>
            <div>
              <div style={{ color: "#fff", fontSize: 15, fontWeight: 700, letterSpacing: "-0.3px" }}>Service Provider Dashboard</div>
              <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 10, letterSpacing: "0.8px", textTransform: "uppercase" }}>Provider Portal</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}>
                <Icon name="search" size={13} color="rgba(255,255,255,0.5)" sw={2} />
              </span>
              <input placeholder="Search…" style={{ background: "rgba(255,255,255,0.13)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 8, padding: "7px 14px 7px 30px", color: "#fff", fontSize: 13, width: 185 }} />
            </div>
            <div style={{ position: "relative", width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.13)", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <Icon name="bell" size={15} color="#fff" sw={1.8} />
              <span style={{ position: "absolute", top: 6, right: 7, width: 7, height: 7, background: "#f59e0b", borderRadius: "50%", border: `2px solid ${G}` }} />
            </div>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.18)", border: "2px solid rgba(255,255,255,0.35)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>SP</div>
            <span style={{ color: "#fff", fontSize: 13, fontWeight: 500 }}>Service Provider</span>
          </div>
        </nav>

        {/* CONTENT */}
        <div style={{ padding: "28px 30px", maxWidth: 1300, margin: "0 auto" }}>

          {/* Heading */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 26 }}>
            <div>
              <h1 style={{ fontSize: 23, fontWeight: 800, color: "#1a1f2e", letterSpacing: "-0.5px" }}>Service Provider Dashboard</h1>
              <p style={{ fontSize: 13.5, color: "#6b7280", marginTop: 4 }}>Welcome back. Here is your organization overview.</p>
            </div>
            <button style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 18px", borderRadius: 9, border: `1.5px solid ${G}`, background: "#fff", color: G, fontSize: 13, fontWeight: 600, cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.background = "#f0fdf4"}
              onMouseLeave={e => e.currentTarget.style.background = "#fff"}>
              <Icon name="refresh" size={14} color={G} sw={2} /> Refresh
            </button>
          </div>

          {/* Stat Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18, marginBottom: 24 }}>
            {STATS.map(s => <StatCard key={s.label} {...s} />)}
          </div>

          {/* Lower Panels */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 18, marginBottom: 20 }}>
            {/* Recent Activity */}
            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e8eaf0", padding: "22px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#1a1f2e" }}>Recent Activity</span>
                <span style={{ fontSize: 12, color: G, fontWeight: 600, cursor: "pointer" }}>View all</span>
              </div>
              {ACTIVITY.map((a, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 13, padding: "11px 0", borderBottom: i < ACTIVITY.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: a.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name={a.icon} size={16} color={a.iconColor} sw={1.9} />
                  </div>
                  <span style={{ flex: 1, fontSize: 13, color: "#374151", fontWeight: 500 }}>{a.text}</span>
                  <span style={{ fontSize: 11.5, color: "#9ca3af", whiteSpace: "nowrap" }}>{a.time}</span>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e8eaf0", padding: "22px" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1f2e", marginBottom: 16 }}>Quick Actions</div>
              {QUICK.map((a, i) => (
                <button key={i} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "11px 12px", borderRadius: 10, border: "1px solid #f0f1f4", background: "#fff", cursor: "pointer", marginBottom: 8, transition: "all 0.15s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#f9fafb"; e.currentTarget.style.borderColor = "#e5e7eb"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#f0f1f4"; }}>
                  <span style={{ width: 34, height: 34, borderRadius: 9, background: a.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name={a.icon} size={15} color={a.iconColor} sw={1.9} />
                  </span>
                  <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: "#374151", textAlign: "left" }}>{a.label}</span>
                  <Icon name="chevron" size={14} color="#d1d5db" sw={1.8} />
                </button>
              ))}
            </div>
          </div>

          {/* Compliance Banner */}
          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 14, padding: "18px 22px", display: "flex", alignItems: "flex-start", gap: 16 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon name="alert" size={18} color="#d97706" sw={2} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: "#92400e" }}>Compliance Review Pending</div>
              <div style={{ fontSize: 12.5, color: "#b45309", marginTop: 4, lineHeight: 1.65 }}>Your provider account is under review by the SuperAdmin. You will be notified once your documents are approved and your account is fully activated.</div>
            </div>
            <button style={{ flexShrink: 0, fontSize: 12.5, fontWeight: 600, color: "#92400e", border: "1px solid #fbbf24", padding: "8px 16px", borderRadius: 9, background: "#fff", cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.background = "#fef3c7"}
              onMouseLeave={e => e.currentTarget.style.background = "#fff"}>
              Learn more
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
