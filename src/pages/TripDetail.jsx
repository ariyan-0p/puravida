import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { tripsData } from '../data/trips';

// Fade-up hook
function useFadeUp() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
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
      style={{ transitionDelay: `${d * 0.14}s`, ...style }}>
      {children}
    </div>
  );
}

export default function TripDetail({ tripSlug }) {
  const [progress, setProgress] = useState(0);
  const trip = tripsData[tripSlug];

  useEffect(() => {
    window.scrollTo(0, 0);
    const fn = () => {
      setProgress((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [tripSlug]);

  if (!trip) {
    return <div style={{padding:'100px 20px', textAlign:'center'}}>Trip not found</div>;
  }

  return (
    <>
      <style>{`
        /* ALL 9 PRINCIPLES APPLIED TO TRIP PAGES */
        
        /* PRINCIPLE 2: Minimal overlay, large image */
        .trip-hero {
          min-height: 75vh;
          display: flex; align-items: flex-end;
          position: relative; overflow: hidden;
          background: ${trip.hero.gradient};
        }
        .trip-hero-bg {
          position: absolute; inset: 0;
          background: url('${trip.hero.image}') center center / cover no-repeat,
            ${trip.hero.gradient};
        }
        .trip-hero::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%);
        }
        .trip-hero::after {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(to right, transparent, rgba(217,166,161,0.35), transparent);
        }
        .trip-hero-content {
          position: relative; z-index: 1;
          padding: 80px 100px; /* PRINCIPLE 1: 100px padding */
          max-width: 1000px;
        }
        .trip-breadcrumb {
          font-family: 'Inter', sans-serif;
          font-size: 0.56rem; letter-spacing: 0.28em; text-transform: uppercase;
          color: rgba(255,255,255,0.6); margin-bottom: 24px;
          display: flex; align-items: center; gap: 12px;
        }
        .trip-breadcrumb a {
          color: rgba(255,255,255,0.7); text-decoration: none; transition: color 0.3s;
        }
        .trip-breadcrumb a:hover { color: #D9A6A1; }
        .trip-eyebrow {
          font-family: 'Inter', sans-serif;
          font-size: 0.58rem; font-weight: 400; letter-spacing: 0.3em; text-transform: uppercase;
          color: #D9A6A1; margin-bottom: 20px;
        }
        .trip-h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3.5rem, 7vw, 6rem); font-weight: 300; line-height: 1;
          color: var(--white); margin-bottom: 16px;
        }
        .trip-sub {
          font-family: 'Cormorant Garamond', serif; font-style: italic;
          font-size: 1.4rem; color: #D9A6A1; margin-bottom: 32px;
        }
        .trip-meta {
          display: flex; gap: 40px; flex-wrap: wrap;
          font-family: 'Lato', sans-serif; font-size: 0.86rem; color: rgba(255,255,255,0.85);
        }
        .trip-meta-item { display: flex; flex-direction: column; gap: 4px; }
        .trip-meta-label {
          font-size: 0.56rem; letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(255,255,255,0.5);
        }

        /* PRINCIPLE 5: "Why This Journey" - Educational depth */
        .trip-philosophy {
          background: var(--white); 
          padding: 100px; /* PRINCIPLE 1: 100px padding */
          display: grid; grid-template-columns: 1fr 1fr; 
          gap: 100px; /* PRINCIPLE 1: Generous gap */
          align-items: start;
        }
        .trip-phil-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 3.5vw, 3.2rem); font-weight: 300; line-height: 1.2;
          color: #333333; margin-bottom: 40px;
        }
        .trip-phil-p {
          font-family: 'Lato', sans-serif;
          font-size: 1rem; 
          line-height: 1.7; /* PRINCIPLE 1: 1.7 line-height */
          color: #404040; margin-bottom: 18px;
        }

        /* PRINCIPLE 8: PDF-style itinerary */
        .trip-itinerary {
          background: var(--mist); 
          padding: 100px; /* PRINCIPLE 1: 100px padding */
        }
        .trip-itin-header {
          text-align: center; margin-bottom: 80px; 
          max-width: 720px; /* PRINCIPLE 1: 720px max */
          margin-left: auto; margin-right: auto;
        }
        .trip-itin-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.4rem, 4vw, 3.8rem); font-weight: 300; color: #333333;
          margin-bottom: 16px;
        }
        .trip-itin-sub {
          font-family: 'Lato', sans-serif;
          font-size: 0.86rem; 
          line-height: 1.7; /* PRINCIPLE 1: 1.7 line-height */
          letter-spacing: 0.1em; color: #606060;
        }
        
        /* PRINCIPLE 8: Alternating backgrounds (beige/white), 2-column grid */
        .trip-itin-grid {
          display: grid; grid-template-columns: 1fr 1fr; 
          gap: 16px; /* PRINCIPLE 1: Never tight */
          max-width: 1200px; margin: 0 auto;
        }
        
        /* PRINCIPLE 8: Beige/cream cards, Clay Rose day numbers */
        .day-card {
          background: var(--cream); /* PRINCIPLE 8: Beige/cream background */
          border: 1px solid rgba(217,166,161,0.14);
          padding: 40px; /* PRINCIPLE 1: Generous padding */
          position: relative;
          transition: box-shadow 0.4s, transform 0.4s;
        }
        .day-card:nth-child(even) {
          background: var(--white); /* PRINCIPLE 8: Alternating backgrounds */
        }
        .day-card:hover {
          box-shadow: 0 12px 48px rgba(43,43,43,0.08);
          transform: translateY(-2px);
        }
        /* PRINCIPLE 8: Clay Rose top border */
        .day-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(to right, #D9A6A1, #B7A090); /* Clay Rose */
        }
        /* PRINCIPLE 8: Day numbers in Clay Rose */
        .day-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.95rem; font-weight: 400; letter-spacing: 0.1em; text-transform: uppercase;
          color: #D9A6A1; /* PRINCIPLE 8: Clay Rose */
          margin-bottom: 12px;
        }
        .day-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem; font-weight: 400; color: #333333; 
          margin-bottom: 20px; line-height: 1.3;
        }
        .day-experience {
          font-family: 'Lato', sans-serif;
          font-size: 0.92rem; 
          line-height: 1.7; /* PRINCIPLE 1: 1.7 line-height */
          color: #404040; margin-bottom: 24px;
        }
        /* PRINCIPLE 8: Overnight accommodation in sage footer */
        .day-overnight {
          display: flex; align-items: center; gap: 12px; padding-top: 20px;
          border-top: 1px solid rgba(183,200,181,0.3); /* Sage border */
          font-family: 'Lato', sans-serif; font-size: 0.8rem; color: #606060;
          background: rgba(221,229,223,0.15); /* PRINCIPLE 8: Sage tint */
          margin: 0 -40px -40px; padding: 20px 40px;
        }
        .day-overnight::before {
          content: ''; width: 16px; height: 1px; background: #B7C8B5; opacity: 0.6;
        }

        /* PRINCIPLE 6: "What I've Learned" - Founder voice */
        .trip-harsha-voice {
          background: #DDE5DF; /* PRINCIPLE 9: Soft Sage */
          padding: 100px; /* PRINCIPLE 1: 100px padding */
          display: grid; grid-template-columns: 1fr 1.2fr; 
          gap: 100px; align-items: center;
        }
        .trip-hv-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 3.2vw, 3rem); font-weight: 300; font-style: italic;
          color: #333333; margin-bottom: 32px;
        }
        .trip-hv-content {
          font-family: 'Lato', sans-serif;
          font-size: 1rem; 
          line-height: 1.7; /* PRINCIPLE 1: 1.7 line-height */
          color: #404040;
        }
        .trip-hv-sig {
          margin-top: 40px; display: flex; align-items: center; gap: 12px;
          font-family: 'Cormorant Garamond', serif; font-style: italic;
          font-size: 1.05rem; color: #D9A6A1;
        }
        .trip-hv-sig::before {
          content: ''; width: 24px; height: 1px; background: #D9A6A1; opacity: 0.7;
        }

        /* What's Included */
        .trip-included {
          background: var(--white); 
          padding: 100px; /* PRINCIPLE 1: 100px padding */
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px;
        }
        .trip-inc-col h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem; font-weight: 400; color: #333333; margin-bottom: 32px;
        }
        .trip-inc-list {
          list-style: none; display: flex; flex-direction: column; gap: 16px;
        }
        .trip-inc-list li {
          font-family: 'Lato', sans-serif;
          font-size: 0.92rem; 
          line-height: 1.7; /* PRINCIPLE 1: 1.7 line-height */
          color: #404040;
          padding-left: 28px; position: relative;
        }
        .trip-inc-list li::before {
          content: '✓'; position: absolute; left: 0; color: #D9A6A1;
          font-weight: 600; font-size: 1rem;
        }
        .trip-exc-list li::before { content: '—'; color: #787878; }

        /* Testimonials */
        .trip-testimonials {
          background: var(--mist); 
          padding: 100px; /* PRINCIPLE 1: 100px padding */
        }
        .trip-test-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 3vw, 2.8rem); font-weight: 300;
          color: #333333; text-align: center; margin-bottom: 60px;
        }
        .trip-test-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 16px; max-width: 1000px; margin: 0 auto;
        }

        /* PRINCIPLE 4: Anti-urgency CTA */
        .trip-cta {
          background: var(--cream); 
          padding: 100px; /* PRINCIPLE 1: 100px padding */
          text-align: center;
        }
        .trip-cta-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.4rem, 4.5vw, 4rem); font-weight: 300; line-height: 1.1;
          color: #333333; margin-bottom: 32px;
        }
        .trip-cta-h2 em { font-style: italic; color: #D9A6A1; }
        .trip-cta-p {
          font-family: 'Lato', sans-serif;
          font-size: 0.96rem; 
          line-height: 1.7; /* PRINCIPLE 1: 1.7 line-height */
          color: #404040;
          max-width: 520px; margin: 0 auto 48px;
        }
        /* PRINCIPLE 6: "Message Harsha" button */
        .trip-cta-btn {
          display: inline-flex; align-items: center; gap: 16px;
          font-family: 'Inter', sans-serif;
          font-size: 0.62rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--white); text-decoration: none; padding: 18px 36px;
          position: relative; overflow: hidden; transition: gap 0.3s;
        }
        .trip-cta-btn-bg { position: absolute; inset: 0; background: #333333; z-index: 0; }
        .trip-cta-btn-bg2 {
          position: absolute; inset: 0; background: #D9A6A1;
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.45s cubic-bezier(.16,1,.3,1); z-index: 0;
        }
        .trip-cta-btn:hover .trip-cta-btn-bg2 { transform: scaleX(1); }
        .trip-cta-btn:hover { gap: 24px; }
        .trip-cta-btn span { position: relative; z-index: 1; }

        /* RESPONSIVE - Maintaining all principles */
        @media (max-width: 1024px) {
          .trip-hero-content { padding: 80px 60px; }
          .trip-philosophy { grid-template-columns: 1fr; padding: 80px; gap: 60px; }
          .trip-itinerary { padding: 80px; }
          .trip-harsha-voice { grid-template-columns: 1fr; padding: 80px; gap: 60px; }
          .trip-included { grid-template-columns: 1fr; padding: 80px; gap: 60px; }
          .trip-testimonials { padding: 80px; }
          .trip-cta { padding: 80px; }
        }

        @media (max-width: 768px) {
          .trip-hero-content { padding: 60px 32px; }
          .trip-philosophy { padding: 60px 32px; gap: 48px; }
          .trip-itinerary { padding: 60px 32px; }
          .trip-itin-grid { grid-template-columns: 1fr; }
          .trip-harsha-voice { padding: 60px 32px; gap: 48px; }
          .trip-included { padding: 60px 32px; gap: 48px; }
          .trip-testimonials { padding: 60px 32px; }
          .trip-cta { padding: 60px 32px; }
        }
      `}</style>

      <div className="grain" aria-hidden="true" />
      <div className="pv-progress" style={{ width: `${progress}%` }} aria-hidden="true" />

      <Nav />

      {/* HERO - PRINCIPLE 2: Minimal overlay */}
      <section className="trip-hero">
        <div className="trip-hero-bg" />
        <div className="trip-hero-content">
          <div className="trip-breadcrumb">
            <Link to="/">Home</Link>
            <span>→</span>
            <span>{trip.name}</span>
          </div>
          <p className="trip-eyebrow">{trip.subtitle}</p>
          <h1 className="trip-h1">{trip.name}</h1>
          <p className="trip-sub">{trip.tagline}</p>
          <div className="trip-meta">
            <div className="trip-meta-item">
              <span className="trip-meta-label">Duration</span>
              <span>{trip.duration}</span>
            </div>
            <div className="trip-meta-item">
              <span className="trip-meta-label">Dates</span>
              <span>{trip.dates}</span>
            </div>
            <div className="trip-meta-item">
              <span className="trip-meta-label">Group Size</span>
              <span>{trip.groupSize}</span>
            </div>
            <div className="trip-meta-item">
              <span className="trip-meta-label">Investment</span>
              <span>{trip.price}</span>
            </div>
          </div>
        </div>
      </section>

      {/* PRINCIPLE 5: "Why This Journey" - Educational depth */}
      <section className="trip-philosophy">
        <FU>
          <h2 className="trip-phil-h2">{trip.philosophy.title}</h2>
        </FU>
        <FU d={1}>
          <div>
            {trip.philosophy.paragraphs.map((p, i) => (
              <p key={i} className="trip-phil-p">{p}</p>
            ))}
          </div>
        </FU>
      </section>

      {/* PRINCIPLE 8: PDF-style Day-by-Day Itinerary */}
      <section className="trip-itinerary">
        <div className="trip-itin-header">
          <FU>
            <h2 className="trip-itin-h2">Day-by-Day Itinerary</h2>
            <p className="trip-itin-sub">{trip.duration} · {trip.name}</p>
          </FU>
        </div>
        <div className="trip-itin-grid">
          {trip.itinerary.map((day, i) => (
            <FU key={i} d={i % 4}>
              <div className="day-card">
                {/* PRINCIPLE 8: Day numbers in Clay Rose */}
                <p className="day-num">Day {day.day}</p>
                <h3 className="day-title">{day.title}</h3>
                {/* PRINCIPLE 5: "The Experience" sections */}
                <p className="day-experience">{day.experience}</p>
                {/* PRINCIPLE 8: Overnight in sage footer */}
                <p className="day-overnight">Overnight: {day.overnight}</p>
              </div>
            </FU>
          ))}
        </div>
      </section>

      {/* PRINCIPLE 6: "What I've Learned" - Founder voice */}
      {trip.harshaVoice && (
        <section className="trip-harsha-voice">
          <FU>
            <h2 className="trip-hv-h2">{trip.harshaVoice.title}</h2>
          </FU>
          <FU d={1}>
            <div>
              <p className="trip-hv-content">{trip.harshaVoice.content}</p>
              <p className="trip-hv-sig">Harsha</p>
            </div>
          </FU>
        </section>
      )}

      {/* What's Included */}
      <section className="trip-included">
        <FU>
          <div className="trip-inc-col">
            <h3>What's Included</h3>
            <ul className="trip-inc-list">
              {trip.included.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </FU>
        <FU d={1}>
          <div className="trip-inc-col">
            <h3>Not Included</h3>
            <ul className="trip-inc-list trip-exc-list">
              {trip.notIncluded.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </FU>
      </section>

      {/* PRINCIPLE 4: Transformation stories */}
      {trip.testimonials && trip.testimonials.length > 0 && (
        <section className="trip-testimonials">
          <FU>
            <h2 className="trip-test-h2">Voices from past journeys</h2>
          </FU>
          <div className="trip-test-grid">
            {trip.testimonials.map((t, i) => (
              <FU key={i} d={i}>
                <div className="v-card">
                  <p className="v-q">"{t.quote}"</p>
                  <div className="v-sep" />
                  <p className="v-name">{t.name}</p>
                  <p className="v-trip">{t.trip}</p>
                </div>
              </FU>
            ))}
          </div>
        </section>
      )}

      {/* PRINCIPLE 4 & 6: Anti-urgency, "Message Harsha" */}
      <section className="trip-cta">
        <FU>
          <h2 className="trip-cta-h2">
            Ready to begin<br />this <em>journey?</em>
          </h2>
          <p className="trip-cta-p">
            Every journey starts with a conversation. Message Harsha on WhatsApp to discuss {trip.name}, ask questions, or simply explore if this is the right journey for you.
          </p>
          <a href={`https://wa.me/+971562216643?text=I'm interested in ${trip.name}`}
            className="trip-cta-btn" target="_blank" rel="noopener noreferrer">
            <div className="trip-cta-btn-bg" />
            <div className="trip-cta-btn-bg2" />
            <span>Message Harsha →</span>
          </a>
        </FU>
      </section>

      <Footer />
    </>
  );
}