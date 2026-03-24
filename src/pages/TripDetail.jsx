import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { tripsData } from '../data/trips';

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
    <div ref={ref} className={`fu${vis ? ' in' : ''} ${className}`}
      style={{ transitionDelay: `${d * 0.14}s`, ...style }}>
      {children}
    </div>
  );
}

/* 2026 destinations only: bhutan, ladakh, bali, japan */
const LOCATION_IMAGES = {
  bhutan: {
    hero: '/assets/hero-bhutan.jpg',
    harshaMain: '/assets/harsha-portrait.jpg',
    harshaFloat: '/assets/Heera-1024x478.jpg',
    photoCredit: 'Kelly Dorji',
    mosaic: [
      { src: '/assets/rama-krushna-behera-LIE0mImer3A-unsplash.jpg', tall: true },
      { src: '/assets/chandan-chaurasia-ceztog4F6no-unsplash.jpg' },
      { src: '/assets/sujan-mongar-YWbHCrwmD2E-unsplash.jpg' },
      { src: '/assets/rama-krushna-behera-ly_E7ZIGFWk-unsplash.jpg', wide: true },
    ],
    philosophy: '/assets/tanay-dedhia-nanaWJMn-Dw-unsplash.jpg',
    philosophyCaption: '',
    strip1: '/assets/penden-wangchuk-HMVWJy49X5Q-unsplash.jpg',
    itinStrip: [
      { src: '/assets/chandan-chaurasia-y_CydLKoGhw-unsplash.jpg', large: true },
      { src: '/assets/gaurav-bagdi-E7UC4S79RpY-unsplash.jpg' },
      { src: '/assets/nihar-modi-uMbGXBy7bKs-unsplash.jpg' },
    ],
    gallery: [
      { src: '/assets/journey-bhutan.jpg', span2: true, row2: true },
      { src: '/assets/serge-pareit-N5oJbLEFLoU-unsplash.jpg' },
      { src: '/assets/sujan-mongar-2EBstxZp9ro-unsplash.jpg' },
      { src: '/assets/prateek-katyal-8wmEXx5QtgM-unsplash.jpg', span2: true },
    ],
    strip2: '/assets/ugyen-tenzin-KsvEeDFUaQI-unsplash.jpg',
  },

  ladakh: {
    hero: '/assets/hero-ladakh.jpg',
    harshaMain: '/assets/harsha-portrait.jpg',
    harshaFloat: '/assets/Heera-1024x478.jpg',
    photoCredit: null,
    mosaic: [
      { src: '/assets/ladakh-1.jpg', tall: true },
      { src: '/assets/ladakh-2.jpg' },
      { src: '/assets/ladakh-3.jpg' },
      { src: '/assets/ladakh-4.jpg', wide: true },
    ],
    philosophy: '/assets/ladakh-philosophy.jpg',
    philosophyCaption: '',
    strip1: '/assets/ladakh-strip1.jpg',
    itinStrip: [
      { src: '/assets/ladakh-itin1.jpg', large: true },
      { src: '/assets/ladakh-itin2.jpg' },
      { src: '/assets/ladakh-itin3.jpg' },
    ],
    gallery: [
      { src: '/assets/ladakh-gallery1.jpg', span2: true, row2: true },
      { src: '/assets/ladakh-gallery2.jpg' },
      { src: '/assets/ladakh-gallery3.jpg' },
      { src: '/assets/ladakh-gallery4.jpg', span2: true },
    ],
    strip2: '/assets/ladakh-strip2.jpg',
  },

  bali: {
    hero: '/assets/hero-bali.jpg',
    harshaMain: '/assets/harsha-portrait.jpg',
    harshaFloat: '/assets/Heera-1024x478.jpg',
    photoCredit: null,
    mosaic: [
      { src: '/assets/bali-1.jpg', tall: true },
      { src: '/assets/bali-2.jpg' },
      { src: '/assets/bali-3.jpg' },
      { src: '/assets/bali-4.jpg', wide: true },
    ],
    philosophy: '/assets/bali-philosophy.jpg',
    philosophyCaption: '',
    strip1: '/assets/bali-strip1.jpg',
    itinStrip: [
      { src: '/assets/bali-itin1.jpg', large: true },
      { src: '/assets/bali-itin2.jpg' },
      { src: '/assets/bali-itin3.jpg' },
    ],
    gallery: [
      { src: '/assets/bali-gallery1.jpg', span2: true, row2: true },
      { src: '/assets/bali-gallery2.jpg' },
      { src: '/assets/bali-gallery3.jpg' },
      { src: '/assets/bali-gallery4.jpg', span2: true },
    ],
    strip2: '/assets/bali-strip2.jpg',
  },

  japan: {
    hero: '/assets/hero-japan.jpg',
    harshaMain: '/assets/harsha-portrait.jpg',
    harshaFloat: '/assets/Heera-1024x478.jpg',
    photoCredit: null,
    mosaic: [
      { src: '/assets/hokkaido-1.jpg', tall: true },
      { src: '/assets/hokkaido-2.jpg' },
      { src: '/assets/hokkaido-3.jpg' },
      { src: '/assets/hokkaido-4.jpg', wide: true },
    ],
    philosophy: '/assets/hokkaido-philosophy.jpg',
    philosophyCaption: '',
    strip1: '/assets/hokkaido-strip1.jpg',
    itinStrip: [
      { src: '/assets/hokkaido-itin1.jpg', large: true },
      { src: '/assets/hokkaido-itin2.jpg' },
      { src: '/assets/hokkaido-itin3.jpg' },
    ],
    gallery: [
      { src: '/assets/hokkaido-gallery1.jpg', span2: true, row2: true },
      { src: '/assets/hokkaido-gallery2.jpg' },
      { src: '/assets/hokkaido-gallery3.jpg' },
      { src: '/assets/hokkaido-gallery4.jpg', span2: true },
    ],
    strip2: '/assets/hokkaido-strip2.jpg',
  },
};

const DEFAULT_IMAGES = LOCATION_IMAGES.bhutan;

function IntroMosaic({ images }) {
  return (
    <div className="td-mosaic">
      {images.map((img, i) => (
        <div key={i} className={`td-mosaic-cell${img.tall ? ' tall' : ''}${img.wide ? ' wide' : ''}`}>
          <img src={img.src} alt={img.caption || ''} loading="lazy" />
          {img.caption && <div className="td-mosaic-caption">{img.caption}</div>}
        </div>
      ))}
    </div>
  );
}

function FullBleedStrip({ src, quote, attr, photoCredit }) {
  return (
    <div className="td-strip">
      <div className="td-strip-bg" style={{ backgroundImage: `url('${src}')` }} />
      <div className="td-strip-overlay" />
      {quote && (
        <div className="td-strip-text">
          <p className="td-strip-quote">"{quote}"</p>
          {attr && <p className="td-strip-attr">{attr}</p>}
        </div>
      )}
      {photoCredit && (
        <span className="td-photo-credit">Photo: {photoCredit}</span>
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
        <div key={i} className={`td-gallery-cell${img.span2 ? ' span2' : ''}${img.row2 ? ' row2' : ''}`}>
          <img src={img.src} alt={img.label || ''} loading="lazy" />
          {img.label && <div className="td-gallery-label">{img.label}</div>}
        </div>
      ))}
    </div>
  );
}

export default function TripDetail({ tripSlug }) {
  const [progress, setProgress] = useState(0);
  const trip = tripsData[tripSlug];
  const imgs = LOCATION_IMAGES[tripSlug] || DEFAULT_IMAGES;

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
      <div style={{ padding: '100px 20px', textAlign: 'center', fontFamily: 'Lato, sans-serif', fontSize: '18px', color: '#2B2B2B' }}>
        This journey is being crafted. <a href="https://wa.me/+971562216643" style={{ color: '#C9A8A8' }}>Message Harsha</a> to learn more.
      </div>
    );
  }

  const hasItinerary = trip.itinerary && trip.itinerary.length > 0;
  const half = Math.ceil((trip.itinerary?.length || 0) / 2);
  const itinFirst = trip.itinerary?.slice(0, half) || [];
  const itinLast = trip.itinerary?.slice(half) || [];

  return (
    <>
      <style>{`
        :root {
          --clay: #C9A8A8;
          --sage: #DDE5DF;
          --cream: #FAFAF8;
          --mist: #F2ECE5;
          --ink: #2B2B2B;
          --mid: #404040;
          --soft: #606060;
        }
        .td-progress {
          position: fixed; top: 0; left: 0; height: 2px;
          background: var(--clay); z-index: 999;
          transition: width 0.1s linear;
        }
        .fu { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .fu.in { opacity: 1; transform: translateY(0); }

        /* Hero */
        .td-hero { min-height: 100vh; position: relative; overflow: hidden; display: flex; align-items: flex-end; }
        .td-hero-bg { position: absolute; inset: 0; background-size: cover; background-position: center; }
        .td-hero-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.10) 100%); }
        .td-hero-content { position: relative; z-index: 2; padding: 80px 100px; max-width: 900px; }
        .td-crumb { font-family: 'Lato', sans-serif; font-size: 14px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.55); margin-bottom: 20px; display: flex; gap: 10px; align-items: center; }
        .td-crumb a { color: rgba(255,255,255,0.7); text-decoration: none; transition: color .3s; }
        .td-crumb a:hover { color: var(--clay); }
        .td-eyebrow { font-family: 'Lato', sans-serif; font-size: 14px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--clay); margin-bottom: 18px; }
        /* Brief 2.10: All headings Charcoal. On dark bg, white is acceptable. */
        .td-h1 { font-family: 'Cormorant Garamond', serif; font-size: clamp(3.8rem, 7vw, 6.5rem); font-weight: 300; line-height: 0.95; color: white; margin-bottom: 20px; }
        .td-tagline { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1.45rem; color: rgba(255,255,255,0.8); margin-bottom: 36px; }
        .td-meta { display: flex; gap: 48px; flex-wrap: wrap; }
        .td-meta-item { display: flex; flex-direction: column; gap: 5px; }
        .td-meta-label { font-size: 14px; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.45); font-family: 'Lato', sans-serif; }
        .td-meta-val { font-family: 'Lato', sans-serif; font-size: 16px; color: rgba(255,255,255,0.9); }

        /* Photo credit: Brief 6d */
        .td-photo-credit, .td-hero-photo-credit {
          position: absolute; bottom: 16px; right: 16px; z-index: 3;
          font-family: 'Lato', sans-serif; font-size: 12px;
          color: #ffffff; text-shadow: 0 1px 3px rgba(0,0,0,0.5);
        }

        .td-scroll-hint { position: absolute; bottom: 40px; right: 100px; z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 10px; font-family: 'Lato', sans-serif; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.35); }
        .td-scroll-line { width: 1px; height: 48px; background: rgba(255,255,255,0.2); position: relative; overflow: hidden; }
        .td-scroll-line::after { content: ''; position: absolute; top: -50%; left: 0; right: 0; height: 50%; background: rgba(255,255,255,0.6); animation: tdScrollDown 1.8s infinite ease-in-out; }
        @keyframes tdScrollDown { 0%{top:-50%} 100%{top:100%} }

        /* Mosaic */
        .td-mosaic { display: grid; grid-template-columns: 1.2fr 0.8fr 1fr; grid-template-rows: 320px 220px; gap: 6px; background: var(--ink); }
        .td-mosaic-cell { overflow: hidden; position: relative; }
        .td-mosaic-cell img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.7s ease; }
        .td-mosaic-cell:hover img { transform: scale(1.04); }
        .td-mosaic-cell.tall { grid-row: span 2; }
        .td-mosaic-cell.wide { grid-column: span 2; }
        .td-mosaic-caption { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(0,0,0,0.62), transparent); padding: 22px 16px 12px; font-family: 'Lato', sans-serif; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.7); }

        /* Philosophy */
        .td-philosophy { background: white; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; padding: 100px; align-items: start; }
        .td-phil-img { width: 100%; height: 480px; object-fit: cover; display: block; }
        .td-phil-img-caption { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 14px; color: var(--soft); margin-top: 14px; padding-left: 16px; border-left: 2px solid var(--clay); }
        .td-section-eyebrow { font-family: 'Lato', sans-serif; font-size: 14px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--clay); margin-bottom: 20px; }
        /* Brief 2.10: headings Charcoal */
        .td-section-h2 { font-family: 'Cormorant Garamond', serif; font-size: clamp(2rem, 3.2vw, 3rem); font-weight: 300; line-height: 1.2; color: #2B2B2B; margin-bottom: 32px; }
        .td-body-p { font-family: 'Lato', sans-serif; font-size: 16px; line-height: 1.75; color: var(--mid); margin-bottom: 16px; }

        /* Strip */
        .td-strip { height: 420px; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; }
        .td-strip-bg { position: absolute; inset: 0; background-size: cover; background-position: center; }
        .td-strip-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.4); }
        .td-strip-text { position: relative; z-index: 1; text-align: center; max-width: 680px; padding: 0 40px; }
        .td-strip-quote { font-family: 'Cormorant Garamond', serif; font-size: clamp(1.8rem, 3vw, 2.8rem); font-weight: 300; font-style: italic; color: white; line-height: 1.35; }
        .td-strip-attr { font-family: 'Lato', sans-serif; font-size: 14px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--clay); margin-top: 20px; }

        /* Itinerary */
        .td-itinerary { background: #F2ECE5; padding: 100px; }
        .td-section-header { text-align: center; margin-bottom: 72px; }
        .td-section-header .td-section-h2 { font-size: clamp(2.4rem, 4vw, 3.8rem); }
        .td-itin-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; max-width: 1240px; margin: 0 auto; }
        .td-day-card { background: var(--cream); padding: 40px; position: relative; transition: box-shadow 0.4s, transform 0.4s; }
        .td-day-card:nth-child(even) { background: white; }
        .td-day-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(to right, var(--clay), #A07878); }
        .td-day-card:hover { box-shadow: 0 16px 56px rgba(43,43,43,0.08); transform: translateY(-2px); z-index: 1; position: relative; }
        /* Brief 6e: Day number in Clay Rose */
        .td-day-num { font-family: 'Cormorant Garamond', serif; font-size: 16px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--clay); margin-bottom: 10px; }
        /* Brief 6e: Day title in Charcoal */
        .td-day-title { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 400; color: #2B2B2B; margin-bottom: 16px; line-height: 1.3; }
        .td-day-exp { font-family: 'Lato', sans-serif; font-size: 16px; line-height: 1.75; color: var(--mid); margin-bottom: 20px; }
        .td-day-foot { display: flex; align-items: center; gap: 10px; padding: 16px 0 0; border-top: 1px solid rgba(183,200,181,0.35); font-size: 14px; color: var(--soft); font-family: 'Lato', sans-serif; }
        .td-day-foot::before { content: ''; width: 14px; height: 1px; background: #DDE5DF; flex-shrink: 0; }

        /* Itin photo strip */
        .td-itin-strip { display: flex; gap: 4px; max-width: 1240px; margin: 4px auto 0; height: 260px; overflow: hidden; }
        .td-itin-strip-cell { flex: 1; overflow: hidden; }
        .td-itin-strip-cell.large { flex: 2; }
        .td-itin-strip-cell img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.6s ease; }
        .td-itin-strip-cell:hover img { transform: scale(1.05); }

        /* Harsha voice */
        .td-harsha { background: #DDE5DF; padding: 100px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .td-harsha-img-wrap { position: relative; }
        .td-harsha-img-wrap > img { width: 100%; height: 520px; object-fit: cover; object-position: center top; display: block; }
        .td-harsha-float { position: absolute; bottom: -24px; right: -24px; width: 45%; height: 200px; overflow: hidden; border: 4px solid white; box-shadow: 0 12px 40px rgba(0,0,0,0.18); }
        .td-harsha-float img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .td-harsha-h2 { font-family: 'Cormorant Garamond', serif; font-size: clamp(2rem, 3vw, 2.8rem); font-weight: 300; font-style: italic; color: #2B2B2B; margin-bottom: 28px; }
        .td-harsha-p { font-family: 'Lato', sans-serif; font-size: 16px; line-height: 1.75; color: var(--mid); margin-bottom: 14px; }
        .td-sig { margin-top: 36px; display: flex; align-items: center; gap: 14px; font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1.1rem; color: var(--clay); }
        .td-sig::before { content: ''; width: 28px; height: 1px; background: var(--clay); }

        /* Gallery */
        .td-gallery { background: var(--ink); }
        .td-gallery-header { padding: 80px 100px 48px; }
        .td-gallery-header .td-section-h2 { color: rgba(255,255,255,0.9); }
        .td-gallery-grid { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; grid-template-rows: 280px 200px; gap: 4px; }
        .td-gallery-cell { overflow: hidden; position: relative; cursor: pointer; }
        .td-gallery-cell img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.6s ease, filter 0.4s; filter: brightness(0.85); }
        .td-gallery-cell:hover img { transform: scale(1.06); filter: brightness(1); }
        .td-gallery-cell.span2 { grid-column: span 2; }
        .td-gallery-cell.row2 { grid-row: span 2; }
        .td-gallery-label { position: absolute; bottom: 14px; left: 14px; font-family: 'Lato', sans-serif; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.65); }

        /* Included */
        .td-included { background: white; padding: 100px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; }
        .td-inc-h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.9rem; font-weight: 400; color: #2B2B2B; margin-bottom: 28px; }
        .td-inc-list { list-style: none; display: flex; flex-direction: column; gap: 14px; }
        .td-inc-list li { font-family: 'Lato', sans-serif; font-size: 16px; line-height: 1.7; color: var(--mid); padding-left: 26px; position: relative; }
        .td-inc-list.yes li::before { content: '\u2713'; position: absolute; left: 0; color: var(--clay); font-weight: 600; }
        .td-inc-list.no li::before { content: '\u2014'; position: absolute; left: 0; color: #999; }

        /* Testimonials */
        .td-testimonials { background: #F2ECE5; padding: 100px; }
        .td-test-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px,1fr)); gap: 16px; max-width: 1100px; margin: 0 auto; }
        .td-test-card { background: white; padding: 36px; border-left: 2px solid var(--clay); }
        .td-test-q { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1.15rem; line-height: 1.6; color: #2B2B2B; margin-bottom: 24px; }
        .td-test-name { font-family: 'Lato', sans-serif; font-size: 14px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--soft); }

        /* CTA */
        .td-cta { background: var(--cream); padding: 120px 100px; text-align: center; }
        /* Brief 2.10: No colour in headings */
        .td-cta-h2 { font-family: 'Cormorant Garamond', serif; font-size: clamp(2.8rem, 5vw, 4.5rem); font-weight: 300; line-height: 1.1; color: #2B2B2B; margin-bottom: 28px; }
        .td-cta-h2 em { font-style: italic; }
        .td-cta-p { font-family: 'Lato', sans-serif; font-size: 16px; line-height: 1.75; color: var(--mid); max-width: 500px; margin: 0 auto 48px; }
        /* Brief 6a: CTA spec */
        .td-cta-btn {
          display: inline-block;
          font-family: 'Lato', sans-serif; font-size: 16px; font-weight: 700;
          color: #2B2B2B; text-decoration: none; padding: 16px 32px;
          background: #C9A8A8; border-radius: 4px;
          transition: background 0.35s, color 0.35s;
        }
        .td-cta-btn:hover { background: #A07878; color: #FAFAF8; }

        /* Coming soon state for trips without itineraries */
        .td-coming-soon {
          background: var(--mist); padding: 100px; text-align: center;
        }
        .td-coming-soon-h2 {
          font-family: 'Cormorant Garamond', serif; font-size: clamp(2rem, 3vw, 3rem);
          font-weight: 300; font-style: italic; color: #2B2B2B; margin-bottom: 28px;
        }
        .td-coming-soon-p {
          font-family: 'Lato', sans-serif; font-size: 16px; line-height: 1.75;
          color: var(--mid); max-width: 500px; margin: 0 auto 40px;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .td-hero-content { padding: 80px 60px; }
          .td-philosophy { padding: 80px; gap: 60px; }
          .td-itinerary { padding: 80px; }
          .td-harsha { padding: 80px; gap: 60px; }
          .td-included { padding: 80px; gap: 60px; }
          .td-testimonials { padding: 80px; }
          .td-cta { padding: 80px; }
          .td-gallery-header { padding: 60px 80px 36px; }
        }
        @media (max-width: 768px) {
          .td-hero-content { padding: 60px 32px; }
          .td-scroll-hint { display: none; }
          .td-mosaic { grid-template-columns: 1fr 1fr; grid-template-rows: 220px 180px; }
          .td-philosophy { grid-template-columns: 1fr; padding: 60px 32px; gap: 48px; }
          .td-itinerary { padding: 60px 32px; }
          .td-itin-grid { grid-template-columns: 1fr; }
          .td-itin-strip { height: 180px; }
          .td-harsha { grid-template-columns: 1fr; padding: 60px 32px; gap: 48px; }
          .td-harsha-float { display: none; }
          .td-gallery-grid { grid-template-columns: 1fr 1fr; grid-template-rows: repeat(3, 200px); }
          .td-gallery-header { padding: 60px 32px 32px; }
          .td-included { grid-template-columns: 1fr; padding: 60px 32px; gap: 48px; }
          .td-testimonials { padding: 60px 32px; }
          .td-cta { padding: 80px 32px; }
          .td-strip { height: 320px; }
          .td-strip-quote { font-size: 1.5rem; }
        }
      `}</style>

      <div className="grain" aria-hidden="true" />
      <div className="td-progress" style={{ width: `${progress}%` }} aria-hidden="true" />

      <Nav />
      <WhatsAppButton />

      {/* Hero */}
      <section className="td-hero">
        <div className="td-hero-bg" style={{ backgroundImage: `url('${imgs.hero}')` }} />
        <div className="td-hero-overlay" />
        <div className="td-hero-content">
          <div className="td-crumb">
            <Link to="/">Home</Link>
            <span>{'\u2192'}</span>
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
        {imgs.photoCredit && (
          <span className="td-hero-photo-credit">Photo: {imgs.photoCredit}</span>
        )}
        <div className="td-scroll-hint" aria-hidden="true">
          <div className="td-scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* Mosaic */}
      <IntroMosaic images={imgs.mosaic} />

      {/* Why This Journey */}
      <section className="td-philosophy">
        <FU>
          <p className="td-section-eyebrow">Why This Journey</p>
          <h2 className="td-section-h2">{trip.philosophy?.title}</h2>
          {trip.philosophy?.paragraphs?.map((p, i) => (
            <p key={i} className="td-body-p">{p}</p>
          ))}
        </FU>
        <FU d={1}>
          <img className="td-phil-img" src={imgs.philosophy} alt={trip.name} loading="lazy" />
          {imgs.philosophyCaption && <p className="td-phil-img-caption">{imgs.philosophyCaption}</p>}
        </FU>
      </section>

      {/* Quote strip */}
      <FullBleedStrip
        src={imgs.strip1}
        quote={trip.harshaVoice?.stripQuote || `In ${trip.name}, you are welcomed as a guest.`}
        attr="Harsha, Founder"
        photoCredit={imgs.photoCredit}
      />

      {/* Itinerary or Coming Soon */}
      {hasItinerary ? (
        <section className="td-itinerary">
          <div className="td-section-header">
            <FU>
              <p className="td-section-eyebrow">The Journey</p>
              <h2 className="td-section-h2">Day by Day</h2>
            </FU>
          </div>

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

          <FU d={0.1}>
            <ItinPhotoStrip images={imgs.itinStrip} />
          </FU>

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
      ) : (
        <section className="td-coming-soon">
          <FU>
            <h2 className="td-coming-soon-h2">Itinerary being crafted</h2>
            <p className="td-coming-soon-p">
              The full day by day journey for {trip.name} is being carefully composed. Message Harsha to register your interest or ask questions.
            </p>
            <a href="https://wa.me/+971562216643" className="td-cta-btn" target="_blank" rel="noopener noreferrer">
              Message Harsha
            </a>
          </FU>
        </section>
      )}

      {/* Harsha Voice */}
      {trip.harshaVoice && (
        <section className="td-harsha">
          <FU>
            <div className="td-harsha-img-wrap">
              <img src={imgs.harshaMain} alt="Harsha" loading="lazy" />
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

      {/* Gallery */}
      <div className="td-gallery">
        <div className="td-gallery-header">
          <FU>
            <p className="td-section-eyebrow" style={{ color: 'var(--clay)' }}>The Landscape</p>
            <h2 className="td-section-h2">Moments from {trip.name}</h2>
          </FU>
        </div>
        <GalleryGrid images={imgs.gallery} />
      </div>

      {/* Included */}
      <section className="td-included">
        <FU>
          <h3 className="td-inc-h3">What is Included</h3>
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

      {/* Testimonials */}
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

      {/* Closing strip */}
      <FullBleedStrip src={imgs.strip2} />

      {/* CTA */}
      <section className="td-cta">
        <FU>
          <h2 className="td-cta-h2">
            Ready to begin<br />this <em>journey?</em>
          </h2>
          <p className="td-cta-p">
            Every journey starts with a conversation. Message Harsha on WhatsApp to discuss {trip.name}, ask questions, or simply explore if this is the right journey for you.
          </p>
          <a
            href={`https://wa.me/+971562216643?text=I'm%20interested%20in%20${encodeURIComponent(trip.name)}`}
            className="td-cta-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Message Harsha
          </a>
        </FU>
      </section>

      <Footer />
    </>
  );
}