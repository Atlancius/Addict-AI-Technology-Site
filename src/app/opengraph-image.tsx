import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
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
            "radial-gradient(circle at 15% 20%, #415A77 0%, transparent 40%), radial-gradient(circle at 85% 80%, #FF5A1F 0%, transparent 40%)",
          color: "#E7E9EE",
          fontFamily: "Arial",
        }}
      >
        <div
          style={{
            width: 1000,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(15,20,32,0.78)",
            padding: "64px 72px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div
            style={{
              fontSize: 24,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#B6BDC9",
            }}
          >
            Addict AI Technology - Folelli, Corse
          </div>
          <div style={{ fontSize: 70, fontWeight: 700, lineHeight: 1.1, display: "flex", flexDirection: "column" }}>
            <span>Réparation Tech</span>
            <span>&amp; Automatisation IA</span>
          </div>
          <div style={{ fontSize: 30, color: "#B6BDC9", lineHeight: 1.4 }}>
            Atelier local B2C + accompagnement digital B2B sur-mesure
          </div>
        </div>
      </div>
    ),
    size
  );
}
