import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Discernly — find the story behind what you already use, and a Christian-made swap if you want one.";

const fontsDir = path.join(process.cwd(), "src", "app", "opengraph-fonts");
const loadFont = (filename: string) => readFile(path.join(fontsDir, filename));

const GROUND = "#1F3A2E";
const PARCHMENT = "#F2E8D8";
const GOLD = "#C9A227";
const COPPER = "#C1652F";

function SealLogo({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <circle cx="30" cy="30" r="27" stroke={GOLD} strokeWidth="3.5" />
      <circle cx="24" cy="24" r="11" stroke={GOLD} strokeWidth="3.5" />
      <line x1="32" y1="32" x2="43" y2="43" stroke={GOLD} strokeWidth="4" strokeLinecap="round" />
      <line x1="24" y1="16" x2="24" y2="32" stroke={GOLD} strokeWidth="3" strokeLinecap="round" />
      <line x1="18" y1="22" x2="30" y2="22" stroke={GOLD} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={COPPER} strokeWidth="2.5" strokeLinecap="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function SwapItem({
  from,
  to,
  basis,
}: {
  from: string;
  to: string;
  basis: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 18 }}>
        <div
          style={{
            fontFamily: "Fraunces",
            fontWeight: 400,
            fontSize: 17,
            color: "rgba(255,255,255,0.35)",
            textDecoration: "line-through",
            textDecorationColor: COPPER,
            lineHeight: 1.2,
          }}
        >
          {from}
        </div>
        <div
          style={{
            display: "flex",
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "rgba(193,101,47,0.2)",
            border: "1px solid rgba(193,101,47,0.4)",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <ArrowIcon />
        </div>
        <div
          style={{
            fontFamily: "Fraunces",
            fontWeight: 400,
            fontSize: 17,
            color: PARCHMENT,
            lineHeight: 1.2,
          }}
        >
          {to}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          marginTop: 8,
          background: "rgba(201,162,39,0.1)",
          border: "1px solid rgba(201,162,39,0.25)",
          borderRadius: 100,
          padding: "3px 9px",
        }}
      >
        <div style={{ display: "flex", width: 4, height: 4, borderRadius: "50%", background: GOLD, opacity: 0.7 }} />
        <div
          style={{
            fontFamily: "IBM Plex Mono",
            fontWeight: 500,
            fontSize: 9.3,
            color: "rgba(201,162,39,0.8)",
            letterSpacing: "0.06em",
          }}
        >
          {basis.toUpperCase()}
        </div>
      </div>
    </div>
  );
}

export default async function Image() {
  const [frauncesRegular, frauncesBold, frauncesItalic, frauncesItalicBold, plexMono] =
    await Promise.all([
      loadFont("Fraunces-Regular.ttf"),
      loadFont("Fraunces-Bold.ttf"),
      loadFont("Fraunces-Italic-400.ttf"),
      loadFont("Fraunces-Italic-700.ttf"),
      loadFont("IBMPlexMono-Medium.ttf"),
    ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          background: GROUND,
          padding: "54px 64px 48px",
          position: "relative",
        }}
      >
        {/* decorative glows */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: -120,
            right: -80,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,162,39,0.09) 0%, rgba(201,162,39,0) 70%)",
          }}
        />
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: -100,
            left: -60,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(193,101,47,0.07) 0%, rgba(193,101,47,0) 70%)",
          }}
        />

        {/* eyebrow */}
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 36 }}>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 9 }}>
            <SealLogo />
            <div style={{ display: "flex", fontFamily: "Fraunces", fontWeight: 700, fontSize: 18.4, color: PARCHMENT, letterSpacing: "-0.01em" }}>
              discern<span style={{ color: GOLD }}>ly</span>
            </div>
          </div>
          <div style={{ display: "flex", width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
          <div
            style={{
              display: "flex",
              fontFamily: "IBM Plex Mono",
              fontWeight: 500,
              fontSize: 11.2,
              letterSpacing: "0.12em",
              color: "rgba(159,184,168,0.7)",
            }}
          >
            CHRISTIAN-MADE PRODUCT SWAPS
          </div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flex: 1, flexDirection: "column", justifyContent: "center", paddingBottom: 12 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Fraunces",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: 80,
              lineHeight: 1.05,
              color: "#FFFFFF",
              letterSpacing: "-0.025em",
              maxWidth: 820,
            }}
          >
            <div style={{ display: "flex" }}>Your body wash</div>
            <div style={{ display: "flex" }}>
              is giving <span style={{ color: GOLD, marginLeft: 20 }}>psychic</span>
            </div>
            <div style={{ display: "flex", color: COPPER }}>readings.</div>
          </div>
        </div>

        {/* divider */}
        <div style={{ display: "flex", width: "100%", height: 1, background: "rgba(255,255,255,0.1)", margin: "28px 0 24px" }} />

        {/* swap row */}
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 48 }}>
          <SwapItem from="Method Shower Readings" to="Boll Weevil Soap Co." basis="Brand's own label" />
          <div style={{ display: "flex", width: 1, height: 48, background: "rgba(255,255,255,0.1)", flexShrink: 0 }} />
          <SwapItem from="Starbucks" to="BOLD3 Coffee" basis="Brand's own history" />
          <div style={{ display: "flex", width: 1, height: 48, background: "rgba(255,255,255,0.1)", flexShrink: 0 }} />
          <SwapItem from="Arm & Hammer" to="Bob's Red Mill" basis="Company's own site" />
        </div>

        {/* url */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 48,
            right: 64,
            fontFamily: "IBM Plex Mono",
            fontWeight: 500,
            fontSize: 11.5,
            letterSpacing: "0.08em",
            color: "rgba(159,184,168,0.5)",
          }}
        >
          discernly.net
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: frauncesRegular, weight: 400, style: "normal" },
        { name: "Fraunces", data: frauncesBold, weight: 700, style: "normal" },
        { name: "Fraunces", data: frauncesItalic, weight: 400, style: "italic" },
        { name: "Fraunces", data: frauncesItalicBold, weight: 700, style: "italic" },
        { name: "IBM Plex Mono", data: plexMono, weight: 500, style: "normal" },
      ],
    },
  );
}
