// @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
import React from "react";
import ComplianceSidebar from "../../components/ComplianceSidebar";
import { useNavigate } from "react-router-dom";

const G  = "#2b9d4e";   // primary green — matches sidebar
const GD = "#1f7a3b";   // dark green — navbar background (one shade darker than sidebar)

const Ico = ({ n, s = 15, c = G }) => {
  const icons = {
    po:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
    tax:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 000 4h4a2 2 0 010 4H8"/><line x1="12" y1="6" x2="12" y2="8"/><line x1="12" y1="16" x2="12" y2="18"/></svg>,
    check:  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>,
    scan:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="3" height="3"/><rect x="18" y="14" width="3" height="3"/><rect x="14" y="18" width="3" height="3"/><rect x="18" y="18" width="3" height="3"/></svg>,
    bell:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
    ops:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>,
  };
  return icons[n] || null;
};

const kpis = [
  { label: "Total PO Value",      value: "$89.86", sub: "Current billing cycle", icon: "po"    },
  { label: "Total Tax Generated", value: "$8.99",  sub: "10% of PO value",       icon: "tax"   },
  { label: "Completed Jobs",      value: "0",      sub: "This month",            icon: "check" },
];

const jobs = [
  { id: "PO-3956128047", provider: "SafeGuard Ltd", date: "22/03/2026", status: "completed",   label: "Completed"   },
  { id: "PO-1772507457", provider: "goodme",        date: "27/03/2026", status: "in-progress", label: "In Progress" },
  { id: "PO-2841903621", provider: "CleanTech Co",  date: "25/03/2026", status: "in-progress", label: "In Progress" },
  { id: "PO-4103857294", provider: "AquaFlow Svcs", date: "20/03/2026", status: "pending",     label: "Pending"     },
];

export default function ComplianceOperations() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#F5F6FA", fontFamily: "'Inter', sans-serif" }}>

      {/* ── SIDEBAR — reusable component ── */}
      <ComplianceSidebar />

      {/* ── TOP NAV — #1f7a3b, darker than sidebar #2b9d4e ── */}
      <nav style={{
        width: "calc(100% - 240px)",
        height: 60,
        background: G,                               // #1f7a3b — darker shade
        padding: "0 28px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "fixed", top: 0, left: 240, zIndex: 100,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        boxSizing: "border-box",
      }}>

        {/* Left: page icon + title + subtitle */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 36, height: 36,
            background: "rgba(255,255,255,0.12)",    // same as ClientDashboard navbar icon box
            borderRadius: 9,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <Ico n="ops" s={16} c="#fff" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={{ color: "#fff", fontSize: 15, fontWeight: 700, letterSpacing: "-0.3px", lineHeight: 1.2 }}>
              Compliance &amp; Operations
            </span>
            <span style={{ color: "rgba(255,255,255,0.65)", fontSize: 11 }}>
              ADMIN PORTAL
            </span>
          </div>
        </div>

        {/* Right: sitebadge style bell + avatar — matching ClientDashboard */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button style={{
            width: 34, height: 34, borderRadius: "50%",
            background: "rgba(255,255,255,0.12)",     // same as ClientDashboard .notif-btn
            border: "1px solid rgba(255,255,255,0.2)",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative",
          }}>
            <Ico n="bell" s={15} c="#fff" />
            <span style={{
              position: "absolute", top: 5, right: 6,
              width: 8, height: 8, background: "#F59E0B",
              borderRadius: "50%", border: `2px solid ${GD}`,
            }} />
          </button>

          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            background: "rgba(255,255,255,0.18)",     // same as ClientDashboard .topnav-avatar
            border: "2px solid rgba(255,255,255,0.35)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer",
          }}>AO</div>

          <span style={{ color: "#fff", fontSize: 13, fontWeight: 500 }}>Asset Owner</span>
        </div>
      </nav>

      {/* ── MAIN CONTENT ── */}
      <div style={{
        marginLeft: 240, marginTop: 60,
        padding: "24px",
        background: "#F5F6FA",
        minHeight: "calc(100vh - 60px)",
        boxSizing: "border-box",
      }}>

        {/* KPI Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
          {kpis.map((k, i) => (
            <div key={i} style={{
              background: "#fff", borderRadius: 12,
              border: "1px solid rgba(43,157,78,0.12)",
              padding: "16px 20px", position: "relative", overflow: "hidden",
              display: "flex", flexDirection: "column",
              transition: "transform 0.18s, box-shadow 0.18s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(43,157,78,0.09)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: G, borderRadius: "12px 0 0 12px" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <span style={{ fontSize: 11, fontWeight: 500, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.4px" }}>{k.label}</span>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: "rgba(43,157,78,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Ico n={k.icon} s={14} c={G} />
                </div>
              </div>
              <div style={{ fontSize: 22, fontWeight: 600, color: "#1A1D23", letterSpacing: "-0.8px", lineHeight: 1, marginBottom: 4, fontFamily: "'DM Mono', monospace" }}>{k.value}</div>
              <hr style={{ border: "none", borderTop: "1px solid rgba(43,157,78,0.12)", margin: "8px 0 6px" }} />
              <span style={{ fontSize: 10.5, color: "#6B7280" }}>{k.sub}</span>
            </div>
          ))}
        </div>

        {/* Section heading */}
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1A1D23", marginBottom: 10, letterSpacing: "-0.3px" }}>
          Assigned Verifications ({jobs.length})
        </h2>

        {/* Verifications container */}
        <div style={{
          background: "#F8FFF9", borderRadius: 16, padding: 6,
          border: "1.5px solid rgba(43,157,78,0.25)",
          boxShadow: "0 4px 16px rgba(43,157,78,0.07)",
          overflow: "hidden",
        }}>
          {jobs.map((job, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "14px 18px", background: "#fff",
              borderBottom: i < jobs.length - 1 ? "1px solid rgba(43,157,78,0.10)" : "none",
              position: "relative", gap: 16,
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: G }} />
              <div style={{ display: "flex", alignItems: "center", gap: 20, flex: 1 }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 13.5, fontWeight: 700, color: "#1A1D23", minWidth: 150 }}>{job.id}</span>
                <span style={{ fontSize: 13, color: "#6B7280" }}>Provider: <strong>{job.provider}</strong></span>
                <span style={{ fontSize: 13, color: "#6B7280" }}>{job.date}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0, width: 260, justifyContent: "flex-end" }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 5,
                  padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, width: 110,
                  ...(job.status === "in-progress" ? { background: "rgba(59,130,246,0.10)", color: "#1e40af", border: "1px solid rgba(59,130,246,0.2)"   }
                    : job.status === "completed"   ? { background: "rgba(43,157,78,0.10)",  color: "#1f7a3b", border: "1px solid rgba(43,157,78,0.18)"   }
                    :                               { background: "rgba(245,158,11,0.10)", color: "#92400e", border: "1px solid rgba(245,158,11,0.25)" })
                }}>
                  {job.status === "completed" && <span style={{ width: 6, height: 6, borderRadius: "50%", background: G,        display: "inline-block" }} />}
                  {job.status === "pending"   && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#F59E0B", display: "inline-block" }} />}
                  {job.label}
                </span>
                {job.status !== "completed" ? (
                  <button onClick={() => navigate("/verify-provider")} style={{
                    background: G, color: "#fff", border: "none", padding: "9px 0",
                    borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 13,
                    fontFamily: "'Inter', sans-serif",
                    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
                    width: 120,
                    transition: "background 0.15s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = GD}
                    onMouseLeave={e => e.currentTarget.style.background = G}
                  >
                    <Ico n="scan" s={13} c="#fff" /> Scan QR
                  </button>
                ) : (
                  <div style={{ width: 120 }} />
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}