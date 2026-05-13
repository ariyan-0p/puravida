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
          background: #333333;
          padding: 120px 80px 40px;
          height: 100vh;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .pil-inner {
          max-width: 960px;
          width: 100%;
        }
        .pil-eyebrow {
          font-family: 'Lora', serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(1.4rem, 3.6vw, 2.8rem);
          line-height: 1.2;
          letter-spacing: 0.01em;
          color: #C9A050;
          margin: 0 0 28px;
          white-space: nowrap;
        }
        .pil-body {
          font-family: 'Lato', sans-serif;
          font-weight: 300;
          font-size: clamp(0.95rem, 1.25vw, 1.05rem);
          line-height: 1.6;
          color: #F5F0EB;
          margin: 0 0 14px;
          max-width: 820px;
        }
        .pil-body:last-of-type { margin-bottom: 0; }

        @media (max-width: 900px) {
          html, body { overflow: auto; }
          .pil-section { height: auto; min-height: 100vh; padding: 140px 40px 80px; overflow: visible; }
          .pil-body { font-size: 16px; line-height: 1.7; margin-bottom: 18px; }
          .pil-eyebrow { margin-bottom: 32px; }
        }
        @media (max-width: 600px) {
          .pil-section { padding: 120px 28px 60px; }
          .pil-body { font-size: 15px; }
        }
      `}</style>

      <Nav />
      <WhatsAppButton />

      <section className="pil-section">
        <div className="pil-inner">
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
      </section>
    </>
  );
}
