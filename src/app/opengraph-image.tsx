import { ImageResponse } from "next/og";

export const alt = "Pictionary Host — Word Generator with Timer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f0e17",
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(127, 90, 240, 0.45), transparent)",
          fontFamily: "system-ui, sans-serif",
          padding: 64,
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#ff8906",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Free · No signup
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#fffffe",
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: 20,
          }}
        >
          Pictionary Host
        </div>
        <div
          style={{
            fontSize: 36,
            color: "#a7a9be",
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          Word generator with timer · Peek-proof reveal · Zero repeats
        </div>
      </div>
    ),
    { ...size }
  );
}
