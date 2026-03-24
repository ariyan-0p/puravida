import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

function useFadeUp() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}
function FU({ children, d = 0, className = '', style = {} }) {
  const [ref, vis] = useFadeUp();
  return (
    <div ref={ref} className={`hfu${vis ? ' hin' : ''} ${className}`}
      style={{ transitionDelay: `${d * 0.13}s`, ...style }}>
      {children}
    </div>
  );
}

function LeafDivider({ color = '#2B2B2B', width = '100%' }) {
  return (
    <svg viewBox="0 0 600 20" style={{ width, height: '20px', display: 'block', margin: '0 auto' }} xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke={color} strokeWidth="1.2" opacity="0.4">
        <path d="M20,10 L270,10" /><path d="M330,10 L580,10" />
        <path d="M275,10 c0,-6 5,-10 10,-10 c-6,0 -10,5 -10,10 c0,6 5,10 10,10 c-6,0 -10,-5 -10,-10z" fill={color} opacity="0.25" />
        <path d="M315,10 c0,-6 5,-10 10,-10 c-6,0 -10,5 -10,10 c0,6 5,10 10,10 c-6,0 -10,-5 -10,-10z" fill={color} opacity="0.25" />
        <path d="M295,3 L295,17" /><path d="M300,1 L300,19" /><path d="M305,3 L305,17" />
      </g>
    </svg>
  );
}

function TreeGlyph({ size = 40, color = '#2B2B2B' }) {
  return (
    <svg viewBox="0 0 30 50" style={{ width: size * 0.6, height: size }} xmlns="http://www.w3.org/2000/svg">
      <g fill={color} opacity="0.35">
        <polygon points="15,2 8,18 22,18" /><polygon points="15,10 6,28 24,28" />
        <polygon points="15,20 4,40 26,40" /><rect x="13" y="40" width="4" height="8" />
      </g>
    </svg>
  );
}

const JOURNEYS = [
  { slug:"bhutan", img:"/assets/journey-bhutan.jpg", dest:"Bhutan", tag:"Mountains and Monasteries", dates:"April 9\u201316, 2026", dur:"8 Days", price:"From AED 12,100", ready:true },
  { slug:"ladakh", img:"/assets/journey-ladakh.jpg", dest:"Ladakh", tag:"High Passes and Living Monasteries", dates:"September 20\u201327, 2026", dur:"8 Days", price:"From AED 6,250", ready:true },
  { slug:"bali", img:"/assets/journey-bali.jpg", dest:"Bali", tag:"Ritual, Rice, and Renewal", dates:"October 1\u20136, 2026", dur:"6 Days", price:"Details coming soon", ready:false },
  { slug:"japan", img:"/assets/journey-japan.jpg", dest:"Japan", tag:"Stillness in Snow, Hokkaido", dates:"November 15\u201321, 2026", dur:"7 Days", price:"Details coming soon", ready:false },
];

const VOICES = [
  { q:"Bhutan, the country, the pace of life, the clean spiritual air, and of course Harsha. Beautiful mix of everything my heart needed.", name:"T.", trip:"Bhutan, 2024" },
  { q:"Details, precision, and thoughtfulness. Beautiful experiences organised with so much love and care for individual needs.", name:"F.V.", trip:"Bhutan, 2024" },
  { q:"Japan with Harsha was an apprenticeship in noticing. I learned to see.", name:"A.", trip:"Japan, 2023" },
];

const PILLARS = [
  { n:"01", t:"Stillness Over Speed", p:"We allow breath, space, and pause between every experience. Altitude becomes meditation. Silence becomes teacher." },
  { n:"02", t:"Presence as Luxury", p:"Guided moments for reconnection with place, people, and self. The luxury of being unreachable." },
  { n:"03", t:"Authentic Reverence", p:"Real village meals. Real rituals. Real people: relationships built over years. You are welcomed as a guest." },
  { n:"04", t:"Founder Led, Always", p:"Harsha leads every single journey. Your experience is never handed to someone else. This is handcrafted." },
];

export default function Homepage() {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeJ, setActiveJ] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 2400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const fn = () => setProgress((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Auto-rotate journey showcase
  useEffect(() => {
    const iv = setInterval(() => setActiveJ(p => (p + 1) % JOURNEYS.length), 5000);
    return () => clearInterval(iv);
  }, []);

  const j = JOURNEYS[activeJ];

  return (
    <>
      <style>{`
        .hfu { opacity:0; transform:translateY(24px); transition:opacity 0.8s ease, transform 0.8s ease; }
        .hfu.hin { opacity:1; transform:translateY(0); }

        /* ══════════════════════════════════
           SECTION 1: HERO — Full viewport, cinematic
           ══════════════════════════════════ */
        .hp-hero {
          min-height: 100vh; position: relative; overflow: hidden;
          display: flex; align-items: center; justify-content: center;
          background: #F2ECE5;
        }
        .hp-hero-left {
          position: relative; z-index: 2;
          flex: 1; display: flex; flex-direction: column;
          justify-content: center;
          padding: 0 80px 0 80px;
          max-width: 600px;
        }
        .hp-hero-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-size: 16px;
          color: #C9A8A8; letter-spacing: 0.1em;
          margin-bottom: 48px;
          opacity: 0; animation: hpFade 0.8s ease 2s forwards;
          padding-top: 20px;
        }
        .hp-hero-h1 {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; font-size: clamp(3.6rem, 7vw, 6.5rem);
          line-height: 1.0; color: #2B2B2B;
          margin-bottom: 40px;
        }
        .hp-hero-h1-line { display: block; overflow: hidden; }
        .hp-hero-h1-inner { display: block; animation: hpReveal 1s cubic-bezier(.16,1,.3,1) forwards; }
        .hp-l1 { animation-delay: 2.2s; }
        .hp-l2 { animation-delay: 2.35s; font-style: italic; }
        .hp-l3 { animation-delay: 2.5s; }
        .hp-hero-body {
          font-family: 'Lato', sans-serif;
          font-size: 16px; line-height: 1.75; color: #404040;
          max-width: 420px; margin-bottom: 48px;
          opacity: 0; animation: hpFade 0.8s ease 2.8s forwards;
        }
        .hp-hero-cta {
          opacity: 0; animation: hpFade 0.8s ease 3s forwards;
        }
        .hp-btn {
          display: inline-block;
          font-family: 'Lato', sans-serif; font-size: 16px; font-weight: 700;
          color: #2B2B2B; background: #C9A8A8;
          padding: 16px 36px; border-radius: 4px;
          text-decoration: none; transition: background 0.35s, color 0.35s;
        }
        .hp-btn:hover { background: #A07878; color: #FAFAF8; }

        .hp-hero-right {
          flex: 1; position: relative;
          height: 100vh; overflow: hidden;
        }
        .hp-hero-img {
          position: absolute; inset: 0;
          background: center / cover no-repeat;
          transition: opacity 1.2s ease;
        }
        .hp-hero-img::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(to right, #F2ECE5 0%, transparent 12%);
        }
        .hp-hero-credit {
          position: absolute; bottom: 16px; right: 20px; z-index: 3;
          font-family: 'Lato', sans-serif; font-size: 12px;
          color: rgba(255,255,255,0.7); text-shadow: 0 1px 3px rgba(0,0,0,0.4);
        }
        .hp-hero-caption {
          position: absolute; bottom: 32px; left: 32px; z-index: 3;
          font-family: 'Lato', sans-serif; font-size: 14px;
          color: rgba(255,255,255,0.6); font-style: italic;
          opacity: 0; animation: hpFade 0.8s ease 3.2s forwards;
        }

        /* ══════════════════════════════════
           SECTION 2: EDITORIAL QUOTE STRIP
           ══════════════════════════════════ */
        .hp-quote-strip {
          background: #DDE5DF;
          padding: 100px 80px;
          text-align: center;
        }
        .hp-quote {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-weight: 300;
          font-size: clamp(1.6rem, 3vw, 2.6rem);
          line-height: 1.5; color: #2B2B2B;
          max-width: 700px; margin: 0 auto 28px;
        }
        .hp-quote-attr {
          font-family: 'Lato', sans-serif; font-size: 14px;
          letter-spacing: 0.12em; color: #A07878;
          display: flex; align-items: center; justify-content: center; gap: 12px;
        }
        .hp-quote-attr::before, .hp-quote-attr::after {
          content: ''; width: 24px; height: 1px; background: #C9A8A8; opacity: 0.5;
        }

        /* ══════════════════════════════════
           SECTION 3: ABOUT HARSHA — editorial layout
           ══════════════════════════════════ */
        .hp-about {
          background: #FAFAF8;
          padding: 120px 80px;
          display: grid; grid-template-columns: 1fr 0.9fr;
          gap: 100px; align-items: center;
        }
        .hp-about-img-wrap { position: relative; }
        .hp-about-img {
          width: 100%; aspect-ratio: 3/4;
          object-fit: cover; display: block;
          box-shadow: 0 24px 60px rgba(43,43,43,0.1);
        }
        .hp-about-float {
          position: absolute; bottom: -20px; right: -20px;
          background: #FAFAF8; border: 1.5px solid rgba(201,168,168,0.2);
          padding: 24px 28px; max-width: 220px; z-index: 2;
          box-shadow: 0 8px 32px rgba(43,43,43,0.06);
        }
        .hp-about-float::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: #C9A8A8;
        }
        .hp-about-float p {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-size: 16px; line-height: 1.6; color: #2B2B2B;
        }
        .hp-about-eyebrow {
          font-family: 'Lato', sans-serif; font-size: 14px;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #C9A8A8; margin-bottom: 32px;
        }
        .hp-about-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 3vw, 3rem); font-weight: 300;
          line-height: 1.25; color: #2B2B2B; margin-bottom: 36px;
        }
        .hp-about-body {
          font-family: 'Lato', sans-serif;
          font-size: 16px; line-height: 1.75; color: #404040;
          margin-bottom: 16px; max-width: 480px;
        }
        .hp-about-sig {
          margin-top: 40px;
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-size: 1.1rem; color: #A07878;
          display: flex; align-items: center; gap: 12px;
        }
        .hp-about-sig::before { content: ''; width: 24px; height: 1px; background: #C9A8A8; }

        /* ══════════════════════════════════
           SECTION 4: PHILOSOPHY — numbered pillars
           ══════════════════════════════════ */
        .hp-phil {
          background: #F2ECE5;
          padding: 120px 80px;
        }
        .hp-phil-header {
          text-align: center; max-width: 600px;
          margin: 0 auto 80px;
        }
        .hp-phil-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.4rem, 4vw, 3.8rem); font-weight: 300;
          line-height: 1.1; color: #2B2B2B; margin-bottom: 24px;
        }
        .hp-phil-h2 em { font-style: italic; }
        .hp-phil-intro {
          font-family: 'Lato', sans-serif; font-size: 16px;
          line-height: 1.7; color: #606060;
        }
        .hp-phil-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 0; max-width: 1200px; margin: 0 auto;
        }
        .hp-pillar {
          padding: 48px 36px;
          border-left: 1px solid rgba(201,168,168,0.2);
          position: relative;
          transition: background 0.4s ease;
        }
        .hp-pillar:first-child { border-left: none; }
        .hp-pillar:hover { background: rgba(250,250,248,0.6); }
        .hp-pillar-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3rem; font-weight: 300;
          color: rgba(201,168,168,0.35); line-height: 1;
          margin-bottom: 20px;
        }
        .hp-pillar-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.25rem; font-weight: 400;
          color: #2B2B2B; margin-bottom: 14px;
          line-height: 1.3;
        }
        .hp-pillar-text {
          font-family: 'Lato', sans-serif;
          font-size: 14px; line-height: 1.7; color: #606060;
        }

        /* ══════════════════════════════════
           SECTION 5: JOURNEYS — showcase cards
           ══════════════════════════════════ */
        .hp-journeys {
          background: #FAFAF8;
          padding: 120px 80px;
        }
        .hp-j-header {
          display: flex; align-items: flex-end; justify-content: space-between;
          margin-bottom: 64px; padding-bottom: 32px;
          border-bottom: 1px solid rgba(201,168,168,0.15);
        }
        .hp-j-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.4rem, 4vw, 3.8rem); font-weight: 300;
          color: #2B2B2B; line-height: 1.1;
        }
        .hp-j-h2 em { font-style: italic; }
        .hp-j-count {
          font-family: 'Lato', sans-serif; font-size: 14px;
          color: #606060; letter-spacing: 0.1em;
        }
        .hp-j-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .hp-j-card {
          position: relative; overflow: hidden;
          aspect-ratio: 3/4; cursor: pointer;
          transition: transform 0.5s ease;
        }
        .hp-j-card:hover { transform: translateY(-6px); }
        .hp-j-card-img {
          position: absolute; inset: 0;
          background: center / cover no-repeat;
          transition: transform 0.8s ease;
        }
        .hp-j-card:hover .hp-j-card-img { transform: scale(1.05); }
        .hp-j-card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top,
            rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.05) 100%);
        }
        .hp-j-card-content {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 32px 28px; z-index: 2;
        }
        .hp-j-card-dest {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem; font-weight: 400;
          color: white; margin-bottom: 4px;
        }
        .hp-j-card-tag {
          font-family: 'Lato', sans-serif;
          font-size: 12px; font-style: italic;
          color: rgba(255,255,255,0.6); margin-bottom: 16px;
        }
        .hp-j-card-meta {
          display: flex; gap: 20px;
          font-family: 'Lato', sans-serif; font-size: 12px;
          color: rgba(255,255,255,0.5);
        }
        .hp-j-card-link {
          display: inline-block; margin-top: 16px;
          font-family: 'Lato', sans-serif; font-size: 14px; font-weight: 400;
          color: #C9A8A8; text-decoration: none;
          transition: color 0.3s;
        }
        .hp-j-card-link:hover { color: white; }

        /* ══════════════════════════════════
           SECTION 6: IMMERSIVE IMAGE STRIP
           ══════════════════════════════════ */
        .hp-immersive {
          position: relative; min-height: 60vh; overflow: hidden;
          display: flex; align-items: center; justify-content: center;
        }
        .hp-immersive-bg {
          position: absolute; inset: 0;
          background: url('/assets/immersive-bhutan.jpg') center / cover no-repeat,
            linear-gradient(148deg, #3d5040 0%, #1a261c 100%);
        }
        .hp-immersive::before {
          content: ''; position: absolute; inset: 0; z-index: 1;
          background: rgba(0,0,0,0.45);
        }
        .hp-immersive-content {
          position: relative; z-index: 2;
          text-align: center; max-width: 640px; padding: 0 40px;
        }
        .hp-immersive-q {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-weight: 300;
          font-size: clamp(1.6rem, 3vw, 2.6rem);
          line-height: 1.45; color: white; margin-bottom: 24px;
        }
        .hp-immersive-attr {
          font-family: 'Lato', sans-serif; font-size: 14px;
          letter-spacing: 0.12em; color: #C9A8A8;
        }

        /* ══════════════════════════════════
           SECTION 7: TESTIMONIALS — editorial cards
           ══════════════════════════════════ */
        .hp-voices {
          background: #F2ECE5;
          padding: 120px 80px;
        }
        .hp-voices-header {
          text-align: center; margin-bottom: 72px;
        }
        .hp-voices-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 3vw, 3rem); font-weight: 300;
          color: #2B2B2B; margin-bottom: 12px;
        }
        .hp-voices-h2 em { font-style: italic; }
        .hp-voices-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 24px; max-width: 1100px; margin: 0 auto;
        }
        .hp-v-card {
          background: #FAFAF8;
          padding: 48px 36px;
          border-left: 2px solid #C9A8A8;
          position: relative;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .hp-v-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(43,43,43,0.06);
        }
        .hp-v-card::before {
          content: '\u201C'; position: absolute; top: 12px; left: 20px;
          font-family: 'Cormorant Garamond', serif; font-size: 4rem;
          color: rgba(201,168,168,0.15); line-height: 1;
        }
        .hp-v-q {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-size: 18px;
          line-height: 1.7; color: #2B2B2B;
          margin-bottom: 28px; position: relative; z-index: 1;
        }
        .hp-v-name {
          font-family: 'Lato', sans-serif; font-size: 14px;
          font-weight: 400; color: #2B2B2B; margin-bottom: 2px;
        }
        .hp-v-trip {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-size: 14px; color: #A07878;
        }

        /* ══════════════════════════════════
           SECTION 8: CONTACT — invitation to begin
           ══════════════════════════════════ */
        .hp-contact {
          background: #DDE5DF;
          padding: 120px 80px;
          text-align: center;
        }
        .hp-contact-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.4rem, 4.5vw, 4.2rem); font-weight: 300;
          line-height: 1.15; color: #2B2B2B; margin-bottom: 28px;
        }
        .hp-contact-h2 em { font-style: italic; }
        .hp-contact-body {
          font-family: 'Lato', sans-serif; font-size: 16px;
          line-height: 1.75; color: #404040;
          max-width: 520px; margin: 0 auto 48px;
        }
        .hp-contact-actions {
          display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;
        }
        .hp-contact-btn {
          font-family: 'Lato', sans-serif; font-size: 16px; font-weight: 700;
          color: #2B2B2B; background: #C9A8A8;
          padding: 16px 36px; border-radius: 4px;
          text-decoration: none; transition: background 0.35s, color 0.35s;
        }
        .hp-contact-btn:hover { background: #A07878; color: #FAFAF8; }
        .hp-contact-link {
          font-family: 'Lato', sans-serif; font-size: 16px;
          color: #2B2B2B; text-decoration: none;
          padding: 16px 36px; border: 1px solid rgba(43,43,43,0.2);
          border-radius: 4px; transition: all 0.35s;
        }
        .hp-contact-link:hover { border-color: #C9A8A8; color: #A07878; }

        @keyframes hpFade { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes hpReveal { from{transform:translateY(110%)} to{transform:translateY(0)} }

        /* ── RESPONSIVE ── */
        @media (max-width: 1100px) {
          .hp-phil-grid { grid-template-columns: repeat(2, 1fr); }
          .hp-j-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 900px) {
          .hp-hero { flex-direction: column; }
          .hp-hero-left { padding: 140px 40px 60px; max-width: 100%; }
          .hp-hero-right { height: 50vh; width: 100%; }
          .hp-hero-img::after {
            background: linear-gradient(to bottom, #F2ECE5 0%, transparent 15%);
          }
          .hp-about { grid-template-columns: 1fr; padding: 80px 40px; gap: 48px; }
          .hp-about-float { display: none; }
          .hp-phil { padding: 80px 40px; }
          .hp-phil-grid { grid-template-columns: 1fr; }
          .hp-pillar { border-left: none; border-top: 1px solid rgba(201,168,168,0.2); }
          .hp-pillar:first-child { border-top: none; }
          .hp-journeys { padding: 80px 40px; }
          .hp-j-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
          .hp-voices { padding: 80px 40px; }
          .hp-voices-grid { grid-template-columns: 1fr; }
          .hp-contact { padding: 80px 40px; }
          .hp-quote-strip { padding: 80px 40px; }
        }
        @media (max-width: 600px) {
          .hp-hero-left { padding: 120px 28px 48px; }
          .hp-j-grid { grid-template-columns: 1fr; }
          .hp-j-card { aspect-ratio: 4/3; }
          .hp-about { padding: 60px 28px; }
          .hp-phil { padding: 60px 28px; }
          .hp-journeys { padding: 60px 28px; }
          .hp-voices { padding: 60px 28px; }
          .hp-contact { padding: 60px 28px; }
          .hp-quote-strip { padding: 60px 28px; }
          .hp-contact-actions { flex-direction: column; align-items: center; }
        }
      `}</style>

      <div className="grain" aria-hidden="true" />
      <div className="pv-progress" style={{ width: `${progress}%` }} aria-hidden="true" />

      {/* Preloader */}
      <div className={`pre-wrap${loaded ? ' done' : ''}`}>
        <img src="/assets/Logo-Main.png" alt="PuraVida with Harsha" className="pre-logo-img" />
        <div className="pre-line" />
        <p className="pre-sub">Where stillness finds you</p>
      </div>

      <Nav />
      <WhatsAppButton />

      {/* ══ 1. HERO ══ */}
      <section className="hp-hero" id="home">
        <div className="hp-hero-left">
          <p className="hp-hero-tagline">Where stillness finds you</p>
          <h1 className="hp-hero-h1">
            <span className="hp-hero-h1-line"><span className="hp-hero-h1-inner hp-l1">When</span></span>
            <span className="hp-hero-h1-line"><span className="hp-hero-h1-inner hp-l2">you're</span></span>
            <span className="hp-hero-h1-line"><span className="hp-hero-h1-inner hp-l3">ready.</span></span>
          </h1>
          <p className="hp-hero-body">
            Boutique transformational travel for those who have mastered the boardroom but lost the ability to sit with silence. Small groups. Unhurried itineraries. Just presence.
          </p>
          <div className="hp-hero-cta">
            <a href="https://wa.me/+971562216643" className="hp-btn" target="_blank" rel="noopener noreferrer">
              Begin a Conversation
            </a>
          </div>
        </div>
        <div className="hp-hero-right">
          <div className="hp-hero-img" style={{ backgroundImage: `url('/assets/hero-bhutan.jpg')` }} />
          <span className="hp-hero-credit">Photo: Kelly Dorji</span>
          <p className="hp-hero-caption">Paro Valley, Bhutan</p>
        </div>
      </section>

      {/* ══ 2. EDITORIAL QUOTE ══ */}
      <section className="hp-quote-strip">
        <FU>
          <LeafDivider width="200px" />
          <p className="hp-quote" style={{ marginTop: '32px' }}>
            I walk beside you. Every relationship we hold was built over years of quiet return visits. Years of showing up.
          </p>
          <div className="hp-quote-attr">Harsha, Founder</div>
          <div style={{ marginTop: '32px' }}><LeafDivider width="200px" /></div>
        </FU>
      </section>

      {/* ══ 3. ABOUT HARSHA ══ */}
      <section className="hp-about" id="about">
        <FU>
          <div className="hp-about-img-wrap">
            <img src="/assets/harsha-portrait.jpg" alt="Harsha" className="hp-about-img" />
            <div className="hp-about-float">
              <p>"Tea tastes different in Bhutan: slower, quieter, exactly where you are."</p>
            </div>
          </div>
        </FU>
        <FU d={1}>
          <p className="hp-about-eyebrow">About Harsha</p>
          <h2 className="hp-about-h2">
            Ten years ago, I went to Ladakh for three weeks. I came back changed.
          </h2>
          <p className="hp-about-body">
            The monk who taught me that silence carries its own kind of sound. The family who fed me tsampa and butter tea and asked nothing in return.
          </p>
          <p className="hp-about-body">
            PuraVida began with a single question: What if travel was about arriving fully, and being changed by that arrival?
          </p>
          <p className="hp-about-body">
            Every journey I lead, I lead because I have walked that ground myself. Because the families in Ladakh and Bhutan pour tea for me the way they pour it for family.
          </p>
          <div className="hp-about-sig">Harsha</div>
        </FU>
      </section>

      {/* ══ 4. PHILOSOPHY ══ */}
      <section className="hp-phil" id="philosophy">
        <div className="hp-phil-header">
          <FU>
            <LeafDivider width="160px" />
            <h2 className="hp-phil-h2" style={{ marginTop: '28px' }}>
              We allow <em>breath, space, pause.</em>
            </h2>
            <p className="hp-phil-intro">
              Every journey is led by Harsha herself. No tour managers. No scripts. Only presence.
            </p>
          </FU>
        </div>
        <div className="hp-phil-grid">
          {PILLARS.map((p, i) => (
            <FU key={i} d={i * 0.5}>
              <div className="hp-pillar">
                <p className="hp-pillar-num">{p.n}</p>
                <h3 className="hp-pillar-title">{p.t}</h3>
                <p className="hp-pillar-text">{p.p}</p>
              </div>
            </FU>
          ))}
        </div>
      </section>

      {/* ══ 5. JOURNEYS ══ */}
      <section className="hp-journeys" id="journeys">
        <div className="hp-j-header">
          <FU>
            <h2 className="hp-j-h2">Current <em>Journeys</em></h2>
          </FU>
          <FU d={0.5}>
            <p className="hp-j-count">2026 Portfolio: Four Destinations</p>
          </FU>
        </div>
        <div className="hp-j-grid">
          {JOURNEYS.map((j, i) => (
            <FU key={i} d={i * 0.3}>
              <div className="hp-j-card">
                <div className="hp-j-card-img" style={{ backgroundImage: `url('${j.img}')` }} />
                <div className="hp-j-card-overlay" />
                <div className="hp-j-card-content">
                  <h3 className="hp-j-card-dest">{j.dest}</h3>
                  <p className="hp-j-card-tag">{j.tag}</p>
                  <div className="hp-j-card-meta">
                    <span>{j.dur}</span>
                    <span>{j.dates}</span>
                  </div>
                  <div className="hp-j-card-meta" style={{ marginTop: '4px' }}>
                    <span>{j.price}</span>
                  </div>
                  {j.ready ? (
                    <Link to={`/${j.slug}`} className="hp-j-card-link">Explore the Journey &rarr;</Link>
                  ) : (
                    <a href="https://wa.me/+971562216643" className="hp-j-card-link" target="_blank" rel="noopener noreferrer">Message Harsha &rarr;</a>
                  )}
                </div>
              </div>
            </FU>
          ))}
        </div>
      </section>

      {/* ══ 6. IMMERSIVE STRIP ══ */}
      <div className="hp-immersive">
        <div className="hp-immersive-bg" />
        <FU>
          <div className="hp-immersive-content">
            <p className="hp-immersive-q">
              Bhutan holds a kind of quiet that stays with you long after you return. It asks you to slow down, breathe deeper, and notice the gentle details of life that cities often blur.
            </p>
            <p className="hp-immersive-attr">From the Bhutan Itinerary</p>
          </div>
        </FU>
      </div>

      {/* ══ 7. TESTIMONIALS ══ */}
      <section className="hp-voices" id="voices">
        <div className="hp-voices-header">
          <FU>
            <h2 className="hp-voices-h2">What past <em>travellers</em> say</h2>
          </FU>
        </div>
        <div className="hp-voices-grid">
          {VOICES.map((v, i) => (
            <FU key={i} d={i * 0.3}>
              <div className="hp-v-card">
                <p className="hp-v-q">"{v.q}"</p>
                <p className="hp-v-name">{v.name}</p>
                <p className="hp-v-trip">{v.trip}</p>
              </div>
            </FU>
          ))}
        </div>
      </section>

      {/* ══ 8. CONTACT ══ */}
      <section className="hp-contact">
        <FU>
          <LeafDivider width="160px" />
          <h2 className="hp-contact-h2" style={{ marginTop: '32px' }}>
            The right journey finds you<br />when you are <em>truly ready.</em>
          </h2>
          <p className="hp-contact-body">
            We begin with a conversation. Message Harsha directly. Tell her where you are. What you are carrying. What you are looking for.
          </p>
          <div className="hp-contact-actions">
            <a href="https://wa.me/+971562216643" className="hp-contact-btn" target="_blank" rel="noopener noreferrer">
              Message Harsha
            </a>
            <a href="mailto:harsha@puravidawithharsha.com" className="hp-contact-link">
              Email
            </a>
            <a href="https://instagram.com/puravida.withharsha" className="hp-contact-link" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </div>
          <div style={{ marginTop: '48px' }}><LeafDivider width="160px" /></div>
        </FU>
      </section>

      <Footer />
    </>
  );
}