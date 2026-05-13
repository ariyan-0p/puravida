import { Link } from 'react-router-dom';

export default function Footer() {
  const handleJourneysClick = (e) => {
    if (window.location.pathname === '/') {
      e.preventDefault();
      document.getElementById('journeys')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <style>{`
        .pv-footer {
          background: #333333;
          padding: 80px 28px 56px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 36px;
        }
        .f-tagline {
          font-family: 'Lora', serif;
          font-style: italic;
          font-weight: 700;
          font-size: clamp(1.6rem, 3.2vw, 2.6rem);
          line-height: 1.3;
          color: #C9A050;
          margin: 0;
          max-width: 720px;
        }
        .f-logo {
          height: 110px;
          width: auto;
          display: block;
        }
        .f-journeys {
          font-family: 'Lato', sans-serif;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #D9A6A1;
          text-decoration: none;
          transition: color 0.3s;
          cursor: pointer;
        }
        .f-journeys:hover { color: #c08e88; }
        .f-social {
          display: flex;
          gap: 24px;
          align-items: center;
        }
        .f-social a {
          width: 44px;
          height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #C9A050;
          border: 1px solid rgba(201,160,80,0.35);
          border-radius: 50%;
          transition: color 0.3s, border-color 0.3s, background 0.3s;
          text-decoration: none;
        }
        .f-social a:hover {
          color: #333333;
          background: #C9A050;
          border-color: #C9A050;
        }
        .f-social svg { width: 20px; height: 20px; display: block; }

        @media (max-width: 600px) {
          .pv-footer { padding: 64px 24px 44px; gap: 28px; }
          .f-logo { height: 88px; }
        }
      `}</style>

      <footer className="pv-footer">
        <p className="f-tagline">…the right journey awaits you.</p>

        <img src="/assets/01. LOGOS/Logo-Main.png" alt="PuraVida with Harsha" className="f-logo" />

        <Link to="/#journeys" className="f-journeys" onClick={handleJourneysClick}>
          Journeys
        </Link>

        <div className="f-social">
          <a href="mailto:harsha@puravidawithharsha.com" aria-label="Email">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
          </a>
          <a href="https://instagram.com/puravida.withharsha" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
        </div>
      </footer>
    </>
  );
}
