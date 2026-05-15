import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Nav() {
  const [stuck, setStuck] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const isLightHero = ['/contact'].includes(location.pathname);
  const isSplitHero = location.pathname === '/about';

  useEffect(() => {
    const fn = () => setStuck(window.scrollY > 80);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location]);

  const handleHashLink = useCallback((e, hash) => {
    e.preventDefault();
    setMenuOpen(false);
    if (isHomePage) {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/#' + hash);
    }
  }, [isHomePage, navigate]);

  return (
    <>
      <style>{`
        .pv-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          padding: 0 60px;
          transition: all 0.5s cubic-bezier(.16,1,.3,1);
        }
        .pv-nav-inner {
          display: flex; align-items: center; justify-content: space-between;
          height: 88px;
          transition: height 0.5s cubic-bezier(.16,1,.3,1);
        }
        .pv-nav.stuck {
          background: rgba(245,240,235,0.96);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 1px 0 rgba(217,166,161,0.18);
        }
        .pv-nav.stuck .pv-nav-inner { height: 64px; }

        .pv-nav-logo { display: flex; align-items: center; text-decoration: none; }
        .pv-nav-logo-img {
          height: 125px; width: auto; display: block;
          object-fit: contain;
          transition: height 0.4s ease, filter 0.5s ease;
        }
        .pv-nav.stuck .pv-nav-logo-img { height: 88px; }

        .pv-nav-logo-img { filter: none; }
        .pv-nav-links a { color: rgba(255,255,255,0.85); }
        .pv-nav-links a:hover { color: white; }
        .pv-nav-links a::after { background: rgba(255,255,255,0.6); }

        .pv-nav.split-hero:not(.stuck) .pv-nav-links a {
          color: #ffffff;
          text-shadow: 0 1px 12px rgba(0,0,0,0.55), 0 1px 2px rgba(0,0,0,0.45);
        }
        .pv-nav.split-hero:not(.stuck) .pv-nav-links a:hover { color: #ffffff; }
        .pv-nav-cta { color: #333333; background: #D9A6A1; border: none; }
        .pv-nav-cta:hover { background: #c08e88; color: white; }
        .pv-nav-burger span { background: white; }
        .pv-nav.home:not(.stuck) .pv-nav-burger span { background: #C9A050; }

        .pv-nav.light-hero:not(.stuck) .pv-nav-logo-img { filter: none; }
        .pv-nav.light-hero:not(.stuck) .pv-nav-links a { color: #666666; }
        .pv-nav.light-hero:not(.stuck) .pv-nav-links a:hover { color: #333333; }
        .pv-nav.light-hero:not(.stuck) .pv-nav-links a::after { background: #D9A6A1; }
        .pv-nav.light-hero:not(.stuck) .pv-nav-cta { color: #333333; background: #D9A6A1; }
        .pv-nav.light-hero:not(.stuck) .pv-nav-cta:hover { background: #c08e88; color: white; }
        .pv-nav.light-hero:not(.stuck) .pv-nav-burger span { background: #333333; }

        .pv-nav.stuck .pv-nav-logo-img { filter: none; }
        .pv-nav.stuck .pv-nav-links a { color: #666666; }
        .pv-nav.stuck .pv-nav-links a:hover { color: #333333; }
        .pv-nav.stuck .pv-nav-links a::after { background: #D9A6A1; }
        .pv-nav.stuck .pv-nav-cta { color: #333333; background: #D9A6A1; }
        .pv-nav.stuck .pv-nav-cta:hover { background: #c08e88; color: white; }
        .pv-nav.stuck .pv-nav-burger span { background: #333333; }

        /* Charcoal stuck navbar on homepage */
        .pv-nav.home.stuck {
          background: rgba(51,51,51,0.96);
          box-shadow: 0 1px 0 rgba(201,160,80,0.22);
        }
        .pv-nav.home.stuck .pv-nav-links a { color: rgba(245,240,235,0.85); }
        .pv-nav.home.stuck .pv-nav-links a:hover { color: #C9A050; }
        .pv-nav.home.stuck .pv-nav-links a::after { background: #C9A050; }
        .pv-nav.home.stuck .pv-nav-burger span { background: #C9A050; }

        .pv-nav-links {
          display: flex; gap: 40px; list-style: none; align-items: center;
        }
        .pv-nav-links a {
          font-family: 'Lato', sans-serif;
          font-size: 16px; font-weight: 400;
          text-decoration: none; transition: color 0.3s;
          position: relative; padding-bottom: 2px; cursor: pointer;
        }
        .pv-nav-links a::after {
          content: ''; position: absolute; bottom: -2px; left: 0; width: 0;
          height: 1px; transition: width 0.3s ease;
        }
        .pv-nav-links a:hover::after { width: 100%; }

        .pv-nav-cta {
          font-family: 'Lato', sans-serif;
          font-size: 16px; font-weight: 700;
          text-decoration: none;
          padding: 16px 32px; border-radius: 4px;
          transition: all 0.35s ease;
        }

        .pv-nav-burger {
          display: none; flex-direction: column; gap: 6px;
          background: none; border: none; cursor: pointer; padding: 8px 4px;
          min-width: 44px; min-height: 44px;
          align-items: center; justify-content: center;
        }
        .pv-nav-burger span { display: block; height: 1.5px; transition: all 0.3s; }
        .pv-nav-burger span:first-child { width: 24px; }
        .pv-nav-burger span:last-child { width: 16px; }

        .pv-mobile {
          position: fixed; inset: 0; z-index: 300;
          background: #333333;
          display: flex; flex-direction: column;
          opacity: 0; visibility: hidden;
          transition: opacity 0.45s ease, visibility 0.45s ease;
        }
        .pv-mobile.open { opacity: 1; visibility: visible; }
        .pv-mobile-top {
          display: flex; align-items: center; justify-content: space-between;
          padding: 24px 32px;
          border-bottom: 1px solid rgba(201,160,80,0.18);
        }
        .pv-mobile-logo { height: 56px; width: auto; }
        .pv-mobile-close {
          width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;
          background: none; border: 1px solid rgba(201,160,80,0.35); border-radius: 50%;
          cursor: pointer; font-size: 18px; color: #C9A050; transition: border-color 0.3s, color 0.3s;
        }
        .pv-mobile-close:hover { border-color: #C9A050; color: #F5F0EB; }
        .pv-mobile-body {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 40px; padding: 40px;
        }
        .pv-mobile-link {
          font-family: 'Lora', serif;
          font-style: italic;
          font-size: 2.4rem; font-weight: 700;
          color: #C9A050; text-decoration: none;
          text-align: center;
          letter-spacing: 0.02em; transition: color 0.3s; cursor: pointer;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
          -webkit-tap-highlight-color: transparent;
          outline: none;
          white-space: nowrap;
        }
        @media (max-width: 420px) {
          .pv-mobile-link { font-size: 2rem; }
        }
        @media (max-width: 360px) {
          .pv-mobile-link { font-size: 1.75rem; }
        }
        .pv-mobile-link:hover,
        .pv-mobile-link:focus,
        .pv-mobile-link:active,
        .pv-mobile-link:visited { color: #C9A050; }
        .pv-mobile-link:hover { color: #F5F0EB; }
        .pv-mobile-footer {
          padding: 32px; text-align: center;
          border-top: 1px solid rgba(201,160,80,0.18);
        }
        .pv-mobile-wa {
          font-family: 'Lato', sans-serif; font-size: 16px; font-weight: 700;
          color: #333333; text-decoration: none;
          display: inline-flex; align-items: center; gap: 8px;
          padding: 16px 32px; background: #D9A6A1; border-radius: 4px;
          transition: all 0.3s;
        }
        .pv-mobile-wa:hover { background: #c08e88; color: white; }

        @media (max-width: 900px) {
          .pv-nav { padding: 0 28px; }
          .pv-nav-inner { height: 72px; }
          .pv-nav.stuck .pv-nav-inner { height: 60px; }
          .pv-nav-links, .pv-nav-cta { display: none; }
          .pv-nav-burger { display: flex; }
          .pv-nav-logo-img { height: 88px; }
          .pv-nav.stuck .pv-nav-logo-img { height: 69px; }

          .pv-nav.light-hero {
            background: #333333;
            box-shadow: 0 1px 0 rgba(201,160,80,0.22);
          }
          .pv-nav.light-hero:not(.stuck) .pv-nav-burger span { background: #C9A050; }
        }
      `}</style>

      <div className={`pv-mobile${menuOpen ? ' open' : ''}`} role="dialog" aria-modal="true">
        <div className="pv-mobile-top">
          <img src="/assets/01. LOGOS/Logo-Main.png" alt="PuraVida with Harsha" className="pv-mobile-logo" />
          <button className="pv-mobile-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">{'\u00D7'}</button>
        </div>
        <div className="pv-mobile-body">
          <Link to="/" className="pv-mobile-link" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" className="pv-mobile-link" onClick={() => setMenuOpen(false)}>About me</Link>
          <a href="#journeys" className="pv-mobile-link" onClick={(e) => handleHashLink(e, 'journeys')}>PuraVida Journeys</a>
          <Link to="/pilates" className="pv-mobile-link" onClick={() => setMenuOpen(false)}>PuraVida Pilates</Link>
          <Link to="/contact" className="pv-mobile-link" onClick={() => setMenuOpen(false)}>Get in touch</Link>
        </div>
        <div className="pv-mobile-footer">
          <a href="https://chat.whatsapp.com/HFwRN3lWDJM9zH4fgUKGbt" className="pv-mobile-wa" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>
            Join Community
          </a>
        </div>
      </div>

      <nav className={`pv-nav${stuck ? ' stuck' : ''}${isHomePage ? ' home' : ''}${isLightHero ? ' light-hero' : ''}${isSplitHero ? ' split-hero' : ''}`}>
        <div className="pv-nav-inner">
          <Link to="/" className="pv-nav-logo">
            <img src="/assets/01. LOGOS/Logo-Main.png" alt="PuraVida with Harsha" className="pv-nav-logo-img" />
          </Link>

          <ul className="pv-nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About me</Link></li>
            <li><a href="#journeys" onClick={(e) => handleHashLink(e, 'journeys')}>PuraVida Journeys</a></li>
            <li><Link to="/pilates">PuraVida Pilates</Link></li>
            <li><Link to="/contact">Get in touch</Link></li>
          </ul>

          <a href="https://chat.whatsapp.com/HFwRN3lWDJM9zH4fgUKGbt" className="pv-nav-cta" target="_blank" rel="noopener noreferrer">
            Join Community
          </a>

          <button className="pv-nav-burger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <span /><span />
          </button>
        </div>
      </nav>
    </>
  );
}
