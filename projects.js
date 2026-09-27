/*
  Every project on the homepage comes from this list.
  To add a project:
    1. Put its site in work/<slug>/ (with an index.html inside).
    2. Add a 4:5 cover image at covers/<slug>.jpg (1080 x 1350 works well).
    3. Copy one entry below, paste it at the top of the list (newest first) and edit it.
  "type" must be one or more of: campaign, brand, social, crm
  Set "featured": true to show a project in the large Featured row as well.
*/
window.PROJECTS = [
  {
    slug: "allbirds",
    brand: "Allbirds",
    title: "Worn in. Not worn out.",
    summary: "A 90-day full-funnel turnaround plan that proves comfort on the people who never sit down.",
    type: ["campaign", "crm"],
    market: "US + UK",
    url: "work/hero/allbirds.html",
    featured: true,
    theme: { bg: "#F3EEE6", fg: "#1E1E1C", accent: "#C4623F", font: "serif" }
  },
  {
    slug: "ikea",
    brand: "IKEA",
    title: "Home, for now.",
    summary: "A pan-European campaign that turns young renters into customers now, with a range, a kit and a service.",
    type: ["campaign", "crm"],
    market: "DE · FR · NL · ES · UK",
    url: "work/hero/ikea.html",
    featured: true,
    theme: { bg: "#0058A3", fg: "#FFFFFF", accent: "#FFDB00", font: "sans" }
  },
  {
    slug: "apple",
    brand: "Apple",
    title: "Apple Offline",
    summary: "Getting Gen Z off their phones, told as a case study inside a phone.",
    type: ["campaign"],
    market: "Global",
    url: "work/apple/"
  },
  {
    slug: "loreal",
    brand: "L'Oréal Paris",
    title: "Unrated",
    summary: "Brand audit, strategy, an integrated campaign and a social media plan.",
    type: ["campaign", "brand", "social"],
    market: "Global",
    url: "work/loreal/"
  },
  {
    slug: "zara",
    brand: "Zara",
    title: "Still Zara",
    summary: "A brand strategy presented as a fashion lookbook, down to a size guide of KPIs.",
    type: ["brand"],
    market: "Global",
    url: "work/zara/"
  },
  {
    slug: "dove",
    brand: "Dove Men+Care",
    title: "Shower thoughts. Not skin thoughts.",
    summary: "A spec campaign that meets men where they already think about themselves.",
    type: ["campaign"],
    market: "Global",
    url: "work/dove/"
  },
  {
    slug: "bata",
    brand: "Bata",
    title: "Your Next Step",
    summary: "A brand refresh: diagnosis, platform, architecture, identity system and rollout.",
    type: ["brand"],
    market: "India",
    url: "work/bata/"
  },
  {
    slug: "mamaearth-minimalist",
    brand: "Mamaearth vs Minimalist",
    title: "A tale of two skincare brands",
    summary: "A full brand audit: inventory, digital audit, benchmarking, brand equity, SWOT and a scorecard.",
    type: ["brand"],
    market: "India",
    url: "work/mamaearth-minimalist/"
  },
  {
    slug: "blue-tokai",
    brand: "Blue Tokai",
    title: "Inbox",
    summary: "An email program: welcome series, abandoned cart, replenishment, newsletter and win-back.",
    type: ["crm"],
    market: "India",
    url: "work/blue-tokai/"
  },
  {
    slug: "ugaoo",
    brand: "Ugaoo",
    title: "Ugaoo bhidu, ugaoo.",
    summary: "A 90-day Instagram strategy: audit, content pillars, series designs, reels, calendar and targets.",
    type: ["social"],
    market: "India",
    url: "work/ugaoo/"
  },
  {
    slug: "paper-boat",
    brand: "Paper Boat",
    title: "Every generation had a paper boat",
    summary: "A social strategy built on nostalgia: pillars, moment marketing, a UGC loop and creators.",
    type: ["social"],
    market: "India",
    url: "work/paper-boat/"
  },
  {
    slug: "indigo",
    brand: "IndiGo",
    title: "Say it before they ask",
    summary: "A social trust strategy after the December 2025 disruption, with a live triage desk and crisis protocol.",
    type: ["social"],
    market: "India",
    url: "work/indigo/"
  }
];
