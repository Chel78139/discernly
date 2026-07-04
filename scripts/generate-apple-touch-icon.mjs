import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Renders the Discernly seal logo onto an opaque brand-green square —
// apple-touch-icon.png needs a solid background since iOS fills any
// transparency with its own default color, which looks broken.
const SIZE = 180;
const GROUND = "#1F3A2E";
const GOLD = "#C9A227";

const svg = `
<svg width="${SIZE}" height="${SIZE}" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="60" height="60" fill="${GROUND}"/>
  <circle cx="30" cy="30" r="27" stroke="${GOLD}" stroke-width="3" fill="none"/>
  <circle cx="24" cy="24" r="11" stroke="${GOLD}" stroke-width="3" fill="none"/>
  <line x1="32" y1="32" x2="43" y2="43" stroke="${GOLD}" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="24" y1="16" x2="24" y2="32" stroke="${GOLD}" stroke-width="2.4" stroke-linecap="round"/>
  <line x1="18" y1="22" x2="30" y2="22" stroke="${GOLD}" stroke-width="2.4" stroke-linecap="round"/>
</svg>
`;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, "..", "public", "apple-touch-icon.png");

await sharp(Buffer.from(svg), { density: 300 })
  .resize(SIZE, SIZE)
  .png()
  .toFile(outPath);

console.log(`Wrote ${outPath} (${SIZE}x${SIZE})`);
