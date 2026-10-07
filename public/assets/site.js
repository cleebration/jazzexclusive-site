/**
 * Kleinkram, den jede Seite braucht. Bewusst winzig gehalten —
 * alles Inhaltliche machen die Kit-Module.
 */

/* Jahreszahl im Fußbereich aktuell halten */
for (const el of document.querySelectorAll("[data-year]")) {
  el.textContent = String(new Date().getFullYear());
}

/* Beim Sprachwechsel auch die Seitentitel-Sprache mitziehen.
   (SiteI18n setzt <html lang> selbst; hier hängen wir nur die
   Metabeschreibung an, damit Vorschauen stimmen.) */
document.addEventListener("i18n:change", (e) => {
  const key = document.documentElement.dataset.descriptionKey;
  if (key && window.SiteI18n) {
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", window.SiteI18n.t(key));
  }
  document.documentElement.setAttribute("lang", e.detail.lang);
});

/* Anfrageformular (Band buchen): kein Server – baut eine E-Mail an die
   Band-Adresse und öffnet das E-Mail-Programm. Felder = name-Attribute. */
for (const form of document.querySelectorAll("form[data-mailto]")) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const zeilen = [];
    for (const el of form.elements) {
      if (!el.name || !el.value) continue;
      zeilen.push(`${el.name}: ${el.value}`);
    }
    const betreff = form.dataset.subject || "Anfrage";
    location.href = `mailto:${form.dataset.mailto}?subject=${encodeURIComponent(betreff)}&body=${encodeURIComponent(zeilen.join("\n"))}`;
  });
}
