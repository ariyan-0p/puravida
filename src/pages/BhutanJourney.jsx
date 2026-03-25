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
    meal: 'Meals  - 48px.png',
    transport: 'Transport - 48px.png',
    experience: 'Experience  - 48px.png',
    hotel: 'Accomodation  - 48px.png',
    leisure: 'Duration  - 48px.png',
    culture: 'Cultural Bridge  - 48px.png',
    wellness: 'Wellness  - 48px.png',
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

const DAYS = [
  {
    num: '01',
    title: 'Arrival in Paro, Transfer to Thimphu',
    travel: 'Approx 1 hour',
    city: 'Thimphu',
    hotel: 'Himalayan Keys Forest Resort',
    periods: [
      { label: 'Morning', items: [
        { icon: 'experience', text: 'Immigration at Paro Airport' },
        { icon: 'experience', text: 'Stop at Tanchog Lhakhang Iron Bridge' },
        { icon: 'hotel', text: 'Check in to hotel in Thimphu' },
        { icon: 'meal', text: 'Enjoy lunch' },
      ]},
      { label: 'Afternoon', items: [
        { icon: 'leisure', text: 'Open to guests: rest, visit cafes, or explore Thimphu town' },
      ]},
      { label: 'Evening', items: [
        { icon: 'meal', text: 'Dinner at the hotel' },
      ]},
    ],
    farewell: null,
  },
  {
    num: '02',
    title: 'Thimphu Sightseeing and Night Out',
    travel: null,
    city: 'Thimphu',
    hotel: 'Himalayan Keys Forest Resort',
    periods: [
      { label: 'Morning', items: [
        { icon: 'meal', text: 'Breakfast' },
        { icon: 'experience', text: 'Visit Buddha Dordenma' },
        { icon: 'experience', text: 'Scenic walk to Kelzang Textile' },
      ]},
      { label: 'Afternoon', items: [
        { icon: 'culture', text: 'Kelzang Textile cultural experience: dyeing, weaving, and cooking' },
        { icon: 'meal', text: 'Home-style lunch' },
        { icon: 'experience', text: 'Simply Bhutan museum' },
        { icon: 'experience', text: 'Tashichho Dzong' },
      ]},
      { label: 'Evening', items: [
        { icon: 'hotel', text: 'Freshen up' },
        { icon: 'leisure', text: 'Explore Thimphu town for momos and thukpa' },
        { icon: 'leisure', text: 'The Grey Area lounge' },
      ]},
    ],
    farewell: null,
  },
  {
    num: '03',
    title: 'Thimphu to Phobjikha Valley',
    travel: 'Approx 4.5 hours',
    city: 'Phobjikha',
    hotel: 'Pinewood Resort',
    periods: [
      { label: 'Morning', items: [
        { icon: 'meal', text: 'Breakfast' },
        { icon: 'transport', text: 'Drive via Dochula Pass (3,100m)' },
      ]},
      { label: 'Afternoon', items: [
        { icon: 'experience', text: '108 Druk Wangyal Chortens' },
        { icon: 'meal', text: 'Lunch en route' },
        { icon: 'transport', text: 'Arrive Phobjikha Valley' },
      ]},
      { label: 'Evening', items: [
        { icon: 'hotel', text: 'Check in' },
        { icon: 'meal', text: 'Dinner and relaxation by the fireplace' },
      ]},
    ],
    farewell: null,
  },
  {
    num: '04',
    title: 'Phobjikha to Punakha',
    travel: 'Approx 3 hours',
    city: 'Punakha',
    hotel: 'Dhensa Resort',
    periods: [
      { label: 'Morning', items: [
        { icon: 'meal', text: 'Breakfast' },
        { icon: 'experience', text: 'Black-Necked Crane Information Centre' },
        { icon: 'transport', text: 'Depart for Punakha' },
      ]},
      { label: 'Afternoon', items: [
        { icon: 'meal', text: 'Lunch en route' },
        { icon: 'experience', text: 'Chimi Lhakhang' },
        { icon: 'hotel', text: 'Check in' },
        { icon: 'experience', text: 'Punakha Dzong' },
      ]},
      { label: 'Evening', items: [
        { icon: 'experience', text: 'Punakha Suspension Bridge' },
        { icon: 'meal', text: 'Dinner' },
      ]},
    ],
    farewell: null,
  },
  {
    num: '05',
    title: 'Punakha to Paro via Thimphu',
    travel: 'Approx 3.5 hours',
    city: 'Paro',
    hotel: 'Zhiwaling Heritage',
    periods: [
      { label: 'Morning', items: [
        { icon: 'meal', text: 'Breakfast' },
        { icon: 'experience', text: 'Khamsum Yulley Namgyal Chorten hike' },
        { icon: 'transport', text: 'Depart for Paro via Lamperi Botanical Park and Rhododendron Festival' },
      ]},
      { label: 'Afternoon', items: [
        { icon: 'meal', text: 'Riverside picnic at The Secret Garden in Thimphu' },
        { icon: 'transport', text: 'Proceed to Paro' },
      ]},
      { label: 'Evening', items: [
        { icon: 'experience', text: 'Kyichu Lhakhang' },
        { icon: 'hotel', text: 'Check in' },
        { icon: 'meal', text: 'Dinner near the bonfire' },
      ]},
    ],
    farewell: null,
  },
  {
    num: '06',
    title: 'Paro, Hike to Tiger Nest Monastery and Hot Stone Bath',
    travel: null,
    city: 'Paro',
    hotel: 'Zhiwaling Heritage',
    periods: [
      { label: 'Morning', items: [
        { icon: 'meal', text: 'Breakfast' },
        { icon: 'experience', text: 'Hike to Taktsang Monastery (900m above valley floor)' },
      ]},
      { label: 'Afternoon', items: [
        { icon: 'meal', text: 'Lunch at cafeteria viewpoint' },
        { icon: 'experience', text: 'Descend from the monastery' },
        { icon: 'wellness', text: 'Traditional Bhutanese hot stone bath' },
      ]},
      { label: 'Evening', items: [
        { icon: 'meal', text: 'Dinner at the hotel' },
      ]},
    ],
    farewell: null,
  },
  {
    num: '07',
    title: 'Paro, Mandala Art Center and Dumtsha Lhakhang',
    travel: null,
    city: 'Paro',
    hotel: 'Zhiwaling Heritage',
    periods: [
      { label: 'Morning', items: [
        { icon: 'meal', text: 'Breakfast' },
        { icon: 'culture', text: 'Mandala Art Center' },
      ]},
      { label: 'Afternoon', items: [
        { icon: 'experience', text: 'Dumtsha Lhakhang' },
        { icon: 'meal', text: 'Lunch' },
        { icon: 'leisure', text: 'Shopping and cafe time in Paro town' },
      ]},
      { label: 'Evening', items: [
        { icon: 'hotel', text: 'Freshen up' },
        { icon: 'culture', text: 'Guided meditation with Kelly Dorji' },
        { icon: 'meal', text: 'Farewell dinner' },
      ]},
    ],
    farewell: null,
  },
  {
    num: '08',
    title: 'Departure from Paro',
    travel: null,
    city: null,
    hotel: null,
    periods: [
      { label: 'Morning', items: [
        { icon: 'meal', text: 'Breakfast' },
        { icon: 'transport', text: 'Transfer to Paro International Airport' },
      ]},
    ],
    farewell: 'Tashi Delek, until we meet again.',
  },
];

const INCLUSIONS = [
  'Seven nights of accommodation at handpicked heritage and boutique hotels',
  'All meals as listed in the itinerary (breakfast, lunch, and dinner daily)',
  'Private ground transportation throughout Bhutan',
  'Full cultural guidance by Kelly Dorji for the entire duration',
  'Founder accompaniment by Harsha for the entire journey',
  'All monument, museum, and temple entry fees',
  'Sustainable Development Fee (included for all nationalities)',
  'Traditional Bhutanese hot stone bath in Paro',
  'Kelzang Textile cultural experience in Thimphu',
  'Guided meditation session with Kelly Dorji',
  'All government royalties and taxes within Bhutan',
];

const EXCLUSIONS = [
  'International flights to and from Paro',
  'Travel and medical insurance (mandatory)',
  'Personal expenses, laundry, and shopping',
  'Tips and gratuities for local staff',
  'Visa fees where applicable',
  'Any meals or activities not listed in the itinerary',
  'Early check-in or late check-out charges',
];

export default function BhutanJourney() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

        .bj-progress {
          position: fixed; top: 0; left: 0; height: 3px; z-index: 9999;
          background: #D9A6A1; transition: width 0.15s linear;
        }

        /* ══════════════════════════════════
           SECTION 1: HERO
           ══════════════════════════════════ */
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
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.35) 0%,
            rgba(0,0,0,0.15) 40%,
            rgba(0,0,0,0.25) 70%,
            rgba(0,0,0,0.55) 100%
          );
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
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: clamp(4rem, 10vw, 8rem);
          line-height: 1.0; letter-spacing: 0.02em;
          margin-bottom: 24px;
          opacity: 0; animation: bjFade 1s ease 0.6s forwards;
        }
        .bj-hero-dates {
          font-family: 'Lato', sans-serif;
          font-size: clamp(16px, 2vw, 20px);
          font-weight: 400; letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 16px;
          opacity: 0; animation: bjFade 1s ease 0.9s forwards;
        }
        .bj-hero-tagline {
          font-family: 'Lora', serif;
          font-style: italic;
          font-size: clamp(18px, 2.5vw, 24px);
          line-height: 1.5;
          opacity: 0; animation: bjFade 1s ease 1.2s forwards;
        }
        .bj-hero-credit {
          position: absolute; bottom: 20px; right: 24px; z-index: 3;
          font-family: 'Lato', sans-serif; font-size: 12px;
          color: rgba(255,255,255,0.7);
          text-shadow: 0 1px 3px rgba(0,0,0,0.4);
        }

        @keyframes bjFade {
          from { opacity:0; transform:translateY(16px); }
          to { opacity:1; transform:translateY(0); }
        }

        /* ══════════════════════════════════
           SECTION 2: INVITATION FROM HARSHA
           ══════════════════════════════════ */
        .bj-invite {
          background: #B7C8B5;
          padding: 100px 80px;
        }
        .bj-invite-inner {
          max-width: 1120px; margin: 0 auto;
          display: grid; grid-template-columns: 0.45fr 0.55fr;
          gap: 80px; align-items: center;
        }
        .bj-invite-photo-wrap {
          position: relative;
          max-width: 400px;
        }
        .bj-invite-photo {
          width: 100%; display: block;
          aspect-ratio: 3/4; object-fit: cover;
        }
        .bj-invite-frame {
          position: absolute; inset: -6%;
          width: 112%; height: 112%;
          object-fit: contain; pointer-events: none;
        }
        .bj-invite-text h2 {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          line-height: 1.25; color: #333333;
          margin: 32px 0;
        }
        .bj-invite-text p {
          font-family: 'Lato', sans-serif;
          font-size: 16px; line-height: 1.8;
          color: #333333; margin-bottom: 24px;
        }
        .bj-invite-glyphs {
          display: flex; justify-content: center;
          gap: 24px; margin-top: 48px;
        }

        /* ══════════════════════════════════
           SECTION 3: WALK WITH KELLY DORJI
           ══════════════════════════════════ */
        .bj-kelly {
          background: #D9A6A1;
          padding: 100px 80px;
        }
        .bj-kelly-inner {
          max-width: 900px; margin: 0 auto;
          text-align: center;
        }
        .bj-kelly-photo-wrap {
          position: relative; display: inline-block;
          width: 240px; height: 240px;
          margin-bottom: 40px;
        }
        .bj-kelly-photo {
          width: 100%; height: 100%;
          border-radius: 50%; object-fit: cover;
          display: block;
        }
        .bj-kelly-frame {
          position: absolute; inset: -10%;
          width: 120%; height: 120%;
          object-fit: contain; pointer-events: none;
        }
        .bj-kelly h2 {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          line-height: 1.25; color: #333333;
          margin-bottom: 12px;
        }
        .bj-kelly-subtitle {
          font-family: 'Lora', serif;
          font-style: italic;
          font-size: 18px; color: #333333;
          margin-bottom: 32px;
        }
        .bj-kelly-body {
          font-family: 'Lato', sans-serif;
          font-size: 16px; line-height: 1.8;
          color: #333333; max-width: 680px;
          margin: 0 auto;
        }

        /* ══════════════════════════════════
           SECTION 4: ITINERARY
           ══════════════════════════════════ */
        .bj-itin {
          background: #F5F0EB;
          padding: 100px 80px;
        }
        .bj-itin-header {
          text-align: center; max-width: 700px;
          margin: 0 auto 72px;
        }
        .bj-itin-header h2 {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: clamp(2rem, 3.5vw, 3rem);
          line-height: 1.2; color: #333333;
          margin-bottom: 16px;
        }
        .bj-itin-header p {
          font-family: 'Lato', sans-serif;
          font-size: 16px; line-height: 1.7;
          color: #555;
        }

        .bj-day {
          max-width: 880px; margin: 0 auto 56px;
        }

        .bj-day-head {
          background: #F5F0EB;
          padding: 32px 40px 24px;
          position: relative; overflow: hidden;
          border: 1px solid rgba(51,51,51,0.08);
          border-bottom: none;
          border-radius: 8px 8px 0 0;
        }
        .bj-day-head-glyph {
          position: absolute; top: 16px; right: 24px;
          opacity: 0.12;
        }
        .bj-day-label {
          font-family: 'Lato', sans-serif;
          font-size: 13px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: #333333; margin-bottom: 8px;
        }
        .bj-day-label-num {
          color: #D9A6A1;
        }
        .bj-day-title {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: clamp(1.25rem, 2vw, 1.6rem);
          line-height: 1.3; color: #333333;
          margin-bottom: 4px;
        }
        .bj-day-travel {
          font-family: 'Lato', sans-serif;
          font-size: 14px; color: #888;
          font-style: italic;
          margin-bottom: 16px;
        }

        .bj-day-body {
          background: #FAFAF8;
          border: 1px solid rgba(51,51,51,0.1);
          border-top: none; border-bottom: none;
          padding: 32px 40px;
          position: relative;
        }
        .bj-day-body-enso {
          position: absolute; bottom: 16px; right: 24px;
          opacity: 0.15; pointer-events: none;
        }

        .bj-period { margin-bottom: 28px; }
        .bj-period:last-child { margin-bottom: 0; }

        .bj-period-label {
          font-family: 'Playfair Display', serif;
          font-weight: 400;
          font-size: 17px; color: #333333;
          margin-bottom: 16px;
        }

        .bj-activity {
          display: flex; align-items: flex-start;
          gap: 14px; margin-bottom: 10px;
          padding: 6px 0;
        }
        .bj-activity:last-child { margin-bottom: 0; }
        .bj-activity-text {
          font-family: 'Lato', sans-serif;
          font-size: 16px; line-height: 1.7;
          color: #444;
        }

        .bj-period-divider {
          margin: 24px 0;
        }

        .bj-day-foot {
          background: #B7C8B5;
          padding: 20px 40px;
          display: flex; align-items: center;
          justify-content: center; gap: 16px;
          border-radius: 0 0 8px 8px;
        }
        .bj-day-foot-text {
          font-family: 'Lato', sans-serif;
          font-size: 15px; font-weight: 700;
          color: #333333; letter-spacing: 0.02em;
        }

        .bj-farewell-card {
          text-align: center;
          padding: 40px;
          background: #F5F0EB;
          border: 1px solid rgba(51,51,51,0.1);
          border-radius: 0 0 8px 8px;
        }
        .bj-farewell-text {
          font-family: 'Lora', serif;
          font-style: italic;
          font-size: 20px; line-height: 1.6;
          color: #333333;
        }

        /* ══════════════════════════════════
           SECTION 5: INVESTMENT
           ══════════════════════════════════ */
        .bj-invest {
          background: #F5F0EB;
          padding: 100px 80px;
        }
        .bj-invest-inner {
          max-width: 960px; margin: 0 auto;
        }
        .bj-invest-header {
          text-align: center; margin-bottom: 56px;
        }
        .bj-invest-header h2 {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: clamp(2rem, 3vw, 2.8rem);
          line-height: 1.2; color: #333333;
          margin-bottom: 16px;
        }
        .bj-invest-header p {
          font-family: 'Lato', sans-serif;
          font-size: 16px; line-height: 1.7;
          color: #555;
        }

        .bj-pricing-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 32px; margin-bottom: 56px;
        }
        .bj-pricing-card {
          background: #FAFAF8;
          border: 1px solid rgba(51,51,51,0.08);
          padding: 40px 36px;
          text-align: center;
          border-radius: 8px;
        }
        .bj-pricing-card-title {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: 20px; color: #333333;
          margin-bottom: 32px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(51,51,51,0.08);
        }
        .bj-pricing-row {
          display: flex; justify-content: space-between;
          align-items: baseline;
          padding: 12px 0;
          border-bottom: 1px solid rgba(51,51,51,0.05);
        }
        .bj-pricing-row:last-child { border-bottom: none; }
        .bj-pricing-type {
          font-family: 'Lato', sans-serif;
          font-size: 15px; color: #555;
        }
        .bj-pricing-amount {
          font-family: 'Lato', sans-serif;
          font-size: 20px; font-weight: 700;
          color: #333333;
        }
        .bj-pricing-note {
          font-family: 'Lato', sans-serif;
          font-size: 13px; color: #888;
          display: block; margin-top: 2px;
        }

        .bj-invest-section {
          margin-bottom: 48px;
        }
        .bj-invest-section h3 {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: 20px; color: #333333;
          margin-bottom: 20px;
          text-align: center;
        }
        .bj-invest-list {
          list-style: none; padding: 0; margin: 0;
          max-width: 640px; margin: 0 auto;
        }
        .bj-invest-list li {
          font-family: 'Lato', sans-serif;
          font-size: 15px; line-height: 1.7;
          color: #444; padding: 8px 0 8px 24px;
          position: relative;
        }
        .bj-invest-list li::before {
          content: '';
          position: absolute; left: 0; top: 16px;
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #D9A6A1; opacity: 0.5;
        }

        .bj-cancel {
          max-width: 640px; margin: 0 auto;
          text-align: center;
        }
        .bj-cancel h3 {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: 20px; color: #333333;
          margin-bottom: 20px;
        }
        .bj-cancel p {
          font-family: 'Lato', sans-serif;
          font-size: 15px; line-height: 1.8;
          color: #444;
        }

        /* ══════════════════════════════════
           SECTION 6: CTA / BOOKING
           ══════════════════════════════════ */
        .bj-cta {
          background: #F5F0EB;
          padding: 100px 80px;
          text-align: center;
        }
        .bj-cta-logo {
          width: 140px; margin: 0 auto 48px;
          display: block;
        }
        .bj-cta h2 {
          font-family: 'Playfair Display', serif;
          font-weight: 700; font-style: italic;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          line-height: 1.3; color: #333333;
          margin-bottom: 32px;
        }
        .bj-cta-body {
          font-family: 'Lato', sans-serif;
          font-size: 16px; line-height: 1.8;
          color: #444; max-width: 560px;
          margin: 0 auto 24px;
        }
        .bj-cta-wa {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Lato', sans-serif;
          font-size: 18px; font-weight: 700;
          color: #333333; text-decoration: none;
          padding: 16px 40px; background: #B7C8B5;
          border-radius: 4px; margin-bottom: 40px;
          transition: background 0.35s, color 0.35s;
          min-height: 48px;
        }
        .bj-cta-wa:hover { background: #96AD93; color: #fff; }

        .bj-cta-date {
          background: #D9A6A1;
          padding: 20px 40px;
          border-radius: 4px;
          display: inline-block; margin-bottom: 40px;
        }
        .bj-cta-date p {
          font-family: 'Lato', sans-serif;
          font-size: 16px; font-weight: 700;
          color: #333333; letter-spacing: 0.05em;
        }
        .bj-cta-glyphs {
          display: flex; justify-content: center;
          gap: 32px; margin-top: 16px;
        }

        /* ══════════════════════════════════
           SECTION 7: FINAL QUOTE STRIP
           ══════════════════════════════════ */
        .bj-final {
          position: relative; min-height: 50vh;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
        }
        .bj-final-bg {
          position: absolute; inset: 0;
          background: url('/assets/hero-bhutan.jpg') center 30% / cover no-repeat;
        }
        .bj-final-bg::after {
          content: ''; position: absolute; inset: 0;
          background: rgba(0,0,0,0.6);
        }
        .bj-final-content {
          position: relative; z-index: 2;
          text-align: center; padding: 80px 40px;
          max-width: 700px;
        }
        .bj-final-quote-upper,
        .bj-final-quote-lower {
          width: 80px; display: block; margin: 0 auto;
          opacity: 0.7;
        }
        .bj-final-quote {
          font-family: 'Lora', serif;
          font-style: italic;
          font-size: clamp(1.4rem, 3vw, 2.2rem);
          line-height: 1.55; color: #fff;
          margin: 24px 0;
        }

        /* ══════════════════════════════════
           RESPONSIVE
           ══════════════════════════════════ */
        @media (max-width: 900px) {
          .bj-invite { padding: 80px 40px; }
          .bj-invite-inner {
            grid-template-columns: 1fr;
            gap: 48px; text-align: center;
          }
          .bj-invite-photo-wrap {
            max-width: 300px; margin: 0 auto;
          }
          .bj-kelly { padding: 80px 40px; }
          .bj-itin { padding: 80px 40px; }
          .bj-day-head { padding: 28px 28px 20px; }
          .bj-day-body { padding: 28px; }
          .bj-day-foot { padding: 16px 28px; }
          .bj-invest { padding: 80px 40px; }
          .bj-pricing-grid { grid-template-columns: 1fr; gap: 24px; }
          .bj-cta { padding: 80px 40px; }
          .bj-final { min-height: 40vh; }
        }

        @media (max-width: 600px) {
          .bj-hero-logo { width: 120px; margin-bottom: 48px; }
          .bj-invite { padding: 60px 24px; }
          .bj-invite-inner { gap: 40px; }
          .bj-invite-text h2 { font-size: 1.6rem; }
          .bj-kelly { padding: 60px 24px; }
          .bj-kelly-photo-wrap { width: 180px; height: 180px; }
          .bj-itin { padding: 60px 24px; }
          .bj-day-head { padding: 24px 20px 16px; }
          .bj-day-body { padding: 24px 20px; }
          .bj-day-foot {
            padding: 14px 20px;
            flex-direction: column; gap: 8px;
          }
          .bj-invest { padding: 60px 24px; }
          .bj-pricing-card { padding: 32px 24px; }
          .bj-cta { padding: 60px 24px; }
          .bj-cta-wa { font-size: 16px; padding: 14px 32px; }
          .bj-cta-date { padding: 16px 28px; }
          .bj-final-content { padding: 60px 24px; }
          .bj-activity { gap: 10px; }
          .bj-farewell-card { padding: 32px 24px; }
        }
      `}</style>

      <div className="bj-progress" style={{ width: `${progress}%` }} aria-hidden="true" />

      <Nav />
      <WhatsAppButton />

      {/* ══ 1. HERO ══ */}
      <section className="bj-hero">
        <div className="bj-hero-bg" />
        <div className="bj-hero-content">
          <img
            src="/assets/01. LOGOS/Logo-Main-White.png"
            alt="PuraVida with Harsha"
            className="bj-hero-logo"
          />
          <h1 className="bj-hero-title">Bhutan</h1>
          <p className="bj-hero-dates">April 9 to 16, 2026</p>
          <p className="bj-hero-tagline">Where stillness finds you</p>
        </div>
        <span className="bj-hero-credit">Photo: Kelly Dorji</span>
      </section>

      {/* ══ 2. INVITATION FROM HARSHA ══ */}
      <section className="bj-invite">
        <div className="bj-invite-inner">
          <FU>
            <div className="bj-invite-photo-wrap">
              <img
                src="/assets/harsha-portrait.jpg"
                alt="Harsha"
                className="bj-invite-photo"
              />
              <img
                src="/assets/05. GRAPHIC ELEMENTS/Puravida_Photo-Frame-2/Puravida_Photo-Frame-2.png"
                alt="" aria-hidden="true"
                className="bj-invite-frame"
              />
            </div>
          </FU>
          <FU d={1}>
            <div className="bj-invite-text">
              <Divider width={160} opacity={0.4} />
              <h2>An Invitation From Harsha</h2>
              <Divider width={160} opacity={0.4} />
              <p style={{ marginTop: 32 }}>
                Bhutan holds a kind of quiet that stays with you long after you return.
                It asks you to slow down, breathe deeper, and notice the gentle details
                of life that cities often blur.
              </p>
              <p>
                This journey is crafted for those who want more than travel. It is for
                those who want presence, connection, and the kind of beauty you feel in
                your heart. We move slowly. We listen. We walk with people who carry the
                land in their stories. If this calls to you, I would love for you to
                join me in Bhutan.
              </p>
              <div className="bj-invite-glyphs">
                <Glyph name="Trees" variant="Charcoal" size={40} opacity={0.2} />
                <Glyph name="Trees" variant="Charcoal" size={48} opacity={0.25} />
                <Glyph name="Trees" variant="Charcoal" size={40} opacity={0.2} />
              </div>
            </div>
          </FU>
        </div>
      </section>

      {/* ══ 3. WALK BHUTAN WITH KELLY DORJI ══ */}
      <section className="bj-kelly">
        <div className="bj-kelly-inner">
          <FU>
            <div className="bj-kelly-photo-wrap">
              <img
                src="/assets/kelly-dorji.jpg"
                alt="Kelly Dorji"
                className="bj-kelly-photo"
              />
              <img
                src="/assets/05. GRAPHIC ELEMENTS/Puravida_Photo-Frame-1/Puravida_Photo-Frame-1.png"
                alt="" aria-hidden="true"
                className="bj-kelly-frame"
              />
            </div>
          </FU>
          <FU d={1}>
            <h2>Walk Bhutan with Kelly Dorji</h2>
            <p className="bj-kelly-subtitle">Your cultural bridge.</p>
            <Divider width={160} opacity={0.4} />
            <p className="bj-kelly-body" style={{ marginTop: 32 }}>
              Kelly is one of Bhutan's most respected cultural custodians, rooted in
              Himalayan heritage, art, and spirituality. He brings depth, humour, and a
              lived understanding of the land that few possess. Walking Bhutan with him
              feels like being guided by someone who sees both the visible and the unseen.
              His presence is an experience in itself.
            </p>
          </FU>
          <FU d={2}>
            <div style={{ marginTop: 40 }}>
              <Divider width={160} opacity={0.4} />
            </div>
          </FU>
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
              {/* Day Header */}
              <div className="bj-day-head">
                <div className="bj-day-head-glyph">
                  <Glyph name="Mountains" variant="Charcoal" size={56} opacity={0.12} />
                </div>
                <p className="bj-day-label">
                  Day <span className="bj-day-label-num">{day.num}</span>
                </p>
                <h3 className="bj-day-title">{day.title}</h3>
                {day.travel && (
                  <p className="bj-day-travel">{day.travel}</p>
                )}
                <Divider width={140} opacity={0.35} />
              </div>

              {/* Day Body */}
              <div className="bj-day-body">
                {day.periods.map((period, pi) => (
                  <div key={period.label}>
                    {pi > 0 && (
                      <div className="bj-period-divider">
                        <Divider width={100} opacity={0.25} />
                      </div>
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
                <div className="bj-day-body-enso">
                  <Glyph name="Pause" variant="Charcoal" size={40} opacity={0.15} />
                </div>
              </div>

              {/* Day Footer or Farewell */}
              {day.farewell ? (
                <div className="bj-farewell-card">
                  <Glyph name="Mountains" variant="Charcoal" size={36} opacity={0.2} />
                  <p className="bj-farewell-text" style={{ marginTop: 16 }}>
                    &ldquo;{day.farewell}&rdquo;
                  </p>
                </div>
              ) : (
                <div className="bj-day-foot">
                  <Glyph name="Trees" variant="Charcoal" size={24} opacity={0.3} />
                  <span className="bj-day-foot-text">
                    Overnight in {day.city} : {day.hotel}
                  </span>
                  <Glyph name="Trees" variant="Charcoal" size={24} opacity={0.3} />
                </div>
              )}
            </div>
          </FU>
        ))}
      </section>

      {/* ══ 5. INVESTMENT ══ */}
      <section className="bj-invest" id="investment">
        <div className="bj-invest-inner">
          <FU>
            <div className="bj-invest-header">
              <Divider width={180} opacity={0.4} />
              <h2 style={{ marginTop: 32 }}>Your Investment</h2>
              <p>
                All prices are per person in AED. This journey is limited to a small group
                to preserve the intimacy and depth of every experience.
              </p>
            </div>
          </FU>

          <FU d={1}>
            <div className="bj-pricing-grid">
              <div className="bj-pricing-card">
                <h3 className="bj-pricing-card-title">Indian Passport Holders</h3>
                <div className="bj-pricing-row">
                  <span className="bj-pricing-type">Solo Traveller</span>
                  <span className="bj-pricing-amount">AED 13,350</span>
                </div>
                <div className="bj-pricing-row">
                  <span className="bj-pricing-type">Double Sharing</span>
                  <div>
                    <span className="bj-pricing-amount">AED 12,100</span>
                    <span className="bj-pricing-note">per person</span>
                  </div>
                </div>
              </div>
              <div className="bj-pricing-card">
                <h3 className="bj-pricing-card-title">Other Nationalities</h3>
                <div className="bj-pricing-row">
                  <span className="bj-pricing-type">Solo Traveller</span>
                  <span className="bj-pricing-amount">AED 20,500</span>
                </div>
                <div className="bj-pricing-row">
                  <span className="bj-pricing-type">Double Sharing</span>
                  <div>
                    <span className="bj-pricing-amount">AED 18,500</span>
                    <span className="bj-pricing-note">per person</span>
                  </div>
                </div>
              </div>
            </div>
          </FU>

          <FU d={2}>
            <Divider width={160} opacity={0.3} />
            <div className="bj-invest-section" style={{ marginTop: 48 }}>
              <h3>What is Included</h3>
              <ul className="bj-invest-list">
                {INCLUSIONS.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          </FU>

          <FU d={3}>
            <Divider width={160} opacity={0.3} />
            <div className="bj-invest-section" style={{ marginTop: 48 }}>
              <h3>What is Not Included</h3>
              <ul className="bj-invest-list">
                {EXCLUSIONS.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          </FU>

          <FU d={4}>
            <Divider width={160} opacity={0.3} />
            <div className="bj-cancel" style={{ marginTop: 48 }}>
              <h3>Cancellation Policy</h3>
              <p>
                More than 60 days before departure: 85% refund of the total cost.
              </p>
              <p>
                30 to 59 days before departure: 50% refund of the total cost.
              </p>
              <p>
                Less than 30 days before departure: No refund.
              </p>
              <p style={{ marginTop: 16, color: '#888', fontSize: 14 }}>
                All cancellations must be communicated in writing via email or WhatsApp.
              </p>
            </div>
          </FU>

          <FU d={5}>
            <div style={{ textAlign: 'center', marginTop: 48 }}>
              <Glyph name="Trees" variant="Charcoal" size={48} opacity={0.2} />
            </div>
          </FU>
        </div>
      </section>

      {/* ══ 6. CTA / BOOKING ══ */}
      <section className="bj-cta">
        <FU>
          <img
            src="/assets/01. LOGOS/Logo-Main.png"
            alt="PuraVida with Harsha"
            className="bj-cta-logo"
          />
          <h2>Your Journey Begins with a Message</h2>
          <Divider width={160} opacity={0.4} />
          <p className="bj-cta-body" style={{ marginTop: 32 }}>
            Reach out to Harsha directly on WhatsApp. Share what draws you to Bhutan,
            ask any questions you may have, and we will take it from there.
          </p>
          <div>
            <a
              href="https://wa.me/+971562216643"
              className="bj-cta-wa"
              target="_blank"
              rel="noopener noreferrer"
            >
              Message Harsha on WhatsApp
            </a>
          </div>
          <div style={{ marginBottom: 8 }}>
            <div className="bj-cta-date">
              <p>Join us by March 01st 2026</p>
            </div>
          </div>
          <div className="bj-cta-glyphs">
            <Glyph name="Trees" variant="Charcoal" size={40} opacity={0.2} />
            <Glyph name="Trees" variant="Charcoal" size={48} opacity={0.25} />
            <Glyph name="Trees" variant="Charcoal" size={40} opacity={0.2} />
          </div>
        </FU>
      </section>

      {/* ══ 7. FINAL QUOTE STRIP ══ */}
      <section className="bj-final">
        <div className="bj-final-bg" />
        <FU>
          <div className="bj-final-content">
            <img
              src="/assets/05. GRAPHIC ELEMENTS/Puravida_Quote-Frame-1/Quote-Upper.png"
              alt="" aria-hidden="true"
              className="bj-final-quote-upper"
            />
            <p className="bj-final-quote">
              If Bhutan is calling, this is your moment to answer.
            </p>
            <img
              src="/assets/05. GRAPHIC ELEMENTS/Puravida_Quote-Frame-1/Quote-Lower.png"
              alt="" aria-hidden="true"
              className="bj-final-quote-lower"
            />
          </div>
        </FU>
      </section>

      <Footer />
    </>
  );
}
