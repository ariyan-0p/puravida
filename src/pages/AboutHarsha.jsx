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
    <div ref={ref} className={`afu${vis ? ' ain' : ''} ${className}`}
      style={{ transitionDelay: `${d * 0.13}s`, ...style }}>
      {children}
    </div>
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

function Divider({ width = 200, opacity = 0.5 }) {
  return (
    <img
      src="/assets/05. GRAPHIC ELEMENTS/Dividers/Divider - Center.png"
      alt="" aria-hidden="true"
      style={{ width, opacity, display: 'block', margin: '0 auto' }}
    />
  );
}

export default function AboutHarsha() {
  useEffect(() => { window.scrollTo(0, 0); document.title = 'About Harsha | PuraVida with Harsha'; }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@300;400;700&family=Lora:ital,wght@0,400;1,400&display=swap');

        .afu { opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease, transform 0.8s ease; }
        .afu.ain { opacity: 1; transform: translateY(0); }

        /* ── HERO ── */
        .ah-hero {
          display: grid;
          grid-template-columns: 45fr 55fr;
          min-height: 100vh;
          overflow: hidden;
        }
        .ah-hero-left {
          background: #333333;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 120px 72px 100px;
        }
        .ah-hero-eyebrow {
          font-family: 'Lato', sans-serif;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #C9A050;
          margin-bottom: 32px;
        }
        .ah-hero-h1 {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: clamp(2.4rem, 3.8vw, 4.2rem);
          line-height: 1.12;
          color: #ffffff;
          margin-bottom: 32px;
        }
        .ah-hero-tagline {
          font-family: 'Lora', serif;
          font-style: italic;
          font-size: clamp(0.95rem, 1.4vw, 1.15rem);
          color: rgba(255,255,255,0.5);
          line-height: 1.75;
          max-width: 380px;
          margin-bottom: 56px;
        }
        .ah-hero-scroll {
          font-family: 'Lato', sans-serif;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .ah-hero-scroll::before {
          content: '';
          width: 32px; height: 1px;
          background: rgba(255,255,255,0.2);
          flex-shrink: 0;
        }
        .ah-hero-pause {
          position: absolute;
          bottom: 100px;
          left: 72px;
          pointer-events: none;
          line-height: 0;
        }
        .ah-hero-divider {
          position: relative;
          z-index: 3;
          text-align: center;
          height: 0;
          line-height: 0;
        }
        .ah-hero-divider img {
          width: 100%;
          max-width: 100%;
          opacity: 0.5;
          display: block;
          transform: translateY(-50%);
        }
        .ah-hero-right {
          position: relative;
          overflow: hidden;
        }
        .ah-hero-img {
          position: absolute; inset: 0;
          background: url('/assets/harsha-portrait.jpg') center top / cover no-repeat;
        }

        /* ── STORY ── */
        .ah-story {
          background: #333333;
          padding: 120px 80px;
          display: grid;
          grid-template-columns: 38fr 62fr;
          gap: 80px;
          align-items: start;
        }
        .ah-story.ah-story--text-only {
          display: block;
          padding-top: 180px;
        }
        .ah-story.ah-story--text-only .ah-story-right {
          max-width: 760px;
          margin: 0 auto;
        }
        .ah-story-left {
          position: sticky;
          top: 120px;
        }
        .ah-story-img-wrap {
          position: relative;
          display: inline-block;
        }
        .ah-story-leaf-accent {
          position: absolute;
          top: -28px;
          left: -28px;
          width: clamp(100px, 14vw, 160px);
          opacity: 0.55;
          pointer-events: none;
          z-index: 3;
          transform: rotate(180deg);
        }
        .ah-story-divider {
          margin: 48px 0;
          text-align: center;
        }
        .ah-story-img {
          width: 100%;
          aspect-ratio: 3/4;
          object-fit: cover;
          border-radius: 2px;
        }
        .ah-story-img-caption {
          font-family: 'Lato', sans-serif;
          font-size: 12px;
          color: rgba(51,51,51,0.45);
          margin-top: 12px;
          letter-spacing: 0.06em;
        }
        .ah-story-right {}
        .ah-story-eyebrow {
          font-family: 'Lato', sans-serif;
          font-size: 12px;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #C9A050;
          margin-bottom: clamp(14px, 2vw, 22px);
        }
        .ah-story-h2 {
          font-family: 'Lato', sans-serif;
          font-weight: 400;
          font-size: 16px;
          line-height: 1.85;
          color: rgba(255,255,255,0.8);
          margin-bottom: 20px;
          max-width: 560px;
        }
        .ah-story-body {
          font-family: 'Lato', sans-serif;
          font-size: 16px;
          line-height: 1.85;
          color: rgba(255,255,255,0.8);
          margin-bottom: 20px;
          max-width: 560px;
        }
        .ah-story-body:last-of-type { margin-bottom: 0; }
        .ah-story-pull {
          font-family: 'Lora', serif;
          font-style: italic;
          font-size: 18px;
          line-height: 1.7;
          color: rgba(255,255,255,0.85);
          text-align: center;
          max-width: 540px;
          margin: 32px 0 0;
        }
        .ah-story-pull span { display: block; }
        .ah-story-pull span + span { margin-top: 8px; }

        /* ── QUOTE STRIP ── */
        .ah-quote-strip {
          background: #333333;
          padding: 100px 80px;
          text-align: center;
        }
        .ah-quote {
          font-family: 'Lora', serif;
          font-style: italic;
          font-size: clamp(14px, 1.5vw, 18px);
          line-height: 1.55;
          color: #F5F0EB;
          max-width: 420px;
          margin: 16px auto;
        }
        .ah-quote-attr {
          font-family: 'Lora', serif;
          font-style: italic;
          font-size: clamp(14px, 1.5vw, 18px);
          color: #F5F0EB;
          opacity: 0.85;
          margin-top: -20px;
          text-align: right;
          position: relative;
          z-index: 1;
        }
        .ah-quote-wrap {
          position: relative;
          z-index: 1;
          max-width: 520px;
          margin: 0 auto;
          text-align: center;
          padding: 72px 56px;
          min-height: 240px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .ah-quote-frame {
          position: absolute;
          inset: -12px -16px -18px -16px;
          pointer-events: none;
          z-index: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ah-quote-frame img {
          width: 100%;
          height: 100%;
          object-fit: fill;
          display: block;
          opacity: 0.85;
          filter: brightness(0) invert(1);
        }

        /* ── RIVER MOMENT ── */
        .ah-river {
          display: grid;
          grid-template-columns: 60fr 40fr;
          min-height: 70vh;
          overflow: hidden;
        }
        .ah-river-img {
          background: url('/assets/harsha%20serene%20by%20the%20river.JPG') center / cover no-repeat;
        }
        .ah-river-text {
          background: #F5F0EB;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 80px 64px;
          position: relative;
          overflow: hidden;
        }
        .ah-river-glyph {
          position: absolute;
          bottom: 24px;
          right: 28px;
          opacity: 0.15;
          pointer-events: none;
        }
        .ah-river-quote {
          font-family: 'Lora', serif;
          font-style: italic;
          font-size: clamp(1.1rem, 1.8vw, 1.5rem);
          line-height: 1.8;
          color: #333333;
          margin-bottom: 28px;
        }
        .ah-river-attr {
          font-family: 'Lato', sans-serif;
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(51,51,51,0.4);
        }

        /* ── BELIEVES ── */
        .ah-believes {
          background: #F5F0EB;
          padding: 120px 80px;
          max-width: 680px;
          margin: 0 auto;
          text-align: center;
        }
        .ah-believes-body { text-align: left; }
        .ah-believes-eyebrow {
          font-family: 'Lato', sans-serif;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: #C9A050;
          margin-bottom: 24px;
        }
        .ah-believes-h2 {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          line-height: 1.2;
          color: #333333;
          margin-bottom: 48px;
        }
        .ah-believes-body {
          font-family: 'Lato', sans-serif;
          font-size: 17px;
          line-height: 1.85;
          color: #333333;
          margin-bottom: 24px;
        }
        .ah-sig {
          font-family: 'Lora', serif;
          font-style: italic;
          font-size: 2rem;
          color: #D9A6A1;
          margin-top: 48px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
        }
        .ah-sig::before {
          content: '';
          width: 48px; height: 1px;
          background: #D9A6A1;
          flex-shrink: 0;
        }

        /* ── PHILOSOPHY ── */
        .ah-phil {
          background: #F5F0EB;
          padding: 120px 80px;
          text-align: center;
        }
        .ah-phil-header { max-width: 100%; margin: 0 auto 64px; }
        .ah-phil-h2 {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: clamp(1.4rem, 3.4vw, 2.6rem);
          line-height: 1.2;
          color: #333333;
          margin-bottom: 28px;
          white-space: nowrap;
        }
        .ah-phil-intro {
          font-family: 'Lato', sans-serif;
          font-size: 16px;
          line-height: 1.85;
          color: #333333;
          margin-bottom: 16px;
        }
        .ah-phil-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 48px;
          max-width: 960px;
          margin: 48px auto 0;
        }
        .ah-pillar {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 18px;
          padding: 0 16px;
        }
        .ah-pillar-icon {
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ah-pillar-title {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: 18px;
          color: #333333;
        }
        @media (max-width: 900px) {
          .ah-phil { padding: 80px 40px; }
          .ah-phil-grid { grid-template-columns: 1fr; gap: 32px; }
        }
        @media (max-width: 600px) {
          .ah-phil { padding: 60px 28px; }
        }

        /* ── CTA ── */
        .ah-cta {
          background: #B7C8B5;
          padding: 120px 80px;
          text-align: center;
          position: relative;
        }
        .ah-cta-h2 {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: clamp(1.8rem, 3.5vw, 3rem);
          color: #333333;
          margin-bottom: 24px;
          line-height: 1.2;
        }
        .ah-cta-body {
          font-family: 'Lato', sans-serif;
          font-size: 17px;
          line-height: 1.75;
          color: rgba(255,255,255,0.65);
          max-width: 520px;
          margin: 0 auto 48px;
        }
        .ah-cta-btn {
          display: inline-block;
          font-family: 'Lato', sans-serif;
          font-size: 16px; font-weight: 700;
          color: #333333; background: #D9A6A1;
          padding: 18px 40px; border-radius: 4px;
          text-decoration: none;
          transition: background 0.35s, color 0.35s;
        }
        .ah-cta-btn:hover { background: #c08e88; color: white; }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .ah-hero { grid-template-columns: 1fr; min-height: auto; }
          .ah-hero-left { padding: 120px 40px 64px; justify-content: flex-start; min-height: 60vh; }
          .ah-hero-pause { bottom: 80px; left: 40px; }
          .ah-hero-right { height: 55vw; min-height: 320px; }
          .ah-story { grid-template-columns: 1fr; padding: 80px 40px; gap: 48px; }
          .ah-story-left { position: static; }
          .ah-quote-strip { padding: 80px 40px; }
          .ah-river { grid-template-columns: 1fr; }
          .ah-river-img { height: 60vw; min-height: 280px; }
          .ah-river-text { padding: 60px 40px; }
          .ah-believes { padding: 80px 40px; }
          .ah-cta { padding: 80px 40px; }
        }
        @media (max-width: 600px) {
          .ah-hero-left { padding: 100px 28px 56px; }
          .ah-hero-pause { bottom: 60px; left: 28px; }
          .ah-hero-right { height: 70vw; }
          .ah-story { padding: 60px 28px; }
          .ah-quote-strip { padding: 60px 28px; }
          .ah-river-img { height: 70vw; }
          .ah-river-text { padding: 48px 28px; }
          .ah-believes { padding: 60px 28px; }
          .ah-cta { padding: 60px 28px; }
        }
      `}</style>

      <Nav />
      <WhatsAppButton />

      {/* STORY */}
      <section className="ah-story ah-story--text-only">
        <div className="ah-story-right">
          <FU>
            <p className="ah-story-eyebrow">About Me</p>
            <p className="ah-story-body">
              September 2010, 23 days post the flash floods, is when I landed in Leh Air Force Base Airport with a backpack and camera. I saw the Indian Air Force planes parked on the tarmac and felt for the first time this sense of freedom and national pride.
            </p>
            <p className="ah-story-body">
              I saw mountains around me that were dotted with monasteries and I was blank and in awe. Indescribable the beauty that hit me hard and I had inexplicable tears.
            </p>
            <p className="ah-story-body">
              A few days of exploring and interacting with the common people and soldiers I was deeply in love with everyone and everything. Even the dry mountain air, the trees, the colour of the skies, the rivers, the maroon clad monks, the white homes with carved wooden windows and the momos. I wanted to feel this way. Everyday. I wanted everyone to feel this way. Everyday.
            </p>
            <p className="ah-story-body">
              Understanding more deeply the lives of the soldiers around a bonfire left me deeply impacted. Naturally, I dived into the political history of this land and the lives of the soldiers at high altitude. In a constant state of absorbing and learning, I was mesmerised. I had found my calling. I am a vagabond in my heart. I love humans and their stories. I wish to wander and be in wonder.
            </p>
            <p className="ah-story-body">
              The silence and clarity arrived at high altitude. My brain was decluttered. I wanted to learn and grow through travel and witness the lives of different cultures.
            </p>
            <p className="ah-story-body">
              A stillness settled in my heart and from that emerged a decision to sponsor children affected by the floods. The universe played its part — a waitlist of open hearts grew, and just like that, 53 children found sponsors.
            </p>
            <p className="ah-story-body">
              10 years of returning and of bonds that were, and remain, beautifully real. That chapter found its natural close.
            </p>
            <p className="ah-story-body">
              Yet the pull remains: to wander into places that stretch beyond comfort, to stay in that constant state of observation and seeking within a stillness, wholesome emptiness and a filled nothingness.
            </p>
          </FU>

        </div>
      </section>

      {/* ── Story → Believes divider ── */}
      <div className="ah-hero-divider">
        <img src="/assets/05. GRAPHIC ELEMENTS/Dividers/Divider - Center.png" alt="" aria-hidden="true" />
      </div>

      {/* BELIEVES */}
      <section className="ah-believes">
        <FU>
          <p className="ah-believes-eyebrow">What I Believe</p>
          <h2 className="ah-believes-h2">
            Stillness arrives. If it is allowed.
          </h2>
          <p className="ah-believes-body">
            I believe in the slow accumulation of real moments: a bowl of morning tea, a conversation at altitude, the sound of butter lamps in the dark. The ordinary things that turn out to be extraordinary.
          </p>
          <p className="ah-believes-body">
            I believe that the people who guide us matter as much as the places we visit. Every host, every monk, every family I introduce you to: these are relationships I have tended for years. You are welcomed as a guest, with the warmth of long-held friendships.
          </p>
          <p className="ah-believes-body">
            And I believe that the right journey, at the right time, can do something that nothing else can. It can give you back to yourself.
          </p>
          <p className="ah-believes-body" style={{ textAlign: 'center', marginTop: 32 }}>
            I hope you will join me.
          </p>
          <div className="ah-sig">Harsha</div>
        </FU>
      </section>


      <div className="ah-hero-divider">
        <img src="/assets/05. GRAPHIC ELEMENTS/Dividers/Divider - Center.png" alt="" aria-hidden="true" />
      </div>

      <Footer />
    </>
  );
}
