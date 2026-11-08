// cleebration Markenspiel (walkingbass) – eine Datei, keine Abhängigkeiten. Claude, Chat MyProj Eggstra, 08.11.2026.
const lies = (k, f) => { try { const v = localStorage.getItem(k); return v == null ? f : JSON.parse(v) } catch { return f } };
const schreib = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)) } catch {} };
const mischen = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] } return a };
let actx = null;
function audio() { try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); if (actx.state === 'suspended') actx.resume(); } catch { actx = null } return actx }
function ton(f, dauer = .15, typ = 'triangle', laut = .2, wann = 0) {
  const a = audio(); if (!a) return;
  const t = a.currentTime + wann, o = a.createOscillator(), g = a.createGain();
  o.type = typ; o.frequency.value = f; g.gain.setValueAtTime(laut, t); g.gain.exponentialRampToValueAtTime(.0001, t + dauer);
  o.connect(g).connect(a.destination); o.start(t); o.stop(t + dauer + .02);
}
const $ = (s, el = document) => el.querySelector(s);
const CSS = `
.sp{background:var(--sp-bg,#16131F);color:var(--sp-ink,#F5F2FF);border-radius:18px;padding:18px;display:flex;flex-direction:column;gap:12px;font-family:var(--sp-font-body,system-ui,sans-serif);max-width:760px;margin:0 auto;min-height:380px}
.sp-hud{display:flex;flex-wrap:wrap;gap:8px;font-size:.88rem}
.sp-hud span{background:rgba(255,255,255,.1);padding:4px 10px;border-radius:8px;font-variant-numeric:tabular-nums}
.sp-mitte{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;text-align:center}
.sp-hinweis{font-size:.88rem;opacity:.75;margin:0}
.sp-btn{font:700 1rem var(--sp-font-body,system-ui,sans-serif);border:0;border-radius:12px;padding:11px 20px;cursor:pointer;background:var(--sp-akzent,#E8443A);color:var(--sp-akzent-ink,#fff)}
.sp-btn:focus-visible,.sp button:focus-visible{outline:3px solid var(--sp-akzent2,#F2A30E);outline-offset:2px}
.sp canvas{display:block;width:100%;height:auto;border-radius:12px;touch-action:manipulation;user-select:none;-webkit-user-select:none;max-width:100%}
.sp-gross{font-family:var(--sp-font-display,inherit);font-size:clamp(1.3rem,5vw,2rem);line-height:1.15}
@media(prefers-reduced-motion:reduce){.sp *{transition:none!important;animation:none!important}}
`;
function stil(extra = '') {
  if (!document.getElementById('sp-stil')) { const s = document.createElement('style'); s.id = 'sp-stil'; s.textContent = CSS; document.head.appendChild(s) }
  if (extra) { const s = document.createElement('style'); s.textContent = extra; document.head.appendChild(s) }
}
function leinwand(cv, w, h) { const c = cv.getContext('2d'); if (!c) return null; const d = Math.min(devicePixelRatio || 1, 2); cv.width = w * d; cv.height = h * d; c.scale(d, d); if (!c.roundRect) c.roundRect = function (x, y, ww, hh) { this.rect(x, y, ww, hh) }; return c }
// JazzExclusive – Walking Bass: im Takt tippen, wenn die Note die Linie trifft. Bass-Linie über ii–V–I in F.
const LINIE = [98, 123.5, 146.8, 138.6, 130.8, 164.8, 196, 185, 87.3, 110, 130.8, 123.5, 87.3, 98, 110, 116.5];
export function mount(root) {
  stil();
  root.classList.add('sp');
  root.innerHTML = `<div class="sp-hud"><span data-p>Punkte 0</span><span data-s>Serie 0</span><span data-r>Rekord ${lies('jazzexclusive-walkingbass-rekord', 0)}</span></div>
    <canvas style="aspect-ratio:4/3" role="img" aria-label="Taktfläche – im Takt tippen"></canvas>
    <div class="sp-mitte" style="flex:0"><button class="sp-btn" type="button" data-start>Start (Ton an)</button></div>`;
  const cv = $('canvas', root), Wd = 480, Hd = 360, c = leinwand(cv, Wd, Hd); if (!c) return () => {};
  const BPM = 112, b = 60 / BPM, ZIEL = 290, FALL = 220;
  let noten = [], t0 = 0, laeuft = false, punkte = 0, serie = 0, raf, effekte = [], a = null;
  const jetzt = () => a ? a.currentTime - t0 : 0;
  function start() {
    a = audio(); if (!a) return;
    t0 = a.currentTime + .6; noten = []; punkte = 0; serie = 0; effekte = [];
    for (let i = 0; i < 32; i++) { noten.push({ t: i * b, f: LINIE[i % 16], st: null }); ton(LINIE[i % 16], b * .9, 'triangle', .3, .6 + i * b); if (i % 2 === 1) ton(4000, .03, 'square', .02, .6 + i * b) }
    laeuft = true; $('[data-start]', root).hidden = true;
    $('[data-p]', root).textContent = 'Punkte 0'; $('[data-s]', root).textContent = 'Serie 0';
  }
  function tippen() {
    if (!laeuft) return;
    const t = jetzt(); let best = null;
    for (const n of noten) if (!n.st && Math.abs(n.t - t) < .18 && (!best || Math.abs(n.t - t) < Math.abs(best.t - t))) best = n;
    if (!best) return;
    const d = Math.abs(best.t - t); best.st = 'ok'; serie++; punkte += d < .08 ? 100 : 50;
    effekte.push({ txt: d < .08 ? 'Swing!' : 'Gut', t });
    $('[data-p]', root).textContent = 'Punkte ' + punkte; $('[data-s]', root).textContent = 'Serie ' + serie;
  }
  function bild() {
    c.fillStyle = '#1E1B19'; c.fillRect(0, 0, Wd, Hd);
    for (let k = 0; k < 4; k++) { c.strokeStyle = 'rgba(242,154,46,.25)'; c.lineWidth = 1 + k; c.beginPath(); c.moveTo(150 + k * 60, 0); c.lineTo(150 + k * 60, Hd); c.stroke() }
    c.fillStyle = 'rgba(242,154,46,.18)'; c.fillRect(0, ZIEL - 18, Wd, 36);
    c.strokeStyle = '#F29A2E'; c.lineWidth = 3; c.beginPath(); c.moveTo(0, ZIEL); c.lineTo(Wd, ZIEL); c.stroke();
    if (laeuft) {
      const t = jetzt(); let offen = false;
      for (const n of noten) {
        if (!n.st && t - n.t > .18) { n.st = 'weg'; serie = 0; $('[data-s]', root).textContent = 'Serie 0' }
        if (!n.st) offen = true;
        const y = ZIEL - (n.t - t) * FALL; if (y < -30 || y > Hd + 30 || n.st) continue;
        const x = 150 + (Math.abs(Math.round(Math.log2(n.f / 87.3) * 3)) % 4) * 60;
        c.fillStyle = '#FBEFE4'; c.beginPath(); c.ellipse(x, y, 16, 12, -.4, 0, Math.PI * 2); c.fill();
        c.strokeStyle = '#FBEFE4'; c.lineWidth = 3; c.beginPath(); c.moveTo(x + 14, y - 4); c.lineTo(x + 14, y - 40); c.stroke();
      }
      effekte = effekte.filter(e => t - e.t < .6);
      effekte.forEach(e => { c.globalAlpha = 1 - (t - e.t) / .6; c.fillStyle = '#F29A2E'; c.font = 'italic 600 28px "EB Garamond", Georgia, serif'; c.textAlign = 'center'; c.fillText(e.txt, Wd / 2, ZIEL - 40 - (t - e.t) * 50); c.globalAlpha = 1 });
      if (!offen && t > noten[noten.length - 1].t + .6) {
        laeuft = false; const rek = lies('jazzexclusive-walkingbass-rekord', 0);
        if (punkte > rek) { schreib('jazzexclusive-walkingbass-rekord', punkte); $('[data-r]', root).textContent = 'Rekord ' + punkte }
        const s = $('[data-start]', root); s.hidden = false; s.textContent = `Nochmal (${punkte} Punkte)`;
      }
    } else {
      c.fillStyle = '#FBEFE4'; c.textAlign = 'center'; c.font = '500 16px "Work Sans", system-ui, sans-serif';
      c.fillText('Tippe, wenn die Note die goldene Linie trifft.', Wd / 2, 140);
    }
    raf = requestAnimationFrame(bild);
  }
  cv.addEventListener('pointerdown', e => { e.preventDefault(); tippen() });
  const key = e => { if (e.code === 'Space') { e.preventDefault(); tippen() } };
  addEventListener('keydown', key);
  $('[data-start]', root).onclick = start;
  raf = requestAnimationFrame(bild);
  return () => { cancelAnimationFrame(raf); removeEventListener('keydown', key) };
}
