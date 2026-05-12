import { useState } from "react";

const G  = "#2b9d4e";
const GD = "#1f7a3b";
const SIDEBAR_W = 240;
const NAV_H     = 60;

const C = {
  primary: "#2b9d4e",
  dark: "#1f7a3b",
  light: "#4fb96e",
  soft: "#8fd6a3",
  pageBg: "#F5F6FA",
  card: "#FFFFFF",
  darkText: "#1A1D23",
  muted: "#6B7280",
  warning: "#F59E0B",
  danger: "#EF4444",
  border: "rgba(43,157,78,0.12)",
  borderMed: "rgba(43,157,78,0.18)",
  bgLight: "rgba(43,157,78,0.05)",
  bgMed: "rgba(43,157,78,0.08)",
  bgIcon: "rgba(43,157,78,0.1)",
  warnBg: "rgba(245,158,11,0.1)",
  dangerBg: "rgba(239,68,68,0.1)",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: ${C.pageBg}; color: ${C.darkText}; overflow-x: hidden; }
  html, body, #root { overflow-x: hidden; width: 100%; }

  /* ── TOP NAV ── */
  .topnav {
    background: #2b9d4e;
    height: 60px; padding: 0 28px;
    display: flex; align-items: center; justify-content: space-between;
    position: fixed; top: 0; left: 240px; right: 0; z-index: 100;
    box-shadow: 0 2px 8px rgba(31,122,59,0.2);
  }
  .topnav-left { display: flex; align-items: center; gap: 12px; }
  .topnav-icon-box { width: 36px; height: 36px; background: rgba(255,255,255,0.15); border-radius: 9px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .topnav-right { display: flex; align-items: center; gap: 10px; }
  .topnav-sitebadge { background: #1f7a3b; border-radius: 20px; padding: 4px 12px; color: rgba(255,255,255,0.9); font-size: 12px; font-weight: 500; display: flex; align-items: center; gap: 6px; }
  .pulse-dot { width: 6px; height: 6px; background: #8fd6a3; border-radius: 50%; animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.6;transform:scale(1.3)} }
  .notif-btn { width: 34px; height: 34px; border-radius: 50%; background: #1f7a3b; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; position: relative; }
  .notif-pip { position: absolute; top: 5px; right: 6px; width: 8px; height: 8px; background: #F59E0B; border-radius: 50%; border: 2px solid #2b9d4e; }
  .topnav-avatar { width: 34px; height: 34px; border-radius: 50%; background: #1f7a3b; border: 2px solid rgba(255,255,255,0.35); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 12px; font-weight: 600; cursor: pointer; }
  .topnav-name { color: #fff; font-size: 13px; font-weight: 500; }

  /* ── CONTENT ── */
  .main { padding: 24px 28px; min-height: calc(100vh - 60px); margin-top: 60px; background: #F5F6FA; width: 100%; box-sizing: border-box; }
  .section-label { font-size: 11px; font-weight: 600; color: ${C.muted}; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; }

  /* ── KPI ROW ── */
  .kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 22px; width: 100%; }
  @media(max-width: 900px){ .kpi-row{ grid-template-columns: 1fr 1fr; } }
  @media(max-width: 500px){ .kpi-row{ grid-template-columns: 1fr; } }

  .kpi-card {
    background: ${C.card}; border-radius: 12px; border: 1px solid ${C.border};
    padding: 12px 16px; position: relative; overflow: hidden;
    transition: transform 0.18s, box-shadow 0.18s; cursor: default;
  }
  .kpi-card:hover { transform: translateY(-2px); box-shadow: 0 4px 14px rgba(43,157,78,0.09); }
  .kpi-card-accent { position: absolute; top: 0; left: 0; width: 3px; height: 100%; background: ${C.primary}; border-radius: 12px 0 0 12px; }
  .kpi-card-accent.warn { background: ${C.warning}; }
  .kpi-card-accent.danger { background: ${C.danger}; }
  .kpi-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px; }
  .kpi-label { font-size: 11px; font-weight: 500; color: ${C.muted}; text-transform: uppercase; letter-spacing: 0.4px; }
  .kpi-icon-wrap { width: 28px; height: 28px; border-radius: 7px; background: ${C.bgIcon}; display: flex; align-items: center; justify-content: center; }
  .kpi-icon-wrap.warn { background: ${C.warnBg}; }
  .kpi-icon-wrap.danger { background: ${C.dangerBg}; }
  .kpi-value { font-size: 22px; font-weight: 600; color: ${C.darkText}; letter-spacing: -0.8px; line-height: 1; margin-bottom: 4px; font-family: 'DM Mono', monospace; }
  .kpi-meta { font-size: 11px; color: ${C.muted}; display: flex; align-items: center; gap: 4px; }
  .kpi-up { color: ${C.primary}; font-weight: 600; }
  .kpi-dn { color: ${C.danger}; font-weight: 600; }
  .kpi-divider { border: none; border-top: 1px solid ${C.border}; margin: 8px 0 6px; }
  .kpi-sub { font-size: 10.5px; color: ${C.muted}; }
  .kpi-sub b { color: ${C.darkText}; font-weight: 600; }

  /* ── CHART SECTION TABS ── */
  .chart-section { background: ${C.card}; border-radius: 12px; border: 1px solid ${C.border}; padding: 20px; margin-bottom: 22px; width: 100%; box-sizing: border-box; }
  .chart-header { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-bottom: 18px; }
  .chart-tabs { display: flex; gap: 0; }
  .chart-tab { padding: 6px 16px; font-size: 13px; font-weight: 500; color: ${C.muted}; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.15s; }
  .chart-tab.active { color: ${C.primary}; border-bottom-color: ${C.primary}; }
  .chart-tab:hover:not(.active) { color: ${C.darkText}; }
  .chart-filter { display: flex; align-items: center; gap: 4px; }
  .filter-btn { padding: 5px 11px; font-size: 12px; font-weight: 500; color: ${C.muted}; border: 1px solid ${C.border}; border-radius: 6px; background: ${C.pageBg}; cursor: pointer; transition: all 0.15s; }
  .filter-btn.active { background: ${C.primary}; color: #fff; border-color: ${C.primary}; }
  .filter-btn:hover:not(.active) { border-color: ${C.primary}; color: ${C.primary}; }

  /* ── CHART + RANKING GRID ── */
  .chart-body { display: grid; grid-template-columns: 1fr 320px; gap: 24px; }
  @media(max-width: 900px){ .chart-body{ grid-template-columns: 1fr; } }

  /* ── BAR CHART ── */
  .chart-title { font-size: 13px; font-weight: 600; color: ${C.darkText}; margin-bottom: 14px; }
  .bar-area { display: flex; align-items: flex-end; gap: 8px; height: 160px; position: relative; }
  .bar-year-group { display: flex; align-items: flex-end; gap: 4px; flex: 1; flex-direction: column; }
  .bar-year-cols { display: flex; align-items: flex-end; gap: 4px; width: 100%; }
  .bar-col { flex: 1; border-radius: 4px 4px 0 0; cursor: pointer; transition: opacity 0.15s; min-width: 10px; }
  .bar-col:hover { opacity: 0.75; }
  .bar-col.primary { background: ${C.primary}; }
  .bar-col.light { background: ${C.soft}; }
  .bar-year-label { font-size: 11px; color: ${C.muted}; text-align: center; width: 100%; margin-top: 6px; font-family: 'DM Mono', monospace; }
  .bar-chart-wrap { display: flex; flex-direction: column; }
  .bar-rows { display: flex; align-items: flex-end; gap: 18px; height: 160px; }
  .y-axis { display: flex; flex-direction: column; justify-content: space-between; height: 160px; padding-bottom: 4px; }
  .y-label { font-size: 10px; color: ${C.muted}; font-family: 'DM Mono', monospace; text-align: right; }
  .bars-grid { flex: 1; display: flex; align-items: flex-end; gap: 6px; position: relative; }
  .bars-grid::before { content: ''; position: absolute; inset: 0 0 0 0; background: repeating-linear-gradient(to top, transparent, transparent calc(25% - 0.5px), ${C.border} calc(25% - 0.5px), ${C.border} 25%); pointer-events: none; }
  .bar-group { display: flex; gap: 3px; align-items: flex-end; flex: 1; flex-direction: column; }
  .bar-group-cols { display: flex; gap: 3px; align-items: flex-end; width: 100%; }
  .bar-group-label { font-size: 10px; color: ${C.muted}; text-align: center; width: 100%; padding-top: 6px; font-family: 'DM Mono', monospace; }

  /* ── RANKING ── */
  .ranking-title { font-size: 13px; font-weight: 600; color: ${C.darkText}; margin-bottom: 14px; }
  .rank-item { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid ${C.border}; }
  .rank-item:last-child { border-bottom: none; }
  .rank-num { width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; flex-shrink: 0; }
  .rank-num.top { background: ${C.primary}; color: #fff; }
  .rank-num.reg { background: ${C.bgMed}; color: ${C.muted}; }
  .rank-name { flex: 1; font-size: 13px; color: ${C.darkText}; }
  .rank-val { font-size: 12px; font-weight: 600; color: ${C.darkText}; font-family: 'DM Mono', monospace; }

  /* ── BOTTOM ROW ── */
  .bottom-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  @media(max-width: 900px){ .bottom-row{ grid-template-columns: 1fr; } }

  /* ── CARD ── */
  .card { background: ${C.card}; border-radius: 12px; border: 1px solid ${C.border}; padding: 20px; width: 100%; box-sizing: border-box; }
  .card-hdr { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
  .card-title { font-size: 13.5px; font-weight: 600; color: ${C.darkText}; }
  .card-action { font-size: 12px; color: ${C.primary}; cursor: pointer; font-weight: 500; }
  .card-action:hover { text-decoration: underline; }

  /* ── COMPLIANCE ── */
  .comp-wrap { display: flex; align-items: center; gap: 18px; }
  .comp-list { flex: 1; }
  .comp-item { display: flex; align-items: center; margin-bottom: 10px; gap: 8px; }
  .comp-item:last-child { margin-bottom: 0; }
  .comp-name { font-size: 12.5px; color: ${C.darkText}; min-width: 72px; }
  .comp-bar-wrap { flex: 1; background: ${C.bgLight}; border-radius: 4px; height: 6px; overflow: hidden; }
  .comp-bar { height: 100%; border-radius: 4px; background: ${C.primary}; }
  .comp-bar.warn { background: ${C.warning}; }
  .comp-bar.danger { background: ${C.danger}; }
  .comp-pct { font-size: 11.5px; font-weight: 600; color: ${C.primary}; font-family: 'DM Mono', monospace; min-width: 34px; text-align: right; }
  .comp-pct.warn { color: ${C.warning}; }
  .comp-pct.danger { color: ${C.danger}; }

  /* ── QR / RECENT SCANS ── */
  .scans-list { display: flex; flex-direction: column; gap: 0; }
  .scan-row { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid ${C.border}; }
  .scan-row:last-child { border-bottom: none; }
  .scan-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .scan-dot.ok { background: ${C.primary}; }
  .scan-dot.warn { background: ${C.warning}; }
  .scan-site { flex: 1; font-size: 13px; color: ${C.darkText}; font-weight: 500; }
  .scan-sub { font-size: 11px; color: ${C.muted}; }
  .scan-time { font-size: 11px; color: ${C.muted}; font-family: 'DM Mono', monospace; white-space: nowrap; }

  /* ── BADGES ── */
  .badge { display: inline-flex; align-items: center; gap: 4px; padding: 3px 9px; border-radius: 20px; font-size: 11px; font-weight: 600; }
  .badge-green { background: ${C.bgIcon}; color: ${C.dark}; border: 1px solid ${C.borderMed}; }
  .badge-warn  { background: ${C.warnBg}; color: #92400e; border: 1px solid rgba(245,158,11,0.25); }
  .badge-danger{ background: ${C.dangerBg}; color: #991b1b; border: 1px solid rgba(239,68,68,0.2); }
  .badge-gray  { background: ${C.bgMed}; color: ${C.muted}; border: 1px solid ${C.border}; }

  /* ── RESPONSIVE ── */
  @media(max-width: 600px){
    .main { padding: 16px; }
    .topnav-divider,.topnav-pagetitle,.topnav-sitebadge { display: none; }
  }

  /* ── SCROLLBAR ── */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-thumb { background: ${C.soft}; border-radius: 4px; }

  /* ── ANIMATIONS ── */
  @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
  .fu { animation: fadeUp 0.3s ease forwards; opacity: 0; }
  .fu-1 { animation-delay: 0.04s; }
  .fu-2 { animation-delay: 0.1s; }
  .fu-3 { animation-delay: 0.16s; }
  .fu-4 { animation-delay: 0.22s; }
`;

/* ── ICONS ── */
const Ico = ({ n, s = 16, c = C.primary }) => {
  const d = {
    qr:        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="3" height="3" rx="0.5"/><rect x="18" y="14" width="3" height="3" rx="0.5"/><rect x="14" y="18" width="3" height="3" rx="0.5"/><rect x="18" y="18" width="3" height="3" rx="0.5"/></svg>,
    providers: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
    doc:       <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>,
    chart:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    check:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>,
    alert:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    bell:      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
    scan:      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 23 2 19 2"/><polyline points="1 6 1 2 5 2"/><polyline points="23 18 23 22 19 22"/><polyline points="1 18 1 22 5 22"/><line x1="1" y1="12" x2="23" y2="12"/></svg>,
    info:      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
    shield:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    home:      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>,
    network:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><line x1="12" y1="8" x2="12" y2="13"/><line x1="12" y1="13" x2="5" y2="16"/><line x1="12" y1="13" x2="19" y2="16"/></svg>,
    bookings:  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    vault:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>,
    team:      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
    settings:  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
    logout:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  };
  return d[n] || null;
};

/* ── RING CHART ── */
const Ring = ({ value, size = 88 }) => {
  const r = 34, cx = 44, cy = 44, circ = 2 * Math.PI * r;
  const color = value < 50 ? C.danger : value < 80 ? C.warning : C.primary;
  return (
    <svg width={size} height={size} viewBox="0 0 88 88" style={{ flexShrink: 0 }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.bgIcon} strokeWidth="7"/>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="7"
        strokeDasharray={`${(value/100)*circ} ${circ}`}
        strokeDashoffset={circ * 0.25} strokeLinecap="round"/>
      <text x={cx} y={cy - 3} textAnchor="middle" fontSize="15" fontWeight="600" fill={color} fontFamily="DM Mono">{value}%</text>
      <text x={cx} y={cy + 13} textAnchor="middle" fontSize="9" fill={C.muted} fontFamily="DM Sans">overall</text>
    </svg>
  );
};

/* ── DATA ── */
const kpis = [
  { label: "Active Providers", value: "18", sub: "3 onboarded this month", trend: "+3", up: true, icon: "providers", accentClass: "" },
  { label: "Compliance Rate",  value: "79%", sub: "Target 90%",           trend: "−4%", up: false, icon: "doc",       accentClass: "" },
  { label: "QR Scans Today",   value: "34",  sub: "12 more than yesterday", trend: "+12", up: true, icon: "qr",        accentClass: "" },
  { label: "Expiring Docs",    value: "3",   sub: "Within next 30 days",  trend: "!",   up: false, icon: "alert",     accentClass: "danger" },
];

// QR Verifications: grouped bars per quarter (Q1–Q4) per year
const scanYearGroups = [
  { year: "2023 Q1", bars: [28, 18] },
  { year: "2023 Q2", bars: [34, 22] },
  { year: "2023 Q3", bars: [41, 14] },
  { year: "2023 Q4", bars: [30, 20] },
  { year: "2024 Q1", bars: [38, 16] },
  { year: "2024 Q2", bars: [52, 10] },
  { year: "2024 Q3", bars: [56, 8] },
  { year: "2024 Q4", bars: [44, 12] },
];

const scans = [
  { site: "Site A – Lahore HQ",       provider: "CleanTech Solutions", time: "2m ago",  status: "Verified" },
  { site: "Site B – DHA Warehouse",   provider: "GreenClean Services",  time: "38m ago", status: "Verified" },
  { site: "Site C – Gulberg Office",  provider: "TechFix Pakistan",     time: "1h ago",  status: "Mismatch" },
  { site: "Site A – Lahore HQ",       provider: "SafeGuard Security",   time: "2h ago",  status: "Verified" },
  { site: "Site D – Model Town",      provider: "PowerSystems Ltd",     time: "3h ago",  status: "Verified" },
  { site: "Site B – DHA Warehouse",   provider: "AquaFlow Services",    time: "5h ago",  status: "Verified" },
];

const rankings = [
  { name: "CleanTech Solutions", val: "127 jobs", top: true },
  { name: "GreenClean Services", val: "98 jobs",  top: true },
  { name: "TechFix Pakistan",    val: "81 jobs",  top: true },
  { name: "SafeGuard Security",  val: "64 jobs",  top: false },
  { name: "PowerSystems Ltd",    val: "39 jobs",  top: false },
  { name: "AquaFlow Services",   val: "22 jobs",  top: false },
  { name: "ProBuild Contracts",  val: "14 jobs",  top: false },
];

const NAV_SECTIONS = [
  { section: "MANAGEMENT", items: [
    { id: "overview", icon: "home",     label: "Overview"         },
    { id: "network",  icon: "network",  label: "B2B Network"      },
  ]},
  { section: "ASSET OPERATIONS", items: [
    { id: "bookings", icon: "bookings", label: "Service Bookings" },
    { id: "vault",    icon: "vault",    label: "Compliance Vault" },
    { id: "team",     icon: "team",     label: "My Team"          },
    { id: "clientqr", icon: "qr",       label: "ClientQR"         },
  ]},
  { section: "SYSTEM", items: [
    { id: "audit",    icon: "check",    label: "Audit History"    },
    { id: "settings", icon: "settings", label: "Settings"         },
  ]},
];

export default function ClientDashboard() {
  const [filterBtn, setFilterBtn] = useState("year");
  const [activeNav, setActiveNav] = useState("overview");
  const [hoverNav,  setHoverNav]  = useState(null);
  const MAX_SCAN = 56;

  return (
    <>
      <style>{css}</style>

      {/* ── TOP NAV ── */}
      <nav className="topnav">
        <div className="topnav-left">
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ width:36, height:36, background:"rgba(255,255,255,0.15)", borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <Ico n="home" s={16} c="#fff"/>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
              <span style={{ color:"#fff", fontSize:15, fontWeight:700, letterSpacing:"-0.3px", lineHeight:1.2 }}>Dashboard</span>
              <span style={{ color:"rgba(255,255,255,0.65)", fontSize:11 }}>Overview · {new Date().toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</span>
            </div>
          </div>
        </div>
        <div className="topnav-right">
          <div className="topnav-sitebadge">
            <span className="pulse-dot"/>
            Site A – Lahore HQ
          </div>
          <button className="notif-btn" aria-label="Notifications">
            <Ico n="bell" s={15} c="rgba(255,255,255,0.85)"/>
            <span className="notif-pip"/>
          </button>
          <div className="topnav-avatar">AC</div>
          <span className="topnav-name">Acme Corp</span>
        </div>
      </nav>

      {/* ── MAIN ── */}
      <div className="main" style={{ width: "100%", minWidth: 0, display: "block" }}>

        {/* KPI ROW */}
        <div className="kpi-row fu fu-1">
          {kpis.map((k, i) => (
            <div className="kpi-card" key={i}>
              <div className={`kpi-card-accent ${k.accentClass}`}/>
              <div className="kpi-top">
                <span className="kpi-label">{k.label}</span>
                <div className={`kpi-icon-wrap ${k.accentClass}`}>
                  <Ico n={k.icon} s={15} c={k.accentClass === "danger" ? C.danger : C.primary}/>
                </div>
              </div>
              <div className="kpi-value">{k.value}</div>
              <div className="kpi-meta">
                <span className={k.up ? "kpi-up" : "kpi-dn"}>{k.trend}</span>
                <span style={{color: C.muted}}>&nbsp;{k.up ? "vs last month" : k.accentClass === "danger" ? "action needed" : "vs last month"}</span>
              </div>
              <hr className="kpi-divider"/>
              <div className="kpi-sub">{k.sub}</div>
            </div>
          ))}
        </div>

        {/* ── CHART SECTION ── */}
        <div className="chart-section fu fu-2">
          <div className="chart-header" style={{ display:"grid", gridTemplateColumns:"1fr 320px", gap:24, alignItems:"center" }}>
            <div className="chart-tabs">
              <div className="chart-tab active">QR Verifications</div>
            </div>
            <div className="chart-filter">
              {[["day","All day"],["week","All week"],["month","All month"],["year","All year"]].map(([f,l]) => (
                <button key={f} className={`filter-btn ${filterBtn === f ? "active" : ""}`} onClick={() => setFilterBtn(f)}>{l}</button>
              ))}
            </div>
          </div>

          <div className="chart-body">
            {/* Left: Chart */}
            <div>
              <div className="chart-title">
                {"QR Scan Volume by Quarter (QR Verified vs Photo/Manual)"}
              </div>

              {(
                <>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: 160, paddingBottom: 22 }}>
                      {[60,45,30,15,0].map(v => (
                        <span key={v} style={{ fontSize: 10, color: C.muted, fontFamily: "DM Mono", lineHeight: 1 }}>{v}</span>
                      ))}
                    </div>
                    <div style={{ flex: 1, position: "relative" }}>
                      <div style={{ position: "absolute", inset: "0 0 22px 0", display: "flex", flexDirection: "column", justifyContent: "space-between", pointerEvents: "none" }}>
                        {[0,1,2,3,4].map(i => <div key={i} style={{ borderTop: `1px solid ${C.border}`, width: "100%" }}/>)}
                      </div>
                      <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 160 }}>
                        {scanYearGroups.map((g, gi) => (
                          <div key={gi} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <div style={{ display: "flex", gap: 2, alignItems: "flex-end", width: "100%", height: 138 }}>
                              {g.bars.map((h, bi) => (
                                <div key={bi} style={{
                                  height: `${(h / MAX_SCAN) * 138}px`, flex: 1,
                                  borderRadius: "3px 3px 0 0",
                                  background: bi === 0 ? C.primary : C.soft,
                                  cursor: "pointer", transition: "opacity 0.15s",
                                }}
                                  onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
                                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                                />
                              ))}
                            </div>
                            <div style={{ fontSize: 9.5, color: C.muted, fontFamily: "DM Mono", marginTop: 5, textAlign: "center", whiteSpace: "nowrap" }}>{g.year}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 14, marginTop: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}><div style={{ width: 10, height: 10, borderRadius: 2, background: C.primary }}/><span style={{ fontSize: 11, color: C.muted }}>QR Verified</span></div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}><div style={{ width: 10, height: 10, borderRadius: 2, background: C.soft }}/><span style={{ fontSize: 11, color: C.muted }}>Photo / Manual</span></div>
                  </div>
                </>
              )}

            </div>

            {/* Right: Provider Ranking */}
            <div>
              <div className="ranking-title">Provider Ranking (by verified jobs)</div>
              {rankings.map((r, i) => (
                <div className="rank-item" key={i}>
                  <div className={`rank-num ${r.top ? "top" : "reg"}`}>{i + 1}</div>
                  <span className="rank-name">{r.name}</span>
                  <span className="rank-val">{r.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RECENT QR SCANS (full width) ── */}
        <div className="card fu fu-3">
          <div className="card-hdr">
            <span className="card-title">Recent QR Scans</span>
            <span className="card-action">View All →</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "0 32px" }}>
            {scans.map((s, i) => (
              <div className="scan-row" key={i}>
                <span className={`scan-dot ${s.status === "Verified" ? "ok" : "warn"}`}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="scan-site">{s.site}</div>
                  <div className="scan-sub">{s.provider}</div>
                </div>
                <span className="scan-time">{s.time}</span>
                <span className={`badge ${s.status === "Verified" ? "badge-green" : "badge-warn"}`}>
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}