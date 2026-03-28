import { useState, useRef, useEffect } from "react";

const C = {
  primary:    "#2b9d4e",
  dark:       "#1f7a3b",
  light:      "#4fb96e",
  soft:       "#8fd6a3",
  pageBg:     "#F5F6FA",
  card:       "#FFFFFF",
  darkText:   "#1A1D23",
  muted:      "#6B7280",
  warning:    "#F59E0B",
  danger:     "#EF4444",
  border:     "rgba(43,157,78,0.12)",
  borderMed:  "rgba(43,157,78,0.18)",
  bgLight:    "rgba(43,157,78,0.05)",
  bgMed:      "rgba(43,157,78,0.08)",
  bgIcon:     "rgba(43,157,78,0.1)",
  warnBg:     "rgba(245,158,11,0.1)",
  dangerBg:   "rgba(239,68,68,0.1)",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: ${C.pageBg}; color: ${C.darkText}; }

  .topnav {
    background: ${C.primary}; height: 60px; padding: 0 28px;
    display: flex; align-items: center; justify-content: space-between;
    position: sticky; top: 0; z-index: 100;
    box-shadow: 0 2px 8px rgba(31,122,59,0.18);
  }
  .topnav-left  { display: flex; align-items: center; gap: 10px; }
  .topnav-logobox { width: 30px; height: 30px; background: ${C.dark}; border-radius: 7px; display: flex; align-items: center; justify-content: center; }
  .topnav-title { color: #fff; font-size: 16px; font-weight: 600; letter-spacing: -0.3px; }
  .topnav-sub   { color: rgba(255,255,255,0.65); font-size: 10.5px; letter-spacing: 0.6px; text-transform: uppercase; }
  .topnav-div   { width: 1px; height: 28px; background: rgba(255,255,255,0.2); margin: 0 14px; }
  .topnav-pg    { color: rgba(255,255,255,0.9); font-size: 13.5px; font-weight: 500; }
  .topnav-right { display: flex; align-items: center; gap: 10px; }
  .topnav-site  { background: ${C.dark}; border-radius: 20px; padding: 4px 12px; color: rgba(255,255,255,0.9); font-size: 12px; font-weight: 500; display: flex; align-items: center; gap: 6px; }
  .pulse-dot    { width: 6px; height: 6px; background: ${C.soft}; border-radius: 50%; animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.6;transform:scale(1.3)} }
  .notif-btn    { width: 34px; height: 34px; border-radius: 50%; background: ${C.dark}; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; position: relative; }
  .notif-pip    { position: absolute; top: 5px; right: 6px; width: 8px; height: 8px; background: ${C.warning}; border-radius: 50%; border: 2px solid ${C.primary}; }
  .topnav-av    { width: 34px; height: 34px; border-radius: 50%; background: ${C.dark}; border: 2px solid rgba(255,255,255,0.35); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 12px; font-weight: 600; cursor: pointer; }
  .topnav-name  { color: #fff; font-size: 13px; font-weight: 500; }

  .page { padding: 28px; min-height: calc(100vh - 60px); }

  .page-hdr     { margin-bottom: 22px; }
  .breadcrumb   { font-size: 12px; color: ${C.muted}; margin-bottom: 5px; display: flex; align-items: center; gap: 5px; }
  .bc-active    { color: ${C.primary}; font-weight: 500; }
  .page-title   { font-size: 22px; font-weight: 600; color: ${C.darkText}; letter-spacing: -0.5px; }
  .page-sub     { font-size: 13px; color: ${C.muted}; margin-top: 3px; }

  .stat-strip   { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; margin-bottom: 22px; }
  @media(max-width:700px){ .stat-strip{ grid-template-columns: 1fr 1fr; } }
  .stat-card    { background: ${C.card}; border: 1px solid ${C.border}; border-radius: 12px; padding: 14px 18px; display: flex; align-items: center; gap: 14px; transition: transform 0.15s; }
  .stat-card:hover { transform: translateY(-1px); box-shadow: 0 4px 14px rgba(43,157,78,0.09); }
  .stat-ico     { width: 38px; height: 38px; border-radius: 10px; background: ${C.bgIcon}; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .stat-ico.warn   { background: ${C.warnBg}; }
  .stat-ico.info   { background: rgba(59,130,246,0.08); }
  .stat-val     { font-size: 22px; font-weight: 600; color: ${C.darkText}; font-family: 'DM Mono', monospace; letter-spacing: -0.5px; line-height: 1; }
  .stat-lbl     { font-size: 11.5px; color: ${C.muted}; margin-top: 3px; }

  .split        { display: grid; grid-template-columns: 1fr 320px; gap: 16px; align-items: stretch; }
  @media(max-width:960px){ .split{ grid-template-columns: 1fr; } }

  .panel        { background: ${C.card}; border: 1px solid ${C.border}; border-radius: 14px; overflow: hidden; height: 100%; display: flex; flex-direction: column; }
  .panel-head   { background: ${C.primary}; padding: 16px 20px; display: flex; align-items: center; justify-content: space-between; }
  .ph-title     { color: #fff; font-size: 14px; font-weight: 600; }
  .ph-sub       { color: rgba(255,255,255,0.7); font-size: 11.5px; margin-top: 2px; }
  .ph-badge     { background: rgba(255,255,255,0.18); border: 1px solid rgba(255,255,255,0.28); border-radius: 20px; padding: 3px 11px; color: #fff; font-size: 11px; font-weight: 500; white-space: nowrap; }

  .search-row   { display: flex; align-items: center; gap: 10px; padding: 14px 18px; border-bottom: 1px solid ${C.border}; }
  .search-wrap  { flex: 1; display: flex; align-items: center; gap: 8px; background: ${C.bgLight}; border: 1px solid ${C.border}; border-radius: 8px; padding: 8px 12px; }
  .search-wrap input { background: none; border: none; outline: none; font-size: 13px; color: ${C.darkText}; flex: 1; font-family: 'DM Sans', sans-serif; }
  .search-wrap input::placeholder { color: ${C.muted}; }
  .fpill-wrap   { display: flex; gap: 4px; }
  .fpill        { padding: 6px 12px; font-size: 12px; font-weight: 500; border-radius: 8px; cursor: pointer; border: 1px solid ${C.border}; background: transparent; color: ${C.muted}; transition: all 0.13s; font-family: 'DM Sans', sans-serif; }
  .fpill.active { background: ${C.primary}; color: #fff; border-color: ${C.primary}; }
  .fpill:hover:not(.active) { border-color: ${C.primary}; color: ${C.primary}; }

  .partner-list { padding: 4px 0; flex: 1; }
  .partner-row  { display: flex; align-items: center; gap: 14px; padding: 13px 18px; border-bottom: 1px solid ${C.border}; transition: background 0.12s; }
  .partner-row:last-child { border-bottom: none; }
  .partner-row:hover { background: ${C.bgLight}; }
  .p-av         { width: 40px; height: 40px; border-radius: 10px; background: ${C.bgIcon}; border: 1px solid ${C.borderMed}; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: ${C.dark}; flex-shrink: 0; font-family: 'DM Mono', monospace; }
  .p-name       { font-size: 13.5px; font-weight: 600; color: ${C.darkText}; }
  .p-industry   { font-size: 11.5px; color: ${C.muted}; margin-top: 2px; }
  .p-since      { font-size: 10.5px; color: ${C.muted}; text-align: right; }

  .badge        { display: inline-flex; align-items: center; gap: 4px; padding: 3px 9px; border-radius: 20px; font-size: 11px; font-weight: 600; white-space: nowrap; }
  .b-provider   { background: ${C.bgIcon}; color: ${C.dark}; border: 1px solid ${C.borderMed}; }
  .b-client     { background: rgba(99,102,241,0.08); color: #4338ca; border: 1px solid rgba(99,102,241,0.2); }
  .b-pending    { background: ${C.warnBg}; color: #92400e; border: 1px solid rgba(245,158,11,0.25); }
  .bdot         { width: 5px; height: 5px; border-radius: 50%; }
  .bdot-g       { background: ${C.primary}; }
  .bdot-w       { background: ${C.warning}; }

  .comp-wrap    { display: flex; align-items: center; gap: 7px; min-width: 90px; }
  .comp-track   { flex: 1; height: 5px; border-radius: 3px; background: ${C.bgIcon}; overflow: hidden; }
  .comp-fill    { height: 100%; border-radius: 3px; background: ${C.primary}; }
  .comp-fill.w  { background: ${C.warning}; }
  .comp-fill.d  { background: ${C.danger}; }
  .comp-pct     { font-size: 11px; font-weight: 600; font-family: 'DM Mono', monospace; min-width: 30px; text-align: right; }
  .cp-ok        { color: ${C.primary}; }
  .cp-w         { color: #92400e; }
  .cp-d         { color: ${C.danger}; }

  .btn-view     { background: ${C.bgLight}; color: ${C.primary}; border: 1px solid ${C.borderMed}; border-radius: 7px; padding: 5px 11px; font-size: 11.5px; font-weight: 500; cursor: pointer; transition: all 0.13s; font-family: 'DM Sans', sans-serif; display: flex; align-items: center; gap: 4px; }
  .btn-view:hover { background: ${C.bgMed}; }
  .btn-rm       { background: transparent; color: ${C.muted}; border: 1px solid ${C.border}; border-radius: 7px; padding: 5px 9px; font-size: 12px; cursor: pointer; transition: all 0.13s; font-family: 'DM Sans', sans-serif; line-height: 1; }
  .btn-rm:hover { border-color: ${C.danger}; color: ${C.danger}; background: ${C.dangerBg}; }

  .right-col    { display: flex; flex-direction: column; gap: 14px; }

  /* ── CONNECT CARD ── */
  .connect-card { background: ${C.card}; border: 1px solid ${C.border}; border-radius: 14px; overflow: visible; }
  .cc-head      { background: ${C.primary}; padding: 14px 18px; display: flex; align-items: center; gap: 10px; border-radius: 14px 14px 0 0; }
  .cc-head-ico  { width: 30px; height: 30px; background: rgba(255,255,255,0.18); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .cc-head-t    { color: #fff; font-size: 14px; font-weight: 600; }
  .cc-head-s    { color: rgba(255,255,255,0.7); font-size: 11px; margin-top: 1px; }
  .cc-body      { padding: 18px; }

  .field-lbl    { font-size: 11.5px; font-weight: 600; color: ${C.muted}; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 7px; }

  /* search input with dropdown */
  .org-search-wrap { position: relative; }
  .org-input-row   { display: flex; align-items: center; gap: 8px; background: ${C.bgLight}; border: 1.5px solid ${C.border}; border-radius: 9px; padding: 9px 12px; transition: border-color 0.15s; }
  .org-input-row.focused { border-color: ${C.primary}; background: #fff; }
  .org-input-row input { background: none; border: none; outline: none; font-size: 13px; color: ${C.darkText}; flex: 1; font-family: 'DM Sans', sans-serif; }
  .org-input-row input::placeholder { color: ${C.muted}; }

  .org-dropdown { position: absolute; top: calc(100% + 6px); left: 0; right: 0; background: #fff; border: 1px solid ${C.borderMed}; border-radius: 10px; box-shadow: 0 8px 24px rgba(0,0,0,0.1); z-index: 50; overflow: hidden; }
  .org-dd-item  { display: flex; align-items: center; gap: 10px; padding: 10px 14px; cursor: pointer; transition: background 0.1s; border-bottom: 1px solid ${C.border}; }
  .org-dd-item:last-child { border-bottom: none; }
  .org-dd-item:hover { background: ${C.bgLight}; }
  .org-dd-av    { width: 32px; height: 32px; border-radius: 8px; background: ${C.bgIcon}; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: ${C.dark}; flex-shrink: 0; font-family: 'DM Mono', monospace; }
  .org-dd-name  { font-size: 13px; font-weight: 500; color: ${C.darkText}; }
  .org-dd-ind   { font-size: 11px; color: ${C.muted}; }
  .org-dd-badge { margin-left: auto; }
  .org-dd-empty { padding: 16px 14px; text-align: center; font-size: 13px; color: ${C.muted}; }
  .org-dd-searching { padding: 14px; text-align: center; font-size: 12px; color: ${C.muted}; display: flex; align-items: center; justify-content: center; gap: 8px; }

  /* selected org preview */
  .selected-org { display: flex; align-items: center; gap: 10px; background: ${C.bgLight}; border: 1px solid ${C.border}; border-radius: 9px; padding: 10px 14px; margin-top: 10px; }
  .selected-av  { width: 36px; height: 36px; border-radius: 8px; background: ${C.bgIcon}; border: 1px solid ${C.borderMed}; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: ${C.dark}; font-family: 'DM Mono', monospace; flex-shrink: 0; }
  .selected-name { font-size: 13px; font-weight: 600; color: ${C.darkText}; }
  .selected-ind  { font-size: 11px; color: ${C.muted}; }
  .selected-clear { margin-left: auto; background: none; border: none; cursor: pointer; color: ${C.muted}; font-size: 16px; line-height: 1; padding: 2px 4px; border-radius: 4px; transition: color 0.12s; }
  .selected-clear:hover { color: ${C.danger}; }

  .role-select  { width: 100%; background: ${C.bgLight}; border: 1.5px solid ${C.border}; border-radius: 9px; padding: 10px 14px; font-size: 13px; color: ${C.darkText}; font-family: 'DM Sans', sans-serif; outline: none; cursor: pointer; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; padding-right: 32px; transition: border-color 0.15s; }
  .role-select:focus { border-color: ${C.primary}; background-color: #fff; }

  .msg-area     { width: 100%; background: ${C.bgLight}; border: 1.5px solid ${C.border}; border-radius: 9px; padding: 10px 14px; font-size: 13px; color: ${C.darkText}; font-family: 'DM Sans', sans-serif; outline: none; resize: none; line-height: 1.5; transition: border-color 0.15s; }
  .msg-area:focus { border-color: ${C.primary}; background-color: #fff; }
  .msg-area::placeholder { color: ${C.muted}; }
  .char-count   { font-size: 11px; color: ${C.muted}; text-align: right; margin-top: 4px; }

  .send-btn     { width: 100%; background: ${C.primary}; color: #fff; border: none; border-radius: 9px; padding: 11px; font-size: 14px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: background 0.15s; font-family: 'DM Sans', sans-serif; margin-top: 4px; }
  .send-btn:hover { background: ${C.dark}; }
  .send-btn:active { transform: scale(0.98); }
  .send-btn:disabled { background: ${C.soft}; cursor: not-allowed; }

  /* ── PENDING ── */
  .pending-card  { background: ${C.card}; border: 1px solid ${C.border}; border-radius: 14px; overflow: hidden; }
  .pend-head     { padding: 14px 18px; border-bottom: 1px solid ${C.border}; display: flex; align-items: center; justify-content: space-between; }
  .pend-head-t   { font-size: 13.5px; font-weight: 600; color: ${C.darkText}; display: flex; align-items: center; gap: 8px; }
  .pend-count    { background: ${C.warnBg}; color: #92400e; border: 1px solid rgba(245,158,11,0.25); border-radius: 20px; padding: 1px 8px; font-size: 11px; font-weight: 700; }
  .pend-row      { display: flex; align-items: center; gap: 10px; padding: 11px 18px; border-bottom: 1px solid ${C.border}; transition: background 0.12s; }
  .pend-row:last-child { border-bottom: none; }
  .pend-row:hover { background: ${C.bgLight}; }
  .pend-av       { width: 34px; height: 34px; border-radius: 8px; background: ${C.warnBg}; border: 1px solid rgba(245,158,11,0.2); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: #92400e; font-family: 'DM Mono', monospace; flex-shrink: 0; }
  .pend-name     { font-size: 13px; font-weight: 500; color: ${C.darkText}; }
  .pend-ind      { font-size: 11px; color: ${C.muted}; }
  .pend-sent     { font-size: 10.5px; color: ${C.muted}; white-space: nowrap; }
  .pend-actions  { margin-left: auto; display: flex; flex-direction: column; align-items: flex-end; gap: 5px; }
  .btn-resend    { background: transparent; color: ${C.primary}; border: 1px solid ${C.borderMed}; border-radius: 6px; padding: 4px 9px; font-size: 11px; font-weight: 500; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.13s; }
  .btn-resend:hover { background: ${C.bgIcon}; }
  .btn-cancel    { background: transparent; color: ${C.muted}; border: 1px solid ${C.border}; border-radius: 6px; padding: 4px 8px; font-size: 11px; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.13s; }
  .btn-cancel:hover { border-color: ${C.danger}; color: ${C.danger}; }

  /* ── RECEIVED REQUESTS ── */
  .recv-card  { background: ${C.card}; border: 1px solid ${C.border}; border-radius: 14px; overflow: hidden; }
  .recv-head  { padding: 14px 18px; border-bottom: 1px solid ${C.border}; display: flex; align-items: center; justify-content: space-between; }
  .recv-head-t { font-size: 13.5px; font-weight: 600; color: ${C.darkText}; display: flex; align-items: center; gap: 8px; }
  .recv-count  { background: ${C.bgIcon}; color: ${C.dark}; border: 1px solid ${C.borderMed}; border-radius: 20px; padding: 1px 8px; font-size: 11px; font-weight: 700; }
  .recv-row    { display: flex; align-items: center; gap: 10px; padding: 12px 18px; border-bottom: 1px solid ${C.border}; transition: background 0.12s; }
  .recv-row:last-child { border-bottom: none; }
  .recv-row:hover { background: ${C.bgLight}; }
  .recv-av     { width: 34px; height: 34px; border-radius: 8px; background: ${C.bgIcon}; border: 1px solid ${C.borderMed}; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: ${C.dark}; font-family: 'DM Mono', monospace; flex-shrink: 0; }
  .recv-name   { font-size: 13px; font-weight: 500; color: ${C.darkText}; }
  .recv-ind    { font-size: 11px; color: ${C.muted}; }
  .recv-msg    { font-size: 11px; color: ${C.muted}; font-style: italic; margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 160px; }
  .recv-time   { font-size: 10.5px; color: ${C.muted}; white-space: nowrap; font-family: 'DM Mono', monospace; }
  .recv-actions { margin-left: auto; display: flex; flex-direction: column; align-items: flex-end; gap: 5px; }
  .btn-accept  { background: ${C.primary}; color: #fff; border: none; border-radius: 6px; padding: 5px 11px; font-size: 11.5px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: background 0.13s; }
  .btn-accept:hover { background: ${C.dark}; }
  .btn-decline { background: transparent; color: ${C.muted}; border: 1px solid ${C.border}; border-radius: 6px; padding: 5px 8px; font-size: 11px; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.13s; }
  .btn-decline:hover { border-color: ${C.danger}; color: ${C.danger}; }

  /* ── EMPTY ── */
  .empty { padding: 30px 16px; text-align: center; }
  .empty-ico { width: 46px; height: 46px; border-radius: 13px; background: ${C.bgIcon}; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; }
  .empty-t { font-size: 13.5px; font-weight: 600; color: ${C.darkText}; margin-bottom: 3px; }
  .empty-s { font-size: 12px; color: ${C.muted}; }

  /* ── TOAST ── */
  .toast { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); background: ${C.dark}; color: #fff; padding: 11px 20px; border-radius: 10px; font-size: 13px; font-weight: 500; display: flex; align-items: center; gap: 8px; z-index: 999; white-space: nowrap; animation: tUp 0.22s ease; }
  .toast.err { background: ${C.danger}; }
  @keyframes tUp { from{opacity:0;transform:translateX(-50%) translateY(8px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }

  @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
  .fu  { animation: fadeUp 0.3s ease forwards; opacity: 0; }
  .fu1 { animation-delay: 0.04s; }
  .fu2 { animation-delay: 0.1s; }
  .fu3 { animation-delay: 0.16s; }

  @media(max-width:600px){
    .page { padding: 14px; }
    .topnav-div,.topnav-pg,.topnav-site { display: none; }
    .partner-row { flex-wrap: wrap; gap: 8px; }
    .comp-wrap { min-width: 70px; }
  }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-thumb { background: ${C.soft}; border-radius: 4px; }
`;

/* ── ICONS ── */
const Ico = ({ n, s = 16, c = C.primary }) => {
  const d = {
    network:  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><line x1="12" y1="8" x2="12" y2="13"/><line x1="12" y1="13" x2="5" y2="16"/><line x1="12" y1="13" x2="19" y2="16"/></svg>,
    search:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    bell:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
    qr:       <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="3" height="3" rx="0.5"/><rect x="18" y="14" width="3" height="3" rx="0.5"/><rect x="14" y="18" width="3" height="3" rx="0.5"/><rect x="18" y="18" width="3" height="3" rx="0.5"/></svg>,
    partners: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
    clock:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    check:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    send:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
    inbox:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/></svg>,
    eye:      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    trash:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>,
    globe:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
    building: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="18" rx="2"/><line x1="8" y1="21" x2="8" y2="3"/><line x1="16" y1="21" x2="16" y2="3"/><line x1="2" y1="9" x2="22" y2="9"/><line x1="2" y1="15" x2="22" y2="15"/></svg>,
    msg:      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  };
  return d[n] || null;
};

/* ── MOCK PLATFORM ORGS (simulates backend search) ── */
const PLATFORM_ORGS = [
  { id: "o1",  name: "GoodMe Solutions",      initials: "GM", industry: "Facility Management", type: "Provider" },
  { id: "o2",  name: "Guardian Security",      initials: "GS", industry: "Security Services",   type: "Provider" },
  { id: "o3",  name: "GreenBuild Contractors", initials: "GB", industry: "Construction",         type: "Provider" },
  { id: "o4",  name: "Nova Tech Systems",      initials: "NT", industry: "IT Services",          type: "Provider" },
  { id: "o5",  name: "PowerGrid Pakistan",     initials: "PP", industry: "Electrical",           type: "Provider" },
  { id: "o6",  name: "AquaFlow Services",      initials: "AF", industry: "Plumbing & HVAC",      type: "Provider" },
  { id: "o7",  name: "Lahore Logistics Co.",   initials: "LL", industry: "Logistics",            type: "Client"   },
  { id: "o8",  name: "Karachi Facilities Ltd", initials: "KF", industry: "Facility Management", type: "Client"   },
  { id: "o9",  name: "SafeZone Corp",          initials: "SZ", industry: "Security Services",   type: "Provider" },
  { id: "o10", name: "Spark Cleaning Services",initials: "SC", industry: "Facility Management", type: "Provider" },
];

const INITIAL_PARTNERS = [
  { id: "p1",  name: "CleanTech Solutions",    initials: "CT", industry: "Facility Management", type: "Provider", compliance: 100, since: "Mar 2024" },
  { id: "p2",  name: "SafeGuard Security",     initials: "SG", industry: "Security Services",   type: "Provider", compliance: 75,  since: "Jun 2023" },
  { id: "p3",  name: "TechFix Pakistan",       initials: "TF", industry: "IT Services",         type: "Provider", compliance: 87,  since: "Nov 2022" },
  { id: "p4",  name: "Lahore Logistics Co.",   initials: "LL", industry: "Logistics",           type: "Client",   compliance: 64,  since: "Feb 2024" },
  { id: "p5",  name: "GreenClean Services",    initials: "GC", industry: "Facility Management", type: "Provider", compliance: 92,  since: "Jan 2024" },
  { id: "p6",  name: "PowerSystems Ltd",       initials: "PS", industry: "Electrical",          type: "Provider", compliance: 58,  since: "Aug 2023" },
  { id: "p7",  name: "AquaFlow Services",      initials: "AF", industry: "Plumbing & HVAC",     type: "Provider", compliance: 81,  since: "Apr 2023" },
  { id: "p8",  name: "Karachi Facilities Ltd", initials: "KF", industry: "Facility Management", type: "Client",   compliance: 79,  since: "Sep 2023" },
  { id: "p9",  name: "ProBuild Contracts",     initials: "PB", industry: "Construction",        type: "Provider", compliance: 95,  since: "Dec 2022" },
  { id: "p10", name: "Nova Tech Systems",      initials: "NT", industry: "IT Services",         type: "Provider", compliance: 44,  since: "May 2024" },
  { id: "p11", name: "SafeZone Corp",          initials: "SZ", industry: "Security Services",   type: "Provider", compliance: 88,  since: "Jul 2023" },
  { id: "p12", name: "GreenBuild Contractors", initials: "GB", industry: "Construction",        type: "Client",   compliance: 72,  since: "Oct 2023" },
];

const INITIAL_RECEIVED = [
  { id: "i1", name: "ProBuild Contracts",  initials: "PB", industry: "Construction",       role: "Provider", msg: "We'd like to connect for compliance verification.", receivedAgo: "1h ago"  },
  { id: "i2", name: "SafeZone Corp",       initials: "SZ", industry: "Security Services",   role: "Provider", msg: "",                                                  receivedAgo: "3h ago"  },
  { id: "i3", name: "Karachi Facilities",  initials: "KF", industry: "Facility Management", role: "Client",   msg: "Interested in partnering for service delivery.",    receivedAgo: "1d ago"  },
];

const INITIAL_PENDING = [
  { id: "r1", name: "Spark Cleaning Services", initials: "SC", industry: "Facility Management", role: "Provider", msg: "Hi, we'd like to connect for compliance verification.", sentAgo: "2 days ago" },
  { id: "r2", name: "Nova Tech Systems",       initials: "NT", industry: "IT Services",         role: "Provider", msg: "",                                                    sentAgo: "5 days ago" },
];

function compCls(p) { return p < 50 ? "d" : p < 80 ? "w" : "ok"; }
function compPctCls(p) { return p < 50 ? "cp-d" : p < 80 ? "cp-w" : "cp-ok"; }

export default function B2BNetwork() {
  const [partners, setPartners]     = useState(INITIAL_PARTNERS);
  const [received, setReceived]     = useState(INITIAL_RECEIVED);
  const [pending, setPending]       = useState(INITIAL_PENDING);
  const [listSearch, setListSearch] = useState("");
  const [listFilter, setListFilter] = useState("All");

  // connect form state
  const [orgQuery, setOrgQuery]     = useState("");
  const [ddOpen, setDdOpen]         = useState(false);
  const [ddLoading, setDdLoading]   = useState(false);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [role, setRole]             = useState("Provider");
  const [message, setMessage]       = useState("");
  const [sending, setSending]       = useState(false);

  const [toast, setToast]           = useState(null);
  const searchRef                   = useRef(null);
  const ddRef                       = useRef(null);

  const MAX_MSG = 160;

  const showToast = (msg, type = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  };

  // simulate search delay
  useEffect(() => {
    if (!orgQuery.trim()) { setDdOpen(false); return; }
    setDdLoading(true);
    setDdOpen(true);
    const t = setTimeout(() => setDdLoading(false), 350);
    return () => clearTimeout(t);
  }, [orgQuery]);

  // close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ddRef.current && !ddRef.current.contains(e.target)) setDdOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const connectedIds = new Set(partners.map(p => p.name));
  const pendingNames = new Set(pending.map(p => p.name));

  const ddResults = PLATFORM_ORGS.filter(o =>
    o.name.toLowerCase().includes(orgQuery.toLowerCase()) &&
    !connectedIds.has(o.name) &&
    !pendingNames.has(o.name)
  );

  const handleSelectOrg = (org) => {
    setSelectedOrg(org);
    setOrgQuery("");
    setDdOpen(false);
  };

  const handleSendRequest = () => {
    if (!selectedOrg) { showToast("Please select an organization first.", "err"); return; }
    setSending(true);
    setTimeout(() => {
      setPending(prev => [{
        id: `r${Date.now()}`,
        name: selectedOrg.name,
        initials: selectedOrg.initials,
        industry: selectedOrg.industry,
        role,
        msg: message,
        sentAgo: "Just now",
      }, ...prev]);
      setSelectedOrg(null);
      setOrgQuery("");
      setRole("Provider");
      setMessage("");
      setSending(false);
      showToast(`Connection request sent to ${selectedOrg.name}`);
    }, 700);
  };

  const handleRemove = (id, name) => {
    setPartners(p => p.filter(x => x.id !== id));
    showToast(`${name} removed from your network.`);
  };

  const handleCancelPending = (id, name) => {
    setPending(p => p.filter(x => x.id !== id));
    showToast(`Request to ${name} cancelled.`);
  };

  const handleResend = (name) => showToast(`Request resent to ${name}`);

  const handleAccept = (id, name) => {
    const org = received.find(r => r.id === id);
    if (!org) return;
    setReceived(r => r.filter(x => x.id !== id));
    setPartners(prev => [...prev, {
      id: `p${Date.now()}`,
      name: org.name,
      initials: org.initials,
      industry: org.industry,
      type: org.role,
      compliance: Math.floor(Math.random() * 30) + 70,
      since: new Date().toLocaleDateString("en-GB", { month:"short", year:"numeric" }),
    }]);
    showToast(`${name} added to your network!`);
  };

  const handleDecline = (id, name) => {
    setReceived(r => r.filter(x => x.id !== id));
    showToast(`Request from ${name} declined.`);
  };

  const filtered = partners.filter(p => {
    const q = listSearch.toLowerCase();
    return (p.name.toLowerCase().includes(q) || p.industry.toLowerCase().includes(q)) &&
           (listFilter === "All" || p.type === listFilter);
  });

  const avgComp = partners.length
    ? Math.round(partners.reduce((s, p) => s + p.compliance, 0) / partners.length)
    : 0;

  return (
    <>
      <style>{css}</style>

      {/* NAV */}
      <nav className="topnav">
        <div className="topnav-left">
          <div className="topnav-logobox"><Ico n="qr" s={15} c="#fff"/></div>
          <div>
            <div className="topnav-title">ComplianceQR</div>
            <div className="topnav-sub">Client Portal</div>
          </div>
          <div className="topnav-div"/>
          <span className="topnav-pg">B2B Network</span>
        </div>
        <div className="topnav-right">
          <div className="topnav-site"><span className="pulse-dot"/>Site A – Lahore HQ</div>
          <button className="notif-btn">
            <Ico n="bell" s={15} c="rgba(255,255,255,0.85)"/>
            <span className="notif-pip"/>
          </button>
          <div className="topnav-av">AC</div>
          <span className="topnav-name">Acme Corp</span>
        </div>
      </nav>

      <div className="page">

        {/* PAGE HEADER */}
        <div className="page-hdr fu fu1">
          <div className="breadcrumb"><span>Dashboard</span><span>/</span><span className="bc-active">B2B Network</span></div>
          <div className="page-title">B2B Network</div>
          <div className="page-sub">Connect with registered organizations on the platform to collaborate on compliance verification and service delivery.</div>
        </div>

        {/* STATS */}
        <div className="stat-strip fu fu1">
          {[
            { ico: "partners", icoCls: "",     val: partners.length, lbl: "Connected partners" },
            { ico: "clock",    icoCls: "warn",  val: pending.length + received.length, lbl: "Pending requests" },
            { ico: "globe",    icoCls: "",       val: partners.filter(p=>p.type==="Provider").length, lbl: "Service providers" },
            { ico: "check",    icoCls: "",       val: `${avgComp}%`,  lbl: "Avg. compliance" },
          ].map((s, i) => (
            <div className="stat-card" key={i}>
              <div className={`stat-ico ${s.icoCls}`}>
                <Ico n={s.ico} s={18} c={s.icoCls === "warn" ? C.warning : C.primary}/>
              </div>
              <div>
                <div className="stat-val">{s.val}</div>
                <div className="stat-lbl">{s.lbl}</div>
              </div>
            </div>
          ))}
        </div>

        {/* SPLIT */}
        <div className="split fu fu2">

          {/* LEFT – CONNECTED */}
          <div className="panel">
            <div className="panel-head">
              <div>
                <div className="ph-title">Connected Partners</div>
                <div className="ph-sub">Organizations actively linked to your network</div>
              </div>
              <div className="ph-badge">{partners.length} active</div>
            </div>

            <div className="search-row">
              <div className="search-wrap">
                <Ico n="search" s={14} c={C.muted}/>
                <input placeholder="Search by name or industry…" value={listSearch} onChange={e => setListSearch(e.target.value)}/>
              </div>
              <div className="fpill-wrap">
                {["All","Provider","Client"].map(f => (
                  <button key={f} className={`fpill ${listFilter===f?"active":""}`} onClick={()=>setListFilter(f)}>{f}</button>
                ))}
              </div>
            </div>

            <div className="partner-list">
              {filtered.length === 0 ? (
                <div className="empty">
                  <div className="empty-ico"><Ico n="partners" s={22} c={C.primary}/></div>
                  <div className="empty-t">No partners found</div>
                  <div className="empty-s">Try adjusting your search or filter</div>
                </div>
              ) : filtered.map(p => (
                <div className="partner-row" key={p.id}>
                  <div className="p-av">{p.initials}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="p-name">{p.name}</div>
                    <div className="p-industry">{p.industry}</div>
                  </div>
                  <span className={`badge ${p.type==="Provider"?"b-provider":"b-client"}`}>
                    <span className="bdot bdot-g"/>{p.type}
                  </span>
                  <div className="comp-wrap">
                    <div className="comp-track">
                      <div className={`comp-fill ${compCls(p.compliance)==="w"?"w":compCls(p.compliance)==="d"?"d":""}`} style={{width:`${p.compliance}%`}}/>
                    </div>
                    <span className={`comp-pct ${compPctCls(p.compliance)}`}>{p.compliance}%</span>
                  </div>
                  <div className="p-since">Since {p.since}</div>
                  <button className="btn-view" onClick={()=>showToast(`Viewing ${p.name}`)}>
                    <Ico n="eye" s={12} c={C.primary}/>View
                  </button>
                  <button className="btn-rm" onClick={()=>handleRemove(p.id, p.name)}>
                    <Ico n="trash" s={12} c="currentColor"/>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="right-col">

            {/* CONNECT CARD */}
            <div className="connect-card">
              <div className="cc-head">
                <div className="cc-head-ico"><Ico n="network" s={15} c="#fff"/></div>
                <div>
                  <div className="cc-head-t">Connect with an Organization</div>
                  <div className="cc-head-s">Search by organization name</div>
                </div>
              </div>

              <div className="cc-body">

                {/* Org Search */}
                <div style={{ marginBottom: 14 }}>
                  <div className="field-lbl">Organization name</div>
                  <div className="org-search-wrap" ref={ddRef}>
                    <div className={`org-input-row ${ddOpen ? "focused" : ""}`}>
                      <Ico n="search" s={14} c={C.muted}/>
                      <input
                        ref={searchRef}
                        placeholder="Search registered organizations…"
                        value={orgQuery}
                        onChange={e => { setOrgQuery(e.target.value); setSelectedOrg(null); }}
                        onFocus={() => orgQuery.trim() && setDdOpen(true)}
                      />
                      {orgQuery && (
                        <button onClick={()=>{setOrgQuery(""); setDdOpen(false); setSelectedOrg(null);}}
                          style={{background:"none",border:"none",cursor:"pointer",color:C.muted,fontSize:14,lineHeight:1,padding:"0 2px"}}>✕</button>
                      )}
                    </div>

                    {/* Dropdown */}
                    {ddOpen && (
                      <div className="org-dropdown">
                        {ddLoading ? (
                          <div className="org-dd-searching">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                            Searching…
                          </div>
                        ) : ddResults.length === 0 ? (
                          <div className="org-dd-empty">No organizations found for "{orgQuery}"</div>
                        ) : ddResults.map(org => (
                          <div className="org-dd-item" key={org.id} onMouseDown={()=>handleSelectOrg(org)}>
                            <div className="org-dd-av">{org.initials}</div>
                            <div>
                              <div className="org-dd-name">{org.name}</div>
                              <div className="org-dd-ind">{org.industry}</div>
                            </div>
                            <div className="org-dd-badge">
                              <span className={`badge ${org.type==="Provider"?"b-provider":"b-client"}`}>{org.type}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Selected org preview */}
                  {selectedOrg && (
                    <div className="selected-org">
                      <div className="selected-av">{selectedOrg.initials}</div>
                      <div>
                        <div className="selected-name">{selectedOrg.name}</div>
                        <div className="selected-ind">{selectedOrg.industry} · {selectedOrg.type}</div>
                      </div>
                      <button className="selected-clear" onClick={()=>setSelectedOrg(null)}>✕</button>
                    </div>
                  )}
                </div>

                {/* Role */}
                <div style={{ marginBottom: 14 }}>
                  <div className="field-lbl">Their role in your network</div>
                  <select className="role-select" value={role} onChange={e=>setRole(e.target.value)}>
                    <option value="Provider">Service Provider — they deliver services to you</option>
                    <option value="Client">Client Organization — you deliver services to them</option>
                  </select>
                </div>

                {/* Optional message */}
                <div style={{ marginBottom: 16 }}>
                  <div className="field-lbl">Message <span style={{fontWeight:400,textTransform:"none",letterSpacing:0,fontSize:11}}>(optional)</span></div>
                  <textarea
                    className="msg-area"
                    rows={3}
                    maxLength={MAX_MSG}
                    placeholder="Add a short note with your request…"
                    value={message}
                    onChange={e=>setMessage(e.target.value)}
                  />
                  <div className="char-count">{message.length}/{MAX_MSG}</div>
                </div>

                <button className="send-btn" onClick={handleSendRequest} disabled={sending || !selectedOrg}>
                  {sending ? "Sending…" : <><Ico n="send" s={14} c="#fff"/>Send Connection Request</>}
                </button>
              </div>
            </div>

            {/* RECEIVED REQUESTS */}
            <div className="recv-card">
              <div className="recv-head">
                <div className="recv-head-t">
                  <Ico n="inbox" s={14} c={C.primary}/>
                  Received Requests
                  {received.length > 0 && <span className="recv-count">{received.length}</span>}
                </div>
              </div>
              {received.length === 0 ? (
                <div className="empty" style={{padding:"20px 16px"}}>
                  <div className="empty-ico"><Ico n="inbox" s={20} c={C.primary}/></div>
                  <div className="empty-t">No incoming requests</div>
                  <div className="empty-s">Requests from other organizations appear here</div>
                </div>
              ) : received.map(r => (
                <div className="recv-row" key={r.id}>
                  <div className="recv-av">{r.initials}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div className="recv-name">{r.name}</div>
                    <div className="recv-ind">{r.industry}</div>
                    {r.msg && <div className="recv-msg">"{r.msg}"</div>}
                  </div>
                  <div className="recv-actions">
                    <span className="recv-time">{r.receivedAgo}</span>
                    <div style={{display:"flex",gap:5}}>
                      <button className="btn-accept"  onClick={()=>handleAccept(r.id, r.name)}>Accept</button>
                      <button className="btn-decline" onClick={()=>handleDecline(r.id, r.name)}>✕</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* SENT REQUESTS */}
            <div className="pending-card">
              <div className="pend-head">
                <div className="pend-head-t">
                  <Ico n="clock" s={14} c={C.warning}/>
                  Sent Requests
                  {pending.length > 0 && <span className="pend-count">{pending.length}</span>}
                </div>
              </div>
              {pending.length === 0 ? (
                <div className="empty" style={{padding:"20px 16px"}}>
                  <div className="empty-ico"><Ico n="send" s={20} c={C.primary}/></div>
                  <div className="empty-t">No sent requests</div>
                  <div className="empty-s">Requests you send will appear here</div>
                </div>
              ) : pending.map(p => (
                <div className="pend-row" key={p.id}>
                  <div className="pend-av">{p.initials}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div className="pend-name">{p.name}</div>
                    <div className="pend-ind">{p.industry}</div>
                  </div>
                  <div className="pend-actions">
                    <span className="pend-sent">{p.sentAgo}</span>
                    <div style={{display:"flex",gap:5}}>
                      <button className="btn-resend" onClick={()=>handleResend(p.name)}>Resend</button>
                      <button className="btn-cancel" onClick={()=>handleCancelPending(p.id, p.name)}>✕</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* TOAST */}
      {toast && (
        <div className={`toast ${toast.type==="err"?"err":""}`}>
          <Ico n="check" s={13} c="#fff"/>
          {toast.msg}
        </div>
      )}
    </>
  );
}