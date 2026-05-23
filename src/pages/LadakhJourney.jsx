import { useState, useEffect, useRef } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

/** URL-encoded for reliable fetch (folder names contain spaces). */
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

/* ─────────────────────────────────────────
   INCLUSIONS & EXCLUSIONS per PDF page 12
───────────────────────────────────────── */
const INCLUSIONS = [
  { icon: 'hotel',      label: 'Accommodation inclusive of Breakfast and Dinner' },
  { icon: 'transport',  label: 'Transport with Guide' },
  { icon: 'location',   label: 'Entrance fees and permits' },
  { icon: 'culture',    label: 'Amchi Experience with lunch' },
  { icon: 'meal',       label: 'Artisanal Alchemy Lunch' },
];

const EXCLUSIONS = [
  { icon: 'transport',  label: 'Flights' },
  { icon: 'experience', label: 'Gratuities' },
  { icon: 'meal',       label: 'Meals not specified' },
  { icon: 'meal',       label: 'Beverages' },
  { icon: 'experience', label: 'Additional Costs (unforeseen circumstances)' },
  { icon: 'wellness',   label: 'Medical Expenses' },
];

const DAYS = [
  {
    day: "01", title: "Leh | Arrival and", subtitle: "Acclimatization",
    morning: [
      { icon: 'transport', text: "Our journey begins as we land at Leh Airport, set amidst the towering Himalayas. A private transfer shall bring us to our hotel, where a traditional Ladakhi welcome with warm herbal tea awaits." },
    ],
    afternoon: [
      { icon: 'leisure', text: "The afternoon is for rest and gentle acclimatisation to the high altitude. Settle in room with its sweeping mountain views and enjoy lunch at Dolkhar Resort." },
    ],
    evening: [
      { icon: 'leisure', text: "As dusk settles, we take a slow, mindful walk through the property grounds. Dinner will be served at the property.", note: "The light at this hour turns the mountains gold. Let your breath find its rhythm at altitude." },
    ],
    overnight: "Leh", hotel: "Dolkhar Resort", farewell: null,
  },
  {
    day: "02", title: "Leh | Shanti Stupa", subtitle: "",
    morning: [
      { icon: 'sight', text: "If up early we may greet the dawn with a visit to the Shanti Stupa, perched high above the town. Here, one experiences a moment of profound peace and meditation as the valley awakens with the first light.", note: "The valley awakens below you in slow folds of light. The silence here is its own teaching." },
    ],
    afternoon: [
      { icon: 'sight', text: "Explore Leh's rich history with a visit to the ancient Leh Palace, which overlooks the Old Town. Afterward, wander through the town's narrow, winding lanes, past mud-brick homes and fluttering prayer flags. Observe the coexistence of mosque, temples, chortens and family shrines. Leh Old Town reveals the city's original rhythm \u2013 intimate, layered and lived in, far removed from the pace of the modern market streets. Lunch is at your discretion at the market or back at the property." },
      { icon: 'wellness', text: "We continue to honour the altitude today. Rest is part of the journey. Listen to your body and move gently." },
    ],
    evening: [
      { icon: 'meal', text: "Dinner at Bon Appetit, Leh. This restaurant is a dream project made real by two women who returned from the city in 2009 with an idea. The minimal look of the decor blends Ladakhi charm with contemporary elegance. All ingredients are fresh and locally sourced. This is my favourite restaurant in the world. The stars, the music, the bonfire, and the hostess who I am convinced will one day hire me so I can stay in Ladakh." },
    ],
    overnight: "Leh", hotel: "Dolkhar Resort", farewell: null,
  },
  {
    day: "03", title: "The Artistic Soul of", subtitle: "Sham Valley",
    morning: [
      { icon: 'transport', text: "After breakfast at Dolkhar Resort, enjoy a scenic drive along the Indus River to the village of Alchi. Here we shall visit the Alchi Monastery, an artistic treasure known for its beautifully preserved, thousand-year-old murals.", note: "The murals are a thousand years old. The pigments still hold their colour, the devotion still hangs in the air." },
    ],
    afternoon: [
      { icon: 'meal', text: "Experience authentic Ladakhi cuisine, from thukpa and momos to khambir, prepared with fresh local ingredients. Cooked in an open, women-led kitchen, it offers a warm, cultural, and home-style dining experience. Alchi Kitchen is a cozy stop just steps from the monastery, blending food, tradition, and village." },
      { icon: 'transport', text: "A short drive then takes us to our riverside retreat for the night, where we shall spend the afternoon in quiet reflection or on a gentle village walk." },
      { icon: 'hotel', text: "Uley Ethnic Resort \u2013 Nestled on the banks of the Indus River, this charming resort blends rustic Ladakhi cottages with serene gardens and Himalayan views. A perfect retreat for relaxation, culture, and authentic Ladakhi charm." },
    ],
    evening: [
      { icon: 'meal', text: "Dinner will be served at our resort, surrounded by apricot gardens and the soothing sounds of the Indus." },
    ],
    overnight: "Uley", hotel: "Uley Ethnic Resort", farewell: null,
  },
  {
    day: "04", title: "Moonscapes and Mountain", subtitle: "Wisdom: Temisgam",
    morning: [
      { icon: 'transport', text: "After breakfast we drive to Lamayuru Monastery (approximately 1 hour 30 minutes). This is one of the oldest and most spectacular monasteries in Ladakh. The journey itself is mesmerising with dramatic mountain landscapes and winding Himalayan roads." },
      { icon: 'sight', text: "Perched dramatically on a rocky hill, Lamayuru Monastery (Yuru Gompa) dates back to the 11th Century and belongs to the Drikung Kagyu lineage of Tibetan Buddhism. We shall spin prayer wheels and enjoy panoramic valley views." },
      { icon: 'sight', text: "Just below the monastery lies the famous Moonland landscape \u2013 a surreal terrain of eroded clay hills that resemble the surface of the moon. The contrast of golden earth formations against the blue sky creates an unforgettable sight." },
    ],
    afternoon: [
      { icon: 'culture', text: "After soaking in the beauty of Lamayuru, we drive to Nurla (approximately 50 minutes) for a traditional warm Ladakhi lunch and some time to relax before our afternoon session with Amchi Tsewang Smanla. Sowa Rigpa \u2013 is the traditional Tibetan Healing System. During our interactive session Amchi Tsewang Smanla shall share insights about the philosophy of Sowa Rigpa, balance of the 3 humors (Lung, Tripa, Beken), medicinal herbs found in the Himalayas, traditional healing methods and lifestyle practices. Our lunch venue is with the Amchi and his family in Nurla.", note: "He takes your wrist gently between his fingers and listens. A diagnosis without instruments. A reading of you that is older than medicine as we know it." },
      { icon: 'transport', text: "We bid our byes to the Amchi and drive approximately 30 minutes to arrive at Temisgam and check in to the TIH Namra Village House. A serene village retreat offering simple, comfortable cottages with stunning mountain views." },
    ],
    evening: [
      { icon: 'culture', text: "After settling into our charming hotel, our evening includes a hands-on Ladakhi cooking session using seasonal produce followed by local herbal or butter tea." },
    ],
    overnight: "Temisgam", hotel: "TIH Namra Village", farewell: null,
  },
  {
    day: "05", title: "Temisgam to Thiksey | Inner", subtitle: "Stillness & Himalayan Silence",
    morning: [
      { icon: 'transport', text: "After breakfast we drive approximately 3 hours to Thiksey village. A soulful village along the Indus, where traditional Ladakhi homes sit against a backdrop of sweeping Himalayan vistas. Life here unfolds without urgency, shaped by land, lineage and ritual. Anchored by the majestic Thiksey Monastery, it offers a beautiful blend of spirituality, culture, and slow village life." },
      { icon: 'sight', text: "Perfect for immersive moments \u2013 morning prayers, gentle walks, and an intimate connection with Ladakh's living heritage. We shall pause for lunch in the village." },
    ],
    afternoon: [
      { icon: 'leisure', text: "Afternoon is unstructured time for rest. Or walks in the village around our home for the night, Dakpa House. A charming, family-run retreat built in the style of an ancestral Ladakhi home, using local materials and traditional craftsmanship." },
      { icon: 'hotel', text: "Set amidst orchards and gardens by the Indus, it offers home-style meals, warm hospitality, and a deeply personal cultural experience." },
    ],
    evening: [
      { icon: 'meal', text: "Early Dinner at Dakpa House. And no other plan." },
    ],
    overnight: "Thiksey", hotel: "Dakpa House", farewell: null,
  },
  {
    day: "06", title: "Monastic Dawn and Hemis", subtitle: "",
    morning: [
      { icon: 'culture', text: "Before sunrise, we will take part in the sacred morning puja at Thiksey Monastery. The deep chanting of monks and the resonant call of horns create a powerful and unforgettable spiritual experience. The rhythmic beat of drums and cymbals, butter lamps glowing softly in the prayer hall....let it settle into your body. This is what the monks do every day. A rhythm of devotion, unchanged. We shall sit in the prayer halls with the monks absorbing sights, sounds and incense fragrances in meditative silence.", note: "The deep chanting of monks vibrates in your chest before it reaches your ears. This rhythm has not changed in centuries." },
      { icon: 'sight', text: "Then, let us return to our guesthouse for a slow breakfast before driving to Hemis, Ladakh's largest monastery. The visit focuses on observing daily rituals, architecture, and silence rather than simply moving through it as a landmark. Observation over explanation is the idea." },
    ],
    afternoon: [
      { icon: 'meal', text: "Lunch along the way someplace. And onto our final destination, a beautiful luxury camp set in a grove of poplar trees." },
    ],
    evening: [
      { icon: 'meal', text: "Enjoy a memorable dinner experience at the hotel." },
    ],
    overnight: "Ayu Saboo", hotel: "Ladakh Sarai", farewell: null,
  },
  {
    day: "07", title: "Royal Heritage | Shey Palace,", subtitle: "Stok Palace & Leisure in Leh",
    morning: [
      { icon: 'sight', text: "After breakfast, we delve into Ladakh's royal past with a visit to Shey Palace, the former summer capital of Ladakh's Namgyal dynasty. It houses a towering copper-gilded statue of Shakyamuni Buddha, reflecting the deep Buddhist heritage of the region." },
      { icon: 'sight', text: "We then continue to Stok Palace, the current residence of the Ladakh Royal family, where a museum offers a fascinating glimpse into the region's heritage. We shall see Thanka paintings and ancient weaponry, stunning views of the Stok Kangri range, and be fascinated with the history revealed to us by our special guide Kunzes Angmo." },
    ],
    afternoon: [
      { icon: 'meal', text: "Artisanal Alchemy \u2013 Ladakhi Lunch by Chef Kunzes Angmo. Kunzes Angmo is a visionary Ladakhi chef who revives ancestral recipes through a deeply personal, farm-to-table philosophy.", note: "She cooks the way she speaks: slowly, with reverence for ingredient and lineage. Each dish is a story she has chosen not to let disappear." },
      { icon: 'culture', text: "She shall be our host this afternoon talking us through the museum followed by demonstrating her craft celebrating local ingredients, slow cooking, and the soulful storytelling of Ladakh's culinary heritage. Our lunch venue is the private \u201cZabskhang\u201d dining hall of the 200-year-old Stok Palace." },
    ],
    evening: [
      { icon: 'meal', text: "Our last dinner at the property as we bid farewell to the Land of High Passes. We shall gather one last time around the bonfire overlooking the Indus Valley. I invite you to share what you are carrying, what has shifted, or what you intend to hold onto as we close our trip in a meaningful way." },
    ],
    overnight: "Ayu Saboo", hotel: "Ladakh Sarai", farewell: null,
  },
  {
    day: "08", title: "Departure", subtitle: "",
    morning: [
      { icon: 'transport', text: "Post breakfast, our guide shall escort us to the airport according to our departure times." },
      { icon: 'sight', text: "As we collect our thoughts and descend to sea level, new sights and sounds shall greet us. Retaining the stillness within, is what I hope we have all achieved." },
    ],
    afternoon: [], evening: [],
    overnight: null, hotel: null,
    farewell: "\u201CJulley Ladakh...\nsems nang yod.\u201D",
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
          position: absolute; bottom: 140px; left: 50%; transform: translateX(-50%);
          z-index: 2;
          font-family: 'Lato', sans-serif;
          font-size: clamp(1.1rem, 2.2vw, 1.5rem); font-weight: 400;
          color: rgba(255,255,255,0.9); letter-spacing: 0.08em;
          text-align: center; line-height: 1.5;
        }
        .lk-hero-dates sup {
          font-size: 0.65em; vertical-align: super;
        }
        .lk-hero-tagline {
          position: absolute; bottom: 36px; left: 50%; transform: translateX(-50%);
          z-index: 2;
          font-family: 'Lora', serif; font-style: italic;
          font-size: clamp(20px, 2.8vw, 28px); line-height: 1.4;
          color: #FFFFFF; letter-spacing: 0.02em;
          margin: 0;
          display: inline-grid;
          grid-template-columns: auto auto auto;
          grid-template-rows: auto auto;
          align-items: center; justify-items: center;
          column-gap: 14px; row-gap: 0;
        }
        .lk-tagline-text {
          grid-column: 2; grid-row: 1 / span 2;
          text-align: center; white-space: nowrap;
        }
        .lk-tagline-orn {
          width: clamp(16px, 1.8vw, 22px);
          height: auto; flex-shrink: 0;
          filter: brightness(0) invert(1);
        }
        .lk-tagline-orn-left { grid-column: 1; grid-row: 1; align-self: start; }
        .lk-tagline-orn-right { grid-column: 3; grid-row: 2; align-self: end; }

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

        /* ── WALK LADAKH WITH JUMA MALIK (Clay rose panel — layout per brand mock) ── */
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
          padding: 56px 64px; max-width: 420px; margin: 0 auto;
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
          font-size: 1.6rem; color: #333333; line-height: 1.4;
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
        .lk-farewell-mountain-sunset {
          width: 100%;
          max-width: 720px !important;
          height: auto;
          opacity: 0.85;
          display: block;
        }
        @media (max-width: 768px) {
          .lk-farewell-mountain-sunset { max-width: 92vw !important; }
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

        /* Inclusions/Exclusions — icon grid */
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
          display: inline-block;
          font-family: 'Lato', sans-serif; font-size: 16px; font-weight: 700;
          color: #333333; background: #D9A6A1;
          text-decoration: none; margin-bottom: 48px;
          padding: 18px 44px; border-radius: 4px;
          transition: background 0.35s, color 0.35s;
        }
        .lk-cta-wa:hover { background: #c08e88; color: #FFFFFF; }
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
        .lk-cta-date-part {
          font-size: 1.1rem; font-weight: 400;
        }
        .lk-cta-date-big {
          font-size: 2.2rem; font-weight: 700; line-height: 1;
        }
        .lk-cta-date-big sup {
          font-size: 0.5em; vertical-align: super;
        }
        .lk-cta-date-sep {
          font-size: 1.4rem; opacity: 0.5; font-weight: 300;
        }

        /* ── FINAL QUOTE ── */
        .lk-final-strip { position: relative; min-height: 50vh; overflow: hidden; display: flex; align-items: center; justify-content: center; }
        .lk-final-strip-bg { position: absolute; inset: 0; background: url('/assets/journey-ladakh.jpg') center / cover no-repeat; }
        .lk-final-strip-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.10); }
        .lk-final-quote {
          position: relative; z-index: 1; max-width: 260px; text-align: center;
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

        /* ── RESPONSIVE ── */
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
          .lk-hero-dates { bottom: 120px; }
          .lk-final-quote p { font-size: 1.25rem; }
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
          <h1 className="lk-hero-title">Ladakh</h1>
        </div>
        <p className="lk-hero-dates">
          September 25 to October 2, 2026
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
            Some places claim you the moment you arrive. Ladakh claimed me in 2010.
          </p>
          <p className="lk-invite-body">
            I have been returning ever since. At nearly 3,500 metres, the mountains are not a backdrop, they are a presence. Ancient, indifferent to everything modern life considers urgent. Monasteries cling to cliffsides as they have for centuries. The light here is unlike anything else on earth.
          </p>
          <p className="lk-invite-body">This is where clarity returns.</p>
          <p className="lk-invite-body">
            I am taking a small, carefully chosen group of travellers here. Unhurried. Personal. Deeply rooted in place.
          </p>
          <p className="lk-invite-body">If this speaks to you, I would love to tell you more.</p>
        </FU>
        <div className="lk-invite-trees">
          <Glyph name="Trees" variant="White" size={160} opacity={0.85} />
        </div>
      </section>

      {/* ══ WALK LADAKH WITH JUMA MALIK ══ */}
      <section className="lk-guide">
        <FU>
          <div className="lk-guide-column">
            <div className="lk-guide-photo-wrap">
              <img src="/assets/juma-malik.jpg" alt="Juma Malik" className="lk-guide-img" />
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
                <span className="lk-guide-title-top">Walk Ladakh</span>
                <span className="lk-guide-title-bottom">with Juma Malik</span>
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
                Born and raised in Leh, Juma Malik is Ladakh &ndash; not just a guide who knows it. His intimate understanding of the region's high-altitude terrain, ancient monasteries, nomadic communities and shifting mountain seasons comes from a lifetime of living it. No itinerary he crafts is borrowed from a brochure; every route reflects genuine local knowledge passed down through generations.
              </p>
              <p className="lk-guide-body">
                As a certified trekking specialist, Juma prioritises safety and reliability above all &ndash; ensuring every PuraVida guest is in trusted hands from arrival to farewell. His warmth, cultural sensitivity and unwavering commitment to exceptional experiences make him an ideal local partner for travellers seeking something far deeper than a destination.
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

            {/* Farewell or overnight */}
            {day.farewell ? (
              <div className="lk-farewell-wrap">
                <div className="lk-farewell-card">
                  <div className="lk-farewell-frame" aria-hidden="true">
                    <img src="/assets/Puravida_Quote-Frame-2-20260405T104951Z-3-001/Puravida_Quote-Frame-2/Frame.png" alt="" />
                  </div>
                  <p className="lk-farewell-text">{day.farewell}</p>
                </div>
                <div className="lk-farewell-deco">
                  <img
                    src="/assets/Mountain-Sunset.png"
                    alt="" aria-hidden="true"
                    className="lk-farewell-mountain-sunset"
                  />
                </div>
              </div>
            ) : day.overnight ? (
              <>
                <div className="lk-overnight">
                  <div className="lk-overnight-tree-divider">
                    <img
                      src="/assets/05. GRAPHIC ELEMENTS/Dividers/Tree-Divider.png"
                      alt="" aria-hidden="true"
                    />
                    <p className="lk-overnight-text">Overnight in {day.overnight} &ndash;<br />{day.hotel}.</p>
                  </div>
                </div>
              </>
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
            Minimum 8 Travelers Required
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
              <p className="lk-inv-col-title">Double Occupancy (Twin Sharing)</p>
              <Divider width={180} opacity={0.3} />
              <div style={{ marginTop: 16 }}>
                <div className="lk-inv-price-row">
                  <p className="lk-inv-price">INR 1,65,000 <span>per person</span></p>
                </div>
                <div className="lk-inv-price-row">
                  <p className="lk-inv-price">AED 7,250 <span>per person</span></p>
                </div>
              </div>
            </div>
            <div className="lk-inv-col">
              <p className="lk-inv-col-title">Single Occupancy</p>
              <Divider width={180} opacity={0.3} />
              <div style={{ marginTop: 16 }}>
                <div className="lk-inv-price-row">
                  <p className="lk-inv-price">INR 1,98,000</p>
                </div>
                <div className="lk-inv-price-row">
                  <p className="lk-inv-price">AED 8,700</p>
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
          <div className="lk-icon-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
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
        <div className="lk-cta-circle lk-cta-circle--pink-lg" />
        <div className="lk-cta-circle lk-cta-circle--pink-sm" />
        <div className="lk-cta-circle lk-cta-circle--sage-lg" />
        <div className="lk-cta-circle lk-cta-circle--sage-sm" />
        <div className="lk-cta-leaf lk-cta-leaf--left"><Glyph name="Trees" variant="Sage" size={32} opacity={1} /></div>
        <div className="lk-cta-leaf lk-cta-leaf--right"><Glyph name="Trees" variant="Sage" size={28} opacity={1} /></div>
        <FU>
          <h2 className="lk-cta-heading">Your Journey Begins<br />with a Message</h2>
          <a href="https://wa.me/+971562216643?text=Hello%20Harsha%2C%20I%20am%20interested%20in%20the%20Ladakh%20journey%20and%20would%20love%20to%20learn%20more." className="lk-cta-wa" target="_blank" rel="noopener noreferrer">
            Begin a conversation
          </a>
          <div className="lk-cta-date-bar">
            <Glyph name="Trees" variant="White" size={48} opacity={0.6} />
            <div style={{ textAlign: 'center' }}>
              <p className="lk-cta-date-label">Join us by</p>
              <div className="lk-cta-date-val">
                <span className="lk-cta-date-part">August</span>
                <span className="lk-cta-date-sep">|</span>
                <span className="lk-cta-date-big">20<sup>th</sup></span>
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
            <p>{"\u201C"}Ladakh does not let you leave, and never lets you forget.{"\u201D"}</p>
          </div>
        </FU>
      </div>

      <Footer />
    </>
  );
}
