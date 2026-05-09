import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
      <style>{`
        .pv-footer {
          background: #333333;
          padding: 100px 72px 52px;
        }
        .footer-top {
          display: grid; grid-template-columns: 1.8fr 1fr 1fr 1fr;
          gap: 48px; padding-bottom: 72px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .f-brand-logo {
          height: 56px; width: auto; display: block; margin-bottom: 16px;
          opacity: 0.85;
        }
        .f-tagline {
          font-family: 'Lora', serif; font-style: italic; font-size: 15px;
          color: rgba(255,255,255,0.65); line-height: 1.85; margin-bottom: 28px;
        }
        .f-contact {
          font-family: 'Lato', sans-serif; font-size: 14px; font-weight: 400;
          color: rgba(255,255,255,0.5); line-height: 2;
        }
        .f-contact a {
          color: rgba(255,255,255,0.65); text-decoration: none; transition: color 0.3s;
        }
        .f-contact a:hover { color: #D9A6A1; }
        .f-head {
          font-family: 'Lato', sans-serif; font-size: 14px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase; color: #D9A6A1; margin-bottom: 28px;
        }
        .f-list { list-style: none; display: flex; flex-direction: column; gap: 12px; }
        .f-list a {
          font-family: 'Lato', sans-serif; font-size: 16px; font-weight: 400;
          color: rgba(255,255,255,0.5); text-decoration: none; transition: color 0.3s;
        }
        .f-list a:hover { color: rgba(255,255,255,0.85); }
        .footer-bottom {
          padding-top: 32px; display: flex; justify-content: space-between; align-items: center;
        }
        .f-copy {
          font-family: 'Lato', sans-serif; font-size: 14px; font-weight: 400;
          color: rgba(255,255,255,0.3); letter-spacing: 0.04em;
        }
        .f-ig {
          font-family: 'Lato', sans-serif; font-size: 14px;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.45); text-decoration: none; transition: color 0.3s;
        }
        .f-ig:hover { color: #D9A6A1; }

        @media (max-width: 768px) {
          .pv-footer { padding: 64px 28px 44px; }
          .footer-top { grid-template-columns: 1fr 1fr; gap: 36px; }
          .footer-bottom { flex-direction: column; gap: 14px; }
        }
      `}</style>

      <footer className="pv-footer">
        <div className="footer-top">
          <div>
            <img src="/assets/01. LOGOS/Logo-Main-White.png" alt="PuraVida with Harsha" className="f-brand-logo" />
            <p className="f-tagline">Where stillness finds you.</p>
            <div className="f-contact">
              <p><a href="mailto:harsha@puravidawithharsha.com">harsha@puravidawithharsha.com</a></p>
              <p><a href="https://wa.me/+971562216643?text=Hello%20Harsha%2C%20I%20would%20love%20to%20learn%20more%20about%20your%202026%20journeys.">+971 56 221 6643</a></p>
            </div>
          </div>

          <div>
            <p className="f-head">Journeys</p>
            <ul className="f-list">
              <li><Link to="/bhutan">Bhutan</Link></li>
              <li><Link to="/ladakh">Ladakh</Link></li>
              <li><Link to="/bali">Bali</Link></li>
              <li><Link to="/japan">Japan</Link></li>
            </ul>
          </div>

          <div>
            <p className="f-head">Company</p>
            <ul className="f-list">
              <li><Link to="/about">About Harsha</Link></li>
              <li><Link to="/philosophy">Philosophy</Link></li>
              <li><a href="/#journeys" onClick={(e) => { if (window.location.pathname === '/') { e.preventDefault(); document.getElementById('journeys')?.scrollIntoView({behavior:'smooth'}); } }}>All Journeys</a></li>
              <li><a href="/#voices" onClick={(e) => { if (window.location.pathname === '/') { e.preventDefault(); document.getElementById('voices')?.scrollIntoView({behavior:'smooth'}); } }}>Testimonials</a></li>
            </ul>
          </div>

          <div>
            <p className="f-head">Connect</p>
            <ul className="f-list">
              <li><a href="https://wa.me/+971562216643?text=Hello%20Harsha%2C%20I%20would%20love%20to%20learn%20more%20about%20your%202026%20journeys." target="_blank" rel="noopener noreferrer">Begin a Conversation</a></li>
              <li><a href="https://instagram.com/puravida.withharsha" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="f-copy">&copy; 2026 PuraVida with Harsha. All rights reserved. Dubai, UAE.</p>
          <a href="https://instagram.com/puravida.withharsha" className="f-ig" target="_blank" rel="noopener noreferrer">
            @puravida.withharsha
          </a>
        </div>
      </footer>
    </>
  );
}
