import { useEffect } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const DESTINATIONS = {
  bali: {
    name: "Bali",
    tagline: "Ritual, Rice, and Renewal",
    dates: "October 1\u20136, 2026",
    duration: "6 Days",
    hero: "/assets/hero-bali.jpg",
    gradient: "linear-gradient(158deg, #4a7050 0%, #2e4d32 40%, #142416 100%)",
    description: "An island where offering and everyday life are the same gesture. Where rice terraces hold centuries of communal wisdom. Where sacred and ordinary share the same morning.",
  },
  japan: {
    name: "Japan",
    tagline: "Stillness in Snow, Hokkaido",
    dates: "November 15\u201321, 2026",
    duration: "7 Days",
    hero: "/assets/hero-japan.jpg",
    gradient: "linear-gradient(158deg, #b8a0a0 0%, #887070 45%, #503838 100%)",
    description: "Hokkaido in November: birch forests under first snow, onsen steam rising into frozen air, kaiseki served with no words, only presence.",
  },
};

export default function ComingSoon({ slug }) {
  const d = DESTINATIONS[slug];

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!d) return null;

  return (
    <>
      <style>{`
        .cs-hero {
          min-height: 100vh; position: relative; overflow: hidden;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center;
        }
        .cs-hero-bg {
          position: absolute; inset: 0;
          background-size: cover; background-position: center;
        }
        .cs-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom,
            rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 40%,
            rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.7) 100%);
        }
        .cs-content {
          position: relative; z-index: 2;
          max-width: 600px; padding: 0 40px;
        }
        .cs-logo {
          height: 80px; width: auto; margin-bottom: 48px;
          filter: brightness(0) invert(1);
        }
        .cs-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 600; font-size: clamp(4rem, 12vw, 8rem);
          color: white; line-height: 0.9; margin-bottom: 16px;
          text-shadow: 0 4px 40px rgba(0,0,0,0.3);
        }
        .cs-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-size: clamp(1rem, 2vw, 1.4rem);
          color: rgba(255,255,255,0.7); margin-bottom: 48px;
        }
        .cs-desc {
          font-family: 'Lato', sans-serif;
          font-size: 16px; line-height: 1.75;
          color: rgba(255,255,255,0.8);
          margin-bottom: 20px;
        }
        .cs-dates {
          font-family: 'Lato', sans-serif;
          font-size: 14px; letter-spacing: 0.12em;
          color: rgba(255,255,255,0.5);
          margin-bottom: 48px;
        }
        .cs-divider {
          width: 40px; height: 1px; background: rgba(201,168,168,0.5);
          margin: 0 auto 48px;
        }
        .cs-note {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-size: 1.2rem;
          color: rgba(255,255,255,0.65);
          margin-bottom: 40px; line-height: 1.5;
        }
        .cs-btn {
          display: inline-block;
          font-family: 'Lato', sans-serif; font-size: 16px; font-weight: 700;
          color: #2B2B2B; background: #C9A8A8;
          padding: 16px 36px; border-radius: 4px;
          text-decoration: none;
          transition: background 0.35s, color 0.35s;
        }
        .cs-btn:hover { background: #A07878; color: #FAFAF8; }
      `}</style>

      <div className="grain" aria-hidden="true" />
      <Nav />
      <WhatsAppButton />

      <section className="cs-hero">
        <div
          className="cs-hero-bg"
          style={{
            backgroundImage: `url('${d.hero}'), ${d.gradient}`
          }}
        />
        <div className="cs-hero-overlay" />
        <div className="cs-content">
          <img src="/assets/Logo-Main.png" alt="PuraVida" className="cs-logo" />
          <h1 className="cs-title">{d.name}</h1>
          <p className="cs-tagline">{d.tagline}</p>
          <p className="cs-desc">{d.description}</p>
          <p className="cs-dates">{d.duration} &middot; {d.dates}</p>
          <div className="cs-divider" />
          <p className="cs-note">
            The full itinerary for {d.name} is being carefully composed.<br />
            Message Harsha to register your interest.
          </p>
          <a
            href={`https://wa.me/+971562216643?text=I'm%20interested%20in%20${encodeURIComponent(d.name)}`}
            className="cs-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Begin a Conversation
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}