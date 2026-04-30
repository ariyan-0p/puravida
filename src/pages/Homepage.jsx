import { useState, useEffect, useRef } from 'react';
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
    if (typeof IntersectionObserver === 'undefined') { setVis(true); return; }
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

const DIVIDER_CENTER_SRC = encodeURI(
  '/assets/05. GRAPHIC ELEMENTS/Dividers/Divider - Center.png'
);

function glyphSrc(name, variant) {
  return encodeURI(`/assets/05. GRAPHIC ELEMENTS/Glyphs/${variant}/${name}/${name}.png`);
}

function Divider({ width = 200, opacity = 0.5 }) {
  return (
    <img
      src={DIVIDER_CENTER_SRC}
      alt="" aria-hidden="true"
      style={{ width, maxWidth: '100%', opacity, display: 'block', margin: '0 auto' }}
    />
  );
}

function Glyph({ name = 'Trees', variant = 'Charcoal', size = 48, opacity = 0.3 }) {
  return (
    <img
      src={glyphSrc(name, variant)}
      alt="" aria-hidden="true"
      style={{ height: size, width: 'auto', opacity }}
    />
  );
}

const JOURNEYS = [
  { slug: "bhutan", img: "/assets/journey-bhutan.jpg", dest: "Bhutan", tag: "Mountains and Monasteries", dates: "April 2026", dur: "8 Days", ready: true },
  { slug: "ladakh", img: "/assets/journey-ladakh.jpg", dest: "Ladakh", tag: "High Passes and Living Monasteries", dates: "September 20 to 27, 2026", dur: "8 Days", ready: true },
  { slug: "bali", img: "/assets/journey-srilanka.jpg", dest: "Bali", tag: "Ritual, Rice, and Renewal", dates: "October 1 to 6, 2026", dur: "6 Days", ready: false },
  { slug: "japan", img: "/assets/journey-japan.jpg", dest: "Japan", tag: "Stillness in Snow, Hokkaido", dates: "December 2026", dur: "7 Days", ready: false },
];

const VOICES = [
  { q: "Bhutan, the country, the pace of life, the clean spiritual air, and of course Harsha. A beautiful mix of everything my heart needed.", name: "T.", trip: "Bhutan, 2024" },
  { q: "Details, precision, and thoughtfulness. Beautiful experiences organised with so much love and care for individual needs.", name: "F.V.", trip: "Bhutan, 2024" },
  { q: "Japan with Harsha was an apprenticeship in noticing. I learned to see.", name: "A.", trip: "Japan, 2023" },
];

const PILLARS = [
  { n: "01", t: "Stillness Over Speed", p: "We allow breath, space, and pause between every experience. Altitude becomes meditation. Silence becomes teacher.", glyph: "Pause", glyphSize: 64 },
  { n: "02", t: "Presence as Luxury", p: "Guided moments for reconnection with place, people, and self. The luxury of being unreachable.", glyph: "Sunset", glyphSize: 64 },
  { n: "03", t: "Authentic Reverence", p: "Real village meals. Real rituals. Real people: relationships built over years. You are welcomed as a guest.", glyph: "Trees" },
  { n: "04", t: "Founder Led, Always", p: "Harsha leads every single journey. Your experience stays with Harsha, every step. This is handcrafted.", glyph: "Mountains" },
];

export default function Homepage() {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.title = 'PuraVida with Harsha | Where Stillness Finds You';
    const t = setTimeout(() => setLoaded(true), 2400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const fn = () => setProgress((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <style>{`
        .hfu { opacity:0; transform:translateY(24px); transition:opacity 0.8s ease, transform 0.8s ease; }
        .hfu.hin { opacity:1; transform:translateY(0); }

        /* ── 1. HERO ── */
        .hp-hero {
          height: 100vh; min-height: 640px; position: relative; overflow: hidden;
          display: flex; align-items: stretch;
          background: #F5F0EB;
        }
        .hp-hero-left {
          position: relative; z-index: 2;
          flex: 0 0 42%; display: flex; flex-direction: column;
          justify-content: center;
          padding: 110px 56px 56px 80px;
          min-height: 0;
        }
        .hp-hero-tagline {
          font-family: 'Lora', serif;
          font-style: italic; font-size: 16px;
          color: #D4A42C; letter-spacing: 0.08em;
          margin-bottom: clamp(20px, 3vw, 36px);
          opacity: 0; animation: hpFade 0.8s ease 2s forwards;
        }
        .hp-hero-h1 {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: clamp(2.8rem, 5vw, 4.6rem);
          line-height: 1.05; color: #333333;
          margin-bottom: clamp(20px, 3vw, 32px); letter-spacing: 0.01em;
        }
        .hp-hero-h1-line { display: block; overflow: hidden; padding-bottom: 0.12em; }
        .hp-hero-h1-inner { display: block; animation: hpReveal 1s cubic-bezier(.16,1,.3,1) forwards; }
        .hp-l1 { animation-delay: 2.2s; }
        .hp-l2 { animation-delay: 2.35s; }
        .hp-l3 { animation-delay: 2.5s; }
        .hp-hero-body {
          font-family: 'Lato', sans-serif;
          font-size: 15px; line-height: 1.65; color: #333333;
          max-width: 440px; margin-bottom: clamp(20px, 3vw, 32px);
          opacity: 0; animation: hpFade 0.8s ease 2.8s forwards;
        }
        .hp-hero-cta {
          opacity: 0; animation: hpFade 0.8s ease 3s forwards;
        }
        .hp-btn {
          display: inline-block;
          font-family: 'Lato', sans-serif; font-size: 16px; font-weight: 700;
          color: #333333; background: #D9A6A1;
          padding: 16px 36px; border-radius: 4px;
          text-decoration: none; transition: background 0.35s, color 0.35s;
        }
        .hp-btn:hover { background: #c08e88; color: #FFFFFF; }

        .hp-hero-right {
          flex: 1; position: relative;
          min-height: 500px; overflow: hidden;
        }
        .hp-hero-img {
          position: absolute; inset: 0;
          background: center / cover no-repeat;
          transition: opacity 1.2s ease;
        }
        .hp-hero-img::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(to right, #F5F0EB 0%, rgba(245,240,235,0.4) 3%, transparent 9%);
        }
        .hp-hero-credit {
          position: absolute; bottom: 16px; right: 20px; z-index: 3;
          font-family: 'Lato', sans-serif; font-size: 12px;
          color: rgba(255,255,255,0.7); text-shadow: 0 1px 3px rgba(0,0,0,0.4);
        }
        .hp-hero-tree-glyph {
          position: absolute;
          bottom: 16px;
          right: clamp(24px, 5vw, 60px);
          z-index: 2;
          pointer-events: none;
          line-height: 0;
        }
        .hp-section-divider {
          position: relative;
          z-index: 3;
          text-align: center;
          height: 0;
          line-height: 0;
        }
        .hp-section-divider img {
          width: 100% !important;
          max-width: 100%;
          opacity: 0.5;
          display: block;
          transform: translateY(-50%);
        }

        /* ── 2. EDITORIAL QUOTE ── */
        .hp-quote-strip {
          background: #B7C8B5;
          padding: 100px 80px;
          text-align: center;
        }
        .hp-quote {
          font-family: 'Lora', serif;
          font-style: italic;
          font-size: clamp(1.5rem, 2.8vw, 2.2rem);
          line-height: 1.6; color: #333333;
          max-width: 680px; margin: 32px auto;
        }
        .hp-quote-attr {
          font-family: 'Lato', sans-serif; font-size: 14px;
          letter-spacing: 0.12em; color: #333333; opacity: 0.6;
          margin-top: 24px;
        }
        .hp-quote-wrap {
          position: relative;
          z-index: 1;
          max-width: 520px;
          margin: 0 auto;
          text-align: center;
          padding: 48px 40px;
        }
        .hp-quote-frame {
          position: absolute;
          inset: -12px -16px -18px -16px;
          pointer-events: none;
          z-index: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hp-quote-frame img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          opacity: 0.55;
        }

        /* ── 3. ABOUT HARSHA ── */
        .hp-about {
          background: #FFFFFF;
          padding: 100px 80px;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 80px; align-items: center;
        }
        @media (min-width: 1025px) {
          .hp-about {
            height: 100vh; min-height: 640px;
            padding: clamp(48px, 6vw, 80px) 80px;
            overflow: hidden;
          }
          .hp-about-img-wrap { max-height: 100%; }
          .hp-about-img-wrap .hp-about-img { max-height: 80vh; width: auto; max-width: 100%; object-fit: contain; margin: 0 auto; }
        }
        .hp-about-img-wrap { position: relative; }
        .hp-about-img {
          width: 100%; height: auto;
          display: block;
        }
        .hp-about-leaf-accent {
          position: absolute;
          top: -28px;
          left: -28px;
          width: clamp(100px, 14vw, 160px);
          opacity: 0.55;
          pointer-events: none;
          z-index: 3;
          transform: rotate(180deg);
        }
        .hp-about-float {
          position: absolute; bottom: -24px; right: -24px;
          background: #FFFFFF; padding: 28px 32px;
          max-width: 240px; z-index: 2;
          box-shadow: 0 8px 32px rgba(51,51,51,0.06);
          border-left: 3px solid #D9A6A1;
        }
        .hp-about-float-q-upper {
          width: 24px; opacity: 0.35; margin-bottom: 8px; display: block;
        }
        .hp-about-float p {
          font-family: 'Lora', serif;
          font-style: italic; font-size: 15px; line-height: 1.6; color: #333333;
        }
        .hp-about-float-q-lower {
          width: 24px; opacity: 0.35; margin-top: 8px; display: block; margin-left: auto;
        }
        .hp-about-eyebrow {
          font-family: 'Lato', sans-serif; font-size: 13px;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #D9A6A1; margin-bottom: clamp(14px, 2vw, 22px);
        }
        .hp-about-h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.6rem, 2.6vw, 2.4rem); font-weight: 700;
          line-height: 1.2; color: #333333; margin-bottom: clamp(16px, 2.4vw, 24px);
        }
        .hp-about-body {
          font-family: 'Lato', sans-serif;
          font-size: 15px; line-height: 1.6; color: #333333;
          margin-bottom: 12px; max-width: 500px;
        }
        .hp-about-sig {
          margin-top: clamp(16px, 2.4vw, 24px);
          font-family: 'Lora', serif;
          font-style: italic; font-size: 1.05rem; color: #D9A6A1;
          display: flex; align-items: center; gap: 12px;
        }
        .hp-about-sig::before { content: ''; width: 24px; height: 1px; background: #D9A6A1; opacity: 0.6; }

        /* ── 4. PHILOSOPHY ── */
        .hp-phil {
          background: #F5F0EB;
          padding: 100px 80px;
        }
        .hp-phil-header {
          text-align: center; max-width: 640px;
          margin: 0 auto 72px;
        }
        .hp-phil-h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.2rem, 3.5vw, 3.2rem); font-weight: 700;
          line-height: 1.15; color: #333333; margin: 28px 0 24px;
        }
        .hp-phil-intro {
          font-family: 'Lato', sans-serif; font-size: 16px;
          line-height: 1.7; color: #333333;
        }
        .hp-phil-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 0; max-width: 1100px; margin: 0 auto;
        }
        .hp-pillar {
          padding: 48px 32px;
          border-left: 1px solid rgba(217,166,161,0.25);
          transition: background 0.4s ease;
        }
        .hp-pillar:first-child { border-left: none; }
        .hp-pillar:hover { background: rgba(255,255,255,0.5); }
        .hp-pillar-num-row {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 12px;
          margin-bottom: 20px;
          min-height: 72px;
        }
        .hp-pillar-num {
          font-family: 'Playfair Display', serif;
          font-size: 2.4rem; font-weight: 700;
          color: #333333; line-height: 1;
        }
        .hp-pillar-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.15rem; font-weight: 700;
          color: #333333; margin-bottom: 14px;
          line-height: 1.3;
          min-height: calc(1.3em * 2);
          display: flex;
          align-items: flex-start;
        }
        .hp-pillar-text {
          font-family: 'Lato', sans-serif;
          font-size: 14px; line-height: 1.7; color: #333333;
        }

        /* ── 5. JOURNEYS ── */
        .hp-journeys {
          background: #FFFFFF;
          padding: 100px 80px;
        }
        .hp-j-header {
          display: flex; align-items: flex-end; justify-content: space-between;
          margin-bottom: 64px; padding-bottom: 32px;
          border-bottom: 1px solid rgba(217,166,161,0.15);
        }
        .hp-j-h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.2rem, 3.5vw, 3.2rem); font-weight: 700;
          color: #333333; line-height: 1.15;
        }
        .hp-j-count {
          font-family: 'Lato', sans-serif; font-size: 14px;
          color: #333333; letter-spacing: 0.1em;
        }
        .hp-j-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .hp-j-card {
          position: relative; overflow: hidden;
          aspect-ratio: 3/4; cursor: pointer;
          border-radius: 4px;
          transition: transform 0.5s ease;
          text-decoration: none; display: block;
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
          padding: 32px 24px; z-index: 2;
        }
        .hp-j-card-dest {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem; font-weight: 700;
          color: white; margin-bottom: 4px;
        }
        .hp-j-card-tag {
          font-family: 'Lato', sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.6); margin-bottom: 12px;
        }
        .hp-j-card-meta {
          display: flex; gap: 16px;
          font-family: 'Lato', sans-serif; font-size: 12px;
          color: rgba(255,255,255,0.45);
        }

        /* ── 6. IMMERSIVE STRIP ── */
        .hp-immersive {
          position: relative; min-height: 60vh; overflow: hidden;
          display: flex; align-items: center; justify-content: center;
          padding: 80px 60px;
        }
        .hp-immersive-bg {
          position: absolute; inset: 0;
          background: url('/assets/immersive-bhutan.jpg') center / cover no-repeat,
            linear-gradient(148deg, #3d5040 0%, #1a261c 100%);
        }
        .hp-immersive::before {
          content: ''; position: absolute; inset: 0; z-index: 1;
          background: rgba(0,0,0,0.5);
        }
        .hp-immersive-content {
          position: relative; z-index: 2;
          text-align: center; max-width: 560px;
          padding: 48px 56px;
        }
        .hp-immersive-leaf {
          position: absolute;
          width: clamp(28px, 4.5vw, 40px);
          pointer-events: none;
          z-index: 3;
          opacity: 0.85;
          filter: brightness(2);
        }
        .hp-immersive-leaf--upper {
          top: 0;
          left: 8px;
        }
        .hp-immersive-leaf--lower {
          bottom: 48px;
          right: 8px;
        }
        .hp-immersive-divider {
          filter: invert(1) brightness(2);
          margin-bottom: 16px;
        }
        .hp-immersive-q {
          font-family: 'Lora', serif;
          font-style: italic;
          font-size: clamp(1.5rem, 2.8vw, 2.2rem);
          line-height: 1.5; color: #FFFFFF; margin-bottom: 24px;
          text-shadow: 0 2px 16px rgba(0,0,0,0.95), 0 1px 3px rgba(0,0,0,1);
        }
        .hp-immersive-attr {
          font-family: 'Lato', sans-serif; font-size: 14px;
          letter-spacing: 0.12em; color: #F5E6B8;
          text-shadow: 0 2px 14px rgba(0,0,0,0.95), 0 1px 3px rgba(0,0,0,1);
        }

        /* ── 7. TESTIMONIALS ── */
        .hp-voices {
          background: #F5F0EB;
          padding: 100px 80px;
        }
        .hp-voices-header {
          text-align: center; margin-bottom: 64px;
        }
        .hp-voices-h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 3vw, 2.8rem); font-weight: 700;
          color: #333333; margin-bottom: 12px;
        }
        .hp-voices-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 24px; max-width: 1100px; margin: 0 auto;
        }
        .hp-v-card {
          background: #FFFFFF;
          padding: 48px 36px;
          position: relative;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .hp-v-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(51,51,51,0.06);
        }
        .hp-v-quote-mark {
          width: 32px; opacity: 0.2; margin-bottom: 16px; display: block;
        }
        .hp-v-q {
          font-family: 'Lora', serif;
          font-style: italic; font-size: 17px;
          line-height: 1.7; color: #333333;
          margin-bottom: 28px; position: relative; z-index: 1;
        }
        .hp-v-sep { width: 20px; height: 1px; background: #D9A6A1; margin-bottom: 16px; }
        .hp-v-leaf {
          position: absolute;
          bottom: 12px;
          right: 12px;
          width: 28px;
          opacity: 0.2;
          pointer-events: none;
        }
        .hp-v-name {
          font-family: 'Lato', sans-serif; font-size: 14px;
          font-weight: 700; color: #333333; margin-bottom: 2px;
        }
        .hp-v-trip {
          font-family: 'Lato', sans-serif;
          font-size: 13px; color: #333333; opacity: 0.6;
        }

        /* ── 8. CONTACT ── */
        .hp-contact {
          background: #B7C8B5;
          padding: 100px 80px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .hp-contact-corner {
          position: absolute;
          pointer-events: none;
          z-index: 0;
        }
        .hp-contact-corner--tr {
          top: -24px;
          right: -24px;
          opacity: 0.12;
        }
        .hp-contact-corner--br {
          bottom: -24px;
          right: -24px;
          opacity: 0.12;
        }
        .hp-contact-corner--bl {
          bottom: 8px;
          left: clamp(16px, 4vw, 48px);
          opacity: 0.18;
        }
        .hp-contact-h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.2rem, 4vw, 3.6rem); font-weight: 700;
          line-height: 1.2; color: #333333; margin: 32px 0 28px;
        }
        .hp-contact-body {
          font-family: 'Lato', sans-serif; font-size: 16px;
          line-height: 1.75; color: #333333;
          max-width: 520px; margin: 0 auto 48px;
        }
        .hp-contact-actions {
          display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;
          margin-bottom: 48px;
        }
        .hp-contact-btn {
          font-family: 'Lato', sans-serif; font-size: 16px; font-weight: 700;
          color: #333333; background: #D9A6A1;
          padding: 16px 36px; border-radius: 4px;
          text-decoration: none; transition: background 0.35s, color 0.35s;
        }
        .hp-contact-btn:hover { background: #c08e88; color: #FFFFFF; }
        .hp-contact-link {
          font-family: 'Lato', sans-serif; font-size: 16px;
          color: #333333; text-decoration: none;
          padding: 16px 36px; border: 1px solid rgba(51,51,51,0.25);
          border-radius: 4px; transition: all 0.35s;
        }
        .hp-contact-link:hover { border-color: #333333; }
        .hp-contact-glyphs {
          display: flex; justify-content: center; gap: 16px;
          margin-top: 16px;
        }

        @keyframes hpFade { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes hpReveal { from{transform:translateY(110%)} to{transform:translateY(0)} }

        /* ── RESPONSIVE ── */
        @media (max-width: 1100px) {
          .hp-phil-grid { grid-template-columns: repeat(2, 1fr); }
          .hp-j-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 900px) {
          .hp-hero { flex-direction: column; min-height: auto; }
          .hp-hero-left { padding: 120px 40px 48px; flex: none; }
          .hp-hero-right { flex: none; height: auto; width: 100%; aspect-ratio: 4/3; position: relative; }
          .hp-hero-img::after { background: linear-gradient(to bottom, rgba(245,240,235,0.3) 0%, transparent 20%); }
          .hp-hero-credit { bottom: 16px; right: 16px; font-size: 11px; }
          .hp-hero-tree-glyph {
            bottom: 12px;
            right: 16px;
            transform: scale(0.85);
            transform-origin: bottom right;
          }
          .hp-section-divider img { width: 100% !important; }
          .hp-about { grid-template-columns: 1fr; padding: 80px 40px; gap: 48px; }
          .hp-about-float { display: none; }
          .hp-phil { padding: 80px 40px; }
          .hp-phil-grid { grid-template-columns: 1fr; }
          .hp-pillar { border-left: none; border-top: 1px solid rgba(217,166,161,0.25); }
          .hp-pillar:first-child { border-top: none; }
          .hp-journeys { padding: 80px 40px; }
          .hp-j-header { flex-direction: column; align-items: flex-start; gap: 12px; }
          .hp-j-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
          .hp-voices { padding: 80px 40px; }
          .hp-voices-grid { grid-template-columns: 1fr; }
          .hp-contact { padding: 80px 40px; }
          .hp-contact-corner img { height: 80px !important; }
          .hp-contact-corner--tr { top: -12px; right: -12px; }
          .hp-contact-corner--br { bottom: -12px; right: -12px; }
          .hp-contact-corner--bl { bottom: 4px; left: 12px; }
          .hp-quote-strip { padding: 80px 40px; }
          .hp-immersive { min-height: 50vh; }
        }
        @media (max-width: 600px) {
          .hp-hero-left { padding: 100px 28px 40px; }
          .hp-hero-right { aspect-ratio: 3/2; }
          .hp-hero-h1 { font-size: clamp(2.8rem, 11vw, 4rem); margin-bottom: 28px; }
          .hp-hero-tagline {
            margin-bottom: 32px;
            font-size: clamp(14px, 3.8vw, 16px);
          }
          .hp-hero-tree-glyph {
            bottom: 10px;
            right: max(12px, env(safe-area-inset-right, 0px));
            transform: scale(0.7);
            transform-origin: bottom right;
          }
          .hp-section-divider img { width: 100% !important; }
          .hp-hero-body { margin-bottom: 36px; }
          .hp-j-grid { grid-template-columns: 1fr; }
          .hp-j-card { aspect-ratio: 4/3; }
          .hp-about { padding: 60px 28px; }
          .hp-phil { padding: 60px 28px; }
          .hp-journeys { padding: 60px 28px; }
          .hp-voices { padding: 60px 28px; }
          .hp-contact { padding: 60px 28px; }
          .hp-quote-strip { padding: 60px 28px; }
          .hp-quote-attr { margin-top: 56px; }
          .hp-contact-actions { flex-direction: column; align-items: center; }
          .hp-immersive { min-height: 40vh; padding: 40px 20px; }
          .hp-immersive-content { padding: 40px 32px; }
          .hp-immersive-q { font-size: clamp(1.2rem, 5vw, 1.6rem); }
        }
      `}</style>

      <div className="pv-progress" style={{ width: `${progress}%` }} aria-hidden="true" />

      {/* Preloader */}
      <div className={`pre-wrap${loaded ? ' done' : ''}`}>
        <img src="/assets/01. LOGOS/Logo-Main.png" alt="PuraVida with Harsha" className="pre-logo-img" />
        <div className="pre-dots" aria-hidden="true">
          <span /><span /><span />
        </div>
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
            <span className="hp-hero-h1-line"><span className="hp-hero-h1-inner hp-l2">you are</span></span>
            <span className="hp-hero-h1-line"><span className="hp-hero-h1-inner hp-l3">ready.</span></span>
          </h1>
          <p className="hp-hero-body">
            Boutique transformational travel for professionals ready to rediscover stillness. Small groups. Unhurried itineraries. Presence at every step.
          </p>
          <div className="hp-hero-cta">
            <a href="https://wa.me/971562216643?text=Hello%20Harsha%2C%20I%E2%80%99d%20love%20to%20learn%20more%20about%20your%20journeys." className="hp-btn" target="_blank" rel="noopener noreferrer">
              Begin a Conversation
            </a>
          </div>
        </div>
        <div className="hp-hero-right">
          <div className="hp-hero-img" style={{ backgroundImage: "url('/assets/hero-bhutan.jpg')" }} />
          <span className="hp-hero-credit">Photo: Kelly Dorji</span>
        </div>
      </section>

      {/* ── Hero → Quote divider ── */}
      <div className="hp-section-divider">
        <img src={DIVIDER_CENTER_SRC} alt="" aria-hidden="true" />
      </div>

      {/* ══ 2. EDITORIAL QUOTE ══ */}
      <section className="hp-quote-strip">
        <FU>
          <div className="hp-quote-wrap">
            <div className="hp-quote-frame">
              <img src="/assets/Puravida_Quote-Frame-1/Frame.png" alt="" aria-hidden="true" />
            </div>
            <p className="hp-quote">
              I walk beside you. Every relationship we hold was built over years of quiet return visits. Years of showing up.
            </p>
            <p className="hp-quote-attr">Harsha, Founder</p>
          </div>
        </FU>
      </section>

      {/* ── Quote → About divider ── */}
      <div className="hp-section-divider">
        <img src={DIVIDER_CENTER_SRC} alt="" aria-hidden="true" />
      </div>

      {/* ══ 3. ABOUT HARSHA ══ */}
      <section className="hp-about" id="about">
        <FU>
          <div className="hp-about-img-wrap">
            <img src="/assets/Puravida_Photo-Frame-2-Harsha.png" alt="Harsha" className="hp-about-img" />
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
            PuraVida began with a single question: what if travel was about arriving fully, and being changed by that arrival?
          </p>
          <p className="hp-about-body">
            Every journey I lead, I lead because I have walked that ground myself. Because the families in Ladakh and Bhutan pour tea for me the way they pour it for family.
          </p>
          <div className="hp-about-sig">Harsha</div>
        </FU>
      </section>

      {/* ── About → Philosophy divider ── */}
      <div className="hp-section-divider">
        <img src={DIVIDER_CENTER_SRC} alt="" aria-hidden="true" />
      </div>

      {/* ══ 4. PHILOSOPHY ══ */}
      <section className="hp-phil" id="philosophy">
        <div className="hp-phil-header">
          <FU>
            <h2 className="hp-phil-h2">We allow breath, space, pause.</h2>
            <p className="hp-phil-intro">Every journey is led by Harsha herself. Personal attention. Unhurried pace. Presence at every moment.</p>
            <Divider width={160} opacity={0.4} />
          </FU>
        </div>
        <div className="hp-phil-grid">
          {PILLARS.map((p, i) => (
            <FU key={i} d={i * 0.5}>
              <div className="hp-pillar">
                <div className="hp-pillar-num-row">
                  <Glyph name={p.glyph} variant="Charcoal" size={64} opacity={0.5} />
                </div>
                <h3 className="hp-pillar-title">{p.t}</h3>
                <p className="hp-pillar-text">{p.p}</p>
              </div>
            </FU>
          ))}
        </div>
      </section>

      {/* ── Philosophy → Journeys divider ── */}
      <div className="hp-section-divider">
        <img src={DIVIDER_CENTER_SRC} alt="" aria-hidden="true" />
      </div>

      {/* ══ 5. JOURNEYS ══ */}
      <section className="hp-journeys" id="journeys">
        <div className="hp-j-header">
          <FU><h2 className="hp-j-h2">Journeys</h2></FU>
        </div>
        <div className="hp-j-grid">
          {JOURNEYS.map((j, i) => (
            <FU key={i} d={i * 0.3}>
              <Link to={`/${j.slug}`} className="hp-j-card">
                <div className="hp-j-card-img" style={{ backgroundImage: `url('${j.img}')` }} />
                <div className="hp-j-card-overlay" />
                <div className="hp-j-card-content">
                  <h3 className="hp-j-card-dest">{j.dest}</h3>
                  <p className="hp-j-card-tag">{j.tag}</p>
                  <div className="hp-j-card-meta"><span>{j.dur}</span><span>{j.dates}</span></div>
                </div>
              </Link>
            </FU>
          ))}
        </div>
      </section>

      {/* ── Immersive → Testimonials divider ── */}
      <div className="hp-section-divider">
        <img src={DIVIDER_CENTER_SRC} alt="" aria-hidden="true" />
      </div>

      {/* ══ 7. TESTIMONIALS ══ */}
      <section className="hp-voices" id="voices">
        <div className="hp-voices-header">
          <FU>
            <h2 className="hp-voices-h2">What past travellers say</h2>
          </FU>
        </div>
        <div className="hp-voices-grid">
          {VOICES.map((v, i) => (
            <FU key={i} d={i * 0.3}>
              <div className="hp-v-card">
                <img
                  src="/assets/05. GRAPHIC ELEMENTS/Puravida_Quote-Frame-1/Quote-Upper.png"
                  alt="" aria-hidden="true" className="hp-v-quote-mark"
                />
                <p className="hp-v-q">{v.q}</p>
                <div className="hp-v-sep" />
                <p className="hp-v-name">{v.name}</p>
                <p className="hp-v-trip">{v.trip}</p>
                <img
                  src="/assets/05. GRAPHIC ELEMENTS/Puravida_Quote-Frame-1/Quote-Lower.png"
                  alt="" aria-hidden="true" className="hp-v-leaf"
                />
              </div>
            </FU>
          ))}
        </div>
      </section>

      {/* ── Testimonials → Contact divider ── */}
      <div className="hp-section-divider">
        <img src={DIVIDER_CENTER_SRC} alt="" aria-hidden="true" />
      </div>

      {/* ══ 8. CONTACT ══ */}
      <section className="hp-contact" id="contact">
        {/* Decorative brush-circle corners */}
        <div className="hp-contact-corner hp-contact-corner--tr">
          <Glyph name="Pause" variant="Sage" size={160} opacity={1} />
        </div>
        <div className="hp-contact-corner hp-contact-corner--br">
          <Glyph name="Mountains" variant="Charcoal" size={140} opacity={1} />
        </div>
        <div className="hp-contact-corner hp-contact-corner--bl">
          <Glyph name="Trees" variant="Charcoal" size={100} opacity={1} />
        </div>
        <FU>
          <Divider width={160} opacity={0.4} />
          <h2 className="hp-contact-h2">
            The right journey finds you<br />when you are truly ready.
          </h2>
          <p className="hp-contact-body">
            We begin with a conversation. Message Harsha directly. Tell her where you are. What you are carrying. What you are looking for.
          </p>
          <div className="hp-contact-actions">
            <a href="https://wa.me/971562216643" className="hp-contact-btn" target="_blank" rel="noopener noreferrer">
              Message Harsha
            </a>
            <a href="mailto:harsha@puravidawithharsha.com" className="hp-contact-link">Email</a>
            <a href="https://instagram.com/puravida.withharsha" className="hp-contact-link" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
          <Divider width={160} opacity={0.4} />
        </FU>
      </section>

      <Footer />
    </>
  );
}