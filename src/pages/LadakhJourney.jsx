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

function DayActivity({ icon, text, sub }) {
  return (
    <div className="lk-activity">
      <DayIcon type={icon} />
      <div>
        <p className="lk-activity-text">{text}</p>
        {sub && <p className="lk-activity-sub">{sub}</p>}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   INCLUSIONS: icon above label, 4-per-row
   per brand guidelines page 47
───────────────────────────────────────── */
const INCLUSIONS = [
  { icon: 'hotel',      label: '7 nights accommodation' },
  { icon: 'transport',  label: 'All ground transportation' },
  { icon: 'experience', label: 'Guide: Juma Malik' },
  { icon: 'meal',       label: 'All breakfasts and dinners' },
  { icon: 'meal',       label: 'Authentic Ladakhi hosted lunch experience' },
  { icon: 'culture',    label: 'Amchi traditional medicine session (Sowa Rigpa)' },
  { icon: 'location',   label: 'Monastery entrance fees' },
  { icon: 'experience', label: 'Inner Line Permits' },
  { icon: 'meal',       label: 'Special hosted dinners at select local restaurants' },
  { icon: 'culture',    label: 'Village-based cultural cooking interaction' },
];

const EXCLUSIONS = [
  { icon: 'meal',       label: 'Lunches outside designated experiences' },
  { icon: 'meal',       label: 'Beverages' },
  { icon: 'transport',  label: 'Flights' },
  { icon: 'experience', label: 'Additional costs due to delays, weather, roadblocks, illness, or unforeseen circumstances' },
];

const DAYS = [
  {
    day: "01", title: "Arrival in Leh", subtitle: "Altitude 3,000m",
    morning: [
      { icon: 'transport', text: "Arrive at Leh Airport. Private transfer to your hotel.", sub: "Approximately 10 minutes." },
      { icon: 'hotel',     text: "Check in and rest for altitude acclimatisation.", sub: "Rest is essential today to adapt to the high altitude." },
    ],
    afternoon: [
      { icon: 'meal',    text: "Light lunch at the hotel." },
      { icon: 'leisure', text: "Time at leisure for relaxation." },
    ],
    evening: [
      { icon: 'leisure', text: "Optional slow walk within the property grounds." },
      { icon: 'meal',    text: "Early dinner featuring warm, easily digestible Ladakhi cuisine." },
      { icon: 'leisure', text: "Herbal infusions beneath a starlit Himalayan sky." },
    ],
    overnight: "Leh", hotel: "Dolkhar Resort", farewell: null,
  },
  {
    day: "02", title: "Leh, Monastic Calm", subtitle: "and Old Town Heritage",
    morning: [
      { icon: 'sight', text: "Visit to Shanti Stupa.", sub: "Perched above Leh, the Stupa offers uninterrupted valley views and a moment of stillness as the mountains awaken with first light. Inside the prayer hall, you may observe monks offering chants. The soft hum of Buddhist mantras, the scent of incense, and the gentle turning of prayer wheels create a deeply serene atmosphere." },
      { icon: 'meal',  text: "Return for breakfast." },
    ],
    afternoon: [
      { icon: 'sight',   text: "Visit to Leh Palace overlooking the old town." },
      { icon: 'sight',   text: "Walk through Leh Old Town.", sub: "Narrow lanes, mud-brick homes, carved balconies, fluttering prayer flags. Observe the coexistence of mosque, temples, chortens, and family shrines." },
      { icon: 'leisure', text: "Browse artisan studios and rooftop cafes serving local teas.", sub: "Leh Old Town reveals the city's original rhythm: intimate, layered, and still lived in, far removed from the pace of modern market streets." },
    ],
    evening: [
      { icon: 'meal', text: "Dinner at Bon Appetit.", sub: "A popular locally owned restaurant offering indoor and open-air seating with mountain views." },
    ],
    overnight: "Leh", hotel: "Dolkhar Resort", farewell: null,
  },
  {
    day: "03", title: "Sham Valley, Alchi", subtitle: "and Uleytokpo",
    morning: [
      { icon: 'meal',      text: "Breakfast at Dolkhar Resort." },
      { icon: 'transport', text: "Drive from Leh to Alchi.", sub: "Distance: approximately 70 km. Travel time: 1.5 to 2 hours. A scenic drive along the Indus River with relaxed pauses for photography." },
      { icon: 'sight',     text: "Visit to Alchi Monastery.", sub: "Set at river level and woven into village life, Alchi offers a quieter and more contemplative expression of Himalayan Buddhism. It is renowned for its finely preserved Kashmiri-influenced murals." },
    ],
    afternoon: [
      { icon: 'meal',      text: "Lunch at Alchi Kitchen." },
      { icon: 'transport', text: "Drive from Alchi to Uleytokpo.", sub: "Distance: approximately 10 to 12 km. Travel time: 20 to 30 minutes." },
    ],
    evening: [
      { icon: 'hotel', text: "Stay at Uley Ethnic Resort.", sub: "A peaceful riverside retreat surrounded by apricot gardens and views of the Indus." },
      { icon: 'meal',  text: "Dinner at the resort." },
    ],
    overnight: "Uley", hotel: "Uley Ethnic Resort", farewell: null,
  },
  {
    day: "04", title: "Lamayuru and Temisgam", subtitle: "Ancient Landscapes and Living Medicine",
    morning: [
      { icon: 'meal',      text: "Breakfast in Uleytokpo." },
      { icon: 'transport', text: "Drive from Uleytokpo to Lamayuru Monastery.", sub: "Distance: approximately 55 to 60 km. Travel time: 1 hour 15 minutes to 1 hour 30 minutes. One of the oldest monasteries in Ladakh, dramatically perched on a rocky hill. Founded in the 11th century, it belongs to the Drikung Kagyu lineage of Tibetan Buddhism. Below the monastery lies the famous Moonland landscape: surreal, eroded clay formations resembling the lunar surface." },
    ],
    afternoon: [
      { icon: 'transport', text: "Drive from Lamayuru to Nurla.", sub: "Distance: approximately 45 to 50 km. Travel time: 50 minutes." },
      { icon: 'culture',   text: "Special Cultural Interaction: Amchi Medicine (Sowa Rigpa).", sub: "Participate in an interactive session on Himalayan Amchi medicine. Discussion themes may include the philosophy of Sowa Rigpa, the balance of the three humors (Lung, Tripa, Beken), Himalayan medicinal herbs, pulse diagnosis, and traditional healing methods. A rare opportunity to understand Ladakh's ancient healing traditions from a practicing Amchi." },
      { icon: 'meal',      text: "Lunch with Amchi in Nurla." },
    ],
    evening: [
      { icon: 'transport', text: "Drive from Nurla to Temisgam.", sub: "Distance: approximately 15 to 20 km. Travel time: 20 to 30 minutes." },
      { icon: 'hotel',     text: "Stay at TIH Namra Village House." },
      { icon: 'culture',   text: "Ladakhi cooking experience.", sub: "Hands-on cooking using seasonal produce. Butter tea or herbal tea shared with a local family." },
      { icon: 'meal',      text: "Dinner at Namra Village." },
    ],
    overnight: "Temisgam", hotel: "TIH Namra Village", farewell: null,
  },
  {
    day: "05", title: "Temisgam to Thiksey", subtitle: "Village Life and Monastic Views",
    morning: [
      { icon: 'meal',      text: "Breakfast at Temisgam." },
      { icon: 'transport', text: "Drive from Temisgam to Thiksey.", sub: "Distance: approximately 95 km. Travel time: 2.5 to 3 hours." },
    ],
    afternoon: [
      { icon: 'meal',    text: "Lunch in Thiksey village." },
      { icon: 'sight',   text: "Thiksey village life experience.", sub: "Life here unfolds without urgency, shaped by land, lineage, and ritual." },
    ],
    evening: [
      { icon: 'leisure', text: "Unstructured time for rest or quiet walks." },
      { icon: 'meal',    text: "Early dinner at Dakpa House.", sub: "Featuring home-grown organic produce." },
    ],
    overnight: "Thiksey", hotel: "Dakpa House", farewell: null,
  },
  {
    day: "06", title: "Thiksey and Hemis", subtitle: "Living Monastic Traditions",
    morning: [
      { icon: 'sight',     text: "Morning prayers at Thiksey Monastery.", sub: "The early morning atmosphere is peaceful and powerful, offering a rare glimpse into authentic monastic life." },
      { icon: 'meal',      text: "Return to Dakpa House for breakfast." },
      { icon: 'transport', text: "Drive to Hemis Monastery.", sub: "The largest monastery in Ladakh. The visit focuses on observing daily rituals, architecture, and silence rather than simply moving through it as a landmark." },
    ],
    afternoon: [
      { icon: 'meal', text: "Lunch at Tesma Multi-Cuisine." },
    ],
    evening: [
      { icon: 'meal', text: "Dinner at Ladakh Sarai." },
    ],
    overnight: "Saboo", hotel: "Ladakh Sarai", farewell: null,
  },
  {
    day: "07", title: "Shey, Stok and", subtitle: "Leisure in Leh",
    morning: [
      { icon: 'meal',  text: "Breakfast at Ladakh Sarai." },
      { icon: 'sight', text: "Visit to Shey Palace.", sub: "Former summer capital of Ladakh's royal family (17th century), overlooking the Indus Valley. Highlights include the 12-metre copper-gilded statue of Shakyamuni Buddha, ancient murals, peaceful chortens, and prayer flags." },
      { icon: 'sight', text: "Visit to Stok Palace.", sub: "Current residence of the Ladakhi royal family, partly converted into a heritage museum. Features traditional royal architecture, views of the Stok Kangri range, and a museum showcasing Ladakh's monarchy and cultural legacy." },
    ],
    afternoon: [
      { icon: 'meal', text: "Lunch at Ladakh Sarai." },
    ],
    evening: [
      { icon: 'meal', text: "Dinner at Chopsticks.", sub: "A well-known local favourite." },
    ],
    overnight: "Saboo", hotel: "Ladakh Sarai", farewell: null,
  },
  {
    day: "08", title: "Departure", subtitle: "",
    morning: [
      { icon: 'transport', text: "Private transfer to Leh Airport." },
      { icon: 'transport', text: "Flight onward to Delhi." },
    ],
    afternoon: [], evening: [],
    overnight: null, hotel: null,
    farewell: "Juley Juley: until we meet again in the land of high passes.",
  },
];

export default function LadakhJourney() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Ladakh | PuraVida with Harsha';
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
          background: url('/assets/hero-ladakh.jpg') center center / cover no-repeat,
            linear-gradient(158deg, #1a4060 0%, #0e2a40 40%, #061420 100%);
        }
        .lk-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom,
            rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.02) 35%,
            rgba(0,0,0,0.15) 70%, rgba(0,0,0,0.50) 100%);
        }
        .lk-hero-logo {
          position: absolute; top: 100px; left: 50%; z-index: 3;
          transform: translateX(-50%);
          height: 80px; width: auto;
        }
        .lk-hero-content {
          position: relative; z-index: 2;
          max-width: 700px; padding: 0 40px;
        }
        .lk-hero-title {
          font-family: 'Playfair Display', serif; font-weight: 700;
          font-size: clamp(5rem, 14vw, 10rem);
          color: white; line-height: 0.9; margin-bottom: 48px;
          text-shadow: 0 4px 40px rgba(0,0,0,0.3);
        }
        .lk-hero-dates {
          font-family: 'Lato', sans-serif;
          font-size: clamp(1.1rem, 2.2vw, 1.5rem); font-weight: 400;
          color: rgba(255,255,255,0.85); letter-spacing: 0.1em; margin-bottom: 32px;
        }
        .lk-hero-tagline {
          font-family: 'Lora', serif; font-style: italic;
          font-size: clamp(1rem, 2vw, 1.4rem);
          /* Turmeric Gold per brand guidelines */
          color: #D4A42C;
        }

        /* ── INVITATION FROM HARSHA ── */
        .lk-invite {
          background: #B7C8B5; padding: 100px 80px;
          display: grid; grid-template-columns: 0.8fr 1fr;
          gap: 80px; align-items: center;
        }
        .lk-invite-photo-wrap { position: relative; max-width: 340px; }
        .lk-invite-img { width: 100%; display: block; border-radius: 4px; box-shadow: 0 16px 48px rgba(0,0,0,0.12); }
        .lk-invite-frame {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 115%; height: auto; pointer-events: none;
        }
        .lk-invite-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.4rem, 4vw, 3.8rem); font-weight: 700;
          color: #333333; line-height: 1.15; margin-bottom: 40px;
        }
        .lk-invite-body {
          font-family: 'Lato', sans-serif;
          font-size: 16px; line-height: 1.75; color: #333333;
          margin-bottom: 16px; max-width: 520px;
        }
        .lk-invite-trees { display: flex; gap: 8px; margin-top: 40px; }

        /* ── WALK LADAKH WITH JUMA MALIK ── */
        /* Clay Rose background is correct per brand guidelines page 49 */
        .lk-guide { background: #D9A6A1; padding: 100px 80px; text-align: center; }
        .lk-guide-photo-wrap { position: relative; width: 300px; height: 300px; margin: 0 auto 24px; }
        .lk-guide-img {
          width: 240px; height: 240px; border-radius: 50%; object-fit: cover;
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          box-shadow: 0 12px 40px rgba(0,0,0,0.15);
        }
        .lk-guide-frame {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          width: 100%; height: 100%; object-fit: contain; pointer-events: none;
        }
        .lk-guide-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 3.5vw, 3.2rem); font-weight: 700;
          color: #333333; line-height: 1.15; margin-bottom: 8px;
        }
        .lk-guide-subtitle {
          font-family: 'Lora', serif; font-style: italic;
          font-size: 1.1rem; color: #333333; margin-bottom: 32px;
        }
        .lk-guide-body {
          font-family: 'Lato', sans-serif;
          font-size: 16px; line-height: 1.75; color: #333333;
          max-width: 600px; margin: 0 auto; text-align: left;
        }
        .lk-guide-body + .lk-guide-body { margin-top: 16px; }

        /* ── DAY CARDS ── */
        .lk-day-header { background: #F5F0EB; padding: 60px 80px 32px; position: relative; }
        .lk-day-num {
          font-family: 'Lato', sans-serif; font-size: 14px; font-weight: 400;
          letter-spacing: 0.1em; text-transform: uppercase; color: #333333; margin-bottom: 4px;
        }
        .lk-day-num span { color: #D9A6A1; font-weight: 700; }
        .lk-day-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 700;
          color: #333333; line-height: 1.15; max-width: 550px;
        }
        .lk-day-subtitle { font-family: 'Lato', sans-serif; font-size: 14px; color: #333333; opacity: 0.6; margin-top: 8px; font-style: italic; }
        .lk-day-mountain { position: absolute; top: 40px; right: 80px; }
        .lk-day-body { background: #F5F0EB; padding: 0 80px 60px; }
        .lk-day-card {
          background: #F5ECD8; border: 1.5px solid rgba(51,51,51,0.08);
          padding: 40px 48px; position: relative;
        }
        .lk-day-pause { position: absolute; bottom: 12px; right: 12px; }
        .lk-time-section { margin-bottom: 32px; }
        .lk-time-section:last-child { margin-bottom: 0; }
        .lk-time-heading {
          font-family: 'Playfair Display', serif; font-size: 1.4rem; font-weight: 400;
          color: #333333; margin-bottom: 20px;
        }
        .lk-activity { display: flex; gap: 14px; align-items: flex-start; margin-bottom: 16px; }
        .lk-activity:last-child { margin-bottom: 0; }
        .lk-activity-text { font-family: 'Lato', sans-serif; font-size: 16px; line-height: 1.7; color: #333333; word-break: normal; overflow-wrap: break-word; }
        .lk-activity-sub { font-family: 'Lato', sans-serif; font-size: 14px; font-style: italic; line-height: 1.7; color: #333333; opacity: 0.65; margin-top: 4px; }
        .lk-time-divider { margin: 28px 0; }

        /* Overnight footer */
        .lk-overnight {
          background: #B7C8B5; padding: 24px 80px;
          display: flex; align-items: center; justify-content: center; gap: 24px;
        }
        .lk-overnight-text {
          font-family: 'Lato', sans-serif; font-size: 1.15rem; font-weight: 700;
          color: #333333; text-align: center;
        }
        .lk-overnight-trees { display: flex; gap: 4px; }

        /* Farewell card */
        .lk-farewell-wrap { background: #F5F0EB; padding: 80px; text-align: center; }
        .lk-farewell-card {
          display: inline-block; background: #F5ECD8;
          border: 1.5px solid rgba(51,51,51,0.1); border-radius: 8px;
          padding: 40px 48px; max-width: 480px;
        }
        .lk-farewell-text {
          font-family: 'Lora', serif; font-style: italic;
          font-size: 1.6rem; color: #333333; line-height: 1.4;
        }

        /* ── INVESTMENT ── */
        .lk-investment { background: #F5F0EB; padding: 100px 80px; }
        .lk-inv-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 3vw, 2.8rem); font-weight: 700;
          color: #333333; margin-bottom: 40px;
        }
        .lk-inv-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 0;
          border: 1.5px solid rgba(51,51,51,0.1); background: #F5ECD8;
          margin-bottom: 48px; max-width: 600px;
        }
        .lk-inv-col { padding: 32px 40px; }
        .lk-inv-col:first-child { border-right: 1.5px solid rgba(51,51,51,0.1); }
        .lk-inv-col-title {
          font-family: 'Lato', sans-serif; font-size: 14px; font-weight: 400;
          letter-spacing: 0.1em; color: #333333; opacity: 0.6; margin-bottom: 16px;
        }
        .lk-inv-label { font-family: 'Lato', sans-serif; font-size: 14px; color: #333333; opacity: 0.6; margin-bottom: 4px; }
        .lk-inv-price { font-family: 'Playfair Display', serif; font-size: 1.8rem; font-weight: 700; color: #333333; }
        .lk-inv-price span { font-size: 1rem; font-weight: 400; }

        /* Important to Know */
        .lk-important { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 48px; max-width: 700px; }
        .lk-important-title {
          font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 700;
          color: #333333; margin-bottom: 20px;
        }
        .lk-important-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .lk-important-list li {
          font-family: 'Lato', sans-serif; font-size: 14px; line-height: 1.7; color: #333333;
          padding-left: 16px; position: relative;
        }
        .lk-important-list li::before { content: '\\25E6'; position: absolute; left: 0; color: #333333; opacity: 0.5; }

        /* Inclusions/Exclusions — icon grid per brand guidelines page 47 */
        .lk-icon-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 32px 24px; margin-bottom: 48px;
        }
        .lk-icon-item { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 12px; }
        .lk-icon-item img { width: 36px; height: 36px; opacity: 0.7; }
        .lk-icon-label { font-family: 'Lato', sans-serif; font-size: 13px; line-height: 1.5; color: #333333; text-align: center; }

        .lk-section-subtitle {
          font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 700;
          color: #333333; margin: 48px 0 28px;
        }

        /* ── CTA ── */
        .lk-cta {
          background: #F5F0EB; padding: 100px 80px;
          text-align: center; display: flex; flex-direction: column; align-items: center;
        }
        .lk-cta-logo { height: 80px; width: auto; margin-bottom: 48px; display: block; }
        .lk-cta-heading {
          font-family: 'Playfair Display', serif; font-weight: 700;
          font-size: clamp(2.4rem, 4.5vw, 3.8rem);
          color: #333333; margin-bottom: 40px; line-height: 1.25; max-width: 500px;
        }
        .lk-cta-wa {
          display: flex; align-items: center; gap: 14px;
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
          background: #D9A6A1; padding: 32px 64px; border-radius: 4px;
          display: flex; align-items: center; justify-content: center; gap: 32px;
        }
        .lk-cta-date-label {
          font-family: 'Lato', sans-serif; font-size: 14px; color: rgba(255,255,255,0.75);
          letter-spacing: 0.12em; margin-bottom: 6px;
        }
        .lk-cta-date-val {
          font-family: 'Playfair Display', serif; font-size: 2rem; font-weight: 700;
          color: white; letter-spacing: 0.02em;
        }

        /* ── FINAL QUOTE ── */
        .lk-final-strip { position: relative; min-height: 50vh; overflow: hidden; display: flex; align-items: center; justify-content: center; }
        .lk-final-strip-bg { position: absolute; inset: 0; background: url('/assets/hero-ladakh.jpg') center / cover no-repeat; }
        .lk-final-strip-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.40); }
        .lk-final-quote { position: relative; z-index: 1; max-width: 420px; text-align: center; padding: 20px 40px; }
        .lk-quote-ornament { width: 80px; height: auto; display: block; margin: 0 auto; }
        .lk-quote-ornament-upper { margin-bottom: 24px; }
        .lk-quote-ornament-lower { margin-top: 24px; }
        .lk-final-quote p {
          font-family: 'Lora', serif; font-style: italic; font-size: 1.5rem;
          color: white; line-height: 1.5; text-shadow: 0 2px 12px rgba(0,0,0,0.3);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .lk-invite { padding: 80px 48px; gap: 48px; }
          .lk-guide { padding: 80px 48px; }
          .lk-day-header { padding: 48px 48px 24px; }
          .lk-day-body { padding: 0 48px 48px; }
          .lk-overnight { padding: 24px 48px; }
          .lk-investment { padding: 80px 48px; }
          .lk-icon-grid { grid-template-columns: repeat(3, 1fr); }
          .lk-cta { padding: 80px 48px; }
        }
        @media (max-width: 768px) {
          .lk-invite { grid-template-columns: 1fr; padding: 60px 32px; gap: 40px; }
          .lk-invite-photo-wrap { max-width: 260px; margin: 0 auto; }
          .lk-guide { padding: 60px 32px; }
          .lk-guide-photo-wrap { width: 220px; height: 220px; }
          .lk-guide-img { width: 180px; height: 180px; }
          .lk-day-header { padding: 40px 24px 20px; }
          .lk-day-body { padding: 0 24px 40px; }
          .lk-day-card { padding: 28px 24px; }
          .lk-day-mountain { display: none; }
          .lk-overnight { padding: 20px 24px; }
          .lk-investment { padding: 60px 32px; }
          .lk-inv-grid { grid-template-columns: 1fr; }
          .lk-inv-col:first-child { border-right: none; border-bottom: 1.5px solid rgba(51,51,51,0.1); }
          .lk-icon-grid { grid-template-columns: 1fr 1fr; }
          .lk-important { grid-template-columns: 1fr; }
          .lk-cta { padding: 60px 32px; }
          .lk-cta-date-bar { padding: 24px 32px; flex-direction: column; gap: 16px; }
          .lk-farewell-wrap { padding: 60px 32px; }
          .lk-farewell-card { padding: 28px 24px; }
          .lk-final-quote { padding: 16px 24px; }
          .lk-final-quote p { font-size: 1.25rem; }
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
        <img src="/assets/01. LOGOS/Logo-Main-White.png" alt="PuraVida" className="lk-hero-logo" />
        <div className="lk-hero-content">
          <h1 className="lk-hero-title">Ladakh</h1>
          <p className="lk-hero-dates">September 20 to 27, 2026</p>
          <p className="lk-hero-tagline">Where stillness finds you</p>
        </div>
      </section>

      {/* ══ INVITATION FROM HARSHA ══ */}
      <section className="lk-invite">
        <FU>
          <div className="lk-invite-photo-wrap">
            <img src="/assets/harsha-portrait.jpg" alt="Harsha" className="lk-invite-img" />
            <img
              src="/assets/05. GRAPHIC ELEMENTS/Puravida_Photo-Frame-2/Puravida_Photo-Frame-2.png"
              alt="" aria-hidden="true" className="lk-invite-frame"
            />
          </div>
        </FU>
        <FU d={1}>
          <Divider width={240} />
          <h2 className="lk-invite-heading" style={{ marginTop: 32 }}>
            An Invitation<br />From Harsha
          </h2>
          <Divider width={240} />
          <p className="lk-invite-body" style={{ marginTop: 32 }}>
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
            <Glyph name="Trees" size={48} opacity={0.3} />
            <Glyph name="Trees" size={56} opacity={0.3} />
            <Glyph name="Trees" size={44} opacity={0.3} />
          </div>
        </FU>
      </section>

      {/* ══ WALK LADAKH WITH JUMA MALIK ══ */}
      <section className="lk-guide">
        <FU>
          <div className="lk-guide-photo-wrap">
            <img src="/assets/juma-malik.jpg" alt="Juma Malik" className="lk-guide-img" />
            <img
              src="/assets/05. GRAPHIC ELEMENTS/Puravida_Photo-Frame-1/Puravida_Photo-Frame-1.png"
              alt="" aria-hidden="true" className="lk-guide-frame"
            />
          </div>
          <Divider width={200} />
          <h2 className="lk-guide-title" style={{ marginTop: 24 }}>
            Walk Ladakh<br />with Juma Malik
          </h2>
          <Divider width={200} />
          <p className="lk-guide-subtitle" style={{ marginTop: 16 }}>Your cultural bridge.</p>
          <p className="lk-guide-body">
            Born and raised in Leh, Juma Malik is Ladakh: not just a guide who knows it. His intimate understanding of the region's high-altitude terrain, ancient monasteries, nomadic communities and shifting mountain seasons comes from a lifetime of living it. No itinerary he crafts is borrowed from a brochure; every route reflects genuine local knowledge passed down through generations.
          </p>
          <p className="lk-guide-body">
            As a certified trekking specialist, Juma prioritises safety and reliability above all: ensuring every PuraVida guest is in trusted hands from arrival to farewell. His warmth, cultural sensitivity and unwavering commitment to exceptional experiences make him an ideal local partner for travellers seeking something far deeper than a destination.
          </p>
        </FU>
      </section>

      {/* ══ DAY-BY-DAY ITINERARY ══ */}
      {DAYS.map((day, idx) => (
        <div key={idx}>
          <FU>
            <div className="lk-day-header">
              {/* DAY- format matches the PDF exactly */}
              <p className="lk-day-num">DAY- <span>{day.day}</span></p>
              <h2 className="lk-day-title">
                {day.title}
                {day.subtitle && <><br />{day.subtitle}</>}
              </h2>
              <div className="lk-day-mountain">
                <Glyph name="Mountains" size={80} opacity={0.25} />
              </div>
              <div style={{ marginTop: 16 }}><Divider width={260} /></div>
            </div>

            <div className="lk-day-body">
              <div className="lk-day-card">
                {day.morning.length > 0 && (
                  <div className="lk-time-section">
                    <h3 className="lk-time-heading">Morning</h3>
                    {day.morning.map((a, i) => (
                      <DayActivity key={i} icon={a.icon} text={a.text} sub={a.sub} />
                    ))}
                  </div>
                )}
                {day.afternoon.length > 0 && (
                  <>
                    <div className="lk-time-divider"><Divider width={160} opacity={0.35} /></div>
                    <div className="lk-time-section">
                      <h3 className="lk-time-heading">Afternoon</h3>
                      {day.afternoon.map((a, i) => (
                        <DayActivity key={i} icon={a.icon} text={a.text} sub={a.sub} />
                      ))}
                    </div>
                  </>
                )}
                {day.evening.length > 0 && (
                  <>
                    <div className="lk-time-divider"><Divider width={160} opacity={0.35} /></div>
                    <div className="lk-time-section">
                      <h3 className="lk-time-heading">Evening</h3>
                      {day.evening.map((a, i) => (
                        <DayActivity key={i} icon={a.icon} text={a.text} sub={a.sub} />
                      ))}
                    </div>
                  </>
                )}
                <div className="lk-day-pause">
                  <Glyph name="Pause" size={48} opacity={0.15} />
                </div>
              </div>
            </div>

            {/* Farewell: rendered outside day card using proper classes */}
            {day.farewell ? (
              <div className="lk-farewell-wrap">
                <div className="lk-farewell-card">
                  <p className="lk-farewell-text">{day.farewell}</p>
                </div>
              </div>
            ) : day.overnight ? (
              <div className="lk-overnight">
                <div className="lk-overnight-trees">
                  <Glyph name="Trees" size={32} opacity={0.35} />
                  <Glyph name="Trees" size={36} opacity={0.35} />
                </div>
                <div>
                  {/* Comma separator per brand guidelines — no en/em dash */}
                  <p className="lk-overnight-text">{day.overnight}, {day.hotel}</p>
                </div>
                <div className="lk-overnight-trees">
                  <Glyph name="Trees" size={36} opacity={0.35} />
                  <Glyph name="Trees" size={32} opacity={0.35} />
                </div>
              </div>
            ) : null}
          </FU>
        </div>
      ))}

      {/* ══ INVESTMENT ══ */}
      <section className="lk-investment">
        <FU>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h2 className="lk-inv-title">Your Investment</h2>
            <div style={{ display: 'flex', gap: 4 }}>
              <Glyph name="Trees" size={40} opacity={0.3} />
              <Glyph name="Trees" size={48} opacity={0.3} />
            </div>
          </div>

          <div className="lk-inv-grid">
            <div className="lk-inv-col">
              <p className="lk-inv-col-title">Double Occupancy</p>
              <Divider width={180} opacity={0.3} />
              <div style={{ marginTop: 16 }}>
                <p className="lk-inv-label">Twin Sharing</p>
                <p className="lk-inv-price">AED 6,250 <span>per person</span></p>
              </div>
            </div>
            <div className="lk-inv-col">
              <p className="lk-inv-col-title">Single Occupancy</p>
              <Divider width={180} opacity={0.3} />
              <div style={{ marginTop: 16 }}>
                {/* Added per person label for consistency with double occupancy card */}
                <p className="lk-inv-price">AED 7,500 <span>per person</span></p>
              </div>
            </div>
          </div>

          <h3 className="lk-important-title">Important to Know</h3>
          <div className="lk-important">
            <ul className="lk-important-list">
              <li>Payments refundable up to 4 weeks before departure.</li>
              <li>Small deductions may apply for committed third-party bookings.</li>
              <li>Final confirmation subject to availability at the time of booking.</li>
            </ul>
            <ul className="lk-important-list">
              <li>Minimum 6 travellers required for the trip to proceed.</li>
              <li>Reservations close on 20th July.</li>
              <li>50% advance to confirm booking; balance due by 20th August. No refunds after 20th August.</li>
            </ul>
          </div>

          <Divider />

          {/* Inclusions: icon grid, 4 per row, icon above label — brand guidelines page 47 */}
          <h3 className="lk-section-subtitle">Inclusions</h3>
          <div className="lk-icon-grid">
            {INCLUSIONS.map((item, i) => (
              <div className="lk-icon-item" key={i}>
                <DayIcon type={item.icon} />
                <p className="lk-icon-label">{item.label}</p>
              </div>
            ))}
          </div>

          <Divider />

          {/* Exclusions: icon row */}
          <h3 className="lk-section-subtitle">Exclusions</h3>
          <div className="lk-icon-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {EXCLUSIONS.map((item, i) => (
              <div className="lk-icon-item" key={i}>
                <DayIcon type={item.icon} />
                <p className="lk-icon-label">{item.label}</p>
              </div>
            ))}
          </div>
        </FU>
      </section>

      {/* ══ CTA ══ */}
      <section className="lk-cta">
        <FU>
          <img src="/assets/01. LOGOS/Logo-Main.png" alt="PuraVida" className="lk-cta-logo" />
          <h2 className="lk-cta-heading">Your Journey Begins<br />with a Message</h2>
          {/* Correct WhatsApp icon */}
          <a href="https://wa.me/+971562216643?text=Hello%20Harsha%2C%20I%20am%20interested%20in%20the%20Ladakh%20journey%20and%20would%20love%20to%20learn%20more." className="lk-cta-wa" target="_blank" rel="noopener noreferrer">
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
            <div className="lk-overnight-trees">
              <Glyph name="Trees" variant="White" size={28} opacity={0.6} />
              <Glyph name="Trees" variant="White" size={32} opacity={0.6} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <p className="lk-cta-date-label">Join us by</p>
              <p className="lk-cta-date-val">August 20, 2026</p>
            </div>
            <div className="lk-overnight-trees">
              <Glyph name="Trees" variant="White" size={32} opacity={0.6} />
              <Glyph name="Trees" variant="White" size={28} opacity={0.6} />
            </div>
          </div>
        </FU>
      </section>

      {/* ══ FINAL QUOTE ══ */}
      <div className="lk-final-strip">
        <div className="lk-final-strip-bg" />
        <div className="lk-final-strip-overlay" />
        <FU>
          <div className="lk-final-quote">
            <img
              src="/assets/05. GRAPHIC ELEMENTS/Puravida_Quote-Frame-2/Quote-Upper.png"
              alt="" aria-hidden="true"
              className="lk-quote-ornament lk-quote-ornament-upper"
            />
            <p>Ladakh does not let you leave, and never lets you forget.</p>
            <img
              src="/assets/05. GRAPHIC ELEMENTS/Puravida_Quote-Frame-2/Quote-Lower.png"
              alt="" aria-hidden="true"
              className="lk-quote-ornament lk-quote-ornament-lower"
            />
          </div>
        </FU>
      </div>

      <Footer />
    </>
  );
}