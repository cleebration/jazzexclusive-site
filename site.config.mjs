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
    logo: "/assets/img/logo-quer.svg",
    og:   "/assets/img/og-bild.jpg"
  },

  // Adresse aus dem Wix-Fuß („Konzertanfragen“). Kommt nach dem Umzug über
  // die Alias-Domain im cleebration-Workspace an (Playbook, Schritt E).
  mail: "band@jazzexclusive.at",

  // Newsletter: EmailOctopus statt Mailchimp (Entscheidung Chris, 07.10.2026),
  // Formular auf /newsletter → /api/subscribe → Worker (Secrets beim Worker).

  social: {
    facebook: "https://www.facebook.com/MyJazzExclusive",
    x: "http://www.twitter.com/myjazzexclusive"
  }
};
