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

const DAYS = [
  {
    day: "01", title: "Arrival in Tokyo", subtitle: "",
    morning: [
      { icon: 'transport', text: "Arrival at Haneda/Narita International Airport.", note: "Evening arrival · private transfer to Shinagawa." },
    ],
    afternoon: [
      { icon: 'hotel', text: "Grand Prince Hotel Shin Takanawa.", note: "Shinagawa — settle in and refresh." },
    ],
    evening: [
      { icon: 'meal', text: "Late Dinner at Gonpachi — Nishi-Azabu. One of Tokyo's most iconic izakaya restaurants, Gonpachi is a lively multi-storey dining hall with an exposed timber interior. Robata grill, yakitori, and izakaya classics — open till late." },
    ],
    overnight: "Tokyo", hotel: "Grand Prince Hotel Shin Takanawa", farewell: null,
  },
  {
    day: "02", title: "Asakusa · Ginza ·", subtitle: "Omakase Sushi",
    morning: [
      { icon: 'sight', text: "Kimono Fitting — Asakusa. Dress in a traditional kimono for approximately one hour, with professional assistance for the intricate layering and tying. The Asakusa streets — lined with lanterns and traditional architecture — provide the perfect backdrop for memorable photos." },
      { icon: 'sight', text: "Sensoji Temple. Tokyo's oldest Buddhist temple, founded in 628 AD, Sensoji is a magnificent vermillion structure dedicated to the goddess Kannon. Pass through the iconic Kaminarimon (Thunder Gate) and its enormous hanging lantern, then explore the Nakamise shopping street lined with traditional snacks and crafts." },
    ],
    afternoon: [
      { icon: 'transport', text: "Sumida River Boat Ride. Board a traditional water bus from Asakusa pier for a scenic cruise along the Sumida River toward the waterfront. The journey offers views of Tokyo's bridges, the Tokyo Skytree, and the city's evolving skyline." },
      { icon: 'meal', text: "Sazanka — The Okura Tokyo. Teppanyaki dining at one of Tokyo's most prestigious hotels. Chefs prepare premium wagyu beef, seafood, and seasonal vegetables on iron griddles directly before you — a theatrical and delicious experience." },
      { icon: 'sight', text: "Ginza. Tokyo's most glamorous shopping district, Ginza is home to flagship stores for every major luxury house alongside iconic Japanese brands. Ginza Six — the district's crown jewel — houses over 240 boutiques across six floors, with a rooftop garden and exceptional cafes for a tea break." },
    ],
    evening: [
      { icon: 'meal', text: "Dinner — Omakase Sushi. Omakase (おまかせ, 'I'll leave it to you') is the pinnacle of sushi dining. The chef selects the day's finest seasonal fish and prepares each piece individually at the counter. Expect 15 to 20 courses of meticulously crafted nigiri, often including tuna, sea urchin, and wagyu." },
      { icon: 'meal', text: "New York Bar — Park Hyatt Tokyo (52F). Immortalised in Sofia Coppola's Lost in Translation, the New York Bar atop the Park Hyatt offers jazz, signature cocktails, and a breathtaking floor-to-ceiling panorama of Tokyo at night." },
    ],
    overnight: "Tokyo", hotel: "Grand Prince Hotel Shin Takanawa", farewell: null,
  },
  {
    day: "03", title: "Drive to Nikkō ·", subtitle: "Tōshōgū Shrine",
    morning: [
      { icon: 'transport', text: "Drive from Tokyo to Nikkō. Approximately 2.5 hour scenic drive north through Tochigi Prefecture, passing rice paddies, mountain passes and cedar forests as the city gives way to highland nature." },
      { icon: 'hotel', text: "Check in at The Ritz-Carlton, Nikkō. Settle into your lakeside room with views over Lake Chūzenji and the sacred Mount Nantai." },
    ],
    afternoon: [
      { icon: 'meal', text: "Light bite at the hotel. A relaxed lunch at the Ritz before the afternoon excursion." },
      { icon: 'sight', text: "Tōshōgū Shrine — Nikkō. A UNESCO World Heritage Site of extraordinary ornate grandeur, Tōshōgū is the mausoleum of Tokugawa Ieyasu, the founder of the Edo shogunate. Built in the early 17th century and decorated with intricate carvings, gold leaf and vivid colours, the complex includes the famous Yōmeimon Gate — nicknamed the 'Gate of Sunsets' as one could spend a whole day admiring its 508 carved figures. The iconic 'Three Wise Monkeys' carving (see no evil, hear no evil, speak no evil) is also found here." },
      { icon: 'hotel', text: "Return to The Ritz. Afternoon tea and time to explore the extraordinary lakeside property, spa facilities, and the Ritz's private onsen — the first branded Ritz-Carlton hot spring in the world." },
    ],
    evening: [
      { icon: 'meal', text: "Kaiseki Dinner at The Ritz-Carlton. Kaiseki (懐石) is Japan's most refined culinary tradition — an elaborate multi-course meal rooted in the aesthetics of the tea ceremony. Each course is a work of art: small, seasonal, and perfectly balanced. The Ritz's Japanese restaurant draws from local Tochigi producers." },
    ],
    overnight: "Nikkō", hotel: "The Ritz-Carlton", farewell: null,
  },
  {
    day: "04", title: "Kegon Falls · Lake Chūzenji ·", subtitle: "Shinkyo Bridge",
    morning: [
      { icon: 'sight', text: "Kegon Falls. One of Japan's three great waterfalls, Kegon plunges 97 metres from Lake Chūzenji — formed by lava from a volcanic eruption 20,000 years ago — into a dramatic gorge below. In November, the surrounding maple trees blaze in crimson and gold, making this one of the most photographed natural sites in Japan." },
    ],
    afternoon: [
      { icon: 'sight', text: "Lake Chūzenji Boat Ride. Japan's highest freshwater lake sits at 1,269 metres above sea level, cradled by the volcanic peaks of Mount Nantai. A gentle boat cruise reveals the full panorama of the lake's dramatic highland setting and forested shores in autumn colour." },
      { icon: 'meal', text: "Light Bite on the Pier. Casual lakeside dining with mountain views — local soba, tempura, or grilled fish." },
      { icon: 'sight', text: "Shinkyo Sacred Bridge. The bright vermillion Shinkyo Bridge spans the Daiya River at the entrance to Nikkō's sacred precinct. According to legend, the Buddhist monk Shodo Shonin was carried across the river here by two giant serpents sent by a deity when he came to found Nikkō's temples in 766 AD. The bridge is considered one of Japan's three finest." },
      { icon: 'wellness', text: "Return to The Ritz — Onsen. 30 minute drive back to the hotel. Soak in the Ritz's natural mineral onsen baths — fed from the Yumoto hot springs, used for over 1,200 years. The open-air bath offers views of the mountain landscape." },
    ],
    evening: [
      { icon: 'meal', text: "Western Cuisine — The Ritz Lakehouse. The Lakehouse restaurant offers a refined international menu featuring grilled fish and beef alongside pizza, pasta, and seasonal produce from the fields of Tochigi." },
      { icon: 'meal', text: "The Bar @ The Ritz (Optional). Conclude the evening with cocktails and Japanese whisky at the Ritz's intimate bar, featuring a curated selection of international and domestic spirits." },
    ],
    overnight: "Nikkō", hotel: "The Ritz-Carlton", farewell: null,
  },
  {
    day: "05", title: "Drive to Matsumoto ·", subtitle: "Ryokan Arrival",
    morning: [
      { icon: 'transport', text: "Drive from Nikkō to Matsumoto. A scenic approximately 4-hour drive through the Japanese Alps, passing through the valleys and mountain terrain of central Honshu. A light lunch stop is planned en route." },
    ],
    afternoon: [
      { icon: 'location', text: "Matsumoto. Nestled in a valley at 590 metres elevation, Matsumoto is a charming castle town in the Northern Alps (Hida Mountains). The city is known for its pristine mountain air, traditional crafts, and the best-preserved original castle in Japan." },
      { icon: 'culture', text: "Ryokan — Traditional Japanese Inn. On arrival, exchange your shoes for indoor slippers at the entrance, and change into the provided yukata robe. Ryokan etiquette is part of the experience: communal baths (onsen) are used before dinner, meals are often served in-room, and the futon is laid out on tatami mats for sleeping." },
      { icon: 'wellness', text: "Onsen — Hot Spring Bath. Soak in the ryokan's thermal mineral baths. The Matsumoto area's waters are known for their health properties." },
    ],
    evening: [
      { icon: 'meal', text: "Dinner at the Ryokan. A traditional multi-course dinner served in the dining room or in-room, featuring seasonal local ingredients — mountain vegetables (sansai), Hida beef, freshwater fish, and foraged mushrooms." },
    ],
    overnight: "Matsumoto", hotel: "Traditional Japanese Inn", farewell: null,
  },
  {
    day: "06", title: "Matsumoto Castle ·", subtitle: "Shirakawa-gō · Okuhida",
    morning: [
      { icon: 'sight', text: "Matsumoto Castle — 'Crow Castle'. Japan's oldest surviving original castle (1504), nicknamed 'Crow Castle' for its striking black exterior. Unlike the reconstructed castles found elsewhere in Japan, Matsumoto retains its original 16th-century wooden structure with six floors and three turrets. The interior displays an outstanding collection of samurai armour, firearms, and historical artefacts. The castle is reflected magnificently in the surrounding moat." },
      { icon: 'sight', text: "Matsumoto City Museum of Art. A world-class contemporary art museum most famous for its connection to Yayoi Kusama, the visionary avant-garde artist born in Matsumoto in 1929. The museum entrance is marked by her iconic giant polka-dot pumpkin sculptures and infinity room installations. Kusama's obsessive dot patterns, vivid colours, and surreal environments have made her one of the most celebrated living artists in the world." },
    ],
    afternoon: [
      { icon: 'meal', text: "Bento Box — Japanese Cuisine. A traditional bento box of seasonal Japanese dishes before the drive." },
      { icon: 'transport', text: "Drive to Shirakawa-gō. A scenic 2.5-hour journey through the steep Shokawa Valley, winding through some of Japan's most dramatic mountain landscapes." },
      { icon: 'sight', text: "Shirakawa-gō Village. A UNESCO World Heritage village of extraordinary beauty, Shirakawa-gō is famous for its Gassho-zukuri farmhouses — whose massive steeply-pitched thatched roofs (designed to withstand heavy mountain snowfall) resemble hands pressed together in prayer (gassho). The largest farmhouses are four to five storeys tall. In November, the village and surrounding rice paddies take on stunning autumn tones. Browse the many artisan shops, taste local sake and Hida beef dishes, and explore the preserved farmsteads." },
    ],
    evening: [
      { icon: 'transport', text: "Drive to Okuhida. One hour drive through the Hida mountains to the remote hot spring village of Okuhida." },
      { icon: 'hotel', text: "Okuhida Onsen Ryokan. Check into your mountain ryokan in one of Japan's finest onsen resort areas — located at the foot of the Northern Alps, near Kamikochi." },
      { icon: 'meal', text: "Kaiseki / À La Carte — at the Ryokan. A seasonal Japanese dinner featuring Hida specialities." },
    ],
    overnight: "Takayama", hotel: "Okuhida Onsen Ryokan", farewell: null,
  },
  {
    day: "07", title: "Shinhotaka Ropeway ·", subtitle: "Takayama · Kyoto",
    morning: [
      { icon: 'wellness', text: "Rotemburo — Open-Air Onsen (Optional). An early morning soak in an outdoor rotemburo (open-air hot spring bath) is one of Japan's most serene experiences — steam rising against crisp mountain air, surrounded by forested peaks." },
      { icon: 'meal', text: "Breakfast at the Ryokan. Traditional Japanese breakfast — grilled fish, miso soup, pickles, rice and egg." },
      { icon: 'transport', text: "Shinhotaka Ropeway — Northern Alps. A 30-minute drive to one of Japan's most spectacular cable car experiences. The Shinhotaka Nishihotaka Ropeway — Japan's only double-decker gondola — ascends 2,156 metres through the Northern Alps to near the summit of Nishihotaka-dake. On clear days, the panoramic views stretch across the entire Hida mountain range including the iconic peaks of the Japan Alps. The summit has café facilities and photo opportunities." },
    ],
    afternoon: [
      { icon: 'transport', text: "Drive to Takayama. 1.5-hour drive to the beautifully preserved Edo-period town." },
      { icon: 'meal', text: "Lunch — Hida Soba, Takayama. Buckwheat soba noodles are a Takayama speciality, served cold with dipping sauce or hot in a rich broth. Local restaurants in the old town quarter serve authentic Hida-style cuisine." },
      { icon: 'sight', text: "Explore Takayama Old Town. The Sanmachi Suji district is one of the best-preserved Edo-period merchant quarters in Japan — wooden sake breweries (marked by hanging cedar balls), miso shops, lacquerware studios and traditional sweet sellers line the narrow streets. Sample locally-brewed sake, pick up Hida crafts, and savour the best local snacks." },
    ],
    evening: [
      { icon: 'transport', text: "Drive to Kyoto. Approximately 4-hour drive — the longest transfer of the trip. A light roadside stop for dinner en route is recommended." },
      { icon: 'sight', text: "Eikando Temple — Autumn Light-Up. Eikando Zenrinji Temple is regarded as one of Kyoto's finest momiji (autumn leaf) spots, and its evening illumination is one of the most magical events in Japan. From late November, the 1,000-year-old temple is lit up nightly — maple trees blazing in red, orange and gold reflected in the temple pond. The illumination typically runs until 9pm during the season." },
      { icon: 'meal', text: "Six Senses Kyoto — Sekki Restaurant. Even without an overnight stay, Six Senses' restaurant Sekki is a destination in its own right. The menu follows Kyoto's 24 micro-seasons, drawing from locally-sourced, sustainable ingredients. The interior — designed with biophilic principles and inspired by the Tale of Genji — is one of the most beautiful dining rooms in Kyoto." },
      { icon: 'meal', text: "Cocktails in Kyoto. The Hilton Kyoto's rooftop bar offers panoramic views of the Kamogawa and Higashiyama hills for a nightcap." },
    ],
    overnight: "Kyoto", hotel: "The Hilton", farewell: null,
  },
  {
    day: "08", title: "Departure Day ·", subtitle: "Kansai International Airport",
    morning: [
      { icon: 'meal', text: "Breakfast & Check-out by 11:00 AM. A final Japanese breakfast before checking out." },
      { icon: 'sight', text: "Shopping & Exploring Kyoto. Spend your final morning exploring: Nishiki Market ('Kyoto's Kitchen') for food souvenirs, Teramachi-dori for antiques and crafts, or Gion's historic lanes for a final glimpse of traditional Kyoto. The Fushimi Inari torii gates are also reachable if time permits." },
    ],
    afternoon: [
      { icon: 'meal', text: "Final Meal in Japan. Choose your favourite: ramen at a local shop, tempura at a counter restaurant, fresh sushi, or light soba. This is your last chance to savour Japan's extraordinary food culture." },
    ],
    evening: [
      { icon: 'transport', text: "Transfer to Kansai International Airport. Approximately 2-hour drive to KIX. Allow sufficient time for check-in, security, and immigration." },
    ],
    overnight: null, hotel: null,
    farewell: "“Mata o-ai dekiru\nhi made, yoi tabi o.”",
  },
];

export default function JapanJourney() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Japan | PuraVida with Harsha';
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
          background: url('/assets/hero-japan.jpg?v=2') center center / cover no-repeat,
            linear-gradient(158deg, #6a3a3a 0%, #4a2424 40%, #2a1616 100%);
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
        .lk-hero-dates sup { font-size: 0.65em; vertical-align: super; }

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

        /* ── WALK JAPAN WITH BHAVNA ── */
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
          position: relative; z-index: 1;
          max-width: 640px; margin: 0 auto;
        }
        .lk-guide-photo-wrap {
          position: relative;
          width: clamp(268px, 58vw, 336px);
          height: clamp(268px, 58vw, 336px);
          margin: 0 auto clamp(32px, 5vw, 44px);
        }
        .lk-guide-img {
          width: 76%; height: 76%;
          max-width: 254px; max-height: 254px;
          border-radius: 50%; object-fit: cover;
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          border: 2px solid rgba(30, 30, 30, 0.42);
          box-shadow: none;
        }
        .lk-guide-frame {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 100%; height: 100%;
          object-fit: contain; pointer-events: none;
        }
        .lk-guide-rule { display: flex; justify-content: center; margin: 0; }
        .lk-guide-rule--above { margin-bottom: clamp(20px, 3.2vw, 32px); }
        .lk-guide-rule--below { margin-top: clamp(18px, 3vw, 28px); margin-bottom: clamp(14px, 2.4vw, 22px); }
        .lk-guide-rule img { width: clamp(280px, 78vw, 520px); opacity: 0.78; }
        .lk-guide-head { max-width: 520px; margin: 0 auto; }
        .lk-guide-title {
          font-family: 'Playfair Display', serif;
          font-weight: 700; color: #252525;
          line-height: 1.12; margin: 0;
          display: flex; flex-direction: column; align-items: center;
        }
        .lk-guide-title-top { font-size: clamp(2.1rem, 4.8vw, 3.2rem); font-weight: 700; }
        .lk-guide-title-bottom { font-size: clamp(1.7rem, 3.9vw, 2.55rem); font-weight: 500; }
        .lk-guide-subtitle {
          font-family: 'Lora', serif; font-style: italic;
          font-size: clamp(1.05rem, 2.4vw, 1.2rem);
          font-weight: 400; color: rgba(255, 252, 250, 0.92);
          margin: 0 0 clamp(28px, 5vw, 40px); letter-spacing: 0.02em;
        }
        .lk-guide-body-wrap {
          max-width: 600px; margin: 0 auto;
          text-align: left;
          padding-bottom: clamp(60px, 14vw, 140px);
        }
        .lk-guide-body {
          font-family: 'Lato', sans-serif;
          font-size: clamp(15px, 1.9vw, 17px);
          line-height: 1.8; color: #252525; margin: 0;
        }
        .lk-guide-body + .lk-guide-body { margin-top: 1.15em; }
        .lk-guide-mountains {
          position: absolute; left: 0; right: 0; bottom: 0;
          z-index: 0;
          display: flex; justify-content: space-between; align-items: flex-end;
          gap: clamp(12px, 4vw, 80px);
          pointer-events: none; box-sizing: border-box; line-height: 0;
        }
        .lk-guide-mountain-side {
          display: flex; align-items: flex-end; justify-content: flex-start;
          line-height: 0; flex: 0 1 auto; min-width: 0; overflow: hidden;
        }
        .lk-guide-mountain-side.lk-guide-mountain-right { justify-content: flex-end; }
        .lk-guide-mountain-img {
          display: block; height: auto;
          width: clamp(220px, 38vw, 480px);
          object-fit: contain; opacity: 0.55; margin-bottom: -2%;
        }
        .lk-guide-mountain-right .lk-guide-mountain-img { transform: scaleX(-1); }

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
          color: #333333; line-height: 1.2; max-width: 24ch;
          margin-bottom: 4px;
        }
        .lk-day-divider-row { position: relative; margin-top: clamp(56px, 9vw, 88px); }
        .lk-day-divider-row img.lk-day-divider-line {
          width: 100%; height: auto; opacity: 0.5; display: block;
          position: relative; z-index: 1;
        }
        .lk-day-divider-mountain {
          position: absolute; right: 4%; bottom: 50%;
          height: clamp(56px, 9vw, 88px); width: auto;
          opacity: 0.9; z-index: 2;
        }

        .lk-day-body { background: #F5F0EB; padding: 0 80px 60px; }
        .lk-day-card {
          background: transparent; border: none;
          padding: 40px 48px; position: relative;
        }
        .lk-day-card-frame {
          position: absolute; inset: 0;
          pointer-events: none; z-index: 1;
        }
        .lk-day-card-frame img {
          width: 100%; height: 100%; object-fit: fill; display: block; opacity: 0.7;
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
        .lk-overnight-tree-divider { position: relative; max-width: 880px; margin: 0 auto; }
        .lk-overnight-tree-divider img { width: 100%; height: auto; display: block; opacity: 0.85; }
        .lk-overnight-text {
          position: absolute; top: 42%; left: 50%; transform: translate(-50%, -50%);
          font-family: 'Playfair Display', serif; font-weight: 700;
          font-size: clamp(13px, 2vw, 20px); line-height: 1.3;
          color: #333333; text-align: center; margin: 0; width: 56%;
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
          position: absolute; inset: -10px -10px -16px -20px;
          pointer-events: none; z-index: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .lk-farewell-frame img { width: 100%; height: auto; display: block; opacity: 0.85; }
        .lk-farewell-card .lk-farewell-text { position: relative; z-index: 1; }
        .lk-farewell-text {
          font-family: 'Lora', serif; font-style: italic;
          font-size: 1.5rem; color: #333333; line-height: 1.4;
          white-space: pre-line;
        }
        .lk-farewell-deco {
          display: flex; justify-content: center; align-items: flex-end;
          gap: 8px; margin-top: 80px; padding: 0 16px 20px;
        }
        .lk-farewell-deco img { flex-shrink: 1; min-width: 0; max-width: 30vw; }
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

        /* ── CTA ── */
        .lk-cta {
          background: #F5F0EB; padding: 100px 80px 0;
          text-align: center; display: flex; flex-direction: column; align-items: center;
          position: relative; overflow: hidden;
        }
        .lk-cta > .pfu { width: 100%; display: flex; flex-direction: column; align-items: center; }
        .lk-cta-circle { position: absolute; border-radius: 50%; pointer-events: none; }
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
        .lk-cta-leaf { position: absolute; pointer-events: none; opacity: 0.25; }
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
        .lk-cta-date-part { font-size: 1.1rem; font-weight: 400; }
        .lk-cta-date-big { font-size: 2.2rem; font-weight: 700; line-height: 1; }
        .lk-cta-date-big sup { font-size: 0.5em; vertical-align: super; }
        .lk-cta-date-sep { font-size: 1.4rem; opacity: 0.5; font-weight: 300; }

        /* ── FINAL QUOTE ── */
        .lk-final-strip { position: relative; min-height: 50vh; overflow: hidden; display: flex; align-items: center; justify-content: center; }
        .lk-final-strip-bg { position: absolute; inset: 0; background: url('/assets/journey-japan.jpg') center / cover no-repeat; }
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
          .lk-cta { padding: 80px 48px 0; }
          .lk-cta-date-bar { margin: 0 -48px; }
        }
        @media (max-width: 768px) {
          .lk-invite { padding: 48px 24px 120px; }
          .lk-invite-top { align-items: flex-start; margin-bottom: 32px; }
          .lk-invite-photo-wrap { width: 46vw; max-width: 200px; }
          .lk-invite-heading-area { padding-left: 12px; padding-top: 24px; }
          .lk-invite-divider { max-width: 130px; }
          .lk-invite-heading { font-size: 2.2rem; margin: 8px 0; }
          .lk-invite-heading .lk-from { font-size: 1.4rem; margin-top: 2px; margin-bottom: 2px; }
          .lk-invite-trees { bottom: 12px; right: 16px; transform: scale(0.85); transform-origin: bottom right; }
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
            width: min(210px, 82vw); height: min(210px, 82vw);
            margin-bottom: clamp(20px, 5vw, 28px);
          }
          .lk-guide-img { max-width: 168px; max-height: 168px; }
          .lk-guide-rule--above { margin-bottom: 14px; }
          .lk-guide-rule--below { margin-top: 14px; margin-bottom: 16px; }
          .lk-guide-rule img { width: min(92vw, 300px); }
          .lk-guide-title { font-size: clamp(1.4rem, 6.8vw, 2rem); }
          .lk-guide-subtitle { font-size: 1rem; margin-bottom: 22px; }
          .lk-guide-body { font-size: 15px; line-height: 1.75; }
          .lk-guide-body-wrap { padding-bottom: clamp(70px, 22vw, 130px); }
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
          <h1 className="lk-hero-title">Japan</h1>
        </div>
        <p className="lk-hero-dates">
          November 17 to 24, 2026
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
            Japan has been calling me for a long time. And I return every time to the calling.
          </p>
          <p className="lk-invite-body">
            The rest of the world feels uncivilized after Japan. I get blown away every time &ndash; from the food, to the trees, to the monasteries, even the bathroom. Respect shines through their blood. A lesson the entire world needs to absorb.
          </p>
          <p className="lk-invite-body">
            This time, we deep dive. A road trip together, meeting extraordinarily ordinary people along the way.
          </p>
          <p className="lk-invite-body">
            We begin in Tokyo &ndash; electric, ancient, endlessly layered. We travel to the sacred mountains of Nikkō, where autumn maples will be on fire. We sleep in ryokans where the rhythm of the house becomes our rhythm. We ride a gondola over the Northern Alps. We walk through a UNESCO village that looks like it was painted by hand. We end in Kyoto as the maple trees light up like lanterns.
          </p>
          <p className="lk-invite-body">
            Time is our luxury. The most precious experiences come from where we spend our time &ndash; and with who.
          </p>
          <p className="lk-invite-body">
            Come with me. Japan in November.
          </p>
          <p className="lk-invite-body">You will carry it for the rest of your life.</p>
        </FU>
        <div className="lk-invite-trees">
          <Glyph name="Trees" variant="White" size={160} opacity={0.85} />
        </div>
      </section>

      {/* ══ WALK JAPAN WITH BHAVNA CHABLANI ══ */}
      <section className="lk-guide">
        <FU>
          <div className="lk-guide-column">
            <div className="lk-guide-photo-wrap">
              <img src="/assets/Japan-Cultural Guide.png?v=2" alt="Bhavna Chablani" className="lk-guide-img" />
              <img
                src="/assets/Japan-Cultural Guide.png"
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
                <span className="lk-guide-title-top">Walk Japan</span>
                <span className="lk-guide-title-bottom">with Bhavna Chablani</span>
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
                My connection to Japan has unfolded over four decades &ndash; beginning in childhood and deepening with every return. What started as simple travel became a genuine appreciation for the culture, history, and everyday rhythms of Japanese life.
              </p>
              <p className="lk-guide-body">
                Over the years, I have come to understand not just the visible traditions, but the mindset beneath them &ndash; the quiet discipline, the reverence for harmony, the unwavering commitment to shared values.
              </p>
              <p className="lk-guide-body">
                Nowhere is this more beautifully expressed than in Japan's relationship with the four seasons. Each season is not merely observed but celebrated &ndash; through food, festivals, and rituals that reflect a deep sensitivity to nature's constant change. From the fleeting blush of spring blossoms to the vivid fire of autumn, the Japanese embrace impermanence with mindfulness and gratitude.
              </p>
              <p className="lk-guide-body">
                This journey long outgrew tourism. It has become an ongoing exploration of what truly defines the Japanese way of living.
              </p>
            </div>
          </div>
        </FU>
        <div className="lk-guide-mountains" aria-hidden="true">
          <div className="lk-guide-mountain-side lk-guide-mountain-left">
            <img src={GLYPH_WHITE_MOUNTAINS_SRC} alt="" className="lk-guide-mountain-img" />
          </div>
          <div className="lk-guide-mountain-side lk-guide-mountain-right">
            <img src={GLYPH_WHITE_MOUNTAINS_SRC} alt="" className="lk-guide-mountain-img" />
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
          <a href="https://wa.me/+971562216643?text=Hello%20Harsha%2C%20I%20am%20interested%20in%20the%20Japan%20journey%20and%20would%20love%20to%20learn%20more." className="lk-cta-wa" target="_blank" rel="noopener noreferrer">
            Begin a conversation
          </a>
          <div className="lk-cta-date-bar">
            <Glyph name="Trees" variant="White" size={48} opacity={0.6} />
            <div style={{ textAlign: 'center' }}>
              <p className="lk-cta-date-label">Join us by</p>
              <div className="lk-cta-date-val">
                <span className="lk-cta-date-part">October</span>
                <span className="lk-cta-date-sep">|</span>
                <span className="lk-cta-date-big">1<sup>st</sup></span>
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
            <p>{"“"}Ichigo ichie no kuni.{"”"}</p>
          </div>
        </FU>
      </div>

      <Footer />
    </>
  );
}
