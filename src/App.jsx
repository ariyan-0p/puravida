import { useState, useEffect, useRef, useCallback } from "react";

const G = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Lato:wght@100;300;400&family=Inter:wght@300;400;500;600;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; font-size: 16px; }

body {
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  color: #2B2B2B;
  background: #F2ECE5;
  overflow-x: hidden;
}

:root {
  --mist:   #F2ECE5;
  --mist2:  #E2D8CE;
  --mist3:  #D5C8BB;
  --cream:  #FAFAF8;
  --sage:   #DDE5DF;
  --sage2:  #C8D5CB;
  --clay:   #C9A8A8;
  --clay2:  #A07878;
  --ink:    #2B2B2B;
  --ink2:   #404040;
  --ink3:   #606060;
  --ink4:   #787878;
  --white:  #FAFAF8;
}

/* ── GRAIN ── */
.grain {
  position: fixed; inset: -50%;
  width: 200%; height: 200%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
  pointer-events: none; z-index: 100; opacity: 0.2;
  animation: grain 10s steps(10) infinite;
}
@keyframes grain {
  0%,100%{transform:translate(0,0)} 10%{transform:translate(-3%,-4%)}
  30%{transform:translate(3%,2%)} 50%{transform:translate(-2%,5%)}
  70%{transform:translate(4%,-3%)} 90%{transform:translate(-4%,1%)}
}

/* ── PROGRESS ── */
.pv-progress {
  position: fixed; top: 0; left: 0; z-index: 500;
  height: 1px;
  background: linear-gradient(to right, var(--clay), var(--clay2));
  transition: width 0.1s linear;
}

/* ── PRELOADER ── */
.pre-wrap {
  position: fixed; inset: 0; background: var(--cream); z-index: 10000;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  transition: opacity 1.3s ease, visibility 1.3s ease;
}
.pre-wrap.done { opacity: 0; visibility: hidden; }
.pre-logo {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300; font-size: 1rem;
  letter-spacing: 0.4em; text-transform: uppercase; color: var(--ink);
  opacity: 0; animation: pFade 0.8s ease 0.4s forwards;
}
.pre-line {
  width: 1px; height: 0;
  background: linear-gradient(to bottom, var(--clay), var(--clay2));
  margin-top: 28px; animation: pLine 1.2s ease 1s forwards;
}
.pre-sub {
  margin-top: 18px; font-size: 0.58rem;
  letter-spacing: 0.28em; text-transform: uppercase;
  /* READABILITY: was ink4 #9a9a9a — now ink3 for preloader */
  color: var(--ink3);
  opacity: 0; animation: pFade 0.6s ease 1.8s forwards;
}
@keyframes pFade { to { opacity: 1; } }
@keyframes pLine { to { height: 80px; } }

/* ── MOBILE MENU ── */
.mobile-menu {
  position: fixed; inset: 0; background: var(--cream); z-index: 300;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 44px;
  opacity: 0; visibility: hidden;
  transition: opacity 0.5s ease, visibility 0.5s ease;
}
.mobile-menu::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(to right, transparent, var(--clay), transparent);
}
.mobile-menu.open { opacity: 1; visibility: visible; }
.mobile-menu a {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.6rem; font-weight: 300; font-style: italic;
  color: var(--ink); text-decoration: none; letter-spacing: 0.04em;
  transition: color 0.3s;
}
.mobile-menu a:hover { color: var(--clay2); }
.mobile-close-btn {
  position: absolute; top: 28px; right: 32px;
  font-size: 1.2rem; color: var(--ink3);
  background: none; border: none; cursor: pointer;
  font-family: 'Cormorant Garamond', serif; transition: color 0.3s;
}
.mobile-close-btn:hover { color: var(--clay2); }

/* ── NAV ── */
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 200;
  display: flex; align-items: center; justify-content: space-between;
  padding: 40px 72px;
  transition: padding 0.6s cubic-bezier(.16,1,.3,1), background 0.6s ease, box-shadow 0.6s ease;
}
.nav.stuck {
  padding: 18px 72px;
  background: rgba(242,236,229,0.97);
  backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
  box-shadow: 0 1px 0 rgba(201,168,168,0.22);
}
.nav-logo {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300; font-size: 0.82rem;
  letter-spacing: 0.32em; text-transform: uppercase;
  color: var(--ink); text-decoration: none;
}
.nav-center {
  display: flex; gap: 52px; list-style: none;
  position: absolute; left: 50%; transform: translateX(-50%);
}
.nav-center a {
  font-family: 'Inter', sans-serif;
  font-size: 0.58rem; font-weight: 400;
  letter-spacing: 0.22em; text-transform: uppercase;
  /* READABILITY: nav links now ink3 #606060 not ink4 */
  color: var(--ink3); text-decoration: none; transition: color 0.3s;
  position: relative;
}
.nav-center a::after {
  content: ''; position: absolute; bottom: -4px; left: 0; right: 0;
  height: 1px; background: var(--clay);
  transform: scaleX(0); transition: transform 0.3s;
}
.nav-center a:hover { color: var(--clay2); }
.nav-center a:hover::after { transform: scaleX(1); }
.nav-cta {
  font-family: 'Inter', sans-serif;
  font-size: 0.58rem; font-weight: 700;
  letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--ink); text-decoration: none;
  border: 1px solid var(--clay); padding: 10px 20px;
  transition: background 0.35s, color 0.35s;
}
.nav-cta:hover { background: var(--clay); color: var(--white); }
.nav-burger {
  display: none; flex-direction: column; gap: 5px;
  background: none; border: none; cursor: pointer; padding: 4px;
}
.nav-burger span { display: block; width: 22px; height: 1px; background: var(--ink); }

/* ── HERO ── */
.hero {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto 1fr auto;
  padding: 150px 72px 80px;
  background: var(--mist);
  position: relative; overflow: hidden;
}
.hero::after {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(to right, transparent 5%, var(--clay) 40%, var(--clay2) 65%, transparent 95%);
  opacity: 0.35;
}
.hero-bg-word {
  position: absolute; bottom: -40px; left: 50%;
  transform: translateX(-50%);
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(8rem, 18vw, 22rem);
  font-weight: 300; font-style: italic;
  color: transparent;
  -webkit-text-stroke: 1px rgba(201,168,168,0.07);
  letter-spacing: -0.04em; white-space: nowrap;
  pointer-events: none; user-select: none; z-index: 0;
}
.hero-vline {
  position: absolute; left: calc(72px + 66.66%);
  top: 140px; bottom: 0; width: 1px;
  background: linear-gradient(to bottom, transparent, var(--clay) 25%, var(--clay) 75%, transparent);
  opacity: 0.12; z-index: 1;
}
.hero-tag {
  grid-column: 1; grid-row: 1; z-index: 2;
  display: flex; align-items: center; gap: 10px;
  font-family: 'Inter', sans-serif;
  font-size: 0.58rem; font-weight: 400;
  letter-spacing: 0.3em; text-transform: uppercase; color: var(--clay2);
  animation: fadeUp 0.8s ease 2.2s both;
  padding-bottom: 24px;
}
.hero-tag-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--clay); flex-shrink: 0; }
.hero-date {
  grid-column: 2; grid-row: 1; z-index: 2;
  font-family: 'Lato', sans-serif; font-weight: 300;
  font-size: 0.6rem; letter-spacing: 0.26em; text-transform: uppercase;
  /* READABILITY: was font-weight:100 + ink4 #9a9a9a — now weight 300 + ink3 #606060 */
  color: var(--ink3);
  animation: fadeUp 0.8s ease 2.3s both;
  padding-bottom: 24px;
  display: flex; align-items: flex-start; justify-content: flex-end;
}
.hero-hl {
  grid-column: 1/3; grid-row: 2; z-index: 1;
  display: flex; flex-direction: column; justify-content: center;
  padding-right: 60px; padding-top: 32px; padding-bottom: 52px;
}
.hero-eyebrow {
  font-family: 'Lato', sans-serif; font-weight: 300;
  font-size: 0.68rem; letter-spacing: 0.26em; text-transform: uppercase;
  /* READABILITY: was ink4 — now ink3 */
  color: var(--ink3); margin-bottom: 28px;
  animation: fadeUp 0.8s ease 2.4s both;
  display: flex; align-items: center; gap: 14px;
}
.hero-eyebrow::before {
  content: ''; width: 28px; height: 1px;
  background: var(--clay); opacity: 0.7; flex-shrink: 0;
}
.hero-h1 {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300; line-height: 0.9;
  font-size: clamp(4rem, 8.5vw, 8rem);
  color: var(--ink); letter-spacing: -0.02em; overflow: hidden;
}
.hero-h1-line { display: block; overflow: hidden; }
.hero-h1-inner { display: block; animation: revealUp 1s cubic-bezier(.16,1,.3,1) both; }
.line1 { animation-delay: 2.5s; }
.line2 { animation-delay: 2.65s; font-style: italic; color: var(--clay2); }
.line3 { animation-delay: 2.8s; }

.hero-img-col {
  grid-column: 3; grid-row: 2; z-index: 1;
  margin-left: 32px; position: relative; align-self: center;
  animation: fadeUp 1.2s ease 2.7s both;
}
.hero-img-frame {
  width: 100%; aspect-ratio: 3/4;
  position: relative; overflow: hidden;
  box-shadow: 0 32px 80px rgba(43,43,43,0.16), 0 8px 24px rgba(201,168,168,0.1);
}
.hero-img-scene {
  position: absolute; inset: 0;
  background: url('/assets/hero-bhutan.jpg') center center / cover no-repeat,
    linear-gradient(158deg, #4a6050 0%, #2e3d32 40%, #141e16 100%);
}
.hero-img-grad {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(13,21,16,0.55) 0%, transparent 55%);
}
.hero-img-corner {
  position: absolute; top: 0; right: 0; z-index: 3;
  width: 40px; height: 40px;
  border-top: 1px solid rgba(201,168,168,0.45);
  border-right: 1px solid rgba(201,168,168,0.45);
}
.hero-img-corner-bl {
  position: absolute; bottom: 0; left: 0; z-index: 3;
  width: 40px; height: 40px;
  border-bottom: 1px solid rgba(201,168,168,0.45);
  border-left: 1px solid rgba(201,168,168,0.45);
}
.hero-img-caption {
  position: absolute; bottom: 24px; left: 24px; z-index: 2;
  font-family: 'Cormorant Garamond', serif; font-style: italic;
  font-size: 0.75rem;
  /* READABILITY: was 0.42 — now 0.7 */
  color: rgba(255,255,255,0.7); letter-spacing: 0.08em;
}
.hero-badge {
  position: absolute; bottom: -20px; right: -20px;
  width: 88px; height: 88px; border-radius: 50%;
  background: var(--cream); border: 1px solid rgba(201,168,168,0.3);
  z-index: 4; display: flex; flex-direction: column;
  align-items: center; justify-content: center; text-align: center;
  box-shadow: 0 4px 20px rgba(43,43,43,0.1);
}
.hero-badge p {
  font-family: 'Inter', sans-serif;
  font-size: 0.5rem; font-weight: 600;
  letter-spacing: 0.14em; text-transform: uppercase;
  /* READABILITY: was clay2 on cream — darkened to clay2 with weight 600 */
  color: var(--clay2); line-height: 1.7;
}
.hero-bottom {
  grid-column: 1/3; grid-row: 3; z-index: 1;
  display: flex; align-items: flex-end; justify-content: space-between;
  gap: 48px; padding-right: 60px;
  animation: fadeUp 0.8s ease 3s both;
}
.hero-sub {
  font-family: 'Lato', sans-serif;
  /* READABILITY: was ink2 — now ink for hero body text */
  font-size: 0.92rem; font-weight: 300; line-height: 2.1; color: var(--ink2); max-width: 420px;
}
.hero-actions { display: flex; flex-direction: column; gap: 16px; flex-shrink: 0; }

@keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
@keyframes revealUp { from { transform: translateY(110%); } to { transform: translateY(0); } }

/* ── BUTTONS ── */
.btn-p {
  display: inline-flex; align-items: center; gap: 16px;
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem; font-weight: 700;
  letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--white); text-decoration: none; padding: 15px 28px;
  position: relative; overflow: hidden; white-space: nowrap; transition: gap 0.3s;
}
.btn-p-bg { position: absolute; inset: 0; background: var(--ink); z-index: 0; }
.btn-p-bg2 {
  position: absolute; inset: 0; background: var(--clay2);
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.45s cubic-bezier(.16,1,.3,1); z-index: 0;
}
.btn-p:hover .btn-p-bg2 { transform: scaleX(1); }
.btn-p:hover { gap: 24px; }
.btn-p span { position: relative; z-index: 1; }
.btn-g {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: 'Lato', sans-serif;
  font-size: 0.6rem; font-weight: 300;
  letter-spacing: 0.18em; text-transform: uppercase;
  /* READABILITY: was ink3 — now ink2 */
  color: var(--ink2); text-decoration: none; transition: color 0.3s, gap 0.3s;
}
.btn-g:hover { color: var(--clay2); gap: 18px; }

/* ── FADE-UP ── */
.fu { opacity: 0; transform: translateY(28px); transition: opacity 0.9s cubic-bezier(.16,1,.3,1), transform 0.9s cubic-bezier(.16,1,.3,1); }
.fu.in { opacity: 1; transform: none; }

/* ── MARQUEE ── */
.marquee-strip {
  background: var(--white);
  border-top: 1px solid rgba(201,168,168,0.2);
  border-bottom: 1px solid rgba(201,168,168,0.2);
  padding: 16px 0; overflow: hidden; display: flex;
}
.marquee-track { display: flex; gap: 40px; white-space: nowrap; animation: marquee 28s linear infinite; }
.marquee-track span {
  font-family: 'Cormorant Garamond', serif; font-style: italic;
  /* READABILITY: was ink3 — now ink2 */
  font-size: 0.95rem; color: var(--ink2); letter-spacing: 0.06em; flex-shrink: 0;
}
@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

/* ── MANIFESTO ── */
.manifesto {
  background: var(--white); padding: 120px 72px;
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 80px; align-items: center;
  position: relative; overflow: hidden;
  border-bottom: 1px solid var(--mist2);
}
.manifesto::before {
  content: '"'; position: absolute; left: 36px; top: -50px;
  font-family: 'Cormorant Garamond', serif; font-size: 20rem; line-height: 1;
  color: rgba(201,168,168,0.07); pointer-events: none; user-select: none;
}
.manifesto-quote {
  font-family: 'Cormorant Garamond', serif; font-style: italic;
  font-size: clamp(1.6rem, 3vw, 2.4rem); font-weight: 300;
  line-height: 1.6; color: var(--ink); position: relative; z-index: 1;
}
.manifesto-attr {
  display: flex; align-items: center; gap: 12px; margin-top: 32px;
  font-family: 'Inter', sans-serif; font-weight: 400;
  font-size: 0.56rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--clay2);
}
.manifesto-attr::before { content: ''; width: 20px; height: 1px; background: var(--clay); opacity: 0.7; }
.manifesto-stats { display: flex; flex-direction: column; position: relative; z-index: 1; }
.m-stat { padding: 32px 0; border-top: 1px solid var(--mist2); }
.m-stat:last-child { border-bottom: 1px solid var(--mist2); }
.m-num {
  font-family: 'Cormorant Garamond', serif; font-size: 3.6rem; font-weight: 300;
  color: var(--ink); line-height: 1; margin-bottom: 8px;
}
/* READABILITY: m-label was ink3 — now ink2 */
.m-label { font-family: 'Lato', sans-serif; font-size: 0.74rem; font-weight: 300; letter-spacing: 0.1em; color: var(--ink2); }

/* ── PHILOSOPHY ── */
.philosophy {
  background: var(--mist); padding: 140px 72px;
  display: grid; grid-template-columns: 180px 1fr 1fr;
  gap: 72px; align-items: start; position: relative;
}
.philosophy::before {
  content: ''; position: absolute; top: 72px; left: 72px; right: 72px; height: 1px;
  background: linear-gradient(to right, transparent, rgba(201,168,168,0.2), transparent);
}
.phil-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.58rem; font-weight: 400; letter-spacing: 0.34em;
  text-transform: uppercase; color: var(--clay2);
  writing-mode: vertical-rl; transform: rotate(180deg); height: fit-content;
}
.phil-h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.2rem, 3.8vw, 3.6rem); font-weight: 300; line-height: 1.15;
  color: var(--ink); margin-bottom: 40px;
}
/* READABILITY: phil-body was ink2 — confirmed ink2 #404040 */
.phil-body { font-family: 'Lato', sans-serif; font-size: 0.9rem; line-height: 2.1; color: var(--ink2); margin-bottom: 14px; max-width: 360px; }
.phil-sig {
  margin-top: 44px; font-family: 'Cormorant Garamond', serif; font-style: italic;
  font-size: 1.05rem; color: var(--clay2);
  display: flex; align-items: center; gap: 12px;
}
.phil-sig::before { content: ''; width: 20px; height: 1px; background: var(--clay); opacity: 0.7; }
.phil-pillars { display: flex; flex-direction: column; }
.phil-pillar {
  padding: 28px 0; border-top: 1px solid var(--mist2);
  display: grid; grid-template-columns: 48px 1fr; gap: 16px;
  transition: padding-left 0.4s ease;
}
.phil-pillar:last-child { border-bottom: 1px solid var(--mist2); }
.phil-pillar:hover { padding-left: 8px; }
.phil-num { font-family: 'Cormorant Garamond', serif; font-size: 0.85rem; font-weight: 300; color: var(--clay); padding-top: 2px; }
.phil-title { font-family: 'Cormorant Garamond', serif; font-size: 1.05rem; font-weight: 400; color: var(--ink); margin-bottom: 7px; }
/* READABILITY: phil-text was ink3 #7a7a7a — now ink3 #606060 */
.phil-text { font-family: 'Lato', sans-serif; font-size: 0.82rem; line-height: 1.9; color: var(--ink3); }

/* ── JOURNEYS ── */
.journeys-wrap { background: var(--cream); }
.journeys-header {
  padding: 100px 72px 64px;
  display: flex; align-items: flex-end; justify-content: space-between;
  position: relative;
}
.journeys-header::after {
  content: ''; position: absolute; bottom: 0; left: 72px; right: 72px; height: 1px;
  background: linear-gradient(to right, transparent, rgba(201,168,168,0.22), transparent);
}
.journeys-h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.4rem, 4vw, 4.2rem); font-weight: 300; line-height: 1.05; color: var(--ink);
}
.journeys-h2 em { font-style: italic; color: var(--clay2); }
/* READABILITY: journeys-meta was ink3 — now ink2 */
.journeys-meta { font-family: 'Lato', sans-serif; text-align: right; font-size: 0.78rem; font-weight: 300; line-height: 1.9; color: var(--ink2); }
.journeys-track {
  display: flex; padding: 72px 72px; gap: 16px;
  overflow-x: auto; scrollbar-width: none; -ms-overflow-style: none;
  cursor: grab; user-select: none;
}
.journeys-track:active { cursor: grabbing; }
.journeys-track::-webkit-scrollbar { display: none; }
.j-card {
  flex: 0 0 400px; display: flex; flex-direction: column;
  background: var(--white);
  border: 1px solid rgba(201,168,168,0.16);
  box-shadow: 0 4px 28px rgba(43,43,43,0.05), 0 1px 4px rgba(201,168,168,0.07);
  transition: box-shadow 0.5s ease, transform 0.5s ease, border-color 0.4s;
  position: relative; overflow: hidden;
}
.j-card:hover {
  box-shadow: 0 16px 60px rgba(43,43,43,0.1), 0 4px 16px rgba(201,168,168,0.1);
  transform: translateY(-4px); border-color: rgba(201,168,168,0.32);
}
.j-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(to right, var(--clay), var(--clay2));
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.5s ease; z-index: 2;
}
.j-card:hover::before { transform: scaleX(1); }
.j-card-img { height: 300px; position: relative; overflow: hidden; flex-shrink: 0; }
.j-card-img-inner { position: absolute; inset: 0; transition: transform 0.9s cubic-bezier(.16,1,.3,1); }
.j-card:hover .j-card-img-inner { transform: scale(1.06); }
.j-card-img-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.08) 50%, transparent 100%); z-index: 1; }
/* READABILITY: loc caption was 0.5 opacity — now 0.75 */
.j-card-loc { position: absolute; bottom: 18px; left: 18px; z-index: 2; font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 0.75rem; color: rgba(255,255,255,0.75); letter-spacing: 0.08em; }
.j-body { padding: 32px 28px 36px; display: flex; flex-direction: column; flex: 1; }
.j-tag { font-family: 'Inter', sans-serif; font-size: 0.56rem; font-weight: 400; letter-spacing: 0.3em; text-transform: uppercase; color: var(--clay2); margin-bottom: 14px; display: flex; align-items: center; gap: 10px; }
.j-tag::before { content: ''; width: 14px; height: 1px; background: var(--clay); opacity: 0.7; }
.j-dest { font-family: 'Cormorant Garamond', serif; font-size: 2.6rem; font-weight: 400; line-height: 1; color: var(--ink); margin-bottom: 5px; }
.j-sub { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 0.95rem; color: var(--clay2); margin-bottom: 20px; }
/* READABILITY: j-desc was ink3 — now ink2 */
.j-desc { font-family: 'Lato', sans-serif; font-size: 0.82rem; line-height: 1.95; color: var(--ink2); flex: 1; margin-bottom: 24px; }
.j-details { display: flex; flex-direction: column; gap: 8px; margin-bottom: 28px; padding-top: 20px; border-top: 1px solid var(--mist2); }
.j-detail { display: flex; gap: 16px; align-items: baseline; font-size: 0.7rem; color: var(--ink2); }
/* READABILITY: detail label was ink4 — now ink3 */
.j-detail-label { font-family: 'Inter', sans-serif; font-size: 0.54rem; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink3); min-width: 64px; }
.j-cta { display: inline-flex; align-items: center; gap: 10px; font-family: 'Inter', sans-serif; font-size: 0.58rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink); text-decoration: none; border-bottom: 1px solid var(--clay); padding-bottom: 4px; width: fit-content; transition: gap 0.3s, color 0.3s; }
.j-cta:hover { gap: 18px; color: var(--clay2); }
.journeys-hint { padding: 0 72px 72px; display: flex; align-items: center; gap: 20px; }
.hint-line { flex: 1; height: 1px; background: linear-gradient(to right, rgba(201,168,168,0.16), transparent); }
/* READABILITY: hint-text was ink4 — now ink3 */
.hint-text { font-family: 'Inter', sans-serif; font-size: 0.56rem; letter-spacing: 0.24em; text-transform: uppercase; color: var(--ink3); }
.hint-arrow { color: var(--clay); opacity: 0.65; font-size: 0.75rem; animation: hintSlide 1.8s ease-in-out infinite; }
@keyframes hintSlide { 0%,100%{transform:translateX(0)} 50%{transform:translateX(10px)} }

.d-bhutan    { background: url('/assets/journey-bhutan.jpg')   center/cover no-repeat, linear-gradient(158deg,#3d5040 0%,#212e23 45%,#111711 100%); }
.d-japan     { background: url('/assets/journey-japan.jpg')    center/cover no-repeat, linear-gradient(158deg,#b8a0a0 0%,#887070 45%,#503838 100%); }
.d-jordan    { background: url('/assets/journey-jordan.jpg')   center/cover no-repeat, linear-gradient(158deg,#c09860 0%,#906838 45%,#503818 100%); }
.d-sl        { background: url('/assets/journey-srilanka.jpg') center/cover no-repeat, linear-gradient(158deg,#5a9068 0%,#3c6848 45%,#1c3824 100%); }

/* ── HARSHA ── */
.harsha {
  background: var(--mist); padding: 140px 72px;
  display: grid; grid-template-columns: 1fr 1fr 1fr;
  gap: 64px; align-items: center;
  border-top: 1px solid var(--mist2);
}
.harsha-img-col { position: relative; }
.harsha-frame {
  width: 100%; aspect-ratio: 2/3; position: relative; overflow: hidden;
  box-shadow: 0 24px 72px rgba(43,43,43,0.12), 0 4px 16px rgba(201,168,168,0.08);
}
.harsha-img-inner {
  position: absolute; inset: 0;
  background: url('/assets/harsha-portrait.jpg') center 20% / cover no-repeat,
    linear-gradient(150deg,#c0a8a8 0%,#9a8080 35%,#7a5858 65%,#503838 100%);
}
.harsha-img-inner::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, rgba(43,43,43,0.5) 0%, transparent 55%); }
.harsha-corner-tr { position: absolute; top: -8px; right: -8px; width: 44px; height: 44px; border-top: 1px solid rgba(201,168,168,0.45); border-right: 1px solid rgba(201,168,168,0.45); z-index: 3; }
.harsha-corner-bl { position: absolute; bottom: -8px; left: -8px; width: 44px; height: 44px; border-bottom: 1px solid rgba(201,168,168,0.45); border-left: 1px solid rgba(201,168,168,0.45); z-index: 3; }
.harsha-caption { position: absolute; bottom: 0; left: 0; right: 0; padding: 28px; z-index: 2; }
.harsha-caption h3 { font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; color: var(--white); line-height: 1; }
/* READABILITY: harsha caption role was 0.45 — now 0.72 */
.harsha-caption span { font-family: 'Lato', sans-serif; font-size: 0.56rem; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(255,255,255,0.72); }
.harsha-float {
  position: absolute; top: 40px; right: -28px;
  background: var(--white); border: 1px solid rgba(201,168,168,0.22);
  padding: 20px 24px; max-width: 188px; z-index: 3;
  box-shadow: 0 8px 40px rgba(43,43,43,0.08);
}
.harsha-float::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(to right, var(--clay), var(--clay2));
}
.harsha-float-q { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 0.86rem; line-height: 1.65; color: var(--ink); }
.harsha-text { grid-column: 2/4; }
.harsha-eyebrow { font-family: 'Inter', sans-serif; font-size: 0.58rem; font-weight: 400; letter-spacing: 0.32em; text-transform: uppercase; color: var(--clay2); margin-bottom: 40px; display: flex; align-items: center; gap: 16px; }
.harsha-eyebrow::before { content: ''; width: 24px; height: 1px; background: var(--clay); opacity: 0.7; }
.harsha-h2 { font-family: 'Cormorant Garamond', serif; font-size: clamp(2rem, 3.2vw, 3.2rem); font-weight: 300; line-height: 1.22; color: var(--ink); margin-bottom: 40px; }
/* READABILITY: harsha-body was ink2 — confirmed #404040 */
.harsha-body { font-family: 'Lato', sans-serif; font-size: 0.9rem; line-height: 2.1; color: var(--ink2); margin-bottom: 14px; max-width: 500px; }
.harsha-link { margin-top: 44px; display: inline-flex; align-items: center; gap: 12px; font-family: 'Inter', sans-serif; font-size: 0.58rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink); text-decoration: none; border: 1px solid var(--clay); padding: 12px 22px; transition: gap 0.3s, background 0.35s, color 0.35s; }
.harsha-link:hover { background: var(--clay); color: var(--white); gap: 18px; }

/* ── IMMERSIVE ── */
.immersive {
  min-height: 70vh; position: relative; overflow: hidden;
  background: url('/assets/immersive-bhutan.jpg') center center / cover no-repeat,
    linear-gradient(148deg,#3d5040 0%,#1a261c 100%);
  display: flex; align-items: flex-end;
}
.immersive::before {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.25) 100%);
}
.immersive::after {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(to right, transparent, rgba(201,168,168,0.35), transparent);
}
.immersive-content { position: relative; z-index: 1; padding: 72px 72px; max-width: 620px; }
/* READABILITY: immersive label was 0.4 — now 0.65 */
.immersive-label { font-family: 'Inter', sans-serif; font-size: 0.56rem; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(255,255,255,0.65); margin-bottom: 28px; display: flex; align-items: center; gap: 12px; }
.immersive-label::before { content: ''; width: 20px; height: 1px; background: rgba(201,168,168,0.7); }
.immersive-q { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: clamp(1.8rem, 3.5vw, 3rem); font-weight: 300; line-height: 1.45; color: var(--white); }
/* READABILITY: attr was 0.8 opacity clay — now full clay */
.immersive-attr { display: block; margin-top: 32px; font-family: 'Lato', sans-serif; font-size: 0.58rem; letter-spacing: 0.24em; text-transform: uppercase; color: var(--clay); }

/* ── VOICES ── */
.voices { background: var(--white); padding: 140px 72px; }
.voices-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 72px; }
.voices-h2 { font-family: 'Cormorant Garamond', serif; font-size: clamp(2rem, 3.2vw, 3rem); font-weight: 300; line-height: 1.15; color: var(--ink); }
.voices-h2 em { font-style: italic; color: var(--clay2); }
/* READABILITY: voices-count was ink4 — now ink3 */
.voices-count { font-family: 'Inter', sans-serif; font-size: 0.58rem; letter-spacing: 0.24em; text-transform: uppercase; color: var(--ink3); }
.voices-grid { display: grid; grid-template-columns: 1.1fr 0.9fr 1fr; gap: 16px; align-items: start; }
.v-card {
  padding: 48px 40px; background: var(--mist);
  border: 1px solid transparent; position: relative; overflow: hidden;
  transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s;
}
.v-card::before { content: '"'; position: absolute; top: -8px; left: 16px; font-family: 'Cormorant Garamond', serif; font-size: 7rem; line-height: 1; color: rgba(201,168,168,0.12); pointer-events: none; }
.v-card::after { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(to right, var(--clay), var(--clay2)); transform: scaleX(0); transform-origin: left; transition: transform 0.4s ease; }
.v-card:hover::after { transform: scaleX(1); }
.v-card:nth-child(2) { background: var(--cream); margin-top: 48px; }
.v-card:nth-child(3) { background: var(--mist2); margin-top: 24px; }
.v-card:hover { transform: translateY(-4px); box-shadow: 0 12px 48px rgba(43,43,43,0.07); border-color: rgba(201,168,168,0.2); }
/* READABILITY: v-q confirmed as ink */
.v-q { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1.08rem; font-weight: 300; line-height: 1.8; color: var(--ink); margin-bottom: 28px; position: relative; z-index: 1; }
.v-sep { width: 20px; height: 1px; background: var(--clay); margin-bottom: 16px; }
.v-name { font-family: 'Lato', sans-serif; font-size: 0.68rem; font-weight: 400; letter-spacing: 0.1em; color: var(--ink); margin-bottom: 4px; }
.v-trip { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 0.8rem; color: var(--clay2); }

/* ── ENQUIRY ── */
.enquiry {
  background: var(--mist); padding: 160px 72px 140px;
  display: grid; grid-template-columns: 1fr 1fr; gap: 120px;
  align-items: center; position: relative; overflow: hidden;
  border-top: 1px solid var(--mist2);
}
.enquiry::after {
  content: ''; position: absolute; right: -80px; top: 50%; transform: translateY(-50%);
  width: 600px; height: 600px; border-radius: 50%;
  background: radial-gradient(circle, rgba(201,168,168,0.07) 0%, transparent 70%); pointer-events: none;
}
.enq-eyebrow { font-family: 'Inter', sans-serif; font-size: 0.58rem; font-weight: 400; letter-spacing: 0.32em; text-transform: uppercase; color: var(--clay2); margin-bottom: 36px; display: flex; align-items: center; gap: 14px; }
.enq-eyebrow::before { content: ''; width: 22px; height: 1px; background: var(--clay); opacity: 0.7; }
.enq-h2 { font-family: 'Cormorant Garamond', serif; font-size: clamp(2.4rem, 4.5vw, 4.2rem); font-weight: 300; line-height: 1.08; color: var(--ink); margin-bottom: 36px; }
.enq-h2 em { font-style: italic; color: var(--clay2); }
/* READABILITY: enq-body confirmed ink2 */
.enq-body { font-family: 'Lato', sans-serif; font-size: 0.88rem; line-height: 2.1; color: var(--ink2); max-width: 380px; }
.enq-options { display: flex; flex-direction: column; position: relative; z-index: 1; }
.enq-opt { display: flex; align-items: center; justify-content: space-between; padding: 26px 0; border-top: 1px solid var(--mist2); text-decoration: none; transition: padding-left 0.35s ease; }
.enq-opt:last-child { border-bottom: 1px solid var(--mist2); }
.enq-opt:hover { padding-left: 12px; }
/* READABILITY: enq-opt-label was ink4 — now ink3 */
.enq-opt-label { font-family: 'Inter', sans-serif; font-size: 0.56rem; font-weight: 400; letter-spacing: 0.26em; text-transform: uppercase; color: var(--ink3); margin-bottom: 6px; }
.enq-opt-val { font-family: 'Cormorant Garamond', serif; font-size: 1.05rem; color: var(--ink); letter-spacing: 0.04em; }
.enq-arrow { font-size: 0.95rem; color: var(--clay); transition: transform 0.3s; }
.enq-opt:hover .enq-arrow { transform: translateX(8px); }

/* ── FOOTER ── */
footer {
  background: var(--ink);
  padding: 100px 72px 52px;
  border-top: 2px solid var(--clay2);
}
.footer-top { display: grid; grid-template-columns: 1.8fr 1fr 1fr 1fr; gap: 48px; padding-bottom: 72px; border-bottom: 1px solid rgba(201,168,168,0.12); }
.f-brand { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: 1rem; letter-spacing: 0.24em; text-transform: uppercase; color: var(--mist); margin-bottom: 14px; }
/* READABILITY: f-tagline was 0.28 — now 0.5 */
.f-tagline { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 0.9rem; color: rgba(242,236,229,0.5); line-height: 1.85; margin-bottom: 28px; }
/* READABILITY: f-contact was 0.3 — now 0.55 */
.f-contact { font-family: 'Lato', sans-serif; font-size: 0.75rem; font-weight: 300; color: rgba(242,236,229,0.55); line-height: 2; }
/* READABILITY: f-contact a was 0.38 — now 0.7 */
.f-contact a { color: rgba(242,236,229,0.7); text-decoration: none; transition: color 0.3s; }
.f-contact a:hover { color: var(--clay); }
/* READABILITY: f-head was 0.7 opacity — now full clay, weight 700 */
.f-head { font-family: 'Inter', sans-serif; font-size: 0.54rem; font-weight: 700; letter-spacing: 0.3em; text-transform: uppercase; color: var(--clay); margin-bottom: 28px; }
.f-list { list-style: none; display: flex; flex-direction: column; gap: 12px; }
/* READABILITY: f-list a was 0.3 — now 0.55 */
.f-list a { font-family: 'Lato', sans-serif; font-size: 0.78rem; font-weight: 300; color: rgba(242,236,229,0.55); text-decoration: none; transition: color 0.3s; }
.f-list a:hover { color: var(--mist); }
.footer-bottom { padding-top: 32px; display: flex; justify-content: space-between; align-items: center; }
/* READABILITY: f-copy was 0.16 — now 0.35 */
.f-copy { font-family: 'Lato', sans-serif; font-size: 0.64rem; font-weight: 300; color: rgba(242,236,229,0.35); letter-spacing: 0.06em; }
/* READABILITY: f-ig was 0.28 — now 0.5 */
.f-ig { font-family: 'Inter', sans-serif; font-size: 0.6rem; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(242,236,229,0.5); text-decoration: none; transition: color 0.3s; }
.f-ig:hover { color: var(--clay); }

/* ── MOBILE ── */
@media (max-width: 1024px) {
  .harsha { grid-template-columns: 1fr 1fr; }
  .harsha-text { grid-column: 2; }
  .harsha-float, .harsha-corner-tr, .harsha-corner-bl { display: none; }
}
@media (max-width: 768px) {
  .nav { padding: 20px 28px; }
  .nav.stuck { padding: 16px 28px; }
  .nav-center, .nav-cta { display: none; }
  .nav-burger { display: flex; }

  .hero { grid-template-columns: 1fr; grid-template-rows: auto auto auto auto auto; padding: 100px 28px 60px; gap: 0; }
  .hero-vline, .hero-bg-word { display: none; }
  .hero-tag  { grid-column: 1; grid-row: 1; padding-bottom: 8px; }
  .hero-date { grid-column: 1; grid-row: 2; text-align: left; justify-content: flex-start; padding-bottom: 20px; }
  .hero-hl   { grid-column: 1; grid-row: 3; padding-right: 0; padding-top: 0; padding-bottom: 28px; }
  .hero-h1   { font-size: clamp(3.6rem, 16vw, 5.2rem); }
  .hero-img-col { grid-column: 1; grid-row: 4; margin-left: 0; padding-bottom: 28px; }
  .hero-img-frame { aspect-ratio: 4/3; }
  .hero-img-corner, .hero-img-corner-bl { display: none; }
  .hero-badge { bottom: -10px; right: -6px; width: 68px; height: 68px; }
  .hero-badge p { font-size: 0.44rem; }
  .hero-bottom { grid-column: 1; grid-row: 5; flex-direction: column; align-items: flex-start; padding-right: 0; gap: 22px; }

  .manifesto { padding: 80px 28px; grid-template-columns: 1fr; gap: 48px; }
  .philosophy { padding: 80px 28px; grid-template-columns: 1fr; gap: 40px; }
  .philosophy::before { left: 28px; right: 28px; }
  .phil-label { writing-mode: horizontal-tb; transform: none; }

  .journeys-header { padding: 64px 28px 40px; flex-direction: column; align-items: flex-start; gap: 16px; }
  .journeys-header::after { left: 28px; right: 28px; }
  .journeys-meta { text-align: left; }
  .journeys-track { padding: 40px 28px; gap: 12px; }
  .j-card { flex: 0 0 290px; }
  .journeys-hint { padding: 0 28px 48px; }

  .harsha { padding: 80px 28px; grid-template-columns: 1fr; border-top: none; }
  .harsha-text { grid-column: 1; }
  .harsha-frame { aspect-ratio: 3/2; }
  .harsha-float, .harsha-corner-tr, .harsha-corner-bl { display: none; }

  .immersive { min-height: 380px; }
  .immersive-content { padding: 48px 28px; }

  .voices { padding: 80px 28px; }
  .voices-header { flex-direction: column; align-items: flex-start; gap: 14px; margin-bottom: 48px; }
  .voices-grid { grid-template-columns: 1fr; gap: 12px; }
  .v-card:nth-child(2), .v-card:nth-child(3) { margin-top: 0; }

  .enquiry { padding: 100px 28px 80px; grid-template-columns: 1fr; gap: 56px; }

  footer { padding: 64px 28px 44px; }
  .footer-top { grid-template-columns: 1fr 1fr; gap: 36px; }
  .footer-bottom { flex-direction: column; gap: 14px; }
}
@media (max-width: 480px) {
  .j-card { flex: 0 0 260px; }
  .v-card { padding: 36px 28px; }
}
`;

function useFadeUp() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return [ref, vis];
}
function FU({ children, d = 0, className = "", style = {} }) {
  const [ref, vis] = useFadeUp();
  return (
    <div ref={ref} className={`fu${vis ? " in" : ""} ${className}`}
      style={{ transitionDelay: `${d * 0.14}s`, ...style }}>
      {children}
    </div>
  );
}

function Botanical({ color = "#C9A8A8", style = {} }) {
  return (
    <svg viewBox="0 0 80 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <line x1="40" y1="130" x2="40" y2="0" stroke={color} strokeWidth="0.7"/>
      <path d="M40 100 Q22 82 14 62" stroke={color} strokeWidth="0.7" fill="none"/>
      <path d="M40 80 Q58 65 64 46" stroke={color} strokeWidth="0.7" fill="none"/>
      <path d="M40 58 Q20 44 16 26" stroke={color} strokeWidth="0.7" fill="none"/>
      <path d="M40 38 Q56 26 58 10" stroke={color} strokeWidth="0.7" fill="none"/>
      <ellipse cx="14" cy="60" rx="6" ry="4" transform="rotate(-20 14 60)" stroke={color} strokeWidth="0.7" fill="none"/>
      <ellipse cx="64" cy="44" rx="6" ry="4" transform="rotate(20 64 44)" stroke={color} strokeWidth="0.7" fill="none"/>
      <ellipse cx="16" cy="24" rx="5" ry="3" transform="rotate(-30 16 24)" stroke={color} strokeWidth="0.7" fill="none"/>
      <ellipse cx="58" cy="8" rx="5" ry="3" transform="rotate(25 58 8)" stroke={color} strokeWidth="0.7" fill="none"/>
    </svg>
  );
}

const JOURNEYS = [
  { cls:"d-bhutan", tag:"Himalayan Kingdom", dest:"Bhutan",    sub:"Mountains & Monasteries", desc:"Walk with Kelly Dorji through dzongs and valleys. Meditation at dawn, hot stone baths at dusk. Eight days that ask nothing of you except presence.",  dur:"8 Days",  dates:"April 9–16, 2026", price:"From AED 12,100", loc:"Paro Valley, Bhutan" },
  { cls:"d-japan",  tag:"Island of Ritual",  dest:"Japan",     sub:"Stillness in Motion",    desc:"From Kyoto's moss temples to Hokkaido's frozen shores. A journey through silence, ceremony, and the Japanese art of noticing.",                   dur:"12 Days", dates:"March 2026",       price:"From AED 18,500", loc:"Arashiyama, Kyoto" },
  { cls:"d-jordan", tag:"Ancient Light",     dest:"Jordan",    sub:"Desert & Deep Time",     desc:"Wadi Rum at sunrise. Petra at the blue hour. Bedouin tea poured slow. Jordan holds a quiet that cities cannot manufacture.",                   dur:"8 Days",  dates:"November 2026",    price:"From AED 15,000", loc:"Wadi Rum, Jordan" },
  { cls:"d-sl",     tag:"Jungle & Sea",      dest:"Sri Lanka", sub:"Spice, Temple & Shore",  desc:"Sigiriya at first light. Temple towns wrapped in frangipani. Surf-washed southern shores. An island that overwhelms gently.",                dur:"10 Days", dates:"2026",             price:"From AED 16,000", loc:"Galle, Sri Lanka" },
];

const VOICES = [
  { q:"Bhutan, the country, the pace of life, the clean spiritual air — and of course Harsha. Beautiful mix of everything my heart needed. Beautifully curated with every need fulfilled.", name:"Trissha", trip:"Bhutan · 2024" },
  { q:"Details, precision, and thoughtfulness. Beautiful experiences organised with so much love and care for individual needs.", name:"Feizal Virani", trip:"Bhutan · 2024" },
  { q:"A treasure trove of authenticity. The magic was in the perfect planning — from surprise al fresco lunches to cooking competitions. Truly unforgettable.", name:"Suna Nakhare", trip:"Bhutan · 2023" },
];

const MARQUEE = [
  "Bhutan · Mountains & Monasteries","Japan · Stillness in Motion",
  "Jordan · Desert & Deep Time","Sri Lanka · Spice, Temple & Shore",
  "Bhutan · Mountains & Monasteries","Japan · Stillness in Motion",
  "Jordan · Desert & Deep Time","Sri Lanka · Spice, Temple & Shore",
  "Bhutan · Mountains & Monasteries","Japan · Stillness in Motion",
  "Jordan · Desert & Deep Time","Sri Lanka · Spice, Temple & Shore",
];

export default function App() {
  const [stuck,    setStuck]    = useState(false);
  const [loaded,   setLoaded]   = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 2700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const fn = () => {
      setStuck(window.scrollY > 60);
      setProgress((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const trackRef = useRef(null);
  const drag = useRef({ down: false, startX: 0, scrollLeft: 0 });
  const onMouseDown  = useCallback((e) => { drag.current = { down: true, startX: e.pageX - trackRef.current.offsetLeft, scrollLeft: trackRef.current.scrollLeft }; }, []);
  const onMouseUp    = useCallback(() => { drag.current.down = false; }, []);
  const onMouseLeave = useCallback(() => { drag.current.down = false; }, []);
  const onMouseMove  = useCallback((e) => {
    if (!drag.current.down) return; e.preventDefault();
    trackRef.current.scrollLeft = drag.current.scrollLeft - (e.pageX - trackRef.current.offsetLeft - drag.current.startX) * 1.5;
  }, []);

  return (
    <>
      <style>{G}</style>
      <div className="grain" aria-hidden="true" />
      <div className="pv-progress" style={{ width: `${progress}%` }} aria-hidden="true" />

      <div className={`pre-wrap${loaded ? " done" : ""}`}>
        <p className="pre-logo">PuraVida · with Harsha</p>
        <div className="pre-line" />
        <p className="pre-sub">Boutique Transformational Travel · Dubai</p>
      </div>

      <div className={`mobile-menu${menuOpen ? " open" : ""}`} role="dialog" aria-modal="true">
        <button className="mobile-close-btn" onClick={() => setMenuOpen(false)}>✕</button>
        {[["#journeys","Journeys"],["#philosophy","Philosophy"],["#harsha","Harsha"],["#voices","Voices"]].map(([h,l]) => (
          <a key={l} href={h} onClick={() => setMenuOpen(false)}>{l}</a>
        ))}
        <a href="https://wa.me/+971562216643" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>
          Begin Your Journey
        </a>
      </div>

      <nav className={`nav${stuck ? " stuck" : ""}`}>
        <a href="#" className="nav-logo">PuraVida · Harsha</a>
        <ul className="nav-center">
          {[["#journeys","Journeys"],["#philosophy","Philosophy"],["#harsha","Harsha"],["#voices","Voices"]].map(([h,l]) => (
            <li key={l}><a href={h}>{l}</a></li>
          ))}
        </ul>
        <a href="https://wa.me/+971562216643" className="nav-cta" target="_blank" rel="noopener noreferrer">
          Begin Your Journey
        </a>
        <button className="nav-burger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <span /><span />
        </button>
      </nav>

      <section className="hero" id="home">
        <div className="hero-vline" aria-hidden="true" />
        <p className="hero-bg-word" aria-hidden="true">stillness</p>
        <div className="hero-tag">
          <span className="hero-tag-dot" />
          Boutique Transformational Travel · Dubai
        </div>
        <div className="hero-date">February 2026</div>
        <div className="hero-hl">
          <p className="hero-eyebrow">A journey curated by Harsha</p>
          <h1 className="hero-h1">
            <span className="hero-h1-line"><span className="hero-h1-inner line1">When</span></span>
            <span className="hero-h1-line"><span className="hero-h1-inner line2">you're</span></span>
            <span className="hero-h1-line"><span className="hero-h1-inner line3">ready.</span></span>
          </h1>
        </div>
        <div className="hero-img-col">
          <div className="hero-img-frame">
            <div className="hero-img-scene" />
            <div className="hero-img-grad" />
            <div className="hero-img-corner" aria-hidden="true" />
            <div className="hero-img-corner-bl" aria-hidden="true" />
            <p className="hero-img-caption">Paro Valley, Bhutan</p>
            <div className="hero-badge">
              <p>April<br />9–16<br />2026</p>
            </div>
          </div>
        </div>
        <div className="hero-bottom">
          <p className="hero-sub">
            Intimate group journeys to Bhutan, Japan, Jordan & Sri Lanka — for professionals 35–60 who travel not to escape life, but to finally arrive in it.
          </p>
          <div className="hero-actions">
            <a href="https://wa.me/+971562216643?text=Reserve%20my%20spot%20for%20Bhutan%20April%202026"
              className="btn-p" target="_blank" rel="noopener noreferrer">
              <div className="btn-p-bg" /><div className="btn-p-bg2" />
              <span>Join Bhutan · April 2026 →</span>
            </a>
            <a href="#journeys" className="btn-g">See all journeys →</a>
          </div>
        </div>
      </section>

      <div className="marquee-strip" aria-hidden="true">
        <div className="marquee-track">
          {MARQUEE.map((item, i) => (
            <span key={i}>
              {item}
              {i < MARQUEE.length - 1 && (
                <span style={{ display:"inline-block", width:3, height:3, borderRadius:"50%", background:"#C9A8A8", verticalAlign:"middle", margin:"0 10px", opacity:0.5 }} />
              )}
            </span>
          ))}
        </div>
      </div>

      <section className="manifesto" id="philosophy">
        <FU d={0}>
          <p className="manifesto-quote">
            "It is not just about sitting in silence — it is about understanding where these practices come from, and how to carry a little more presence back into everyday life."
            <span className="manifesto-attr">Harsha · Bhutan 2026</span>
          </p>
        </FU>
        <div className="manifesto-stats">
          {[
            { num:"8–20",  label:"travellers per journey. Intimacy by design." },
            { num:"100%",  label:"founder-led. Harsha on every single journey." },
            { num:"4+",    label:"years of cultural relationships. Not vendor contracts." },
          ].map((s,i) => (
            <FU key={i} d={i+1}>
              <div className="m-stat">
                <p className="m-num">{s.num}</p>
                <p className="m-label">{s.label}</p>
              </div>
            </FU>
          ))}
        </div>
      </section>

      <section className="philosophy">
        <FU><p className="phil-label">Our Approach</p></FU>
        <div>
          <FU d={1}>
            <h2 className="phil-h2">We don't pack<br />itineraries.<br />We allow breath,<br />space, pause.</h2>
          </FU>
          <FU d={2}>
            <p className="phil-body">PuraVida exists for the traveller who has seen the world but is ready to truly arrive somewhere. Our groups are small — eight to twenty people. Our itineraries are unhurried.</p>
            <p className="phil-body">Every journey is led by Harsha herself. There are no tour managers, no scripts — only presence and the extraordinary people who carry the land in their stories.</p>
            <p className="phil-sig">Stillness over noise.</p>
          </FU>
        </div>
        <FU d={2}>
          <div className="phil-pillars">
            {[
              { n:"01", t:"Stillness Over Speed",  b:"We do not pack itineraries. We allow breath, space, and pause between every experience." },
              { n:"02", t:"Presence as Luxury",    b:"No WiFi dependency. Guided moments for reconnection with place, people, and self." },
              { n:"03", t:"Authentic Reverence",   b:"Real village meals, real rituals, real people — relationships built over years, not contracts." },
              { n:"04", t:"Founder-Led Always",    b:"Harsha leads every single journey. Your experience is never handed to someone else." },
            ].map(p => (
              <div className="phil-pillar" key={p.n}>
                <span className="phil-num">{p.n}</span>
                <div><p className="phil-title">{p.t}</p><p className="phil-text">{p.b}</p></div>
              </div>
            ))}
          </div>
        </FU>
      </section>

      <section className="journeys-wrap" id="journeys">
        <div className="journeys-header">
          <FU><h2 className="journeys-h2">Current <em>Journeys</em></h2></FU>
          <FU d={2}>
            <p className="journeys-meta">
              Small groups · 8–20 travellers<br />
              AED 12,100–29,000 per person<br />
              Every detail carried by Harsha
            </p>
          </FU>
        </div>
        <div className="journeys-track" ref={trackRef}
          onMouseDown={onMouseDown} onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave} onMouseMove={onMouseMove}>
          {JOURNEYS.map((j,i) => (
            <div className="j-card" key={i}>
              <div className="j-card-img">
                <div className={`j-card-img-inner ${j.cls}`} />
                <div className="j-card-img-overlay" />
                <span className="j-card-loc">{j.loc}</span>
              </div>
              <div className="j-body">
                <p className="j-tag">{j.tag}</p>
                <h3 className="j-dest">{j.dest}</h3>
                <p className="j-sub">{j.sub}</p>
                <p className="j-desc">{j.desc}</p>
                <div className="j-details">
                  {[["Duration",j.dur],["Dates",j.dates],["Investment",j.price]].map(([l,v]) => (
                    <div className="j-detail" key={l}>
                      <span className="j-detail-label">{l}</span>
                      <span>{v}</span>
                    </div>
                  ))}
                </div>
                <a href="https://wa.me/+971562216643" className="j-cta" target="_blank" rel="noopener noreferrer">
                  Begin enquiry →
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="journeys-hint" aria-hidden="true">
          <div className="hint-line" />
          <span className="hint-text">Drag to explore</span>
          <span className="hint-arrow">→</span>
        </div>
      </section>

      <section className="harsha" id="harsha">
        <div className="harsha-img-col">
          <FU>
            <div className="harsha-frame">
              <div className="harsha-img-inner" />
              <div className="harsha-caption">
                <h3>Harsha</h3>
                <span>Founder & Journey Curator</span>
              </div>
            </div>
            <div className="harsha-corner-tr" aria-hidden="true" />
            <div className="harsha-corner-bl" aria-hidden="true" />
            <div className="harsha-float">
              <p className="harsha-float-q">"Tea tastes different in Bhutan — slower, quieter and exactly where you are."</p>
            </div>
          </FU>
        </div>
        <div className="harsha-text">
          <FU><p className="harsha-eyebrow">About Harsha</p></FU>
          <FU d={1}>
            <h2 className="harsha-h2">I don't guide you<br />through a country.<br />I walk beside you.</h2>
          </FU>
          <FU d={2}>
            <p className="harsha-body">Every relationship we hold with our cultural partners — the monastery in Bhutan, the tea master in Kyoto, the Bedouin family in Wadi Rum — was built over years of quiet return visits, not vendor contracts.</p>
            <p className="harsha-body">When you travel with PuraVida, you travel through those relationships. You are welcomed not as a tourist, but as a guest of someone trusted.</p>
            <p className="harsha-body">Because intimacy changes everything. Conversations go deeper. Laughter feels shared. There is space to be seen, heard, and supported — not just counted.</p>
            <a href="https://wa.me/+971562216643" className="harsha-link" target="_blank" rel="noopener noreferrer">
              Begin a conversation →
            </a>
          </FU>
        </div>
      </section>

      <div className="immersive">
        <Botanical color="white" style={{ position:"absolute", right:80, top:"50%", transform:"translateY(-50%)", opacity:0.05, width:200 }} />
        <div className="immersive-content">
          <FU>
            <p className="immersive-label">Punakha, Bhutan · January 2026</p>
            <p className="immersive-q">
              "Most people think Bhutan is only about the monasteries and the mountains. For me, the magic lives right here — in the quiet of a farmhouse kitchen."
              <span className="immersive-attr">— Harsha</span>
            </p>
          </FU>
        </div>
      </div>

      <section className="voices" id="voices">
        <div className="voices-header">
          <FU><h2 className="voices-h2">Voices from<br /><em>past journeys</em></h2></FU>
          <FU d={2}><p className="voices-count">Bhutan · Japan · Ladakh</p></FU>
        </div>
        <div className="voices-grid">
          {VOICES.map((v,i) => (
            <FU key={i} d={i}>
              <div className="v-card">
                <p className="v-q">"{v.q}"</p>
                <div className="v-sep" />
                <p className="v-name">{v.name}</p>
                <p className="v-trip">{v.trip}</p>
              </div>
            </FU>
          ))}
        </div>
      </section>

      <section className="enquiry">
        <FU>
          <p className="enq-eyebrow">Begin the Conversation</p>
          <h2 className="enq-h2">
            The right journey<br />finds you when<br />you're <em>truly ready.</em>
          </h2>
          <p className="enq-body">
            We don't take bookings. We begin with a conversation. Tell us where you are, what you're carrying, and what you're looking for.
          </p>
        </FU>
        <FU d={2}>
          <div className="enq-options">
            {[
              { label:"WhatsApp",          value:"+971 56 221 6643",              href:"https://wa.me/+971562216643" },
              { label:"Email",             value:"harsha@puravidawithharsha.com", href:"mailto:harsha@puravidawithharsha.com" },
              { label:"Bhutan April 2026", value:"Download full itinerary",       href:"https://puravidawithharsha.com/wp-content/uploads/2026/01/Bhutan-2026.pdf" },
              { label:"Instagram",         value:"@puravida.withharsha",          href:"https://instagram.com/puravida.withharsha" },
            ].map((o,i) => (
              <a key={i} href={o.href} className="enq-opt"
                target={o.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer">
                <div>
                  <p className="enq-opt-label">{o.label}</p>
                  <p className="enq-opt-val">{o.value}</p>
                </div>
                <span className="enq-arrow">→</span>
              </a>
            ))}
          </div>
        </FU>
      </section>

      <footer>
        <div className="footer-top">
          <div>
            <p className="f-brand">PuraVida with Harsha</p>
            <p className="f-tagline">Where stillness finds you.<br />Dubai · Bhutan · Japan · Jordan · Sri Lanka</p>
            <div className="f-contact">
              <p><a href="mailto:harsha@puravidawithharsha.com">harsha@puravidawithharsha.com</a></p>
              <p><a href="https://wa.me/+971562216643">+971 56 221 6643</a></p>
            </div>
          </div>
          {[
            { head:"Journeys", links:[["#journeys","Bhutan"],["#journeys","Japan"],["#journeys","Jordan"],["#journeys","Sri Lanka"]] },
            { head:"Company",  links:[["#harsha","About Harsha"],["#philosophy","Philosophy"],["#journeys","Bespoke Experience"],["#journeys","Nature & Protect"]] },
            { head:"Connect",  links:[["https://wa.me/+971562216643","Begin an Enquiry"],["https://instagram.com/puravida.withharsha","Instagram"],["https://puravidawithharsha.com/wp-content/uploads/2026/01/Bhutan-2026.pdf","Download Itinerary"]] },
          ].map(col => (
            <div key={col.head}>
              <p className="f-head">{col.head}</p>
              <ul className="f-list">
                {col.links.map(([href,label]) => (
                  <li key={label}>
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <p className="f-copy">© 2026 PuraVida with Harsha. All rights reserved. Dubai, UAE.</p>
          <a href="https://instagram.com/puravida.withharsha" className="f-ig" target="_blank" rel="noopener noreferrer">
            @puravida.withharsha
          </a>
        </div>
      </footer>
    </>
  );
}