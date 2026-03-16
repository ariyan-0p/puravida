export const tripsData = {
  bhutan: {
    slug: "bhutan",
    name: "Bhutan",
    tagline: "Mountains & Monasteries",
    subtitle: "Himalayan Kingdom",
    hero: {
      image: "/assets/bhutan-hero.jpg",
      gradient: "linear-gradient(158deg, #4a6050 0%, #2e3d32 40%, #141e16 100%)"
    },
    dates: "April 9–16, 2026",
    duration: "8 Days",
    price: "From AED 12,100",
    groupSize: "8–12 travellers",
    
    philosophy: {
      title: "Why This Journey",
      paragraphs: [
        "Bhutan isn't a place you visit—it's a recalibration. The altitude changes how you breathe. The silence changes what you notice. The monasteries change what you carry.",
        "This is not a wellness retreat. It's not a cultural tour. It's eight days where the boundary between journey and inner work dissolves entirely.",
        "You'll walk with Kelly Dorji—Bhutan's most recognized actor and our guide for a decade. His relationship with monks, farmers, and archery champions opens doors no itinerary can buy."
      ]
    },

    harshaVoice: {
      title: "What Ten Years Taught Me",
      content: "I first went to Bhutan in 2014. I thought I was going for the landscapes—the prayer flags, the dzongs, the peaks. What I didn't expect was Kelly. Or the grandmother who poured me butter tea in Punakha. Or the monk who explained why some silences are louder than mantras. Bhutan doesn't perform for you. It simply is. And if you're ready, that's enough."
    },

    itinerary: [
      {
        day: 1,
        title: "Arrival in Paro",
        experience: "Touch down in the only airport that requires pilots to manually navigate between peaks. We gather at Uma Paro—stone walls, prayer flags in wind, tea waiting. Tonight is quiet. Jet lag meets altitude. We don't fight it.",
        overnight: "Uma Paro or COMO Uma Paro"
      },
      {
        day: 2,
        title: "Tiger's Nest Monastery",
        experience: "The climb begins at 8 AM. There's a specific moment—about forty minutes in—where your lungs start to ache and your mind goes completely quiet. Everyone who's been there knows exactly which step. Meditation at the monastery. Lunch overlooking the valley. Descent by 3 PM.",
        overnight: "Uma Paro"
      },
      {
        day: 3,
        title: "Paro to Punakha Valley",
        experience: "The drive takes four hours. We stop at Dochula Pass (3,100m) where 108 chortens face the Himalayas. Prayer flags crack in wind. Kelly explains why Bhutanese don't climb sacred peaks. Arrive Punakha by lunch—warmer, greener, lower.",
        overnight: "COMO Uma Punakha or Dhensa Boutique Resort"
      },
      {
        day: 4,
        title: "Farmhouse & Hot Stone Bath",
        experience: "Morning at a family farmhouse. You'll sit on the floor. Butter tea will be poured. The grandmother will show you how ara (rice wine) is made. Lunch is red rice and ema datshi. Evening: traditional hot stone bath. River-heated rocks. Artemisia leaves. Silence.",
        overnight: "COMO Uma Punakha"
      },
      {
        day: 5,
        title: "Punakha Dzong & Suspension Bridge",
        experience: "The dzong sits where two rivers meet. Built in 1637. No nails, only interlocking wood. We enter as monks chant morning prayers. Afternoon walk across the longest suspension bridge in Bhutan (160m). Prayer flags overhead. River below. Stillness between.",
        overnight: "COMO Uma Punakha"
      },
      {
        day: 6,
        title: "Archery & Local Life",
        experience: "Bhutan's national sport isn't meditation—it's archery. Kelly arranges a match with local champions. You won't hit the target. That's not the point. The point is watching men who've practiced for decades miss, laugh, and try again.",
        overnight: "COMO Uma Punakha"
      },
      {
        day: 7,
        title: "Return to Paro",
        experience: "Morning drive back through the valley. We stop for lunch at a roadside restaurant—no tourists, just truckers and monks. The dal tastes different here. Evening free to wander Paro town. Prayer wheels. Incense. Dogs sleeping in alleys.",
        overnight: "Uma Paro"
      },
      {
        day: 8,
        title: "Departure",
        experience: "Early morning flight. The peaks reveal themselves one last time. You'll carry Bhutan differently than you carried other trips. It doesn't announce itself loudly. It just... stays.",
        overnight: "End of journey"
      }
    ],

    included: [
      "All accommodation (luxury boutique properties)",
      "All meals throughout the journey",
      "Private ground transportation",
      "English-speaking guide + Kelly Dorji for cultural experiences",
      "All permits and entrance fees",
      "Hot stone bath experience",
      "Meditation sessions at monasteries",
      "Airport transfers"
    ],

    notIncluded: [
      "International flights to/from Paro",
      "Bhutan Sustainable Development Fee (USD 100/day, paid separately)",
      "Travel insurance",
      "Personal expenses and gratuities",
      "Visa fees (if applicable)"
    ],

    testimonials: [
      {
        quote: "Bhutan, the country, the pace of life, the clean spiritual air — and of course Harsha. Beautiful mix of everything my heart needed. Beautifully curated with every need fulfilled.",
        name: "Trissha",
        trip: "Bhutan · 2024"
      },
      {
        quote: "Details, precision, and thoughtfulness. Beautiful experiences organised with so much love and care for individual needs.",
        name: "Feizal Virani",
        trip: "Bhutan · 2024"
      }
    ]
  },

  japan: {
    slug: "japan",
    name: "Japan",
    tagline: "Stillness in Motion",
    subtitle: "Island of Ritual",
    hero: {
      image: "/assets/japan-hero.jpg",
      gradient: "linear-gradient(158deg, #b8a0a0 0%, #887070 45%, #503838 100%)"
    },
    dates: "March 2026",
    duration: "12 Days",
    price: "From AED 18,500",
    groupSize: "8–15 travellers",

    philosophy: {
      title: "Why This Journey",
      paragraphs: [
        "Japan teaches you that ceremony and spontaneity are not opposites. That precision can be gentle. That stillness can move.",
        "This is not a temple tour. It's twelve days of noticing—the moss on stone, the pause between tea ceremony gestures, the way snow falls differently in Hokkaido.",
        "We move slowly. Kyoto to Kanazawa to Hokkaido. Temples, gardens, fishing villages, frozen shores. Every transition is intentional."
      ]
    },

    harshaVoice: {
      title: "Why I Keep Returning",
      content: "I've been to Japan seven times. Each visit teaches me something new about restraint. About how much beauty can live in what you don't say. The tea master in Kyoto who trained for thirty years to learn one gesture. The ryokan owner in Hokkaido who serves breakfast with no words, only presence. Japan doesn't rush you. It waits."
    },

    itinerary: [
      {
        day: 1,
        title: "Arrival in Kyoto",
        experience: "Touch down in Osaka. Transfer to Kyoto (90 minutes). Check into a traditional ryokan in Gion. Tatami mats. Sliding shoji screens. Futon beds. Tonight we walk—lantern-lit streets, geishas passing silently, incense from temples.",
        overnight: "Traditional Ryokan, Gion"
      },
      {
        day: 2,
        title: "Moss Temples & Bamboo Groves",
        experience: "Early morning at Saiho-ji (Kokedera)—the moss temple. Reservation-only. You'll trace Buddhist sutras before entering the garden. 120 varieties of moss. Afternoon in Arashiyama bamboo forest. The light filters green. The wind sounds like breathing.",
        overnight: "Ryokan, Gion"
      },
      {
        day: 3,
        title: "Tea Ceremony & Fushimi Inari",
        experience: "Morning tea ceremony with a master. You'll learn the choreography—how to hold the bowl, when to bow, why silence matters. Afternoon at Fushimi Inari. Ten thousand torii gates climb the mountain. We walk as far as your legs allow.",
        overnight: "Ryokan, Gion"
      },
      {
        day: 4,
        title: "Nara Day Trip",
        experience: "One hour south. Todai-ji temple houses a 15-meter Buddha. Deer roam freely—sacred, gentle, persistent. They'll bow for crackers. You'll bow back. Return to Kyoto by evening.",
        overnight: "Ryokan, Gion"
      },
      {
        day: 5,
        title: "Kyoto to Kanazawa",
        experience: "Morning train (2.5 hours). Kanazawa is smaller, quieter, less tourist-dense. Check into Asadaya—a ryokan that's been family-run for 130 years. Afternoon free to wander Higashi Chaya geisha district. Gold-leaf shops. Sake breweries. Silence.",
        overnight: "Asadaya Ryokan, Kanazawa"
      },
      {
        day: 6,
        title: "Kenrokuen Garden & Gold Leaf",
        experience: "Morning at Kenrokuen—one of Japan's three great gardens. Designed over 200 years. Every stone placed with intention. Afternoon gold-leaf workshop. Kanazawa produces 99% of Japan's gold leaf. You'll apply it to lacquerware. Your hands will shake. That's the point.",
        overnight: "Asadaya Ryokan"
      },
      {
        day: 7,
        title: "Kanazawa to Hokkaido",
        experience: "Fly to Sapporo (2 hours). Transfer to Niseko (2.5 hours). The air changes. Colder. Cleaner. Check into Zaborin—a design ryokan built into the forest. Private onsen in every room. Tonight: silence and snow.",
        overnight: "Zaborin, Niseko"
      },
      {
        day: 8,
        title: "Onsen & Forest Bathing",
        experience: "No agenda today. Wake when you wake. Soak in your private onsen. Walk the forest paths. The trees here are different—birch, pine, frost-covered. Dinner is kaiseki: fifteen courses, each smaller than your palm.",
        overnight: "Zaborin, Niseko"
      },
      {
        day: 9,
        title: "Lake Toya",
        experience: "Morning drive to Lake Toya (2 hours). Volcanic caldera lake. Steam rises from the water. We visit a small fishing village—no tourists, just locals mending nets. Lunch is grilled fish caught that morning. Return to Niseko by evening.",
        overnight: "Zaborin, Niseko"
      },
      {
        day: 10,
        title: "Sapporo Exploration",
        experience: "Drive to Sapporo (2.5 hours). Urban energy after days of quiet. Susukino district. Ramen alley. Sapporo Beer Museum. We eat, we wander, we let the city move around us. Tonight: hotel with city views.",
        overnight: "Hotel, Sapporo"
      },
      {
        day: 11,
        title: "Otaru Day Trip",
        experience: "Thirty minutes north. Otaru is a port town—canals, glass workshops, music box museum. We visit Kitaichi Glass. You'll watch artisans blow molten glass into shapes that seem impossible. Return to Sapporo by evening.",
        overnight: "Hotel, Sapporo"
      },
      {
        day: 12,
        title: "Departure",
        experience: "Morning flight from Sapporo. Japan doesn't say goodbye loudly. It just... releases you. You'll notice the silence differently when you get home.",
        overnight: "End of journey"
      }
    ],

    included: [
      "All accommodation (ryokans + boutique hotels)",
      "All meals (breakfast, lunch, dinner)",
      "Private ground transportation",
      "Shinkansen (bullet train) tickets",
      "English-speaking guide throughout",
      "Tea ceremony with master",
      "Gold-leaf workshop in Kanazawa",
      "All entrance fees and permits"
    ],

    notIncluded: [
      "International flights to/from Japan",
      "Travel insurance",
      "Personal expenses",
      "Gratuities",
      "Visa fees (if applicable)"
    ],

    testimonials: [
      {
        quote: "Japan with Harsha wasn't tourism. It was apprenticeship. I learned to notice.",
        name: "Ananya",
        trip: "Japan · 2023"
      }
    ]
  },

  jordan: {
    slug: "jordan",
    name: "Jordan",
    tagline: "Desert & Deep Time",
    subtitle: "Ancient Light",
    hero: {
      image: "/assets/jordan-hero.jpg",
      gradient: "linear-gradient(158deg, #c09860 0%, #906838 45%, #503818 100%)"
    },
    dates: "November 2026",
    duration: "8 Days",
    price: "From AED 15,000",
    groupSize: "8–12 travellers",

    philosophy: {
      title: "Why This Journey",
      paragraphs: [
        "Jordan holds a quiet that cities cannot manufacture. Wadi Rum at sunrise. Petra at the blue hour. Bedouin tea poured slow.",
        "This is not an archaeology tour. It's eight days in landscapes that predate language. Where stone remembers what you've forgotten.",
        "We move with Bedouin guides who know the desert not as tourists but as home. Every camp, every route, every silence—curated through relationships built over years."
      ]
    },

    harshaVoice: {
      title: "Why the Desert Matters",
      content: "The first time I slept in Wadi Rum, I couldn't sleep. Too quiet. Too many stars. Too much space between thoughts. By the third night, I understood—the desert doesn't give you peace. It gives you room to notice what you've been carrying. And then, if you're ready, room to set it down."
    },

    itinerary: [
      {
        day: 1,
        title: "Arrival in Amman",
        experience: "Touch down at Queen Alia International. Transfer to hotel in Amman (40 minutes). Evening walk through Rainbow Street—cafés, street art, mint lemonade. Tonight is acclimatization. Tomorrow, we go deep.",
        overnight: "Boutique hotel, Amman"
      },
      {
        day: 2,
        title: "Amman to Petra",
        experience: "Morning drive south (3 hours). Arrive Petra by noon. Check into Mövenpick Resort. Afternoon free—rest, walk the town, prepare for tomorrow. Petra isn't something you rush into.",
        overnight: "Mövenpick Resort, Petra"
      },
      {
        day: 3,
        title: "Petra: Treasury & Monastery",
        experience: "Enter at first light (6:30 AM). The Siq—a narrow canyon—opens suddenly to the Treasury. Rose-red sandstone carved 2,000 years ago. We climb to the Monastery (800 steps). Fewer tourists. Bigger structure. More silence. Descent by 2 PM. Rest. Petra takes everything you have.",
        overnight: "Mövenpick Resort, Petra"
      },
      {
        day: 4,
        title: "Petra: Back Routes & Little Petra",
        experience: "Today we take the trails most people skip. High Place of Sacrifice. Panoramic views. Afternoon at Little Petra—smaller, quieter, no crowds. Evening Bedouin dinner under stars. Lamb cooked underground. Stories older than the stones.",
        overnight: "Mövenpick Resort, Petra"
      },
      {
        day: 5,
        title: "Petra to Wadi Rum",
        experience: "Morning drive (2 hours). Arrive Wadi Rum by noon. This is where Lawrence of Arabia filmed. This is where the desert becomes cathedral. Check into luxury Bedouin camp. Afternoon 4x4 safari. Sunset from a dune. Tonight: silence you can taste.",
        overnight: "Luxury Bedouin camp, Wadi Rum"
      },
      {
        day: 6,
        title: "Wadi Rum Immersion",
        experience: "Wake to silence. Breakfast: flatbread, labneh, olives, tea poured from height. Morning hike through canyon. Afternoon: nothing. Sit. Watch shadows move across sandstone. Evening: traditional zarb dinner. Meat and vegetables cooked underground for 3 hours.",
        overnight: "Luxury Bedouin camp, Wadi Rum"
      },
      {
        day: 7,
        title: "Wadi Rum to Dead Sea",
        experience: "Early departure (4 hours north). Arrive Dead Sea by noon. Check into resort. Afternoon float. The water holds you. 34% salinity—you can't sink even if you try. Mineral mud. Warm sun. Stillness different from desert stillness.",
        overnight: "Dead Sea resort"
      },
      {
        day: 8,
        title: "Departure",
        experience: "Morning at leisure. Transfer to Amman airport (1 hour). Jordan doesn't let go easily. You'll feel the desert in your bones for weeks.",
        overnight: "End of journey"
      }
    ],

    included: [
      "All accommodation (boutique hotels + luxury Bedouin camps)",
      "All meals throughout",
      "Private 4x4 transportation",
      "English-speaking guide + Bedouin guides in Wadi Rum",
      "All entrance fees (Petra, Wadi Rum)",
      "Bedouin dinners with traditional zarb",
      "Airport transfers"
    ],

    notIncluded: [
      "International flights to/from Amman",
      "Travel insurance",
      "Jordan Pass (if applicable)",
      "Personal expenses",
      "Gratuities"
    ],

    testimonials: [
      {
        quote: "Petra was stunning. But Wadi Rum? Wadi Rum changed me. Harsha knew exactly when to guide and when to let the desert speak.",
        name: "Rohan",
        trip: "Jordan · 2023"
      }
    ]
  },

  srilanka: {
    slug: "sri-lanka",
    name: "Sri Lanka",
    tagline: "Spice, Temple & Shore",
    subtitle: "Jungle & Sea",
    hero: {
      image: "/assets/srilanka-hero.jpg",
      gradient: "linear-gradient(158deg, #5a9068 0%, #3c6848 45%, #1c3824 100%)"
    },
    dates: "2026",
    duration: "10 Days",
    price: "From AED 16,000",
    groupSize: "8–15 travellers",

    philosophy: {
      title: "Why This Journey",
      paragraphs: [
        "Sri Lanka overwhelms gently. Sigiriya at first light. Temple towns wrapped in frangipani. Surf-washed southern shores.",
        "This is not a beach holiday. It's ten days where jungle meets ocean, where Buddhism meets breakfast, where every sense gets recalibrated.",
        "We move north to south—mountains, temples, tea country, coastline. Slow enough to notice. Fast enough to feel the island's rhythm."
      ]
    },

    harshaVoice: {
      title: "Why Sri Lanka Feels Like Home",
      content: "Sri Lanka was my first solo trip. I was 23. I thought I was going for surf lessons. What I found was jackfruit curry, monks who laughed louder than anyone I'd met, and a coast that taught me the difference between being alone and being lonely. I've been back twelve times. It never stops teaching."
    },

    itinerary: [
      {
        day: 1,
        title: "Arrival in Colombo",
        experience: "Touch down at Bandaranaike International. Transfer to Colombo hotel (45 minutes). Evening walk through Galle Face Green—ocean breeze, street food, kites in wind. Tonight: rest. Tomorrow we head inland.",
        overnight: "Boutique hotel, Colombo"
      },
      {
        day: 2,
        title: "Colombo to Sigiriya",
        experience: "Morning drive north (4 hours). Arrive Sigiriya by noon. Check into boutique hotel near the rock fortress. Afternoon at leisure—pool, rest, acclimatize. Tomorrow's climb requires early legs.",
        overnight: "Boutique hotel, Sigiriya"
      },
      {
        day: 3,
        title: "Sigiriya Rock Fortress",
        experience: "Depart 5:30 AM. We climb before the heat. 1,200 steps. Frescoes halfway up. Lion's paws at the top. Summit by 7 AM. The view: jungle canopy to horizon. Descent by 9 AM. Rest of day free. You'll need it.",
        overnight: "Boutique hotel, Sigiriya"
      },
      {
        day: 4,
        title: "Polonnaruwa & Village Life",
        experience: "Morning drive to Polonnaruwa (1.5 hours)—ancient capital, UNESCO site, temple ruins from 12th century. Afternoon village experience: bullock cart ride, rice paddy walk, cooking lesson with a local family. Dinner is what you made. It tastes better that way.",
        overnight: "Boutique hotel, Sigiriya"
      },
      {
        day: 5,
        title: "Sigiriya to Kandy",
        experience: "Morning drive through spice gardens (3 hours). Stop at Matale—cinnamon, cardamom, vanilla growing wild. Arrive Kandy by afternoon. Evening visit to Temple of the Tooth Relic. Monks chanting. Drums. Incense thick enough to touch.",
        overnight: "Boutique hotel, Kandy"
      },
      {
        day: 6,
        title: "Kandy & Peradeniya Gardens",
        experience: "Morning at Royal Botanical Gardens—147 acres, 4,000 plant species, orchids that look engineered. Afternoon free: wander Kandy Lake, browse markets, watch monkeys steal mangoes. Evening traditional dance performance. The costumes alone are worth it.",
        overnight: "Boutique hotel, Kandy"
      },
      {
        day: 7,
        title: "Kandy to Ella (Train Journey)",
        experience: "Board the 9 AM train. This is Sri Lanka's most scenic route: tea plantations, mountain tunnels, valleys so green they hurt. Seven hours. No WiFi. Just windows and chai. Arrive Ella by 4 PM. Check into hillside guesthouse. Tonight: silence.",
        overnight: "Guesthouse, Ella"
      },
      {
        day: 8,
        title: "Ella Hiking & Little Adam's Peak",
        experience: "Early morning hike to Little Adam's Peak (easy, 1 hour round trip). Breakfast at a viewpoint café—egg hoppers, fresh juice, mountains for days. Afternoon at Nine Arch Bridge—colonial-era railway bridge, trains pass every 2 hours. We wait for one.",
        overnight: "Guesthouse, Ella"
      },
      {
        day: 9,
        title: "Ella to Galle",
        experience: "Morning drive to southern coast (4 hours). Arrive Galle by noon. Check into boutique hotel within Galle Fort—Dutch colonial walls, ocean on three sides, history in every stone. Afternoon walk the ramparts. Evening: sunset, lion lager, ocean wind.",
        overnight: "Boutique hotel, Galle Fort"
      },
      {
        day: 10,
        title: "Galle & Departure",
        experience: "Morning free—swim, walk, browse bookshops in the fort. Lunch at Ministry of Crab (if you're ready to spend). Afternoon transfer to Colombo airport (2.5 hours). Sri Lanka doesn't leave you. You carry it forward.",
        overnight: "End of journey"
      }
    ],

    included: [
      "All accommodation (boutique hotels + guesthouses)",
      "All meals (breakfast, most lunches, most dinners)",
      "Private ground transportation",
      "Ella train journey (reserved seats)",
      "English-speaking guide throughout",
      "All entrance fees (Sigiriya, Polonnaruwa, temples)",
      "Village experience and cooking lesson",
      "Airport transfers"
    ],

    notIncluded: [
      "International flights to/from Colombo",
      "Travel insurance",
      "Some lunches and dinners (for flexibility)",
      "Personal expenses",
      "Gratuities"
    ],

    testimonials: [
      {
        quote: "The train from Kandy to Ella. That's all I'll say. If you know, you know. And if you don't, go with Harsha.",
        name: "Priya",
        trip: "Sri Lanka · 2024"
      }
    ]
  }
};