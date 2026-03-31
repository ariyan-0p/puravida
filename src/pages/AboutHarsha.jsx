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
    <div ref={ref} className={`afu${vis ? ' ain' : ''} ${className}`}
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

export default function AboutHarsha() {
  useEffect(() => { window.scrollTo(0, 0); document.title = 'About Harsha | PuraVida with Harsha'; }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@300;400;700&family=Lora:ital,wght@0,400;1,400&display=swap');

        .afu { opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease, transform 0.8s ease; }
        .ain { opacity: 1; transform: translateY(0); }

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
          background: #F5F0EB;
          padding: 120px 80px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }
        .ah-story-left {
          position: sticky;
          top: 120px;
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
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: #C9A050;
          margin-bottom: 24px;
        }
        .ah-story-h2 {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          line-height: 1.2;
          color: #333333;
          margin-bottom: 32px;
        }
        .ah-story-body {
          font-family: 'Lato', sans-serif;
          font-size: 17px;
          line-height: 1.85;
          color: #333333;
          margin-bottom: 24px;
        }
        .ah-story-body:last-of-type { margin-bottom: 0; }

        /* ── QUOTE STRIP ── */
        .ah-quote-strip {
          background: #B7C8B5;
          padding: 100px 80px;
          text-align: center;
        }
        .ah-quote {
          font-family: 'Lora', serif;
          font-style: italic;
          font-size: clamp(1.2rem, 2.2vw, 1.7rem);
          line-height: 1.75;
          color: #333333;
          max-width: 720px;
          margin: 0 auto 20px;
        }
        .ah-quote-attr {
          font-family: 'Lato', sans-serif;
          font-size: 13px;
          letter-spacing: 0.12em;
          color: rgba(51,51,51,0.55);
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
          max-width: 880px;
          margin: 0 auto;
        }
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
          align-items: center;
          gap: 16px;
        }
        .ah-sig::before {
          content: '';
          width: 32px; height: 1px;
          background: #D9A6A1;
          flex-shrink: 0;
        }

        /* ── CTA ── */
        .ah-cta {
          background: #333333;
          padding: 120px 80px;
          text-align: center;
        }
        .ah-cta-h2 {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: clamp(1.8rem, 3.5vw, 3rem);
          color: #ffffff;
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

      {/* HERO */}
      <section className="ah-hero">
        <div className="ah-hero-left">
          <p className="ah-hero-eyebrow">About Harsha</p>
          <h1 className="ah-hero-h1">
            Ten years ago,<br />
            I went to Ladakh.<br />
            I have been returning<br />
            ever since.
          </h1>
          <p className="ah-hero-tagline">
            Founder of PuraVida with Harsha. Transformational travel guide. Based in Dubai.
          </p>
          <p className="ah-hero-scroll">Scroll to read her story</p>
        </div>
        <div className="ah-hero-right">
          <div className="ah-hero-img" />
        </div>
      </section>

      {/* STORY */}
      <section className="ah-story">
        <FU className="ah-story-left">
          <img
            src="/assets/harsha-portrait.jpg"
            alt="Harsha, founder of PuraVida"
            className="ah-story-img"
          />
          <p className="ah-story-img-caption">Harsha · Dubai</p>
        </FU>

        <div className="ah-story-right">
          <FU>
            <p className="ah-story-eyebrow">The Beginning</p>
            <h2 className="ah-story-h2">
              I drove into Ladakh with a rucksack and no itinerary.
            </h2>
            <p className="ah-story-body">
              Three weeks later, I came back changed in a way I could not name. The altitude had done something. The silence had done something. The people had done something.
            </p>
            <p className="ah-story-body">
              There was a monk at Hemis who sat with me for an afternoon without speaking. We watched butter lamps burn down together. When I finally left, he pressed his palms together and said nothing. I understood everything.
            </p>
            <p className="ah-story-body">
              There was a family in a village above Leh who fed me tsampa and butter tea and asked nothing in return. Not my name. Not my profession. Not where I was from. Only: are you warm? Are you well? Eat more.
            </p>
          </FU>

          <FU d={1} style={{ marginTop: 64 }}>
            <p className="ah-story-eyebrow">Why PuraVida Exists</p>
            <h2 className="ah-story-h2">
              What if travel was about arriving fully?
            </h2>
            <p className="ah-story-body">
              I kept returning to Ladakh, to Bhutan, to the places that had changed me. Each time, I brought someone with me. A colleague. A friend going through something difficult. A stranger who had emailed asking if they could come along.
            </p>
            <p className="ah-story-body">
              PuraVida began with a single question: what if travel was not about ticking destinations, but about arriving fully, and being changed by that arrival?
            </p>
            <p className="ah-story-body">
              Every journey I lead, I lead because I have walked that ground myself. Because the families in Ladakh and Bhutan pour tea for me the way they pour it for family. Because I know which mornings are worth waking for at four in the dark.
            </p>
          </FU>

          <FU d={2} style={{ marginTop: 64 }}>
            <p className="ah-story-eyebrow">How I Work</p>
            <h2 className="ah-story-h2">
              Personal attention. Founder-led. Fully present.
            </h2>
            <p className="ah-story-body">
              I lead every journey personally. I am with you at the monastery at dawn and at the dinner table at dusk. The itinerary is handcrafted each season, composed with full attention.
            </p>
            <p className="ah-story-body">
              Groups stay small, below twenty people, because intimacy is the point. You will know each person by the second day. You will likely know yourself a little differently by the last.
            </p>
          </FU>
        </div>
      </section>

      {/* QUOTE STRIP */}
      <div className="ah-quote-strip">
        <FU>
          <Divider width={160} opacity={0.4} />
          <p className="ah-quote" style={{ marginTop: 40 }}>
            Tea tastes different in Bhutan: slower, quieter, exactly where you are.
          </p>
          <p className="ah-quote-attr" style={{ marginTop: 20 }}>Harsha</p>
          <div style={{ marginTop: 40 }}><Divider width={160} opacity={0.4} /></div>
        </FU>
      </div>

      {/* RIVER MOMENT */}
      <section className="ah-river">
        <div className="ah-river-img" />
        <FU className="ah-river-text">
          <p className="ah-river-quote">
            Stillness arrives in the ordinary moment, fully entered.
          </p>
          <p className="ah-river-attr">Harsha</p>
        </FU>
      </section>

      {/* BELIEVES */}
      <section className="ah-believes">
        <FU>
          <p className="ah-believes-eyebrow">What I Believe</p>
          <h2 className="ah-believes-h2">
            Stillness arrives. It is allowed.
          </h2>
          <p className="ah-believes-body">
            I believe in the slow accumulation of real moments: a bowl of morning tea, a conversation at altitude, the sound of butter lamps in the dark. The ordinary things that turn out to be extraordinary.
          </p>
          <p className="ah-believes-body">
            I believe that the people who guide us matter as much as the places we visit. Every host, every monk, every family I introduce you to: these are relationships I have tended for years. You are welcomed as a guest, with the warmth of long-held relationships.
          </p>
          <p className="ah-believes-body">
            And I believe that the right journey, at the right time, can do something that nothing else can. It can give you back to yourself.
          </p>
          <p className="ah-believes-body">
            I hope you will join us.
          </p>
          <div className="ah-sig">Harsha</div>
        </FU>
      </section>

      {/* CTA */}
      <section className="ah-cta">
        <FU>
          <h2 className="ah-cta-h2">
            There is space for you,<br />if it calls.
          </h2>
          <p className="ah-cta-body">
            Begin with a conversation. Message Harsha directly and tell her what you are looking for.
          </p>
          <a
            href="https://wa.me/+971562216643?text=Hello%20Harsha%2C%20I%20would%20love%20to%20learn%20more%20about%20your%202026%20journeys."
            className="ah-cta-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Begin a Conversation
          </a>
        </FU>
      </section>

      <Footer />
    </>
  );
}
