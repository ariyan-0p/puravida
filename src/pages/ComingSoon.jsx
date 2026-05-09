import { useEffect } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const DESTINATIONS = {
  bali: {
    name: "Bali",
    tagline: "",
    dates: "October 1 to 6, 2026",
    duration: "6 Days",
    hero: "/assets/journey-bali.jpg",
    gradient: "linear-gradient(158deg, #4a7050 0%, #2e4d32 40%, #142416 100%)",
    invitation: {
      heading: "An Invitation from Harsha",
      paragraphs: [
        "Bali has a way of drawing you inward. The rice terraces hold a geometry that quiets the mind. The temple ceremonies carry a rhythm that predates every urgency you have ever known.",
        "I am bringing a small group here in October 2026, with my childhood friend Gita, who was born in Indonesia and understands the island the way only someone raised in its culture can. Together, we will guide you through ritual, through stillness, through the kind of beauty that asks you to slow down and pay attention.",
        "If this speaks to you, I would love to tell you more.",
      ],
    },
    cta: {
      heading: "Your Journey Begins with a Message",
      button: "WhatsApp Harsha +971 56 2216643",
      href: "https://wa.me/971562216643",
    },
  },
  japan: {
    name: "Japan",
    tagline: "",
    dates: "December 2026",
    duration: "7 Days",
    hero: "/assets/journey-japan.jpg",
    gradient: "linear-gradient(158deg, #b8a0a0 0%, #887070 45%, #503838 100%)",
    invitation: {
      heading: "An Invitation from Harsha",
      paragraphs: [
        "Japan teaches you to notice. The way steam rises from a bowl of matcha. The way snow settles on a temple roof without sound. The way an entire culture has built its highest art around the practice of attention.",
        "I am taking a small group to Hokkaido in December 2026. Winter Japan is a different country: quieter, softer, wrapped in snow and lit by lanterns. The hot springs hold you. The cold air wakes you. The food is extraordinary.",
        "If this speaks to you, I would love to tell you more.",
      ],
    },
    cta: {
      heading: "Your Journey Begins with a Message",
      button: "WhatsApp Harsha +971 56 2216643",
      href: "https://wa.me/971562216643",
    },
  },
};

export default function ComingSoon({ slug }) {
  const d = DESTINATIONS[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (d) document.title = `${d.name} | PuraVida with Harsha`;
  }, [slug, d]);

  if (!d) return null;

  // New branded placeholder layout (Bali, etc.)
  if (d.invitation) {
    return (
      <>
        <style>{`
          .bp-hero {
            min-height: 100vh; position: relative; overflow: hidden;
            display: flex; flex-direction: column;
            align-items: center; justify-content: center;
            text-align: center;
          }
          .bp-hero-bg {
            position: absolute; inset: 0;
            background-size: cover; background-position: center;
          }
          .bp-hero-overlay {
            position: absolute; inset: 0;
            background: linear-gradient(to bottom,
              rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 35%,
              rgba(0,0,0,0.35) 75%, rgba(0,0,0,0.7) 100%);
          }
          .bp-hero-content {
            position: relative; z-index: 2;
            max-width: 720px; padding: 0 40px;
          }
          .bp-hero-title {
            font-family: 'Playfair Display', serif;
            font-weight: 700; font-size: clamp(4rem, 12vw, 8rem);
            color: #ffffff; line-height: 0.95;
            margin-bottom: 18px;
            text-shadow: 0 4px 40px rgba(0,0,0,0.3);
          }
          .bp-hero-dates {
            font-family: 'Lato', sans-serif;
            font-size: 14px; letter-spacing: 0.18em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.85);
            margin-bottom: 32px;
          }
          .bp-hero-tagline {
            font-family: 'Lora', serif;
            font-style: italic;
            font-size: clamp(1.05rem, 2vw, 1.4rem);
            color: #C9A050;
            letter-spacing: 0.04em;
          }

          /* INVITATION */
          .bp-invite {
            background: #B7C8B5;
            padding: 120px 80px;
            text-align: center;
          }
          .bp-invite-inner {
            max-width: 720px; margin: 0 auto;
          }
          .bp-invite-h {
            font-family: 'Playfair Display', serif;
            font-weight: 700;
            font-size: clamp(2rem, 3.5vw, 2.8rem);
            color: #333333;
            margin-bottom: 40px;
            line-height: 1.2;
          }
          .bp-invite-body {
            font-family: 'Lato', sans-serif;
            font-size: 17px;
            line-height: 1.85;
            color: #333333;
            margin-bottom: 24px;
          }
          .bp-invite-body:last-child { margin-bottom: 0; }
          .bp-divider {
            position: relative;
            z-index: 3;
            text-align: center;
            height: 0;
            line-height: 0;
          }
          .bp-divider img {
            width: 100% !important;
            max-width: 100%;
            opacity: 0.5;
            display: block;
            transform: translateY(-50%);
          }

          /* CTA */
          .bp-cta {
            background: #F5F0EB;
            padding: 120px 80px;
            text-align: center;
          }
          .bp-cta-h {
            font-family: 'Playfair Display', serif;
            font-weight: 700;
            font-size: clamp(1.8rem, 3.2vw, 2.6rem);
            color: #333333;
            margin-bottom: 40px;
            line-height: 1.25;
          }
          .bp-cta-btn {
            display: inline-block;
            font-family: 'Lato', sans-serif;
            font-size: 16px; font-weight: 700;
            color: #333333; background: #D9A6A1;
            padding: 18px 40px; border-radius: 4px;
            text-decoration: none;
            transition: background 0.35s, color 0.35s;
          }
          .bp-cta-btn:hover { background: #c08e88; color: white; }

          @media (max-width: 900px) {
            .bp-invite { padding: 80px 40px; }
            .bp-cta { padding: 80px 40px; }
          }
          @media (max-width: 600px) {
            .bp-hero-content { padding: 0 28px; }
            .bp-hero-title { font-size: clamp(3rem, 14vw, 5rem); }
            .bp-invite { padding: 64px 28px; }
            .bp-cta { padding: 64px 28px; }
          }
        `}</style>

        <Nav />
        <WhatsAppButton />

        {/* HERO */}
        <section className="bp-hero">
          <div
            className="bp-hero-bg"
            style={{ backgroundImage: `url('${d.hero}'), ${d.gradient}` }}
          />
          <div className="bp-hero-overlay" />
          <div className="bp-hero-content">
            <h1 className="bp-hero-title">{d.name}</h1>
            <p className="bp-hero-dates">{d.dates}</p>
            <p className="bp-hero-tagline">{d.tagline}</p>
          </div>
        </section>

        <div className="bp-divider">
          <img src="/assets/05. GRAPHIC ELEMENTS/Dividers/Divider - Center.png" alt="" aria-hidden="true" />
        </div>

        {/* INVITATION */}
        <section className="bp-invite">
          <div className="bp-invite-inner">
            <h2 className="bp-invite-h">{d.invitation.heading}</h2>
            {d.invitation.paragraphs.map((p, i) => (
              <p key={i} className="bp-invite-body">{p}</p>
            ))}
          </div>
        </section>

        <div className="bp-divider">
          <img src="/assets/05. GRAPHIC ELEMENTS/Dividers/Divider - Center.png" alt="" aria-hidden="true" />
        </div>

        {/* CTA */}
        <section className="bp-cta">
          <h2 className="bp-cta-h">{d.cta.heading}</h2>
          <a
            href={d.cta.href}
            className="bp-cta-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            {d.cta.button}
          </a>
        </section>

        <Footer />
      </>
    );
  }

  // Legacy placeholder layout (Japan, until updated spec arrives)
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
        }
        .cs-title {
          font-family: 'Playfair Display', serif;
          font-weight: 700; font-size: clamp(4rem, 12vw, 8rem);
          color: white; line-height: 0.9; margin-bottom: 16px;
          text-shadow: 0 4px 40px rgba(0,0,0,0.3);
        }
        .cs-tagline {
          font-family: 'Lora', serif;
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
        .cs-divider-img {
          display: block; margin: 0 auto 48px;
          width: 160px; opacity: 0.4;
          filter: brightness(0) invert(1);
        }
        .cs-note {
          font-family: 'Lora', serif;
          font-style: italic; font-size: 1.2rem;
          color: rgba(255,255,255,0.65);
          margin-bottom: 40px; line-height: 1.5;
        }
        .cs-btn {
          display: inline-block;
          font-family: 'Lato', sans-serif; font-size: 16px; font-weight: 700;
          color: #333333; background: #D9A6A1;
          padding: 16px 36px; border-radius: 4px;
          text-decoration: none;
          transition: background 0.35s, color 0.35s;
        }
        .cs-btn:hover { background: #c08e88; color: white; }

        @media (max-width: 600px) {
          .cs-content { padding: 0 28px; }
          .cs-title { font-size: clamp(3rem, 14vw, 5rem); }
        }
      `}</style>

      <Nav />
      <WhatsAppButton />

      <section className="cs-hero">
        <div
          className="cs-hero-bg"
          style={{ backgroundImage: `url('${d.hero}'), ${d.gradient}` }}
        />
        <div className="cs-hero-overlay" />
        <div className="cs-content">
          <img
            src="/assets/01. LOGOS/Logo-Main-White.png"
            alt="PuraVida with Harsha"
            className="cs-logo"
          />
          <h1 className="cs-title">{d.name}</h1>
          <p className="cs-tagline">{d.tagline}</p>
          <p className="cs-desc">{d.description}</p>
          <p className="cs-dates">{d.duration} &middot; {d.dates}</p>
          <img
            src="/assets/05. GRAPHIC ELEMENTS/Dividers/Divider - Center.png"
            alt=""
            aria-hidden="true"
            className="cs-divider-img"
          />
          <p className="cs-note">
            The full itinerary for {d.name} is being carefully composed.<br />
            Message Harsha to register your interest.
          </p>
          <a
            href={`https://wa.me/971562216643?text=I am interested in the ${d.name} journey`}
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
