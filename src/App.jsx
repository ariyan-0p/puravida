import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════════════
   NEXUSTRADE — Merchant Export Company
   Design: Refined dark editorial. Think Bloomberg Terminal meets Lloyd's
   of London. Authoritative, institutional, trust-first.
   Fonts: Cormorant Garamond (serif authority) + DM Mono (data/precision)
   Palette: Deep navy + aged gold + warm white. No cyan gimmicks.
═══════════════════════════════════════════════════════════════════════ */

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&family=Manrope:wght@400;500;600;700;800&display=swap');

  :root {
    --ink:       #0A0D16;
    --ink2:      #0F1320;
    --ink3:      #161C2E;
    --ink4:      #1E2640;
    --gold:      #B8922A;
    --gold2:     #D4AB48;
    --gold3:     #EAC96A;
    --goldThin:  rgba(184,146,42,0.18);
    --goldGlow:  rgba(184,146,42,0.12);
    --paper:     #E8E0D0;
    --paperDim:  #A09070;
    --fog:       #6A7490;
    --white:     #F4F0E8;
    --lineColor: rgba(184,146,42,0.14);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; font-size: 16px; }

  body {
    background: var(--ink);
    color: var(--white);
    font-family: 'Manrope', sans-serif;
    overflow-x: hidden;
    cursor: none;
  }

  /* ── CURSOR ─────────────────────────────── */
  #cur-dot {
    position: fixed; width: 6px; height: 6px;
    background: var(--gold2); border-radius: 50%;
    pointer-events: none; z-index: 9999;
    transform: translate(-50%,-50%);
    transition: transform 0.05s;
  }
  #cur-cross {
    position: fixed; pointer-events: none; z-index: 9998;
    transform: translate(-50%,-50%);
    width: 28px; height: 28px;
  }
  #cur-cross::before, #cur-cross::after {
    content: ''; position: absolute;
    background: rgba(184,146,42,0.5);
  }
  #cur-cross::before { width: 1px; height: 100%; left: 50%; top: 0; }
  #cur-cross::after  { width: 100%; height: 1px; top: 50%; left: 0; }

  /* ── SCROLLBAR ──────────────────────────── */
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: var(--ink); }
  ::-webkit-scrollbar-thumb { background: var(--gold); }

  /* ── TYPOGRAPHY HELPERS ─────────────────── */
  .serif    { font-family: 'Cormorant Garamond', serif; }
  .mono     { font-family: 'DM Mono', monospace; }
  .sans     { font-family: 'Manrope', sans-serif; }

  /* ── NAV ────────────────────────────────── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 5vw; height: 64px;
    background: rgba(10,13,22,0.92);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--lineColor);
    transition: border-color 0.4s;
  }
  .nav.solid { border-bottom-color: rgba(184,146,42,0.28); }

  .nav-wordmark {
    display: flex; flex-direction: column; gap: 0;
    text-decoration: none;
  }
  .wm-top {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.25rem; font-weight: 600;
    letter-spacing: 5px; color: var(--white);
    text-transform: uppercase; line-height: 1;
  }
  .wm-top span { color: var(--gold2); }
  .wm-sub {
    font-family: 'DM Mono', monospace;
    font-size: 0.48rem; letter-spacing: 3px;
    color: var(--fog); text-transform: uppercase;
    line-height: 1; margin-top: 3px;
  }

  .nav-links {
    display: flex; gap: 2.5rem; list-style: none; align-items: center;
  }
  .nav-links a {
    font-family: 'DM Mono'; font-size: 0.65rem;
    letter-spacing: 2px; text-transform: uppercase;
    color: var(--fog); text-decoration: none;
    transition: color 0.3s;
  }
  .nav-links a:hover { color: var(--gold2); }

  .nav-divider { width: 1px; height: 20px; background: var(--lineColor); }

  .nav-contact {
    font-family: 'DM Mono'; font-size: 0.62rem;
    letter-spacing: 2px; text-transform: uppercase;
    color: var(--gold2); text-decoration: none;
    border: 1px solid var(--goldThin);
    padding: 8px 20px;
    transition: all 0.3s;
    clip-path: polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);
  }
  .nav-contact:hover {
    background: var(--gold);
    color: var(--ink); border-color: var(--gold);
  }

  /* ── HERO ───────────────────────────────── */
  .hero {
    min-height: 100vh;
    display: grid;
    grid-template-rows: 1fr auto;
    position: relative; overflow: hidden;
    padding-top: 64px;
  }

  .hero-bg {
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 60% 70% at 70% 40%, rgba(184,146,42,0.06), transparent),
      radial-gradient(ellipse 50% 60% at 10% 80%, rgba(30,38,64,0.8), transparent);
  }

  /* Fine ruled paper lines */
  .hero-rules {
    position: absolute; inset: 0;
    background-image: repeating-linear-gradient(
      to bottom,
      transparent 0px, transparent 47px,
      rgba(184,146,42,0.04) 47px, rgba(184,146,42,0.04) 48px
    );
    pointer-events: none;
  }

  /* Vertical margin lines */
  .hero-margin-l, .hero-margin-r {
    position: absolute; top: 0; bottom: 0; width: 1px;
    background: rgba(184,146,42,0.06);
  }
  .hero-margin-l { left: 12vw; }
  .hero-margin-r { right: 12vw; }

  .hero-inner {
    position: relative; z-index: 2;
    display: flex; flex-direction: column;
    justify-content: center;
    padding: 6vh 5vw 0;
    max-width: 1300px; margin: 0 auto; width: 100%;
  }

  .hero-reg-badge {
    display: inline-flex; align-items: center; gap: 10px;
    margin-bottom: 2.5rem;
    opacity: 0; animation: riseIn 0.8s 0.2s ease forwards;
  }
  .reg-seal {
    width: 36px; height: 36px; flex-shrink: 0;
    border: 1px solid var(--gold);
    display: flex; align-items: center; justify-content: center;
    clip-path: polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%);
    background: var(--goldGlow);
    font-family: 'DM Mono'; font-size: 0.45rem; color: var(--gold2);
    letter-spacing: 1px; text-align: center; line-height: 1.1;
  }
  .reg-text {
    font-family: 'DM Mono'; font-size: 0.62rem;
    letter-spacing: 2.5px; color: var(--fog); text-transform: uppercase;
  }
  .reg-text strong { color: var(--gold2); font-weight: 500; }

  .hero-eyeline {
    font-family: 'DM Mono'; font-size: 0.62rem;
    letter-spacing: 4px; color: var(--gold);
    text-transform: uppercase; margin-bottom: 1.2rem;
    opacity: 0; animation: riseIn 0.8s 0.3s ease forwards;
  }

  .hero-headline {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(3.5rem, 8vw, 8rem);
    font-weight: 300; line-height: 0.96;
    letter-spacing: -1px; margin-bottom: 2rem;
    max-width: 900px;
  }
  .hero-headline .hl1 {
    display: block; color: var(--white);
    opacity: 0; animation: riseIn 0.9s 0.45s ease forwards;
  }
  .hero-headline .hl2 {
    display: block; color: var(--gold2);
    font-style: italic; font-weight: 300;
    opacity: 0; animation: riseIn 0.9s 0.6s ease forwards;
  }
  .hero-headline .hl3 {
    display: block; color: rgba(244,240,232,0.22);
    font-size: 0.42em; letter-spacing: 5px;
    font-style: normal; font-weight: 400;
    font-family: 'DM Mono'; margin-top: 0.5rem;
    opacity: 0; animation: riseIn 0.9s 0.75s ease forwards;
  }

  .hero-body-wrap {
    display: grid; grid-template-columns: 1fr 1fr; gap: 4rem;
    max-width: 900px; margin-bottom: 4rem;
    opacity: 0; animation: riseIn 0.8s 0.9s ease forwards;
  }
  .hero-statement {
    font-size: 1.05rem; font-weight: 400;
    color: rgba(244,240,232,0.6);
    line-height: 1.9; border-left: 1px solid var(--goldThin);
    padding-left: 1.5rem;
  }
  .hero-declaration {
    display: flex; flex-direction: column; gap: 1rem;
  }
  .dec-item {
    display: flex; align-items: flex-start; gap: 10px;
  }
  .dec-mark {
    font-family: 'DM Mono'; font-size: 0.55rem; color: var(--gold);
    letter-spacing: 1px; margin-top: 3px; flex-shrink: 0;
  }
  .dec-text { font-size: 0.85rem; color: var(--fog); line-height: 1.6; }
  .dec-text strong { color: var(--white); font-weight: 600; }

  .hero-ctas {
    display: flex; gap: 1rem; align-items: center;
    opacity: 0; animation: riseIn 0.8s 1.05s ease forwards;
  }

  /* ── HERO STATS (at bottom of hero) ─────── */
  .hero-stats {
    position: relative; z-index: 2;
    border-top: 1px solid var(--lineColor);
    display: grid; grid-template-columns: repeat(4,1fr);
    opacity: 0; animation: riseIn 0.8s 1.2s ease forwards;
  }
  .h-stat {
    padding: 28px 5vw;
    border-right: 1px solid var(--lineColor);
    display: flex; flex-direction: column; gap: 4px;
  }
  .h-stat:last-child { border-right: none; }
  .h-stat-num {
    font-family: 'Cormorant Garamond'; font-size: 2.8rem;
    font-weight: 300; color: var(--gold2); line-height: 1;
  }
  .h-stat-label {
    font-family: 'DM Mono'; font-size: 0.58rem;
    letter-spacing: 2px; color: var(--fog); text-transform: uppercase;
  }
  .h-stat-desc {
    font-size: 0.78rem; color: rgba(244,240,232,0.35);
    line-height: 1.5; margin-top: 2px;
  }

  @keyframes riseIn {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── TICKER ─────────────────────────────── */
  .ticker-wrap {
    background: var(--ink2);
    border-bottom: 1px solid var(--lineColor);
    height: 38px; overflow: hidden;
    display: flex; align-items: center;
  }
  .ticker-tag {
    background: var(--gold); color: var(--ink);
    font-family: 'DM Mono'; font-size: 0.6rem;
    font-weight: 500; letter-spacing: 2px; text-transform: uppercase;
    height: 100%; display: flex; align-items: center;
    padding: 0 18px; flex-shrink: 0;
    clip-path: polygon(0 0,calc(100% - 8px) 0,100% 50%,calc(100% - 8px) 100%,0 100%);
    padding-right: 24px;
  }
  .ticker-scroll { overflow: hidden; flex: 1; }
  .ticker-track {
    display: flex; align-items: center;
    animation: tickMove 40s linear infinite;
    white-space: nowrap;
  }
  @keyframes tickMove { 0%{transform:translateX(0);} 100%{transform:translateX(-50%);} }
  .tick-item {
    font-family: 'DM Mono'; font-size: 0.65rem;
    color: var(--fog); padding: 0 2.5rem; letter-spacing: 1px;
  }
  .tick-item .tk { color: var(--gold2); margin-right: 6px; }

  /* ── SHARED SECTION STYLES ──────────────── */
  .section { padding: 100px 5vw; }
  .section-narrow { max-width: 1200px; margin: 0 auto; }
  .section-wide { max-width: 1400px; margin: 0 auto; }

  .eyebrow {
    font-family: 'DM Mono'; font-size: 0.6rem;
    letter-spacing: 4px; text-transform: uppercase; color: var(--gold);
    display: flex; align-items: center; gap: 12px; margin-bottom: 1.2rem;
  }
  .eyebrow::before { content:''; width: 24px; height: 1px; background: var(--gold); }

  .sec-title {
    font-family: 'Cormorant Garamond';
    font-size: clamp(2.5rem,4.5vw,4rem);
    font-weight: 300; line-height: 1.05;
    color: var(--white); letter-spacing: -0.5px;
  }
  .sec-title em { font-style: italic; color: var(--gold2); }
  .sec-title strong { font-weight: 600; }

  .rule { height: 1px; background: linear-gradient(90deg, transparent, var(--gold) 30%, var(--gold) 70%, transparent); opacity: 0.2; }

  /* ── REVEAL ANIMATION ───────────────────── */
  .r {
    opacity: 0; transform: translateY(30px);
    transition: opacity 0.75s ease, transform 0.75s ease;
  }
  .r.in { opacity: 1; transform: translateY(0); }
  .r.d1 { transition-delay: 0.1s; }
  .r.d2 { transition-delay: 0.2s; }
  .r.d3 { transition-delay: 0.3s; }
  .r.d4 { transition-delay: 0.4s; }

  /* ── BUTTONS ────────────────────────────── */
  .btn-primary {
    font-family: 'DM Mono'; font-size: 0.65rem;
    letter-spacing: 2.5px; text-transform: uppercase;
    padding: 14px 36px; background: var(--gold);
    color: var(--ink); border: none; cursor: pointer;
    clip-path: polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%);
    transition: all 0.3s; text-decoration: none; display: inline-block;
    position: relative; overflow: hidden;
  }
  .btn-primary::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
    transform: translateX(-110%); transition: transform 0.5s;
  }
  .btn-primary:hover { background: var(--gold3); transform: translateY(-2px); box-shadow: 0 8px 28px rgba(184,146,42,0.3); }
  .btn-primary:hover::after { transform: translateX(110%); }

  .btn-outline {
    font-family: 'DM Mono'; font-size: 0.65rem;
    letter-spacing: 2.5px; text-transform: uppercase;
    padding: 14px 36px; background: transparent;
    color: var(--paper); border: 1px solid rgba(232,224,208,0.2);
    cursor: pointer;
    clip-path: polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%);
    transition: all 0.3s; text-decoration: none; display: inline-block;
  }
  .btn-outline:hover { border-color: var(--paper); color: var(--white); background: rgba(232,224,208,0.05); transform: translateY(-2px); }

  /* ═══════════════════════════════════════════
     SECTION 1: WHY WE EXIST — Positioning
  ═══════════════════════════════════════════ */
  .positioning { background: var(--ink); }

  .pos-grid {
    display: grid; grid-template-columns: 5fr 7fr; gap: 6rem;
    align-items: start;
  }

  .pos-left { position: sticky; top: 100px; }
  .pos-statement {
    font-family: 'Cormorant Garamond'; font-size: 1.35rem;
    font-weight: 300; color: rgba(244,240,232,0.55);
    line-height: 1.9; margin: 1.5rem 0 2rem;
    border-left: 2px solid var(--goldThin); padding-left: 1.5rem;
  }
  .pos-statement em { color: var(--gold2); font-style: italic; }

  .pos-distinction {
    display: flex; flex-direction: column; gap: 0;
    border: 1px solid var(--lineColor);
    margin-top: 2rem;
  }
  .pos-row {
    display: grid; grid-template-columns: 1fr 1fr;
    border-bottom: 1px solid var(--lineColor);
  }
  .pos-row:last-child { border-bottom: none; }
  .pos-cell {
    padding: 16px 18px;
    font-family: 'DM Mono'; font-size: 0.65rem; letter-spacing: 1px;
    line-height: 1.6;
  }
  .pos-cell.head { color: var(--fog); text-transform: uppercase; font-size: 0.6rem; letter-spacing: 2px; border-bottom: 1px solid var(--lineColor); }
  .pos-cell.head:first-child { border-right: 1px solid var(--lineColor); }
  .pos-cell.not { color: rgba(244,240,232,0.25); border-right: 1px solid var(--lineColor); }
  .pos-cell.not .x { color: #8B4040; margin-right: 6px; }
  .pos-cell.yes { color: var(--white); }
  .pos-cell.yes .ck { color: var(--gold2); margin-right: 6px; }

  .pos-right { display: flex; flex-direction: column; gap: 2px; }

  .pillar-block {
    padding: 2rem 2.5rem;
    border: 1px solid var(--lineColor);
    border-bottom: none;
    position: relative; overflow: hidden;
    transition: all 0.4s;
    background: transparent;
  }
  .pillar-block:last-child { border-bottom: 1px solid var(--lineColor); }
  .pillar-block::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
    background: var(--gold); transform: scaleY(0); transform-origin: top;
    transition: transform 0.4s;
  }
  .pillar-block::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(90deg, var(--goldGlow), transparent);
    opacity: 0; transition: opacity 0.4s;
  }
  .pillar-block:hover { border-color: rgba(184,146,42,0.3); }
  .pillar-block:hover::before { transform: scaleY(1); }
  .pillar-block:hover::after { opacity: 1; }
  .pb-num {
    font-family: 'DM Mono'; font-size: 0.55rem; color: var(--gold);
    letter-spacing: 2px; margin-bottom: 0.75rem; position: relative; z-index: 1;
  }
  .pb-title {
    font-family: 'Cormorant Garamond'; font-size: 1.5rem; font-weight: 500;
    color: var(--white); margin-bottom: 0.6rem; position: relative; z-index: 1;
  }
  .pb-body {
    font-size: 0.88rem; color: var(--fog); line-height: 1.8;
    position: relative; z-index: 1;
  }

  /* ═══════════════════════════════════════════
     SECTION 2: LEGITIMACY — Credibility proof
  ═══════════════════════════════════════════ */
  .legitimacy { background: var(--ink2); position: relative; overflow: hidden; }
  .legitimacy::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold) 40%, transparent);
    opacity: 0.3;
  }

  .legit-header {
    display: grid; grid-template-columns: 1fr 1fr; gap: 4rem;
    margin-bottom: 5rem; align-items: end;
  }
  .legit-intro {
    font-size: 1.02rem; color: var(--fog); line-height: 1.9;
    margin-top: 1.5rem;
  }
  .legit-quote {
    font-family: 'Cormorant Garamond'; font-style: italic;
    font-size: 1.6rem; font-weight: 300;
    color: rgba(244,240,232,0.5); line-height: 1.5;
    border-left: 2px solid var(--gold); padding-left: 1.5rem;
  }
  .legit-quote strong { color: var(--gold2); font-style: normal; font-weight: 400; }

  .credentials-grid {
    display: grid; grid-template-columns: repeat(3,1fr);
    gap: 1px; background: var(--lineColor);
    border: 1px solid var(--lineColor);
    margin-bottom: 4rem;
  }
  .cred-card {
    background: var(--ink2); padding: 2.5rem 2rem;
    display: flex; flex-direction: column; gap: 1rem;
    transition: background 0.4s;
    position: relative;
  }
  .cred-card:hover { background: rgba(184,146,42,0.04); }
  .cred-card::after {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    transform: scaleX(0); transition: transform 0.5s; transform-origin: left;
  }
  .cred-card:hover::after { transform: scaleX(1); }
  .cred-badge {
    display: inline-flex; align-items: center; gap: 8px;
    border: 1px solid var(--goldThin);
    padding: 5px 12px; align-self: flex-start;
    clip-path: polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%);
  }
  .cred-badge-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--gold2); animation: credPulse 2s ease-in-out infinite; }
  @keyframes credPulse { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
  .cred-badge-text { font-family:'DM Mono'; font-size:0.55rem; letter-spacing:2px; color:var(--gold2); text-transform:uppercase; }
  .cred-title { font-family:'Cormorant Garamond'; font-size:1.4rem; font-weight:500; color:var(--white); line-height:1.2; }
  .cred-body { font-size:0.85rem; color:var(--fog); line-height:1.8; }
  .cred-detail {
    display: flex; align-items: center; gap: 8px; margin-top: auto;
    font-family:'DM Mono'; font-size:0.6rem; color:var(--gold); letter-spacing:1px;
  }
  .cred-detail::before { content:''; width:20px; height:1px; background:var(--gold); }

  /* Institutional statement banner */
  .inst-banner {
    display: grid; grid-template-columns: 1fr auto 1fr; gap: 2rem;
    align-items: center; padding: 2.5rem 3rem;
    border: 1px solid var(--lineColor);
    background: var(--ink3);
  }
  .ib-item { display: flex; flex-direction: column; gap: 4px; }
  .ib-item.right { align-items: flex-end; }
  .ib-label { font-family:'DM Mono'; font-size:0.58rem; letter-spacing:2px; color:var(--gold); text-transform:uppercase; }
  .ib-value { font-family:'Cormorant Garamond'; font-size:1.2rem; font-weight:500; color:var(--white); }
  .ib-divider { width:1px; background:var(--lineColor); align-self:stretch; }

  /* ═══════════════════════════════════════════
     SECTION 3: SUPPLIER MODEL
  ═══════════════════════════════════════════ */
  .supplier-model { background: var(--ink); }

  .sup-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }

  .sup-visual { position: relative; }

  /* Flow diagram */
  .flow-diagram {
    border: 1px solid var(--lineColor);
    overflow: hidden;
  }
  .flow-header {
    padding: 12px 20px;
    background: var(--ink2);
    border-bottom: 1px solid var(--lineColor);
    font-family:'DM Mono'; font-size:0.58rem; letter-spacing:3px; color:var(--gold);
    text-transform:uppercase; display:flex; align-items:center; gap:8px;
  }
  .flow-header::before { content:''; width:6px; height:6px; border-radius:50%; background:var(--gold); animation:credPulse 2s ease-in-out infinite; }
  .flow-nodes { padding: 2rem; display: flex; flex-direction: column; gap: 0; }
  .flow-node {
    display: flex; align-items: flex-start; gap: 1.2rem;
    padding: 1.2rem 0;
    border-bottom: 1px solid var(--lineColor);
    position: relative;
  }
  .flow-node:last-child { border-bottom: none; }
  .fn-marker {
    width: 36px; height: 36px; flex-shrink: 0;
    border: 1px solid var(--goldThin);
    display: flex; align-items: center; justify-content: center;
    font-family:'DM Mono'; font-size:0.9rem; color:var(--gold2);
    background: var(--goldGlow);
    clip-path: polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%);
  }
  .fn-body { flex: 1; }
  .fn-label { font-family:'DM Mono'; font-size:0.58rem; letter-spacing:2px; color:var(--fog); text-transform:uppercase; margin-bottom:3px; }
  .fn-title { font-size:0.95rem; font-weight:600; color:var(--white); margin-bottom:3px; }
  .fn-desc { font-size:0.82rem; color:var(--fog); line-height:1.6; }
  .fn-arrow {
    position: absolute; left: 17px; bottom: -1px; top: auto;
    font-family:'DM Mono'; font-size:0.7rem; color:var(--goldThin);
    transform: translateY(100%);
    display: none;
  }

  .flow-footer {
    padding: 12px 20px; background: var(--goldGlow);
    border-top: 1px solid var(--goldThin);
    font-family:'DM Mono'; font-size:0.62rem; color:var(--gold2); letter-spacing:1px;
    display:flex; align-items:center; gap:8px;
  }
  .flow-footer::before { content:'✓'; font-size:0.7rem; }

  .sup-right { display: flex; flex-direction: column; gap: 1.5rem; margin-top: 0.5rem; }

  .value-card {
    padding: 1.5rem 2rem;
    border: 1px solid var(--lineColor);
    position: relative; transition: all 0.4s;
  }
  .value-card::before {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
    background: var(--gold); transform: scaleX(0); transform-origin: left;
    transition: transform 0.4s;
  }
  .value-card:hover { border-color: rgba(184,146,42,0.25); background: rgba(184,146,42,0.03); }
  .value-card:hover::before { transform: scaleX(1); }
  .vc-label { font-family:'DM Mono'; font-size:0.58rem; letter-spacing:2px; color:var(--gold); text-transform:uppercase; margin-bottom:6px; }
  .vc-title { font-family:'Cormorant Garamond'; font-size:1.3rem; font-weight:500; color:var(--white); margin-bottom:6px; }
  .vc-body { font-size:0.85rem; color:var(--fog); line-height:1.75; }

  /* ═══════════════════════════════════════════
     SECTION 4: EXPORT CAPABILITY
  ═══════════════════════════════════════════ */
  .capability { background: var(--ink2); }

  .cap-intro-row {
    display: grid; grid-template-columns: 1fr 1fr; gap: 4rem;
    margin-bottom: 4rem; align-items: end;
  }
  .cap-tagline {
    font-family:'Cormorant Garamond'; font-size:1.1rem; font-weight:300;
    color:var(--fog); line-height:1.8; margin-top:1rem;
  }
  .cap-note {
    padding: 2rem; border: 1px solid var(--lineColor);
    background: var(--ink3);
  }
  .cap-note-label { font-family:'DM Mono'; font-size:0.58rem; letter-spacing:2px; color:var(--gold); text-transform:uppercase; margin-bottom:8px; }
  .cap-note-text { font-size:0.9rem; color:var(--fog); line-height:1.8; }

  .cap-table { width:100%; border-collapse:collapse; }
  .cap-table th {
    font-family:'DM Mono'; font-size:0.58rem; letter-spacing:2px;
    color:var(--fog); text-transform:uppercase; text-align:left;
    padding:10px 16px; border-bottom:1px solid var(--lineColor);
    background:var(--ink3);
  }
  .cap-table td {
    padding:14px 16px; border-bottom:1px solid var(--lineColor);
    font-size:0.88rem; color:var(--white); vertical-align:top;
    line-height:1.6;
  }
  .cap-table tr { transition:background 0.3s; }
  .cap-table tr:hover td { background:rgba(184,146,42,0.03); }
  .cap-table td.area { font-family:'DM Mono'; font-size:0.7rem; color:var(--gold2); letter-spacing:1px; }
  .cap-table td.status {
    font-family:'DM Mono'; font-size:0.62rem; letter-spacing:1px;
  }
  .status-ready { color:#4A9E6A; }
  .status-active { color:var(--gold2); }

  /* ═══════════════════════════════════════════
     SECTION 5: TARGET AUDIENCES
  ═══════════════════════════════════════════ */
  .audiences { background: var(--ink); }

  .aud-tabs {
    display: flex; gap: 0; border-bottom: 1px solid var(--lineColor);
    margin-bottom: 3rem;
  }
  .aud-tab {
    padding: 14px 28px; cursor: pointer;
    font-family:'DM Mono'; font-size:0.65rem; letter-spacing:2px; text-transform:uppercase;
    color:var(--fog); border:none; background:transparent;
    border-bottom:2px solid transparent; margin-bottom:-1px;
    transition:all 0.3s; display:flex; align-items:center; gap:8px;
  }
  .aud-tab.active { color:var(--gold2); border-bottom-color:var(--gold2); }
  .aud-tab:hover:not(.active) { color:var(--white); }
  .tab-dot { width:5px; height:5px; border-radius:50%; background:currentColor; }

  .aud-panel { display:none; }
  .aud-panel.active { display:grid; grid-template-columns:1fr 1fr; gap:4rem; }

  .ap-left { }
  .ap-subtitle { font-family:'Cormorant Garamond'; font-size:2.2rem; font-weight:300; color:var(--white); line-height:1.15; margin-bottom:1.2rem; }
  .ap-desc { font-size:0.92rem; color:var(--fog); line-height:1.9; margin-bottom:2rem; }
  .ap-points { display:flex; flex-direction:column; gap:0; border:1px solid var(--lineColor); }
  .ap-point {
    display:flex; align-items:flex-start; gap:1rem;
    padding:14px 18px; border-bottom:1px solid var(--lineColor);
    transition:background 0.3s;
  }
  .ap-point:last-child { border-bottom:none; }
  .ap-point:hover { background:rgba(184,146,42,0.03); }
  .ap-icon { font-size:1rem; flex-shrink:0; margin-top:1px; }
  .ap-point-title { font-size:0.88rem; font-weight:600; color:var(--white); margin-bottom:2px; }
  .ap-point-body { font-size:0.8rem; color:var(--fog); line-height:1.6; }

  .ap-right { }
  .ap-card {
    border:1px solid var(--lineColor); padding:2.5rem;
    background:var(--ink2); position:relative; overflow:hidden;
  }
  .ap-card::before {
    content:''; position:absolute; top:0; left:0; right:0; height:2px;
    background:linear-gradient(90deg,transparent,var(--gold),transparent);
  }
  .ap-card-label { font-family:'DM Mono'; font-size:0.58rem; letter-spacing:2px; color:var(--gold); text-transform:uppercase; margin-bottom:1.5rem; }
  .ap-card-items { display:flex; flex-direction:column; gap:0; }
  .ap-card-item {
    display:grid; grid-template-columns:1fr auto;
    padding:12px 0; border-bottom:1px solid var(--lineColor);
    align-items:center;
  }
  .ap-card-item:last-child { border-bottom:none; }
  .ap-ci-key { font-family:'DM Mono'; font-size:0.62rem; color:var(--fog); letter-spacing:1px; }
  .ap-ci-val { font-family:'DM Mono'; font-size:0.65rem; color:var(--white); text-align:right; }
  .ap-ci-val.good { color:#4A9E6A; }
  .ap-ci-val.gold { color:var(--gold2); }

  /* ═══════════════════════════════════════════
     SECTION 6: GLOBAL TRADE READINESS
  ═══════════════════════════════════════════ */
  .trade-ready { background: var(--ink2); }

  .tr-header { display:grid; grid-template-columns:1fr 1fr; gap:4rem; margin-bottom:4rem; align-items:end; }
  .tr-desc { font-size:1rem; color:var(--fog); line-height:1.9; margin-top:1.2rem; }

  .tr-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem; }
  .tr-block {
    padding:2rem; border:1px solid var(--lineColor); background:var(--ink3);
    position:relative; overflow:hidden; transition:all 0.4s;
  }
  .tr-block::before {
    content:''; position:absolute; bottom:0; left:0; right:0; height:2px;
    background:var(--gold); transform:scaleX(0); transform-origin:left;
    transition:transform 0.4s;
  }
  .tr-block:hover { border-color:rgba(184,146,42,0.25); }
  .tr-block:hover::before { transform:scaleX(1); }
  .tb-icon { font-size:1.8rem; margin-bottom:1rem; display:block; }
  .tb-title { font-family:'Cormorant Garamond'; font-size:1.3rem; font-weight:500; color:var(--white); margin-bottom:0.5rem; }
  .tb-items { display:flex; flex-direction:column; gap:5px; margin-top:1rem; }
  .tb-item { font-family:'DM Mono'; font-size:0.6rem; letter-spacing:1px; color:var(--fog); padding-left:12px; position:relative; }
  .tb-item::before { content:'—'; position:absolute; left:0; color:var(--gold); font-size:0.5rem; top:2px; }

  .tr-compliance {
    margin-top:3rem; padding:2rem 3rem;
    border:1px solid var(--lineColor); background:var(--ink3);
    display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:2rem;
  }
  .trc-label { font-family:'DM Mono'; font-size:0.58rem; letter-spacing:2px; color:var(--gold); text-transform:uppercase; margin-bottom:4px; }
  .trc-value { font-family:'Cormorant Garamond'; font-size:1.1rem; color:var(--white); }
  .trc-divider { width:1px; height:40px; background:var(--lineColor); }

  /* ═══════════════════════════════════════════
     SECTION 7: CONTACT
  ═══════════════════════════════════════════ */
  .contact { background: var(--ink); }
  .contact-grid { display:grid; grid-template-columns:5fr 7fr; gap:6rem; align-items:start; }

  .contact-left { position:sticky; top:100px; }
  .contact-lede { font-family:'Cormorant Garamond'; font-size:1.1rem; font-weight:300; color:var(--fog); line-height:1.9; margin:1.2rem 0 2.5rem; }

  .contact-refs { display:flex; flex-direction:column; gap:0; border:1px solid var(--lineColor); }
  .cref {
    display:flex; align-items:flex-start; gap:1rem;
    padding:16px 18px; border-bottom:1px solid var(--lineColor);
    transition:background 0.3s;
  }
  .cref:last-child { border-bottom:none; }
  .cref:hover { background:rgba(184,146,42,0.03); }
  .cref-marker { font-family:'DM Mono'; font-size:0.8rem; color:var(--gold2); flex-shrink:0; margin-top:1px; }
  .cref-label { font-family:'DM Mono'; font-size:0.58rem; letter-spacing:2px; color:var(--fog); text-transform:uppercase; margin-bottom:2px; }
  .cref-val { font-size:0.9rem; color:var(--white); }

  .cform { display:flex; flex-direction:column; gap:0; border:1px solid var(--lineColor); }
  .cform-header {
    padding:16px 20px; background:var(--ink2);
    border-bottom:1px solid var(--lineColor);
    font-family:'DM Mono'; font-size:0.6rem; letter-spacing:2px; color:var(--gold2); text-transform:uppercase;
    display:flex; align-items:center; gap:8px;
  }
  .cform-header::before { content:''; width:6px; height:6px; border-radius:50%; background:var(--gold2); animation:credPulse 2s ease-in-out infinite; }
  .cform-body { padding:2rem; display:flex; flex-direction:column; gap:1.2rem; }
  .cf-row { display:grid; grid-template-columns:1fr 1fr; gap:1.2rem; }
  .cf-field { display:flex; flex-direction:column; gap:5px; }
  .cf-label { font-family:'DM Mono'; font-size:0.58rem; letter-spacing:2px; color:var(--fog); text-transform:uppercase; }
  .cf-input {
    background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07);
    color:var(--white); font-family:'Manrope'; font-size:0.9rem;
    padding:11px 14px; outline:none;
    clip-path:polygon(5px 0%,100% 0%,calc(100% - 5px) 100%,0% 100%);
    transition:border-color 0.3s, background 0.3s; resize:vertical;
  }
  .cf-input:focus { border-color:var(--gold); background:rgba(184,146,42,0.04); }
  .cf-input::placeholder { color:rgba(106,116,144,0.7); font-size:0.83rem; }
  select.cf-input option { background:var(--ink2); }
  .cform-footer { padding:1.5rem 2rem; border-top:1px solid var(--lineColor); display:flex; align-items:center; gap:1.5rem; }
  .cform-note { font-family:'DM Mono'; font-size:0.58rem; color:var(--fog); letter-spacing:1px; }

  .success-state {
    padding:4rem 2rem; text-align:center; border:1px solid var(--lineColor);
    background:var(--ink2); animation:riseIn 0.6s ease forwards;
  }
  .ss-check { font-family:'Cormorant Garamond'; font-size:4rem; color:var(--gold2); line-height:1; margin-bottom:1rem; }
  .ss-title { font-family:'Cormorant Garamond'; font-size:2rem; font-weight:300; color:var(--white); margin-bottom:0.5rem; }
  .ss-sub { font-family:'DM Mono'; font-size:0.65rem; color:var(--fog); letter-spacing:1px; }

  /* ═══════════════════════════════════════════
     FOOTER
  ═══════════════════════════════════════════ */
  .footer {
    background:var(--ink); border-top:1px solid var(--lineColor);
    padding:3rem 5vw;
  }
  .footer-inner {
    max-width:1200px; margin:0 auto;
    display:grid; grid-template-columns:1fr auto 1fr; gap:3rem; align-items:start;
  }
  .footer-brand { }
  .footer-tagline { font-family:'DM Mono'; font-size:0.58rem; letter-spacing:1.5px; color:var(--fog); margin-top:8px; }
  .footer-links-col { display:flex; flex-direction:column; gap:10px; }
  .footer-links-col a { font-family:'DM Mono'; font-size:0.6rem; letter-spacing:1.5px; text-transform:uppercase; color:var(--fog); text-decoration:none; transition:color 0.3s; }
  .footer-links-col a:hover { color:var(--gold2); }
  .footer-right { text-align:right; }
  .footer-copy { font-family:'DM Mono'; font-size:0.58rem; color:var(--fog); letter-spacing:1px; }
  .footer-compliance { margin-top:8px; font-family:'DM Mono'; font-size:0.55rem; color:rgba(106,116,144,0.6); letter-spacing:1px; line-height:1.7; }

  /* ─── RESPONSIVE ─────────────────────────── */
  @media(max-width:960px){
    .nav-links { display:none; }
    .hero-body-wrap { grid-template-columns:1fr; gap:2rem; }
    .hero-stats { grid-template-columns:1fr 1fr; }
    .h-stat:nth-child(2) { border-right:none; }
    .pos-grid, .sup-layout, .cap-intro-row, .tr-header,
    .contact-grid, .legit-header { grid-template-columns:1fr; gap:2.5rem; }
    .pos-left { position:static; }
    .contact-left { position:static; }
    .credentials-grid { grid-template-columns:1fr; }
    .tr-grid { grid-template-columns:1fr 1fr; }
    .aud-panel.active { grid-template-columns:1fr; }
    .footer-inner { grid-template-columns:1fr; gap:2rem; }
    .footer-right { text-align:left; }
    .inst-banner { grid-template-columns:1fr; }
    .ib-divider { display:none; }
    .ib-item.right { align-items:flex-start; }
    section.section { padding:70px 5vw; }
  }
  @media(max-width:600px){
    .hero-stats { grid-template-columns:1fr 1fr; }
    .tr-grid { grid-template-columns:1fr; }
    .cf-row { grid-template-columns:1fr; }
    .tr-compliance { flex-direction:column; gap:1rem; }
  }
`;

/* ─── DATA ──────────────────────────────────────────────────────── */
const TICKERS = [
  {k:"STATUS",v:"IEC Registered · DGFT Active · GST Compliant"},
  {k:"TRADE TERMS",v:"FOB · CIF · CFR · EXW · DAP · DDP"},
  {k:"PAYMENTS",v:"LC (At Sight & Usance) · DP · DA · TT · Advance"},
  {k:"DOCS",v:"COO · Phytosanitary · FSSAI · BIS · Quality Cert · Packing List"},
  {k:"PORTS",v:"JNPT · Mundra · Chennai · Kolkata · Nhava Sheva · Pipavav"},
  {k:"MARKETS",v:"GCC · EU · UK · USA · Southeast Asia · Africa · LATAM"},
];

const POSITIONING = [
  {num:"01", title:"We Source, Not Manufacture", body:"Our role is to identify the right supplier from India's vast industrial base — matching your specification to verified factories without the overheads of owning production."},
  {num:"02", title:"We Execute the Export", body:"From documentation and customs to freight and payment — we own the process end-to-end so buyers receive compliant shipments and suppliers receive fair settlements."},
  {num:"03", title:"We Build Long-Term Trade", body:"Repeat transactions, not spot deals. We build structured buyer-supplier relationships that deliver consistency, predictability, and growing trade volumes for all parties."},
  {num:"04", title:"We Represent Indian Industry", body:"As an incorporated export firm, we act as the formal trade channel — giving overseas buyers and financial institutions a trustworthy, accountable counterparty registered under Indian law."},
];

const CREDENTIALS = [
  {badge:"Legal Entity", title:"Incorporated Export Company", body:"Registered under the Ministry of Corporate Affairs (MCA), India. A formal legal entity with auditable financials and corporate governance — not an informal trader.", detail:"Companies Act, 2013"},
  {badge:"Trade License", title:"IEC Registered with DGFT", body:"Importer-Exporter Code (IEC) issued by the Directorate General of Foreign Trade. Mandatory for international trade in India — our registration is current and active.", detail:"DGFT, Ministry of Commerce"},
  {badge:"Tax Compliance", title:"GST & Income Tax Compliant", body:"Regular GST filing, export invoice compliance under IGST rules, and income tax returns on record. Full audit trail available for financial institution due diligence.", detail:"GSTIN Active · ITR Filed"},
];

const CAPABILITIES_TABLE = [
  {area:"Supplier Discovery", cap:"Identification, vetting, and qualification of manufacturers across product categories", status:"active", statusLabel:"Active"},
  {area:"Export Documentation", cap:"COO, Phytosanitary, FSSAI, BIS, Commercial Invoice, Packing List, Bill of Lading", status:"ready", statusLabel:"Full Service"},
  {area:"Quality Control", cap:"Pre-shipment inspection coordination, third-party lab testing, sample validation", status:"ready", statusLabel:"Full Service"},
  {area:"Logistics", cap:"Freight forwarding, customs clearance, container booking, multimodal coordination", status:"active", statusLabel:"Active"},
  {area:"Trade Finance", cap:"LC management, ECGC coordination, export credit facilitation, payment structuring", status:"ready", statusLabel:"Available"},
  {area:"Compliance Advisory", cap:"Tariff classification, destination-country regulations, labelling, certification guidance", status:"ready", statusLabel:"Available"},
  {area:"Market Intelligence", cap:"Buyer profiling, price benchmarking, demand analysis, market entry research", status:"active", statusLabel:"Active"},
];

const AUDIENCE_DATA = {
  buyers: {
    tab:"International Buyers",
    subtitle:"Your trusted gateway\ninto Indian supply.",
    desc:"We eliminate the complexity of sourcing from India. As your counterparty, we handle supplier qualification, documentation, compliance, and logistics — so you receive a verified consignment, not a headache.",
    points:[
      {icon:"🔍", t:"Verified Supply Chain", b:"Every supplier is vetted for capacity, compliance, and quality before introduction. No surprises."},
      {icon:"📋", t:"Complete Documentation", b:"All export documents prepared in-house — from COO to Phytosanitary. Destination-country compliant."},
      {icon:"🤝", t:"Single Point of Contact", b:"One accountable entity from order to delivery. No chasing multiple vendors or agents."},
      {icon:"💰", t:"Flexible Trade Terms", b:"LC, DP, DA, advance payment — structured to protect both parties with banking-grade instruments."},
    ],
    cardLabel:"What We Provide",
    cardItems:[
      {k:"Supplier Qualification", v:"✓ Included"},
      {k:"Pre-Shipment Inspection", v:"✓ Arranged"},
      {k:"Export Documentation", v:"✓ Full Service"},
      {k:"Freight Coordination", v:"✓ Managed"},
      {k:"Payment Structure", v:"LC / DP / DA"},
      {k:"Account Manager", v:"✓ Dedicated"},
    ],
  },
  suppliers: {
    tab:"Indian Suppliers",
    subtitle:"Your export arm,\nwithout the overhead.",
    desc:"You manufacture. We export. We bring you credible international buyers, handle all documentation and compliance, and ensure your payment is secured — so you can focus entirely on production.",
    points:[
      {icon:"🌍", t:"Global Buyer Access", b:"We introduce you to pre-qualified buyers across 12+ countries who match your product and capacity."},
      {icon:"⚖️", t:"Compliance Handled", b:"IEC, RCMC, export documentation, licences — we manage the regulatory layer entirely."},
      {icon:"💳", t:"Payment Protection", b:"We structure transactions with banking instruments so your receivables are secured before shipment."},
      {icon:"📈", t:"Sustained Volumes", b:"We build recurring trade flows, not one-off deals. Your capacity utilisation improves consistently."},
    ],
    cardLabel:"What You Retain",
    cardItems:[
      {k:"Production Focus", v:"100%"},
      {k:"Export Overhead", v:"None"},
      {k:"Documentation Burden", v:"Eliminated"},
      {k:"Buyer Risk", v:"Mitigated"},
      {k:"Payment Security", v:"Structured"},
      {k:"Market Reach", v:"12+ Countries"},
    ],
  },
  finance: {
    tab:"Financial Institutions",
    subtitle:"A structured, compliant\ntrade counterparty.",
    desc:"We present as an incorporated, IEC-registered merchant export company with auditable trade records, GST compliance, and a structured approach to export finance — suitable for credit facility consideration.",
    points:[
      {icon:"🏛️", t:"Incorporated Legal Entity", b:"Registered under MCA with corporate governance, audited accounts, and formal shareholding structure."},
      {icon:"📊", t:"Documented Trade Records", b:"Clean export invoice history, GR-waiver filings, bank realisation certificates, and ECGC records."},
      {icon:"🔒", t:"ECGC Coverage Eligible", b:"Eligible for ECGC export credit insurance — reducing counterparty risk on credit facilities."},
      {icon:"📜", t:"Regulatory Standing", b:"IEC active, GSTIN compliant, income tax filed. Full KYC documentation available on request."},
    ],
    cardLabel:"Compliance Profile",
    cardItems:[
      {k:"Entity Type", v:"Pvt. Ltd. / Company"},
      {k:"IEC Status", v:"Active", cls:"good"},
      {k:"GST Filing", v:"Current", cls:"good"},
      {k:"ECGC Eligible", v:"Yes", cls:"good"},
      {k:"Trade Finance", v:"LC Capable", cls:"gold"},
      {k:"Audited Accounts", v:"Available"},
    ],
  },
};

const TRADE_BLOCKS = [
  {icon:"📄", title:"Export Documentation", items:["Certificate of Origin (COO)","Phytosanitary Certificate","Commercial Invoice & Packing List","Bill of Lading / Airway Bill","FSSAI / BIS Certificates"]},
  {icon:"⚖️", title:"Compliance & Licensing", items:["IEC Registration (Active)","RCMC from Export Promotion Body","GST/IGST Export Compliance","DGFT Policy Adherence","ECGC Coverage Management"]},
  {icon:"🚢", title:"Logistics & Freight", items:["Multi-port capability (JNPT, Mundra)","FCL & LCL Shipments","Freight Forwarder Network","Custom Clearance Agents","Tracking & MIS Reporting"]},
  {icon:"💰", title:"Trade Finance Instruments", items:["Letter of Credit (Sight & Usance)","Documentary Collection (DP/DA)","Advance Payment & Escrow","Export Packing Credit","RODTEP / Drawback Claims"]},
  {icon:"🌐", title:"Market Coverage", items:["GCC (UAE, Saudi, Kuwait, Qatar)","European Union (12 countries)","United Kingdom","Southeast Asia","East Africa & LATAM"]},
  {icon:"🔬", title:"Quality & Inspection", items:["Pre-shipment Inspection (PSI)","Third-Party Lab Coordination","Sample Approval Process","Spec Sheet Documentation","ISO / Certifying Body Liaison"]},
];

/* ─── COMPONENT ─────────────────────────────────────────────────── */
export default function App() {
  const [cursor, setCursor] = useState({x:-100,y:-100});
  const [navSolid, setNavSolid] = useState(false);
  const [activeTab, setActiveTab] = useState("buyers");
  const [form, setForm] = useState({name:"",company:"",email:"",country:"",role:"",product:"",message:""});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onMove = e => setCursor({x:e.clientX, y:e.clientY});
    const onScroll = () => setNavSolid(window.scrollY > 60);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add("in"); obs.unobserve(e.target); } }),
      {threshold:0.1}
    );
    document.querySelectorAll(".r").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const setF = k => e => setForm(p=>({...p,[k]:e.target.value}));
  const tickDouble = [...TICKERS,...TICKERS];
  const aud = AUDIENCE_DATA[activeTab];

  return (
    <>
      <style>{CSS}</style>
      <div id="cur-dot" style={{left:cursor.x,top:cursor.y}} />
      <div id="cur-cross" style={{left:cursor.x,top:cursor.y}} />

      {/* ── NAV ─────────────────────────────────── */}
      <nav className={`nav${navSolid?" solid":""}`}>
        <a href="#top" className="nav-wordmark">
          <div className="wm-top">Nexus<span>Trade</span></div>
          <div className="wm-sub">Merchant Export Company · India</div>
        </a>
        <ul className="nav-links">
          {[["#positioning","Who We Are"],["#legitimacy","Legitimacy"],["#capability","Capabilities"],["#audiences","Partners"],["#contact","Contact"]].map(([h,l]) => (
            <li key={l}><a href={h}>{l}</a></li>
          ))}
        </ul>
        <div className="nav-divider" />
        <a href="#contact" className="nav-contact">Trade Enquiry</a>
      </nav>

      {/* ── HERO ────────────────────────────────── */}
      <section className="hero" id="top">
        <div className="hero-bg" />
        <div className="hero-rules" />
        <div className="hero-margin-l" />
        <div className="hero-margin-r" />

        <div className="hero-inner">
          <div className="hero-reg-badge">
            <div className="reg-seal">IEC<br/>REG</div>
            <span className="reg-text">
              <strong>Incorporated Export Company</strong> · Registered under MCA, India · IEC Issued by DGFT
            </span>
          </div>

          <div className="hero-eyeline">Merchant Export Company — Established, India</div>

          <h1 className="hero-headline">
            <span className="hl1">The Export Partner</span>
            <span className="hl2">India Deserves.</span>
            <span className="hl3">Trade Capability · Supplier Network · Export Execution</span>
          </h1>

          <div className="hero-body-wrap">
            <p className="hero-statement">
              We are not a manufacturer. We are an incorporated merchant export company — sourcing from India's finest producers and delivering to the world with precision, compliance, and accountability.
            </p>
            <div className="hero-declaration">
              {[
                ["For International Buyers","Verified supply, complete documentation, single accountable partner."],
                ["For Indian Suppliers","Global buyer access without export complexity or overhead."],
                ["For Financial Institutions","IEC-registered, GST-compliant, ECGC-eligible trade counterparty."],
              ].map(([t,b]) => (
                <div className="dec-item" key={t}>
                  <span className="dec-mark">→</span>
                  <span className="dec-text"><strong>{t}:</strong> {b}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-ctas">
            <a href="#contact" className="btn-primary">Begin Trade Enquiry</a>
            <a href="#legitimacy" className="btn-outline">Verify Our Credentials</a>
          </div>
        </div>

        <div className="hero-stats">
          {[
            ["12+","Export Markets","Active trade relationships across GCC, EU, SEA & Africa"],
            ["500+","Verified Suppliers","Across 20+ product categories in India"],
            ["100%","Documentation Rate","Fully compliant shipments, every consignment"],
            ["48hr","Enquiry Response","From receipt to sourcing assessment"],
          ].map(([n,l,d]) => (
            <div className="h-stat" key={l}>
              <div className="h-stat-num serif">{n}</div>
              <div className="h-stat-label mono">{l}</div>
              <div className="h-stat-desc">{d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TICKER ──────────────────────────────── */}
      <div className="ticker-wrap">
        <div className="ticker-tag">Trade Intel</div>
        <div className="ticker-scroll">
          <div className="ticker-track">
            {tickDouble.map((t,i) => (
              <span className="tick-item" key={i}><span className="tk">◆ {t.k}:</span>{t.v}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── POSITIONING ─────────────────────────── */}
      <section className="section positioning" id="positioning">
        <div className="section-narrow">
          <div className="pos-grid">
            <div className="pos-left">
              <div className="eyebrow r">Our Positioning</div>
              <h2 className="sec-title r d1">We are a<br/><em>Merchant Exporter</em><br/><strong>— not a factory.</strong></h2>
              <p className="pos-statement r d2">
                The distinction matters. As a <em>trading house</em>, our value is not in production — it is in our network, our knowledge, and our ability to execute cross-border trade with precision.
              </p>
              <div className="pos-distinction r d3">
                <div className="pos-row">
                  <div className="pos-cell head">Not What We Are</div>
                  <div className="pos-cell head">What We Are</div>
                </div>
                {[
                  ["Manufacturer / Factory","Merchant Export Company"],
                  ["Product-Selling Website","B2B Trust & Trade Presence"],
                  ["Spot Trader","Long-Term Trade Partner"],
                  ["Single-Category Exporter","Multi-Category Sourcing Firm"],
                ].map(([n,y]) => (
                  <div className="pos-row" key={n}>
                    <div className="pos-cell not"><span className="x">✕</span>{n}</div>
                    <div className="pos-cell yes"><span className="ck">✓</span>{y}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pos-right">
              {POSITIONING.map((p,i) => (
                <div className={`pillar-block r d${i%3+1}`} key={p.num}>
                  <div className="pb-num mono">{p.num} ——</div>
                  <div className="pb-title serif">{p.title}</div>
                  <div className="pb-body">{p.body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="rule" />

      {/* ── LEGITIMACY ──────────────────────────── */}
      <section className="section legitimacy" id="legitimacy">
        <div className="section-narrow">
          <div className="legit-header">
            <div>
              <div className="eyebrow r">Company Legitimacy</div>
              <h2 className="sec-title r d1">Credentials<br/>you can <em>verify.</em></h2>
              <p className="legit-intro r d2">
                We exist as a formal legal entity — not an informal trader or agent. Every document, registration, and compliance record is current, auditable, and available to counterparties upon request.
              </p>
            </div>
            <blockquote className="legit-quote r d2">
              "Trust in international trade is not built on claims — it is built on <strong>verifiable standing</strong>, clean documentation, and a track record of execution."
            </blockquote>
          </div>

          <div className="credentials-grid r">
            {CREDENTIALS.map(c => (
              <div className="cred-card" key={c.badge}>
                <div className="cred-badge">
                  <span className="cred-badge-dot" />
                  <span className="cred-badge-text">{c.badge}</span>
                </div>
                <div className="cred-title serif">{c.title}</div>
                <div className="cred-body">{c.body}</div>
                <div className="cred-detail mono">{c.detail}</div>
              </div>
            ))}
          </div>

          <div className="inst-banner r">
            {[
              {label:"Entity Type", value:"Private Limited Company"},
              {label:"Registration", value:"Ministry of Corporate Affairs, India"},
            ].map((item,i) => (
              <div key={item.label}>
                {i===1 && <div className="ib-divider" />}
                <div className={`ib-item${i===2?" right":""}`}>
                  <div className="ib-label mono">{item.label}</div>
                  <div className="ib-value serif">{item.value}</div>
                </div>
              </div>
            ))}
            <div className="ib-item right">
              <div className="ib-label mono">Operational Status</div>
              <div className="ib-value serif" style={{color:"var(--gold2)"}}>Active & Trading</div>
            </div>
          </div>
        </div>
      </section>

      <div className="rule" />

      {/* ── SUPPLIER MODEL ──────────────────────── */}
      <section className="section supplier-model" id="supplier">
        <div className="section-narrow">
          <div className="sup-layout">
            <div className="sup-visual r">
              <div className="flow-diagram">
                <div className="flow-header">Supplier Collaboration Model</div>
                <div className="flow-nodes">
                  {[
                    {n:"A", label:"Buyer Requirement", title:"International Buyer Places Enquiry", desc:"Buyer specifies product, quantity, quality standard, packaging, destination port, and payment preference."},
                    {n:"B", label:"NexusTrade Action", title:"Sourcing & Supplier Matching", desc:"We identify qualified Indian suppliers from our network — vetted for capacity, compliance, and export readiness."},
                    {n:"C", label:"Quality Gate", title:"Sample, Spec & Pricing Confirmation", desc:"Supplier submits samples. We verify against spec, coordinate pricing, and confirm with buyer before proceeding."},
                    {n:"D", label:"Execution", title:"Documentation, Logistics & Shipment", desc:"We manage all export documentation, freight booking, customs clearance, and delivery coordination."},
                    {n:"E", label:"Settlement", title:"Payment & Post-Shipment", desc:"LC negotiation or payment realisation, export incentive claims (RODTEP), and supplier settlement on confirmed basis."},
                  ].map(node => (
                    <div className="flow-node" key={node.n}>
                      <div className="fn-marker mono">{node.n}</div>
                      <div className="fn-body">
                        <div className="fn-label mono">{node.label}</div>
                        <div className="fn-title">{node.title}</div>
                        <div className="fn-desc">{node.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flow-footer mono">Full-cycle execution — buyer to supplier settlement</div>
              </div>
            </div>

            <div className="sup-right">
              <div className="eyebrow r">Supplier Collaboration</div>
              <h2 className="sec-title r d1">We are your<br/><em>export arm.</em></h2>
              <p className="r d2" style={{fontSize:"1rem",color:"var(--fog)",lineHeight:"1.9",margin:"1rem 0 2rem"}}>
                Indian manufacturers gain global reach without the complexity of managing exports directly. We handle every step between production and foreign buyer — enabling suppliers to focus entirely on what they do best.
              </p>
              {[
                {label:"Network Strength", title:"500+ Verified Manufacturers", body:"Across agriculture, textiles, spices, chemicals, handicrafts, processed food, pharma, and industrial goods."},
                {label:"Supplier Benefit", title:"Export Without Export Overhead", body:"No IEC requirement on the supplier side. No foreign buyer negotiation. No documentation burden. We handle it all."},
                {label:"Payment Model", title:"Secured Receivables on Shipment", body:"Suppliers receive payment on confirmed basis — with banking instruments in place before production commences."},
                {label:"Growth Path", title:"Recurring Volume Commitment", body:"We build sustained trade flows. Suppliers gain predictable international order books, not sporadic one-off transactions."},
              ].map((v,i) => (
                <div className={`value-card r d${i%3+1}`} key={v.label}>
                  <div className="vc-label mono">{v.label}</div>
                  <div className="vc-title serif">{v.title}</div>
                  <div className="vc-body">{v.body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="rule" />

      {/* ── CAPABILITY ──────────────────────────── */}
      <section className="section capability" id="capability">
        <div className="section-narrow">
          <div className="cap-intro-row">
            <div>
              <div className="eyebrow r">Export Capability</div>
              <h2 className="sec-title r d1">End-to-End<br/><em>Trade Execution.</em></h2>
              <p className="cap-tagline r d2">
                From first enquiry to final delivery — every function of the export process is handled in-house or through our established network of certified service partners.
              </p>
            </div>
            <div className="cap-note r d2">
              <div className="cap-note-label mono">Our Mandate</div>
              <div className="cap-note-text">
                We are not a broker who connects and steps away. We are an <strong style={{color:"var(--white)"}}>accountable execution partner</strong> — responsible for quality, documentation, logistics, and payment realisation on every transaction.
              </div>
            </div>
          </div>

          <table className="cap-table r">
            <thead>
              <tr>
                <th style={{width:"18%"}}>Capability Area</th>
                <th>What We Handle</th>
                <th style={{width:"14%",textAlign:"center"}}>Status</th>
              </tr>
            </thead>
            <tbody>
              {CAPABILITIES_TABLE.map(row => (
                <tr key={row.area}>
                  <td className="area">{row.area}</td>
                  <td>{row.cap}</td>
                  <td style={{textAlign:"center"}}>
                    <span className={`mono ${row.status==="ready"?"status-ready":"status-active"}`}>
                      {row.statusLabel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="rule" />

      {/* ── AUDIENCES ───────────────────────────── */}
      <section className="section audiences" id="audiences">
        <div className="section-narrow">
          <div className="eyebrow r">Who We Serve</div>
          <h2 className="sec-title r d1" style={{marginBottom:"2.5rem"}}>Built for<br/><em>every partner.</em></h2>

          <div className="aud-tabs r">
            {[["buyers","International Buyers"],["suppliers","Indian Suppliers"],["finance","Financial Institutions"]].map(([k,l]) => (
              <button key={k} className={`aud-tab${activeTab===k?" active":""}`} onClick={()=>setActiveTab(k)}>
                <span className="tab-dot" />{l}
              </button>
            ))}
          </div>

          {Object.entries(AUDIENCE_DATA).map(([key, a]) => (
            <div key={key} className={`aud-panel${activeTab===key?" active":""}`}>
              <div className="ap-left">
                <h3 className="ap-subtitle serif" style={{whiteSpace:"pre-line"}}>{a.subtitle}</h3>
                <p className="ap-desc">{a.desc}</p>
                <div className="ap-points">
                  {a.points.map(p => (
                    <div className="ap-point" key={p.t}>
                      <span className="ap-icon">{p.icon}</span>
                      <div>
                        <div className="ap-point-title">{p.t}</div>
                        <div className="ap-point-body">{p.b}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="ap-right">
                <div className="ap-card">
                  <div className="ap-card-label mono">{a.cardLabel}</div>
                  <div className="ap-card-items">
                    {a.cardItems.map(item => (
                      <div className="ap-card-item" key={item.k}>
                        <span className="ap-ci-key mono">{item.k}</span>
                        <span className={`ap-ci-val mono${item.cls?" "+item.cls:""}`}>{item.v}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{marginTop:"1.5rem"}}>
                  <a href="#contact" className="btn-primary">Start A Conversation</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="rule" />

      {/* ── TRADE READINESS ─────────────────────── */}
      <section className="section trade-ready" id="trade">
        <div className="section-narrow">
          <div className="tr-header">
            <div>
              <div className="eyebrow r">Global Trade Readiness</div>
              <h2 className="sec-title r d1">Compliant from<br/><em>day one.</em></h2>
              <p className="tr-desc r d2">
                Every shipment we handle is documentation-complete, regulation-aligned, and audit-ready. We treat compliance not as a checkbox — but as the foundation of trade credibility.
              </p>
            </div>
            <div className="r d2" style={{display:"flex",flexDirection:"column",gap:"1rem",justifyContent:"flex-end"}}>
              <a href="#contact" className="btn-primary" style={{alignSelf:"flex-start"}}>Request Capability Profile</a>
              <p style={{fontFamily:"var(--font-mono, 'DM Mono')",fontSize:"0.62rem",color:"var(--fog)",letterSpacing:"1px"}}>
                Full credentials and compliance documentation available to verified counterparties upon NDA.
              </p>
            </div>
          </div>

          <div className="tr-grid">
            {TRADE_BLOCKS.map((b,i) => (
              <div className={`tr-block r d${i%3+1}`} key={b.title}>
                <span className="tb-icon">{b.icon}</span>
                <div className="tb-title serif">{b.title}</div>
                <div className="tb-items">
                  {b.items.map(item => <div className="tb-item mono" key={item}>{item}</div>)}
                </div>
              </div>
            ))}
          </div>

          <div className="tr-compliance r">
            {[
              {label:"Trade Compliance Standard", value:"DGFT / FEMA / Customs Act"},
              {label:"Finance Instruments", value:"LC · DP · DA · ECGC"},
              {label:"Export Incentives", value:"RODTEP · RoSCTL · Drawback"},
              {label:"Dispute Resolution", value:"Indian Arbitration / ICC"},
            ].map((item,i) => (
              <div key={item.label}>
                {i > 0 && <div className="trc-divider" />}
                <div>
                  <div className="trc-label mono">{item.label}</div>
                  <div className="trc-value serif">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="rule" />

      {/* ── CONTACT ─────────────────────────────── */}
      <section className="section contact" id="contact">
        <div className="section-narrow">
          <div className="contact-grid">
            <div className="contact-left">
              <div className="eyebrow r">Initiate Trade</div>
              <h2 className="sec-title r d1">Let's build<br/>something <em>permanent.</em></h2>
              <p className="contact-lede r d2">
                Whether you represent a buying organisation, a manufacturing firm, or a financial institution — we are prepared to engage with substance, transparency, and commitment.
              </p>
              <div className="contact-refs r d3">
                {[
                  {m:"📍", label:"Registered Office", val:"Mumbai, Maharashtra, India"},
                  {m:"📧", label:"Trade Enquiries", val:"trade@nexustrade.in"},
                  {m:"📞", label:"Direct Contact", val:"+91 98XX XXXXXX"},
                  {m:"⏱", label:"Response Commitment", val:"Within 24 business hours"},
                  {m:"🔒", label:"Confidentiality", val:"All enquiries handled under strict NDA"},
                ].map(c => (
                  <div className="cref" key={c.label}>
                    <span className="cref-marker">{c.m}</span>
                    <div>
                      <div className="cref-label mono">{c.label}</div>
                      <div className="cref-val">{c.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="r d1">
              {sent ? (
                <div className="success-state">
                  <div className="ss-check serif">✓</div>
                  <div className="ss-title serif">Enquiry Received</div>
                  <div className="ss-sub mono">Our trade team will respond within 24 business hours.</div>
                </div>
              ) : (
                <div className="cform">
                  <div className="cform-header mono">New Trade Enquiry</div>
                  <div className="cform-body">
                    <div className="cf-row">
                      <div className="cf-field"><label className="cf-label mono">Full Name *</label><input className="cf-input" placeholder="Your name" required value={form.name} onChange={setF("name")} /></div>
                      <div className="cf-field"><label className="cf-label mono">Organisation *</label><input className="cf-input" placeholder="Company / Firm" required value={form.company} onChange={setF("company")} /></div>
                    </div>
                    <div className="cf-row">
                      <div className="cf-field"><label className="cf-label mono">Email *</label><input className="cf-input" type="email" placeholder="trade@company.com" required value={form.email} onChange={setF("email")} /></div>
                      <div className="cf-field"><label className="cf-label mono">Country</label><input className="cf-input" placeholder="Country / Region" value={form.country} onChange={setF("country")} /></div>
                    </div>
                    <div className="cf-row">
                      <div className="cf-field">
                        <label className="cf-label mono">I Represent *</label>
                        <select className="cf-input" required value={form.role} onChange={setF("role")}>
                          <option value="">Select capacity</option>
                          <option>International Buyer / Importer</option>
                          <option>Indian Manufacturer / Supplier</option>
                          <option>Financial Institution / Bank</option>
                          <option>Freight / Logistics Partner</option>
                          <option>Investment / Trade Body</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div className="cf-field"><label className="cf-label mono">Product Category</label><input className="cf-input" placeholder="e.g. Spices, Textiles…" value={form.product} onChange={setF("product")} /></div>
                    </div>
                    <div className="cf-field"><label className="cf-label mono">Enquiry Detail</label><textarea className="cf-input" rows={4} placeholder="Describe your requirement, volume, timeline, or enquiry purpose…" value={form.message} onChange={setF("message")} /></div>
                  </div>
                  <div className="cform-footer">
                    <button className="btn-primary" onClick={()=>setSent(true)}>Submit Enquiry</button>
                    <span className="cform-note mono">Treated as confidential · 24hr response SLA</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="wm-top" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.2rem",letterSpacing:"4px",color:"var(--white)"}}>
              Nexus<span style={{color:"var(--gold2)"}}>Trade</span>
            </div>
            <div className="footer-tagline mono">Merchant Export Company · India · IEC Registered</div>
          </div>
          <nav>
            <div className="footer-links-col">
              {[["#positioning","Who We Are"],["#legitimacy","Legitimacy"],["#supplier","Supplier Model"],["#capability","Capabilities"],["#trade","Trade Readiness"],["#contact","Contact"]].map(([h,l]) => (
                <a key={l} href={h}>{l}</a>
              ))}
            </div>
          </nav>
          <div className="footer-right">
            <div className="footer-copy mono">© 2025 NexusTrade. All Rights Reserved.</div>
            <div className="footer-compliance mono">
              IEC Registered · DGFT, India<br/>
              GST Compliant · MCA Incorporated<br/>
              ECGC Eligible · FEMA Compliant
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}