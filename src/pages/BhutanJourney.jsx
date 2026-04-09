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
    <div ref={ref} className={`bfu${vis ? ' bin' : ''} ${className}`}
      style={{ transitionDelay: `${d * 0.13}s`, ...style }}>
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
    meal:        'Meals  - 48px.png',
    transport:   'Transport - 48px.png',
    experience:  'Experience  - 48px.png',
    hotel:       'Accomodation  - 48px.png',
    leisure:     'Duration  - 48px.png',
    culture:     'Cultural Bridge  - 48px.png',
    wellness:    'Wellness  - 48px.png',
    location:    'Location - 48px.png',
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

/* ─────────────────────────────────────────
   INCLUSIONS: icon above label, 4-per-row
   per brand guidelines page 47
───────────────────────────────────────── */
const INCLUSIONS = [
  { icon: 'hotel',      label: 'Seven nights accommodation at handpicked heritage hotels' },
  { icon: 'meal',       label: 'Breakfast daily and selected meals as listed' },
  { icon: 'transport',  label: 'All ground transportation throughout Bhutan' },
  { icon: 'culture',    label: 'Full cultural guidance by Kelly Dorji for the entire duration' },
  { icon: 'experience', label: 'Founder accompaniment by Harsha for the entire journey' },
  { icon: 'location',   label: 'All monument, museum, and temple entry fees' },
  { icon: 'experience', label: 'Sustainable Development Fee (all nationalities)' },
  { icon: 'wellness',   label: 'Traditional Bhutanese hot stone bath in Paro' },
  { icon: 'culture',    label: 'Kelzang Textile cultural experience in Thimphu' },
  { icon: 'experience', label: 'Guided meditation session with Kelly Dorji' },
  { icon: 'experience', label: 'All government royalties and taxes within Bhutan' },
];

const EXCLUSIONS = [
  { icon: 'transport',  label: 'International flights to and from Paro' },
  { icon: 'experience', label: 'Travel and medical insurance (mandatory)' },
  { icon: 'meal',       label: 'Lunches and dinners unless specified' },
];

const DAYS = [
  {
    num: '01', title: 'Arrival in Paro, Transfer to Thimphu', travel: 'Approx 1 hour',
    city: 'Thimphu', hotel: 'Himalayan Keys Forest Resort',
    periods: [
      { label: 'Morning', items: [
        { icon: 'experience', text: 'Immigration at Paro Airport' },
        { icon: 'experience', text: 'Stop at Tanchog Lhakhang Iron Bridge' },
        { icon: 'hotel',      text: 'Check in to hotel in Thimphu' },
        { icon: 'meal',       text: 'Enjoy lunch' },
      ]},
      { label: 'Afternoon', items: [
        { icon: 'leisure', text: 'Open to guests: rest, visit cafes, or explore Thimphu town at your own pace' },
      ]},
      { label: 'Evening', items: [
        { icon: 'meal', text: 'Dinner at the hotel' },
      ]},
    ],
    farewell: null,
  },
  {
    num: '02', title: 'Thimphu Sightseeing and Night Out', travel: null,
    city: 'Thimphu', hotel: 'Himalayan Keys Forest Resort',
    periods: [
      { label: 'Morning', items: [
        { icon: 'meal',       text: 'Breakfast' },
        { icon: 'experience', text: 'Visit Buddha Dordenma' },
        { icon: 'experience', text: 'Scenic walk to Kelzang Textile' },
      ]},
      { label: 'Afternoon', items: [
        { icon: 'culture',    text: 'Kelzang Textile cultural experience: dyeing, weaving, and cooking' },
        { icon: 'meal',       text: 'Home-style lunch' },
        { icon: 'experience', text: 'Simply Bhutan museum' },
        { icon: 'experience', text: 'Tashichho Dzong' },
      ]},
      { label: 'Evening', items: [
        { icon: 'hotel',   text: 'Freshen up' },
        { icon: 'leisure', text: 'Explore Thimphu town for momos and thukpa' },
        { icon: 'leisure', text: 'The Grey Area lounge' },
      ]},
    ],
    farewell: null,
  },
  {
    num: '03', title: 'Thimphu to Phobjikha Valley', travel: 'Approx 4.5 hours',
    city: 'Phobjikha', hotel: 'Pinewood Resort',
    periods: [
      { label: 'Morning', items: [
        { icon: 'meal',      text: 'Breakfast' },
        { icon: 'transport', text: 'Drive via Dochula Pass (3,100m)' },
      ]},
      { label: 'Afternoon', items: [
        { icon: 'experience', text: '108 Druk Wangyal Chortens' },
        { icon: 'meal',       text: 'Lunch en route' },
        { icon: 'transport',  text: 'Arrive Phobjikha Valley' },
      ]},
      { label: 'Evening', items: [
        { icon: 'hotel', text: 'Check in' },
        { icon: 'meal',  text: 'Dinner and relaxation by the fireplace' },
      ]},
    ],
    farewell: null,
  },
  {
    num: '04', title: 'Phobjikha to Punakha', travel: 'Approx 3 hours',
    city: 'Punakha', hotel: 'Dhensa Resort',
    periods: [
      { label: 'Morning', items: [
        { icon: 'meal',       text: 'Breakfast' },
        { icon: 'experience', text: 'Black-Necked Crane Information Centre' },
        { icon: 'transport',  text: 'Depart for Punakha' },
      ]},
      { label: 'Afternoon', items: [
        { icon: 'meal',       text: 'Lunch en route' },
        { icon: 'experience', text: 'Chimi Lhakhang' },
        { icon: 'hotel',      text: 'Check in' },
        { icon: 'experience', text: 'Punakha Dzong' },
      ]},
      { label: 'Evening', items: [
        { icon: 'experience', text: 'Punakha Suspension Bridge' },
        { icon: 'meal',       text: 'Dinner' },
      ]},
    ],
    farewell: null,
  },
  {
    num: '05', title: 'Punakha to Paro via Thimphu', travel: 'Approx 3.5 hours',
    city: 'Paro', hotel: 'Zhiwaling Heritage',
    periods: [
      { label: 'Morning', items: [
        { icon: 'meal',       text: 'Breakfast' },
        { icon: 'experience', text: 'Khamsum Yulley Namgyal Chorten hike' },
        { icon: 'transport',  text: 'Depart for Paro via Lamperi Botanical Park and Rhododendron Festival' },
      ]},
      { label: 'Afternoon', items: [
        { icon: 'meal',      text: 'Riverside picnic at The Secret Garden in Thimphu' },
        { icon: 'transport', text: 'Proceed to Paro' },
      ]},
      { label: 'Evening', items: [
        { icon: 'experience', text: 'Kyichu Lhakhang' },
        { icon: 'hotel',      text: 'Check in' },
        { icon: 'meal',       text: 'Dinner near the bonfire' },
      ]},
    ],
    farewell: null,
  },
  {
    num: '06', title: 'Paro, Hike to Tiger Nest Monastery and Hot Stone Bath', travel: null,
    city: 'Paro', hotel: 'Zhiwaling Heritage',
    periods: [
      { label: 'Morning', items: [
        { icon: 'meal',       text: 'Breakfast' },
        { icon: 'experience', text: 'Hike to Taktsang Monastery (900m above valley floor)' },
      ]},
      { label: 'Afternoon', items: [
        { icon: 'meal',       text: 'Lunch at cafeteria viewpoint' },
        { icon: 'experience', text: 'Descend from the monastery' },
        { icon: 'wellness',   text: 'Traditional Bhutanese hot stone bath' },
      ]},
      { label: 'Evening', items: [
        { icon: 'meal', text: 'Dinner at the hotel' },
      ]},
    ],
    farewell: null,
  },
  {
    num: '07', title: 'Paro, Mandala Art Center and Dumtsha Lhakhang', travel: null,
    city: 'Paro', hotel: 'Zhiwaling Heritage',
    periods: [
      { label: 'Morning', items: [
        { icon: 'meal',    text: 'Breakfast' },
        { icon: 'culture', text: 'Mandala Art Center' },
      ]},
      { label: 'Afternoon', items: [
        { icon: 'experience', text: 'Dumtsha Lhakhang' },
        { icon: 'meal',       text: 'Lunch' },
        { icon: 'leisure',    text: 'Shopping and cafe time in Paro town' },
      ]},
      { label: 'Evening', items: [
        { icon: 'hotel',      text: 'Freshen up' },
        { icon: 'culture',    text: 'Guided meditation with Kelly Dorji' },
        { icon: 'meal',       text: 'Farewell dinner' },
      ]},
    ],
    farewell: null,
  },
  {
    num: '08', title: 'Departure from Paro', travel: null,
    city: null, hotel: null,
    periods: [
      { label: 'Morning', items: [
        { icon: 'meal',      text: 'Breakfast' },
        { icon: 'transport', text: 'Transfer to Paro International Airport for departure' },
      ]},
    ],
    farewell: '\u201CTashi Delek,\nuntil we meet again.\u201D',
  },
];

export default function BhutanJourney() {
  const [progress, setProgress] = useState(0);

  useEffect(() => { window.scrollTo(0, 0); document.title = 'Bhutan | PuraVida with Harsha'; }, []);

  useEffect(() => {
    const fn = () => setProgress(
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    );
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <style>{`
        .bfu { opacity:0; transform:translateY(24px); transition:opacity 0.8s ease, transform 0.8s ease; }
        .bfu.bin { opacity:1; transform:translateY(0); }

        /* ══ HERO ══ */
        .bj-hero {
          position: relative; min-height: 100vh; overflow: hidden;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center; color: #fff;
        }
        .bj-hero-bg {
          position: absolute; inset: 0;
          background: url('/assets/hero-bhutan.jpg') center / cover no-repeat;
        }
        .bj-hero-bg::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(to bottom,
            rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 40%,
            rgba(0,0,0,0.25) 70%, rgba(0,0,0,0.55) 100%);
        }
        .bj-hero-content {
          position: relative; z-index: 2;
          display: flex; flex-direction: column;
          align-items: center; padding: 0 32px;
        }
        .bj-hero-logo {
          width: 160px; margin-bottom: 64px;
          opacity: 0; animation: bjFade 1s ease 0.3s forwards;
        }
        .bj-hero-title {
          font-family: 'Playfair Display', serif; font-weight: 700;
          font-size: clamp(4rem, 10vw, 8rem);
          line-height: 1.0; letter-spacing: 0.02em; margin-bottom: 24px;
          opacity: 0; animation: bjFade 1s ease 0.6s forwards;
        }
        .bj-hero-dates {
          font-family: 'Lato', sans-serif;
          font-size: clamp(16px, 2vw, 20px); font-weight: 400;
          letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 16px;
          opacity: 0; animation: bjFade 1s ease 0.9s forwards;
        }
        .bj-hero-tagline {
          font-family: 'Lora', serif; font-style: italic;
          font-size: clamp(18px, 2.5vw, 24px); line-height: 1.5;
          /* Turmeric Gold per brand guidelines */
          color: #D4A42C;
          opacity: 0; animation: bjFade 1s ease 1.2s forwards;
        }
        .bj-hero-credit {
          position: absolute; bottom: 20px; right: 24px; z-index: 3;
          font-family: 'Lato', sans-serif; font-size: 12px;
          color: rgba(255,255,255,0.7); text-shadow: 0 1px 3px rgba(0,0,0,0.4);
        }
        @keyframes bjFade { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }

        /* ══ INVITATION FROM HARSHA ══ */
        .bj-invite {
          background: #B7C8B5;
          padding: 64px clamp(28px, 5vw, 60px) 140px;
          position: relative;
        }
        @media (min-width: 1025px) {
          .bj-invite { padding: 64px calc((100% - 640px) / 2) 140px; }
        }
        .bj-invite-top {
          display: flex; align-items: center;
          margin-bottom: 40px;
        }
        .bj-invite-photo-wrap {
          position: relative; flex-shrink: 0;
          width: clamp(140px, 28vw, 200px);
          overflow: visible;
        }
        .bj-invite-photo {
          width: 100%; display: block;
          position: relative; z-index: 1;
        }
        .bj-invite-heading-area {
          padding-left: clamp(4px, 1.5vw, 16px);
          flex: 1; min-width: 0;
          display: flex; flex-direction: column; align-items: flex-start;
        }
        .bj-invite-divider {
          width: clamp(100px, 18vw, 180px);
          opacity: 0.5; display: block;
        }
        .bj-invite-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 6.5vw, 2.8rem); font-weight: 700;
          font-style: normal;
          color: #333333; line-height: 1.05;
          margin: 12px 0; text-align: left;
        }
        .bj-invite-heading span { display: block; }
        .bj-invite-heading .bj-from {
          font-family: 'Playfair Display', serif; font-weight: 700;
          font-size: clamp(1.4rem, 4vw, 2rem);
          margin-top: 4px;
        }
        .bj-invite-body {
          font-family: 'Lato', sans-serif;
          font-size: 15px; line-height: 1.75; color: #333333;
          margin-bottom: 16px; max-width: 480px;
        }
        .bj-invite-trees {
          position: absolute; bottom: 16px; right: clamp(24px, 5vw, 60px);
          display: flex; gap: -4px; align-items: flex-end;
        }

        /* ══ WALK WITH KELLY DORJI ══ */
        .bj-kelly {
          background: #C5A3A3;
          padding: clamp(72px, 11vw, 108px) clamp(28px, 6vw, 88px) 0;
          text-align: center; position: relative; overflow: hidden;
        }
        .bj-kelly-column { position: relative; z-index: 1; max-width: 640px; margin: 0 auto; }
        .bj-kelly-photo-wrap {
          position: relative; display: inline-block;
          width: clamp(268px, 58vw, 336px); height: clamp(268px, 58vw, 336px);
          margin: 0 auto clamp(32px, 5vw, 44px);
        }
        .bj-kelly-photo {
          width: 76%; height: 76%; max-width: 254px; max-height: 254px;
          border-radius: 50%; object-fit: cover;
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          border: 2px solid rgba(30,30,30,0.42);
        }
        .bj-kelly-frame {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          width: 100%; height: 100%; object-fit: contain; pointer-events: none;
        }
        .bj-kelly-rule { display: flex; justify-content: center; margin: 0; }
        .bj-kelly-rule--above { margin-bottom: clamp(18px, 3vw, 26px); }
        .bj-kelly-rule--below { margin-top: clamp(18px, 3vw, 26px); margin-bottom: clamp(20px, 3.5vw, 28px); }
        .bj-kelly-rule img { width: clamp(220px, 62vw, 400px); opacity: 0.52; }
        .bj-kelly-head { max-width: 520px; margin: 0 auto; }
        .bj-kelly h2 {
          font-family: 'Playfair Display', serif; font-weight: 700;
          font-size: clamp(1.85rem, 4.2vw, 2.85rem);
          line-height: 1.18; color: #252525; margin: 0;
        }
        .bj-kelly-subtitle {
          font-family: 'Lora', serif; font-style: italic;
          font-size: clamp(1.05rem, 2.4vw, 1.2rem); font-weight: 400;
          color: rgba(255,252,250,0.92); margin: 0 0 clamp(28px, 5vw, 40px); letter-spacing: 0.02em;
        }
        .bj-kelly-body-wrap {
          max-width: 600px; margin: 0 auto; text-align: left;
          padding-bottom: clamp(60px, 14vw, 140px);
        }
        .bj-kelly-body {
          font-family: 'Lato', sans-serif;
          font-size: clamp(15px, 1.8vw, 17px); line-height: 1.85;
          color: #252525;
        }
        .bj-kelly-mountains {
          position: absolute; left: 0; right: 0; bottom: 0; z-index: 0;
          display: flex; justify-content: space-between; align-items: flex-end;
          pointer-events: none; line-height: 0;
        }
        .bj-kelly-mountain-side { display: flex; align-items: flex-end; line-height: 0; flex: 0 1 auto; min-width: 0; overflow: hidden; }
        .bj-kelly-mountain-img {
          display: block; height: auto; width: clamp(220px, 38vw, 480px);
          object-fit: contain; opacity: 0.55; margin-bottom: -2%;
        }
        .bj-kelly-mountain-right .bj-kelly-mountain-img { transform: scaleX(-1); }

        /* ══ ITINERARY ══ */
        .bj-itin { background: #F5F0EB; padding: 100px 0; }
        .bj-itin-header { text-align: center; max-width: 700px; margin: 0 auto 72px; padding: 0 80px; }
        .bj-itin-header h2 {
          font-family: 'Playfair Display', serif; font-weight: 700;
          font-size: clamp(2rem, 3.5vw, 3rem); line-height: 1.2; color: #333333; margin-bottom: 16px;
        }
        .bj-itin-header p { font-family: 'Lato', sans-serif; font-size: 16px; line-height: 1.7; color: #333333; }

        .bj-day { margin: 0; }
        .bj-day-head {
          background: #F5F0EB; padding: 60px 80px 32px;
          position: relative;
        }
        .bj-day-head-glyph { position: absolute; top: 16px; right: 24px; opacity: 0.12; }
        .bj-day-divider-row { position: relative; margin-top: 16px; }
        .bj-day-divider-row img.bj-day-divider-line { width: 100%; height: auto; opacity: 0.5; display: block; }
        .bj-day-divider-mountain {
          position: absolute; right: 10%; bottom: 40%;
          height: clamp(72px, 10vw, 100px); width: auto; opacity: 0.85;
        }
        .bj-day-label {
          font-family: 'Lato', sans-serif; font-size: 13px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase; color: #333333; margin-bottom: 8px;
        }
        .bj-day-label-num { color: #D9A6A1; }
        .bj-day-title {
          font-family: 'Playfair Display', serif; font-weight: 700;
          font-size: clamp(1.25rem, 2vw, 1.6rem); line-height: 1.3; color: #333333; margin-bottom: 4px;
        }
        .bj-day-travel {
          font-family: 'Lato', sans-serif; font-size: 14px; color: #333333;
          opacity: 0.6; font-style: italic; margin-bottom: 16px;
        }
        .bj-day-body { background: #F5F0EB; padding: 0 80px 60px; }
        .bj-day-card {
          background: transparent; border: none;
          padding: 40px 48px; position: relative;
        }
        .bj-day-card-frame { position: absolute; inset: 0; pointer-events: none; z-index: 1; }
        .bj-day-card-frame img { width: 100%; height: 100%; object-fit: fill; display: block; opacity: 0.7; }
        .bj-day-body-pause { position: absolute; bottom: 12px; right: 12px; pointer-events: none; z-index: 2; }

        .bj-period { margin-bottom: 28px; }
        .bj-period:last-child { margin-bottom: 0; }
        .bj-period-label {
          font-family: 'Playfair Display', serif; font-weight: 400;
          font-size: clamp(24px, 3vw, 32px); color: #333333; margin-bottom: 16px;
        }
        .bj-activity {
          display: flex; align-items: flex-start;
          gap: 14px; margin-bottom: 10px; padding: 6px 0;
        }
        .bj-activity:last-child { margin-bottom: 0; }
        .bj-activity-text {
          font-family: 'Lato', sans-serif;
          font-size: 16px; line-height: 1.7; color: #333333;
        }
        .bj-period-divider { margin: 24px 0; }

        /* Overnight footer — Sage per brand guidelines */
        .bj-day-foot {
          background: #B7C8B5; padding: 24px 24px 0;
          position: relative;
        }
        .bj-overnight-content {
          display: flex; align-items: center; justify-content: center; gap: 20px;
          padding-bottom: 16px;
        }
        .bj-day-foot-text {
          font-family: 'Lato', sans-serif; font-size: 15px; font-weight: 700;
          color: #333333; letter-spacing: 0.02em;
        }
        .bj-overnight-divider-line { width: 100%; height: auto; opacity: 0.35; display: block; }

        /* Farewell card */
        .bj-farewell-wrap { background: #F5F0EB; padding: 60px 24px 80px; text-align: center; overflow: visible; }
        .bj-farewell-card {
          display: block; background: transparent; border: none; border-radius: 0;
          padding: 56px 64px; max-width: 420px; margin: 0 auto; position: relative;
        }
        .bj-farewell-frame {
          position: absolute; inset: -10px -10px -16px -20px;
          pointer-events: none; z-index: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .bj-farewell-frame img { width: 100%; height: auto; display: block; opacity: 0.85; }
        .bj-farewell-text {
          font-family: 'Lora', serif; font-style: italic;
          font-size: 20px; line-height: 1.6; color: #333333;
          white-space: pre-line; position: relative; z-index: 1;
        }
        .bj-farewell-deco {
          display: flex; justify-content: center; align-items: flex-end;
          gap: 8px; margin-top: 80px; padding: 0 16px 20px;
        }
        .bj-farewell-deco img { flex-shrink: 1; min-width: 0; max-width: 30vw; }

        /* ══ INVESTMENT ══ */
        .bj-invest { background: #F5F0EB; padding: 100px 80px; }
        .bj-inv-title {
          font-family: 'Playfair Display', serif; font-weight: 700;
          font-size: clamp(2rem, 3vw, 2.8rem); line-height: 1.2; color: #333333; margin-bottom: 12px;
        }

        .bj-inv-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 0;
          border: 1.5px solid rgba(51,51,51,0.1); background: transparent;
          margin-bottom: 48px; max-width: 650px;
        }
        .bj-inv-col { padding: 32px 40px; }
        .bj-inv-col:first-child { border-right: 1.5px solid rgba(51,51,51,0.1); }
        .bj-inv-col-title {
          font-family: 'Lato', sans-serif; font-size: 14px; font-weight: 400;
          letter-spacing: 0.1em; color: #333333; opacity: 0.6; margin-bottom: 16px;
        }
        .bj-inv-label { font-family: 'Lato', sans-serif; font-size: 14px; color: #333333; opacity: 0.6; margin-bottom: 4px; }
        .bj-inv-price { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 700; color: #333333; }
        .bj-inv-price span { font-size: 0.85rem; font-weight: 400; }
        .bj-inv-price-row { margin-bottom: 8px; }
        .bj-inv-price-row:last-child { margin-bottom: 0; }

        .bj-section-subtitle {
          font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 700;
          color: #333333; margin: 48px 0 28px;
        }
        .bj-icon-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 32px 24px; margin-bottom: 48px;
        }
        .bj-icon-item { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 12px; }
        .bj-icon-item img { width: 36px; height: 36px; opacity: 0.7; }
        .bj-icon-label {
          font-family: 'Lato', sans-serif; font-size: 13px;
          line-height: 1.5; color: #333333; text-align: center;
        }

        .bj-cancel { max-width: 640px; }
        .bj-cancel h3 {
          font-family: 'Playfair Display', serif; font-weight: 700;
          font-size: 1.6rem; color: #333333; margin-bottom: 20px;
        }
        .bj-cancel p { font-family: 'Lato', sans-serif; font-size: 15px; line-height: 1.8; color: #333333; }

        /* ══ CTA ══ */
        .bj-cta {
          background: #F5F0EB; padding: 100px 80px 0;
          text-align: center; display: flex; flex-direction: column; align-items: center;
          position: relative; overflow: hidden;
        }
        .bj-cta > .bfu {
          width: 100%; display: flex; flex-direction: column; align-items: center;
        }
        .bj-cta-circle {
          position: absolute; border-radius: 50%; pointer-events: none;
        }
        .bj-cta-circle--pink-lg {
          width: clamp(180px, 30vw, 300px); height: clamp(180px, 30vw, 300px);
          top: -40px; right: -30px;
          background: radial-gradient(circle, rgba(195,140,140,0.25) 0%, rgba(195,140,140,0.08) 60%, transparent 80%);
          border: 2px solid rgba(195,140,140,0.18);
        }
        .bj-cta-circle--pink-sm {
          width: clamp(100px, 18vw, 180px); height: clamp(100px, 18vw, 180px);
          top: clamp(20px, 5vw, 60px); right: clamp(60px, 12vw, 160px);
          background: radial-gradient(circle, rgba(180,120,130,0.18) 0%, rgba(180,120,130,0.05) 60%, transparent 80%);
          border: 2px solid rgba(180,120,130,0.15);
        }
        .bj-cta-circle--sage-lg {
          width: clamp(140px, 22vw, 220px); height: clamp(140px, 22vw, 220px);
          top: 10px; left: -40px;
          background: radial-gradient(circle, rgba(140,170,140,0.2) 0%, rgba(140,170,140,0.06) 60%, transparent 80%);
          border: 2px solid rgba(140,170,140,0.15);
        }
        .bj-cta-circle--sage-sm {
          width: clamp(80px, 14vw, 140px); height: clamp(80px, 14vw, 140px);
          bottom: 120px; right: 40px;
          background: radial-gradient(circle, rgba(140,170,140,0.15) 0%, rgba(140,170,140,0.04) 60%, transparent 80%);
          border: 2px solid rgba(140,170,140,0.12);
        }
        .bj-cta-leaf {
          position: absolute; pointer-events: none; opacity: 0.25;
        }
        .bj-cta-leaf--left { top: 50%; left: 20px; transform: translateY(-50%); }
        .bj-cta-leaf--right { bottom: 140px; right: 24px; }
        .bj-cta-heading {
          font-family: 'Playfair Display', serif; font-weight: 700;
          font-size: clamp(2.4rem, 4.5vw, 3.8rem);
          color: #333333; margin-bottom: 40px; line-height: 1.25; max-width: 500px;
        }
        .bj-cta-wa {
          display: inline-flex; align-items: center; gap: 14px;
          font-family: 'Lato', sans-serif; font-size: 16px; font-weight: 400;
          color: #333333; text-decoration: none; margin-bottom: 48px;
          padding: 16px 32px; border: 1px solid rgba(51,51,51,0.15); border-radius: 4px;
          transition: border-color 0.3s, background 0.3s;
        }
        .bj-cta-wa:hover { border-color: #D9A6A1; background: rgba(217,166,161,0.08); }
        .bj-cta-wa img { width: 24px; height: 24px; opacity: 0.7; }
        .bj-cta-wa-text { display: flex; flex-direction: column; align-items: flex-start; font-size: 14px; line-height: 1.5; }
        .bj-cta-wa-text strong { font-size: 16px; font-weight: 700; letter-spacing: 0.02em; }
        .bj-cta-date-bar {
          background: #D9A6A1; padding: 28px 32px; border-radius: 0;
          display: flex; align-items: center; justify-content: space-between; gap: 16px;
          align-self: stretch; margin: 0 -80px; box-sizing: border-box;
        }
        .bj-cta-date-label {
          font-family: 'Lato', sans-serif; font-size: 14px; color: rgba(255,255,255,0.75);
          letter-spacing: 0.12em; margin-bottom: 6px;
        }
        .bj-cta-date-val {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          font-family: 'Playfair Display', serif; color: white;
        }
        .bj-cta-date-part { font-size: 1.1rem; font-weight: 400; }
        .bj-cta-date-big { font-size: 2.2rem; font-weight: 700; line-height: 1; }
        .bj-cta-date-big sup { font-size: 0.5em; vertical-align: super; }
        .bj-cta-date-sep { font-size: 1.4rem; opacity: 0.5; font-weight: 300; }

        /* ══ FINAL QUOTE STRIP ══ */
        .bj-final {
          position: relative; min-height: 50vh;
          display: flex; align-items: center; justify-content: center; overflow: hidden;
        }
        .bj-final-bg {
          position: absolute; inset: 0;
          background: url('/assets/hero-bhutan.jpg') center 30% / cover no-repeat;
        }
        .bj-final-bg::after { content: ''; position: absolute; inset: 0; background: rgba(0,0,0,0.10); }
        .bj-final-content {
          position: relative; z-index: 2; max-width: 260px; text-align: center;
          padding: 48px 40px; margin: 0 auto;
        }
        .bj-final-quote-frame {
          position: absolute; inset: -12px -16px -18px -16px;
          pointer-events: none; z-index: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .bj-final-quote-frame img { width: 100%; height: 100%; object-fit: fill; display: block; opacity: 0.85; }
        .bj-final-quote {
          font-family: 'Lora', serif; font-style: italic;
          font-size: 1.15rem; line-height: 1.5; color: #fff;
          text-shadow: 0 2px 12px rgba(0,0,0,0.4);
          position: relative; z-index: 1;
        }

        /* ══ RESPONSIVE ══ */
        @media (max-width: 900px) {
          .bj-invite { padding: 56px 36px 120px; }
          .bj-kelly-mountain-img { width: clamp(180px, 42vw, 320px); }
          .bj-itin { padding: 80px 0; }
          .bj-itin-header { padding: 0 40px; }
          .bj-day-head { padding: 28px 28px 20px; }
          .bj-day-body { padding: 28px 32px; }
          .bj-day-foot { padding: 20px 24px 0; }
          .bj-invest { padding: 80px 40px; }
          .bj-inv-grid { grid-template-columns: 1fr; }
          .bj-inv-col:first-child { border-right: none; border-bottom: 1.5px solid rgba(51,51,51,0.1); }
          .bj-icon-grid { grid-template-columns: repeat(2, 1fr); }
          .bj-cta { padding: 80px 40px 0; }
          .bj-cta-date-bar { margin: 0 -40px; }
          .bj-final { min-height: 40vh; }
          .bj-day-divider-mountain { height: clamp(56px, 10vw, 80px); }
          .bj-farewell-card { padding: 28px 24px; }
        }
        @media (max-width: 600px) {
          .bj-hero-logo { width: 120px; margin-bottom: 48px; }
          .bj-invite { padding: 48px 24px 120px; }
          .bj-kelly-mountain-img { width: clamp(160px, 46vw, 240px); }
          .bj-itin { padding: 60px 0; }
          .bj-itin-header { padding: 0 24px; }
          .bj-day-head { padding: 24px 20px 16px; }
          .bj-day-body { padding: 24px 20px; }
          .bj-day-foot { padding: 16px 20px 0; }
          .bj-invest { padding: 60px 24px; }
          .bj-inv-col { padding: 24px 20px; }
          .bj-icon-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
          .bj-cta { padding: 60px 24px 0; }
          .bj-cta-date-bar { margin: 0 -24px; }
          .bj-final-content { padding: 32px 24px; }
          .bj-farewell-card { padding: 28px 20px; }
        }
      `}</style>

      {/* Uses global .pv-progress — no local redefinition */}
      <div className="pv-progress" style={{ width: `${progress}%` }} aria-hidden="true" />

      <Nav />
      <WhatsAppButton />

      {/* ══ 1. HERO ══ */}
      <section className="bj-hero">
        <div className="bj-hero-bg" />
        <div className="bj-hero-content">
          <img src="/assets/01. LOGOS/Logo-Main-White.png" alt="PuraVida with Harsha" className="bj-hero-logo" />
          <h1 className="bj-hero-title">Bhutan</h1>
          <p className="bj-hero-dates">April 9 to 16, 2026</p>
          <p className="bj-hero-tagline">Where stillness finds you</p>
        </div>
        <span className="bj-hero-credit">Photo: Kelly Dorji</span>
      </section>

      {/* ══ 2. INVITATION FROM HARSHA ══ */}
      <section className="bj-invite">
        <FU>
          <div className="bj-invite-top">
            <div className="bj-invite-photo-wrap">
              <img src="/assets/Puravida_Photo-Frame-2-Harsha.png" alt="Harsha" className="bj-invite-photo" />
            </div>
            <div className="bj-invite-heading-area">
              <img src="/assets/05. GRAPHIC ELEMENTS/Dividers/Divider - Center.png" alt="" aria-hidden="true" className="bj-invite-divider" />
              <h2 className="bj-invite-heading">
                <span>An</span>
                <span>Invitation</span>
                <span className="bj-from">from</span>
                <span>Harsha</span>
              </h2>
              <img src="/assets/05. GRAPHIC ELEMENTS/Dividers/Divider - Center.png" alt="" aria-hidden="true" className="bj-invite-divider" />
            </div>
          </div>
        </FU>
        <FU d={1}>
          <p className="bj-invite-body">
            Bhutan holds a kind of quiet that stays with you long after you return.
            It asks you to slow down, breathe deeper, and notice the gentle details
            of life that cities often blur.
          </p>
          <p className="bj-invite-body">
            This journey is crafted for those who want more than travel. It is for
            those who want presence, connection, and the kind of beauty you feel in
            your heart. We move slowly. We listen. We walk with people who carry the
            land in their stories. If this calls to you, I would love for you to join me in Bhutan.
          </p>
        </FU>
        <div className="bj-invite-trees">
          <Glyph name="Trees" variant="White" size={160} opacity={0.85} />
        </div>
      </section>

      {/* ══ 3. WALK BHUTAN WITH KELLY DORJI ══ */}
      <section className="bj-kelly">
        <FU>
          <div className="bj-kelly-column">
            <div className="bj-kelly-photo-wrap">
              <img src="/assets/kelly-dorji.jpg" alt="Kelly Dorji" className="bj-kelly-photo" />
              <img src="/assets/Puravida_Photo-Frame-1-Juma.png" alt="" aria-hidden="true" className="bj-kelly-frame" />
            </div>
            <div className="bj-kelly-head">
              <div className="bj-kelly-rule bj-kelly-rule--above">
                <img src="/assets/05. GRAPHIC ELEMENTS/Dividers/Divider - Center.png" alt="" aria-hidden="true" />
              </div>
              <h2>Walk Bhutan<br />with Kelly Dorji</h2>
              <p className="bj-kelly-subtitle">Your cultural bridge.</p>
            </div>
            <div className="bj-kelly-body-wrap">
              <div className="bj-kelly-rule bj-kelly-rule--below">
                <img src="/assets/05. GRAPHIC ELEMENTS/Dividers/Divider - Center.png" alt="" aria-hidden="true" />
              </div>
              <p className="bj-kelly-body">
                Kelly is one of Bhutan's most respected cultural custodians, rooted in
                Himalayan heritage, art, and spirituality. He brings depth, humour, and a lived
                understanding of the land that few possess. Walking Bhutan with him feels like being
                guided by someone who sees both the visible and the unseen. His presence is an experience in itself.
              </p>
            </div>
          </div>
        </FU>
        <div className="bj-kelly-mountains">
          <div className="bj-kelly-mountain-side">
            <img src={encodeURI('/assets/05. GRAPHIC ELEMENTS/Glyphs/Charcoal/Mountains/Mountains.png')} alt="" aria-hidden="true" className="bj-kelly-mountain-img" />
          </div>
          <div className="bj-kelly-mountain-side bj-kelly-mountain-right">
            <img src={encodeURI('/assets/05. GRAPHIC ELEMENTS/Glyphs/Charcoal/Mountains/Mountains.png')} alt="" aria-hidden="true" className="bj-kelly-mountain-img" />
          </div>
        </div>
      </section>

      {/* ══ 4. DAY-BY-DAY ITINERARY ══ */}
      <section className="bj-itin" id="itinerary">
        <div className="bj-itin-header">
          <FU>
            <Divider width={180} opacity={0.4} />
            <h2 style={{ marginTop: 32 }}>Your Journey, Day by Day</h2>
            <p>Eight days of stillness, culture, and connection across the heart of Bhutan.</p>
          </FU>
        </div>

        {DAYS.map((day, di) => (
          <FU key={day.num} d={di * 0.2}>
            <div className="bj-day">
              <div className="bj-day-head">
                <div className="bj-day-head-glyph">
                  <Glyph name="Mountains" variant="Charcoal" size={56} opacity={0.12} />
                </div>
                {/* DAY- format matches the PDF exactly */}
                <p className="bj-day-label">DAY- <span className="bj-day-label-num">{day.num}</span></p>
                <h3 className="bj-day-title">{day.title}</h3>
                {day.travel && <p className="bj-day-travel">{day.travel}</p>}
                <div className="bj-day-divider-row">
                  <img src="/assets/05. GRAPHIC ELEMENTS/Dividers/Divider - Center.png" alt="" aria-hidden="true" className="bj-day-divider-line" />
                  <img src="/assets/05. GRAPHIC ELEMENTS/Glyphs/Charcoal/Mountains/Mountains.png" alt="" aria-hidden="true" className="bj-day-divider-mountain" />
                </div>
              </div>

              <div className="bj-day-body">
                <div className="bj-day-card">
                  <div className="bj-day-card-frame"><img src="/assets/Frame.png" alt="" aria-hidden="true" /></div>
                  {day.periods.map((period, pi) => (
                    <div key={period.label} style={{ position: 'relative', zIndex: 2 }}>
                      {pi > 0 && (
                        <div className="bj-period-divider"><Divider width={160} opacity={0.35} /></div>
                      )}
                      <div className="bj-period">
                        <p className="bj-period-label">{period.label}</p>
                        {period.items.map((act, ai) => (
                          <div className="bj-activity" key={ai}>
                            <DayIcon type={act.icon} />
                            <span className="bj-activity-text">{act.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="bj-day-body-pause">
                    <Glyph name="Pause" variant="Charcoal" size={48} opacity={0.15} />
                  </div>
                </div>
              </div>

              {day.farewell ? (
                <>
                <div className="bj-farewell-wrap">
                  <div className="bj-farewell-card">
                    <div className="bj-farewell-frame">
                      <img src="/assets/Puravida_Quote-Frame-2-20260405T104951Z-3-001/Puravida_Quote-Frame-2/Frame.png" alt="" aria-hidden="true" />
                    </div>
                    <p className="bj-farewell-text">{day.farewell}</p>
                  </div>
                  <div className="bj-farewell-deco">
                    <Glyph name="Mountains" variant="Charcoal" size={60} opacity={0.25} />
                    <Glyph name="Sunset" variant="Charcoal" size={68} opacity={0.3} />
                    <Glyph name="Mountains" variant="Charcoal" size={52} opacity={0.22} />
                  </div>
                </div>
                </>
              ) : (
                <div className="bj-day-foot">
                  <div className="bj-overnight-content">
                    <Glyph name="Trees" variant="Charcoal" size={48} opacity={0.4} />
                    <span className="bj-day-foot-text">Overnight in {day.city} &ndash; {day.hotel}</span>
                    <Glyph name="Trees" variant="Charcoal" size={48} opacity={0.4} />
                  </div>
                  <img src="/assets/05. GRAPHIC ELEMENTS/Dividers/Divider - Center.png" className="bj-overnight-divider-line" alt="" aria-hidden="true" />
                </div>
              )}
            </div>
          </FU>
        ))}
      </section>

      {/* ══ 5. INVESTMENT ══ */}
      <section className="bj-invest" id="investment">
        <FU>
          <h2 className="bj-inv-title">Your Investment</h2>
          <div className="bj-day-divider-row">
            <img
              src="/assets/05. GRAPHIC ELEMENTS/Dividers/Divider - Center.png"
              alt="" aria-hidden="true"
              className="bj-day-divider-line"
            />
            <img
              src="/assets/05. GRAPHIC ELEMENTS/Glyphs/Charcoal/Trees/Trees.png"
              alt="" aria-hidden="true"
              className="bj-day-divider-mountain"
              style={{ height: 'clamp(40px, 6vw, 56px)' }}
            />
          </div>

          <div className="bj-inv-grid" style={{ marginTop: 24 }}>
            <div className="bj-inv-col">
              <p className="bj-inv-col-title">Indian Passport Holders</p>
              <Divider width={180} opacity={0.3} />
              <div style={{ marginTop: 16 }}>
                <div className="bj-inv-price-row">
                  <p className="bj-inv-label">Solo Traveler</p>
                  <p className="bj-inv-price">AED 13,350</p>
                </div>
                <div className="bj-inv-price-row" style={{ marginTop: 16 }}>
                  <p className="bj-inv-label">Double Occupancy</p>
                  <p className="bj-inv-price">AED 12,100 <span>pp</span></p>
                </div>
              </div>
            </div>
            <div className="bj-inv-col">
              <p className="bj-inv-col-title">Other Nationalities</p>
              <Divider width={180} opacity={0.3} />
              <div style={{ marginTop: 16 }}>
                <div className="bj-inv-price-row">
                  <p className="bj-inv-label">Solo Traveler</p>
                  <p className="bj-inv-price">AED 20,500</p>
                </div>
                <div className="bj-inv-price-row" style={{ marginTop: 16 }}>
                  <p className="bj-inv-label">Double Occupancy</p>
                  <p className="bj-inv-price">AED 18,500 <span>pp</span></p>
                </div>
              </div>
            </div>
          </div>

          <div className="bj-cancel" style={{ marginTop: 48 }}>
            <h3>Cancellations</h3>
            <p>Payments are refundable up to 4 weeks before departure. Modest deductions may apply when third-party bookings or deposits have been committed.</p>
          </div>

          <div className="bj-day-divider-row" style={{ marginTop: 48 }}>
            <img
              src="/assets/05. GRAPHIC ELEMENTS/Dividers/Divider - Center.png"
              alt="" aria-hidden="true"
              className="bj-day-divider-line"
            />
          </div>

          <h3 className="bj-section-subtitle">Inclusions</h3>
          <div className="bj-icon-grid">
            {INCLUSIONS.map((item, i) => (
              <div className="bj-icon-item" key={i}>
                <DayIcon type={item.icon} />
                <p className="bj-icon-label">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="bj-day-divider-row">
            <img
              src="/assets/05. GRAPHIC ELEMENTS/Dividers/Divider - Center.png"
              alt="" aria-hidden="true"
              className="bj-day-divider-line"
            />
          </div>

          <h3 className="bj-section-subtitle">Exclusions</h3>
          <div className="bj-icon-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {EXCLUSIONS.map((item, i) => (
              <div className="bj-icon-item" key={i}>
                <DayIcon type={item.icon} />
                <p className="bj-icon-label">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="bj-day-divider-row">
            <img
              src="/assets/05. GRAPHIC ELEMENTS/Dividers/Divider - Center.png"
              alt="" aria-hidden="true"
              className="bj-day-divider-line"
            />
          </div>
        </FU>
      </section>

      {/* ══ 6. CTA ══ */}
      <section className="bj-cta">
        <div className="bj-cta-circle bj-cta-circle--pink-lg" />
        <div className="bj-cta-circle bj-cta-circle--pink-sm" />
        <div className="bj-cta-circle bj-cta-circle--sage-lg" />
        <div className="bj-cta-circle bj-cta-circle--sage-sm" />
        <div className="bj-cta-leaf bj-cta-leaf--left"><Glyph name="Trees" variant="Sage" size={32} opacity={1} /></div>
        <div className="bj-cta-leaf bj-cta-leaf--right"><Glyph name="Trees" variant="Sage" size={28} opacity={1} /></div>
        <FU>
          <h2 className="bj-cta-heading">Your Journey Begins<br />with a Message</h2>
          <a href="https://wa.me/+971562216643?text=Hello%20Harsha%2C%20I%20am%20interested%20in%20the%20Bhutan%20journey%20and%20would%20love%20to%20learn%20more." className="bj-cta-wa" target="_blank" rel="noopener noreferrer">
            <img src="/assets/04. ICONS/PNG/Charcoal/48px/Whatsapp  - 48px.png" alt="" />
            <div className="bj-cta-wa-text">
              <strong>WhatsApp Harsha</strong>
              +971 56 2216643
            </div>
          </a>
          <div className="bj-cta-date-bar">
            <Glyph name="Trees" variant="White" size={48} opacity={0.6} />
            <div style={{ textAlign: 'center' }}>
              <p className="bj-cta-date-label">Join us by</p>
              <div className="bj-cta-date-val">
                <span className="bj-cta-date-part">March</span>
                <span className="bj-cta-date-sep">|</span>
                <span className="bj-cta-date-big">01<sup>st</sup></span>
                <span className="bj-cta-date-sep">|</span>
                <span className="bj-cta-date-part">2026</span>
              </div>
            </div>
            <Glyph name="Trees" variant="White" size={48} opacity={0.6} />
          </div>
        </FU>
      </section>

      {/* ══ 7. FINAL QUOTE STRIP ══ */}
      <section className="bj-final">
        <div className="bj-final-bg" />
        <FU>
          <div className="bj-final-content">
            <div className="bj-final-quote-frame">
              <img src="/assets/Puravida_Quote-Frame-1/Frame.png" alt="" aria-hidden="true" />
            </div>
            <p className="bj-final-quote">{"\u201C"}If Bhutan is calling, this is your moment to answer.{"\u201D"}</p>
          </div>
        </FU>
      </section>

      <Footer />
    </>
  );
}