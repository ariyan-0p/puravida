import { useState, useEffect, useRef } from 'react';

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 250);
  };

  return (
    <>
      <style>{`
        .wa-wrap {
          position: fixed; bottom: 32px; right: 32px; z-index: 180;
        }
        .wa-float {
          width: 48px; height: 48px; border-radius: 50%;
          background: #333333;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 20px rgba(51,51,51,0.18);
          text-decoration: none; border: none; cursor: pointer; padding: 0;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .wa-float:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(51,51,51,0.24);
        }
        .wa-float svg { width: 24px; height: 24px; fill: #FFFFFF; }
        .wa-menu {
          position: absolute; right: 0; bottom: 60px;
          display: flex; flex-direction: column; gap: 8px;
          min-width: 220px;
          opacity: 0; transform: translateY(8px) scale(0.96);
          pointer-events: none;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .wa-menu::after {
          content: ''; position: absolute; left: 0; right: 0;
          bottom: -16px; height: 16px;
        }
        .wa-wrap.open .wa-menu {
          opacity: 1; transform: translateY(0) scale(1);
          pointer-events: auto;
        }
        .wa-menu-item {
          display: flex; align-items: center; gap: 10px;
          background: #FFFFFF; color: #333333;
          padding: 12px 16px; border-radius: 999px;
          font-family: 'Lato', sans-serif; font-size: 14px; font-weight: 600;
          text-decoration: none;
          box-shadow: 0 4px 16px rgba(51,51,51,0.18);
          border: 1px solid rgba(51,51,51,0.06);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          white-space: nowrap;
        }
        .wa-menu-item:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 22px rgba(51,51,51,0.22);
        }
        .wa-menu-item-icon {
          width: 18px; height: 18px; flex-shrink: 0;
          fill: #25D366;
        }
      `}</style>
      <div
        ref={wrapRef}
        className={`wa-wrap${open ? ' open' : ''}`}
        onMouseEnter={() => { cancelClose(); setOpen(true); }}
        onMouseLeave={scheduleClose}
      >
        <div className="wa-menu" role="menu" aria-hidden={!open}>
          <a
            className="wa-menu-item"
            href="https://wa.me/+971562216643?text=Hello%20Harsha%2C%20I%20would%20love%20to%20learn%20more%20about%20your%202026%20journeys."
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
            tabIndex={open ? 0 : -1}
          >
            <svg className="wa-menu-item-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z"/>
            </svg>
            Message Harsha
          </a>
          <a
            className="wa-menu-item"
            href="https://chat.whatsapp.com/HFwRN3lWDJM9zH4fgUKGbt"
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
            tabIndex={open ? 0 : -1}
          >
            <svg className="wa-menu-item-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
            </svg>
            Join Community
          </a>
        </div>
        <button
          type="button"
          className="wa-float"
          aria-label="WhatsApp options"
          aria-expanded={open}
          aria-haspopup="menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </button>
      </div>
    </>
  );
}
