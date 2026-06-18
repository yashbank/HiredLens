/**
 * HiredLens — Portfolio Case-Study deck generator (PDFKit, fully vector, self-contained).
 * Output: docs/portfolio/HiredLens-Case-Study.pdf  (12 landscape slides, 1280×800)
 *
 *   node scripts/build-portfolio-pdf.mjs
 */
import PDFDocument from "pdfkit";
import { createWriteStream, existsSync } from "node:fs";

/* ───────────────────────── config (edit these two if needed) ───────────────────────── */
const DEMO_URL = "hiredlens.vercel.app"; // ← your live Vercel URL
const DISCOUNT = "YASH20";
const LINKS = {
  linkedin: "linkedin.com/in/yash-bankar-9249531aa",
  github: "github.com/yashbank",
  portfolio: "yashbank.github.io",
  instagram: "instagram.com/yashbank",
  x: "x.com/YshBnkar1",
  email: "yashbank2002@gmail.com"
};
const AUTHOR = "Yash Bankar";
const ROLE = "Full-Stack Product Engineer · UI/UX";

/* ───────────────────────── palette ───────────────────────── */
const C = {
  bg: "#0B0A12",
  bg2: "#0E0C16",
  panel: "#16131F",
  panel2: "#1B1726",
  line: "#2A2540",
  text: "#F1EFFA",
  mute: "#A39FB8",
  faint: "#6E6985",
  violet: "#8B5CF6",
  indigo: "#6366F1",
  cyan: "#22D3EE",
  magenta: "#EC4899",
  orange: "#FB923C",
  blue: "#3B82F6",
  emerald: "#34D399",
  amber: "#FBBF24",
  white: "#FFFFFF"
};
const GRAD = [C.violet, C.cyan, C.magenta];

/* ───────────────────────── fonts ───────────────────────── */
const FB = "node_modules/@expo-google-fonts";
const F = {
  display: `${FB}/space-grotesk/700Bold/SpaceGrotesk_700Bold.ttf`,
  displaySemi: `${FB}/space-grotesk/600SemiBold/SpaceGrotesk_600SemiBold.ttf`,
  displayMed: `${FB}/space-grotesk/500Medium/SpaceGrotesk_500Medium.ttf`,
  body: `${FB}/inter/400Regular/Inter_400Regular.ttf`,
  bodyMed: `${FB}/inter/500Medium/Inter_500Medium.ttf`,
  bodySemi: `${FB}/inter/600SemiBold/Inter_600SemiBold.ttf`,
  bodyBold: `${FB}/inter/700Bold/Inter_700Bold.ttf`,
  // expo's JetBrains Mono TTF has a corrupt glyph that breaks fontkit — use reliable Liberation Mono.
  mono: "/usr/share/fonts/truetype/liberation/LiberationMono-Regular.ttf",
  monoBold: "/usr/share/fonts/truetype/liberation/LiberationMono-Bold.ttf"
};

const W = 1280;
const H = 800;
const M = 72;

const doc = new PDFDocument({ size: [W, H], margin: 0, bufferPages: true });
doc.pipe(createWriteStream("docs/portfolio/HiredLens-Case-Study.pdf"));

for (const [name, path] of Object.entries(F)) {
  if (existsSync(path)) doc.registerFont(name, path);
  else doc.registerFont(name, "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf");
}

/* Guarantee every rendered string is glyph-safe (pure ASCII out) across all font weights. */
const GLYPHMAP = {
  "—": " - ", "–": "-", "·": "-", "…": "...", "→": ">", "←": "<", "⌘": "Cmd",
  "“": '"', "”": '"', "‘": "'", "’": "'", "×": "x", "•": "-", "é": "e", "©": "(c)"
};
const sanitize = (s) => s.replace(/[^\x00-\x7F]/g, (c) => (GLYPHMAP[c] === undefined ? "" : GLYPHMAP[c]));
const _text = doc.text.bind(doc);
doc.text = (str, ...rest) => _text(typeof str === "string" ? sanitize(str) : str, ...rest);
const _wos = doc.widthOfString.bind(doc);
doc.widthOfString = (str, ...rest) => _wos(typeof str === "string" ? sanitize(str) : str, ...rest);

/* ───────────────────────── primitives ───────────────────────── */
const set = (font, size, color) => doc.font(font).fontSize(size).fillColor(color);

function rrect(x, y, w, h, r, fill, stroke, lw = 1) {
  doc.roundedRect(x, y, w, h, r);
  if (fill && stroke) doc.lineWidth(lw).fillAndStroke(fill, stroke);
  else if (fill) doc.fill(fill);
  else if (stroke) doc.lineWidth(lw).stroke(stroke);
}

function softShadow(x, y, w, h, r = 18) {
  doc.save().opacity(0.5);
  doc.roundedRect(x + 4, y + 8, w, h, r).fill("#000000");
  doc.restore();
}

function gradRect(x, y, w, h, r, stops, angle = 0) {
  const g =
    angle === 0
      ? doc.linearGradient(x, y, x + w, y + h)
      : doc.linearGradient(x, y + h, x + w, y);
  stops.forEach((s, i) => g.stop(i / (stops.length - 1), s));
  doc.roundedRect(x, y, w, h, r).fill(g);
}

function blob(cx, cy, r, color, op = 0.5) {
  const g = doc.radialGradient(cx, cy, 0, cx, cy, r);
  g.stop(0, color).stop(1, C.bg);
  doc.save().opacity(op);
  doc.circle(cx, cy, r).fill(g);
  doc.restore();
}

function pageBG(deck = false) {
  doc.rect(0, 0, W, H).fill(deck ? C.bg : C.bg2);
  blob(160, 80, 420, C.violet, 0.22);
  blob(W - 120, 220, 420, C.cyan, 0.14);
  blob(W - 320, H - 80, 460, C.magenta, 0.14);
}

function pill(x, y, label, color = C.violet, fillBg) {
  set(F.bodySemi, 10, C.text);
  const tw = doc.widthOfString(label.toUpperCase(), { characterSpacing: 1.3 });
  const w = tw + 34;
  rrect(x, y, w, 25, 12.5, fillBg || hexA(color, 0.1), hexA(color, 0.28), 1);
  doc.circle(x + 13, y + 12.5, 3).fill(color);
  set(F.bodySemi, 10, C.text).text(label.toUpperCase(), x + 22, y + 7.5, {
    characterSpacing: 1.3,
    lineBreak: false
  });
  return w;
}

function hexA(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255,
    g = (n >> 8) & 255,
    b = n & 255;
  return `#${[r, g, b, Math.round(a * 255)].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

function kicker(x, y, num, label, color = C.violet) {
  pill(x, y, label, color);
  set(F.mono, 12, C.faint).text(`${num} / 12`, W - M - 60, y + 6, { width: 60, align: "right" });
}

function title(x, y, str, size = 40, w = W - 2 * M, color = C.white) {
  set(F.display, size, color).text(str, x, y, { width: w, lineGap: 2 });
  return doc.y;
}

function gradBar(x, y, w = 64, h = 5) {
  gradRect(x, y, w, h, 3, GRAD);
}

function footer(n) {
  doc.save().opacity(0.5);
  doc.moveTo(M, H - 46).lineTo(W - M, H - 46).lineWidth(1).stroke(C.line);
  doc.restore();
  set(F.bodySemi, 10, C.faint).text("HIREDLENS", M, H - 36, { characterSpacing: 1.5, lineBreak: false });
  set(F.body, 10, C.faint).text("AI Career Intelligence · Tri-theme UI/UX Showcase", M + 90, H - 36, {
    lineBreak: false
  });
  set(F.mono, 10, C.faint).text(`${String(n).padStart(2, "0")}`, W - M - 30, H - 36, {
    width: 30,
    align: "right"
  });
}

function bullet(x, y, w, text, color = C.cyan) {
  doc.circle(x + 4, y + 7, 4).fill(color);
  doc.circle(x + 4, y + 7, 7).lineWidth(1.2).stroke(hexA(color, 0.4));
  set(F.body, 12.5, C.mute).text(text, x + 20, y, { width: w - 20, lineGap: 3 });
  return doc.y;
}

/* ───────────────────────── icons ───────────────────────── */
function iconAperture(cx, cy, r, color = C.white) {
  doc.save();
  doc.circle(cx, cy, r).lineWidth(r * 0.16).stroke(color);
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i;
    const a2 = a + Math.PI / 3;
    doc
      .moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r)
      .lineTo(cx + Math.cos(a2) * r * 0.32, cy + Math.sin(a2) * r * 0.32)
      .lineWidth(r * 0.11)
      .stroke(color);
  }
  doc.restore();
}

function iconCheck(cx, cy, s, color) {
  doc
    .moveTo(cx - s, cy)
    .lineTo(cx - s * 0.25, cy + s * 0.8)
    .lineTo(cx + s, cy - s * 0.7)
    .lineWidth(s * 0.5)
    .lineCap("round")
    .lineJoin("round")
    .stroke(color);
}

function iconBolt(cx, cy, s, color) {
  doc
    .moveTo(cx + s * 0.2, cy - s)
    .lineTo(cx - s * 0.6, cy + s * 0.1)
    .lineTo(cx, cy + s * 0.1)
    .lineTo(cx - s * 0.2, cy + s)
    .lineTo(cx + s * 0.6, cy - s * 0.1)
    .lineTo(cx, cy - s * 0.1)
    .closePath()
    .fill(color);
}

function iconReact(cx, cy, r, color = C.cyan) {
  doc.save();
  for (let i = 0; i < 3; i++) {
    doc.save();
    doc.translate(cx, cy).rotate(60 * i);
    doc.ellipse(0, 0, r, r * 0.4).lineWidth(1.6).stroke(color);
    doc.restore();
  }
  doc.circle(cx, cy, r * 0.18).fill(color);
  doc.restore();
}

function arcPath(cx, cy, r, a0, a1) {
  const p0 = [cx + r * Math.cos(a0), cy + r * Math.sin(a0)];
  const p1 = [cx + r * Math.cos(a1), cy + r * Math.sin(a1)];
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return `M ${p0[0]} ${p0[1]} A ${r} ${r} 0 ${large} 1 ${p1[0]} ${p1[1]}`;
}

/* gauge ring used in mockups */
function gauge(cx, cy, r, pct, label, value) {
  doc.circle(cx, cy, r).lineWidth(11).stroke(C.line);
  const start = -Math.PI / 2;
  const end = start + (pct / 100) * Math.PI * 2;
  const g = doc.linearGradient(cx - r, cy - r, cx + r, cy + r);
  g.stop(0, C.violet).stop(0.5, C.cyan).stop(1, C.magenta);
  doc.path(arcPath(cx, cy, r, start, end)).lineWidth(11).lineCap("round").stroke(g);
  set(F.display, r * 0.62, C.white).text(value, cx - r, cy - r * 0.42, { width: r * 2, align: "center" });
  set(F.bodySemi, 8.5, C.mute).text(label.toUpperCase(), cx - r, cy + r * 0.28, {
    width: r * 2,
    align: "center",
    characterSpacing: 1
  });
}

/* ── refined line icons (lucide-style) ── */
const ic = (c, lw = 1.7) => doc.lineWidth(lw).lineCap("round").lineJoin("round").strokeColor(c);
function iconTarget(cx, cy, s, c) {
  doc.circle(cx, cy, s); ic(c).stroke();
  doc.circle(cx, cy, s * 0.55); ic(c).stroke();
  doc.circle(cx, cy, s * 0.12).fill(c);
}
function spark(x, y, s, c) {
  doc.moveTo(x - s, y).lineTo(x + s, y).moveTo(x, y - s).lineTo(x, y + s);
  ic(c, 1.3).stroke();
}
function iconWand(cx, cy, s, c) {
  doc.moveTo(cx - s * 0.75, cy + s * 0.75).lineTo(cx + s * 0.35, cy - s * 0.35); ic(c, 1.9).stroke();
  spark(cx + s * 0.55, cy - s * 0.65, s * 0.32, c);
  spark(cx + s * 0.95, cy - s * 0.05, s * 0.22, c);
  spark(cx + s * 0.1, cy - s * 0.95, s * 0.2, c);
}
function iconChart(cx, cy, s, c) {
  const base = cy + s;
  [s * 0.7, s * 1.25, s * 1.85].forEach((h, i) => {
    const x = cx - s + i * s;
    doc.moveTo(x, base).lineTo(x, base - h); ic(c, 2.1).stroke();
  });
}
function iconMic(cx, cy, s, c) {
  doc.roundedRect(cx - s * 0.5, cy - s, s, s * 1.35, s * 0.5); ic(c).stroke();
  doc.path(`M ${cx - s * 0.85} ${cy + s * 0.05} a ${s * 0.85} ${s * 0.85} 0 0 0 ${s * 1.7} 0`); ic(c).stroke();
  doc.moveTo(cx, cy + s * 0.9).lineTo(cx, cy + s * 1.45); ic(c).stroke();
}
function iconRoute(cx, cy, s, c) {
  doc.circle(cx - s * 0.7, cy + s * 0.75, 2.4); ic(c, 1.6).stroke();
  doc.circle(cx + s * 0.7, cy - s * 0.75, 2.4); ic(c, 1.6).stroke();
  doc.path(`M ${cx - s * 0.7} ${cy + s * 0.4} v ${-s * 0.5} a ${s * 0.55} ${s * 0.55} 0 0 1 ${s * 0.55} ${-s * 0.55} h ${s * 0.15}`);
  ic(c, 1.6).dash(2.4, { space: 2.4 }).stroke();
  doc.undash();
}
function iconBook(cx, cy, s, c) {
  doc.path(`M ${cx} ${cy - s} v ${s * 2} M ${cx} ${cy - s} h ${-s} v ${s * 2} h ${s} M ${cx} ${cy - s} h ${s} v ${s * 2} h ${-s}`);
  ic(c, 1.6).stroke();
}
function softCircle(cx, cy, r, c, op) {
  doc.save().opacity(op);
  doc.circle(cx, cy, r).fill(c);
  doc.restore();
}

/* mini theme preview frame (or real screenshot if present at docs/portfolio/screens/<kind>.png) */
const THEME_UI = {
  aurora: { bg: "#15121F", panel: "#1F1A2E", sb: "#1A1626", sub: "#8B86A0", a1: C.violet, a2: C.cyan, light: false, mesh: false },
  porcelain: { bg: "#F3F3F8", panel: "#FFFFFF", sb: "#FBFBFE", sub: "#9A9AA8", a1: C.blue, a2: "#A78BFA", light: true, mesh: false },
  pulse: { bg: "#1B1020", panel: "#241526", sb: "#1F1322", sub: "#A98CA0", a1: C.orange, a2: C.magenta, light: false, mesh: true }
};
function miniApp(x, y, w, h, kind) {
  const P = THEME_UI[kind];
  doc.save();
  doc.roundedRect(x, y, w, h, 10).clip();
  doc.rect(x, y, w, h).fill(P.bg);
  if (P.mesh) {
    softCircle(x + w * 0.72, y + h * 0.28, w * 0.45, C.magenta, 0.5);
    softCircle(x + w * 0.2, y + h * 0.85, w * 0.4, C.orange, 0.4);
  }
  doc.rect(x, y, w, 16).fill(P.panel);
  [C.magenta, C.amber, C.emerald].forEach((c, i) => doc.circle(x + 9 + i * 7, y + 8, 2).fill(c));
  [C.violet, C.blue, C.orange].forEach((c, i) => doc.circle(x + w - 30 + i * 9, y + 8, 3).fill(c));
  doc.rect(x, y + 16, 40, h - 16).fill(P.sb);
  for (let i = 0; i < 5; i++)
    doc.roundedRect(x + 7, y + 26 + i * 13, 26, 5, 2.5).fill(i === 0 ? hexA(P.a1, 0.6) : hexA(P.sub, 0.32));
  const mx = x + 50;
  doc.circle(mx + 18, y + 46, 14).lineWidth(3).stroke(hexA(P.sub, 0.3));
  doc.path(arcPath(mx + 18, y + 46, 14, -Math.PI / 2, Math.PI)).lineWidth(3).lineCap("round").stroke(P.a1);
  doc.roundedRect(mx + 44, y + 30, w - (mx - x) - 56, 13, 3).fill(P.panel);
  const cwid = (w - (mx - x) - 60) / 2;
  doc.roundedRect(mx + 44, y + 50, cwid, 24, 3).fill(P.panel);
  doc.roundedRect(mx + 50 + cwid, y + 50, cwid, 24, 3).fill(P.panel);
  for (let i = 0; i < 4; i++) doc.roundedRect(mx + 44 + i * 26, y + 82, 22, 8, 4).fill(hexA(P.a2, 0.45));
  doc.restore();
  doc.roundedRect(x, y, w, h, 10).lineWidth(1).stroke(hexA("#FFFFFF", P.light ? 0.18 : 0.12));
}
function preview(x, y, w, h, kind) {
  const p = `docs/portfolio/screens/${kind}.png`;
  if (existsSync(p)) {
    doc.save();
    doc.roundedRect(x, y, w, h, 10).clip();
    try {
      doc.image(p, x, y, { cover: [w, h], align: "center", valign: "center" });
    } catch {
      miniApp(x, y, w, h, kind);
    }
    doc.restore();
    doc.roundedRect(x, y, w, h, 10).lineWidth(1).stroke(hexA("#FFFFFF", 0.16));
  } else {
    miniApp(x, y, w, h, kind);
  }
}

/* social badge: returns drawn */
function social(x, y, kind, handle) {
  const s = 30;
  if (kind === "linkedin") {
    rrect(x, y, s, s, 7, "#0A66C2");
    set(F.bodyBold, 14, C.white).text("in", x, y + 7, { width: s, align: "center" });
  } else if (kind === "github") {
    rrect(x, y, s, s, 7, "#181B22", C.line, 1);
    doc.circle(x + s / 2, y + s / 2 - 1, 7).lineWidth(2).stroke(C.white);
    doc.moveTo(x + s / 2 - 3, y + s - 7).lineTo(x + s / 2 - 3, y + s - 4).lineWidth(2).stroke(C.white);
    doc.moveTo(x + s / 2 + 3, y + s - 7).lineTo(x + s / 2 + 3, y + s - 4).lineWidth(2).stroke(C.white);
  } else if (kind === "instagram") {
    gradRect(x, y, s, s, 8, ["#F58529", "#DD2A7B", "#8134AF"], 1);
    rrect(x + 7, y + 7, s - 14, s - 14, 5, null, C.white, 2);
    doc.circle(x + s / 2, y + s / 2, 4).lineWidth(2).stroke(C.white);
    doc.circle(x + s - 9.5, y + 9.5, 1.3).fill(C.white);
  } else if (kind === "portfolio") {
    gradRect(x, y, s, s, 7, [C.violet, C.cyan], 1);
    doc.circle(x + s / 2, y + s / 2, 8).lineWidth(1.6).stroke(C.white);
    doc.ellipse(x + s / 2, y + s / 2, 3.4, 8).lineWidth(1.4).stroke(C.white);
    doc.moveTo(x + s / 2 - 8, y + s / 2).lineTo(x + s / 2 + 8, y + s / 2).lineWidth(1.4).stroke(C.white);
  } else if (kind === "x") {
    rrect(x, y, s, s, 7, "#000000", C.line, 1);
    doc.moveTo(x + 9, y + 9).lineTo(x + s - 9, y + s - 9).lineWidth(2).lineCap("round").stroke(C.white);
    doc.moveTo(x + s - 9, y + 9).lineTo(x + 9, y + s - 9).lineWidth(2).lineCap("round").stroke(C.white);
  } else if (kind === "email") {
    rrect(x, y, s, s, 7, "#1B1726", C.line, 1);
    doc.roundedRect(x + 6, y + 9, s - 12, s - 18, 2).lineWidth(1.6).stroke(C.cyan);
    doc.moveTo(x + 6, y + 10).lineTo(x + s / 2, y + s / 2 + 1).lineTo(x + s - 6, y + 10).lineWidth(1.4).stroke(C.cyan);
  }
  set(F.bodyMed, 12, C.text).text(handle, x + s + 12, y + 8, { lineBreak: false });
}

/* tech chip */
function techChip(x, y, label, color, emblem) {
  set(F.bodySemi, 11.5, C.text);
  const tw = doc.widthOfString(label);
  const w = tw + 52;
  rrect(x, y, w, 34, 10, C.panel2, C.line, 1);
  rrect(x + 8, y + 8, 18, 18, 5, hexA(color, 0.22));
  if (emblem === "react") iconReact(x + 17, y + 17, 7, color);
  else if (emblem === "bolt") iconBolt(x + 17, y + 17, 6, color);
  else {
    set(F.bodyBold, 9, color).text(emblem, x + 8, y + 11.5, { width: 18, align: "center" });
  }
  set(F.bodySemi, 11.5, C.text).text(label, x + 34, y + 10.5, { lineBreak: false });
  return w + 10;
}

/* feature / info card */
function card(x, y, w, h, accent, icon, head, body) {
  softShadow(x, y, w, h, 16);
  rrect(x, y, w, h, 16, C.panel, C.line, 1);
  rrect(x, y, w, 4, 2, null);
  gradRect(x + 18, y + 18, 44, 44, 12, [accent, hexA(accent, 0.5)]);
  if (icon) icon(x + 40, y + 40);
  set(F.displaySemi, 15, C.white).text(head, x + 18, y + 78, { width: w - 36 });
  set(F.body, 11, C.mute).text(body, x + 18, y + 104, { width: w - 36, lineGap: 4 });
}

/* ════════════════════════ SLIDE 1 — COVER ════════════════════════ */
function cover() {
  pageBG(true);
  blob(W * 0.5, 120, 520, C.indigo, 0.28);
  // logo
  gradRect(M, M, 60, 60, 16, GRAD);
  iconAperture(M + 30, M + 30, 17, C.white);
  set(F.displaySemi, 16, C.white).text("HiredLens", M + 74, M + 12, { lineBreak: false });
  set(F.body, 11, C.mute).text("AI Career Intelligence", M + 74, M + 34, { lineBreak: false });

  // shipped badge top-right
  const bw = 250;
  rrect(W - M - bw, M + 8, bw, 40, 20, hexA(C.emerald, 0.12), hexA(C.emerald, 0.5), 1);
  doc.circle(W - M - bw + 22, M + 28, 4).fill(C.emerald);
  set(F.bodyBold, 11, C.emerald).text("SHIPPED TO A CLIENT", W - M - bw + 38, M + 22, {
    characterSpacing: 0.6,
    lineBreak: false
  });

  set(F.bodySemi, 13, C.cyan).text("ENGINEERING CASE STUDY", M, 244, { characterSpacing: 3 });
  set(F.display, 72, C.white).text("The tri-theme", M, 276, { lineBreak: false });
  doc.text("AI dashboard.", M, 360, { lineBreak: false });
  gradBar(M + 4, 462, 120, 6);

  set(F.body, 15, C.mute).text(
    "One product, three unidentical design languages — switchable live. A motion-rich,\n3D-accented Next.js workspace for resume scoring, keyword analysis, AI rewrites\nand mock interviews.",
    M,
    486,
    { width: 720, lineGap: 5 }
  );

  // theme dots
  const tx = M;
  ["Aurora", "Porcelain", "Pulse"].forEach((t, i) => {
    const x = tx + i * 150;
    doc.circle(x + 8, 632, 8).fill(GRAD[i]);
    set(F.bodySemi, 12, C.text).text(t, x + 24, 626, { lineBreak: false });
  });

  // author block bottom-right
  set(F.displaySemi, 16, C.white).text(AUTHOR, W - M - 360, 600, { width: 360, align: "right" });
  set(F.body, 11.5, C.mute).text(ROLE, W - M - 360, 624, { width: 360, align: "right" });
  set(F.mono, 11, C.cyan).text(LINKS.portfolio, W - M - 360, 648, { width: 360, align: "right" });

  // mini dashboard peek (bottom strip)
  const mx = M,
    my = 690;
  set(F.mono, 10.5, C.faint).text(`LIVE DEMO  ·  ${DEMO_URL}`, mx, my + 4, { lineBreak: false });
  footer(1);
}

/* ════════════════════════ SLIDE 2 — TL;DR ════════════════════════ */
function snapshot() {
  pageBG();
  kicker(M, M, 2, "Snapshot");
  title(M, M + 36, "What is HiredLens?", 42);
  set(F.body, 13.5, C.mute).text(
    "An AI career-intelligence dashboard that scores a resume against a single job description — match score, ATS safety, missing keywords, AI rewrites, and a mock-interview studio. Built to demonstrate best-in-class, AI-driven frontend craft.",
    M,
    M + 96,
    { width: 720, lineGap: 4 }
  );

  // shipped callout (BOLD)
  const cy = M + 188;
  gradRect(M, cy, 720, 92, 14, [hexA(C.emerald, 0.16), hexA(C.cyan, 0.1)], 1);
  rrect(M, cy, 720, 92, 14, null, hexA(C.emerald, 0.4), 1.2);
  iconCheck(M + 34, cy + 44, 12, C.emerald);
  set(F.bodyBold, 14.5, C.white).text(
    "Already shipped to a client.",
    M + 64,
    cy + 22,
    { width: 640 }
  );
  set(F.bodyMed, 11.5, C.mute).text(
    "This is a public demo version, deployed on my own Vercel so anyone can explore exactly what I build — with realistic mock data and no real authentication.",
    M + 64,
    cy + 44,
    { width: 632, lineGap: 2 }
  );

  // right stat rail
  const rx = M + 776;
  const stats = [
    ["3", "design languages", C.violet],
    ["60 fps", "motion target", C.cyan],
    ["12+", "polished surfaces", C.magenta],
    ["0", "backends — pure frontend", C.orange]
  ];
  stats.forEach((s, i) => {
    const y = M + 36 + i * 86;
    rrect(rx, y, 360, 72, 14, C.panel, C.line, 1);
    set(F.display, 30, s[2]).text(s[0], rx + 18, y + 16, { lineBreak: false });
    set(F.bodyMed, 12, C.mute).text(s[1], rx + 130, y + 28, { width: 220, lineBreak: false });
  });

  // bottom: who it's for
  const by = M + 320;
  set(F.bodySemi, 11, C.faint).text("BUILT TO IMPRESS", M, by, { characterSpacing: 2 });
  let yy = by + 24;
  [
    "UI/UX clients & founders who want a modern, premium AI dashboard.",
    "Designers & teams evaluating motion, 3D and design-system depth.",
    "Recruiters looking for production-grade React / Next.js craft."
  ].forEach((t) => {
    yy = bullet(M, yy, 720, t, GRAD[0]) + 10;
  });
  footer(2);
}

/* ════════════════════════ SLIDE 3 — TRI-THEME ════════════════════════ */
function themes() {
  pageBG();
  kicker(M, M, 3, "The big idea", C.magenta);
  title(M, M + 36, "One product. Three design languages.", 38);
  set(F.body, 13, C.mute).text(
    "Most portfolios ship one look. HiredLens ships three — color, type, radius, shadow, surface and motion all swap from a single token engine, live, with a circular reveal.",
    M,
    M + 92,
    { width: 880, lineGap: 3 }
  );

  const cardsY = M + 180,
    cw = 348,
    ch = 372,
    gap = 24;
  const themesData = [
    { n: "Aurora", kind: "aurora", t: "Spatial glass", c: C.violet, sw: [C.violet, C.cyan, C.magenta], desc: "Dark glassmorphism with blur, depth and neon aurora light.", tags: ["Glass", "Blur", "Neon"] },
    { n: "Porcelain", kind: "porcelain", t: "Airy minimal", c: C.blue, sw: [C.blue, "#A78BFA", C.cyan], desc: "Light, calm, Apple-grade restraint with soft shadow and whitespace.", tags: ["Soft", "Clean", "Light"] },
    { n: "Pulse", kind: "pulse", t: "Vivid energy", c: C.orange, sw: [C.orange, C.magenta, C.violet], desc: "Bold gradient mesh, grain and expressive type with spring motion.", tags: ["Gradient", "Grain", "Springy"] }
  ];
  themesData.forEach((th, i) => {
    const x = M + i * (cw + gap);
    softShadow(x, cardsY, cw, ch, 18);
    rrect(x, cardsY, cw, ch, 18, C.panel, C.line, 1);
    preview(x + 16, cardsY + 16, cw - 32, 150, th.kind);
    set(F.display, 23, C.white).text(th.n, x + 20, cardsY + 182, { lineBreak: false });
    th.sw.forEach((c, j) => doc.circle(x + cw - 26 - j * 19, cardsY + 192, 6.5).fill(c));
    set(F.bodySemi, 10.5, th.c).text(th.t.toUpperCase(), x + 20, cardsY + 212, { characterSpacing: 1.5 });
    set(F.body, 11.5, C.mute).text(th.desc, x + 20, cardsY + 234, { width: cw - 40, lineGap: 4.5 });
    let tagX = x + 20;
    th.tags.forEach((tg) => {
      tagX += pill(tagX, cardsY + 314, tg, th.c) + 8;
    });
  });
  footer(3);
}

/* ════════════════════════ SLIDE 4 — DEMO ════════════════════════ */
function demo() {
  pageBG();
  kicker(M, M, 4, "Live demo", C.cyan);
  title(M, M + 36, "See it running — one click in.", 38);

  // browser mockup
  const bx = M,
    by = M + 110,
    bw = 720,
    bh = 470;
  softShadow(bx, by, bw, bh, 16);
  rrect(bx, by, bw, bh, 16, C.panel2, C.line, 1);
  rrect(bx, by, bw, 38, 16, "#221E30");
  doc.rect(bx, by + 24, bw, 14).fill("#221E30");
  ["#FF5F57", "#FEBC2E", "#28C840"].forEach((c, i) => doc.circle(bx + 22 + i * 18, by + 19, 5).fill(c));
  rrect(bx + 84, by + 9, 220, 20, 10, C.bg);
  set(F.mono, 9, C.faint).text(DEMO_URL + "/app/overview", bx + 96, by + 14, { lineBreak: false });

  // sidebar
  const sb = bx + 14;
  rrect(sb, by + 50, 120, bh - 64, 12, C.bg);
  gradRect(sb + 14, by + 66, 22, 22, 7, GRAD);
  set(F.bodySemi, 9, C.text).text("HiredLens", sb + 42, by + 72, { lineBreak: false });
  ["Overview", "Keywords", "Rewrites", "Interview", "Roadmap"].forEach((n, i) => {
    const y = by + 110 + i * 30;
    if (i === 0) rrect(sb + 10, y - 6, 100, 26, 7, hexA(C.violet, 0.2), hexA(C.violet, 0.5), 1);
    doc.circle(sb + 22, y + 7, 3).fill(i === 0 ? C.violet : C.faint);
    set(F.bodyMed, 8.5, i === 0 ? C.text : C.mute).text(n, sb + 34, y + 2, { lineBreak: false });
  });

  // main area: gauge + cards
  const mainX = sb + 134;
  gauge(mainX + 78, by + 150, 58, 88, "Overall match", "88");
  // two metric cards
  const mcx = mainX + 168;
  [["Keyword match", "24", C.cyan], ["ATS safety", "91%", C.emerald]].forEach((m, i) => {
    const x = mcx + i * 168,
      y = by + 64;
    rrect(x, y, 152, 96, 12, C.bg, C.line, 1);
    set(F.bodySemi, 8.5, C.faint).text(m[0].toUpperCase(), x + 14, y + 14, { characterSpacing: 0.8 });
    set(F.display, 30, m[2]).text(m[1], x + 14, y + 32, { lineBreak: false });
    for (let b = 0; b < 7; b++)
      gradRect(x + 14 + b * 18, y + 76 - (8 + b * 1.5), 11, 8 + b * 1.5, 2, [m[2], hexA(m[2], 0.4)]);
  });
  // keyword chips
  const ky = by + 178;
  set(F.bodySemi, 8.5, C.faint).text("MISSING KEYWORDS", mcx, ky, { characterSpacing: 0.8 });
  let kx = mcx;
  let kyy = ky + 18;
  ["gRPC", "SLOs", "Multi-region", "k6 in CI", "OpenTelemetry", "Canary"].forEach((c) => {
    set(F.bodyMed, 9, C.amber);
    const w = doc.widthOfString(c) + 20;
    if (kx + w > bx + bw - 24) {
      kx = mcx;
      kyy += 28;
    }
    rrect(kx, kyy, w, 22, 11, hexA(C.amber, 0.12), hexA(C.amber, 0.4), 1);
    set(F.bodyMed, 9, C.amber).text(c, kx + 10, kyy + 6, { lineBreak: false });
    kx += w + 8;
  });
  // before/after strip
  const baY = by + 300;
  rrect(mcx, baY, bx + bw - 24 - mcx, 130, 12, C.bg, C.line, 1);
  set(F.bodySemi, 8.5, C.faint).text("AI REWRITE · BEFORE / AFTER", mcx + 14, baY + 12, { characterSpacing: 0.8 });
  set(F.body, 9, C.faint).text('"Worked on backend services, fixed bugs on-call."', mcx + 14, baY + 36, {
    width: 156,
    lineGap: 2
  });
  doc
    .path(`M ${mcx + 182} ${baY + 52} l 16 0 m -5 -5 l 5 5 l -5 5`)
    .lineWidth(1.4)
    .lineCap("round")
    .lineJoin("round")
    .stroke(C.violet);
  set(F.bodyMed, 9, C.text).text(
    '"Led reliability for ledger ingestion (Go): SLOs 99.95%, cut p99 22% via pooling + cache guards."',
    mcx + 210,
    baY + 32,
    { width: 166, lineGap: 2 }
  );

  // right column: how to enter
  const rx = bx + bw + 36;
  set(F.displaySemi, 18, C.white).text("Frictionless entry", rx, by + 6, { width: 300 });
  set(F.body, 12, C.mute).text(
    "A floating, semi-transparent demo card drops anyone straight into the dashboard — no sign-up.",
    rx,
    by + 38,
    { width: 300, lineGap: 3 }
  );
  // demo cred card
  const dcy = by + 116;
  rrect(rx, dcy, 300, 150, 14, C.panel, hexA(C.violet, 0.4), 1.2);
  doc.circle(rx + 22, dcy + 26, 4).fill(C.emerald);
  set(F.bodySemi, 12, C.white).text("Demo access", rx + 36, dcy + 19, { lineBreak: false });
  pill(rx + 188, dcy + 14, "no sign-up", C.violet);
  [["Email", "demo@hiredlens.ai"], ["Password", "letmein"]].forEach((r, i) => {
    const y = dcy + 48 + i * 34;
    rrect(rx + 16, y, 268, 28, 7, C.bg, C.line, 1);
    set(F.bodyMed, 8.5, C.faint).text(r[0].toUpperCase(), rx + 26, y + 5, { characterSpacing: 0.6 });
    set(F.mono, 11, C.text).text(r[1], rx + 26, y + 14, { lineBreak: false });
  });
  gradRect(rx, dcy + 162, 300, 40, 10, GRAD);
  set(F.bodySemi, 12, C.white).text("Enter demo", rx, dcy + 174, { width: 300, align: "center" });
  doc.path(`M ${rx + 198} ${dcy + 176} l 7 6 l -7 6`).lineWidth(1.6).lineCap("round").lineJoin("round").stroke(C.white);

  set(F.mono, 11, C.cyan).text(DEMO_URL, rx, by + 360, { width: 300 });
  set(F.body, 10.5, C.faint).text("Try switching themes in the top bar — the whole app re-skins.", rx, by + 382, {
    width: 300,
    lineGap: 2
  });
  footer(4);
}

/* ════════════════════════ SLIDE 5 — FEATURES ════════════════════════ */
function features() {
  pageBG();
  kicker(M, M, 5, "Feature tour", C.orange);
  title(M, M + 36, "Built for the whole job hunt.", 38);

  const items = [
    [C.cyan, "Keyword analysis", "Semantic match of resume vs. posting — matched and missing chips weighted by impact.", (x, y) => iconTarget(x, y, 9, C.white)],
    [C.violet, "AI rewrites", "Before/after bullet rewrites with keyword injection and quantified outcomes.", (x, y) => iconWand(x, y, 8, C.white)],
    [C.magenta, "Overview score", "North-star match, ATS safety and prioritized gaps with animated gauges.", (x, y) => iconChart(x, y, 7, C.white)],
    [C.emerald, "Mock interviews", "Voice or text practice with a role-tuned AI persona and live waveform.", (x, y) => iconMic(x, y, 7, C.white)],
    [C.orange, "Skill roadmap", "A sequenced upskilling plan inferred from your gaps and milestones.", (x, y) => iconRoute(x, y, 8, C.white)],
    [C.blue, "Q&A prep", "Behavioral and system-design prompts aligned to staff-level rubrics.", (x, y) => iconBook(x, y, 7, C.white)]
  ];
  const cols = 3,
    cw = 360,
    ch = 168,
    gx = 28,
    gy = 26;
  const startY = M + 110;
  items.forEach((it, i) => {
    const x = M + (i % cols) * (cw + gx);
    const y = startY + Math.floor(i / cols) * (ch + gy);
    card(x, y, cw, ch, it[0], it[3], it[1], it[2]);
  });
  footer(5);
}

/* ════════════════════════ SLIDE 6 — STACK ════════════════════════ */
function stack() {
  pageBG();
  kicker(M, M, 6, "Tech stack", C.cyan);
  title(M, M + 36, "A modern, frontend-heavy stack.", 38);

  const groups = [
    ["Framework & language", [["Next.js 15", C.white, "N"], ["React 19", C.cyan, "react"], ["TypeScript", C.blue, "TS"]]],
    ["Styling & system", [["Tailwind CSS", C.cyan, "tw"], ["CSS tokens", C.violet, "{}"], ["shadcn / Radix", C.text, "rx"]]],
    ["Motion & 3D", [["Framer Motion", C.magenta, "bolt"], ["three.js", C.white, "3D"], ["react-three-fiber", C.cyan, "R3F"], ["drei", C.violet, "d"]]],
    ["UI & experience", [["cmdk palette", C.amber, "K"], ["Embla carousel", C.orange, "EM"], ["sonner toasts", C.emerald, "so"], ["lucide icons", C.blue, "ic"]]],
    ["Type & tooling", [["Space Grotesk", C.violet, "Aa"], ["Inter", C.cyan, "Aa"], ["Bricolage", C.magenta, "Aa"], ["next-themes", C.emerald, "nt"]]]
  ];
  let y = M + 110;
  groups.forEach((g) => {
    set(F.bodySemi, 11, C.faint).text(g[0].toUpperCase(), M, y, { characterSpacing: 1.5 });
    let x = M + 230;
    g[1].forEach((t) => {
      x += techChip(x, y - 6, t[0], t[1], t[2]);
    });
    y += 58;
  });

  // note panel
  rrect(M, y + 6, W - 2 * M, 70, 14, C.panel, C.line, 1);
  iconBolt(M + 36, y + 41, 11, C.amber);
  set(F.bodyMed, 12, C.mute).text(
    "Heavy bundles are a deliberate, acceptable trade-off: there is no backend, so the budget goes entirely into motion, 3D and design fidelity. The WebGL path is code-split (ssr:false) and reduced-motion safe.",
    M + 64,
    y + 22,
    { width: W - 2 * M - 96, lineGap: 2.5 }
  );
  footer(6);
}

/* ════════════════════════ SLIDE 7 — ARCHITECTURE ════════════════════════ */
function architecture() {
  pageBG();
  kicker(M, M, 7, "Architecture & patterns", C.violet);
  title(M, M + 36, "How it's put together.", 38);

  // diagram (left)
  const dx = M,
    dy = M + 110,
    dw = 560;
  const layers = [
    ["App Router · Server Components", "data/ + types/ mock snapshots to typed props", C.cyan],
    ["Client feature views", "overview · keywords · rewrites · mock-interview", C.violet],
    ["Design system", "tokens · Button/Card variants · charts · carousel", C.magenta],
    ["Cross-cutting systems", "theme engine · motion lib · WebGL · ambient bg", C.orange]
  ];
  layers.forEach((l, i) => {
    const y = dy + i * 92;
    rrect(dx, y, dw, 76, 14, C.panel, C.line, 1);
    rrect(dx, y, 6, 76, 3, l[2]);
    set(F.displaySemi, 14, C.white).text(l[0], dx + 24, y + 16, { width: dw - 40 });
    set(F.body, 11, C.mute).text(l[1], dx + 24, y + 40, { width: dw - 40 });
    if (i < layers.length - 1)
      doc.path(`M ${dx + dw / 2} ${y + 76} l 0 12 m -5 -5 l 5 5 l 5 -5`).lineWidth(1.4).stroke(C.faint);
  });

  // patterns (right)
  const px = dx + dw + 52;
  set(F.bodySemi, 11, C.faint).text("DESIGN PATTERNS APPLIED", px, dy, { characterSpacing: 1.5 });
  const patterns = [
    ["Token-driven theming", "One CSS-variable source of truth; zero duplicated UI across 3 themes."],
    ["Compound + variant components", "CVA variants (Button/Card/Badge) keep a single API, many looks."],
    ["Composition over config", "Reusable motion primitives (Reveal, Tilt, Stagger) compose per page."],
    ["Code-splitting & lazy 3D", "WebGL dynamically imported (ssr:false) behind a fallback."],
    ["Progressive enhancement", "View-Transitions + reduced-motion fallbacks everywhere."],
    ["Server/Client boundary", "Server passes typed data; client owns interaction & animation."]
  ];
  let yy = dy + 26;
  patterns.forEach((p) => {
    rrect(px, yy, W - M - px, 56, 12, C.panel, C.line, 1);
    iconCheck(px + 22, yy + 28, 8, C.emerald);
    set(F.bodySemi, 12.5, C.white).text(p[0], px + 44, yy + 11, { width: W - M - px - 60, lineBreak: false });
    set(F.body, 10, C.mute).text(p[1], px + 44, yy + 30, { width: W - M - px - 60, lineBreak: false });
    yy += 64;
  });
  footer(7);
}

/* ════════════════════════ SLIDE 8 — THEME ENGINE ════════════════════════ */
function engine() {
  pageBG();
  kicker(M, M, 8, "Theme engine", C.magenta);
  title(M, M + 36, "A token engine that re-skins everything.", 36);

  // left: how it works
  const lx = M,
    ly = M + 104,
    lw = 600;
  set(F.body, 12.5, C.mute).text(
    "A single class on <html> swaps a complete block of ~30 semantic tokens. Components never hard-code color — they read hsl(var(--primary)), var(--radius), .glass, etc. Switching uses the View-Transitions API for a circular reveal from the cursor.",
    lx,
    ly,
    { width: lw, lineGap: 4 }
  );

  // code block
  const cy = ly + 110;
  rrect(lx, cy, lw, 188, 14, "#0A0810", C.line, 1);
  rrect(lx, cy, lw, 30, 14, "#17131F");
  doc.rect(lx, cy + 16, lw, 14).fill("#17131F");
  ["#FF5F57", "#FEBC2E", "#28C840"].forEach((c, i) => doc.circle(lx + 18 + i * 16, cy + 15, 4).fill(c));
  set(F.mono, 9, C.faint).text("globals.css", lx + 70, cy + 10, { lineBreak: false });
  const code = [
    [".aurora", C.magenta],
    ["  --primary: 264 90% 66%;  --radius: 1.2rem;", C.text],
    ["  --surface: 250 30% 10%;  --font-display: Space Grotesk;", C.text],
    [".porcelain", C.cyan],
    ["  --primary: 222 83% 53%;  --radius: 0.85rem;", C.text],
    [".pulse", C.orange],
    ["  --primary: 22 100% 58%;   --radius: 0.5rem;", C.text]
  ];
  code.forEach((c, i) => set(F.mono, 10.5, c[1]).text(c[0], lx + 18, cy + 44 + i * 19, { lineBreak: false }));

  // right: token chips
  const rx = lx + lw + 48,
    rw = W - M - (lx + lw + 48);
  set(F.bodySemi, 11, C.faint).text("WHAT A THEME CONTROLS", rx, ly, { characterSpacing: 1.4 });
  const tokens = [
    ["Color", "--background ... --ring", C.violet],
    ["Radius", "--radius", C.cyan],
    ["Surface", "--surface / glass alpha", C.magenta],
    ["Gradient", "--grad-1/2/3", C.orange],
    ["Glow & shadow", "--glow / --shadow-color", C.emerald],
    ["Typography", "--font-display", C.blue]
  ];
  let yy = ly + 26;
  tokens.forEach((t) => {
    rrect(rx, yy, rw, 52, 12, C.panel, C.line, 1);
    doc.circle(rx + 22, yy + 26, 7).fill(t[2]);
    set(F.bodySemi, 12.5, C.white).text(t[0], rx + 40, yy + 10, { lineBreak: false });
    set(F.mono, 9.5, C.mute).text(t[1], rx + 40, yy + 29, { lineBreak: false });
    yy += 60;
  });
  footer(8);
}

/* ════════════════════════ SLIDE 9 — MOTION & 3D ════════════════════════ */
function motion() {
  pageBG();
  kicker(M, M, 9, "Motion & 3D", C.cyan);
  title(M, M + 36, "Premium motion, everywhere.", 38);

  // left list
  const lx = M,
    ly = M + 110,
    lw = 540;
  const prims = [
    ["Reveal / Stagger", "Scroll-triggered fade + rise, staggered children.", (x, y) => { spark(x - 4, y, 3, C.white); spark(x + 5, y - 5, 2.2, C.white); spark(x + 4, y + 5, 2, C.white); }],
    ["AnimatedNumber", "Count-up on first in-view.", (x, y) => iconChart(x, y, 7, C.white)],
    ["Magnetic + Tilt", "Cursor-magnetic buttons; 3D tilt with moving light.", (x, y) => iconTarget(x, y, 7, C.white)],
    ["Spotlight", "Pointer-following radial highlight on cards.", (x, y) => { doc.circle(x, y, 5).lineWidth(1.7).stroke(C.white); spark(x + 7, y - 7, 2.2, C.white); }],
    ["Animated charts", "SVG gauge / area / bars that draw into view.", (x, y) => iconChart(x, y, 7, C.white)],
    ["Command palette", "Command-K nav + theme switching (cmdk).", (x, y) => iconBook(x, y, 7, C.white)]
  ];
  let yy = ly;
  prims.forEach((p, i) => {
    rrect(lx, yy, lw, 64, 12, C.panel, C.line, 1);
    gradRect(lx + 14, yy + 16, 32, 32, 9, [GRAD[i % 3], hexA(GRAD[i % 3], 0.5)]);
    p[2](lx + 30, yy + 32);
    set(F.bodySemi, 13, C.white).text(p[0], lx + 60, yy + 15, { lineBreak: false });
    set(F.body, 10.5, C.mute).text(p[1], lx + 60, yy + 35, { width: lw - 74, lineBreak: false });
    yy += 72;
  });

  // right: 3D orb mock + charts
  const rx = lx + lw + 48,
    rw = W - M - (lx + lw + 48);
  rrect(rx, ly, rw, 230, 16, C.panel, C.line, 1);
  set(F.bodySemi, 10.5, C.faint).text("WEBGL HERO ORB", rx + 18, ly + 16, { characterSpacing: 1.4 });
  // orb
  const ocx = rx + rw / 2,
    ocy = ly + 130;
  blob(ocx, ocy, 90, C.violet, 0.7);
  const og = doc.radialGradient(ocx - 20, ocy - 20, 5, ocx, ocy, 70);
  og.stop(0, C.cyan).stop(0.6, C.violet).stop(1, C.magenta);
  doc.circle(ocx, ocy, 64).fill(og);
  doc.circle(ocx, ocy, 78).lineWidth(1).dash(3, { space: 3 }).stroke(hexA(C.cyan, 0.5)).undash();
  set(F.body, 10, C.mute).text("react-three-fiber + drei · theme-reactive · code-split", rx + 18, ly + 200, {
    width: rw - 36,
    align: "center"
  });

  // charts row
  const chY = ly + 250;
  gauge(rx + 60, chY + 60, 44, 88, "Match", "88");
  rrect(rx + 130, chY, rw - 130, 120, 14, C.panel, C.line, 1);
  set(F.bodySemi, 9, C.faint).text("SCORE TREND", rx + 146, chY + 14, { characterSpacing: 1 });
  // area spark
  const pts = [40, 55, 48, 70, 62, 84, 92];
  const ax = rx + 146,
    aw = rw - 170,
    ab = chY + 100,
    ah = 56;
  let d = "";
  pts.forEach((v, i) => {
    const px = ax + (i / (pts.length - 1)) * aw;
    const py = ab - (v / 100) * ah;
    d += `${i ? "L" : "M"} ${px} ${py} `;
  });
  doc.path(d).lineWidth(2.5).lineCap("round").stroke(C.cyan);
  pts.forEach((v, i) => {
    const px = ax + (i / (pts.length - 1)) * aw;
    const py = ab - (v / 100) * ah;
    doc.circle(px, py, 2.5).fill(C.cyan);
  });
  footer(9);
}

/* ════════════════════════ SLIDE 10 — COMPONENTS + A11Y ════════════════════════ */
function components() {
  pageBG();
  kicker(M, M, 10, "Craft & quality", C.emerald);
  title(M, M + 36, "Component library & quality bar.", 36);

  // left: component inventory chips
  const lx = M,
    ly = M + 104,
    lw = 600;
  set(F.bodySemi, 11, C.faint).text("REUSABLE COMPONENTS (SELECTED)", lx, ly, { characterSpacing: 1.4 });
  const comps = ["Button", "Card", "Badge", "Input", "Sidebar", "Topbar", "ThemeSwitcher", "CommandPalette", "RadialGauge", "AreaSpark", "BarsMini", "Meter", "Carousel", "Marquee", "Tilt", "Magnetic", "Spotlight", "Reveal", "Stagger", "Toaster", "AmbientBackground", "HeroOrb", "DemoCredentials", "PageHeading"];
  let x = lx,
    yy = ly + 26;
  comps.forEach((cmp) => {
    set(F.bodyMed, 11, C.text);
    const w = doc.widthOfString(cmp) + 24;
    if (x + w > lx + lw) {
      x = lx;
      yy += 36;
    }
    rrect(x, yy, w, 28, 8, C.panel2, C.line, 1);
    set(F.bodyMed, 11, C.text).text(cmp, x + 12, yy + 8, { lineBreak: false });
    x += w + 10;
  });

  // right: quality metrics
  const rx = lx + lw + 48,
    rw = W - M - (lx + lw + 48);
  set(F.bodySemi, 11, C.faint).text("QUALITY BAR", rx, ly, { characterSpacing: 1.4 });
  const q = [
    ["Reduced-motion", "First-class: every animation + 3D respects it", C.emerald],
    ["No-flash theming", "Pre-paint script; CSS-scoped backgrounds", C.cyan],
    ["Keyboard-ready", "Cmd-K palette + Radix focus management", C.violet],
    ["Type-safe", "Strict TS; build & lint clean", C.blue],
    ["Code-split 3D", "~170 kB route JS; WebGL loaded on demand", C.orange]
  ];
  let qy = ly + 26;
  q.forEach((m) => {
    rrect(rx, qy, rw, 58, 12, C.panel, C.line, 1);
    iconCheck(rx + 22, qy + 29, 8, m[2]);
    set(F.bodySemi, 12.5, C.white).text(m[0], rx + 44, qy + 11, { lineBreak: false });
    set(F.body, 10, C.mute).text(m[1], rx + 44, qy + 30, { width: rw - 58, lineBreak: false });
    qy += 66;
  });
  footer(10);
}

/* ════════════════════════ SLIDE 11 — CTA / DISCOUNT ════════════════════════ */
function cta() {
  pageBG(true);
  blob(W * 0.5, H * 0.5, 600, C.indigo, 0.3);
  // big panel
  const px = M,
    py = M + 4,
    pw = W - 2 * M,
    ph = 420;
  gradRect(px, py, pw, ph, 24, [hexA(C.violet, 0.18), hexA(C.magenta, 0.12)], 1);
  rrect(px, py, pw, ph, 24, null, hexA(C.violet, 0.45), 1.5);

  iconBolt(px + pw / 2, py + 70, 18, C.amber);
  set(F.display, 46, C.white).text("Want the real application?", px, py + 96, { width: pw, align: "center" });
  set(F.body, 14, C.mute).text(
    "This demo is a slice of a product already shipped to a client. Get the full,\nproduction build for your team — résumé intelligence, AI rewrites & interview prep.",
    px,
    py + 162,
    { width: pw, align: "center", lineGap: 5 }
  );

  // discount code
  const dcw = 420,
    dcx = px + (pw - dcw) / 2,
    dcy = py + 240;
  rrect(dcx, dcy, dcw, 64, 14, C.bg, hexA(C.amber, 0.5), 1.4);
  set(F.bodyMed, 12, C.mute).text("USE CODE", dcx + 24, dcy + 14, { characterSpacing: 1.5 });
  set(F.mono, 26, C.amber).text(DISCOUNT, dcx + 24, dcy + 28, { lineBreak: false });
  set(F.bodySemi, 12, C.emerald).text("on the real app", dcx + 230, dcy + 24, { width: 170 });

  set(F.bodySemi, 14, C.white).text(
    `DM me to get access  ·  ${LINKS.instagram}  ·  ${LINKS.linkedin}`,
    px,
    py + 340,
    { width: pw, align: "center" }
  );

  // footer note bold
  set(F.bodyBold, 12.5, C.text).text(
    "Already shipped to a client — this public demo is deployed on my own Vercel so you can see exactly what I build.",
    px,
    py + 440,
    { width: pw, align: "center" }
  );
  footer(11);
}

/* ════════════════════════ SLIDE 12 — CONTACT ════════════════════════ */
function contact() {
  pageBG(true);
  blob(180, H - 120, 460, C.violet, 0.26);
  blob(W - 160, 140, 420, C.cyan, 0.16);

  gradRect(M, M + 10, 64, 64, 16, GRAD);
  iconAperture(M + 32, M + 42, 18, C.white);
  set(F.displaySemi, 18, C.white).text("HiredLens", M + 80, M + 22, { lineBreak: false });
  set(F.body, 12, C.mute).text("AI Career Intelligence · UI/UX Showcase", M + 80, M + 46, { lineBreak: false });

  set(F.display, 54, C.white).text("Let's build your", M, 238, { lineBreak: false });
  doc.text("next AI dashboard.", M, 312, { lineBreak: false });
  gradBar(M + 4, 398, 110, 6);
  set(F.body, 14, C.mute).text(
    "Modern dashboards, AI workflows, design systems and motion-rich product UI.\nAvailable for freelance & contract work.",
    M,
    420,
    { width: 560, lineGap: 5 }
  );

  // social column
  const sx = W - M - 420;
  set(F.bodySemi, 11, C.faint).text("FIND ME", sx, 232, { characterSpacing: 2 });
  const socials = [
    ["linkedin", LINKS.linkedin],
    ["github", LINKS.github],
    ["portfolio", LINKS.portfolio],
    ["instagram", LINKS.instagram],
    ["x", LINKS.x],
    ["email", LINKS.email]
  ];
  socials.forEach((s, i) => {
    const y = 262 + i * 46;
    rrect(sx, y, 420, 38, 10, C.panel, C.line, 1);
    social(sx + 6, y + 4, s[0], s[1]);
  });

  set(F.bodySemi, 14, C.white).text(`Demo: ${DEMO_URL}`, M, 560, { lineBreak: false });
  set(F.bodyMed, 12, C.emerald).text(`Use code ${DISCOUNT} for a discount on the full app.`, M, 588, {
    lineBreak: false
  });

  set(F.body, 11, C.faint).text(
    `© ${new Date().getFullYear()} ${AUTHOR}. HiredLens is a UI/UX showcase prototype — all data is fictional.`,
    M,
    H - 70,
    { width: W - 2 * M }
  );
  footer(12);
}

/* ───────────────────────── render ───────────────────────── */
const slides = [cover, snapshot, themes, demo, features, stack, architecture, engine, motion, components, cta, contact];
slides.forEach((fn, i) => {
  if (i) doc.addPage({ size: [W, H], margin: 0 });
  try {
    fn();
  } catch (e) {
    console.error("SLIDE FAIL:", fn.name, "→", e.message);
  }
});

doc.end();
console.log("✓ PDF written → docs/portfolio/HiredLens-Case-Study.pdf");
