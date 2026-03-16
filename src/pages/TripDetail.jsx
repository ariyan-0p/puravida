import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { tripsData } from '../data/trips';

// ---------------------------------------------------------------------------
// Fade-up hook
// ---------------------------------------------------------------------------
function useFadeUp() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function FU({ children, d = 0, className = '', style = {} }) {
  const [ref, vis] = useFadeUp();
  return (
    <div
      ref={ref}
      className={`fu${vis ? ' in' : ''} ${className}`}
      style={{ transitionDelay: `${d * 0.14}s`, ...style }}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Image helpers — maps slug → Unsplash collections
// Replace each array with your real /assets/ paths when ready.
// ---------------------------------------------------------------------------
const LOCATION_IMAGES = {
  bhutan: {
    hero:        '/assets/hero-bhutan.jpg',
    harshaMain:  '/assets/harsha-portrait.jpg',
    harshaFloat: '/assets/Heera-1024x478.jpg',
    mosaic: [
      { src: '/assets/rama-krushna-behera-LIE0mImer3A-unsplash.jpg', tall: true },
      { src: '/assets/chandan-chaurasia-ceztog4F6no-unsplash.jpg' },
      { src: '/assets/sujan-mongar-YWbHCrwmD2E-unsplash.jpg' },
      { src: '/assets/rama-krushna-behera-ly_E7ZIGFWk-unsplash.jpg', wide: true },
    ],
    philosophy:        '/assets/tanay-dedhia-nanaWJMn-Dw-unsplash.jpg',
    philosophyCaption: '',
    strip1:    '/assets/penden-wangchuk-HMVWJy49X5Q-unsplash.jpg',
    itinStrip: [
      { src: '/assets/chandan-chaurasia-y_CydLKoGhw-unsplash.jpg', large: true },
      { src: '/assets/gaurav-bagdi-E7UC4S79RpY-unsplash.jpg' },
      { src: '/assets/nihar-modi-uMbGXBy7bKs-unsplash.jpg' },
    ],
    gallery: [
      { src: '/assets/journey-bhutan.jpg',                             span2: true, row2: true },
      { src: '/assets/serge-pareit-N5oJbLEFLoU-unsplash.jpg' },
      { src: '/assets/sujan-mongar-2EBstxZp9ro-unsplash.jpg' },
      { src: '/assets/prateek-katyal-8wmEXx5QtgM-unsplash.jpg',       span2: true },
    ],
    strip2: '/assets/ugyen-tenzin-KsvEeDFUaQI-unsplash.jpg',
  },

  japan: {
    hero:       'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1800&q=90',
    harshaMain: '/assets/harsha-portrait.jpg',
    harshaFloat:'/assets/Heera-1024x478.jpg',
    mosaic: [
      { src: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=85', caption: 'Fushimi Inari', tall: true },
      { src: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800&q=85', caption: 'Kyoto Temple' },
      { src: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&q=85', caption: 'Tokyo Lights' },
      { src: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1200&q=85', caption: 'Cherry Blossoms', wide: true },
    ],
    philosophy:        'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=900&q=85',
    philosophyCaption: 'Fushimi Inari Taisha, Kyoto — ten thousand torii gates climbing Mt. Inari',
    strip1:    'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=1800&q=85',
    itinStrip: [
      { src: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=1000&q=85', large: true },
      { src: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=600&q=85' },
      { src: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=600&q=85' },
    ],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&q=85', label: 'Fushimi Inari', span2: true, row2: true },
      { src: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=600&q=85',  label: 'Kyoto' },
      { src: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=600&q=85',  label: 'Tokyo' },
      { src: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1200&q=85', label: 'Cherry Blossoms', span2: true },
    ],
    strip2: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1800&q=85',
  },

  jordan: {
    hero:        '/assets/journey-jordan.jpg',
    harshaMain:  '/assets/harsha-portrait.jpg',
    harshaFloat: '/assets/Heera-1024x478.jpg',
    mosaic: [
      { src: '/assets/aleksei-filimonov-BHmvR7hLb_U-unsplash.jpg',        tall: true },
      { src: '/assets/erik-groh-LcjCT7zFy5Q-unsplash.jpg' },
      { src: '/assets/dylan-shaw-ul1Wxo_dBCw-unsplash.jpg' },
      { src: '/assets/matt-jones-36MFxvk1A-Y-unsplash.jpg',               wide: true },
    ],
    philosophy:        '/assets/filippo-cesarini-c8F1hJ_UTrk-unsplash.jpg',
    philosophyCaption: '',
    strip1:    '/assets/george-stainton-SxRd7SEz7YY-unsplash.jpg',
    itinStrip: [
      { src: '/assets/peter-zuijdwegt-jx4D_IloWBA-unsplash.jpg', large: true },
      { src: '/assets/andrea-leopardi-bs2H7V7ptVc-unsplash.jpg' },
      { src: '/assets/arne-backhaus-GlNop3H48Yo-unsplash.jpg' },
    ],
    gallery: [
      { src: '/assets/tommaso-ubezio-276p7oXwbGk-unsplash.jpg',            span2: true, row2: true },
      { src: '/assets/ken-cheung-lxm2FORxDoo-unsplash.jpg' },
      { src: '/assets/michael-starkie-Tk8cc1BoMxQ-unsplash.jpg' },
      { src: '/assets/matt-jones-wJc85fhYxwE-unsplash.jpg',                span2: true },
    ],
    strip2: '/assets/alexander-van-steenberge-JbF-1r1K0Aw-unsplash.jpg',
  },

  srilanka: {
    hero:        '/assets/journey-srilanka.jpg',
    harshaMain:  '/assets/harsha-portrait.jpg',
    harshaFloat: '/assets/Heera-1024x478.jpg',
    mosaic: [
      { src: '/assets/tommaso-delton-_sFOJHDmO6A-unsplash.jpg',           tall: true },
      { src: '/assets/supun-batagoda-xAV7NSUeeLc-unsplash.jpg' },
      { src: '/assets/saurav-rastogi-Rw9SbuS8jPM-unsplash.jpg' },
      { src: '/assets/kelum-chathuranga-9-kgWv7UlYo-unsplash.jpg',        wide: true },
    ],
    philosophy:        '/assets/javier-saint-jean-D-XL1krxVzg-unsplash.jpg',
    philosophyCaption: '',
    strip1:    '/assets/danny-postma-9Y5NzSquU4M-unsplash.jpg',
    itinStrip: [
      { src: '/assets/sajith-sukumaran-Udb75nXcBJ0-unsplash.jpg', large: true },
      { src: '/assets/thanursan-4xJHMhz7e5s-unsplash.jpg' },
      { src: '/assets/rowan-heuvel-_5P2O2FDKRY-unsplash.jpg' },
    ],
    gallery: [
      { src: '/assets/sajith-sukumaran-Udb75nXcBJ0-unsplash.jpg',        span2: true, row2: true },
      { src: '/assets/thanursan-4xJHMhz7e5s-unsplash.jpg' },
      { src: '/assets/rowan-heuvel-_5P2O2FDKRY-unsplash.jpg' },
      { src: '/assets/kelum-chathuranga-9-kgWv7UlYo-unsplash.jpg',        span2: true },
    ],
    strip2: '/assets/zoshua-colah-Q9dAeyMJ1y4-unsplash.jpg',
  },
};

// Fallback for unknown slugs
const DEFAULT_IMAGES = LOCATION_IMAGES.bhutan;

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function IntroMosaic({ images }) {
  return (
    <div className="td-mosaic">
      {images.map((img, i) => (
        <div
          key={i}
          className={`td-mosaic-cell${img.tall ? ' tall' : ''}${img.wide ? ' wide' : ''}`}
        >
          <img src={img.src} alt={img.caption || ''} loading="lazy" />
          {img.caption && <div className="td-mosaic-caption">{img.caption}</div>}
        </div>
      ))}
    </div>
  );
}

function FullBleedStrip({ src, quote, attr }) {
  return (
    <div className="td-strip">
      <div className="td-strip-bg" style={{ backgroundImage: `url('${src}')` }} />
      <div className="td-strip-overlay" />
      {quote && (
        <div className="td-strip-text">
          <p className="td-strip-quote">"{quote}"</p>
          {attr && <p className="td-strip-attr">— {attr}</p>}
        </div>
      )}
    </div>
  );
}

function ItinPhotoStrip({ images }) {
  return (
    <div className="td-itin-strip">
      {images.map((img, i) => (
        <div key={i} className={`td-itin-strip-cell${img.large ? ' large' : ''}`}>
          <img src={img.src} alt="" loading="lazy" />
        </div>
      ))}
    </div>
  );
}

function GalleryGrid({ images }) {
  return (
    <div className="td-gallery-grid">
      {images.map((img, i) => (
        <div
          key={i}
          className={`td-gallery-cell${img.span2 ? ' span2' : ''}${img.row2 ? ' row2' : ''}`}
        >
          <img src={img.src} alt={img.label || ''} loading="lazy" />
          {img.label && <div className="td-gallery-label">{img.label}</div>}
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function TripDetail({ tripSlug }) {
  const [progress, setProgress] = useState(0);
  const trip  = tripsData[tripSlug];
  const imgs  = LOCATION_IMAGES[tripSlug] || DEFAULT_IMAGES;

  useEffect(() => {
    window.scrollTo(0, 0);
    const fn = () => {
      setProgress(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, [tripSlug]);

  if (!trip) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        Trip not found
      </div>
    );
  }

  // Split itinerary into two halves for the photo strip insert
  const half      = Math.ceil((trip.itinerary?.length || 0) / 2);
  const itinFirst = trip.itinerary?.slice(0, half) || [];
  const itinLast  = trip.itinerary?.slice(half)    || [];

  return (
    <>
      <style>{`
        /* ── TOKENS ─────────────────────────────────────────────────── */
        :root {
          --clay:  #D9A6A1;
          --sage:  #B7C8B5;
          --cream: #F8F4EE;
          --mist:  #EEF0EB;
          --ink:   #2B2B2B;
          --mid:   #404040;
          --soft:  #606060;
        }

        /* ── PROGRESS ───────────────────────────────────────────────── */
        .td-progress {
          position: fixed; top: 0; left: 0; height: 2px;
          background: var(--clay); z-index: 999;
          transition: width 0.1s linear;
        }

        /* ── FADE-UP ─────────────────────────────────────────────────── */
        .fu { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .fu.in { opacity: 1; transform: translateY(0); }

        /* ── HERO ────────────────────────────────────────────────────── */
        .td-hero {
          min-height: 100vh; position: relative; overflow: hidden;
          display: flex; align-items: flex-end;
        }
        .td-hero-bg {
          position: absolute; inset: 0;
          background-size: cover; background-position: center;
          background-repeat: no-repeat;
        }
        .td-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top,
            rgba(0,0,0,0.82) 0%,
            rgba(0,0,0,0.35) 55%,
            rgba(0,0,0,0.10) 100%);
        }
        .td-hero-content {
          position: relative; z-index: 2;
          padding: 80px 100px; max-width: 900px;
        }
        .td-crumb {
          font-family: 'Inter', sans-serif;
          font-size: 0.54rem; letter-spacing: 0.3em; text-transform: uppercase;
          color: rgba(255,255,255,0.55); margin-bottom: 20px;
          display: flex; gap: 10px; align-items: center;
        }
        .td-crumb a { color: rgba(255,255,255,0.7); text-decoration: none; transition: color .3s; }
        .td-crumb a:hover { color: var(--clay); }
        .td-eyebrow {
          font-family: 'Inter', sans-serif;
          font-size: 0.57rem; letter-spacing: 0.3em; text-transform: uppercase;
          color: var(--clay); margin-bottom: 18px;
        }
        .td-h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3.8rem, 7vw, 6.5rem); font-weight: 300; line-height: 0.95;
          color: white; margin-bottom: 20px;
        }
        .td-tagline {
          font-family: 'Cormorant Garamond', serif; font-style: italic;
          font-size: 1.45rem; color: var(--clay); margin-bottom: 36px;
        }
        .td-meta { display: flex; gap: 48px; flex-wrap: wrap; }
        .td-meta-item { display: flex; flex-direction: column; gap: 5px; }
        .td-meta-label {
          font-size: 0.54rem; letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(255,255,255,0.45); font-family: 'Inter', sans-serif;
        }
        .td-meta-val { font-family: 'Lato', sans-serif; font-size: 0.88rem; color: rgba(255,255,255,0.9); }
        .td-scroll-hint {
          position: absolute; bottom: 40px; right: 100px; z-index: 2;
          display: flex; flex-direction: column; align-items: center; gap: 10px;
          font-family: 'Inter', sans-serif; font-size: 0.5rem;
          letter-spacing: 0.25em; text-transform: uppercase; color: rgba(255,255,255,0.35);
        }
        .td-scroll-line {
          width: 1px; height: 48px; background: rgba(255,255,255,0.2);
          position: relative; overflow: hidden;
        }
        .td-scroll-line::after {
          content: ''; position: absolute; top: -50%; left: 0; right: 0; height: 50%;
          background: rgba(255,255,255,0.6);
          animation: tdScrollDown 1.8s infinite ease-in-out;
        }
        @keyframes tdScrollDown { 0%{top:-50%} 100%{top:100%} }

        /* ── INTRO MOSAIC ────────────────────────────────────────────── */
        .td-mosaic {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr 1fr;
          grid-template-rows: 320px 220px;
          gap: 6px;
          background: var(--ink);
        }
        .td-mosaic-cell { overflow: hidden; position: relative; }
        .td-mosaic-cell img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform 0.7s ease;
        }
        .td-mosaic-cell:hover img { transform: scale(1.04); }
        .td-mosaic-cell.tall  { grid-row: span 2; }
        .td-mosaic-cell.wide  { grid-column: span 2; }
        .td-mosaic-caption {
          position: absolute; bottom: 0; left: 0; right: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.62), transparent);
          padding: 22px 16px 12px;
          font-family: 'Inter', sans-serif; font-size: 0.52rem;
          letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.7);
        }

        /* ── PHILOSOPHY ──────────────────────────────────────────────── */
        .td-philosophy {
          background: white;
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px; padding: 100px;
          align-items: start;
        }
        .td-phil-img { width: 100%; height: 480px; object-fit: cover; display: block; }
        .td-phil-img-caption {
          font-family: 'Cormorant Garamond', serif; font-style: italic;
          font-size: 0.9rem; color: var(--soft); margin-top: 14px;
          padding-left: 16px; border-left: 2px solid var(--clay);
        }
        .td-section-eyebrow {
          font-family: 'Inter', sans-serif;
          font-size: 0.54rem; letter-spacing: 0.3em; text-transform: uppercase;
          color: var(--clay); margin-bottom: 20px;
        }
        .td-section-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 3.2vw, 3rem); font-weight: 300; line-height: 1.2;
          color: #333; margin-bottom: 32px;
        }
        .td-body-p {
          font-family: 'Lato', sans-serif;
          font-size: 0.96rem; line-height: 1.75; color: var(--mid); margin-bottom: 16px;
        }

        /* ── FULL-BLEED STRIP ────────────────────────────────────────── */
        .td-strip {
          height: 420px; position: relative; overflow: hidden;
          display: flex; align-items: center; justify-content: center;
        }
        .td-strip-bg {
          position: absolute; inset: 0;
          background-size: cover; background-position: center;
        }
        .td-strip-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.4); }
        .td-strip-text {
          position: relative; z-index: 1; text-align: center;
          max-width: 680px; padding: 0 40px;
        }
        .td-strip-quote {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3vw, 2.8rem); font-weight: 300; font-style: italic;
          color: white; line-height: 1.35;
        }
        .td-strip-attr {
          font-family: 'Inter', sans-serif; font-size: 0.54rem;
          letter-spacing: 0.28em; text-transform: uppercase;
          color: var(--clay); margin-top: 20px;
        }

        /* ── ITINERARY ───────────────────────────────────────────────── */
        .td-itinerary { background: var(--mist); padding: 100px; }
        .td-section-header { text-align: center; margin-bottom: 72px; }
        .td-section-header .td-section-h2 { font-size: clamp(2.4rem, 4vw, 3.8rem); }
        .td-itin-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 4px; max-width: 1240px; margin: 0 auto;
        }

        /* Day card */
        .td-day-card {
          background: var(--cream); padding: 40px; position: relative;
          transition: box-shadow 0.4s, transform 0.4s;
        }
        .td-day-card:nth-child(even) { background: white; }
        .td-day-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(to right, var(--clay), #B7A090);
        }
        .td-day-card:hover {
          box-shadow: 0 16px 56px rgba(43,43,43,0.08);
          transform: translateY(-2px); z-index: 1; position: relative;
        }
        .td-day-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.85rem; letter-spacing: 0.15em; text-transform: uppercase;
          color: var(--clay); margin-bottom: 10px;
        }
        .td-day-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem; font-weight: 400; color: #333;
          margin-bottom: 16px; line-height: 1.3;
        }
        .td-day-exp {
          font-family: 'Lato', sans-serif;
          font-size: 0.88rem; line-height: 1.75; color: var(--mid); margin-bottom: 20px;
        }
        .td-day-foot {
          display: flex; align-items: center; gap: 10px;
          padding: 16px 0 0; border-top: 1px solid rgba(183,200,181,0.35);
          font-size: 0.78rem; color: var(--soft); font-family: 'Lato', sans-serif;
        }
        .td-day-foot::before { content: ''; width: 14px; height: 1px; background: var(--sage); flex-shrink: 0; }

        /* ── ITIN PHOTO STRIP ────────────────────────────────────────── */
        .td-itin-strip {
          display: flex; gap: 4px;
          max-width: 1240px; margin: 4px auto 0; height: 260px; overflow: hidden;
        }
        .td-itin-strip-cell { flex: 1; overflow: hidden; }
        .td-itin-strip-cell.large { flex: 2; }
        .td-itin-strip-cell img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform 0.6s ease;
        }
        .td-itin-strip-cell:hover img { transform: scale(1.05); }

        /* ── HARSHA VOICE ────────────────────────────────────────────── */
        .td-harsha {
          background: #DDE5DF; padding: 100px;
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
        }
        .td-harsha-img-wrap { position: relative; }
        .td-harsha-img-wrap > img {
          width: 100%; height: 520px; object-fit: cover;
          object-position: center top; display: block;
        }
        .td-harsha-float {
          position: absolute; bottom: -24px; right: -24px;
          width: 45%; height: 200px; overflow: hidden;
          border: 4px solid white;
          box-shadow: 0 12px 40px rgba(0,0,0,0.18);
        }
        .td-harsha-float img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .td-harsha-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 3vw, 2.8rem); font-weight: 300; font-style: italic;
          color: #333; margin-bottom: 28px;
        }
        .td-harsha-p {
          font-family: 'Lato', sans-serif;
          font-size: 0.96rem; line-height: 1.75; color: var(--mid); margin-bottom: 14px;
        }
        .td-sig {
          margin-top: 36px; display: flex; align-items: center; gap: 14px;
          font-family: 'Cormorant Garamond', serif; font-style: italic;
          font-size: 1.1rem; color: var(--clay);
        }
        .td-sig::before { content: ''; width: 28px; height: 1px; background: var(--clay); }

        /* ── GALLERY ─────────────────────────────────────────────────── */
        .td-gallery { background: var(--ink); }
        .td-gallery-header { padding: 80px 100px 48px; }
        .td-gallery-header .td-section-h2 { color: rgba(255,255,255,0.9); }
        .td-gallery-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          grid-template-rows: 280px 200px;
          gap: 4px;
        }
        .td-gallery-cell { overflow: hidden; position: relative; cursor: pointer; }
        .td-gallery-cell img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform 0.6s ease, filter 0.4s;
          filter: brightness(0.85);
        }
        .td-gallery-cell:hover img { transform: scale(1.06); filter: brightness(1); }
        .td-gallery-cell.span2 { grid-column: span 2; }
        .td-gallery-cell.row2  { grid-row: span 2; }
        .td-gallery-label {
          position: absolute; bottom: 14px; left: 14px;
          font-family: 'Inter', sans-serif; font-size: 0.5rem;
          letter-spacing: 0.22em; text-transform: uppercase; color: rgba(255,255,255,0.65);
        }

        /* ── INCLUDED ────────────────────────────────────────────────── */
        .td-included {
          background: white; padding: 100px;
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px;
        }
        .td-inc-h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.9rem; font-weight: 400; color: #333; margin-bottom: 28px;
        }
        .td-inc-list { list-style: none; display: flex; flex-direction: column; gap: 14px; }
        .td-inc-list li {
          font-family: 'Lato', sans-serif; font-size: 0.9rem; line-height: 1.7;
          color: var(--mid); padding-left: 26px; position: relative;
        }
        .td-inc-list.yes li::before { content: '✓'; position: absolute; left: 0; color: var(--clay); font-weight: 600; }
        .td-inc-list.no  li::before { content: '—'; position: absolute; left: 0; color: #999; }

        /* ── TESTIMONIALS ────────────────────────────────────────────── */
        .td-testimonials { background: var(--mist); padding: 100px; }
        .td-test-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(280px,1fr));
          gap: 16px; max-width: 1100px; margin: 0 auto;
        }
        .td-test-card {
          background: white; padding: 36px;
          border-left: 2px solid var(--clay);
        }
        .td-test-q {
          font-family: 'Cormorant Garamond', serif; font-style: italic;
          font-size: 1.15rem; line-height: 1.6; color: #333; margin-bottom: 24px;
        }
        .td-test-name {
          font-family: 'Inter', sans-serif; font-size: 0.58rem;
          letter-spacing: 0.25em; text-transform: uppercase; color: var(--soft);
        }

        /* ── CTA ─────────────────────────────────────────────────────── */
        .td-cta { background: var(--cream); padding: 120px 100px; text-align: center; }
        .td-cta-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.8rem, 5vw, 4.5rem); font-weight: 300; line-height: 1.1;
          color: #333; margin-bottom: 28px;
        }
        .td-cta-h2 em { font-style: italic; color: var(--clay); }
        .td-cta-p {
          font-family: 'Lato', sans-serif; font-size: 0.95rem; line-height: 1.75;
          color: var(--mid); max-width: 500px; margin: 0 auto 48px;
        }
        .td-cta-btn {
          display: inline-flex; align-items: center; gap: 16px;
          font-family: 'Inter', sans-serif; font-size: 0.62rem; font-weight: 600;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: white; text-decoration: none; padding: 20px 40px;
          background: #333; position: relative; overflow: hidden;
          transition: gap 0.3s;
        }
        .td-cta-btn::after {
          content: ''; position: absolute; inset: 0; background: var(--clay);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.45s cubic-bezier(.16,1,.3,1);
        }
        .td-cta-btn:hover::after { transform: scaleX(1); }
        .td-cta-btn:hover { gap: 26px; }
        .td-cta-btn span { position: relative; z-index: 1; }

        /* ── RESPONSIVE ──────────────────────────────────────────────── */
        @media (max-width: 1024px) {
          .td-hero-content     { padding: 80px 60px; }
          .td-philosophy       { padding: 80px; gap: 60px; }
          .td-itinerary        { padding: 80px; }
          .td-harsha           { padding: 80px; gap: 60px; }
          .td-included         { padding: 80px; gap: 60px; }
          .td-testimonials     { padding: 80px; }
          .td-cta              { padding: 80px; }
          .td-gallery-header   { padding: 60px 80px 36px; }
        }
        @media (max-width: 768px) {
          .td-hero-content     { padding: 60px 32px; }
          .td-scroll-hint      { display: none; }
          .td-mosaic           { grid-template-columns: 1fr 1fr; grid-template-rows: 220px 180px; }
          .td-philosophy       { grid-template-columns: 1fr; padding: 60px 32px; gap: 48px; }
          .td-itinerary        { padding: 60px 32px; }
          .td-itin-grid        { grid-template-columns: 1fr; }
          .td-itin-strip       { height: 180px; }
          .td-harsha           { grid-template-columns: 1fr; padding: 60px 32px; gap: 48px; }
          .td-harsha-float     { display: none; }
          .td-gallery-grid     { grid-template-columns: 1fr 1fr; grid-template-rows: repeat(3, 200px); }
          .td-gallery-header   { padding: 60px 32px 32px; }
          .td-included         { grid-template-columns: 1fr; padding: 60px 32px; gap: 48px; }
          .td-testimonials     { padding: 60px 32px; }
          .td-cta              { padding: 80px 32px; }
          .td-strip            { height: 320px; }
          .td-strip-quote      { font-size: 1.5rem; }
        }
      `}</style>

      <div className="grain" aria-hidden="true" />
      <div className="td-progress" style={{ width: `${progress}%` }} aria-hidden="true" />

      <Nav />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="td-hero">
        <div
          className="td-hero-bg"
          style={{ backgroundImage: `url('${imgs.hero}')` }}
        />
        <div className="td-hero-overlay" />
        <div className="td-hero-content">
          <div className="td-crumb">
            <Link to="/">Home</Link>
            <span>→</span>
            <span>{trip.name}</span>
          </div>
          <p className="td-eyebrow">{trip.subtitle}</p>
          <h1 className="td-h1">{trip.name}</h1>
          <p className="td-tagline">{trip.tagline}</p>
          <div className="td-meta">
            <div className="td-meta-item">
              <span className="td-meta-label">Duration</span>
              <span className="td-meta-val">{trip.duration}</span>
            </div>
            <div className="td-meta-item">
              <span className="td-meta-label">Dates</span>
              <span className="td-meta-val">{trip.dates}</span>
            </div>
            <div className="td-meta-item">
              <span className="td-meta-label">Group Size</span>
              <span className="td-meta-val">{trip.groupSize}</span>
            </div>
            <div className="td-meta-item">
              <span className="td-meta-label">Investment</span>
              <span className="td-meta-val">{trip.price}</span>
            </div>
          </div>
        </div>
        <div className="td-scroll-hint" aria-hidden="true">
          <div className="td-scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ── INTRO MOSAIC ──────────────────────────────────────────── */}
      <IntroMosaic images={imgs.mosaic} />

      {/* ── WHY THIS JOURNEY ──────────────────────────────────────── */}
      <section className="td-philosophy">
        <FU>
          <p className="td-section-eyebrow">Why This Journey</p>
          <h2 className="td-section-h2">{trip.philosophy?.title}</h2>
          {trip.philosophy?.paragraphs?.map((p, i) => (
            <p key={i} className="td-body-p">{p}</p>
          ))}
        </FU>
        <FU d={1}>
          <img
            className="td-phil-img"
            src={imgs.philosophy}
            alt={trip.name}
            loading="lazy"
          />
          <p className="td-phil-img-caption">{imgs.philosophyCaption}</p>
        </FU>
      </section>

      {/* ── QUOTE STRIP 1 ─────────────────────────────────────────── */}
      <FullBleedStrip
        src={imgs.strip1}
        quote={trip.harshaVoice?.stripQuote || `In ${trip.name}, you are not a tourist. You are a guest.`}
        attr="Harsha, Founder"
      />

      {/* ── ITINERARY ─────────────────────────────────────────────── */}
      <section className="td-itinerary">
        <div className="td-section-header">
          <FU>
            <p className="td-section-eyebrow">The Journey</p>
            <h2 className="td-section-h2">Day-by-Day</h2>
          </FU>
        </div>

        {/* First half of days */}
        <div className="td-itin-grid">
          {itinFirst.map((day, i) => (
            <FU key={i} d={i % 4 * 0.7}>
              <div className="td-day-card">
                <p className="td-day-num">Day {day.day}</p>
                <h3 className="td-day-title">{day.title}</h3>
                <p className="td-day-exp">{day.experience}</p>
                <p className="td-day-foot">Overnight: {day.overnight}</p>
              </div>
            </FU>
          ))}
        </div>

        {/* Photo strip between day groups */}
        <FU d={0.1}>
          <ItinPhotoStrip images={imgs.itinStrip} />
        </FU>

        {/* Second half of days */}
        {itinLast.length > 0 && (
          <div className="td-itin-grid" style={{ marginTop: '4px' }}>
            {itinLast.map((day, i) => (
              <FU key={i} d={i % 4 * 0.7}>
                <div className="td-day-card">
                  <p className="td-day-num">Day {day.day}</p>
                  <h3 className="td-day-title">{day.title}</h3>
                  <p className="td-day-exp">{day.experience}</p>
                  <p className="td-day-foot">Overnight: {day.overnight}</p>
                </div>
              </FU>
            ))}
          </div>
        )}
      </section>

      {/* ── HARSHA VOICE ──────────────────────────────────────────── */}
      {trip.harshaVoice && (
        <section className="td-harsha">
          <FU>
            <div className="td-harsha-img-wrap">
              <img src={imgs.harshaMain} alt={`${trip.name} landscape`} loading="lazy" />
              <div className="td-harsha-float">
                <img src={imgs.harshaFloat} alt={`${trip.name} detail`} loading="lazy" />
              </div>
            </div>
          </FU>
          <FU d={1}>
            <p className="td-section-eyebrow">Founder's Note</p>
            <h2 className="td-harsha-h2">{trip.harshaVoice.title}</h2>
            <p className="td-harsha-p">{trip.harshaVoice.content}</p>
            <div className="td-sig">Harsha</div>
          </FU>
        </section>
      )}

      {/* ── PHOTO GALLERY ─────────────────────────────────────────── */}
      <div className="td-gallery">
        <div className="td-gallery-header">
          <FU>
            <p className="td-section-eyebrow" style={{ color: 'var(--clay)' }}>
              The Landscape
            </p>
            <h2 className="td-section-h2">Moments from {trip.name}</h2>
          </FU>
        </div>
        <GalleryGrid images={imgs.gallery} />
      </div>

      {/* ── INCLUDED ──────────────────────────────────────────────── */}
      <section className="td-included">
        <FU>
          <h3 className="td-inc-h3">What's Included</h3>
          <ul className="td-inc-list yes">
            {trip.included?.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </FU>
        <FU d={1}>
          <h3 className="td-inc-h3">Not Included</h3>
          <ul className="td-inc-list no">
            {trip.notIncluded?.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </FU>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────── */}
      {trip.testimonials?.length > 0 && (
        <section className="td-testimonials">
          <div className="td-section-header">
            <FU>
              <p className="td-section-eyebrow">Past Travellers</p>
              <h2 className="td-section-h2">Voices from the Journey</h2>
            </FU>
          </div>
          <div className="td-test-grid">
            {trip.testimonials.map((t, i) => (
              <FU key={i} d={i * 0.1}>
                <div className="td-test-card">
                  <p className="td-test-q">"{t.quote}"</p>
                  <p className="td-test-name">{t.name}</p>
                </div>
              </FU>
            ))}
          </div>
        </section>
      )}

      {/* ── CLOSING STRIP ─────────────────────────────────────────── */}
      <FullBleedStrip src={imgs.strip2} />

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="td-cta">
        <FU>
          <h2 className="td-cta-h2">
            Ready to begin<br />this <em>journey?</em>
          </h2>
          <p className="td-cta-p">
            Every journey starts with a conversation. Message Harsha on WhatsApp
            to discuss {trip.name}, ask questions, or simply explore if this is
            the right journey for you.
          </p>
          <a
            href={`https://wa.me/+971562216643?text=I'm%20interested%20in%20${encodeURIComponent(trip.name)}`}
            className="td-cta-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Message Harsha →</span>
          </a>
        </FU>
      </section>

      <Footer />
    </>
  );
}