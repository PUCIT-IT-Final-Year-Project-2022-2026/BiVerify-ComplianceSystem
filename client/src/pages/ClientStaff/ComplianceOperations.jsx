import React, { useEffect, useState, useCallback } from "react";
import ComplianceSidebar from "../../components/ComplianceSidebar";
import { useNavigate } from "react-router-dom";
import api, { apiErrorMessage } from "../../api/client";

const G  = "#2b9d4e";
const GD = "#1f7a3b";

// ── icon helper 
const Ico = ({ n, s = 15, c = G }) => {
  const icons = {
    po:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
    tax:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 000 4h4a2 2 0 010 4H8"/><line x1="12" y1="6" x2="12" y2="8"/><line x1="12" y1="16" x2="12" y2="18"/></svg>,
    check: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>,
    scan:  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="3" height="3"/><rect x="18" y="14" width="3" height="3"/><rect x="14" y="18" width="3" height="3"/><rect x="18" y="18" width="3" height="3"/></svg>,
    bell:  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
    ops:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>,
    spin:  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 1s linear infinite" }}><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0"/></svg>,
  };
  return icons[n] || null;
};

// ── currency formatter 
const fmt = (n) =>
  typeof n === "number"
    ? n.toLocaleString("en-US", { style: "currency", currency: "USD" })
    : "$0.00";

// ── status badge styles 
const badgeStyle = (status) => {
  if (status === "in-progress") return { background: "rgba(59,130,246,0.10)", color: "#1e40af", border: "1px solid rgba(59,130,246,0.2)" };
  if (status === "completed")   return { background: "rgba(43,157,78,0.10)",  color: "#1f7a3b", border: "1px solid rgba(43,157,78,0.18)" };
  return { background: "rgba(245,158,11,0.10)", color: "#92400e", border: "1px solid rgba(245,158,11,0.25)" };
};

// ── toast notification
const Toast = ({ msg, type }) => (
  <div style={{
    position: "fixed", bottom: 24, right: 24, zIndex: 9999,
    background: type === "error" ? "#FEE2E2" : "#D1FAE5",
    color:      type === "error" ? "#991B1B" : "#065F46",
    border:     `1px solid ${type === "error" ? "#FECACA" : "#6EE7B7"}`,
    borderRadius: 10, padding: "12px 20px", fontSize: 13, fontWeight: 600,
    boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
    maxWidth: 340,
  }}>
    {msg}
  </div>
);


// ══════════════════════
export default function ComplianceOperations() {
  const navigate = useNavigate();

  // ── state ──────────────────────────────────────────────────────────────────
  const [jobs,    setJobs]    = useState([]);
  const [stats,   setStats]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [actionId, setActionId] = useState(null);   // id of job currently being actioned
  const [toast,   setToast]   = useState(null);      // { msg, type }
  const [filter,  setFilter]  = useState("all");     // "all" | "pending" | "in-progress" | "completed"

  // ── helpers ────────────────────────────────────────────────────────────────
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // ── data fetch ─────────────────────────────────────────────────────────────
  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [jobsRes, statsRes] = await Promise.all([
        api.get("/api/compliance-ops/jobs"),
        api.get("/api/compliance-ops/stats"),
      ]);
      setJobs(jobsRes.data.jobs || []);
      setStats(statsRes.data);
    } catch (err) {
      setError(apiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // ── action handlers ────────────────────────────────────────────────────────
  const handleScanQR = (job) => {
    // Navigate to the VerifyProvider page; pass the requestId so the scanner
    // knows which job to complete after a successful scan.
    navigate("/verify-provider", { state: { requestId: job.id, poNumber: job.poNumber } });
  };

  const handleStart = async (job) => {
    setActionId(job.id);
    try {
      await api.post(`/api/compliance-ops/jobs/${job.id}/start`);
      showToast(`Job ${job.poNumber || job.id} started ✓`);
      await fetchAll();
    } catch (err) {
      showToast(apiErrorMessage(err), "error");
    } finally {
      setActionId(null);
    }
  };

  // ── filtered jobs ──────────────────────────────────────────────────────────
  const visibleJobs = jobs.filter((j) => filter === "all" || j.status === filter);

  // ── KPI cards (built from live stats) ─────────────────────────────────────
  const kpis = stats
    ? [
        { label: "Total PO Value",      value: fmt(stats.totalPOValue),       sub: "All assigned jobs",    icon: "po"    },
        { label: "Total Tax Generated", value: fmt(stats.totalTaxGenerated),  sub: "Accumulated tax",       icon: "tax"   },
        { label: "Completed Jobs",      value: String(stats.completedJobs),   sub: "This assignment cycle", icon: "check" },
      ]
    : [
        { label: "Total PO Value",      value: "—", sub: "Loading…", icon: "po"    },
        { label: "Total Tax Generated", value: "—", sub: "Loading…", icon: "tax"   },
        { label: "Completed Jobs",      value: "—", sub: "Loading…", icon: "check" },
      ];

  // ── render ─────────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: "#F5F6FA", fontFamily: "'Inter', sans-serif" }}>

      {/* Sidebar */}
      <ComplianceSidebar />

      {/* spin keyframe */}
      <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>

      {/* Top Nav */}
      <nav style={{
        width: "calc(100% - 240px)", height: 60, background: G,
        padding: "0 28px", display: "flex", alignItems: "center",
        justifyContent: "space-between", position: "fixed", top: 0, left: 240,
        zIndex: 100, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", boxSizing: "border-box",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, background: "rgba(255,255,255,0.12)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Ico n="ops" s={16} c="#fff" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={{ color: "#fff", fontSize: 15, fontWeight: 700, letterSpacing: "-0.3px", lineHeight: 1.2 }}>Compliance &amp; Operations</span>
            <span style={{ color: "rgba(255,255,255,0.65)", fontSize: 11 }}>ADMIN PORTAL</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <Ico n="bell" s={15} c="#fff" />
            <span style={{ position: "absolute", top: 5, right: 6, width: 8, height: 8, background: "#F59E0B", borderRadius: "50%", border: `2px solid ${GD}` }} />
          </button>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.18)", border: "2px solid rgba(255,255,255,0.35)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>AO</div>
          <span style={{ color: "#fff", fontSize: 13, fontWeight: 500 }}>Asset Owner</span>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ marginLeft: 240, marginTop: 60, padding: "24px", background: "#F5F6FA", minHeight: "calc(100vh - 60px)", boxSizing: "border-box" }}>

        {/* ── KPI Cards ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
          {kpis.map((k, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 12, border: "1px solid rgba(43,157,78,0.12)", padding: "16px 20px", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", transition: "transform 0.18s, box-shadow 0.18s" }}
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

        {/* ── Filter tabs ── */}
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          {["all", "pending", "in-progress", "completed"].map((f) => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: "6px 16px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "none",
              background: filter === f ? G : "rgba(43,157,78,0.08)",
              color:      filter === f ? "#fff" : "#1f7a3b",
              transition: "background 0.15s",
            }}>
              {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* ── Section heading ── */}
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1A1D23", marginBottom: 10, letterSpacing: "-0.3px" }}>
          Assigned Verifications ({loading ? "…" : visibleJobs.length})
        </h2>

        {/* ── Error banner ── */}
        {error && (
          <div style={{ background: "#FEE2E2", color: "#991B1B", border: "1px solid #FECACA", borderRadius: 10, padding: "12px 18px", marginBottom: 16, fontSize: 13 }}>
            ⚠ {error} — <button onClick={fetchAll} style={{ background: "none", border: "none", color: "#991B1B", cursor: "pointer", fontWeight: 700, textDecoration: "underline", padding: 0 }}>Retry</button>
          </div>
        )}

        {/* ── Loading skeleton ── */}
        {loading && (
          <div style={{ background: "#fff", borderRadius: 12, padding: 32, textAlign: "center", color: "#6B7280", fontSize: 14 }}>
            <Ico n="spin" s={20} c={G} /> &nbsp; Loading jobs…
          </div>
        )}

        {/* ── Empty state ── */}
        {!loading && !error && visibleJobs.length === 0 && (
          <div style={{ background: "#fff", borderRadius: 12, padding: 40, textAlign: "center", color: "#6B7280", fontSize: 14, border: "1.5px dashed rgba(43,157,78,0.25)" }}>
            No {filter !== "all" ? filter : ""} verification jobs assigned to you.
          </div>
        )}

        {/* ── Jobs list ── */}
        {!loading && visibleJobs.length > 0 && (
          <div style={{ background: "#F8FFF9", borderRadius: 16, padding: 6, border: "1.5px solid rgba(43,157,78,0.25)", boxShadow: "0 4px 16px rgba(43,157,78,0.07)", overflow: "hidden" }}>
            {visibleJobs.map((job, i) => {
              const isActioning = actionId === job.id;
              return (
                <div key={job.id} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "14px 18px", background: "#fff",
                  borderBottom: i < visibleJobs.length - 1 ? "1px solid rgba(43,157,78,0.10)" : "none",
                  position: "relative", gap: 16,
                }}>
                  <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: G }} />

                  {/* Left: PO + provider + date */}
                  <div style={{ display: "flex", alignItems: "center", gap: 20, flex: 1, flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 13.5, fontWeight: 700, color: "#1A1D23", minWidth: 150 }}>
                      {job.poNumber || `SR-${job.id.slice(-8)}`}
                    </span>
                    <span style={{ fontSize: 13, color: "#6B7280" }}>
                      Provider: <strong>{job.provider}</strong>
                    </span>
                    <span style={{ fontSize: 13, color: "#6B7280" }}>
                      {job.scheduledDate
                        ? new Date(job.scheduledDate).toLocaleDateString("en-GB")
                        : job.createdAt
                          ? new Date(job.createdAt).toLocaleDateString("en-GB")
                          : "—"}
                    </span>
                    {job.location && (
                      <span style={{ fontSize: 12, color: "#9CA3AF" }}>{job.location}</span>
                    )}
                  </div>

                  {/* Right: status badge + actions */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0, width: 280, justifyContent: "flex-end" }}>

                    {/* Status badge */}
                    <span style={{
                      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 5,
                      padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, width: 110,
                      ...badgeStyle(job.status),
                    }}>
                      {job.status === "completed"   && <span style={{ width: 6, height: 6, borderRadius: "50%", background: G,        display: "inline-block" }} />}
                      {job.status === "pending"     && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#F59E0B", display: "inline-block" }} />}
                      {job.status === "in-progress" && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#3B82F6", display: "inline-block" }} />}
                      {job.label}
                    </span>

                    {/* Action buttons — only for non-completed jobs */}
                    {job.status !== "completed" ? (
                      <div style={{ display: "flex", gap: 6 }}>
                        {/* Start button (pending → in-progress) */}
                        {job.status === "pending" && (
                          <button onClick={() => handleStart(job)} disabled={isActioning} style={{
                            background: "rgba(43,157,78,0.1)", color: G,
                            border: `1px solid rgba(43,157,78,0.3)`, padding: "7px 14px",
                            borderRadius: 8, cursor: isActioning ? "not-allowed" : "pointer",
                            fontWeight: 600, fontSize: 12, fontFamily: "'Inter', sans-serif",
                            opacity: isActioning ? 0.6 : 1, transition: "background 0.15s",
                          }}>
                            {isActioning ? "…" : "Start"}
                          </button>
                        )}

                        {/* Scan QR button */}
                        <button onClick={() => handleScanQR(job)} disabled={isActioning} style={{
                          background: G, color: "#fff", border: "none",
                          padding: "9px 0", borderRadius: 8, cursor: "pointer",
                          fontWeight: 600, fontSize: 13, fontFamily: "'Inter', sans-serif",
                          display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
                          width: 110, transition: "background 0.15s",
                        }}
                          onMouseEnter={e => e.currentTarget.style.background = GD}
                          onMouseLeave={e => e.currentTarget.style.background = G}
                        >
                          <Ico n="scan" s={13} c="#fff" /> Scan QR
                        </button>
                      </div>
                    ) : (
                      /* Spacer for completed rows so badge stays right-aligned */
                      <div style={{ width: 130 }} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Toast */}
      {toast && <Toast msg={toast.msg} type={toast.type} />}
    </div>
  );
}