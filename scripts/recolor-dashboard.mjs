// One-off transform: recolor the admin + client dashboards from the green
// (emerald/teal/cyan/green) accent to a pale lime palette built around #F1F7D4.
//
// Role-based mapping (NOT a blind swap), applied only to files under
// src/spa-pages/Dashboard so the marketing site / ChatBot are untouched:
//   - backgrounds / buttons / active / badges / gradients -> #F1F7D4 (pale)
//   - hover backgrounds / gradient ends                   -> #E4EFB4
//   - all text + icons (and white/black text on green)    -> #3F4D12 (dark olive)
//   - borders -> #C7D98A | focus rings -> #A7C04D | shadows -> soft lime
//   - chart green hex fills -> #7C9023 (visible mid-olive)
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..', 'src', 'spa-pages', 'Dashboard');
const FILL = '#F5C857';      // golden-yellow fill (buttons / active / badges / gradient start)
const FILL_HOVER = '#E9B83A';
const VIA = '#F0C04A';
const INK = '#4A3208';       // dark brown text — readable on yellow and on white
const LINE = '#EAD08A';      // soft gold border
const RING = '#E5B73A';      // gold focus ring
const SHADOW = '#EAD08A';
const CHART = '#CC8F1A';     // mid amber chart fill (visible on white)
const CHART2 = '#E8B53A';
const CHART3 = '#8A5E12';

const C = '(?:emerald|teal|cyan|green)';      // color families to recolor
const SH = '\\d+(?:/\\d+)?';                   // shade with optional opacity

function transform(src) {
  let s = src;

  // 1. Gradient stops (handle hover: variants first)
  s = s.replace(new RegExp(`\\bhover:from-${C}-${SH}`, 'g'), `hover:from-[${FILL_HOVER}]`);
  s = s.replace(new RegExp(`\\bhover:via-${C}-${SH}`, 'g'), `hover:via-[${VIA}]`);
  s = s.replace(new RegExp(`\\bhover:to-${C}-${SH}`, 'g'), `hover:to-[#DDA92B]`);
  s = s.replace(new RegExp(`\\bfrom-${C}-${SH}`, 'g'), `from-[${FILL}]`);
  s = s.replace(new RegExp(`\\bvia-${C}-${SH}`, 'g'), `via-[${VIA}]`);
  s = s.replace(new RegExp(`\\bto-${C}-${SH}`, 'g'), `to-[${FILL_HOVER}]`);

  // 2. Backgrounds (hover deeper; preserve opacity on base bg)
  s = s.replace(new RegExp(`\\bhover:bg-${C}-${SH}`, 'g'), `hover:bg-[${FILL_HOVER}]`);
  s = s.replace(new RegExp(`\\bbg-${C}-(\\d+)/(\\d+)`, 'g'), `bg-[${FILL}]/$2`);
  s = s.replace(new RegExp(`\\bbg-${C}-\\d+`, 'g'), `bg-[${FILL}]`);

  // 3. Text + icons (all states) -> dark olive ink
  s = s.replace(new RegExp(`\\b(hover:|group-hover:|focus:)?text-${C}-${SH}`, 'g'), `$1text-[${INK}]`);

  // 4. Borders (focus/hover use ring tone for visibility)
  s = s.replace(new RegExp(`\\bfocus:border-${C}-${SH}`, 'g'), `focus:border-[${RING}]`);
  s = s.replace(new RegExp(`\\bhover:border-${C}-${SH}`, 'g'), `hover:border-[${RING}]`);
  s = s.replace(new RegExp(`\\b(dark:)?border-${C}-${SH}`, 'g'), `$1border-[${LINE}]`);

  // 5. Rings (solid pale-olive; drop opacity for arbitrary-value safety)
  s = s.replace(new RegExp(`\\b(focus:|hover:|focus-visible:)?ring-${C}-${SH}`, 'g'), `$1ring-[${RING}]`);

  // 6. Shadows (arbitrary shadow-COLOR syntax)
  s = s.replace(new RegExp(`\\b(hover:)?shadow-${C}-${SH}`, 'g'), `$1shadow-[color:${SHADOW}]`);

  // 7. SVG fill / stroke
  s = s.replace(new RegExp(`\\b(fill|stroke)-${C}-${SH}`, 'g'), `$1-[${CHART}]`);

  // 8. White/black text that sat on a (now pale) green fill/gradient -> dark ink.
  //    Operate per quoted string; only strings that carry a lime fill qualify.
  const fillMarker = new RegExp(`\\[${FILL}\\]|from-\\[${FILL}\\]|to-\\[${FILL_HOVER}\\]`);
  s = s.replace(/(['"`])([^'"`]*?)\1/g, (m, q, body) => {
    if (fillMarker.test(body) && /\btext-(white|black)\b/.test(body)) {
      body = body.replace(/\btext-white\b/g, `text-[${INK}]`).replace(/\btext-black\b/g, `text-[${INK}]`);
    }
    return q + body + q;
  });

  // 9. Chart / inline green hex fills
  s = s.replace(/#10b981/gi, CHART)
       .replace(/#16a34a/gi, CHART)
       .replace(/#22c55e/gi, CHART2)
       .replace(/#34d399/gi, CHART2)
       .replace(/#059669/gi, CHART3)
       .replace(/#047857/gi, CHART3);

  return s;
}

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (['.tsx', '.ts'].includes(extname(p))) out.push(p);
  }
  return out;
}

let changed = 0;
for (const file of walk(ROOT)) {
  const before = readFileSync(file, 'utf8');
  const after = transform(before);
  if (after !== before) {
    writeFileSync(file, after);
    changed++;
    console.log('updated', file.replace(ROOT, ''));
  }
}
console.log(`\nDone. ${changed} files changed.`);
