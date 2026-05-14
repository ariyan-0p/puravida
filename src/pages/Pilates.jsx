import { useState, useEffect, useRef } from 'react';
import Nav from '../components/Nav';
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
    <div ref={ref} className={`pilfu${vis ? ' pilin' : ''} ${className}`}
      style={{ transitionDelay: `${d * 0.13}s`, ...style }}>
      {children}
    </div>
  );
}

export default function Pilates() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'PuraVida Pilates | PuraVida with Harsha';
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Lora:ital,wght@0,400;1,400&display=swap');

        .pilfu { opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease, transform 0.8s ease; }
        .pilfu.pilin { opacity: 1; transform: translateY(0); }

        html, body { overflow: hidden; }

        .pil-section {
          height: 100vh;
          min-height: 640px;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: stretch;
          background: #333333;
          box-sizing: border-box;
        }
        .pil-left {
          position: relative;
          z-index: 2;
          flex: 0 0 48%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 110px 56px 56px 80px;
          min-height: 0;
        }
        .pil-eyebrow {
          font-family: 'Lora', serif;
          font-style: italic;
          font-weight: 700;
          font-size: clamp(2.4rem, 4.4vw, 4.4rem);
          line-height: 1.1;
          color: #C9A050;
          margin: 0 0 clamp(20px, 3vw, 32px);
          letter-spacing: 0.01em;
        }
        .pil-body {
          font-family: 'Lato', sans-serif;
          font-weight: 400;
          font-size: 16px;
          line-height: 1.85;
          color: rgba(255,255,255,0.8);
          max-width: 560px;
          margin: 0 0 20px;
        }
        .pil-body:last-of-type { margin-bottom: 0; }

        .pil-right {
          flex: 1;
          position: relative;
          min-height: 500px;
          overflow: hidden;
        }
        .pil-img {
          position: absolute;
          inset: 0;
          background: center / cover no-repeat;
        }
        .pil-img::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to right, #333333 0%, rgba(51,51,51,0.4) 3%, transparent 9%),
            linear-gradient(to bottom, transparent 40%, rgba(51,51,51,0.35) 60%, rgba(51,51,51,0.75) 80%, #333333 100%);
        }

        @media (max-width: 900px) {
          html, body { overflow: auto; }
          .pil-section {
            flex-direction: column;
            height: auto;
            min-height: 100vh;
          }
          .pil-left {
            flex: none;
            padding: 110px 40px 40px;
          }
          .pil-right {
            flex: none;
            order: -1;
            height: 60vh;
            min-height: 420px;
            width: 100%;
          }
          .pil-img { background-position: center 25% !important; }
          .pil-img::after {
            background:
              linear-gradient(to bottom, transparent 50%, rgba(51,51,51,0.4) 75%, #333333 100%);
          }
          .pil-body { font-size: 16px; line-height: 1.7; margin-bottom: 18px; max-width: none; }
        }
        @media (max-width: 600px) {
          .pil-left { padding: 90px 28px 40px; }
          .pil-body { font-size: 15px; }
        }
      `}</style>

      <Nav />
      <WhatsAppButton />

      <section className="pil-section">
        <div className="pil-left">
          <FU>
            <h1 className="pil-eyebrow">PuraVida Pilates</h1>
            <p className="pil-body">
              I am a certified classical Pilates teacher. Pilates &mdash; a complete coordination of body, mind, and spirit &mdash; remains one of the most intelligent, anatomically precise approaches to movement.
            </p>
            <p className="pil-body">
              I teach from my private studio in Dubai and work exclusively with women and teenagers. The work is slow, precise, and deeply personal. Each body carries its own history. Each spine tells its own story.
            </p>
            <p className="pil-body">
              I stay present and focused with a commitment to restoration. Our spine and breath carry us through life and I believe that self-discipline begins within &mdash; first knowing your body and respecting it at every stage of life.
            </p>
            <p className="pil-body">
              The same presence I bring to the studio, I carry into every journey I curate.
            </p>
            <p className="pil-body">
              I welcome you to begin the PuraVida way. In the body, in the breath.
            </p>
          </FU>
        </div>
        <div className="pil-right">
          <div
            className="pil-img"
            style={{ backgroundImage: 'url("/assets/pilates-harsha.jpg")' }}
            role="img"
            aria-label="Harsha in her Pilates studio"
          />
        </div>
      </section>
    </>
  );
}
