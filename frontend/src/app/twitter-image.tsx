import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0B0E13",
          backgroundImage:
            "radial-gradient(circle at 12% 14%, #415A77 0%, transparent 36%), radial-gradient(circle at 88% 84%, #E63946 0%, transparent 40%)",
          color: "#E7E9EE",
          fontFamily: "Arial",
        }}
      >
        <div
          style={{
            width: 1000,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(15,20,32,0.8)",
            padding: "56px 68px",
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <div
            style={{
              fontSize: 22,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#B6BDC9",
            }}
          >
            Addict - Tech, Réparation &amp; Innovation
          </div>
          <div style={{ fontSize: 66, fontWeight: 700, lineHeight: 1.1, display: "flex", flexDirection: "column" }}>
            <span>Deux univers.</span>
            <span>Une seule adresse.</span>
          </div>
          <div style={{ fontSize: 28, color: "#B6BDC9", lineHeight: 1.35 }}>
            Réparation rapide, boutique tech, café manga, automatisation IA et formations pro.
          </div>
        </div>
      </div>
    ),
    size
  );
}
