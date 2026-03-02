import { useState, useEffect, useRef } from "react";

// ─── DESIGN DIRECTION ───────────────────────────────────────────────────────
// Aesthetic: Institutional Precision × Commodity Trading Floor
// Fonts: DM Serif Display (authority) + IBM Plex Sans (data clarity) + IBM Plex Mono (terminal)
// Palette: Deep navy + warm cream + burnished amber — feels like a premier trading house
// Key idea: Every section reads like a verified trade document. Trust through structure.
// ─────────────────────────────────────────────────────────────────────────────

const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --navy:    #08101F;
  --navy2:   #0D1929;
  --navy3:   #112035;
  --ink:     #1A2B42;
  --amber:   #C8922A;
  --amber2:  #E8B04A;
  --amber3:  #8A6018;
  --cream:   #F0E8D8;
  --cream2:  #D8CCBC;
  --cream3:  #B0A890;
  --mist:    rgba(240,232,216,0.06);
  --mist2:   rgba(240,232,216,0.03);
  --line:    rgba(200,146,42,0.2);
  --line2:   rgba(240,232,216,0.08);
  --serif:   'DM Serif Display', Georgia, serif;
  --sans:    'IBM Plex Sans', sans-serif;
  --mono:    'IBM Plex Mono', monospace;
}

html { scroll-behavior: smooth; }
body { background: var(--navy); color: var(--cream); font-family: var(--sans); overflow-x: hidden; font-size: 15px; }

/* ─── SCROLLBAR ─── */
::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-track { background: var(--navy); }
::-webkit-scrollbar-thumb { background: var(--amber3); }

/* ─── UTILITY ─── */
.mono { font-family: var(--mono); }
.serif { font-family: var(--serif); }
.amber { color: var(--amber); }
.cream3 { color: var(--cream3); }

/* ─── NAVIGATION ─── */
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 200;
  height: 64px;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 5vw;
  background: rgba(8,16,31,0.92);
  backdrop-filter: blur(24px) saturate(1.4);
  border-bottom: 1px solid var(--line);
}
.nav-brand {
  display: flex; align-items: center; gap: 14px;
  text-decoration: none;
}
.nav-emblem {
  width: 32px; height: 32px; position: relative; flex-shrink: 0;
}
.nav-emblem svg { width: 100%; height: 100%; }
.nav-name {
  font-family: var(--mono);
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--cream);
}
.nav-name em { color: var(--amber); font-style: normal; }
.nav-links {
  display: flex; gap: 2.5rem; list-style: none;
}
.nav-links a {
  font-size: 0.72rem; font-weight: 500;
  letter-spacing: 0.15em; text-transform: uppercase;
  color: var(--cream3); text-decoration: none;
  transition: color 0.25s;
}
.nav-links a:hover { color: var(--amber2); }
.nav-enquire {
  font-family: var(--mono);
  font-size: 0.68rem; font-weight: 500;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--navy);
  background: var(--amber);
  padding: 8px 22px;
  text-decoration: none;
  transition: background 0.25s, transform 0.2s;
  clip-path: polygon(10px 0,100% 0,calc(100% - 10px) 100%,0 100%);
}
.nav-enquire:hover { background: var(--amber2); transform: translateY(-1px); }

/* ─── HERO ─── */
.hero {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: 0 5vw;
  padding-top: 64px;
  position: relative;
  overflow: hidden;
  gap: 4rem;
}

.hero-bg {
  position: absolute; inset: 0; pointer-events: none;
  background:
    radial-gradient(ellipse 70% 60% at 80% 50%, rgba(200,146,42,0.07) 0%, transparent 70%),
    radial-gradient(ellipse 50% 80% at 10% 80%, rgba(13,25,41,0.8) 0%, transparent 60%);
}

.hero-grid-lines {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(200,146,42,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(200,146,42,0.03) 1px, transparent 1px);
  background-size: 80px 80px;
}

.hero-left {
  position: relative; z-index: 1;
  animation: fadeSlideUp 1s ease both;
}
.hero-kicker {
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 2rem;
}
.kicker-line { width: 40px; height: 1px; background: var(--amber); }
.kicker-text {
  font-family: var(--mono); font-size: 0.65rem;
  letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--amber);
}
.hero-headline {
  font-family: var(--serif);
  font-size: clamp(3rem, 5.5vw, 5.5rem);
  line-height: 1.0;
  color: var(--cream);
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
}
.hero-headline .italic-line {
  font-style: italic;
  color: var(--amber2);
}
.hero-sub {
  font-size: 1rem; font-weight: 300;
  line-height: 1.9; color: var(--cream3);
  max-width: 480px; margin-bottom: 2.5rem;
}
.hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }

.btn-gold {
  font-family: var(--mono);
  font-size: 0.7rem; font-weight: 500;
  letter-spacing: 0.15em; text-transform: uppercase;
  color: var(--navy); background: var(--amber);
  padding: 13px 30px; border: none; cursor: pointer;
  text-decoration: none; display: inline-block;
  clip-path: polygon(10px 0,100% 0,calc(100% - 10px) 100%,0 100%);
  transition: background 0.25s, transform 0.2s;
}
.btn-gold:hover { background: var(--amber2); transform: translateY(-2px); }

.btn-outline {
  font-family: var(--mono);
  font-size: 0.7rem; font-weight: 500;
  letter-spacing: 0.15em; text-transform: uppercase;
  color: var(--cream3); background: transparent;
  padding: 12px 30px;
  border: 1px solid var(--line2);
  cursor: pointer; text-decoration: none; display: inline-block;
  clip-path: polygon(10px 0,100% 0,calc(100% - 10px) 100%,0 100%);
  transition: all 0.25s;
}
.btn-outline:hover { border-color: var(--cream3); color: var(--cream); transform: translateY(-2px); }

.hero-right {
  position: relative; z-index: 1;
  animation: fadeSlideUp 1s 0.2s ease both;
}

/* Trade terminal card */
.terminal-card {
  background: var(--navy2);
  border: 1px solid var(--line2);
  border-top: 2px solid var(--amber);
  padding: 0;
  position: relative;
  overflow: hidden;
}
.terminal-card::after {
  content: '';
  position: absolute; top: 0; right: 0;
  width: 60%; height: 60%;
  background: radial-gradient(ellipse at top right, rgba(200,146,42,0.04), transparent);
  pointer-events: none;
}
.terminal-header {
  padding: 14px 20px;
  border-bottom: 1px solid var(--line2);
  display: flex; align-items: center; justify-content: space-between;
}
.terminal-title {
  font-family: var(--mono); font-size: 0.65rem;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--amber);
}
.terminal-status {
  display: flex; align-items: center; gap: 6px;
  font-family: var(--mono); font-size: 0.6rem;
  color: #4ADE80; letter-spacing: 0.1em;
}
.status-dot {
  width: 5px; height: 5px; border-radius: 50%;
  background: #4ADE80;
  animation: blink 2s ease-in-out infinite;
}
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

.terminal-body { padding: 20px; }
.metric-row {
  display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
  margin-bottom: 12px;
}
.metric {
  background: var(--mist2);
  border: 1px solid var(--line2);
  padding: 14px 16px;
}
.metric-label {
  font-family: var(--mono); font-size: 0.58rem;
  letter-spacing: 0.16em; text-transform: uppercase;
  color: var(--cream3); margin-bottom: 4px;
}
.metric-val {
  font-family: var(--mono); font-size: 1.4rem;
  color: var(--amber2); font-weight: 500;
}
.metric-sub {
  font-size: 0.68rem; color: var(--cream3);
  margin-top: 2px;
}

.cert-row {
  display: flex; gap: 8px; flex-wrap: wrap;
  margin-top: 8px;
}
.cert-badge {
  font-family: var(--mono); font-size: 0.58rem;
  letter-spacing: 0.12em; text-transform: uppercase;
  padding: 5px 10px;
  border: 1px solid var(--line);
  color: var(--amber);
  background: rgba(200,146,42,0.06);
}

.mandate-block {
  background: rgba(200,146,42,0.05);
  border-left: 2px solid var(--amber);
  padding: 14px 16px;
  margin-top: 12px;
}
.mandate-label {
  font-family: var(--mono); font-size: 0.58rem;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--amber3); margin-bottom: 4px;
}
.mandate-text {
  font-size: 0.82rem; color: var(--cream3); line-height: 1.7;
}

/* ─── TICKER ─── */
.ticker {
  height: 38px; overflow: hidden;
  background: var(--navy3);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  display: flex; align-items: center;
}
.ticker-tag {
  flex-shrink: 0; height: 100%;
  display: flex; align-items: center;
  padding: 0 18px 0 20px;
  background: var(--amber);
  clip-path: polygon(0 0,calc(100% - 10px) 0,100% 50%,calc(100% - 10px) 100%,0 100%);
  font-family: var(--mono); font-size: 0.6rem;
  letter-spacing: 0.16em; text-transform: uppercase;
  color: var(--navy); font-weight: 500;
}
.ticker-scroll {
  display: flex; align-items: center;
  animation: ticker 32s linear infinite;
  white-space: nowrap;
}
.ticker-item {
  font-family: var(--mono); font-size: 0.65rem;
  color: var(--cream3); padding: 0 2rem;
  letter-spacing: 0.06em;
}
.ticker-item b { color: var(--amber); font-weight: 500; margin-right: 6px; }
.ticker-divider { color: var(--amber3); }
@keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

/* ─── SECTION BASE ─── */
.section { padding: 100px 5vw; }
.section-inner { max-width: 1200px; margin: 0 auto; }

.eyebrow {
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 1.2rem;
}
.eyebrow-line { width: 32px; height: 1px; background: var(--amber); flex-shrink: 0; }
.eyebrow-text {
  font-family: var(--mono); font-size: 0.62rem;
  letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--amber);
}
.section-heading {
  font-family: var(--serif);
  font-size: clamp(2.2rem, 4vw, 3.8rem);
  line-height: 1.05; color: var(--cream);
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
}
.section-heading em { font-style: italic; color: var(--amber2); }
.section-body {
  font-size: 0.95rem; color: var(--cream3);
  line-height: 1.9; max-width: 560px;
}

/* ─── MODEL SECTION ─── */
.model-section { background: var(--navy2); position: relative; }
.model-section::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--amber3), transparent);
}
.model-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 6rem; align-items: center;
}

.model-text .section-body { margin-bottom: 2.5rem; }

.pillars { display: flex; flex-direction: column; gap: 1px; }
.pillar {
  display: flex; align-items: flex-start; gap: 1.2rem;
  padding: 18px 20px;
  background: var(--mist2);
  border: 1px solid var(--line2);
  border-left: 2px solid transparent;
  transition: all 0.3s;
  cursor: default;
}
.pillar:hover {
  border-left-color: var(--amber);
  background: rgba(200,146,42,0.04);
  transform: translateX(3px);
}
.pillar-glyph {
  width: 36px; height: 36px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.1rem;
  background: var(--mist);
  border: 1px solid var(--line2);
  clip-path: polygon(6px 0,100% 0,calc(100% - 6px) 100%,0 100%);
}
.pillar-title { font-size: 0.9rem; font-weight: 600; color: var(--cream); margin-bottom: 3px; }
.pillar-desc { font-size: 0.8rem; color: var(--cream3); line-height: 1.65; }

/* Model visual — document aesthetic */
.model-doc {
  background: var(--navy);
  border: 1px solid var(--line2);
  padding: 0; position: relative;
  overflow: hidden;
}
.model-doc::before {
  content: '';
  position: absolute; top: 0; right: 0;
  width: 50%; height: 100%;
  background: linear-gradient(135deg, transparent, rgba(200,146,42,0.03));
  pointer-events: none;
}
.doc-header {
  padding: 20px 24px 16px;
  border-bottom: 1px solid var(--line2);
  display: flex; align-items: flex-start; justify-content: space-between;
}
.doc-seal {
  width: 48px; height: 48px;
  border: 1.5px solid var(--amber);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.4rem;
  color: var(--amber);
  flex-shrink: 0;
  background: rgba(200,146,42,0.05);
}
.doc-id {
  font-family: var(--mono); font-size: 0.6rem;
  color: var(--cream3); letter-spacing: 0.12em;
  margin-bottom: 4px;
}
.doc-title {
  font-family: var(--serif); font-size: 1.1rem;
  color: var(--cream); line-height: 1.2;
}
.doc-body { padding: 20px 24px; display: flex; flex-direction: column; gap: 14px; }
.doc-field {
  display: grid; grid-template-columns: 140px 1fr;
  gap: 8px; align-items: start;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--line2);
}
.doc-field:last-child { border: none; padding-bottom: 0; }
.doc-field-key {
  font-family: var(--mono); font-size: 0.6rem;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--amber3); padding-top: 2px;
}
.doc-field-val { font-size: 0.82rem; color: var(--cream); line-height: 1.6; }
.doc-tags { display: flex; flex-wrap: wrap; gap: 5px; }
.doc-tag {
  font-family: var(--mono); font-size: 0.56rem;
  padding: 3px 8px; letter-spacing: 0.1em;
  border: 1px solid var(--line2); color: var(--cream3);
  text-transform: uppercase;
}
.doc-footer {
  margin: 0 24px 20px;
  padding: 12px 16px;
  background: rgba(200,146,42,0.06);
  border: 1px solid var(--line);
  display: flex; align-items: center; gap: 10px;
}
.doc-footer-icon { font-size: 1.1rem; }
.doc-footer-text {
  font-family: var(--mono); font-size: 0.62rem;
  color: var(--amber); letter-spacing: 0.08em; line-height: 1.5;
}

/* ─── CAPABILITIES ─── */
.cap-section { background: var(--navy); }
.cap-header { max-width: 600px; margin-bottom: 4rem; }
.cap-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--line2);
}
.cap-card {
  background: var(--navy);
  padding: 2.5rem 2rem;
  position: relative; overflow: hidden;
  transition: background 0.35s;
  cursor: default;
}
.cap-card:hover { background: var(--navy2); }
.cap-card:hover .cap-num { color: var(--amber); }
.cap-card::before {
  content: '';
  position: absolute; bottom: 0; left: 0; right: 0;
  height: 1px;
  background: var(--amber);
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.35s;
}
.cap-card:hover::before { transform: scaleX(1); }

.cap-num {
  font-family: var(--mono); font-size: 0.58rem;
  letter-spacing: 0.18em; color: var(--amber3);
  margin-bottom: 1.5rem;
  transition: color 0.3s;
}
.cap-icon {
  font-size: 1.6rem; margin-bottom: 1.2rem;
  display: block;
  width: 46px; height: 46px;
  display: flex; align-items: center; justify-content: center;
  background: var(--mist2);
  border: 1px solid var(--line2);
}
.cap-title {
  font-size: 1rem; font-weight: 600;
  color: var(--cream); margin-bottom: 0.7rem;
  letter-spacing: 0.02em;
}
.cap-desc { font-size: 0.82rem; color: var(--cream3); line-height: 1.8; }
.cap-watermark {
  position: absolute; right: 16px; bottom: 8px;
  font-family: var(--serif); font-size: 5rem;
  color: rgba(240,232,216,0.02); pointer-events: none;
  user-select: none; line-height: 1;
}

/* ─── PRODUCTS ─── */
.products-section { background: var(--navy2); position: relative; }
.products-section::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--amber3), transparent);
}
.products-header {
  display: flex; justify-content: space-between; align-items: flex-end;
  margin-bottom: 3rem; gap: 2rem; flex-wrap: wrap;
}
.products-note {
  font-family: var(--mono); font-size: 0.65rem;
  color: var(--cream3); letter-spacing: 0.1em;
  max-width: 340px; line-height: 1.7;
  border-left: 2px solid var(--amber3);
  padding-left: 14px;
}

.products-table {
  width: 100%; border-collapse: collapse;
}
.pt-head {
  border-bottom: 1px solid var(--line);
}
.pt-head th {
  font-family: var(--mono); font-size: 0.6rem;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--amber3); font-weight: 500;
  padding: 10px 16px; text-align: left;
}
.pt-row {
  border-bottom: 1px solid var(--line2);
  transition: background 0.25s; cursor: default;
}
.pt-row:hover { background: var(--mist2); }
.pt-row td {
  padding: 16px 16px; vertical-align: middle;
}
.pt-cat {
  font-family: var(--mono); font-size: 0.58rem;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--amber3);
}
.pt-name {
  font-size: 0.9rem; font-weight: 500; color: var(--cream);
}
.pt-emoji { font-size: 1.3rem; }
.pt-markets { display: flex; gap: 5px; flex-wrap: wrap; }
.pt-market {
  font-family: var(--mono); font-size: 0.57rem;
  padding: 2px 7px; letter-spacing: 0.1em;
  border: 1px solid rgba(0,200,200,0.2);
  color: #7DD8DC;
}
.pt-spec {
  font-family: var(--mono); font-size: 0.65rem;
  color: var(--cream3);
}

/* ─── PROCESS ─── */
.process-section { background: var(--navy); }
.process-grid {
  display: grid; grid-template-columns: 1fr 2fr;
  gap: 5rem; align-items: start;
}
.process-left { position: sticky; top: 100px; }
.process-steps { display: flex; flex-direction: column; gap: 0; }

.process-step {
  display: grid; grid-template-columns: 56px 1fr;
  gap: 1.5rem;
  padding: 24px 0;
  border-bottom: 1px solid var(--line2);
  position: relative;
  cursor: default;
  transition: all 0.3s;
}
.process-step:last-child { border-bottom: none; }
.process-step:hover { padding-left: 8px; }

.step-num {
  width: 48px; height: 48px;
  border: 1px solid var(--line);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--mono); font-size: 0.75rem;
  color: var(--amber); font-weight: 500;
  flex-shrink: 0;
  transition: all 0.3s;
  clip-path: polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%);
}
.process-step:hover .step-num {
  background: rgba(200,146,42,0.1);
  border-color: var(--amber);
}
.step-phase {
  font-family: var(--mono); font-size: 0.57rem;
  letter-spacing: 0.16em; text-transform: uppercase;
  color: var(--amber3); margin-bottom: 4px;
}
.step-title { font-size: 1rem; font-weight: 600; color: var(--cream); margin-bottom: 5px; }
.step-desc { font-size: 0.82rem; color: var(--cream3); line-height: 1.75; }

/* ─── AUDIENCE ─── */
.audience-section { background: var(--navy2); }
.audience-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 2px; background: var(--line2);
  margin-top: 3.5rem;
}
.audience-card {
  background: var(--navy2);
  padding: 2.5rem 2rem;
  position: relative; overflow: hidden;
  transition: background 0.3s;
}
.audience-card:hover { background: var(--navy3); }
.audience-card::after {
  content: '';
  position: absolute; top: 0; left: 0; right: 0;
  height: 2px; background: var(--amber);
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.35s;
}
.audience-card:hover::after { transform: scaleX(1); }

.aud-icon {
  font-size: 2rem; margin-bottom: 1.5rem; display: block;
  width: 54px; height: 54px;
  display: flex; align-items: center; justify-content: center;
  background: var(--mist2);
  border: 1px solid var(--line2);
  clip-path: polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%);
}
.aud-title {
  font-family: var(--serif); font-size: 1.5rem;
  color: var(--cream); margin-bottom: 0.6rem;
}
.aud-desc { font-size: 0.82rem; color: var(--cream3); line-height: 1.75; margin-bottom: 1.5rem; }
.aud-list { list-style: none; display: flex; flex-direction: column; gap: 7px; }
.aud-list li {
  font-size: 0.78rem; color: var(--cream3);
  padding-left: 16px; position: relative; line-height: 1.5;
}
.aud-list li::before {
  content: '→'; position: absolute; left: 0;
  color: var(--amber); font-size: 0.65rem;
}

/* ─── TRUST / COMPLIANCE ─── */
.trust-section { background: var(--navy); }
.trust-inner {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 5rem; align-items: center;
}
.trust-right { display: flex; flex-direction: column; gap: 1px; }
.trust-row {
  display: flex; align-items: flex-start; gap: 1.2rem;
  padding: 20px;
  background: var(--mist2);
  border: 1px solid var(--line2);
  transition: all 0.3s;
}
.trust-row:hover { background: rgba(200,146,42,0.04); border-color: var(--line); }
.trust-icon-box {
  width: 40px; height: 40px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.2rem;
  background: rgba(200,146,42,0.08);
  border: 1px solid var(--line);
}
.trust-label {
  font-size: 0.88rem; font-weight: 500;
  color: var(--cream); margin-bottom: 3px;
}
.trust-sub { font-size: 0.78rem; color: var(--cream3); line-height: 1.5; }
.compliance-chart {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 12px; margin-top: 3rem;
}
.comp-box {
  padding: 20px;
  border: 1px solid var(--line2);
  background: var(--mist2);
  clip-path: polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%);
}
.comp-val {
  font-family: var(--mono); font-size: 1.8rem;
  color: var(--amber2); margin-bottom: 4px;
}
.comp-label {
  font-family: var(--mono); font-size: 0.58rem;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--cream3);
}

/* ─── CONTACT ─── */
.contact-section {
  background: var(--navy2);
  position: relative; overflow: hidden;
}
.contact-section::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--amber3), transparent);
}
.contact-inner {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 5rem; align-items: start;
}
.contact-heading {
  font-family: var(--serif); font-size: 2.5rem;
  color: var(--cream); margin-bottom: 1rem; line-height: 1.1;
}
.contact-heading em { color: var(--amber2); font-style: italic; }
.contact-desc { font-size: 0.88rem; color: var(--cream3); line-height: 1.85; margin-bottom: 2rem; }
.contact-details { display: flex; flex-direction: column; gap: 2px; }
.contact-row {
  display: flex; align-items: flex-start; gap: 14px;
  padding: 14px 16px;
  background: var(--mist2);
  border: 1px solid var(--line2);
  transition: border-color 0.25s;
}
.contact-row:hover { border-color: var(--line); }
.contact-icon { font-size: 1rem; flex-shrink: 0; margin-top: 2px; }
.contact-key {
  font-family: var(--mono); font-size: 0.58rem;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--amber3); margin-bottom: 2px;
}
.contact-val { font-size: 0.85rem; color: var(--cream); }

.form-wrap { display: flex; flex-direction: column; gap: 14px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.field { display: flex; flex-direction: column; gap: 6px; }
.field-label {
  font-family: var(--mono); font-size: 0.57rem;
  letter-spacing: 0.16em; text-transform: uppercase;
  color: var(--cream3);
}
.field-input {
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--line2);
  color: var(--cream);
  font-family: var(--sans); font-size: 0.85rem;
  padding: 10px 14px; outline: none;
  transition: border-color 0.25s;
  clip-path: polygon(6px 0,100% 0,calc(100% - 6px) 100%,0 100%);
}
.field-input:focus { border-color: var(--amber); }
.field-input::placeholder { color: var(--cream3); opacity: 0.5; font-size: 0.82rem; }
select.field-input option { background: var(--navy2); }

.success-box {
  padding: 3rem 2rem;
  border: 1px solid rgba(200,146,42,0.3);
  background: rgba(200,146,42,0.04);
  text-align: center;
}
.success-icon { font-size: 2.5rem; margin-bottom: 1rem; }
.success-title {
  font-family: var(--serif); font-size: 2rem;
  color: var(--amber2); margin-bottom: 0.5rem;
}
.success-sub { font-size: 0.85rem; color: var(--cream3); line-height: 1.7; }

/* ─── FOOTER ─── */
.footer {
  background: var(--navy);
  border-top: 1px solid var(--line);
  padding: 2.5rem 5vw;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center; gap: 2rem;
}
.footer-brand .nav-name { font-size: 0.85rem; }
.footer-copy {
  font-family: var(--mono); font-size: 0.6rem;
  letter-spacing: 0.12em; color: var(--cream3);
  text-align: center; line-height: 1.7;
}
.footer-links {
  display: flex; gap: 2rem; list-style: none;
  justify-content: flex-end;
}
.footer-links a {
  font-family: var(--mono); font-size: 0.6rem;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--cream3); text-decoration: none;
  transition: color 0.25s;
}
.footer-links a:hover { color: var(--amber); }

/* ─── ANIMATIONS ─── */
@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ─── RESPONSIVE ─── */
@media (max-width: 960px) {
  .nav { padding: 0 1.5rem; }
  .nav-links { display: none; }
  .section { padding: 64px 5vw; }
  .hero { grid-template-columns: 1fr; padding: 100px 5vw 60px; gap: 3rem; }
  .model-grid, .contact-inner, .trust-inner, .process-grid { grid-template-columns: 1fr; gap: 2.5rem; }
  .cap-grid { grid-template-columns: 1fr; }
  .audience-grid { grid-template-columns: 1fr; }
  .compliance-chart { grid-template-columns: 1fr 1fr; }
  .form-row { grid-template-columns: 1fr; }
  .footer { grid-template-columns: 1fr; text-align: center; }
  .footer-links { justify-content: center; }
  .process-left { position: static; }
  .products-table thead { display: none; }
}
`;

// ─── DATA ─────────────────────────────────────────────────────────────────────

const TICKER = [
  { k: "IEC Registered", v: "DGFT · India" },
  { k: "Active Markets", v: "12+ Countries" },
  { k: "Incoterms", v: "FOB · CIF · CFR · EXW · DAP" },
  { k: "Trade Finance", v: "LC · DP · DA · Advance" },
  { k: "Documentation", v: "COO · Phyto · FSSAI · BIS" },
  { k: "Compliance", v: "IEC · DGFT · GST · MCA" },
  { k: "Verticals", v: "Agriculture · Textiles · Spices · Chemicals" },
];

const CAPS = [
  { n:"01", icon:"🔗", t:"Supplier Network Access", d:"Direct relationships with verified Indian manufacturers across agriculture, textiles, chemicals, spices, and handicrafts — no intermediaries, no opacity." },
  { n:"02", icon:"📋", t:"Export Documentation", d:"COO, phytosanitary certificates, packing lists, commercial invoices, FSSAI, BIS, and full destination-country compliance — every shipment is document-complete." },
  { n:"03", icon:"🌐", t:"Market Intelligence", d:"Buyer profiling, tariff analysis, demand forecasting, and competitive positioning across GCC, Southeast Asia, Europe, and Africa." },
  { n:"04", icon:"🚢", t:"Logistics Coordination", d:"Freight forwarding, customs clearance, container optimisation, multimodal routing, and real-time tracking from factory gate to final port." },
  { n:"05", icon:"💰", t:"Trade Finance Support", d:"LC management, export credit facilitation, ECGC coordination, and structured payment terms designed for both buyers and supplier-partners." },
  { n:"06", icon:"✅", t:"Quality Assurance", d:"Pre-shipment inspections, third-party lab coordination, sample validation, and compliance sign-off before every consignment moves." },
];

const PRODUCTS = [
  { emoji:"🌾", cat:"Agriculture", name:"Basmati & Non-Basmati Rice", spec:"Grade A, FSSAI Certified", markets:["UAE","KSA","UK","EU"] },
  { emoji:"🌶️", cat:"Spices", name:"Indian Spice Blends & Singles", spec:"AGMARK, FSSAI", markets:["GCC","USA","Australia"] },
  { emoji:"🧵", cat:"Textiles", name:"Cotton Yarn & Woven Fabrics", spec:"BIS, OEKO-TEX", markets:["Bangladesh","Vietnam","Turkey"] },
  { emoji:"🪔", cat:"Handicrafts", name:"Artisan Decor & Gifting", spec:"Custom Certs Available", markets:["EU","UK","USA"] },
  { emoji:"🧪", cat:"Chemicals", name:"Industrial & Agro Chemicals", spec:"Reach, IS Certified", markets:["Africa","SEA","LATAM"] },
  { emoji:"🫒", cat:"Food Processing", name:"Processed Foods & Condiments", spec:"FSSAI, Halal", markets:["GCC","USA","EU"] },
  { emoji:"💎", cat:"Gems & Jewellery", name:"Polished Diamonds & Jewellery", spec:"KP, BIS Hallmark", markets:["UAE","HK","Belgium"] },
  { emoji:"🌿", cat:"Pharma / Herbal", name:"Herbal Extracts & Ayurveda", spec:"WHO-GMP, US FDA", markets:["EU","USA","Japan"] },
];

const PROCESS = [
  { n:"01", phase:"Inquiry", t:"Requirement Assessment", d:"A structured intake of buyer specifications, volume requirements, quality standards, certifications, and target pricing — establishing the full trade brief." },
  { n:"02", phase:"Sourcing", t:"Supplier Selection", d:"From our verified manufacturer database, we identify and shortlist producers who meet technical, capacity, and compliance requirements." },
  { n:"03", phase:"Compliance", t:"Documentation & Certification", d:"Our compliance desk prepares all export documents, obtains required certificates, and ensures destination-country regulatory readiness before production begins." },
  { n:"04", phase:"Logistics", t:"Shipping & Freight Management", d:"We coordinate freight forwarding, book cargo, manage Indian port customs, and track the consignment to final destination." },
  { n:"05", phase:"Settlement", t:"Payment & Post-Shipment", d:"LC negotiations, bank discounting, RODTEP / incentive claims, and full payment settlement for all parties — clean and documented." },
];

const AUDIENCES = [
  { icon:"🌍", t:"International Buyers", d:"A reliable single-window into India's best manufacturing — with end-to-end execution, so you receive shipments, not problems.", pts:["Verified source manufacturers","Competitive FOB/CIF pricing","Custom documentation packages","Flexible payment terms","Dedicated account management"] },
  { icon:"🏭", t:"Indian Suppliers", d:"We are your export arm — connecting your production capacity to global demand without the overhead of running an export division.", pts:["Buyer introduction & credibility","Documentation handled in-house","Advance payment arrangements","No direct export overhead","Structured long-term relationships"] },
  { icon:"🏦", t:"Financial Institutions", d:"A compliant, incorporated merchant export entity with structured documentation practices and clean trade records.", pts:["IEC & DGFT registered entity","GST-compliant operations","LC & export finance ready","Auditable trade records","ECGC coverage eligible"] },
];

const TRUST = [
  { icon:"🏛️", t:"Incorporated Entity", sub:"Registered under Ministry of Corporate Affairs, India" },
  { icon:"📜", t:"IEC Certificate", sub:"Importer Exporter Code · DGFT, Government of India" },
  { icon:"⚖️", t:"GST & Tax Compliant", sub:"Fully registered for GST and income tax obligations" },
  { icon:"🌐", t:"Multi-Country Track Record", sub:"Active trade relationships across 12+ destination countries" },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function App() {
  const [form, setForm] = useState({ name:"", company:"", email:"", country:"", type:"", message:"" });
  const [sent, setSent] = useState(false);

  const tickerDouble = [...TICKER, ...TICKER];

  return (
    <>
      <style>{css}</style>

      {/* NAV */}
      <nav className="nav">
        <a href="#hero" className="nav-brand">
          <div className="nav-emblem">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="16,2 30,10 30,22 16,30 2,22 2,10" stroke="#C8922A" strokeWidth="1.2" fill="none"/>
              <polygon points="16,8 24,13 24,19 16,24 8,19 8,13" stroke="#C8922A" strokeWidth="0.7" fill="rgba(200,146,42,0.08)"/>
              <polygon points="16,13 20,15.5 20,17.5 16,20 12,17.5 12,15.5" fill="#C8922A"/>
            </svg>
          </div>
          <span className="nav-name">NEXUS<em>TRADE</em></span>
        </a>
        <ul className="nav-links">
          {["Model","Capabilities","Products","Process","Contact"].map(l=>(
            <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
          ))}
        </ul>
        <a href="#contact" className="nav-enquire">Enquire Now</a>
      </nav>

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-bg" />
        <div className="hero-grid-lines" />

        <div className="hero-left">
          <div className="hero-kicker">
            <div className="kicker-line" />
            <span className="kicker-text">Merchant Export Company · India · IEC Registered</span>
          </div>
          <h1 className="hero-headline">
            India's<br />
            <span className="italic-line">Export Gateway</span><br />
            to the World
          </h1>
          <p className="hero-sub">
            We are not a manufacturer. We are a strategic trading partner — sourcing premium Indian products, navigating global compliance, and delivering seamless export execution for buyers and suppliers worldwide.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn-gold">Start a Trade Conversation</a>
            <a href="#capabilities" className="btn-outline">Our Capabilities</a>
          </div>
        </div>

        <div className="hero-right">
          <div className="terminal-card">
            <div className="terminal-header">
              <span className="terminal-title">Trade Profile · NexusTrade</span>
              <span className="terminal-status"><span className="status-dot"/>Active</span>
            </div>
            <div className="terminal-body">
              <div className="metric-row">
                <div className="metric">
                  <div className="metric-label">Export Markets</div>
                  <div className="metric-val">12+</div>
                  <div className="metric-sub">Countries served</div>
                </div>
                <div className="metric">
                  <div className="metric-label">Supplier Network</div>
                  <div className="metric-val">500+</div>
                  <div className="metric-sub">Verified manufacturers</div>
                </div>
              </div>
              <div className="metric-row">
                <div className="metric">
                  <div className="metric-label">Compliance Rate</div>
                  <div className="metric-val">100%</div>
                  <div className="metric-sub">Zero documentation rejections</div>
                </div>
                <div className="metric">
                  <div className="metric-label">Quote Turnaround</div>
                  <div className="metric-val">48hr</div>
                  <div className="metric-sub">From enquiry to quote</div>
                </div>
              </div>
              <div className="cert-row">
                {["IEC Certified","DGFT Registered","GST Compliant","MCA Incorporated"].map(c=>(
                  <span className="cert-badge" key={c}>{c}</span>
                ))}
              </div>
              <div className="mandate-block">
                <div className="mandate-label">Mandate</div>
                <div className="mandate-text">Merchant Export Company — we source, document, and ship. Not a manufacturer; a trade execution partner.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-tag">TRADE DATA</div>
        <div style={{overflow:"hidden",flex:1}}>
          <div className="ticker-scroll">
            {tickerDouble.map((item,i)=>(
              <span className="ticker-item" key={i}>
                <b>◆ {item.k}:</b> {item.v} <span className="ticker-divider">  ·  </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* BUSINESS MODEL */}
      <section className="section model-section" id="model">
        <div className="section-inner">
          <div className="model-grid">
            <div className="model-text">
              <div className="eyebrow"><div className="eyebrow-line"/><span className="eyebrow-text">Business Model</span></div>
              <h2 className="section-heading">Merchant<br /><em>Export</em> Model</h2>
              <p className="section-body">
                As a dedicated merchant exporter, we sit at the intersection of Indian manufacturing excellence and global demand. We take ownership of the trade — from source identification to final delivery — so our partners never navigate complexity alone.
              </p>
              <div className="pillars" style={{marginTop:"2rem"}}>
                {[
                  {icon:"🔍", t:"Source, Don't Manufacture", d:"We curate from India's best factories — no production bias, pure market and quality focus."},
                  {icon:"⚡", t:"Speed to Execution", d:"From enquiry to shipment-ready documentation in weeks, not months."},
                  {icon:"🤝", t:"Risk Shared, Reward Split", d:"Buyers get reliability. Suppliers get global reach. We build lasting partnerships."},
                ].map(p=>(
                  <div className="pillar" key={p.t}>
                    <div className="pillar-glyph">{p.icon}</div>
                    <div>
                      <div className="pillar-title">{p.t}</div>
                      <div className="pillar-desc">{p.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Document visual */}
            <div className="model-doc">
              <div className="doc-header">
                <div>
                  <div className="doc-id">DOC REF · NXT/MEX/2025/001</div>
                  <div className="doc-title">Company Profile<br />& Trade Mandate</div>
                </div>
                <div className="doc-seal">🏛️</div>
              </div>
              <div className="doc-body">
                {[
                  {k:"Entity Type", v:"Merchant Export Company (Non-Manufacturer)"},
                  {k:"Registration", v:"Ministry of Corporate Affairs, India"},
                  {k:"IEC Code", v:"DGFT Registered — Active"},
                  {k:"Tax Status", v:"GST Compliant · PAN Registered"},
                  {k:"Trade Scope", v:"Sourcing, documentation, freight, finance, QA"},
                  {k:"Target Markets", v:<span className="doc-tags">{["GCC","EU","SE Asia","Africa","Americas"].map(m=><span className="doc-tag" key={m}>{m}</span>)}</span>},
                  {k:"Product Lines", v:<span className="doc-tags">{["Agriculture","Spices","Textiles","Chemicals","Gems"].map(m=><span className="doc-tag" key={m}>{m}</span>)}</span>},
                ].map(f=>(
                  <div className="doc-field" key={f.k}>
                    <span className="doc-field-key">{f.k}</span>
                    <span className="doc-field-val">{f.v}</span>
                  </div>
                ))}
              </div>
              <div className="doc-footer">
                <span className="doc-footer-icon">✓</span>
                <span className="doc-footer-text">All credentials available for verification upon request.<br/>Compliance documentation furnished for every trade.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="section cap-section" id="capabilities">
        <div className="section-inner">
          <div className="cap-header">
            <div className="eyebrow"><div className="eyebrow-line"/><span className="eyebrow-text">Core Capabilities</span></div>
            <h2 className="section-heading">Full-Spectrum<br /><em>Export Execution</em></h2>
            <p className="section-body">From supplier selection to payment settlement — we manage every touchpoint of the export journey.</p>
          </div>
          <div className="cap-grid">
            {CAPS.map(c=>(
              <div className="cap-card" key={c.n}>
                <div className="cap-num">{c.n} //</div>
                <div className="cap-icon">{c.icon}</div>
                <div className="cap-title">{c.t}</div>
                <div className="cap-desc">{c.d}</div>
                <div className="cap-watermark">{c.n}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="section products-section" id="products">
        <div className="section-inner">
          <div className="products-header">
            <div>
              <div className="eyebrow"><div className="eyebrow-line"/><span className="eyebrow-text">Product Portfolio</span></div>
              <h2 className="section-heading" style={{marginBottom:0}}>What We<br /><em>Source & Export</em></h2>
            </div>
            <div className="products-note">
              We source across key Indian export categories. Not limited to the below — if it is made in India, we can export it. Custom sourcing available on request.
            </div>
          </div>
          <table className="products-table">
            <thead className="pt-head">
              <tr>
                <th style={{width:40}}></th>
                <th>Category</th>
                <th>Product Line</th>
                <th>Certifications</th>
                <th>Key Markets</th>
              </tr>
            </thead>
            <tbody>
              {PRODUCTS.map(p=>(
                <tr className="pt-row" key={p.name}>
                  <td className="pt-emoji">{p.emoji}</td>
                  <td><span className="pt-cat">{p.cat}</span></td>
                  <td><span className="pt-name">{p.name}</span></td>
                  <td><span className="pt-spec mono" style={{fontSize:"0.72rem",color:"var(--cream3)"}}>{p.spec}</span></td>
                  <td><div className="pt-markets">{p.markets.map(m=><span className="pt-market" key={m}>{m}</span>)}</div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section process-section" id="process">
        <div className="section-inner">
          <div className="process-grid">
            <div className="process-left">
              <div className="eyebrow"><div className="eyebrow-line"/><span className="eyebrow-text">How We Work</span></div>
              <h2 className="section-heading">The Export<br /><em>Process</em></h2>
              <p className="section-body" style={{marginBottom:"2rem"}}>
                A structured, transparent trade process from enquiry to final delivery — with zero ambiguity at any stage.
              </p>
              <div className="compliance-chart">
                {[["100%","Doc Accuracy"],["48hr","Quote SLA"],["5 Step","Process"],["12+","Markets"]].map(([v,l])=>(
                  <div className="comp-box" key={l}>
                    <div className="comp-val">{v}</div>
                    <div className="comp-label">{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="process-steps">
              {PROCESS.map(p=>(
                <div className="process-step" key={p.n}>
                  <div className="step-num">{p.n}</div>
                  <div>
                    <div className="step-phase">Phase · {p.phase}</div>
                    <div className="step-title">{p.t}</div>
                    <div className="step-desc">{p.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AUDIENCE */}
      <section className="section audience-section" id="audience">
        <div className="section-inner">
          <div style={{textAlign:"center",maxWidth:560,margin:"0 auto"}}>
            <div className="eyebrow" style={{justifyContent:"center"}}><div className="eyebrow-line"/><span className="eyebrow-text">Who We Serve</span></div>
            <h2 className="section-heading">Built For<br /><em>Every Partner</em></h2>
          </div>
          <div className="audience-grid">
            {AUDIENCES.map(a=>(
              <div className="audience-card" key={a.t}>
                <div className="aud-icon">{a.icon}</div>
                <div className="aud-title">{a.t}</div>
                <div className="aud-desc">{a.d}</div>
                <ul className="aud-list">
                  {a.pts.map(pt=><li key={pt}>{pt}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="section trust-section" id="compliance">
        <div className="section-inner">
          <div className="trust-inner">
            <div>
              <div className="eyebrow"><div className="eyebrow-line"/><span className="eyebrow-text">Compliance & Credibility</span></div>
              <h2 className="section-heading">Legitimacy<br />You Can <em>Verify</em></h2>
              <p className="section-body">
                Every claim on this page is backed by registered documentation. We operate as a fully compliant, incorporated merchant export entity — ready for due diligence from buyers, suppliers, and financial institutions alike.
              </p>
              <div style={{marginTop:"2rem",padding:"20px",background:"rgba(200,146,42,0.05)",borderLeft:"2px solid var(--amber)",borderTop:"1px solid var(--line)"}}>
                <div className="eyebrow-text" style={{marginBottom:"8px"}}>Our Assurance</div>
                <p style={{fontSize:"0.82rem",color:"var(--cream3)",lineHeight:1.8}}>
                  All compliance documents — IEC certificate, GST registration, MCA incorporation, and trade references — are available upon request during the onboarding process.
                </p>
              </div>
            </div>
            <div className="trust-right">
              {TRUST.map(t=>(
                <div className="trust-row" key={t.t}>
                  <div className="trust-icon-box">{t.icon}</div>
                  <div>
                    <div className="trust-label">{t.t}</div>
                    <div className="trust-sub">{t.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section contact-section" id="contact">
        <div className="section-inner">
          <div className="contact-inner">
            <div>
              <div className="eyebrow"><div className="eyebrow-line"/><span className="eyebrow-text">Get In Touch</span></div>
              <h2 className="contact-heading">Start a<br /><em>Trade Conversation</em></h2>
              <p className="contact-desc">
                Whether you are an international buyer seeking reliable Indian supply, a domestic manufacturer looking for an export partner, or a financial institution evaluating trade relationships — we are ready to engage.
              </p>
              <div className="contact-details">
                {[
                  {icon:"📍",k:"Headquarters",v:"Mumbai, Maharashtra, India"},
                  {icon:"📧",k:"Email",v:"trade@nexustrade.in"},
                  {icon:"📞",k:"Direct Line",v:"+91 98XXXXXXXX"},
                  {icon:"⏱️",k:"Response Time",v:"Within 24 Business Hours"},
                ].map(d=>(
                  <div className="contact-row" key={d.k}>
                    <span className="contact-icon">{d.icon}</span>
                    <div>
                      <div className="contact-key">{d.k}</div>
                      <div className="contact-val">{d.v}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              {sent ? (
                <div className="success-box">
                  <div className="success-icon">✓</div>
                  <div className="success-title">Enquiry Received</div>
                  <p className="success-sub">Our trade team will review your enquiry and respond within 24 business hours.</p>
                </div>
              ) : (
                <div className="form-wrap">
                  <div className="form-row">
                    <div className="field">
                      <label className="field-label">Full Name *</label>
                      <input className="field-input" placeholder="John Smith" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
                    </div>
                    <div className="field">
                      <label className="field-label">Company *</label>
                      <input className="field-input" placeholder="Company Name" required value={form.company} onChange={e=>setForm({...form,company:e.target.value})} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="field">
                      <label className="field-label">Email *</label>
                      <input className="field-input" type="email" placeholder="you@company.com" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
                    </div>
                    <div className="field">
                      <label className="field-label">Country</label>
                      <input className="field-input" placeholder="Country" value={form.country} onChange={e=>setForm({...form,country:e.target.value})} />
                    </div>
                  </div>
                  <div className="field">
                    <label className="field-label">I Am A *</label>
                    <select className="field-input" required value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
                      <option value="">Select your role</option>
                      <option>International Buyer</option>
                      <option>Indian Supplier / Manufacturer</option>
                      <option>Financial Institution</option>
                      <option>Logistics / Freight Partner</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="field">
                    <label className="field-label">Trade Enquiry</label>
                    <textarea className="field-input" rows={4} placeholder="Describe your requirement or interest..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})} />
                  </div>
                  <button className="btn-gold" style={{alignSelf:"flex-start"}} onClick={()=>setSent(true)}>Submit Enquiry →</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-brand">
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
              <polygon points="16,2 30,10 30,22 16,30 2,22 2,10" stroke="#C8922A" strokeWidth="1.2" fill="none"/>
              <polygon points="16,13 20,15.5 20,17.5 16,20 12,17.5 12,15.5" fill="#C8922A"/>
            </svg>
            <span className="nav-name">NEXUS<em>TRADE</em></span>
          </div>
          <div className="footer-copy">Merchant Export Company · IEC Registered · India</div>
        </div>
        <div className="footer-copy">© 2025 NexusTrade<br />All Rights Reserved</div>
        <ul className="footer-links">
          {["Model","Capabilities","Products","Process","Contact"].map(l=>(
            <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
          ))}
        </ul>
      </footer>
    </>
  );
}