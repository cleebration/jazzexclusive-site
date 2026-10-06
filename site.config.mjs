/**
 * Zentrale Konfiguration der Website jazzexclusive.at.
 * Abgeleitet von lko-site / babowalls-site (gleiche Kits, gleicher Aufbau).
 * Angelegt 06.10.2026 (Claude, Projekt „Music JazzExclusive“).
 */
export default {
  // Kanonischer Name: mit www — so war die Seite auf Wix bekannt
  // (www.jazzexclusive.at). Der Worker führt den Namen ohne www dorthin.
  siteUrl: "https://www.jazzexclusive.at",
  canonicalHost: "www.jazzexclusive.at",

  fonts: {
    selfHost: true,
    googleUrl:
      "https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,400;0,500;0,600;1,400&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap"
  },

  locales: ["de", "en"],
  defaultLocale: "de",
  autoDetectLanguage: true,

  /* Kein eigener Hub: Auftritte und Beiträge liegen in den cleebration-Hubs
     und tragen dort `sites: [jazzexclusive]` (Entscheidung Chris, 06.10.2026). */
  feeds: {
    events: "https://cleebration-events-hub.vercel.app/feed/sites/jazzexclusive.{lang}.json",
    blog:   "https://cleebration-blog-hub.vercel.app/feed/sites/jazzexclusive.{lang}.json"
  },

  images: {
    logo: "/assets/img/jazzexclusive-logo.jpg",
    og:   "/assets/img/band.jpg"
  },

  // Adresse aus dem Wix-Fuß („Konzertanfragen“). Kommt nach dem Umzug über
  // die Alias-Domain im cleebration-Workspace an (Playbook, Schritt E).
  mail: "band@jazzexclusive.at",

  // Newsletter: bisher Mailchimp (Link aus dem Wix-Kopf). Bleibt vorerst so —
  // die Seite /newsletter verlinkt nur dorthin, sie sammelt selbst nichts.
  newsletterUrl: "http://eepurl.com/gJY5Cf",

  social: {
    facebook: "https://www.facebook.com/MyJazzExclusive",
    x: "http://www.twitter.com/myjazzexclusive"
  }
};
