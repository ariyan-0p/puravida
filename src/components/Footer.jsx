import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
      <style>{`
        footer {
          background: var(--ink);
          padding: 100px 72px 52px;
          border-top: 2px solid var(--clay2);
        }
        .footer-top { 
          display: grid; grid-template-columns: 1.8fr 1fr 1fr 1fr; 
          gap: 48px; padding-bottom: 72px; 
          border-bottom: 1px solid rgba(201,168,168,0.12); 
        }
        .f-brand { 
          font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: 1rem; 
          letter-spacing: 0.24em; text-transform: uppercase; color: var(--mist); margin-bottom: 14px; 
        }
        .f-tagline { 
          font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 0.9rem; 
          color: rgba(242,236,229,0.5); line-height: 1.85; margin-bottom: 28px; 
        }
        .f-contact { 
          font-family: 'Lato', sans-serif; font-size: 0.75rem; font-weight: 300; 
          color: rgba(242,236,229,0.55); line-height: 2; 
        }
        .f-contact a { 
          color: rgba(242,236,229,0.7); text-decoration: none; transition: color 0.3s; 
        }
        .f-contact a:hover { color: var(--clay); }
        .f-head { 
          font-family: 'Inter', sans-serif; font-size: 0.54rem; font-weight: 700; 
          letter-spacing: 0.3em; text-transform: uppercase; color: var(--clay); margin-bottom: 28px; 
        }
        .f-list { list-style: none; display: flex; flex-direction: column; gap: 12px; }
        .f-list a { 
          font-family: 'Lato', sans-serif; font-size: 0.78rem; font-weight: 300; 
          color: rgba(242,236,229,0.55); text-decoration: none; transition: color 0.3s; 
        }
        .f-list a:hover { color: var(--mist); }
        .footer-bottom { 
          padding-top: 32px; display: flex; justify-content: space-between; align-items: center; 
        }
        .f-copy { 
          font-family: 'Lato', sans-serif; font-size: 0.64rem; font-weight: 300; 
          color: rgba(242,236,229,0.35); letter-spacing: 0.06em; 
        }
        .f-ig { 
          font-family: 'Inter', sans-serif; font-size: 0.6rem; letter-spacing: 0.22em; 
          text-transform: uppercase; color: rgba(242,236,229,0.5); text-decoration: none; transition: color 0.3s; 
        }
        .f-ig:hover { color: var(--clay); }

        @media (max-width: 768px) {
          footer { padding: 64px 28px 44px; }
          .footer-top { grid-template-columns: 1fr 1fr; gap: 36px; }
          .footer-bottom { flex-direction: column; gap: 14px; }
        }
      `}</style>

      <footer>
        <div className="footer-top">
          <div>
            <p className="f-brand">PuraVida with Harsha</p>
            <p className="f-tagline">Where stillness finds you.<br />Dubai · Bhutan · Japan · Jordan · Sri Lanka</p>
            <div className="f-contact">
              <p><a href="mailto:harsha@puravidawithharsha.com">harsha@puravidawithharsha.com</a></p>
              <p><a href="https://wa.me/+971562216643">+971 56 221 6643</a></p>
            </div>
          </div>

          <div>
            <p className="f-head">Journeys</p>
            <ul className="f-list">
              <li><Link to="/bhutan">Bhutan</Link></li>
              <li><Link to="/japan">Japan</Link></li>
              <li><Link to="/jordan">Jordan</Link></li>
              <li><Link to="/sri-lanka">Sri Lanka</Link></li>
            </ul>
          </div>

          <div>
            <p className="f-head">Company</p>
            <ul className="f-list">
              <li><a href="/#about">About Harsha</a></li>
              <li><a href="/#philosophy">Philosophy</a></li>
              <li><a href="/#journeys">All Journeys</a></li>
              <li><a href="/#voices">Testimonials</a></li>
            </ul>
          </div>

          <div>
            <p className="f-head">Connect</p>
            <ul className="f-list">
              <li><a href="https://wa.me/+971562216643" target="_blank" rel="noopener noreferrer">Begin an Enquiry</a></li>
              <li><a href="https://instagram.com/puravida.withharsha" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://puravidawithharsha.com/wp-content/uploads/2026/01/Bhutan-2026.pdf" target="_blank" rel="noopener noreferrer">Download Itinerary</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="f-copy">© 2026 PuraVida with Harsha. All rights reserved. Dubai, UAE.</p>
          <a href="https://instagram.com/puravida.withharsha" className="f-ig" target="_blank" rel="noopener noreferrer">
            @puravida.withharsha
          </a>
        </div>
      </footer>
    </>
  );
}