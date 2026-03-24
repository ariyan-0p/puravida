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

/* ── Botanical SVG divider matching PDF ── */
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

/* ── Mountain glyph matching PDF ── */
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

/* ── Tree glyph matching PDF ── */
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

/* ── Compass/Moon glyph for bottom right of day cards ── */
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

/* ── Icon components matching PDF icons ── */
function IconMeal() {
  return <span className="day-icon" title="Meal">
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#2B2B2B" strokeWidth="1.5" strokeLinecap="round">
      <path d="M4,18 Q12,14 20,18" /><path d="M8,14 Q12,10 16,14" /><path d="M10,10 Q12,7 14,10" />
    </svg>
  </span>;
}
function IconTransport() {
  return <span className="day-icon" title="Transport">
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#2B2B2B" strokeWidth="1.5" strokeLinecap="round">
      <path d="M4,16 C4,16 6,8 12,8 C18,8 20,16 20,16" /><circle cx="8" cy="18" r="2" /><circle cx="16" cy="18" r="2" />
    </svg>
  </span>;
}
function IconSight() {
  return <span className="day-icon" title="Experience">
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#2B2B2B" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="3" /><path d="M2,12 C2,12 6,5 12,5 C18,5 22,12 22,12 C22,12 18,19 12,19 C6,19 2,12 2,12Z" />
    </svg>
  </span>;
}
function IconHotel() {
  return <span className="day-icon" title="Accommodation">
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#2B2B2B" strokeWidth="1.5" strokeLinecap="round">
      <rect x="3" y="8" width="18" height="12" rx="1" /><path d="M3,14 L21,14" /><path d="M8,8 L8,4 L16,4 L16,8" />
    </svg>
  </span>;
}
function IconLeisure() {
  return <span className="day-icon" title="Leisure">
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#2B2B2B" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" /><path d="M12,3 L12,12 L18,12" />
    </svg>
  </span>;
}

/* ── ITINERARY DATA matching Bhutan PDF exactly ── */
const DAYS = [
  {
    day: "01",
    title: "Arrival in Paro",
    subtitle: "Transfer to Thimphu",
    approx: "Approx 1 hour",
    morning: [
      { icon: 'transport', text: "Depending on arrival at Paro International Airport complete immigration formalities." },
      { icon: 'sight', text: "Stop at Tanchog Lhakhang Iron Bridge for a short walk and photo stop. Take a moment to soak your feet in the cool river flowing below the bridge, a refreshing and symbolic way to begin your Bhutan journey." },
      { icon: 'hotel', text: "Check in to your hotel in Thimphu and enjoy lunch." },
    ],
    afternoon: [
      { icon: 'leisure', text: "Open to guests: You may choose to rest at the hotel, visit nearby caf\u00e9s, or explore Thimphu town at your own pace." },
    ],
    evening: [
      { icon: 'meal', text: "Dinner at the hotel." },
    ],
    overnight: "Overnight in Thimphu",
    hotel: "Himalayan Keys Forest Resort."
  },
  {
    day: "02",
    title: "Thimphu Sightseeing",
    subtitle: "and Night Out",
    morning: [
      { icon: 'meal', text: "Breakfast at the hotel." },
      { icon: 'sight', text: "Visit Buddha Dordenma, one of the largest Buddha statues in the world, offering panoramic views of Thimphu Valley." },
      { icon: 'sight', text: "For those who enjoy light hiking, take a scenic downhill walk from Buddha Dordenma to Kelzang Textile, passing through peaceful forest trails and local neighborhoods (approx. 45min)." },
    ],
    afternoon: [
      { icon: 'sight', text: "Arrive at Kelzang Textile, where a mother-and-daughter duo welcome you for an immersive cultural experience. Learn about traditional dyeing and weaving techniques, followed by a Bhutanese cooking lesson using local ingredients." },
      { icon: 'meal', text: "Enjoy a home-style lunch with the family at Kelzang Textile, sharing stories and insights into Bhutanese daily life." },
      { icon: 'sight', text: "Visit Simply Bhutan, a living museum that showcases Bhutanese culture, architecture, and traditions through interactive experiences such as butter tea tasting, archery, and local crafts." },
      { icon: 'sight', text: "Visit Tashichho Dzong, the seat of Bhutan\u2019s government and monastic body, beautifully illuminated in the evening light." },
    ],
    evening: [
      { icon: 'hotel', text: "Return to the hotel to freshen up." },
      { icon: 'meal', text: "You may choose to explore Thimphu town and enjoy local delicacies such as momos, thukpa, or emadatshi at one of the cozy caf\u00e9s or restaurants." },
      { icon: 'sight', text: "Experience a night out at The Grey Area, one of Thimphu\u2019s popular lounges, with live music and a vibrant local atmosphere." },
    ],
    overnight: "Overnight in Thimphu",
    hotel: "Himalayan Keys Forest Resort."
  },
  {
    day: "03",
    title: "Thimphu to",
    subtitle: "Phobjikha Valley",
    approx: "Approx 4.5 hours",
    morning: [
      { icon: 'meal', text: "Breakfast at the hotel." },
      { icon: 'transport', text: "Drive to Phobjikha via Dochula Pass (3,100m)." },
    ],
    afternoon: [
      { icon: 'sight', text: "Stop at Dochula Pass to admire the 108 Druk Wangyal Chortens and panoramic Himalayan views." },
      { icon: 'meal', text: "Lunch en route at a local restaurant." },
      { icon: 'leisure', text: "Arrive in Phobjikha Valley, a glacial valley known for Black-Necked Cranes (seasonal: Oct to Feb)." },
    ],
    evening: [
      { icon: 'hotel', text: "Check in to your hotel." },
      { icon: 'meal', text: "Dinner and relaxation by the fireplace." },
    ],
    overnight: "Overnight in Phobjikha",
    hotel: "Pinewood Resort."
  },
  {
    day: "04",
    title: "Phobjikha",
    subtitle: "to Punakha",
    approx: "Approx 3 hours",
    morning: [
      { icon: 'meal', text: "Breakfast at the hotel." },
      { icon: 'sight', text: "Visit the Black-Necked Crane Information Centre to learn about the conservation of these endangered birds." },
      { icon: 'transport', text: "Depart for Punakha." },
    ],
    afternoon: [
      { icon: 'sight', text: "Stop for lunch en route." },
      { icon: 'sight', text: "Visit Chimi Lhakhang, the fertility temple dedicated to Lama Drukpa Kunley, known as the \u201CDivine Madman.\u201D" },
      { icon: 'hotel', text: "Check in to your hotel in Punakha." },
      { icon: 'sight', text: "Visit Punakha Dzong, one of Bhutan\u2019s most beautiful fortresses, located at the confluence of the Pho Chhu and Mo Chhu rivers." },
    ],
    evening: [
      { icon: 'sight', text: "Walk across the Punakha Suspension Bridge, one of the longest in Bhutan, offering breathtaking views of the valley." },
      { icon: 'meal', text: "Dinner at the hotel." },
    ],
    overnight: "Overnight in Punakha",
    hotel: "Dhensa Resort."
  },
  {
    day: "05",
    title: "Punakha to Paro",
    subtitle: "via Thimphu",
    approx: "Approx 3.5 hours",
    morning: [
      { icon: 'meal', text: "Breakfast at the hotel." },
      { icon: 'sight', text: "Early morning hike to Khamsum Yulley Namgyal Chorten, a temple built to promote peace and harmony, offering panoramic views of the Punakha Valley." },
      { icon: 'transport', text: "Depart for Paro, stopping en route at Lamperi Botanical Park to attend the Lamperi Rhododendron Festival (seasonal: April to May). Enjoy vibrant displays of blooming rhododendrons, local food stalls, traditional music, and cultural performances celebrating Bhutan\u2019s biodiversity." },
    ],
    afternoon: [
      { icon: 'transport', text: "Continue the drive and stop in Thimphu for a riverside picnic-style lunch at The Secret Garden, surrounded by serene natural beauty and the gentle sound of flowing water." },
      { icon: 'transport', text: "Proceed to Paro." },
    ],
    evening: [
      { icon: 'sight', text: "Visit Kyichu Lhakhang, one of Bhutan\u2019s oldest and most sacred temples, symbolizing the introduction of Buddhism to the country." },
      { icon: 'hotel', text: "Check in to your hotel in Paro." },
      { icon: 'meal', text: "Dinner and relaxation near the bonfire, enjoying the crisp mountain air and peaceful surroundings." },
    ],
    overnight: "Overnight in Paro",
    hotel: "Zhiwaling Heritage."
  },
  {
    day: "06",
    title: "Paro: Hike to Tiger\u2019s",
    subtitle: "Nest Monastery and Hot Stone Bath",
    morning: [
      { icon: 'meal', text: "Breakfast at the hotel." },
      { icon: 'transport', text: "Begin the hike to Taktsang Monastery (Tiger\u2019s Nest), perched dramatically on a cliff 900m above the valley floor." },
    ],
    afternoon: [
      { icon: 'sight', text: "Lunch at the cafeteria viewpoint overlooking the monastery." },
      { icon: 'transport', text: "Descend and return to the hotel (leave change of clothes in the vehicle for convenience) or proceed for hot stone bath." },
      { icon: 'sight', text: "Enjoy a rejuvenating traditional Bhutanese hot stone bath, a soothing experience that relaxes muscles after the hike." },
    ],
    evening: [
      { icon: 'meal', text: "Dinner at the hotel." },
    ],
    overnight: "Overnight in Paro",
    hotel: "Zhiwaling Heritage."
  },
  {
    day: "07",
    title: "Paro: Mandala Art Center",
    subtitle: "and Dumtsha Lhakhang",
    morning: [
      { icon: 'meal', text: "Breakfast at the hotel." },
      { icon: 'sight', text: "Visit the Mandala Art Center, where intricate Bhutanese mandala art is created and displayed, offering insight into the country\u2019s spiritual and artistic traditions." },
    ],
    afternoon: [
      { icon: 'sight', text: "Proceed to Dumtsha Lhakhang, a unique temple located in the Paro Valley, known for its ancient murals and serene surroundings." },
      { icon: 'meal', text: "Lunch at a local restaurant." },
      { icon: 'leisure', text: "Leisure time for shopping or caf\u00e9 hopping in Paro town." },
    ],
    evening: [
      { icon: 'hotel', text: "Return to the hotel and prepare for the evening." },
      { icon: 'sight', text: "Participate in a guided meditation session with your host, Kelly Dorji, offering a peaceful and reflective experience to end your Bhutan journey." },
      { icon: 'meal', text: "Farewell dinner." },
    ],
    overnight: "Overnight in Paro",
    hotel: "Zhiwaling Heritage."
  },
  {
    day: "08",
    title: "Departure",
    subtitle: "from Paro",
    morning: [
      { icon: 'meal', text: "Breakfast at the hotel." },
      { icon: 'transport', text: "Transfer to Paro International Airport for departure." },
    ],
    afternoon: [],
    evening: [],
    overnight: null,
    hotel: null,
    farewell: "Tashi Delek, until we meet again!"
  },
];

const ICON_MAP = { meal: IconMeal, transport: IconTransport, sight: IconSight, hotel: IconHotel, leisure: IconLeisure };

function DayActivity({ icon, text }) {
  const Ico = ICON_MAP[icon] || IconSight;
  return (
    <div className="day-activity">
      <Ico />
      <p>{text}</p>
    </div>
  );
}

export default function BhutanJourney() {
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

        /* ── HERO: Full-bleed photo like PDF page 1 ── */
        .bj-hero {
          min-height: 100vh; position: relative; overflow: hidden;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center;
        }
        .bj-hero-bg {
          position: absolute; inset: 0;
          background: url('/assets/hero-bhutan.jpg') center center / cover no-repeat,
            linear-gradient(158deg, #4a6050 0%, #2e3d32 40%, #141e16 100%);
        }
        .bj-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom,
            rgba(0,0,0,0.15) 0%,
            rgba(0,0,0,0.05) 30%,
            rgba(0,0,0,0.2) 70%,
            rgba(0,0,0,0.55) 100%);
        }
        .bj-hero-logo {
          position: absolute; top: 100px; left: 50%; z-index: 3;
          transform: translateX(-50%);
          height: 80px; width: auto;
          filter: brightness(0) invert(1);
        }
        .bj-hero-content {
          position: relative; z-index: 2;
          max-width: 700px; padding: 0 40px;
        }
        .bj-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 600; font-size: clamp(5rem, 14vw, 10rem);
          color: white; line-height: 0.9;
          margin-bottom: 48px;
          text-shadow: 0 4px 40px rgba(0,0,0,0.3);
        }
        .bj-hero-dates {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.2rem, 2.5vw, 1.8rem); font-weight: 300;
          color: rgba(255,255,255,0.85);
          letter-spacing: 0.1em;
          margin-bottom: 40px;
        }
        .bj-hero-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-size: clamp(1rem, 2vw, 1.4rem);
          color: rgba(255,255,255,0.7);
          display: flex; align-items: center; justify-content: center; gap: 12px;
        }
        .bj-hero-credit {
          position: absolute; bottom: 16px; right: 24px; z-index: 3;
          font-family: 'Lato', sans-serif; font-size: 12px;
          color: white; text-shadow: 0 1px 3px rgba(0,0,0,0.5);
        }

        /* ── INVITATION: Sage background like PDF page 2 ── */
        .bj-invite {
          background: #DDE5DF;
          padding: 100px 80px;
          display: grid; grid-template-columns: 0.8fr 1fr;
          gap: 80px; align-items: center;
        }
        .bj-invite-photo {
          position: relative;
        }
        .bj-invite-photo img {
          width: 100%; max-width: 340px; display: block;
          border-radius: 12px 12px 12px 0;
          box-shadow: 0 16px 48px rgba(0,0,0,0.12);
        }
        .bj-invite-photo::before {
          content: ''; position: absolute; top: -8px; left: -8px; right: 8px; bottom: 8px;
          border: 1.5px solid rgba(43,43,43,0.12); border-radius: 14px 14px 14px 0;
          pointer-events: none;
        }
        .bj-invite-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.4rem, 4vw, 3.8rem); font-weight: 600;
          font-style: italic; color: #2B2B2B;
          line-height: 1.15; margin-bottom: 40px;
        }
        .bj-invite-body {
          font-family: 'Lato', sans-serif;
          font-size: 16px; line-height: 1.75; color: #404040;
          margin-bottom: 16px; max-width: 520px;
        }
        .bj-invite-trees {
          display: flex; gap: 8px; margin-top: 40px; opacity: 0.3;
        }

        /* ── KELLY: Clay Rose background like PDF page 3 ── */
        .bj-kelly {
          background: #C9A8A8;
          padding: 100px 80px;
          text-align: center;
        }
        .bj-kelly-photo {
          width: 260px; height: 260px; border-radius: 50%;
          object-fit: cover; display: block; margin: 0 auto 16px;
          border: 6px solid rgba(255,255,255,0.4);
          box-shadow: 0 12px 40px rgba(0,0,0,0.15);
        }
        .bj-kelly-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 3.5vw, 3.2rem); font-weight: 600;
          color: #2B2B2B; line-height: 1.15;
          margin-bottom: 8px;
        }
        .bj-kelly-subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-size: 1.1rem;
          color: #2B2B2B; margin-bottom: 32px;
        }
        .bj-kelly-body {
          font-family: 'Lato', sans-serif;
          font-size: 16px; line-height: 1.75; color: #2B2B2B;
          max-width: 600px; margin: 0 auto;
          text-align: justify;
        }

        /* ── DAY CARDS: matching PDF itinerary pages exactly ── */
        .bj-day {
          position: relative;
          padding: 0;
          margin-bottom: 0;
        }
        /* Day header area: Mist Beige top with day number and title */
        .bj-day-header {
          background: #F2ECE5;
          padding: 60px 80px 32px;
          position: relative;
        }
        .bj-day-num {
          font-family: 'Lato', sans-serif;
          font-size: 14px; font-weight: 400;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: #2B2B2B; margin-bottom: 4px;
        }
        .bj-day-num span {
          color: #C9A8A8; font-weight: 700;
        }
        .bj-day-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 700;
          color: #2B2B2B; line-height: 1.15;
          max-width: 500px;
        }
        .bj-day-approx {
          font-family: 'Lato', sans-serif;
          font-size: 14px; color: #606060;
          margin-top: 8px;
        }
        .bj-day-mountain {
          position: absolute; top: 40px; right: 80px;
        }

        /* Day body: cream/white card with bordered look */
        .bj-day-body {
          background: #F2ECE5;
          padding: 0 80px 60px;
        }
        .bj-day-card {
          background: #FAFAF8;
          border: 1.5px solid rgba(43,43,43,0.08);
          padding: 40px 48px;
          position: relative;
        }
        .bj-day-compass {
          position: absolute; bottom: 12px; right: 12px; opacity: 0.6;
        }

        /* Time sections: Morning / Afternoon / Evening */
        .bj-time-section {
          margin-bottom: 32px;
        }
        .bj-time-section:last-child { margin-bottom: 0; }
        .bj-time-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem; font-weight: 400;
          color: #2B2B2B; margin-bottom: 20px;
        }
        .day-activity {
          display: flex; gap: 14px; align-items: flex-start;
          margin-bottom: 16px;
        }
        .day-activity:last-child { margin-bottom: 0; }
        .day-icon {
          flex-shrink: 0; width: 28px; height: 28px;
          display: flex; align-items: center; justify-content: center;
          margin-top: 1px;
          opacity: 0.55;
        }
        .day-activity p {
          font-family: 'Lato', sans-serif;
          font-size: 16px; line-height: 1.65; color: #404040;
          word-break: normal; overflow-wrap: break-word;
        }

        /* Divider between time sections */
        .bj-time-divider {
          margin: 28px 0;
        }

        /* Overnight footer: Sage green bar like PDF */
        .bj-overnight {
          background: #DDE5DF;
          padding: 24px 80px;
          display: flex; align-items: center; justify-content: center;
          gap: 24px;
        }
        .bj-overnight-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem; font-weight: 600;
          color: #2B2B2B; text-align: center;
        }
        .bj-overnight-trees {
          display: flex; gap: 4px;
        }

        /* Farewell card */
        .bj-farewell {
          background: #F2ECE5;
          padding: 80px;
          text-align: center;
        }
        .bj-farewell-card {
          display: inline-block;
          background: #FAFAF8;
          border: 1.5px solid rgba(43,43,43,0.1);
          border-radius: 8px;
          padding: 40px 48px;
          max-width: 400px;
        }
        .bj-farewell-text {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-size: 1.6rem;
          color: #2B2B2B; line-height: 1.4;
        }

        /* ── INVESTMENT: matching PDF page 12 ── */
        .bj-investment {
          background: #F2ECE5;
          padding: 100px 80px;
        }
        .bj-inv-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 3vw, 2.8rem); font-weight: 400;
          color: #2B2B2B; margin-bottom: 40px;
        }
        .bj-inv-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 0; border: 1.5px solid rgba(43,43,43,0.1);
          background: #FAFAF8; margin-bottom: 48px;
          max-width: 700px;
        }
        .bj-inv-col {
          padding: 32px 40px;
        }
        .bj-inv-col:first-child { border-right: 1.5px solid rgba(43,43,43,0.1); }
        .bj-inv-col-title {
          font-family: 'Lato', sans-serif;
          font-size: 14px; font-weight: 400;
          letter-spacing: 0.1em;
          color: #606060; margin-bottom: 20px;
        }
        .bj-inv-row {
          margin-bottom: 16px;
        }
        .bj-inv-label {
          font-family: 'Lato', sans-serif;
          font-size: 14px; color: #606060;
        }
        .bj-inv-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem; font-weight: 600;
          color: #2B2B2B;
        }
        .bj-inv-price span { font-size: 1rem; font-weight: 400; }

        /* Inclusions grid */
        .bj-inc-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 24px; margin-bottom: 48px;
        }
        .bj-inc-item {
          text-align: center;
        }
        .bj-inc-icon {
          width: 48px; height: 48px; margin: 0 auto 12px;
          opacity: 0.5;
        }
        .bj-inc-label {
          font-family: 'Lato', sans-serif;
          font-size: 14px; color: #404040; line-height: 1.5;
        }

        /* ── CTA: matching PDF page 13 ── */
        .bj-cta {
          background: #F2ECE5;
          padding: 100px 80px;
          text-align: center;
          display: flex; flex-direction: column;
          align-items: center;
        }
        .bj-cta-logo {
          height: 80px; width: auto; margin-bottom: 48px; display: block;
        }
        .bj-cta-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.4rem, 4.5vw, 3.8rem);
          font-weight: 400; font-style: italic;
          color: #2B2B2B; margin-bottom: 40px;
          line-height: 1.25; max-width: 500px;
        }
        .bj-cta-wa {
          display: flex; align-items: center; gap: 14px;
          font-family: 'Lato', sans-serif; font-size: 16px; font-weight: 400;
          color: #2B2B2B; text-decoration: none;
          margin-bottom: 48px;
          padding: 16px 32px;
          border: 1px solid rgba(43,43,43,0.15); border-radius: 4px;
          transition: border-color 0.3s, background 0.3s;
        }
        .bj-cta-wa:hover { border-color: #C9A8A8; background: rgba(201,168,168,0.08); }
        .bj-cta-wa-text {
          display: flex; flex-direction: column; align-items: flex-start;
          font-size: 14px; line-height: 1.5;
        }
        .bj-cta-wa-text strong {
          font-size: 16px; font-weight: 700; letter-spacing: 0.02em;
        }
        .bj-cta-date-bar {
          background: #C9A8A8;
          padding: 32px 64px;
          border-radius: 4px;
          display: flex; align-items: center; justify-content: center; gap: 32px;
        }
        .bj-cta-date-inner { text-align: center; }
        .bj-cta-date-label {
          font-family: 'Lato', sans-serif;
          font-size: 14px; color: rgba(255,255,255,0.75);
          letter-spacing: 0.12em; margin-bottom: 6px;
        }
        .bj-cta-date-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem; font-weight: 600;
          color: white; letter-spacing: 0.02em;
        }
        /* Final quote strip */
        .bj-final-strip {
          position: relative; min-height: 50vh; overflow: hidden;
          display: flex; align-items: center; justify-content: center;
        }
        .bj-final-strip-bg {
          position: absolute; inset: 0;
          background: url('/assets/journey-bhutan.jpg') center / cover no-repeat;
        }
        .bj-final-strip-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.35); }
        .bj-final-quote {
          position: relative; z-index: 1;
          background: rgba(255,255,255,0.92);
          border: 1.5px solid rgba(43,43,43,0.08);
          border-radius: 8px;
          padding: 40px 48px;
          max-width: 400px; text-align: center;
        }
        .bj-final-quote p {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-size: 1.4rem;
          color: #2B2B2B; line-height: 1.4;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .bj-invite { padding: 80px 48px; gap: 48px; }
          .bj-kelly { padding: 80px 48px; }
          .bj-day-header { padding: 48px 48px 24px; }
          .bj-day-body { padding: 0 48px 48px; }
          .bj-overnight { padding: 24px 48px; }
          .bj-investment { padding: 80px 48px; }
          .bj-inc-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .bj-invite { grid-template-columns: 1fr; padding: 60px 32px; gap: 40px; }
          .bj-invite-photo img { max-width: 260px; margin: 0 auto; display: block; }
          .bj-kelly { padding: 60px 32px; }
          .bj-kelly-photo { width: 200px; height: 200px; }
          .bj-day-header { padding: 40px 24px 20px; }
          .bj-day-body { padding: 0 24px 40px; }
          .bj-day-card { padding: 28px 24px; }
          .bj-day-mountain { display: none; }
          .bj-overnight { padding: 20px 24px; }
          .bj-investment { padding: 60px 32px; }
          .bj-inv-grid { grid-template-columns: 1fr; }
          .bj-inv-col:first-child { border-right: none; border-bottom: 1.5px solid rgba(43,43,43,0.1); }
          .bj-inc-grid { grid-template-columns: 1fr 1fr; }
          .bj-cta { padding: 60px 32px; }
          .bj-farewell { padding: 60px 32px; }
        }
      `}</style>

      <div className="grain" aria-hidden="true" />
      <div className="pv-progress" style={{ width: `${progress}%` }} aria-hidden="true" />
      <Nav />
      <WhatsAppButton />

      {/* ══ PAGE 1: Hero ══ */}
      <section className="bj-hero">
        <div className="bj-hero-bg" />
        <div className="bj-hero-overlay" />
        <img src="/assets/Logo-Main.png" alt="PuraVida" className="bj-hero-logo" />
        <div className="bj-hero-content">
          <h1 className="bj-hero-title">Bhutan</h1>
          <p className="bj-hero-dates">April 9 &ndash; 16, 2026</p>
          <p className="bj-hero-tagline">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2"><path d="M8,1 C5,4 3,7 5,10 C6,12 8,13 8,15 C8,13 10,12 11,10 C13,7 11,4 8,1z"/></svg>
            Where stillness finds you
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2"><path d="M8,1 C5,4 3,7 5,10 C6,12 8,13 8,15 C8,13 10,12 11,10 C13,7 11,4 8,1z"/></svg>
          </p>
        </div>
        <span className="bj-hero-credit">Photo: Kelly Dorji</span>
      </section>

      {/* ══ PAGE 2: Invitation from Harsha ══ */}
      <section className="bj-invite">
        <FU>
          <div className="bj-invite-photo">
            <img src="/assets/harsha-portrait.jpg" alt="Harsha" />
          </div>
        </FU>
        <FU d={1}>
          <LeafDivider color="#2B2B2B" width="80%" />
          <h2 className="bj-invite-heading">
            An Invitation<br />From Harsha
          </h2>
          <LeafDivider color="#2B2B2B" width="80%" />
          <p className="bj-invite-body" style={{ marginTop: '32px' }}>
            Bhutan holds a kind of quiet that stays with you long after you return. It asks you to slow down, breathe deeper, and notice the gentle details of life that cities often blur.
          </p>
          <p className="bj-invite-body">
            This journey is crafted for those who want more than travel. It is for those who want presence, connection, and the kind of beauty you feel in your heart. We move slowly. We listen. We walk with people who carry the land in their stories. If this calls to you, I would love for you to join me in Bhutan.
          </p>
          <div className="bj-invite-trees">
            <TreeGlyph size={48} /><TreeGlyph size={56} /><TreeGlyph size={44} />
          </div>
        </FU>
      </section>

      {/* ══ PAGE 3: Walk Bhutan with Kelly Dorji ══ */}
      <section className="bj-kelly">
        <FU>
          <img src="/assets/kelly-dorji.jpg" alt="Kelly Dorji" className="bj-kelly-photo" />
          <LeafDivider color="#2B2B2B" width="60%" />
          <h2 className="bj-kelly-title">Walk Bhutan<br />with Kelly Dorji</h2>
          <LeafDivider color="#2B2B2B" width="60%" />
          <p className="bj-kelly-subtitle">Your cultural bridge.</p>
          <p className="bj-kelly-body">
            Kelly is one of Bhutan's most respected cultural custodians, rooted in Himalayan heritage, art, and spirituality. He brings depth, humour, and a lived understanding of the land that few possess. Walking Bhutan with him feels like being guided by someone who sees both the visible and the unseen. His presence is an experience in itself.
          </p>
        </FU>
      </section>

      {/* ══ PAGES 4-11: Day-by-Day Itinerary ══ */}
      {DAYS.map((day, idx) => (
        <div className="bj-day" key={idx}>
          <FU>
            {/* Day header */}
            <div className="bj-day-header">
              <p className="bj-day-num">DAY- <span>{day.day}</span></p>
              <h2 className="bj-day-title">
                {day.title}
                {day.subtitle && <><br />{day.subtitle}</>}
              </h2>
              {day.approx && <p className="bj-day-approx">({day.approx})</p>}
              <div className="bj-day-mountain"><MountainGlyph size={100} /></div>
              <div style={{ marginTop: '16px' }}><LeafDivider /></div>
            </div>

            {/* Day body card */}
            <div className="bj-day-body">
              <div className="bj-day-card">
                {day.morning.length > 0 && (
                  <div className="bj-time-section">
                    <h3 className="bj-time-heading">Morning</h3>
                    {day.morning.map((a, i) => <DayActivity key={i} icon={a.icon} text={a.text} />)}
                  </div>
                )}

                {day.afternoon.length > 0 && (
                  <>
                    <div className="bj-time-divider"><LeafDivider /></div>
                    <div className="bj-time-section">
                      <h3 className="bj-time-heading">Afternoon</h3>
                      {day.afternoon.map((a, i) => <DayActivity key={i} icon={a.icon} text={a.text} />)}
                    </div>
                  </>
                )}

                {day.evening.length > 0 && (
                  <>
                    <div className="bj-time-divider"><LeafDivider /></div>
                    <div className="bj-time-section">
                      <h3 className="bj-time-heading">Evening</h3>
                      {day.evening.map((a, i) => <DayActivity key={i} icon={a.icon} text={a.text} />)}
                    </div>
                  </>
                )}

                {day.farewell && (
                  <div style={{ textAlign: 'center', padding: '40px 0 20px' }}>
                    <div className="bj-farewell-card" style={{ border: 'none', padding: '20px' }}>
                      <p className="bj-farewell-text">{day.farewell}</p>
                    </div>
                  </div>
                )}

                <div className="bj-day-compass"><CompassGlyph /></div>
              </div>
            </div>

            {/* Overnight footer */}
            {day.overnight && (
              <div className="bj-overnight">
                <div className="bj-overnight-trees"><TreeGlyph size={32} /><TreeGlyph size={36} /></div>
                <div>
                  <p className="bj-overnight-text">{day.overnight} &ndash;</p>
                  <p className="bj-overnight-text">{day.hotel}</p>
                </div>
                <div className="bj-overnight-trees"><TreeGlyph size={36} /><TreeGlyph size={32} /></div>
              </div>
            )}
          </FU>
        </div>
      ))}

      {/* ══ PAGE 12: Investment ══ */}
      <section className="bj-investment">
        <FU>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h2 className="bj-inv-title">Your Investment</h2>
            <div style={{ display: 'flex', gap: '4px' }}><TreeGlyph size={40} /><TreeGlyph size={48} /></div>
          </div>

          <div className="bj-inv-grid">
            <div className="bj-inv-col">
              <p className="bj-inv-col-title">Indian Passport Holders</p>
              <LeafDivider width="100%" />
              <div className="bj-inv-row" style={{ marginTop: '16px' }}>
                <p className="bj-inv-label">Solo Traveler</p>
                <p className="bj-inv-price">AED 13,350</p>
              </div>
              <LeafDivider width="100%" />
              <div className="bj-inv-row" style={{ marginTop: '16px' }}>
                <p className="bj-inv-label">Double Occupancy</p>
                <p className="bj-inv-price">AED 12,100 <span>pp</span></p>
              </div>
            </div>
            <div className="bj-inv-col">
              <p className="bj-inv-col-title">Other Nationalities</p>
              <LeafDivider width="100%" />
              <div className="bj-inv-row" style={{ marginTop: '16px' }}>
                <p className="bj-inv-label">Solo Traveler</p>
                <p className="bj-inv-price">AED 20,500</p>
              </div>
              <LeafDivider width="100%" />
              <div className="bj-inv-row" style={{ marginTop: '16px' }}>
                <p className="bj-inv-label">Double Occupancy</p>
                <p className="bj-inv-price">AED 18,500 <span>pp</span></p>
              </div>
            </div>
          </div>

          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', fontWeight: 400, color: '#2B2B2B', marginBottom: '16px' }}>Cancellations</h3>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '16px', lineHeight: 1.75, color: '#404040', marginBottom: '48px', maxWidth: '600px' }}>
            Payments are refundable up to 4 weeks before departure. Modest deductions may apply when third-party bookings or deposits have been committed.
          </p>

          <LeafDivider />

          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', fontWeight: 400, color: '#2B2B2B', margin: '48px 0 28px' }}>Inclusions</h3>
          <div className="bj-inc-grid">
            {[
              "Boutique hotels (as listed)", "Breakfast daily + selected meals",
              "All ground transportation", "Bhutan visa assistance",
              "Sustainable Development Fee", "All entry fees and guided experiences",
              "Meditation with Kelly", "Traditional Hot Stone Bath"
            ].map((item, i) => (
              <div className="bj-inc-item" key={i}>
                <p className="bj-inc-label">{item}</p>
              </div>
            ))}
          </div>

          <LeafDivider />

          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', fontWeight: 400, color: '#2B2B2B', margin: '48px 0 28px' }}>Exclusions</h3>
          <div className="bj-inc-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {[
              "International flights to/from Paro",
              "Travel insurance",
              "Lunches and dinners (unless specified)"
            ].map((item, i) => (
              <div className="bj-inc-item" key={i}>
                <p className="bj-inc-label">{item}</p>
              </div>
            ))}
          </div>
        </FU>
      </section>

      {/* ══ PAGE 13: CTA ══ */}
      <section className="bj-cta">
        <FU>
          <img src="/assets/Logo-Main.png" alt="PuraVida" className="bj-cta-logo" />
          <h2 className="bj-cta-heading">Your Journey Begins<br />with a Message</h2>
          <a href="https://wa.me/+971562216643" className="bj-cta-wa" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#2B2B2B" strokeWidth="1.5"><path d="M3,21 L4.5,15.5 C3.5,13.8 3,11.9 3,10 C3,5 7,1 12,1 C17,1 21,5 21,10 C21,15 17,19 12,19 C10.1,19 8.3,18.5 6.7,17.5 L3,21z" /><path d="M8,12 C8,12 9.5,14 12,14 C14.5,14 16,12 16,12" /></svg>
            WhatsApp Harsha<br />+971 56 2216643
          </a>
          <div className="bj-cta-date-bar">
            <div className="bj-overnight-trees"><TreeGlyph size={28} color="#FAFAF8" /><TreeGlyph size={32} color="#FAFAF8" /></div>
            <div>
              <p className="bj-cta-date-label">Join us by</p>
              <p className="bj-cta-date-val">March 01<sup>st</sup> 2026</p>
            </div>
            <div className="bj-overnight-trees"><TreeGlyph size={32} color="#FAFAF8" /><TreeGlyph size={28} color="#FAFAF8" /></div>
          </div>
        </FU>
      </section>

      {/* Final quote with Tiger's Nest background */}
      <div className="bj-final-strip">
        <div className="bj-final-strip-bg" />
        <div className="bj-final-strip-overlay" />
        <FU>
          <div className="bj-final-quote">
            <p>If Bhutan is calling,<br />this is your moment<br />to answer.</p>
          </div>
        </FU>
      </div>

      <Footer />
    </>
  );
}