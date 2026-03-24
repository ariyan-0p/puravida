import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
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
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
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

function LeafDivider({ color = '#2B2B2B', width = '100%' }) {
  return (
    <svg viewBox="0 0 600 20" style={{ width, height: '20px', display: 'block', margin: '0 auto' }} xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke={color} strokeWidth="1.2" opacity="0.5">
        <path d="M20,10 L270,10" />
        <path d="M330,10 L580,10" />
        <path d="M275,10 c0,-6 5,-10 10,-10 c-6,0 -10,5 -10,10 c0,6 5,10 10,10 c-6,0 -10,-5 -10,-10z" fill={color} opacity="0.3" />
        <path d="M315,10 c0,-6 5,-10 10,-10 c-6,0 -10,5 -10,10 c0,6 5,10 10,10 c-6,0 -10,-5 -10,-10z" fill={color} opacity="0.3" />
        <path d="M295,3 L295,17" />
        <path d="M300,1 L300,19" />
        <path d="M305,3 L305,17" />
      </g>
    </svg>
  );
}

function MountainGlyph({ size = 80 }) {
  return (
    <svg viewBox="0 0 120 60" style={{ width: size, height: size * 0.5 }} xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="#2B2B2B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.35">
        <path d="M20,55 L45,20 L55,32 L70,10 L85,32 L95,22 L110,55" />
        <path d="M55,32 L60,28 L65,32" />
        <path d="M10,55 L110,55" />
      </g>
    </svg>
  );
}

function TreeGlyph({ size = 40, color = '#2B2B2B' }) {
  return (
    <svg viewBox="0 0 30 50" style={{ width: size * 0.6, height: size }} xmlns="http://www.w3.org/2000/svg">
      <g fill={color} opacity="0.4">
        <polygon points="15,2 8,18 22,18" />
        <polygon points="15,10 6,28 24,28" />
        <polygon points="15,20 4,40 26,40" />
        <rect x="13" y="40" width="4" height="8" />
      </g>
    </svg>
  );
}

function CompassGlyph({ size = 48 }) {
  return (
    <svg viewBox="0 0 50 50" style={{ width: size, height: size }} xmlns="http://www.w3.org/2000/svg">
      <circle cx="25" cy="25" r="20" fill="none" stroke="#2B2B2B" strokeWidth="1" opacity="0.15" />
      <circle cx="25" cy="25" r="14" fill="none" stroke="#2B2B2B" strokeWidth="0.5" opacity="0.1" />
      <line x1="25" y1="5" x2="25" y2="12" stroke="#2B2B2B" strokeWidth="0.8" opacity="0.15" />
      <line x1="25" y1="38" x2="25" y2="45" stroke="#2B2B2B" strokeWidth="0.8" opacity="0.15" />
    </svg>
  );
}

function IconMeal() {
  return <span className="lk-day-icon"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#2B2B2B" strokeWidth="1.5" strokeLinecap="round"><path d="M4,18 Q12,14 20,18" /><path d="M8,14 Q12,10 16,14" /><path d="M10,10 Q12,7 14,10" /></svg></span>;
}
function IconTransport() {
  return <span className="lk-day-icon"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#2B2B2B" strokeWidth="1.5" strokeLinecap="round"><path d="M4,16 C4,16 6,8 12,8 C18,8 20,16 20,16" /><circle cx="8" cy="18" r="2" /><circle cx="16" cy="18" r="2" /></svg></span>;
}
function IconSight() {
  return <span className="lk-day-icon"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#2B2B2B" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="3" /><path d="M2,12 C2,12 6,5 12,5 C18,5 22,12 22,12 C22,12 18,19 12,19 C6,19 2,12 2,12Z" /></svg></span>;
}
function IconHotel() {
  return <span className="lk-day-icon"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#2B2B2B" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="8" width="18" height="12" rx="1" /><path d="M3,14 L21,14" /><path d="M8,8 L8,4 L16,4 L16,8" /></svg></span>;
}
function IconLeisure() {
  return <span className="lk-day-icon"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#2B2B2B" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M12,3 L12,12 L18,12" /></svg></span>;
}
function IconCulture() {
  return <span className="lk-day-icon"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#2B2B2B" strokeWidth="1.5" strokeLinecap="round"><path d="M12,2 L12,6" /><circle cx="12" cy="10" r="4" /><path d="M4,22 C4,17 8,14 12,14 C16,14 20,17 20,22" /></svg></span>;
}

const ICON_MAP = { meal: IconMeal, transport: IconTransport, sight: IconSight, hotel: IconHotel, leisure: IconLeisure, culture: IconCulture };

function DayActivity({ icon, text, sub }) {
  const Ico = ICON_MAP[icon] || IconSight;
  return (
    <div className="lk-activity">
      <Ico />
      <div>
        <p className="lk-activity-text">{text}</p>
        {sub && <p className="lk-activity-sub">{sub}</p>}
      </div>
    </div>
  );
}

const DAYS = [
  {
    day: "01",
    title: "Arrival in Leh",
    subtitle: "",
    morning: [
      { icon: 'sight', text: "Arrival at Leh Airport", sub: "Altitude: 3000m" },
      { icon: 'transport', text: "Private transfer to your hotel", sub: "Approx. 10 minutes" },
      { icon: 'hotel', text: "Check-in and time to settle into your room overlooking the Himalayan landscape" },
      { icon: 'hotel', text: "Rest is essential today to adapt to the altitude" },
    ],
    afternoon: [
      { icon: 'meal', text: "Light lunch at the hotel" },
      { icon: 'leisure', text: "Time at leisure for relaxation" },
    ],
    evening: [
      { icon: 'leisure', text: "Optional slow walk within the property grounds" },
      { icon: 'meal', text: "Early dinner featuring warm, easily digestible Ladakhi-inspired cuisine" },
      { icon: 'leisure', text: "Herbal infusions beneath a starlit Himalayan sky" },
    ],
    overnight: "Overnight in Leh",
    hotel: "Dolkhar Resort"
  },
  {
    day: "02",
    title: "Leh | Monastic Calm",
    subtitle: "& Old Town Heritage",
    morning: [
      { icon: 'sight', text: "Visit to Shanti Stupa: Perched above Leh, the Stupa offers uninterrupted valley views and a moment of stillness as the mountains awaken with first light", sub: "Inside the prayer hall, you may observe monks offering chants. The soft hum of Buddhist mantras, the scent of incense, and the gentle turning of prayer wheels create a deeply serene atmosphere" },
      { icon: 'meal', text: "Return for Breakfast" },
    ],
    afternoon: [
      { icon: 'sight', text: "Visit to Leh Palace overlooking the old town" },
      { icon: 'transport', text: "Walk through Leh Old Town: narrow lanes, mud-brick homes, carved balconies, fluttering prayer flags", sub: "Observe the coexistence of mosque, temples, chortens, and family shrines" },
      { icon: 'leisure', text: "Browse artisan studios and rooftop caf\u00e9s serving local teas", sub: "Leh Old Town reveals the city\u2019s original rhythm: intimate, layered, and still lived in, far removed from the pace of the modern market streets" },
    ],
    evening: [
      { icon: 'meal', text: "Dinner at Bon App\u00e9tit: a popular locally owned restaurant offering indoor and open-air seating with mountain views" },
    ],
    overnight: "Overnight in Leh",
    hotel: "Dolkhar Resort"
  },
  {
    day: "03",
    title: "Sham Valley |",
    subtitle: "Alchi & Uleytokpo",
    morning: [
      { icon: 'meal', text: "Breakfast at Dolkhar Resort" },
      { icon: 'transport', text: "Drive from Leh to Alchi", sub: "Distance: approx. 70 km | Travel time: 1.5 to 2 hours. A scenic drive along the Indus River with relaxed pauses for photography" },
      { icon: 'sight', text: "Visit to Alchi Monastery", sub: "Set at river level and woven into village life, Alchi offers a quieter and more contemplative expression of Himalayan Buddhism. It is renowned for its finely preserved Kashmiri-influenced murals" },
    ],
    afternoon: [
      { icon: 'meal', text: "Lunch at Alchi Kitchen" },
      { icon: 'transport', text: "Drive From Alchi to Uleytokpo", sub: "Distance: approx. 10-12 km | Travel time: 20-30 minutes" },
    ],
    evening: [
      { icon: 'hotel', text: "Stay at Uley Ethnic Resort", sub: "A peaceful riverside retreat surrounded by apricot gardens and views of the Indus" },
      { icon: 'meal', text: "Dinner at the resort" },
    ],
    overnight: "Overnight in Uley",
    hotel: "Uley Ethnic Resort"
  },
  {
    day: "04",
    title: "Lamayuru & Temisgam | Ancient",
    subtitle: "Landscapes & Living Medicine",
    morning: [
      { icon: 'meal', text: "Breakfast in Uleytokpo" },
      { icon: 'transport', text: "Drive from Uleytokpo to Lamayuru Monastery", sub: "Distance: approx. 55-60 km | Travel time: 1:15-1:30 minutes. One of the oldest monasteries in Ladakh, dramatically perched on a rocky hill. Founded in the 11th century, it belongs to the Drikung Kagyu lineage of Tibetan Buddhism. Below the monastery lies the famous Moonland landscape: surreal, eroded clay formations resembling the lunar surface" },
    ],
    afternoon: [
      { icon: 'transport', text: "Drive from Lamayuru to Nurla", sub: "Distance: approx. 45-50 km | Travel time: 50 minutes" },
      { icon: 'culture', text: "Special Cultural Interaction: Amchi Medicine (Sowa Rigpa)", sub: "Participate in an interactive session on Himalayan Amchi medicine: Sowa Rigpa, the traditional Tibetan healing system. Discussion themes may include the philosophy of Sowa Rigpa, the balance of the three humors (Lung, Tripa, Beken), Himalayan medicinal herbs, pulse diagnosis, and traditional healing methods and lifestyle practices. A rare opportunity to understand Ladakh\u2019s ancient healing traditions from a practicing Amchi" },
      { icon: 'meal', text: "Lunch with Amchi in Nurla", sub: "Continue to Temisgam / Namra village" },
    ],
    evening: [
      { icon: 'transport', text: "Drive from Nurla to Temisgam", sub: "Distance: approx. 15-20 km | Travel time: 20-30 minutes" },
      { icon: 'hotel', text: "Stay at TIH Namra Village House" },
      { icon: 'culture', text: "Evening Experience", sub: "Hands-on Ladakhi cooking using seasonal produce. Butter tea or herbal tea shared with a local family" },
      { icon: 'meal', text: "Dinner at Namra Village" },
    ],
    overnight: "Overnight in Temisgam",
    hotel: "TIH Namra Village"
  },
  {
    day: "05",
    title: "Temisgam to Thiksey |",
    subtitle: "Village Life & Monastic Views",
    morning: [
      { icon: 'meal', text: "Breakfast at Temisgam" },
      { icon: 'transport', text: "Drive from Temisgam to Thiksey", sub: "Distance: approx. 95 km | Travel time: 2.5 to 3 hours" },
    ],
    afternoon: [
      { icon: 'meal', text: "Lunch in Thiksey village" },
      { icon: 'sight', text: "Thiksey Village Life", sub: "Life here unfolds without urgency, shaped by land, lineage, and ritual" },
    ],
    evening: [
      { icon: 'leisure', text: "Unstructured time for rest or quiet walks" },
      { icon: 'meal', text: "Early dinner at Dakpa House featuring home-grown organic produce" },
    ],
    overnight: "Overnight in Thiksey",
    hotel: "Dakpa House"
  },
  {
    day: "06",
    title: "Thiksey & Hemis |",
    subtitle: "Living Monastic Traditions",
    morning: [
      { icon: 'sight', text: "Morning prayers at Thiksey Monastery", sub: "The early morning atmosphere is peaceful and powerful, offering a rare glimpse into authentic monastic life" },
      { icon: 'meal', text: "Return to Dakpa House for breakfast" },
      { icon: 'transport', text: "After check-out, drive to Hemis Monastery: the largest monastery in Ladakh", sub: "The visit focuses on observing daily rituals, architecture, and silence rather than simply moving through it as a landmark" },
    ],
    afternoon: [
      { icon: 'meal', text: "Lunch at Tesma Multi-Cuisine, Thiksey" },
    ],
    evening: [
      { icon: 'meal', text: "Dinner at Ladakh Sarai" },
    ],
    overnight: "Overnight in Saboo",
    hotel: "Ladakh Sarai"
  },
  {
    day: "07",
    title: "Shey, Stok &",
    subtitle: "Leisure in Leh",
    morning: [
      { icon: 'meal', text: "After breakfast, explore Ladakh\u2019s royal heritage." },
      { icon: 'sight', text: "Visit to Shey Palace", sub: "Former summer capital of Ladakh\u2019s royal family (17th century), overlooking the Indus Valley. Highlights: 12-metre copper-gilded statue of Shakyamuni Buddha, ancient murals, peaceful chortens and prayer flags" },
      { icon: 'sight', text: "Visit to Stok Palace", sub: "Current residence of the Ladakhi royal family, partly converted into a heritage museum. Highlights: Traditional royal architecture, views of the Stok Kangri range, museum showcasing Ladakh\u2019s monarchy and cultural legacy" },
    ],
    afternoon: [
      { icon: 'meal', text: "Lunch at Ladakh Sarai" },
    ],
    evening: [
      { icon: 'meal', text: "Dinner at Chopsticks: a well-known local favourite." },
    ],
    overnight: "Overnight in Saboo",
    hotel: "Ladakh Sarai"
  },
  {
    day: "08",
    title: "Departure",
    subtitle: "",
    morning: [
      { icon: 'transport', text: "Private transfer to Leh Airport" },
      { icon: 'sight', text: "Flight onward to Delhi" },
    ],
    afternoon: [],
    evening: [],
    overnight: null,
    hotel: null,
    farewell: "Juley Juley: until we meet again in the land of high passes"
  },
];

export default function LadakhJourney() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fn = () => setProgress((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <style>{`
        .pfu { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .pfu.pin { opacity: 1; transform: translateY(0); }

        /* ── HERO: Ladakh PDF page 1 — deep blue tones ── */
        .lk-hero {
          min-height: 100vh; position: relative; overflow: hidden;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center;
        }
        .lk-hero-bg {
          position: absolute; inset: 0;
          background: url('/assets/hero-ladakh.jpg') center center / cover no-repeat,
            linear-gradient(158deg, #1a4060 0%, #0e2a40 40%, #061420 100%);
        }
        .lk-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom,
            rgba(0,0,0,0.10) 0%,
            rgba(0,0,0,0.02) 35%,
            rgba(0,0,0,0.15) 70%,
            rgba(0,0,0,0.50) 100%);
        }
        .lk-hero-logo {
          position: absolute; top: 100px; left: 50%; z-index: 3;
          transform: translateX(-50%);
          height: 80px; width: auto;
          filter: brightness(0) invert(1);
        }
        .lk-hero-content { position: relative; z-index: 2; max-width: 700px; padding: 0 40px; }
        .lk-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 600; font-size: clamp(5rem, 14vw, 10rem);
          color: white; line-height: 0.9; margin-bottom: 60px;
          text-shadow: 0 4px 40px rgba(0,0,0,0.3);
        }
        .lk-hero-dates {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.2rem, 2.5vw, 1.8rem); font-weight: 400;
          color: rgba(255,255,255,0.85); letter-spacing: 0.08em;
        }

        /* ── INVITE: Sage bg, same as Bhutan ── */
        .lk-invite {
          background: #DDE5DF; padding: 100px 80px;
          display: grid; grid-template-columns: 0.8fr 1fr;
          gap: 80px; align-items: center;
        }
        .lk-invite-photo { position: relative; }
        .lk-invite-photo img {
          width: 100%; max-width: 340px; display: block;
          border-radius: 12px 12px 12px 0;
          box-shadow: 0 16px 48px rgba(0,0,0,0.12);
        }
        .lk-invite-photo::before {
          content: ''; position: absolute; top: -8px; left: -8px; right: 8px; bottom: 8px;
          border: 1.5px solid rgba(43,43,43,0.12); border-radius: 14px 14px 14px 0;
          pointer-events: none;
        }
        .lk-invite-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.4rem, 4vw, 3.8rem); font-weight: 600;
          font-style: italic; color: #2B2B2B;
          line-height: 1.15; margin-bottom: 40px;
        }
        .lk-invite-body {
          font-family: 'Lato', sans-serif;
          font-size: 16px; line-height: 1.75; color: #404040;
          margin-bottom: 16px; max-width: 520px;
        }
        .lk-invite-trees { display: flex; gap: 8px; margin-top: 40px; opacity: 0.3; }

        /* ── JUMA MALIK: Clay Rose bg ── */
        .lk-guide {
          background: #C9A8A8; padding: 100px 80px; text-align: center;
        }
        .lk-guide-photo {
          width: 260px; height: 260px; border-radius: 50%;
          object-fit: cover; display: block; margin: 0 auto 16px;
          border: 6px solid rgba(255,255,255,0.4);
          box-shadow: 0 12px 40px rgba(0,0,0,0.15);
        }
        .lk-guide-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 3.5vw, 3.2rem); font-weight: 600;
          color: #2B2B2B; line-height: 1.15; margin-bottom: 8px;
        }
        .lk-guide-subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-size: 1.1rem;
          color: #2B2B2B; margin-bottom: 32px;
        }
        .lk-guide-body {
          font-family: 'Lato', sans-serif;
          font-size: 16px; line-height: 1.75; color: #2B2B2B;
          max-width: 600px; margin: 0 auto; text-align: justify;
        }
        .lk-guide-body + .lk-guide-body { margin-top: 16px; }

        /* ── DAY CARDS: Same structure as Bhutan ── */
        .lk-day-header {
          background: #F2ECE5; padding: 60px 80px 32px; position: relative;
        }
        .lk-day-num {
          font-family: 'Lato', sans-serif; font-size: 14px; font-weight: 400;
          letter-spacing: 0.1em; text-transform: uppercase; color: #2B2B2B; margin-bottom: 4px;
        }
        .lk-day-num span { color: #C9A8A8; font-weight: 700; }
        .lk-day-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 700;
          color: #2B2B2B; line-height: 1.15; max-width: 550px;
        }
        .lk-day-mountain { position: absolute; top: 40px; right: 80px; }
        .lk-day-body { background: #F2ECE5; padding: 0 80px 60px; }
        .lk-day-card {
          background: #FAFAF8; border: 1.5px solid rgba(43,43,43,0.08);
          padding: 40px 48px; position: relative;
        }
        .lk-day-compass { position: absolute; bottom: 12px; right: 12px; opacity: 0.6; }
        .lk-time-section { margin-bottom: 32px; }
        .lk-time-section:last-child { margin-bottom: 0; }
        .lk-time-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem; font-weight: 400; color: #2B2B2B; margin-bottom: 20px;
        }
        .lk-activity { display: flex; gap: 14px; align-items: flex-start; margin-bottom: 16px; }
        .lk-activity:last-child { margin-bottom: 0; }
        .lk-day-icon {
          flex-shrink: 0; width: 28px; height: 28px;
          display: flex; align-items: center; justify-content: center;
          margin-top: 1px; opacity: 0.55;
        }
        .lk-activity-text {
          font-family: 'Lato', sans-serif;
          font-size: 16px; line-height: 1.65; color: #404040;
          word-break: normal; overflow-wrap: break-word;
        }
        .lk-activity-sub {
          font-family: 'Lato', sans-serif;
          font-size: 14px; font-style: italic; line-height: 1.6;
          color: #606060; margin-top: 4px;
        }
        .lk-time-divider { margin: 28px 0; }

        .lk-overnight {
          background: #DDE5DF; padding: 24px 80px;
          display: flex; align-items: center; justify-content: center; gap: 24px;
        }
        .lk-overnight-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem; font-weight: 600; color: #2B2B2B; text-align: center;
        }
        .lk-overnight-trees { display: flex; gap: 4px; }

        .lk-farewell {
          background: #F2ECE5; padding: 80px; text-align: center;
        }
        .lk-farewell-card {
          display: inline-block; background: #FAFAF8;
          border: 1.5px solid rgba(43,43,43,0.1); border-radius: 8px;
          padding: 40px 48px; max-width: 440px;
        }
        .lk-farewell-text {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-size: 1.6rem; color: #2B2B2B; line-height: 1.4;
        }

        /* ── INVESTMENT ── */
        .lk-investment { background: #F2ECE5; padding: 100px 80px; }
        .lk-inv-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 3vw, 2.8rem); font-weight: 400;
          color: #2B2B2B; margin-bottom: 40px;
        }
        .lk-inv-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 0; border: 1.5px solid rgba(43,43,43,0.1);
          background: #FAFAF8; margin-bottom: 48px; max-width: 600px;
        }
        .lk-inv-col { padding: 32px 40px; }
        .lk-inv-col:first-child { border-right: 1.5px solid rgba(43,43,43,0.1); }
        .lk-inv-col-title {
          font-family: 'Lato', sans-serif; font-size: 14px; font-weight: 400;
          letter-spacing: 0.1em; color: #606060; margin-bottom: 16px;
        }
        .lk-inv-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem; font-weight: 600; color: #2B2B2B;
        }
        .lk-inv-price span { font-size: 1rem; font-weight: 400; }
        .lk-inv-label {
          font-family: 'Lato', sans-serif; font-size: 14px; color: #606060; margin-bottom: 4px;
        }

        /* Important to Know */
        .lk-important {
          display: grid; grid-template-columns: 1fr 1fr; gap: 40px;
          margin-bottom: 48px; max-width: 700px;
        }
        .lk-important-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem; font-weight: 400; color: #2B2B2B;
          margin-bottom: 20px; grid-column: 1 / -1;
        }
        .lk-important-list {
          list-style: none; display: flex; flex-direction: column; gap: 10px;
        }
        .lk-important-list li {
          font-family: 'Lato', sans-serif; font-size: 14px; line-height: 1.65;
          color: #404040; padding-left: 16px; position: relative;
        }
        .lk-important-list li::before {
          content: '\u25E6'; position: absolute; left: 0; color: #606060;
        }

        .lk-inc-grid {
          display: grid; grid-template-columns: repeat(5, 1fr);
          gap: 24px; margin-bottom: 48px;
        }
        .lk-inc-item { text-align: center; }
        .lk-inc-label {
          font-family: 'Lato', sans-serif; font-size: 14px; color: #404040; line-height: 1.5;
        }

        /* ── CTA ── */
        .lk-cta {
          background: #F2ECE5; padding: 100px 80px; text-align: center;
          display: flex; flex-direction: column; align-items: center;
        }
        .lk-cta-logo { height: 80px; width: auto; margin-bottom: 48px; display: block; }
        .lk-cta-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.4rem, 4.5vw, 3.8rem);
          font-weight: 400; font-style: italic;
          color: #2B2B2B; margin-bottom: 40px; line-height: 1.25;
          max-width: 500px;
        }
        .lk-cta-wa {
          display: flex; align-items: center; gap: 14px;
          font-family: 'Lato', sans-serif; font-size: 16px; font-weight: 400;
          color: #2B2B2B; text-decoration: none;
          margin-bottom: 48px;
          padding: 16px 32px;
          border: 1px solid rgba(43,43,43,0.15); border-radius: 4px;
          transition: border-color 0.3s, background 0.3s;
        }
        .lk-cta-wa:hover { border-color: #C9A8A8; background: rgba(201,168,168,0.08); }
        .lk-cta-wa-text {
          display: flex; flex-direction: column; align-items: flex-start;
          font-size: 14px; line-height: 1.5;
        }
        .lk-cta-wa-text strong {
          font-size: 16px; font-weight: 700; letter-spacing: 0.02em;
        }
        .lk-cta-date-bar {
          background: #C9A8A8;
          padding: 32px 64px; border-radius: 4px;
          display: flex; align-items: center; justify-content: center; gap: 32px;
        }
        .lk-cta-date-inner { text-align: center; }
        .lk-cta-date-label {
          font-family: 'Lato', sans-serif; font-size: 14px;
          color: rgba(255,255,255,0.75); letter-spacing: 0.12em; margin-bottom: 6px;
        }
        .lk-cta-date-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem; font-weight: 600; color: white; letter-spacing: 0.02em;
        }

        .lk-final-strip {
          position: relative; min-height: 50vh; overflow: hidden;
          display: flex; align-items: center; justify-content: center;
        }
        .lk-final-strip-bg {
          position: absolute; inset: 0;
          background: url('/assets/hero-ladakh.jpg') center / cover no-repeat;
        }
        .lk-final-strip-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.35); }
        .lk-final-quote {
          position: relative; z-index: 1;
          background: rgba(255,255,255,0.92);
          border: 1.5px solid rgba(43,43,43,0.08); border-radius: 8px;
          padding: 40px 48px; max-width: 400px; text-align: center;
        }
        .lk-final-quote p {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-size: 1.4rem; color: #2B2B2B; line-height: 1.4;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .lk-invite { padding: 80px 48px; gap: 48px; }
          .lk-guide { padding: 80px 48px; }
          .lk-day-header { padding: 48px 48px 24px; }
          .lk-day-body { padding: 0 48px 48px; }
          .lk-overnight { padding: 24px 48px; }
          .lk-investment { padding: 80px 48px; }
          .lk-inc-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .lk-invite { grid-template-columns: 1fr; padding: 60px 32px; gap: 40px; }
          .lk-invite-photo img { max-width: 260px; margin: 0 auto; }
          .lk-guide { padding: 60px 32px; }
          .lk-guide-photo { width: 200px; height: 200px; }
          .lk-day-header { padding: 40px 24px 20px; }
          .lk-day-body { padding: 0 24px 40px; }
          .lk-day-card { padding: 28px 24px; }
          .lk-day-mountain { display: none; }
          .lk-overnight { padding: 20px 24px; }
          .lk-investment { padding: 60px 32px; }
          .lk-inv-grid { grid-template-columns: 1fr; }
          .lk-inv-col:first-child { border-right: none; border-bottom: 1.5px solid rgba(43,43,43,0.1); }
          .lk-inc-grid { grid-template-columns: 1fr 1fr; }
          .lk-important { grid-template-columns: 1fr; }
          .lk-cta { padding: 60px 32px; }
          .lk-farewell { padding: 60px 32px; }
        }
      `}</style>

      <div className="grain" aria-hidden="true" />
      <div className="pv-progress" style={{ width: `${progress}%` }} aria-hidden="true" />
      <Nav />
      <WhatsAppButton />

      {/* ══ PAGE 1: Hero ══ */}
      <section className="lk-hero">
        <div className="lk-hero-bg" />
        <div className="lk-hero-overlay" />
        <img src="/assets/Logo-Main.png" alt="PuraVida" className="lk-hero-logo" />
        <div className="lk-hero-content">
          <h1 className="lk-hero-title">Ladakh</h1>
          <p className="lk-hero-dates">September 20<sup>th</sup> &ndash; 27<sup>th</sup>, 2026</p>
        </div>
      </section>

      {/* ══ PAGE 2: Invitation from Harsha ══ */}
      <section className="lk-invite">
        <FU>
          <div className="lk-invite-photo">
            <img src="/assets/harsha-portrait.jpg" alt="Harsha" />
          </div>
        </FU>
        <FU d={1}>
          <LeafDivider color="#2B2B2B" width="80%" />
          <h2 className="lk-invite-heading">An Invitation<br />from Harsha</h2>
          <LeafDivider color="#2B2B2B" width="80%" />
          <p className="lk-invite-body" style={{ marginTop: '32px' }}>
            There are places you visit, and then there are places that claim you.
          </p>
          <p className="lk-invite-body">
            Ladakh claimed me in 2010, and I have been returning ever since. At nearly 3,500 metres, the mountains are a presence. Ancient, indifferent to everything modern life considers urgent. Monasteries cling to cliffsides as they have for centuries. The light here is unlike anything else on earth.
          </p>
          <p className="lk-invite-body">This is where clarity returns.</p>
          <p className="lk-invite-body">
            I am taking a small, carefully chosen group of travellers here. Unhurried. Personal. Deeply rooted in place.
          </p>
          <p className="lk-invite-body">If this speaks to you, I would love to tell you more.</p>
          <div className="lk-invite-trees">
            <TreeGlyph size={48} /><TreeGlyph size={56} /><TreeGlyph size={44} />
          </div>
        </FU>
      </section>

      {/* ══ PAGE 3: Walk Ladakh with Juma Malik ══ */}
      <section className="lk-guide">
        <FU>
          <img src="/assets/juma-malik.jpg" alt="Juma Malik" className="lk-guide-photo" />
          <LeafDivider color="#2B2B2B" width="60%" />
          <h2 className="lk-guide-title">Walk Ladakh<br />with Juma Malik</h2>
          <LeafDivider color="#2B2B2B" width="60%" />
          <p className="lk-guide-subtitle">Your cultural bridge.</p>
          <p className="lk-guide-body">
            Born and raised in Leh, Juma Malik is Ladakh: not just a guide who knows it. His intimate understanding of the region's high-altitude terrain, ancient monasteries, nomadic communities and shifting mountain seasons comes from a lifetime of living it. No itinerary he crafts is borrowed from a brochure; every route reflects genuine local knowledge passed down through generations.
          </p>
          <p className="lk-guide-body">
            As a certified trekking specialist, Juma priorities safety and reliability above all: ensuring every PuraVida guest is in trusted hands from arrival to farewell. His warmth, cultural sensitivity and unwavering commitment to exceptional experiences make him an ideal local partner for travellers seeking something far deeper than a destination.
          </p>
        </FU>
      </section>

      {/* ══ PAGES 4-11: Day-by-Day Itinerary ══ */}
      {DAYS.map((day, idx) => (
        <div key={idx}>
          <FU>
            <div className="lk-day-header">
              <p className="lk-day-num">DAY- <span>{day.day}</span></p>
              <h2 className="lk-day-title">
                {day.title}
                {day.subtitle && <><br />{day.subtitle}</>}
              </h2>
              <div className="lk-day-mountain"><MountainGlyph size={100} /></div>
              <div style={{ marginTop: '16px' }}><LeafDivider /></div>
            </div>

            <div className="lk-day-body">
              <div className="lk-day-card">
                {day.morning.length > 0 && (
                  <div className="lk-time-section">
                    <h3 className="lk-time-heading">Morning</h3>
                    {day.morning.map((a, i) => <DayActivity key={i} icon={a.icon} text={a.text} sub={a.sub} />)}
                  </div>
                )}

                {day.afternoon.length > 0 && (
                  <>
                    <div className="lk-time-divider"><LeafDivider /></div>
                    <div className="lk-time-section">
                      <h3 className="lk-time-heading">Afternoon</h3>
                      {day.afternoon.map((a, i) => <DayActivity key={i} icon={a.icon} text={a.text} sub={a.sub} />)}
                    </div>
                  </>
                )}

                {day.evening.length > 0 && (
                  <>
                    <div className="lk-time-divider"><LeafDivider /></div>
                    <div className="lk-time-section">
                      <h3 className="lk-time-heading">Evening</h3>
                      {day.evening.map((a, i) => <DayActivity key={i} icon={a.icon} text={a.text} sub={a.sub} />)}
                    </div>
                  </>
                )}

                {day.farewell && (
                  <div style={{ textAlign: 'center', padding: '40px 0 20px' }}>
                    <div className="lk-farewell-card" style={{ border: 'none', padding: '20px', display: 'inline-block' }}>
                      <p className="lk-farewell-text">{day.farewell}</p>
                    </div>
                  </div>
                )}

                <div className="lk-day-compass"><CompassGlyph /></div>
              </div>
            </div>

            {day.overnight && (
              <div className="lk-overnight">
                <div className="lk-overnight-trees"><TreeGlyph size={32} /><TreeGlyph size={36} /></div>
                <div>
                  <p className="lk-overnight-text">{day.overnight} -</p>
                  <p className="lk-overnight-text">{day.hotel}</p>
                </div>
                <div className="lk-overnight-trees"><TreeGlyph size={36} /><TreeGlyph size={32} /></div>
              </div>
            )}
          </FU>
        </div>
      ))}

      {/* ══ PAGE 12: Investment ══ */}
      <section className="lk-investment">
        <FU>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h2 className="lk-inv-title">Your Investment</h2>
            <div style={{ display: 'flex', gap: '4px' }}><TreeGlyph size={40} /><TreeGlyph size={48} /></div>
          </div>

          <div className="lk-inv-grid">
            <div className="lk-inv-col">
              <p className="lk-inv-col-title">Double Occupancy (Twin Sharing)</p>
              <p className="lk-inv-price">AED 6250 <span>per person</span></p>
            </div>
            <div className="lk-inv-col">
              <p className="lk-inv-col-title">Single Occupancy</p>
              <p className="lk-inv-price">AED 7500</p>
            </div>
          </div>

          <h3 className="lk-important-title">Important to Know</h3>
          <div className="lk-important">
            <ul className="lk-important-list">
              <li>Payments refundable up to 4 weeks before departure</li>
              <li>Small deductions may apply for committed third-party bookings</li>
              <li>Final confirmation subject to availability at the time of booking</li>
            </ul>
            <ul className="lk-important-list">
              <li>Minimum 6 travelers required for the trip to proceed</li>
              <li>Reservations close on 20th July</li>
              <li>50% advance to confirm booking; balance due by 20th August</li>
              <li>No refunds after 20th August</li>
            </ul>
          </div>

          <LeafDivider />

          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', fontWeight: 400, color: '#2B2B2B', margin: '48px 0 28px' }}>Inclusions</h3>
          <div className="lk-inc-grid">
            {[
              "7 nights accommodation", "Transportation", "Guide",
              "All breakfasts and dinners", "Authentic Ladakhi hosted lunch experience",
              "Amchi (Sowa Rigpa) traditional medicine session", "Monastery entrance fees",
              "Inner Line Permits", "Special hosted dinners at select local restaurants",
              "Village-based cultural cooking interaction"
            ].map((item, i) => (
              <div className="lk-inc-item" key={i}>
                <p className="lk-inc-label">{item}</p>
              </div>
            ))}
          </div>

          <LeafDivider />

          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', fontWeight: 400, color: '#2B2B2B', margin: '48px 0 28px' }}>Exclusions</h3>
          <div className="lk-inc-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {[
              "Lunches outside designated experiences",
              "Beverages",
              "Flights",
              "Additional costs due to flight delays, weather disruptions, roadblocks, illness, or unforeseen circumstances"
            ].map((item, i) => (
              <div className="lk-inc-item" key={i}>
                <p className="lk-inc-label">{item}</p>
              </div>
            ))}
          </div>
        </FU>
      </section>

      {/* ══ PAGE 13: CTA ══ */}
      <section className="lk-cta">
        <FU>
          <img src="/assets/Logo-Main.png" alt="PuraVida" className="lk-cta-logo" />
          <h2 className="lk-cta-heading">Your Journey Begins<br />with a Message</h2>
          <a href="https://wa.me/+971562216643" className="lk-cta-wa" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#2B2B2B" strokeWidth="1.5"><path d="M3,21 L4.5,15.5 C3.5,13.8 3,11.9 3,10 C3,5 7,1 12,1 C17,1 21,5 21,10 C21,15 17,19 12,19 C10.1,19 8.3,18.5 6.7,17.5 L3,21z" /><path d="M8,12 C8,12 9.5,14 12,14 C14.5,14 16,12 16,12" /></svg>
            WhatsApp Harsha<br />+971 56 2216643
          </a>
          <div className="lk-cta-date-bar">
            <div className="lk-overnight-trees"><TreeGlyph size={28} color="#FAFAF8" /><TreeGlyph size={32} color="#FAFAF8" /></div>
            <div>
              <p className="lk-cta-date-label">Join us by</p>
              <p className="lk-cta-date-val">August 20<sup>th</sup> 2026</p>
            </div>
            <div className="lk-overnight-trees"><TreeGlyph size={32} color="#FAFAF8" /><TreeGlyph size={28} color="#FAFAF8" /></div>
          </div>
        </FU>
      </section>

      {/* Final quote */}
      <div className="lk-final-strip">
        <div className="lk-final-strip-bg" />
        <div className="lk-final-strip-overlay" />
        <FU>
          <div className="lk-final-quote">
            <p>Ladakh does not let you leave,<br />and never lets you forget.</p>
          </div>
        </FU>
      </div>

      <Footer />
    </>
  );
}