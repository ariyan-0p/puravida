import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

// Fade-up hook
function useFadeUp() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function FU({ children, d = 0, className = "", style = {} }) {
  const [ref, vis] = useFadeUp();
  return (
    <div ref={ref} className={`fu${vis ? " in" : ""} ${className}`}
      style={{ transitionDelay: `${d * 0.15}s`, ...style }}>
      {children}
    </div>
  );
}

const JOURNEYS = [
  { 
    slug: "bhutan", 
    cls:"d-bhutan", 
    tag:"Himalayan Kingdom", 
    dest:"Bhutan", 
    sub:"Mountains & Monasteries", 
    desc:"There's a moment forty minutes into the Tiger's Nest climb where your lungs ache and your mind goes quiet. Everyone who's been knows the exact step.",
    dur:"8 Days", 
    dates:"April 9–16, 2026", 
    price:"From AED 12,100", 
    loc:"Paro Valley"
  },
  { 
    slug: "japan", 
    cls:"d-japan", 
    tag:"Island of Ritual", 
    dest:"Japan", 
    sub:"Stillness in Motion", 
    desc:"The tea master trained thirty years to perfect one gesture. Twelve days where ceremony meets spontaneity, and precision becomes gentle.",
    dur:"12 Days", 
    dates:"March 2026", 
    price:"From AED 18,500", 
    loc:"Arashiyama"
  },
  { 
    slug: "jordan", 
    cls:"d-jordan", 
    tag:"Ancient Light", 
    dest:"Jordan", 
    sub:"Desert & Deep Time", 
    desc:"The first night in Wadi Rum, silence is so complete you can't sleep. By night three, you understand—the desert gives you room, not peace.",
    dur:"8 Days", 
    dates:"November 2026", 
    price:"From AED 15,000", 
    loc:"Wadi Rum"
  },
  { 
    slug: "sri-lanka", 
    cls:"d-sl", 
    tag:"Jungle & Sea", 
    dest:"Sri Lanka", 
    sub:"Spice, Temple & Shore", 
    desc:"Sigiriya at first light. The climb takes an hour. The view—jungle to horizon—takes something from you and gives something back.",
    dur:"10 Days", 
    dates:"2026", 
    price:"From AED 16,000", 
    loc:"Galle Fort"
  },
];

const VOICES = [
  { q:"Bhutan wasn't a vacation. It was a recalibration. Harsha knew exactly when to speak and when to let the silence teach.", name:"Trissha", trip:"Bhutan · 2024", filter:"bhutan" },
  { q:"I went for the landscapes. What I found was Kelly, a grandmother pouring butter tea, and a monk explaining why some silences are louder than mantras.", name:"Priya", trip:"Bhutan · 2024", filter:"bhutan" },
  { q:"Japan taught me that ceremony and spontaneity aren't opposites. That precision can be gentle. Harsha held that space perfectly.", name:"Ananya", trip:"Japan · 2023", filter:"japan" },
  { q:"Wadi Rum at sunrise. Petra at blue hour. Bedouin tea poured slow. Jordan gave me quiet that cities can't manufacture.", name:"Rohan", trip:"Jordan · 2023", filter:"jordan" },
  { q:"The train from Kandy to Ella. Seven hours. No WiFi. Just windows and chai. That's when I stopped running.", name:"Suna", trip:"Sri Lanka · 2024", filter:"srilanka" },
];

const MARQUEE = [
  "Bhutan · Mountains & Monasteries","Japan · Stillness in Motion",
  "Jordan · Desert & Deep Time","Sri Lanka · Spice, Temple & Shore",
];

export default function Homepage() {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [voiceFilter, setVoiceFilter] = useState('all');

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 2700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const fn = () => {
      setProgress((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Drag-to-scroll
  const trackRef = useRef(null);
  const drag = useRef({ down: false, startX: 0, scrollLeft: 0 });
  const onMouseDown = useCallback((e) => {
    drag.current = { down: true, startX: e.pageX - trackRef.current.offsetLeft, scrollLeft: trackRef.current.scrollLeft };
  }, []);
  const onMouseUp = useCallback(() => { drag.current.down = false; }, []);
  const onMouseLeave = useCallback(() => { drag.current.down = false; }, []);
  const onMouseMove = useCallback((e) => {
    if (!drag.current.down) return;
    e.preventDefault();
    trackRef.current.scrollLeft = drag.current.scrollLeft - (e.pageX - trackRef.current.offsetLeft - drag.current.startX) * 1.5;
  }, []);

  const filteredVoices = voiceFilter === 'all' 
    ? VOICES 
    : VOICES.filter(v => v.filter === voiceFilter);

  return (
    <>
      <style>{`
        /* PRINCIPLE 1: Whitespace = Luxury */
        /* 80-100px padding, 1.7 line-height, 720px max width, never cluttered */
        
        /* PRINCIPLE 2: Restraint = Authority */
        /* Split hero layout (Vercel), one focal point, minimal overlays */
        .hero-vercel {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          background: var(--mist);
          position: relative;
        }
        .hero-vercel::after {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(to right, transparent 10%, #D9A6A1 50%, transparent 90%);
          opacity: 0.25;
        }
        
        .hero-left {
          display: flex; flex-direction: column; justify-content: center;
          padding: 0 100px; /* PRINCIPLE 1: 100px padding */
          position: relative; z-index: 2;
        }
        .hero-eyebrow {
          font-family: 'Inter', sans-serif;
          font-size: 0.52rem; font-weight: 400; letter-spacing: 0.36em;
          text-transform: uppercase; color: #B7A090;
          margin-bottom: 60px; /* PRINCIPLE 1: Generous margins */
          opacity: 0; animation: fadeUp 0.9s ease 2.2s forwards;
        }
        
        .hero-h1 {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; 
          line-height: 0.92; /* PRINCIPLE 1: Generous line-height for headers */
          font-size: clamp(5rem, 9vw, 9rem);
          color: #333333; 
          margin-bottom: 60px;
          max-width: 720px; /* PRINCIPLE 1: 720px max content width */
        }
        .hero-h1-line { display: block; overflow: hidden; }
        .hero-h1-inner { display: block; animation: revealUp 1.1s cubic-bezier(.16,1,.3,1) forwards; }
        .line1 { animation-delay: 2.4s; }
        .line2 { animation-delay: 2.6s; font-style: italic; color: #D9A6A1; }
        .line3 { animation-delay: 2.8s; }
        
        /* PRINCIPLE 4: Sensation-First Copy - "When you're ready" not "Book now" */
        .hero-sub {
          font-family: 'Lato', sans-serif;
          font-size: 1.05rem; font-weight: 300; 
          line-height: 1.7; /* PRINCIPLE 1: 1.7 line-height */
          color: #404040; 
          max-width: 580px; /* PRINCIPLE 1: Max content width */
          margin-bottom: 64px;
          opacity: 0; animation: fadeUp 0.9s ease 3s forwards;
        }
        .hero-cta {
          opacity: 0; animation: fadeUp 0.9s ease 3.2s forwards;
        }

        /* PRINCIPLE 2: Minimal text overlays, large image with generous margin */
        .hero-right {
          position: relative;
          background: url('/assets/hero-bhutan.jpg') center center / cover no-repeat,
            linear-gradient(158deg, #4a6050 0%, #2e3d32 40%, #141e16 100%);
          margin: 60px 60px 60px 0; /* PRINCIPLE 1: Generous margins */
        }
        .hero-right::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(to right, rgba(242,236,229,0.15) 0%, transparent 20%);
        }
        
        /* PRINCIPLE 2: Minimal overlay - only essential info */
        .hero-date-badge {
          position: absolute; top: 80px; right: 80px;
          width: 160px; height: 160px; border-radius: 50%;
          background: rgba(250,250,248,0.98); 
          border: 1px solid rgba(217,166,161,0.2);
          backdrop-filter: blur(20px);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          box-shadow: 0 16px 60px rgba(43,43,43,0.12);
          font-family: 'Inter', sans-serif;
          font-size: 0.52rem; font-weight: 600;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: #D9A6A1; line-height: 2;
          opacity: 0; animation: fadeUp 1.1s ease 3.4s forwards;
        }
        .hero-caption {
          position: absolute; bottom: 80px; left: 80px;
          font-family: 'Cormorant Garamond', serif; font-style: italic;
          font-size: 0.9rem; color: rgba(255,255,255,0.85);
          letter-spacing: 0.08em;
          opacity: 0; animation: fadeUp 1.1s ease 3.6s forwards;
        }

        /* PRINCIPLE 7: Horizontal scroll ticker */
        .marquee-strip {
          background: var(--white);
          border-top: 1px solid rgba(217,166,161,0.18);
          border-bottom: 1px solid rgba(217,166,161,0.18);
          padding: 20px 0; overflow: hidden;
        }
        .marquee-track { 
          display: flex; gap: 48px; 
          animation: marquee 32s linear infinite; 
        }
        .marquee-track span {
          font-family: 'Cormorant Garamond', serif; font-style: italic;
          font-size: 1.05rem; color: #404040; 
          letter-spacing: 0.06em; flex-shrink: 0;
        }
        @keyframes marquee { 
          from { transform: translateX(0); } 
          to { transform: translateX(-50%); } 
        }

        /* PRINCIPLE 6: Founder Everywhere - First-person voice */
        .founder-note {
          background: #DDE5DF; /* PRINCIPLE 9: Soft Sage */
          padding: 100px; /* PRINCIPLE 1: 100px padding */
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 100px; /* PRINCIPLE 1: Generous gaps */
          align-items: center;
        }
        .founder-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.54rem; font-weight: 400; 
          letter-spacing: 0.38em;
          text-transform: uppercase; color: #B7A090;
          writing-mode: vertical-rl; transform: rotate(180deg);
          justify-self: center;
        }
        .founder-content {
          max-width: 720px; /* PRINCIPLE 1: 720px max width */
        }
        .founder-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.4rem, 4vw, 3.8rem); 
          font-weight: 300;
          font-style: italic; color: #333333;
          margin-bottom: 48px; line-height: 1.3;
        }
        .founder-p {
          font-family: 'Lato', sans-serif;
          font-size: 1.05rem; 
          line-height: 1.7; /* PRINCIPLE 1: 1.7 line-height */
          color: #404040; margin-bottom: 24px;
        }
        .founder-sig {
          margin-top: 56px;
          font-family: 'Cormorant Garamond', serif; 
          font-style: italic;
          font-size: 1.1rem; color: #D9A6A1;
          display: flex; align-items: center; gap: 16px;
        }
        .founder-sig::before {
          content: ''; width: 32px; height: 1px; 
          background: #D9A6A1; opacity: 0.7;
        }

        /* PRINCIPLE 7: Stats section (8-20 / 100% / 4+) */
        .stats-minimal {
          background: var(--white);
          padding: 100px; /* PRINCIPLE 1: 100px padding */
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 80px; /* PRINCIPLE 1: Never tight */
          text-align: center;
        }
        .stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 6rem; font-weight: 300; line-height: 1;
          color: #333333; margin-bottom: 20px;
        }
        .stat-label {
          font-family: 'Lato', sans-serif;
          font-size: 0.92rem; font-weight: 300; 
          line-height: 1.7; /* PRINCIPLE 1: 1.7 line-height */
          color: #404040;
          max-width: 260px; margin: 0 auto;
        }

        /* PRINCIPLE 5 & 7: Philosophy cards (Vercel's 01-04 format) */
        .philosophy-section {
          background: var(--mist); 
          padding: 100px; /* PRINCIPLE 1: 100px padding */
        }
        .phil-header {
          text-align: center;
          max-width: 720px; /* PRINCIPLE 1: 720px max */
          margin: 0 auto 100px;
        }
        .phil-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3rem, 5vw, 5rem);
          font-weight: 300; line-height: 1.1;
          color: #333333; margin-bottom: 28px;
        }
        .phil-h2 em { 
          font-style: italic; color: #D9A6A1; 
        }
        .phil-intro {
          font-family: 'Lato', sans-serif;
          font-size: 1rem; 
          line-height: 1.7; /* PRINCIPLE 1: 1.7 line-height */
          color: #606060;
        }

        .phil-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px; /* PRINCIPLE 1: Generous spacing */
          max-width: 1400px;
          margin: 0 auto;
        }
        .phil-card {
          background: var(--white);
          border: 1px solid rgba(217,166,161,0.12);
          padding: 60px 48px; /* PRINCIPLE 1: Generous padding */
          position: relative;
          transition: all 0.5s cubic-bezier(.16,1,.3,1);
        }
        .phil-card::before {
          content: ''; position: absolute; 
          top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(to right, #D9A6A1, #B7A090);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.5s ease;
        }
        .phil-card:hover::before { 
          transform: scaleX(1); 
        }
        .phil-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 70px rgba(43,43,43,0.08);
          border-color: rgba(217,166,161,0.25);
        }
        .phil-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem; font-weight: 400;
          color: #D9A6A1; 
          margin-bottom: 20px;
          letter-spacing: 0.1em;
        }
        .phil-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem; font-weight: 400;
          color: #333333; 
          margin-bottom: 16px;
          line-height: 1.3;
        }
        .phil-text {
          font-family: 'Lato', sans-serif;
          font-size: 0.98rem; 
          line-height: 1.7; /* PRINCIPLE 1: 1.7 line-height */
          color: #404040;
        }

        /* PRINCIPLE 7: Portfolio Homepage - 4 trip cards */
        .journeys-portfolio {
          background: var(--cream);
          padding: 100px; /* PRINCIPLE 1: 100px padding */
        }
        .journeys-header {
          text-align: center;
          max-width: 720px; /* PRINCIPLE 1: 720px max */
          margin: 0 auto 100px;
        }
        .journeys-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3rem, 5vw, 5rem);
          font-weight: 300; line-height: 1.05;
          color: #333333; margin-bottom: 28px;
        }
        .journeys-h2 em { 
          font-style: italic; color: #D9A6A1; 
        }
        .journeys-intro {
          font-family: 'Lato', sans-serif;
          font-size: 1rem; 
          line-height: 1.7; /* PRINCIPLE 1: 1.7 line-height */
          color: #606060;
        }

        /* PRINCIPLE 7: Testimonials with filter tabs */
        .voice-filters {
          display: flex; justify-content: center; 
          gap: 12px; flex-wrap: wrap;
          margin-bottom: 80px;
        }
        .filter-btn {
          font-family: 'Inter', sans-serif;
          font-size: 0.5rem; font-weight: 500;
          letter-spacing: 0.28em; text-transform: uppercase;
          color: #606060;
          background: transparent;
          border: 1px solid rgba(217,166,161,0.2);
          padding: 14px 28px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(.16,1,.3,1);
        }
        .filter-btn:hover {
          border-color: #D9A6A1;
          color: #B7A090;
          transform: translateY(-2px);
        }
        .filter-btn.active {
          background: #333333;
          color: var(--white);
          border-color: #333333;
        }

        /* PRINCIPLE 4 & 6: Anti-urgency, "Message Harsha" */
        .contact-section {
          background: #DDE5DF; /* PRINCIPLE 9: Soft Sage */
          padding: 100px; /* PRINCIPLE 1: 100px padding */
          text-align: center;
        }
        .contact-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.8rem, 5vw, 5rem);
          font-weight: 300; line-height: 1.15;
          color: #333333; margin-bottom: 36px;
        }
        .contact-h2 em { 
          font-style: italic; color: #D9A6A1; 
        }
        .contact-p {
          font-family: 'Lato', sans-serif;
          font-size: 1.05rem; 
          line-height: 1.7; /* PRINCIPLE 1: 1.7 line-height */
          color: #404040;
          max-width: 640px; margin: 0 auto 64px;
        }
        .contact-links {
          display: flex; justify-content: center;
          gap: 16px; flex-wrap: wrap;
        }
        /* PRINCIPLE 6: Easy WhatsApp CTAs, "Message Harsha" */
        .contact-link {
          display: inline-flex; align-items: center;
          gap: 12px;
          font-family: 'Inter', sans-serif;
          font-size: 0.58rem; font-weight: 600;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: #333333;
          text-decoration: none;
          border: 1px solid #D9A6A1;
          padding: 16px 32px;
          transition: all 0.4s ease;
        }
        .contact-link:hover {
          background: #D9A6A1;
          color: var(--white);
          transform: translateY(-2px);
        }

        @keyframes fadeUp { 
          from { opacity: 0; transform: translateY(36px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        @keyframes revealUp { 
          from { transform: translateY(120%); } 
          to { transform: translateY(0); } 
        }

        /* RESPONSIVE - Maintaining principles */
        @media (max-width: 1200px) {
          .hero-vercel { grid-template-columns: 1fr; }
          .hero-left { padding: 180px 80px 80px; }
          .hero-right { min-height: 60vh; margin: 0; }
          .hero-date-badge { top: 60px; right: 60px; width: 120px; height: 120px; }
          .hero-caption { bottom: 60px; left: 60px; }
          
          .founder-note { 
            padding: 80px; /* PRINCIPLE 1: Still generous */
            grid-template-columns: 1fr; gap: 60px; 
          }
          .founder-label { 
            writing-mode: horizontal-tb; transform: none; 
          }
          
          .stats-minimal { padding: 80px; gap: 60px; }
          .philosophy-section { padding: 80px; }
          .phil-grid { grid-template-columns: 1fr; }
          .journeys-portfolio { padding: 80px; }
          .contact-section { padding: 80px; }
        }

        @media (max-width: 768px) {
          .hero-left { padding: 140px 32px 60px; }
          .hero-h1 { font-size: clamp(3.6rem, 14vw, 5rem); }
          .hero-sub { font-size: 1rem; }
          .hero-right { min-height: 50vh; }
          .hero-date-badge { 
            top: 32px; right: 32px; 
            width: 100px; height: 100px; 
            font-size: 0.46rem; 
          }
          .hero-caption { 
            bottom: 32px; left: 32px; 
            font-size: 0.8rem; 
          }
          
          .founder-note { padding: 60px 32px; gap: 40px; }
          .stats-minimal { 
            padding: 60px 32px; 
            grid-template-columns: 1fr; 
            gap: 48px; 
          }
          .philosophy-section { padding: 60px 32px; }
          .journeys-portfolio { padding: 60px 32px; }
          .contact-section { padding: 80px 32px; }
          .filter-btn { padding: 12px 22px; font-size: 0.46rem; }
        }
      `}</style>

      <div className="grain" aria-hidden="true" />
      <div className="pv-progress" style={{ width: `${progress}%` }} aria-hidden="true" />

      <div className={`pre-wrap${loaded ? " done" : ""}`}>
        <p className="pre-logo">PuraVida · with Harsha</p>
        <div className="pre-line" />
        <p className="pre-sub">Boutique Transformational Travel · Dubai</p>
      </div>

      <Nav />

      {/* PRINCIPLE 2: Split hero layout (Vercel style) */}
      <section className="hero-vercel" id="home">
        <div className="hero-left">
          <p className="hero-eyebrow">Boutique Transformational Travel · Dubai</p>
          <h1 className="hero-h1">
            <span className="hero-h1-line">
              <span className="hero-h1-inner line1">When</span>
            </span>
            <span className="hero-h1-line">
              <span className="hero-h1-inner line2">you're</span>
            </span>
            <span className="hero-h1-line">
              <span className="hero-h1-inner line3">ready.</span>
            </span>
          </h1>
          {/* PRINCIPLE 4: Sensation-First Copy */}
          <p className="hero-sub">
            For professionals 35–60 who've mastered the boardroom but lost the ability to sit with silence. Eight to twenty travellers. Unhurried itineraries. Just presence.
          </p>
          <div className="hero-cta">
            {/* PRINCIPLE 6: Easy WhatsApp CTA */}
            <a href="https://wa.me/+971562216643" className="btn-p" target="_blank" rel="noopener noreferrer">
              <div className="btn-p-bg" /><div className="btn-p-bg2" />
              <span>Begin a Conversation →</span>
            </a>
          </div>
        </div>

        {/* PRINCIPLE 2: Large image with minimal overlay */}
        <div className="hero-right">
          <div className="hero-date-badge">
            <p>April<br />9–16<br />2026</p>
          </div>
          <p className="hero-caption">Paro Valley, Bhutan</p>
        </div>
      </section>

      {/* PRINCIPLE 7: Horizontal scroll ticker */}
      <div className="marquee-strip" aria-hidden="true">
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i}>
              {item}
              {i < MARQUEE.length * 2 - 1 && (
                <span style={{ 
                  display:"inline-block", width:3, height:3, 
                  borderRadius:"50%", background:"#D9A6A1", 
                  verticalAlign:"middle", margin:"0 12px", 
                  opacity:0.5 
                }} />
              )}
            </span>
          ))}
        </div>
      </div>

      {/* PRINCIPLE 6: Founder Everywhere - First-person voice */}
      <section className="founder-note">
        <FU><p className="founder-label">What I've Learned</p></FU>
        <FU d={1}>
          <div className="founder-content">
            <h2 className="founder-h2">
              I don't guide you through a country. I walk beside you.
            </h2>
            <p className="founder-p">
              I first went to Bhutan in 2014. I thought I was going for the prayer flags and the peaks. What I didn't expect was Kelly Dorji—or the grandmother who poured me butter tea in Punakha, or the monk who explained why some silences are louder than mantras.
            </p>
            <p className="founder-p">
              Every relationship we hold—the monastery in Bhutan, the tea master in Kyoto, the Bedouin family in Wadi Rum—was built over years of quiet return visits. Not vendor contracts. Years of showing up.
            </p>
            <p className="founder-p">
              When you travel with PuraVida, you travel through those relationships. You're welcomed not as a tourist, but as a guest of someone trusted.
            </p>
            <p className="founder-sig">Harsha</p>
          </div>
        </FU>
      </section>

      {/* PRINCIPLE 7: Stats section (8-20 / 100% / 4+) */}
      <section className="stats-minimal">
        {[
          { num:"8–20", label:"Travellers per journey. Intimacy by design." },
          { num:"100%", label:"Founder-led. Harsha on every single journey." },
          { num:"4+", label:"Years of cultural relationships. Not contracts." },
        ].map((s,i) => (
          <FU key={i} d={i}>
            <div>
              <p className="stat-num">{s.num}</p>
              <p className="stat-label">{s.label}</p>
            </div>
          </FU>
        ))}
      </section>

      {/* PRINCIPLE 5 & 7: Philosophy cards (01-04 format) */}
      <section className="philosophy-section" id="philosophy">
        <div className="phil-header">
          <FU>
            <h2 className="phil-h2">
              We don't pack<br /><em>itineraries.</em>
            </h2>
            <p className="phil-intro">
              We allow breath, space, pause. Every journey is led by Harsha herself. No tour managers. No scripts. Only presence.
            </p>
          </FU>
        </div>

        <div className="phil-grid">
          {[
            { 
              n:"01", 
              t:"Stillness Over Speed", 
              b:"We do not pack itineraries. We allow breath, space, and pause between every experience. Altitude becomes meditation. Silence becomes teacher." 
            },
            { 
              n:"02", 
              t:"Presence as Luxury", 
              b:"No WiFi dependency. Guided moments for reconnection with place, people, and self. The luxury of being unreachable." 
            },
            { 
              n:"03", 
              t:"Authentic Reverence", 
              b:"Real village meals. Real rituals. Real people—relationships built over years, not contracts. You're welcomed as a guest, not counted as a tourist." 
            },
            { 
              n:"04", 
              t:"Founder-Led Always", 
              b:"Harsha leads every single journey. Your experience is never handed to someone else. This is not scalable. That's the point." 
            },
          ].map((p, i) => (
            <FU key={i} d={i}>
              <div className="phil-card">
                <p className="phil-num">{p.n}</p>
                <h3 className="phil-title">{p.t}</h3>
                <p className="phil-text">{p.b}</p>
              </div>
            </FU>
          ))}
        </div>
      </section>

      {/* PRINCIPLE 7: 4 trip cards showing ALL journeys */}
      <section className="journeys-portfolio" id="journeys">
        <div className="journeys-header">
          <FU>
            <h2 className="journeys-h2">
              Current <em>Journeys</em>
            </h2>
            <p className="journeys-intro">
              Four destinations. Small groups. Unhurried itineraries. Every detail carried by Harsha.
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
                {/* PRINCIPLE 4: Sensation-First Copy */}
                <p className="j-desc">{j.desc}</p>
                <div className="j-details">
                  {[["Duration",j.dur],["Dates",j.dates],["Investment",j.price]].map(([l,v]) => (
                    <div className="j-detail" key={l}>
                      <span className="j-detail-label">{l}</span>
                      <span>{v}</span>
                    </div>
                  ))}
                </div>
                <Link to={`/${j.slug}`} className="j-cta">
                  View full itinerary →
                </Link>
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

      {/* PRINCIPLE 7: About Harsha with quote overlay */}
      <section className="harsha" id="about">
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
              <p className="harsha-float-q">"Tea tastes different in Bhutan—slower, quieter, exactly where you are."</p>
            </div>
          </FU>
        </div>
        <div className="harsha-text">
          <FU><p className="harsha-eyebrow">A Decade of Presence</p></FU>
          <FU d={1}>
            <h2 className="harsha-h2">
              Ten years ago, I went to Ladakh for three weeks. I came back changed.
            </h2>
          </FU>
          <FU d={2}>
            {/* PRINCIPLE 6: Personal stories woven throughout */}
            <p className="harsha-body">
              Not because of the landscapes—though the landscapes will rearrange you. But because of the people. The monk who taught me that silence isn't the absence of sound. The family who fed me tsampa and butter tea and asked nothing in return.
            </p>
            <p className="harsha-body">
              PuraVida began with a single question: What if travel wasn't about ticking boxes? What if it was about arriving fully—and being changed by that arrival?
            </p>
            <p className="harsha-body">
              Every journey I lead, I lead because I've walked that ground myself. Because I know the monastery keeper by name. Because the Bedouin family in Wadi Rum pours tea for me the way they pour it for family.
            </p>
            {/* PRINCIPLE 6: "Message Harsha" button */}
            <a href="https://wa.me/+971562216643" className="harsha-link" target="_blank" rel="noopener noreferrer">
              Message Harsha →
            </a>
          </FU>
        </div>
      </section>

      {/* PRINCIPLE 7: Testimonials with filter tabs */}
      <section className="voices" id="voices">
        <div className="voices-header">
          <FU>
            <h2 className="voices-h2">
              What past<br /><em>travellers say</em>
            </h2>
          </FU>
        </div>

        <FU d={1}>
          <div className="voice-filters">
            <button 
              className={`filter-btn ${voiceFilter === 'all' ? 'active' : ''}`}
              onClick={() => setVoiceFilter('all')}
            >
              All Journeys
            </button>
            <button 
              className={`filter-btn ${voiceFilter === 'bhutan' ? 'active' : ''}`}
              onClick={() => setVoiceFilter('bhutan')}
            >
              Bhutan
            </button>
            <button 
              className={`filter-btn ${voiceFilter === 'japan' ? 'active' : ''}`}
              onClick={() => setVoiceFilter('japan')}
            >
              Japan
            </button>
            <button 
              className={`filter-btn ${voiceFilter === 'jordan' ? 'active' : ''}`}
              onClick={() => setVoiceFilter('jordan')}
            >
              Jordan
            </button>
            <button 
              className={`filter-btn ${voiceFilter === 'srilanka' ? 'active' : ''}`}
              onClick={() => setVoiceFilter('srilanka')}
            >
              Sri Lanka
            </button>
          </div>
        </FU>

        {/* PRINCIPLE 4: Transformation stories in testimonials */}
        <div className="voices-grid">
          {filteredVoices.map((v,i) => (
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

      {/* PRINCIPLE 4 & 6: Anti-urgency, "When you're ready" */}
      <section className="contact-section">
        <FU>
          <h2 className="contact-h2">
            The right journey finds you<br />when you're <em>truly ready.</em>
          </h2>
          <p className="contact-p">
            We don't take bookings. We begin with a conversation. Message Harsha directly. Tell her where you are. What you're carrying. What you're looking for.
          </p>
          <div className="contact-links">
            {/* PRINCIPLE 6: Easy WhatsApp CTAs on every page */}
            <a href="https://wa.me/+971562216643" className="contact-link" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <a href="mailto:harsha@puravidawithharsha.com" className="contact-link">
              Email
            </a>
            <a href="https://instagram.com/puravida.withharsha" className="contact-link" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </div>
        </FU>
      </section>

      <Footer />
    </>
  );
}