import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Assistora — We engineer what's next.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/images/branding/assistora-logo-white.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  const sora = await readFile(join(process.cwd(), "src/assets/fonts/Sora-Bold.ttf"));
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #080D1F 0%, #101A35 55%, #2a1f6b 100%)",
          color: "white",
          fontFamily: "Sora",
        }}
      >
        <img src={logoSrc} width={327} height={80} alt="Assistora" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 1, letterSpacing: -3 }}>WE ENGINEER</div>
          <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 1, letterSpacing: -3, color: "#35E5F5" }}>WHAT&apos;S NEXT.</div>
        </div>
        <div style={{ fontSize: 26, color: "#A9B4CC", letterSpacing: -0.3 }}>Cloud · DevOps · AI · Cybersecurity · Software Engineering</div>
      </div>
    ),
    { ...size, fonts: [{ name: "Sora", data: sora, weight: 700, style: "normal" }] },
  );
}
