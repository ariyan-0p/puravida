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
    const inView = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh && r.bottom > 0;
    };
    if (inView()) { setVis(true); return; }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); cleanup(); } },
      { threshold: 0, rootMargin: '0px' }
    );
    const onScroll = () => { if (inView()) { setVis(true); cleanup(); } };
    const cleanup = () => {
      obs.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
    obs.observe(el);
    window.addEventListener('scroll', onScroll, { passive: true });
    return cleanup;
  }, []);
  return [ref, vis];
}

function FU({ children, d = 0, className = '', style = {} }) {
  const [ref, vis] = useFadeUp();
  return (
    <div ref={ref} className={`pfu${vis ? ' pin' : ''} ${className}`}
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
      src={encodeURI(`/assets/05. GRAPHIC ELEMENTS/Glyphs/${variant}/${name}/${name}.png`)}
      alt="" aria-hidden="true"
      style={{ height: size, width: 'auto', opacity, display: 'block' }}
    />
  );
}

const PILLARS = [
  {
    n: "01", glyph: "Pause", glyphSize: 64,
    t: "Stillness Over Speed",
    body: [
      "We allow breath, space, and pause between every experience. An unhurried morning at altitude is the whole point.",
      "Silence becomes teacher. The view that takes twenty minutes to reach on foot carries something felt only by those who arrived on foot.",
    ],
  },
  {
    n: "02", glyph: "Sunset", glyphSize: 64,
    t: "Presence as Luxury",
    body: [
      "The luxury we offer is presence: the freedom of a day with no agenda beyond witnessing what is in front of you.",
      "Guided moments for reconnection with place, with people, with the self that gets quieted by ordinary life.",
    ],
  },
  {
    n: "03", glyph: "Trees", glyphSize: 32,
    t: "Authentic Reverence",
    body: [
      "Real village meals. Real rituals. Real people: relationships built over years of quiet return visits. You are welcomed as a guest, with the warmth of long-held friendships.",
      "We sit inside culture, with permission and care, as long-term friends of the communities we visit.",
    ],
  },
  {
    n: "04", glyph: "Mountains", glyphSize: 32,
    t: "Founder Led, Always",
    body: [
      "Harsha leads every single journey. Your experience stays in her hands, from arrival to departure. Founder-led, always personal.",
      "This is handcrafted travel. The itinerary is composed each season from scratch. Every choice is made with intention.",
    ],
  },
];

export default function Philosophy() {
  useEffect(() => { window.scrollTo(0, 0); document.title = 'Our Philosophy | PuraVida with Harsha'; }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@300;400;700&family=Lora:ital,wght@0,400;1,400&display=swap');

        .pfu { opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease, transform 0.8s ease; }

        .ph-section-divider { line-height: 0; margin-top: -12px; margin-bottom: -12px; }
        .ph-section-divider img { width: 100%; opacity: 0.5; display: block; }
        .pin { opacity: 1; transform: translateY(0); }

        /* ── HERO ── */
        .ph-hero {
          background: #F5F0EB;
          padding: 180px 80px 120px;
          text-align: center;
        }
        .ph-hero-eyebrow {
          font-family: 'Lato', sans-serif;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: #C9A050;
          margin-bottom: 24px;
        }
        .ph-hero-h1 {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: clamp(2.4rem, 5vw, 4.5rem);
          line-height: 1.15;
          color: #333333;
          margin-bottom: 32px;
          max-width: 760px;
          margin-left: auto;
          margin-right: auto;
        }
        .ph-hero-intro {
          font-family: 'Lora', serif;
          font-style: italic;
          font-size: clamp(1rem, 1.8vw, 1.25rem);
          line-height: 1.75;
          color: rgba(51,51,51,0.7);
          max-width: 560px;
          margin: 0 auto 48px;
        }

        /* ── PILLARS ── */
        .ph-pillars {
          background: #F5F0EB;
          padding: 0 80px 140px;
        }
        .ph-pillar {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 0 48px;
          padding: 64px 0;
          max-width: 960px;
          margin: 0 auto;
        }
        .ph-pillar-num-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding-top: 8px;
        }
        .ph-pillar-num {
          font-family: 'Lato', sans-serif;
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.12em;
          color: #333333;
        }
        .ph-pillar-content {}
        .ph-pillar-title {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: clamp(1.4rem, 2.5vw, 2rem);
          color: #333333;
          margin-bottom: 24px;
          line-height: 1.2;
        }
        .ph-pillar-body {
          font-family: 'Lato', sans-serif;
          font-size: 17px;
          line-height: 1.85;
          color: #333333;
          margin-bottom: 16px;
        }
        .ph-pillar-body:last-child { margin-bottom: 0; }

        /* ── QUOTE ── */
        .ph-quote-strip {
          background: #B7C8B5;
          padding: 100px 80px;
          text-align: center;
        }
        .ph-quote-wrap {
          position: relative;
          z-index: 1;
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
          padding: 48px 40px;
        }
        .ph-quote-frame {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ph-quote-frame img {
          width: 100%;
          height: 100%;
          object-fit: fill;
          display: block;
          opacity: 0.55;
        }
        .ph-quote {
          font-family: 'Lora', serif;
          font-style: italic;
          font-size: clamp(1.2rem, 2.2vw, 1.65rem);
          line-height: 1.75;
          color: #333333;
          max-width: 700px;
          margin: 0 auto 20px;
        }
        .ph-quote-attr {
          font-family: 'Lato', sans-serif;
          font-size: 13px;
          letter-spacing: 0.12em;
          color: rgba(51,51,51,0.55);
        }

        /* ── CTA ── */
        .ph-cta {
          background: #F5F0EB;
          padding: 120px 80px;
          text-align: center;
        }
        .ph-cta-h2 {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: clamp(1.8rem, 3.5vw, 3rem);
          color: #333333;
          margin-bottom: 24px;
          line-height: 1.2;
        }
        .ph-cta-body {
          font-family: 'Lato', sans-serif;
          font-size: 17px;
          line-height: 1.75;
          color: rgba(51,51,51,0.7);
          max-width: 480px;
          margin: 0 auto 48px;
        }
        .ph-cta-btn {
          display: inline-block;
          font-family: 'Lato', sans-serif;
          font-size: 16px; font-weight: 700;
          color: #333333; background: #D9A6A1;
          padding: 18px 40px; border-radius: 4px;
          text-decoration: none;
          transition: background 0.35s, color 0.35s;
        }
        .ph-cta-btn:hover { background: #c08e88; color: white; }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .ph-hero { padding: 140px 40px 80px; }
          .ph-pillars { padding: 0 40px 100px; }
          .ph-pillar { grid-template-columns: 1fr; gap: 16px; padding: 48px 0; }
          .ph-quote-strip { padding: 80px 40px; }
          .ph-cta { padding: 80px 40px; }
        }
        @media (max-width: 600px) {
          .ph-hero { padding: 120px 28px 60px; }
          .ph-pillars { padding: 0 28px 80px; }
          .ph-quote-strip { padding: 60px 28px; }
          .ph-cta { padding: 60px 28px; }
        }
      `}</style>

      <Nav />
      <WhatsAppButton />

      {/* HERO */}
      <section className="ph-hero">
        <FU>
          <p className="ph-hero-eyebrow">Our Philosophy</p>
          <h1 className="ph-hero-h1">
            We allow breath, space, pause.
          </h1>
          <p className="ph-hero-intro">
            Every journey is led by Harsha herself. Personal attention. Unhurried pace. Presence at every moment.
          </p>
          <Divider width={160} opacity={0.4} />
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
            <Glyph name="Sunset" variant="Charcoal" size={120} opacity={0.2} />
          </div>
        </FU>
      </section>

      {/* ── Hero → Pillars divider ── */}
      <div className="ph-section-divider">
        <img src="/assets/05. GRAPHIC ELEMENTS/Dividers/Divider - Center.png" alt="" aria-hidden="true" />
      </div>

      {/* PILLARS */}
      <section className="ph-pillars">
        {PILLARS.map((p, i) => (
          <FU key={i} d={i * 0.3}>
            {i > 0 && (
              <div style={{ maxWidth: 960, margin: '0 auto' }}>
                <Divider width="100%" opacity={0.4} />
              </div>
            )}
            <div className="ph-pillar">
              <div className="ph-pillar-num-wrap">
                <p className="ph-pillar-num">{p.n}</p>
                <Glyph name={p.glyph} variant="Charcoal" size={p.glyphSize} opacity={0.3} />
              </div>
              <div className="ph-pillar-content">
                <h2 className="ph-pillar-title">{p.t}</h2>
                {p.body.map((para, j) => (
                  <p key={j} className="ph-pillar-body">{para}</p>
                ))}
              </div>
            </div>
          </FU>
        ))}
      </section>

      {/* ── Pillars → Quote divider ── */}
      <div className="ph-section-divider">
        <img src="/assets/05. GRAPHIC ELEMENTS/Dividers/Divider - Center.png" alt="" aria-hidden="true" />
      </div>

      {/* QUOTE */}
      <div className="ph-quote-strip">
        <FU>
          <div className="ph-quote-wrap">
            <div className="ph-quote-frame">
              <img src="/assets/Puravida_Quote-Frame-1/Frame.png" alt="" aria-hidden="true" />
            </div>
            <p className="ph-quote">
              I walk beside you. Every relationship we hold was built over years of quiet return visits. Years of showing up.
            </p>
          </div>
          <Divider width={160} opacity={0.35} />
          <p className="ph-quote-attr" style={{ marginTop: 16 }}>Harsha, Founder</p>
        </FU>
      </div>

      {/* ── Quote → CTA divider ── */}
      <div className="ph-section-divider">
        <img src="/assets/05. GRAPHIC ELEMENTS/Dividers/Divider - Center.png" alt="" aria-hidden="true" />
      </div>

      {/* CTA */}
      <section className="ph-cta">
        <FU>
          <h2 className="ph-cta-h2">
            This might be your journey.
          </h2>
          <p className="ph-cta-body">
            Begin with a conversation. Message Harsha to learn about the 2026 journeys.
          </p>
          <a
            href="https://wa.me/971562216643"
            className="ph-cta-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Begin a Conversation
          </a>
        </FU>
      </section>

      {/* ── CTA → Footer divider ── */}
      <div className="ph-section-divider">
        <img src="/assets/05. GRAPHIC ELEMENTS/Dividers/Divider - Center.png" alt="" aria-hidden="true" />
      </div>

      <Footer />
    </>
  );
}
