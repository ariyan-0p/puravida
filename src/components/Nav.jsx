import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  const [stuck, setStuck] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setStuck(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>{`
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          display: flex; align-items: center; justify-content: space-between;
          padding: 40px 72px;
          transition: padding 0.6s cubic-bezier(.16,1,.3,1), background 0.6s ease, box-shadow 0.6s ease;
        }
        .nav.stuck {
          padding: 18px 72px;
          background: rgba(242,236,229,0.97);
          backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
          box-shadow: 0 1px 0 rgba(201,168,168,0.22);
        }
        .nav-logo {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; font-size: 0.82rem;
          letter-spacing: 0.32em; text-transform: uppercase;
          color: var(--ink); text-decoration: none;
        }
        .nav-center {
          display: flex; gap: 52px; list-style: none;
          position: absolute; left: 50%; transform: translateX(-50%);
        }
        .nav-center a {
          font-family: 'Inter', sans-serif;
          font-size: 0.58rem; font-weight: 400;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--ink3); text-decoration: none; transition: color 0.3s;
          position: relative;
        }
        .nav-center a::after {
          content: ''; position: absolute; bottom: -4px; left: 0; right: 0;
          height: 1px; background: var(--clay);
          transform: scaleX(0); transition: transform 0.3s;
        }
        .nav-center a:hover { color: var(--clay2); }
        .nav-center a:hover::after { transform: scaleX(1); }
        .nav-cta {
          font-family: 'Inter', sans-serif;
          font-size: 0.58rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--ink); text-decoration: none;
          border: 1px solid var(--clay); padding: 10px 20px;
          transition: background 0.35s, color 0.35s;
        }
        .nav-cta:hover { background: var(--clay); color: var(--white); }
        .nav-burger {
          display: none; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 4px;
        }
        .nav-burger span { display: block; width: 22px; height: 1px; background: var(--ink); }

        .mobile-menu {
          position: fixed; inset: 0; background: var(--cream); z-index: 300;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 44px;
          opacity: 0; visibility: hidden;
          transition: opacity 0.5s ease, visibility 0.5s ease;
        }
        .mobile-menu::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(to right, transparent, var(--clay), transparent);
        }
        .mobile-menu.open { opacity: 1; visibility: visible; }
        .mobile-menu a {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.6rem; font-weight: 300; font-style: italic;
          color: var(--ink); text-decoration: none; letter-spacing: 0.04em;
          transition: color 0.3s;
        }
        .mobile-menu a:hover { color: var(--clay2); }
        .mobile-close-btn {
          position: absolute; top: 28px; right: 32px;
          font-size: 1.2rem; color: var(--ink3);
          background: none; border: none; cursor: pointer;
          font-family: 'Cormorant Garamond', serif; transition: color 0.3s;
        }
        .mobile-close-btn:hover { color: var(--clay2); }

        @media (max-width: 768px) {
          .nav { padding: 20px 28px; }
          .nav.stuck { padding: 16px 28px; }
          .nav-center, .nav-cta { display: none; }
          .nav-burger { display: flex; }
        }
      `}</style>

      {/* Mobile Menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} role="dialog" aria-modal="true">
        <button className="mobile-close-btn" onClick={() => setMenuOpen(false)}>✕</button>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/bhutan" onClick={() => setMenuOpen(false)}>Bhutan</Link>
        <Link to="/japan" onClick={() => setMenuOpen(false)}>Japan</Link>
        <Link to="/jordan" onClick={() => setMenuOpen(false)}>Jordan</Link>
        <Link to="/sri-lanka" onClick={() => setMenuOpen(false)}>Sri Lanka</Link>
        <a href="https://wa.me/+971562216643" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>
          Begin Your Journey
        </a>
      </div>

      {/* Navigation */}
      <nav className={`nav${stuck ? ' stuck' : ''}`}>
        <Link to="/" className="nav-logo">PuraVida · Harsha</Link>
        <ul className="nav-center">
          <li><Link to="/bhutan">Bhutan</Link></li>
          <li><Link to="/japan">Japan</Link></li>
          <li><Link to="/jordan">Jordan</Link></li>
          <li><Link to="/sri-lanka">Sri Lanka</Link></li>
        </ul>
        <a href="https://wa.me/+971562216643" className="nav-cta" target="_blank" rel="noopener noreferrer">
          Begin Your Journey
        </a>
        <button className="nav-burger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <span /><span />
        </button>
      </nav>
    </>
  );
}