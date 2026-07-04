import sharp from "sharp";
import pngToIco from "png-to-ico";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Replaces the default Next.js favicon.ico with the Discernly seal logo,
// on a transparent background (unlike apple-touch-icon.png, .ico favicons
// render fine with transparency in every browser).
const GOLD = "#C9A227";
const SIZES = [16, 32, 48];

const svg = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
  <circle cx="30" cy="30" r="27" stroke="${GOLD}" stroke-width="3" fill="none"/>
  <circle cx="24" cy="24" r="11" stroke="${GOLD}" stroke-width="3" fill="none"/>
  <line x1="32" y1="32" x2="43" y2="43" stroke="${GOLD}" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="24" y1="16" x2="24" y2="32" stroke="${GOLD}" stroke-width="2.4" stroke-linecap="round"/>
  <line x1="18" y1="22" x2="30" y2="22" stroke="${GOLD}" stroke-width="2.4" stroke-linecap="round"/>
</svg>
`;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, "..", "public", "favicon.ico");

const pngBuffers = await Promise.all(
  SIZES.map((size) =>
    sharp(Buffer.from(svg(size)), { density: 300 }).resize(size, size).png().toBuffer(),
  ),
);

const icoBuffer = await pngToIco(pngBuffers);
await fs.writeFile(outPath, icoBuffer);

console.log(`Wrote ${outPath} (sizes: ${SIZES.join(", ")})`);
