# jazzexclusive-site — www.jazzexclusive.at

Website der Band **JazzExclusive**, gebaut wie lko-site / babowalls.com:
ein kleines Node-Skript setzt die Seiten aus Bausteinen zusammen, die Inhalte kommen
zur Laufzeit aus **zwei Feeds der cleebration-Hubs** (`sites: [jazzexclusive]`).
Angelegt 06.10.2026 (Claude, Projekt „Music JazzExclusive“). Theme: Hut-Logo auf Schwarz, Orange.

| Adresse | Inhalt | Quelle |
|---|---|---|
| `/` | Bandfoto, nächster Auftritt, „Wer wir sind“, 4 Kacheln, 3 Blogbeiträge | Events- + Blog-Hub |
| `/konzerte` · `/event?event=<slug>` | kommende + vergangene Auftritte | Events-Hub |
| `/blog` · `/post?post=<slug>` | 16 Beiträge 2019–2025 (aus Wix) | Blog-Hub |
| `/band` | Text „Über uns“ + Besetzung | hier |
| `/cd` | „Soft Groove“, Bestellung per E-Mail | hier |
| `/heute` | Ziel des QR-Codes am Konzertabend | hier |
| `/newsletter` | Link zum bestehenden Mailchimp-Formular | extern |
| `/impressum` · `/datenschutz` | **Medieninhaber noch offen** (BITTE-ERGAENZEN) | hier |

Alte Wix-Adressen (`/team-3`, `/our-cd`, `/event-details/…`, `/post/…`) leitet der Worker
weiter (`public/_redirects`, geprüft in `test/redirects.test.mjs`).

## Befehle

```bash
npm install
npm test             # baut und prüft Weiterleitungen + Module
npm run preflight    # vor dem Livegang: Feeds, Wix-Bilder, Impressum-Platzhalter
npm run deploy       # baut und lädt zu Cloudflare (jazzexclusive-site.<konto>.workers.dev)
```

`routes` in `wrangler.jsonc` erst in Schritt 2 des Umzugs einkommentieren.
Ablauf: `1! claude/05 Projekte/Music JazzExclusive/Output/JazzExclusive-Umzug.md`.
