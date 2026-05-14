import { useState, useEffect, useRef } from 'react';
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
    <div ref={ref} className={`cfu${vis ? ' cin' : ''} ${className}`}
      style={{ transitionDelay: `${d * 0.13}s`, ...style }}>
      {children}
    </div>
  );
}

function Divider({ width = 200, opacity = 0.5 }) {
  return (
    <img
      src="/assets/05. GRAPHIC ELEMENTS/Dividers/Divider - Center.png"
      alt="" aria-hidden="true"
      style={{ width, opacity, display: 'block', margin: '0 auto' }}
    />
  );
}

function Glyph({ name = 'Trees', variant = 'Charcoal', size = 48, opacity = 0.3 }) {
  return (
    <img
      src={`/assets/05. GRAPHIC ELEMENTS/Glyphs/${variant}/${name}/${name}.png`}
      alt="" aria-hidden="true"
      style={{ height: size, width: 'auto', opacity }}
    />
  );
}

export default function Contact() {
  useEffect(() => { window.scrollTo(0, 0); document.title = 'Begin a Conversation | PuraVida with Harsha'; }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@300;400;700&family=Lora:ital,wght@0,400;1,400&display=swap');

        .cfu { opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease, transform 0.8s ease; }
        .cin { opacity: 1; transform: translateY(0); }

        /* ── HERO ── */
        .ct-hero {
          background: #B7C8B5;
          padding: 180px 80px 40px;
          text-align: center;
        }
        .ct-hero-eyebrow {
          font-family: 'Lato', sans-serif;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: #C9A050;
          margin-bottom: 24px;
        }
        .ct-hero-h1 {
          font-family: 'Lora', serif;
          font-style: italic;
          font-weight: 700;
          font-size: clamp(18px, 2.2vw, 26px);
          line-height: 1.6;
          color: #333333;
          margin-bottom: 32px;
          max-width: 640px;
          margin-left: auto;
          margin-right: auto;
        }
        .ct-hero-body {
          font-family: 'Lato', sans-serif;
          font-size: 17px;
          line-height: 1.85;
          color: rgba(51,51,51,0.7);
          max-width: 520px;
          margin: 0 auto 56px;
        }

        /* ── PRIMARY CTA ── */
        .ct-primary {
          background: #F5F0EB;
          padding: 0 80px 120px;
          text-align: center;
        }
        .ct-wa-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: 'Lato', sans-serif;
          font-size: 18px; font-weight: 700;
          color: #333333; background: #D9A6A1;
          padding: 20px 48px; border-radius: 4px;
          text-decoration: none;
          transition: background 0.35s, color 0.35s;
          margin-bottom: 48px;
        }
        .ct-wa-btn:hover { background: #c08e88; color: white; }
        .ct-wa-label {
          font-family: 'Lato', sans-serif;
          font-size: 13px;
          letter-spacing: 0.08em;
          color: rgba(51,51,51,0.4);
        }

        /* ── DIVIDER STRIP ── */
        .ct-strip {
          background: #B7C8B5;
          padding: 0 80px 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 60px;
        }
        .ct-strip-link {
          font-family: 'Lato', sans-serif;
          font-size: 15px; font-weight: 700;
          letter-spacing: 0.06em;
          color: #333333;
          text-decoration: none;
          transition: opacity 0.3s;
        }
        .ct-strip-link:hover { opacity: 0.6; }
        .ct-strip-sep {
          width: 1px; height: 24px;
          background: rgba(51,51,51,0.25);
        }

        /* ── NOTE ── */
        .ct-note {
          background: #F5F0EB;
          padding: 120px 80px;
          text-align: center;
        }
        .ct-note-q {
          font-family: 'Lora', serif;
          font-style: italic;
          font-size: clamp(1.1rem, 2vw, 1.5rem);
          line-height: 1.75;
          color: #333333;
          max-width: 640px;
          margin: 0 auto 32px;
        }
        .ct-note-attr {
          font-family: 'Lato', sans-serif;
          font-size: 13px;
          letter-spacing: 0.12em;
          color: rgba(51,51,51,0.45);
          margin-bottom: 60px;
        }
        .ct-glyphs {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: 12px;
          margin-top: 60px;
        }

        @media (max-width: 900px) {
          .ct-hero { padding: 140px 40px 80px; }
          .ct-primary { padding: 0 40px 80px; }
          .ct-strip { padding: 60px 40px; gap: 32px; flex-direction: column; }
          .ct-strip-sep { width: 40px; height: 1px; }
          .ct-note { padding: 80px 40px; }
        }
        @media (max-width: 600px) {
          .ct-hero { padding: 120px 28px 60px; }
          .ct-primary { padding: 0 28px 60px; }
          .ct-strip { padding: 48px 28px; }
          .ct-note { padding: 60px 28px; }
          .ct-wa-btn { padding: 18px 32px; font-size: 16px; }
        }
      `}</style>

      <Nav />
      <WhatsAppButton />

      {/* HERO */}
      <section className="ct-hero">
        <FU>
          <h1 className="ct-hero-h1">
            I would love to hear from you. Begin with a conversation about where you are and what is calling you.
          </h1>
          <Divider width={140} opacity={0.4} />
        </FU>
      </section>

      {/* BEGIN CONVERSATION */}
      <div className="ct-strip">
        <FU>
          <a
            href="https://wa.me/+971562216643?text=Hello%20Harsha%2C%20I%20would%20love%20to%20learn%20more%20about%20your%202026%20journeys."
            className="ct-wa-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Begin a conversation
          </a>
        </FU>
      </div>

      <Footer />
    </>
  );
}
