import { useState, useEffect, useRef } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const GLYPH_WHITE_MOUNTAINS_SRC = encodeURI(
  '/assets/05. GRAPHIC ELEMENTS/Glyphs/White/Mountains/Mountains.png'
);

function useFadeUp() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const inView = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh && r.bottom > 0;
    };
    if (inView()) { setVis(true); return; }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); cleanup(); } },
      { threshold: 0, rootMargin: '0px' }
    );
    const onScroll = () => { if (inView()) { setVis(true); cleanup(); } };
    const cleanup = () => {
      obs.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
    obs.observe(el);
    window.addEventListener('scroll', onScroll, { passive: true });
    return cleanup;
  }, []);
  return [ref, vis];
}

function FU({ children, d = 0, className = '', style = {} }) {
  const [ref, vis] = useFadeUp();
  return (
    <div ref={ref} className={`pfu${vis ? ' pin' : ''} ${className}`}
      style={{ transitionDelay: `${d * 0.14}s`, ...style }}>
      {children}
    </div>
  );
}

function Divider({ width = 200, opacity = 0.5 }) {
  return (
    <img
      src="/assets/05. GRAPHIC ELEMENTS/Dividers/Divider - Center.png"
      alt="" aria-hidden="true"
      style={{ width, opacity, display: 'block', margin: '0 auto' }}
    />
  );
}

function DayIcon({ type }) {
  const map = {
    meal:       'Meals  - 48px.png',
    transport:  'Transport - 48px.png',
    experience: 'Experience  - 48px.png',
    sight:      'Experience  - 48px.png',
    hotel:      'Accomodation  - 48px.png',
    leisure:    'Duration  - 48px.png',
    culture:    'Cultural Bridge  - 48px.png',
    wellness:   'Wellness  - 48px.png',
    location:   'Location - 48px.png',
    group:      'Small group  - 48px.png',
  };
  return (
    <img
      src={`/assets/04. ICONS/PNG/Charcoal/48px/${map[type] || map.experience}`}
      alt="" style={{ width: 28, height: 28, opacity: 0.6, flexShrink: 0 }}
    />
  );
}

function Glyph({ name = 'Trees', variant = 'Charcoal', size = 48, opacity = 0.3 }) {
  return (
    <img
      src={`/assets/05. GRAPHIC ELEMENTS/Glyphs/${variant}/${name}/${name}.png`}
      alt="" aria-hidden="true"
      style={{ height: size, width: 'auto', opacity }}
    />
  );
}

function DayActivity({ icon, text, note }) {
  return (
    <div className="lk-activity">
      <DayIcon type={icon} />
      <div>
        <p className="lk-activity-text">{text}</p>
        {note && <p className="lk-activity-note">{note}</p>}
      </div>
    </div>
  );
}

const INCLUSIONS = [
  { icon: 'hotel',     label: 'Accommodation' },
  { icon: 'meal',      label: 'All Meals' },
  { icon: 'sight',     label: 'Sanctuary Day at Om Ham' },
  { icon: 'wellness',  label: 'Daily Pilates with Harsha' },
  { icon: 'wellness',  label: 'Melukat Water Blessing' },
  { icon: 'sight',     label: 'Kecak Fire Dance, Uluwatu' },
  { icon: 'transport', label: 'All Transfers & Transport' },
  { icon: 'culture',   label: 'English-Speaking Guide' },
  { icon: 'sight',     label: 'All Entrance Fees' },
  { icon: 'sight',     label: 'VAT' },
];

const EXCLUSIONS = [
  { icon: 'transport', label: 'International flights' },
  { icon: 'sight',     label: 'Visa / Indonesia e-Visa' },
  { icon: 'meal',      label: 'Bali Tourism Levy' },
  { icon: 'sight',     label: 'Travel Insurance' },
  { icon: 'wellness',  label: 'Guide & driver gratuities' },
];

const DAYS = [
  {
    day: "01", title: "Arrival", subtitle: "",
    morning: [
      { icon: 'transport', text: "We land, and Bali receives us with fresh flowers at the airport. In Balinese culture this gesture means: I see the divine in you." },
    ],
    afternoon: [
      { icon: 'transport', text: "From the airport, an hour's drive through the island's green interior brings us to Ubud. The road winds. The rice fields open. Bali starts doing what Bali does." },
    ],
    evening: [
      { icon: 'hotel', text: "Our home for the first three nights is The Royal Pita Maha — a resort owned by the Ubud Royal Family, set into a forested gorge above the Campuhan River." },
    ],
    overnight: "Ubud", hotel: "Royal Pitamaha Hotel", farewell: null,
  },
  {
    day: "02", title: "Breathe", subtitle: "",
    morning: [
      { icon: 'wellness', text: "Nothing is required of us today. That is entirely intentional." },
      { icon: 'wellness', text: "We begin with Pilates — poolside. As a classical Pilates teacher, this is where I start: with the body, with breath, with the quiet intelligence that lives in our spine." },
      { icon: 'sight', text: "The rest of the morning is free for us. The Campuhan Ridge Walk is right there should we wish to explore it — a narrow path between swaying grasses, the valley falling away on both sides, one of Bali's most quietly beautiful walks. Or the pool. Or sleep." },
    ],
    afternoon: [
      { icon: 'culture', text: "Afternoon is Ubud's ancient Jamu tradition — fragrant medicinal plants in our hands, a practice that has been in Balinese kitchens for centuries. Then lunch at Locavore, one of Asia's most celebrated restaurants." },
    ],
    evening: [
      { icon: 'meal', text: "Dinner at Mozaic — six courses in a garden after dark." },
    ],
    overnight: "Ubud", hotel: "Royal Pitamaha Hotel", farewell: null,
  },
  {
    day: "03", title: "The Sanctuary", subtitle: "",
    morning: [
      { icon: 'sight', text: "The heart of the retreat. A full day at Om Ham Resort — a healing sanctuary in Ubud founded and led by Master I Ketut Arsana, spiritual teacher, traditional Balinese healer, and creator of Kundalini Tantra Yoga." },
      { icon: 'wellness', text: "We begin early, with Pilates. Shorter today — 30 minutes, breath-focused. A preparation, not a workout. What follows at Om Ham will move through your body differently for it." },
    ],
    afternoon: [
      { icon: 'sight', text: "The day weaves together food, movement, philosophy, sound, and ceremony." },
    ],
    evening: [
      { icon: 'sight', text: "By evening we shall have cooked a Balinese meal from scratch, explored an ancient yoga tradition, sat in truth together, been held by sound, and eaten under the stars with live music." },
    ],
    overnight: "Ubud", hotel: "Royal Pitamaha Hotel", farewell: null,
  },
  {
    day: "04", title: "Into the Wild North", subtitle: "",
    morning: [
      { icon: 'sight', text: "Check out this morning. Today the island shows us a different face — cool mountain air, volcanic highlands, crater lakes, mist sitting low on ancient stone." },
      { icon: 'wellness', text: "We begin with Pilates before packing — lighter today, 20 minutes, energising rather than deep. A travel day needs a different kind of preparation." },
    ],
    afternoon: [
      { icon: 'transport', text: "The drive north takes us through some of the most dramatic landscape in Southeast Asia. By late afternoon we are standing at Tanah Lot — a sea temple on a black rock in the ocean — watching the sun drop into the water. It earns every photograph ever taken of it.", note: "The sun drops into the water. The temple holds its silhouette against the gold." },
    ],
    evening: [],
    overnight: "Tanjung Benoa", hotel: "Novotel", farewell: null,
  },
  {
    day: "05", title: "Ceremony", subtitle: "",
    morning: [
      { icon: 'sight', text: "The most hands-on day of the trip. South Bali opens up — wider sky, the Indian Ocean pressing against limestone cliffs." },
      { icon: 'wellness', text: "We begin with Pilates before the Melukat blessing. This sequence is intentional. Arriving at a sacred water purification having already done breathwork and body awareness means you receive the experience differently.", note: "The water is cold. The mantra is older than any of us. Something rinses." },
    ],
    afternoon: [],
    evening: [
      { icon: 'sight', text: "Then Uluwatu and the Kecak Dance as the sun goes down followed by dinner on the sand at Jimbaran Bay with the sound of the ocean." },
    ],
    overnight: "Tanjung Benoa", hotel: "Novotel", farewell: null,
  },
  {
    day: "06", title: "The Return", subtitle: "",
    morning: [
      { icon: 'meal', text: "Breakfast. A slow morning. The last look at the island." },
      { icon: 'wellness', text: "We close the way we opened — together, unhurried, with intention. A short breath practice this morning before the bags are packed." },
      { icon: 'sight', text: "We are not leaving Bali behind. Something of it comes with us. That is the whole point." },
    ],
    afternoon: [], evening: [],
    overnight: null, hotel: null,
    farewell: "“As the light softens,\nBali slips away —\nbut its stillness\nstays with you.”",
  },
];

export default function BaliJourney() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Bali | PuraVida with Harsha';
    const fn = () => setProgress((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <style>{`
        .pfu { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .pfu.pin { opacity: 1; transform: translateY(0); }

        /* ── HERO ── */
        .lk-hero {
          min-height: 100vh; position: relative; overflow: hidden;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center;
        }
        .lk-hero-bg {
          position: absolute; inset: 0;
          background: url('/assets/hero-bali.jpg') center center / cover no-repeat,
            linear-gradient(158deg, #4a9aa8 0%, #2d6a78 40%, #1a3f4a 100%);
        }
        .lk-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom,
            rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.02) 35%,
            rgba(0,0,0,0.15) 70%, rgba(0,0,0,0.50) 100%);
        }
        .lk-hero-logo {
          position: absolute; top: 28px; left: 32px;
          height: 64px; width: auto; z-index: 3;
          display: block;
        }
        .lk-hero-content {
          position: relative; z-index: 2;
          max-width: 700px; padding: 0 40px;
          display: flex; flex-direction: column; align-items: center;
          flex: 1; justify-content: center; margin-top: -10vh;
        }
        .lk-hero-title {
          font-family: 'Playfair Display', serif; font-weight: 700;
          font-size: clamp(5rem, 14vw, 10rem);
          color: white; line-height: 0.9;
          text-shadow: 0 4px 40px rgba(0,0,0,0.3);
        }
        .lk-hero-dates {
          position: absolute; bottom: 90px; left: 50%; transform: translateX(-50%);
          z-index: 2;
          font-family: 'Lato', sans-serif;
          font-size: clamp(1.1rem, 2.2vw, 1.5rem); font-weight: 400;
          color: rgba(255,255,255,0.9); letter-spacing: 0.08em;
          text-align: center; line-height: 1.5;
        }
        .lk-hero-dates sup {
          font-size: 0.65em; vertical-align: super;
        }

        /* ── INVITATION FROM HARSHA ── */
        .lk-invite {
          background: #B7C8B5;
          padding: 64px clamp(28px, 5vw, 60px) 140px;
          position: relative;
        }
        @media (min-width: 1025px) {
          .lk-invite { padding: 64px calc((100% - 640px) / 2) 140px; }
        }
        .lk-invite-top {
          display: flex; align-items: center;
          margin-bottom: 40px;
        }
        .lk-invite-photo-wrap {
          position: relative; flex-shrink: 0;
          width: clamp(140px, 28vw, 200px);
          overflow: visible;
        }
        .lk-invite-img {
          width: 100%; display: block;
          position: relative; z-index: 1;
          border-radius: 4px 45% 4px 45px;
        }
        .lk-invite-frame {
          position: absolute;
          top: -4%; left: -6%;
          width: 108%; height: 104%;
          object-fit: fill;
          pointer-events: none; z-index: 2;
        }
        .lk-invite-heading-area {
          padding-left: clamp(4px, 1.5vw, 16px);
          flex: 1; min-width: 0;
          display: flex; flex-direction: column; align-items: flex-start;
        }
        .lk-invite-divider {
          width: clamp(100px, 18vw, 180px);
          opacity: 0.5; display: block;
        }
        .lk-invite-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 6.5vw, 2.8rem); font-weight: 700;
          font-style: normal;
          color: #333333; line-height: 1.05;
          margin: 12px 0; text-align: left;
        }
        .lk-invite-heading span { display: block; }
        .lk-invite-heading .lk-from {
          font-family: 'Playfair Display', serif; font-weight: 700;
          font-size: clamp(1.4rem, 4vw, 2rem);
          margin-top: 4px;
        }
        .lk-invite-body {
          font-family: 'Lato', sans-serif;
          font-size: 15px; line-height: 1.75; color: #333333;
          margin-bottom: 16px; max-width: 480px;
        }
        .lk-invite-trees {
          position: absolute; bottom: 16px; right: clamp(24px, 5vw, 60px);
          display: flex; gap: -4px; align-items: flex-end;
        }

        /* ── WALK BALI WITH JANAM ── */
        .lk-guide {
          background: #C5A3A3;
          padding: clamp(72px, 11vw, 108px) clamp(28px, 6vw, 88px) 0;
          padding-left: max(clamp(28px, 6vw, 88px), env(safe-area-inset-left, 0px));
          padding-right: max(clamp(28px, 6vw, 88px), env(safe-area-inset-right, 0px));
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .lk-guide-column {
          position: relative;
          z-index: 1;
          max-width: 640px;
          margin: 0 auto;
        }
        .lk-guide-photo-wrap {
          position: relative;
          width: clamp(268px, 58vw, 336px);
          height: clamp(268px, 58vw, 336px);
          margin: 0 auto clamp(32px, 5vw, 44px);
        }
        .lk-guide-img {
          width: 76%;
          height: 76%;
          max-width: 254px;
          max-height: 254px;
          border-radius: 50%;
          object-fit: cover;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 2px solid rgba(30, 30, 30, 0.42);
          box-shadow: none;
        }
        .lk-guide-frame {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          object-fit: contain;
          pointer-events: none;
        }
        .lk-guide-rule {
          display: flex;
          justify-content: center;
          margin: 0;
        }
        .lk-guide-rule--above { margin-bottom: clamp(20px, 3.2vw, 32px); }
        .lk-guide-rule--below { margin-top: clamp(18px, 3vw, 28px); margin-bottom: clamp(14px, 2.4vw, 22px); }
        .lk-guide-rule img { width: clamp(280px, 78vw, 520px); opacity: 0.78; }
        .lk-guide-head { max-width: 520px; margin: 0 auto; }
        .lk-guide-title {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          color: #252525;
          line-height: 1.12;
          margin: 0;
          display: flex; flex-direction: column; align-items: center;
        }
        .lk-guide-title-top {
          font-size: clamp(2.1rem, 4.8vw, 3.2rem);
          font-weight: 700;
        }
        .lk-guide-title-bottom {
          font-size: clamp(1.7rem, 3.9vw, 2.55rem);
          font-weight: 500;
        }
        .lk-guide-subtitle {
          font-family: 'Lora', serif;
          font-style: italic;
          font-size: clamp(1.05rem, 2.4vw, 1.2rem);
          font-weight: 400;
          color: rgba(255, 252, 250, 0.92);
          margin: 0 0 clamp(28px, 5vw, 40px);
          letter-spacing: 0.02em;
        }
        .lk-guide-body-wrap {
          max-width: 600px;
          margin: 0 auto;
          text-align: left;
          padding-bottom: clamp(60px, 14vw, 140px);
        }
        .lk-guide-body {
          font-family: 'Lato', sans-serif;
          font-size: clamp(15px, 1.9vw, 17px);
          line-height: 1.8;
          color: #252525;
          margin: 0;
        }
        .lk-guide-body + .lk-guide-body { margin-top: 1.15em; }
        .lk-guide-mountains {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 0;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: clamp(12px, 4vw, 80px);
          pointer-events: none;
          box-sizing: border-box;
          line-height: 0;
        }
        .lk-guide-mountain-side {
          display: flex;
          align-items: flex-end;
          justify-content: flex-start;
          line-height: 0;
          flex: 0 1 auto;
          min-width: 0;
          overflow: hidden;
        }
        .lk-guide-mountain-side.lk-guide-mountain-right {
          justify-content: flex-end;
        }
        .lk-guide-mountain-img {
          display: block;
          height: auto;
          width: clamp(220px, 38vw, 480px);
          object-fit: contain;
          opacity: 0.55;
          margin-bottom: -2%;
        }
        .lk-guide-mountain-right .lk-guide-mountain-img {
          transform: scaleX(-1);
        }

        /* ── DAY CARDS ── */
        .lk-day-header { background: #F5F0EB; padding: 96px 80px 32px; position: relative; }
        .lk-day-num {
          font-family: 'Lato', sans-serif; font-size: 14px; font-weight: 400;
          letter-spacing: 0.1em; text-transform: uppercase; color: #333333; margin-bottom: 4px;
        }
        .lk-day-num span { color: #D9A6A1; font-weight: 700; }
        .lk-day-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.4rem, 2.4vw, 1.85rem); font-weight: 700;
          color: #333333; line-height: 1.2; max-width: 18ch;
          margin-bottom: 4px;
        }
        .lk-day-subtitle { font-family: 'Lato', sans-serif; font-size: 14px; color: #333333; opacity: 0.6; margin-top: 8px; font-style: italic; }
        .lk-day-divider-row {
          position: relative;
          margin-top: clamp(56px, 9vw, 88px);
        }
        .lk-day-divider-row img.lk-day-divider-line {
          width: 100%;
          height: auto;
          opacity: 0.5;
          display: block;
          position: relative;
          z-index: 1;
        }
        .lk-day-divider-mountain {
          position: absolute;
          right: 4%;
          bottom: 50%;
          height: clamp(56px, 9vw, 88px);
          width: auto;
          opacity: 0.9;
          z-index: 2;
        }

        .lk-day-body { background: #F5F0EB; padding: 0 80px 60px; }
        .lk-day-card {
          background: transparent; border: none;
          padding: 40px 48px; position: relative;
        }
        .lk-day-card-frame {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }
        .lk-day-card-frame img {
          width: 100%;
          height: 100%;
          object-fit: fill;
          display: block;
          opacity: 0.7;
        }
        .lk-day-pause { position: absolute; bottom: 12px; right: 12px; }
        .lk-time-section { margin-bottom: 32px; }
        .lk-time-section:last-child { margin-bottom: 0; }
        .lk-time-heading {
          font-family: 'Playfair Display', serif; font-size: clamp(24px, 3vw, 32px); font-weight: 400;
          color: #333333; margin-bottom: 20px;
        }
        .lk-activity { display: flex; gap: 14px; align-items: flex-start; margin-bottom: 16px; }
        .lk-activity:last-child { margin-bottom: 0; }
        .lk-activity-text { font-family: 'Lato', sans-serif; font-size: 15px; line-height: 1.75; color: #333333; word-break: normal; overflow-wrap: break-word; }
        .lk-activity-note { font-family: 'Lora', serif; font-style: italic; font-size: 14px; line-height: 1.65; color: rgba(51,51,51,0.7); margin-top: 4px; max-width: 560px; }
        .lk-pullquote { background: #F5F0EB; padding: 80px clamp(28px, 5vw, 60px); text-align: center; }
        .lk-pullquote-text { font-family: 'Lora', serif; font-style: italic; font-size: 20px; line-height: 1.7; color: #333333; max-width: 640px; margin: 28px auto; }

        .lk-time-divider { margin: 8px 0 22px; display: flex; justify-content: center; }
        .lk-time-divider img { width: 100%; max-width: none; opacity: 0.7; }

        /* Overnight footer */
        .lk-overnight {
          background: #B7C8B5;
          padding: clamp(28px, 5vw, 48px) clamp(20px, 4vw, 48px) clamp(14px, 2.5vw, 24px);
          position: relative;
        }
        .lk-overnight-tree-divider {
          position: relative; max-width: 880px; margin: 0 auto;
        }
        .lk-overnight-tree-divider img {
          width: 100%; height: auto; display: block; opacity: 0.85;
        }
        .lk-overnight-text {
          position: absolute;
          top: 42%; left: 50%; transform: translate(-50%, -50%);
          font-family: 'Playfair Display', serif; font-weight: 700;
          font-size: clamp(13px, 2vw, 20px); line-height: 1.3;
          color: #333333; text-align: center;
          margin: 0;
          width: 56%;
        }

        /* Farewell card */
        .lk-farewell-wrap { background: #F5F0EB; padding: 60px 24px 80px; text-align: center; overflow: visible; }
        .lk-farewell-card {
          display: block; background: transparent;
          border: none; border-radius: 0;
          padding: 56px 64px; max-width: 460px; margin: 0 auto;
          position: relative;
        }
        .lk-farewell-frame {
          position: absolute;
          inset: -10px -10px -16px -20px;
          pointer-events: none;
          z-index: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .lk-farewell-frame img {
          width: 100%;
          height: auto;
          display: block;
          opacity: 0.85;
        }
        .lk-farewell-card .lk-farewell-text {
          position: relative;
          z-index: 1;
        }
        .lk-farewell-text {
          font-family: 'Lora', serif; font-style: italic;
          font-size: 1.5rem; color: #333333; line-height: 1.4;
          white-space: pre-line;
        }
        .lk-farewell-deco {
          display: flex; justify-content: center; align-items: flex-end;
          gap: 8px; margin-top: 80px; padding: 0 16px 20px;
        }
        .lk-farewell-deco img {
          flex-shrink: 1;
          min-width: 0;
          max-width: 30vw;
        }

        /* ── INVESTMENT ── */
        .lk-investment { background: #F5F0EB; padding: 100px 80px; }
        .lk-inv-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 3vw, 2.8rem); font-weight: 700;
          color: #333333; margin-bottom: 12px;
        }
        .lk-inv-min {
          font-family: 'Lato', sans-serif; font-size: 16px; font-weight: 400;
          color: #333333; margin-bottom: 40px;
          display: flex; align-items: center; gap: 10px;
        }
        .lk-inv-min img { width: 24px; height: 24px; opacity: 0.6; }
        .lk-inv-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 0;
          border: 1.5px solid rgba(51,51,51,0.1); background: transparent;
          margin-bottom: 48px; max-width: 650px;
        }
        .lk-inv-col { padding: 32px 40px; }
        .lk-inv-col:first-child { border-right: 1.5px solid rgba(51,51,51,0.1); }
        .lk-inv-col-title {
          font-family: 'Lato', sans-serif; font-size: 14px; font-weight: 400;
          letter-spacing: 0.1em; color: #333333; opacity: 0.6; margin-bottom: 16px;
        }
        .lk-inv-label { font-family: 'Lato', sans-serif; font-size: 14px; color: #333333; opacity: 0.6; margin-bottom: 4px; }
        .lk-inv-price { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 700; color: #333333; }
        .lk-inv-price span { font-size: 0.85rem; font-weight: 400; }
        .lk-inv-price-row { margin-bottom: 8px; }
        .lk-inv-price-row:last-child { margin-bottom: 0; }

        .lk-icon-grid {
          display: grid; grid-template-columns: repeat(5, 1fr);
          gap: 32px 24px; margin-bottom: 48px;
        }
        .lk-icon-item { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 12px; }
        .lk-icon-item img { width: 36px; height: 36px; opacity: 0.7; }
        .lk-icon-label { font-family: 'Lato', sans-serif; font-size: 13px; line-height: 1.5; color: #333333; text-align: center; }

        .lk-section-subtitle {
          font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 700;
          color: #333333; margin: 48px 0 28px;
        }

        .lk-entry-note {
          margin-top: 56px; padding-top: 32px;
          border-top: 1px solid rgba(51,51,51,0.12);
          max-width: 720px;
        }
        .lk-entry-note h4 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.2rem, 2vw, 1.5rem); font-weight: 700;
          color: #333333; margin: 0 0 16px;
        }
        .lk-entry-note p {
          font-family: 'Lato', sans-serif; font-size: 14px; line-height: 1.75;
          color: #333333; margin: 0 0 12px;
        }
        .lk-entry-note a { color: #333333; text-decoration: underline; }

        /* ── CTA ── */
        .lk-cta {
          background: #F5F0EB; padding: 100px 80px 0;
          text-align: center; display: flex; flex-direction: column; align-items: center;
          position: relative; overflow: hidden;
        }
        .lk-cta > .pfu {
          width: 100%; display: flex; flex-direction: column; align-items: center;
        }
        .lk-cta-circle {
          position: absolute; border-radius: 50%; pointer-events: none;
        }
        .lk-cta-circle--pink-lg {
          width: clamp(180px, 30vw, 300px); height: clamp(180px, 30vw, 300px);
          top: -40px; right: -30px;
          background: radial-gradient(circle, rgba(195,140,140,0.25) 0%, rgba(195,140,140,0.08) 60%, transparent 80%);
          border: 2px solid rgba(195,140,140,0.18);
        }
        .lk-cta-circle--pink-sm {
          width: clamp(100px, 18vw, 180px); height: clamp(100px, 18vw, 180px);
          top: clamp(20px, 5vw, 60px); right: clamp(60px, 12vw, 160px);
          background: radial-gradient(circle, rgba(180,120,130,0.18) 0%, rgba(180,120,130,0.05) 60%, transparent 80%);
          border: 2px solid rgba(180,120,130,0.15);
        }
        .lk-cta-circle--sage-lg {
          width: clamp(140px, 22vw, 220px); height: clamp(140px, 22vw, 220px);
          top: 10px; left: -40px;
          background: radial-gradient(circle, rgba(140,170,140,0.2) 0%, rgba(140,170,140,0.06) 60%, transparent 80%);
          border: 2px solid rgba(140,170,140,0.15);
        }
        .lk-cta-circle--sage-sm {
          width: clamp(80px, 14vw, 140px); height: clamp(80px, 14vw, 140px);
          bottom: 120px; right: 40px;
          background: radial-gradient(circle, rgba(140,170,140,0.15) 0%, rgba(140,170,140,0.04) 60%, transparent 80%);
          border: 2px solid rgba(140,170,140,0.12);
        }
        .lk-cta-leaf {
          position: absolute; pointer-events: none; opacity: 0.25;
        }
        .lk-cta-leaf--left { top: 50%; left: 20px; transform: translateY(-50%); }
        .lk-cta-leaf--right { bottom: 140px; right: 24px; }
        .lk-cta-heading {
          font-family: 'Playfair Display', serif; font-weight: 700;
          font-size: clamp(2.4rem, 4.5vw, 3.8rem);
          color: #333333; margin-bottom: 40px; line-height: 1.25; max-width: 500px;
        }
        .lk-cta-wa {
          display: inline-flex; align-items: center; gap: 14px;
          font-family: 'Lato', sans-serif; font-size: 16px; font-weight: 400;
          color: #333333; text-decoration: none; margin-bottom: 48px;
          padding: 16px 32px; border: 1px solid rgba(51,51,51,0.15); border-radius: 4px;
          transition: border-color 0.3s, background 0.3s;
        }
        .lk-cta-wa:hover { border-color: #D9A6A1; background: rgba(217,166,161,0.08); }
        .lk-cta-wa img { width: 24px; height: 24px; opacity: 0.7; }
        .lk-cta-wa-text { display: flex; flex-direction: column; align-items: flex-start; font-size: 14px; line-height: 1.5; }
        .lk-cta-wa-text strong { font-size: 16px; font-weight: 700; letter-spacing: 0.02em; }
        .lk-cta-date-bar {
          background: #D9A6A1; padding: 28px 32px; border-radius: 0;
          display: flex; align-items: center; justify-content: space-between; gap: 16px;
          align-self: stretch; margin: 0 -80px; box-sizing: border-box;
        }
        .lk-cta-date-label {
          font-family: 'Lato', sans-serif; font-size: 14px; color: rgba(255,255,255,0.75);
          letter-spacing: 0.12em; margin-bottom: 6px;
        }
        .lk-cta-date-val {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          font-family: 'Playfair Display', serif; color: white;
        }
        .lk-cta-date-part { font-size: 1.1rem; font-weight: 400; }
        .lk-cta-date-big { font-size: 2.2rem; font-weight: 700; line-height: 1; }
        .lk-cta-date-big sup { font-size: 0.5em; vertical-align: super; }
        .lk-cta-date-sep { font-size: 1.4rem; opacity: 0.5; font-weight: 300; }

        /* ── FINAL QUOTE ── */
        .lk-final-strip { position: relative; min-height: 50vh; overflow: hidden; display: flex; align-items: center; justify-content: center; }
        .lk-final-strip-bg { position: absolute; inset: 0; background: url('/assets/journey-bali.jpg') center / cover no-repeat, url('/assets/journey-srilanka.jpg') center / cover no-repeat; }
        .lk-final-strip-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.10); }
        .lk-final-quote {
          position: relative; z-index: 1; max-width: 320px; text-align: center;
          padding: 48px 40px; margin: 0 auto;
        }
        .lk-final-quote-frame {
          position: absolute; inset: -12px -16px -18px -16px;
          pointer-events: none; z-index: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .lk-final-quote-frame img {
          width: 100%; height: 100%; object-fit: fill; display: block; opacity: 0.85;
        }
        .lk-quote-ornament { display: none; }
        .lk-final-quote p {
          font-family: 'Lora', serif; font-style: italic; font-size: 1.15rem;
          color: white; line-height: 1.5; text-shadow: 0 2px 12px rgba(0,0,0,0.4);
          position: relative; z-index: 1;
        }

        @media (max-width: 1024px) {
          .lk-invite { padding: 56px 36px 120px; }
          .lk-guide {
            padding: 80px 40px 0;
            padding-left: max(40px, env(safe-area-inset-left, 0px));
            padding-right: max(40px, env(safe-area-inset-right, 0px));
          }
          .lk-guide-mountains { gap: clamp(10px, 4vw, 48px); }
          .lk-day-header { padding: 64px 48px 24px; }
          .lk-day-body { padding: 0 48px 48px; }
          .lk-overnight { padding: 24px 48px 14px; }
          .lk-investment { padding: 80px 48px; }
          .lk-icon-grid { grid-template-columns: repeat(3, 1fr); }
          .lk-cta { padding: 80px 48px 0; }
          .lk-cta-date-bar { margin: 0 -48px; }
        }
        @media (max-width: 768px) {
          .lk-invite { padding: 48px 24px 120px; }
          .lk-invite-top {
            align-items: flex-start;
            margin-bottom: 32px;
          }
          .lk-invite-photo-wrap {
            width: 46vw;
            max-width: 200px;
          }
          .lk-invite-heading-area {
            padding-left: 12px;
            padding-top: 24px;
          }
          .lk-invite-divider {
            max-width: 130px;
          }
          .lk-invite-heading {
            font-size: 2.2rem;
            margin: 8px 0;
          }
          .lk-invite-heading .lk-from {
            font-size: 1.4rem;
            margin-top: 2px;
            margin-bottom: 2px;
          }
          .lk-invite-trees {
            bottom: 12px; right: 16px; transform: scale(0.85); transform-origin: bottom right;
          }
          .lk-guide {
            padding: 56px 24px 0;
            padding-left: max(24px, env(safe-area-inset-left, 0px));
            padding-right: max(24px, env(safe-area-inset-right, 0px));
          }
          .lk-guide-body-wrap { padding-bottom: clamp(90px, 24vw, 160px); }
          .lk-guide-mountains { gap: clamp(8px, 3vw, 24px); }
          .lk-guide-mountain-img { width: clamp(180px, 42vw, 320px); }
          .lk-guide-photo-wrap { width: min(240px, 76vw); height: min(240px, 76vw); }
          .lk-guide-img { width: 74%; height: 74%; max-width: 182px; max-height: 182px; }
          .lk-guide-rule img { width: min(88vw, 360px); }
          .lk-guide-title { font-size: clamp(1.55rem, 5.2vw, 2.4rem); }
          .lk-day-header { padding: 56px 24px 20px; }
          .lk-day-body { padding: 0 24px 40px; }
          .lk-day-card { padding: 28px 24px; }
          .lk-day-divider-mountain { height: clamp(50px, 9vw, 76px); right: 3%; bottom: 0; }
          .lk-overnight { padding: 20px 24px 12px; }
          .lk-investment { padding: 60px 20px; }
          .lk-inv-grid { grid-template-columns: 1fr 1fr; }
          .lk-inv-col { padding: 16px 12px; }
          .lk-inv-price { font-size: 1.1rem; }
          .lk-inv-col-title { font-size: 12px; }
          .lk-icon-grid { grid-template-columns: 1fr 1fr; }
          .lk-cta { padding: 60px 32px 0; }
          .lk-cta-date-bar { padding: 24px 32px; margin: 0 -32px; }
          .lk-farewell-wrap { padding: 60px 32px; }
          .lk-farewell-card { padding: 28px 24px; }
          .lk-final-quote { padding: 16px 24px; }
          .lk-hero-logo { height: 56px; top: 20px; left: 20px; }
          .lk-hero-dates { bottom: 80px; }
          .lk-final-quote p { font-size: 1.05rem; }
        }
        @media (max-width: 480px) {
          .lk-guide {
            padding: 44px 16px 0;
            padding-left: max(16px, env(safe-area-inset-left, 0px));
            padding-right: max(16px, env(safe-area-inset-right, 0px));
          }
          .lk-guide-photo-wrap {
            width: min(210px, 82vw);
            height: min(210px, 82vw);
            margin-bottom: clamp(20px, 5vw, 28px);
          }
          .lk-guide-img {
            max-width: 168px;
            max-height: 168px;
          }
          .lk-guide-rule--above { margin-bottom: 14px; }
          .lk-guide-rule--below { margin-top: 14px; margin-bottom: 16px; }
          .lk-guide-rule img { width: min(92vw, 300px); }
          .lk-guide-title { font-size: clamp(1.4rem, 6.8vw, 2rem); }
          .lk-guide-subtitle { font-size: 1rem; margin-bottom: 22px; }
          .lk-guide-body { font-size: 15px; line-height: 1.75; }
          .lk-guide-body-wrap {
            padding-bottom: clamp(70px, 22vw, 130px);
          }
          .lk-guide-mountains { gap: clamp(4px, 2vw, 10px); }
          .lk-guide-mountain-img { width: clamp(160px, 46vw, 240px); }
        }
      `}</style>

      <div className="grain" aria-hidden="true" />
      <div className="pv-progress" style={{ width: `${progress}%` }} aria-hidden="true" />
      <Nav />
      <WhatsAppButton />

      {/* ══ HERO ══ */}
      <section className="lk-hero">
        <div className="lk-hero-bg" />
        <div className="lk-hero-overlay" />
        <div className="lk-hero-content">
          <h1 className="lk-hero-title">Bali</h1>
        </div>
        <p className="lk-hero-dates">
          October<br />23<sup>rd</sup> to 28<sup>th</sup>, 2026
        </p>
      </section>

      {/* ══ INVITATION FROM HARSHA ══ */}
      <section className="lk-invite">
        <FU>
          <div className="lk-invite-top">
            <div className="lk-invite-photo-wrap">
              <img src="/assets/Puravida_Photo-Frame-2-Harsha.png" alt="Harsha" className="lk-invite-img" style={{ borderRadius: 0 }} />
            </div>
            <div className="lk-invite-heading-area">
              <img
                src="/assets/05. GRAPHIC ELEMENTS/Dividers/Divider - Center.png"
                alt="" aria-hidden="true" className="lk-invite-divider"
              />
              <h2 className="lk-invite-heading">
                <span className="lk-an">An</span>
                <span className="lk-invitation">Invitation</span>
                <span className="lk-from">from</span>
                <span className="lk-name">Harsha</span>
              </h2>
              <img
                src="/assets/05. GRAPHIC ELEMENTS/Dividers/Divider - Center.png"
                alt="" aria-hidden="true" className="lk-invite-divider"
              />
            </div>
          </div>
        </FU>
        <FU d={1}>
          <p className="lk-invite-body">
            Bali reveals itself in quiet, intimate moments &ndash; a woman crafting jamu from her grandmother's plants, the sacred waters of Tirta Empul, a garden in Ubud where we cook, listen to gamelan, and feel truly present.
          </p>
          <p className="lk-invite-body">
            Travel is shaped by people &ndash; ordinary, extraordinary. Their stories become part of our own memories.
          </p>
          <p className="lk-invite-body">
            This women-only retreat is for those needing to slow down and reconnect &ndash; with the island and with themselves.
          </p>
          <p className="lk-invite-body">
            We shall stay above a jungle gorge at The Royal Ubud resort, spend a day in deep healing with a master teacher, and witness the Ramayana at sunset as the ocean turns gold.
          </p>
          <p className="lk-invite-body">
            An intimate circle of 8 to 12 women, guided by me and my Indonesian childhood friend Gita.
          </p>
          <p className="lk-invite-body">
            This is a quiet, meaningful luxury experience that shall stay with us.
          </p>
          <p className="lk-invite-body">Bali in October is one of them. Come.</p>
        </FU>
        <div className="lk-invite-trees">
          <Glyph name="Trees" variant="White" size={160} opacity={0.85} />
        </div>
      </section>

      {/* ══ WALK BALI WITH JANAM ══ */}
      <section className="lk-guide">
        <FU>
          <div className="lk-guide-column">
            <div className="lk-guide-photo-wrap">
              <img src={encodeURI("/assets/Bali-Cultural Guide.png")} alt="Janam" className="lk-guide-img" />
              <img
                src="/assets/Puravida_Photo-Frame-1-Juma.png"
                alt="" aria-hidden="true" className="lk-guide-frame"
              />
            </div>
            <div className="lk-guide-head">
              <div className="lk-guide-rule lk-guide-rule--above">
                <img
                  src="/assets/05. GRAPHIC ELEMENTS/Dividers/Divider - Center.png"
                  alt="" aria-hidden="true"
                />
              </div>
              <h2 className="lk-guide-title">
                <span className="lk-guide-title-top">Walk Bali</span>
                <span className="lk-guide-title-bottom">with Janam</span>
              </h2>
              <div className="lk-guide-rule lk-guide-rule--below">
                <img
                  src="/assets/05. GRAPHIC ELEMENTS/Dividers/Divider - Center.png"
                  alt="" aria-hidden="true"
                />
              </div>
              <p className="lk-guide-subtitle">Your cultural bridge.</p>
            </div>
            <div className="lk-guide-body-wrap">
              <p className="lk-guide-body">
                Hi, I am Janam &ndash; born and brought up in Indonesia, with a deep love for Bali. Having visited many times, I have come to experience the island beyond the usual &ndash; through its culture, energy, and hidden beauty that makes it so special.
              </p>
              <p className="lk-guide-body">
                Together with my childhood friend Harsha, founder of PuraVida with Harsha, we are curating a special girls' trip to Bali.
              </p>
              <p className="lk-guide-body">
                This is not just a holiday &ndash; it is an experience. A chance to unwind, connect, and see Bali through a more personal lens. From meaningful moments to beautiful settings, I am excited to share the island the way I truly see and feel it.
              </p>
              <p className="lk-guide-body">
                Come join us for a memorable escape filled with great energy, connection, and unforgettable memories.
              </p>
            </div>
          </div>
        </FU>
        <div className="lk-guide-mountains" aria-hidden="true">
          <div className="lk-guide-mountain-side lk-guide-mountain-left">
            <img
              src={GLYPH_WHITE_MOUNTAINS_SRC}
              alt=""
              className="lk-guide-mountain-img"
            />
          </div>
          <div className="lk-guide-mountain-side lk-guide-mountain-right">
            <img
              src={GLYPH_WHITE_MOUNTAINS_SRC}
              alt=""
              className="lk-guide-mountain-img"
            />
          </div>
        </div>
      </section>

      {/* ══ DAY-BY-DAY ITINERARY ══ */}
      {DAYS.map((day, idx) => (
        <div key={idx}>
          {idx === 3 && (
            <FU>
              <div className="lk-pullquote">
                <Divider width={160} opacity={0.4} />
                <p className="lk-pullquote-text">
                  Travel is shaped by people &ndash; ordinary, extraordinary. Their stories become part of our own memories.
                </p>
                <Divider width={160} opacity={0.4} />
              </div>
            </FU>
          )}
          <FU>
            <div className="lk-day-header">
              <p className="lk-day-num">DAY- <span>{day.day}</span></p>
              <h2 className="lk-day-title">
                {day.title}
                {day.subtitle && <><br />{day.subtitle}</>}
              </h2>
              <div className="lk-day-divider-row">
                <img
                  src="/assets/05. GRAPHIC ELEMENTS/Dividers/Divider - Center.png"
                  alt="" aria-hidden="true"
                  className="lk-day-divider-line"
                />
                <img
                  src="/assets/05. GRAPHIC ELEMENTS/Glyphs/Charcoal/Mountains/Mountains.png"
                  alt="" aria-hidden="true"
                  className="lk-day-divider-mountain"
                />
              </div>
            </div>

            <div className="lk-day-body">
              <div className="lk-day-card">
                <div className="lk-day-card-frame" aria-hidden="true">
                  <img src="/assets/Frame.png" alt="" />
                </div>
                {day.morning.length > 0 && (
                  <>
                    <div className="lk-time-section">
                      <h3 className="lk-time-heading">Morning</h3>
                      {day.morning.map((a, i) => (
                        <DayActivity key={i} icon={a.icon} text={a.text} note={a.note} />
                      ))}
                    </div>
                    <div className="lk-time-divider">
                      <img src="/assets/05. GRAPHIC ELEMENTS/Dividers/Divider - Center.png" alt="" aria-hidden="true" />
                    </div>
                  </>
                )}
                {day.afternoon.length > 0 && (
                  <>
                    <div className="lk-time-section">
                      <h3 className="lk-time-heading">Afternoon</h3>
                      {day.afternoon.map((a, i) => (
                        <DayActivity key={i} icon={a.icon} text={a.text} note={a.note} />
                      ))}
                    </div>
                    <div className="lk-time-divider">
                      <img src="/assets/05. GRAPHIC ELEMENTS/Dividers/Divider - Center.png" alt="" aria-hidden="true" />
                    </div>
                  </>
                )}
                {day.evening.length > 0 && (
                  <>
                    <div className="lk-time-section">
                      <h3 className="lk-time-heading">Evening</h3>
                      {day.evening.map((a, i) => (
                        <DayActivity key={i} icon={a.icon} text={a.text} note={a.note} />
                      ))}
                    </div>
                    <div className="lk-time-divider">
                      <img src="/assets/05. GRAPHIC ELEMENTS/Dividers/Divider - Center.png" alt="" aria-hidden="true" />
                    </div>
                  </>
                )}
                <div className="lk-day-pause">
                  <Glyph name="Pause" size={48} opacity={0.15} />
                </div>
              </div>
            </div>

            {day.farewell ? (
              <div className="lk-farewell-wrap">
                <div className="lk-farewell-card">
                  <div className="lk-farewell-frame" aria-hidden="true">
                    <img src="/assets/Puravida_Quote-Frame-2-20260405T104951Z-3-001/Puravida_Quote-Frame-2/Frame.png" alt="" />
                  </div>
                  <p className="lk-farewell-text">{day.farewell}</p>
                </div>
                <div className="lk-farewell-deco">
                  <Glyph name="Mountains" size={60} opacity={0.25} />
                  <Glyph name="Sunset" size={68} opacity={0.3} />
                  <Glyph name="Mountains" size={52} opacity={0.22} />
                </div>
              </div>
            ) : day.overnight ? (
              <div className="lk-overnight">
                <div className="lk-overnight-tree-divider">
                  <img
                    src="/assets/05. GRAPHIC ELEMENTS/Dividers/Tree-Divider.png"
                    alt="" aria-hidden="true"
                  />
                  <p className="lk-overnight-text">Overnight in {day.overnight} &ndash;<br />{day.hotel}.</p>
                </div>
              </div>
            ) : null}
          </FU>
        </div>
      ))}

      {/* ══ INVESTMENT ══ */}
      <section className="lk-investment">
        <FU>
          <h2 className="lk-inv-title">Your Investment</h2>
          <div className="lk-day-divider-row">
            <img
              src="/assets/05. GRAPHIC ELEMENTS/Dividers/Divider - Center.png"
              alt="" aria-hidden="true"
              className="lk-day-divider-line"
            />
            <img
              src="/assets/05. GRAPHIC ELEMENTS/Glyphs/Charcoal/Trees/Trees.png"
              alt="" aria-hidden="true"
              className="lk-day-divider-mountain"
              style={{ height: 'clamp(40px, 6vw, 56px)' }}
            />
          </div>

          <div className="lk-inv-min">
            <img src="/assets/04. ICONS/PNG/Charcoal/48px/Small group  - 48px.png" alt="" />
            An intimate circle of 8 to 12 women
          </div>

          <div className="lk-day-divider-row" style={{ marginTop: 16 }}>
            <img
              src="/assets/05. GRAPHIC ELEMENTS/Dividers/Divider - Center.png"
              alt="" aria-hidden="true"
              className="lk-day-divider-line"
            />
          </div>

          <div className="lk-inv-grid" style={{ marginTop: 24 }}>
            <div className="lk-inv-col">
              <p className="lk-inv-col-title">Twin Room (shared, 2 per room)</p>
              <Divider width={180} opacity={0.3} />
              <div style={{ marginTop: 16 }}>
                <div className="lk-inv-price-row">
                  <p className="lk-inv-price">USD 3,400 <span>per person</span></p>
                </div>
                <div className="lk-inv-price-row">
                  <p className="lk-inv-price">AED 12,478 <span>per person</span></p>
                </div>
              </div>
            </div>
            <div className="lk-inv-col">
              <p className="lk-inv-col-title">Single Room (private)</p>
              <Divider width={180} opacity={0.3} />
              <div style={{ marginTop: 16 }}>
                <div className="lk-inv-price-row">
                  <p className="lk-inv-price">USD 4,050</p>
                </div>
                <div className="lk-inv-price-row">
                  <p className="lk-inv-price">AED 14,864</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lk-day-divider-row" style={{ marginTop: 32 }}>
            <img
              src="/assets/05. GRAPHIC ELEMENTS/Dividers/Divider - Center.png"
              alt="" aria-hidden="true"
              className="lk-day-divider-line"
            />
          </div>

          <h3 className="lk-section-subtitle">Inclusions</h3>
          <div className="lk-icon-grid">
            {INCLUSIONS.map((item, i) => (
              <div className="lk-icon-item" key={i}>
                <DayIcon type={item.icon} />
                <p className="lk-icon-label">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="lk-day-divider-row" style={{ marginTop: 32 }}>
            <img
              src="/assets/05. GRAPHIC ELEMENTS/Dividers/Divider - Center.png"
              alt="" aria-hidden="true"
              className="lk-day-divider-line"
            />
          </div>

          <h3 className="lk-section-subtitle">Exclusions</h3>
          <div className="lk-icon-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
            {EXCLUSIONS.map((item, i) => (
              <div className="lk-icon-item" key={i}>
                <DayIcon type={item.icon} />
                <p className="lk-icon-label">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="lk-entry-note">
            <h4>Important: Indonesia Entry Requirements</h4>
            <p>
              Effective August 2025, all travellers &ndash; regardless of nationality &ndash; must complete the All Indonesia Immigration form before arrival.
            </p>
            <p>
              Form link: <a href="https://allindonesia.imigrasi.go.id" target="_blank" rel="noopener noreferrer">allindonesia.imigrasi.go.id</a> &ndash; complete this before you fly. Without it, entry may be refused at immigration.
            </p>
            <p>
              Visa on Arrival is available for eligible nationalities at Bali Airport: IDR 500,000 per person (approx USD 36 / AED 132). Online application also available at <a href="https://evisa.imigrasi.go.id" target="_blank" rel="noopener noreferrer">evisa.imigrasi.go.id</a>.
            </p>
          </div>
        </FU>
      </section>

      {/* ══ CTA ══ */}
      <section className="lk-cta">
        <div className="lk-cta-circle lk-cta-circle--pink-lg" />
        <div className="lk-cta-circle lk-cta-circle--pink-sm" />
        <div className="lk-cta-circle lk-cta-circle--sage-lg" />
        <div className="lk-cta-circle lk-cta-circle--sage-sm" />
        <div className="lk-cta-leaf lk-cta-leaf--left"><Glyph name="Trees" variant="Sage" size={32} opacity={1} /></div>
        <div className="lk-cta-leaf lk-cta-leaf--right"><Glyph name="Trees" variant="Sage" size={28} opacity={1} /></div>
        <FU>
          <h2 className="lk-cta-heading">Your Journey Begins<br />with a Message</h2>
          <a href="https://wa.me/+971562216643?text=Hello%20Harsha%2C%20I%20am%20interested%20in%20the%20Bali%20journey%20and%20would%20love%20to%20learn%20more." className="lk-cta-wa" target="_blank" rel="noopener noreferrer">
            <img
              src="/assets/04. ICONS/PNG/Charcoal/48px/Whatsapp  - 48px.png"
              alt=""
            />
            <div className="lk-cta-wa-text">
              <strong>WhatsApp Harsha</strong>
              +971 56 2216643
            </div>
          </a>
          <div className="lk-cta-date-bar">
            <Glyph name="Trees" variant="White" size={48} opacity={0.6} />
            <div style={{ textAlign: 'center' }}>
              <p className="lk-cta-date-label">Join us by</p>
              <div className="lk-cta-date-val">
                <span className="lk-cta-date-part">September</span>
                <span className="lk-cta-date-sep">|</span>
                <span className="lk-cta-date-big">10<sup>th</sup></span>
                <span className="lk-cta-date-sep">|</span>
                <span className="lk-cta-date-part">2026</span>
              </div>
            </div>
            <Glyph name="Trees" variant="White" size={48} opacity={0.6} />
          </div>
        </FU>
      </section>

      {/* ══ FINAL QUOTE ══ */}
      <div className="lk-final-strip">
        <div className="lk-final-strip-bg" />
        <div className="lk-final-strip-overlay" />
        <FU>
          <div className="lk-final-quote">
            <div className="lk-final-quote-frame">
              <img src="/assets/Puravida_Quote-Frame-1/Frame.png" alt="" aria-hidden="true" />
            </div>
            <p>{"“"}Harmony is not found &ndash; it is remembered, in stillness, in nature, in spirit.{"”"}</p>
          </div>
        </FU>
      </div>

      <Footer />
    </>
  );
}
