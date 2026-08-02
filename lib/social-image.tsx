import { ImageResponse } from "next/og";
import type { Locale } from "@/lib/site-content";

export const socialImageAlt = {
  en: "MARKET//SKILLS - China Marketing Skills for AI Agents",
  zh: "MARKET//SKILLS - 市场人的 AI Skill Hub",
} as const;
export const socialImageSize = { width: 1200, height: 630 };
export const socialImageContentType = "image/png";

export function createSocialImage(locale: Locale) {
  const topLabel = locale === "en" ? "CHINA_MARKETING_OS" : "CN_MARKETING_OS";
  const tagline = locale === "en"
    ? "CHINA MARKETING SKILLS FOR AI AGENTS"
    : "AI SKILL HUB FOR MARKETING TEAMS";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          color: "#f4f2e9",
          backgroundColor: "#090d0f",
          backgroundImage:
            "radial-gradient(circle at 78% 26%, rgba(124, 255, 182, 0.22), transparent 30%), linear-gradient(135deg, #090d0f 0%, #10191b 100%)",
          fontFamily: "sans-serif",
        }}
        >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, letterSpacing: 4 }}>
          <span>{topLabel}</span>
          <span style={{ color: "#7cffb6" }}>SYS.ONLINE</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", fontSize: 84, fontWeight: 700, letterSpacing: -3 }}>
            <span>MARKET</span>
            <span style={{ color: "#ff6b35", margin: "0 18px" }}>{"//"}</span>
            <span>SKILLS</span>
          </div>
          <div style={{ display: "flex", marginTop: 24, color: "#b8c2bd", fontSize: 34, letterSpacing: 1 }}>
            {tagline}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "#ff6b35", fontSize: 26 }}>10 MODULES / 05 PHASES</span>
          <span style={{ color: "#b8c2bd", fontSize: 24 }}>mktskill.com</span>
        </div>
      </div>
    ),
    socialImageSize,
  );
}
