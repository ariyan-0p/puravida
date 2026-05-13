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
    <div ref={ref} className={`phfu${vis ? ' phin' : ''} ${className}`}
      style={{ transitionDelay: `${d * 0.13}s`, ...style }}>
      {children}
    </div>
  );
}

export default function Philosophy() {
  useEffect(() => { window.scrollTo(0, 0); document.title = 'Why PuraVida exists | PuraVida with Harsha'; }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@300;400;700&family=Lora:ital,wght@0,400;1,400&display=swap');

        .phfu { opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease, transform 0.8s ease; }
        .phfu.phin { opacity: 1; transform: translateY(0); }

        .ph-why {
          background: #333333;
          padding: 200px 80px 180px;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ph-why-inner {
          max-width: 960px;
          width: 100%;
        }
        .ph-why-eyebrow {
          font-family: 'Lora', serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(1.6rem, 4.2vw, 3.4rem);
          line-height: 1.2;
          letter-spacing: 0.01em;
          color: #C9A050;
          margin: 0 0 48px;
          white-space: nowrap;
        }
        .ph-why-body {
          font-family: 'Lato', sans-serif;
          font-weight: 300;
          font-size: 19px;
          line-height: 1.85;
          color: #F5F0EB;
          margin: 0 0 24px;
        }
        .ph-why-body:last-of-type { margin-bottom: 0; }

        @media (max-width: 900px) {
          .ph-why { padding: 160px 40px 140px; }
          .ph-why-body { font-size: 17px; }
        }
        @media (max-width: 600px) {
          .ph-why { padding: 140px 28px 120px; }
          .ph-why-body { font-size: 16px; line-height: 1.8; }
        }
      `}</style>

      <Nav />
      <WhatsAppButton />

      <section className="ph-why">
        <div className="ph-why-inner">
          <FU>
            <h1 className="ph-why-eyebrow">Why PuraVida with Harsha Exists?</h1>
            <p className="ph-why-body">
              PuraVida in Costa Rican tradition means &ldquo;Pure Life&rdquo; &mdash; a way of being that is unhurried, grateful, and fully present. For me, this is how I wish to live.
            </p>
            <p className="ph-why-body">
              What if travel was about arriving fully, being present and being changed by that arrival?
            </p>
            <p className="ph-why-body">
              This is the essence of every journey I curate. Being present. Being present together &mdash; in that arrival, in that change. For growth. For transformation.
            </p>
          </FU>
        </div>
      </section>

      <Footer />
    </>
  );
}
