import { Link } from "react-router-dom";
import type { Lang } from "../lib/types";
import { t } from "../lib/i18n";
import { useTrail } from "../state/useTrail";
import newportCC from "../assets/NEWPORT_CC_LOGO_BLACK.png";
import heritageFund from "../assets/Welsh_stamp_black_PNG.png";

export default function WelcomePage({ lang }: { lang: Lang }) {
  // Only to decide whether the ale trail aside appears. The welcome page
  // still renders in full if this never arrives.
  const { data } = useTrail();
  const showAleTrail = data?.aleTrail?.enabled === true;

  return (
    <div style={{ padding: 16, background: "#ede532", minHeight: "calc(100vh - 200px)" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        
        {/* Hero Card */}
        <div style={{ 
          background: "#000000", 
          padding: 24, 
          marginBottom: 16,
          border: "4px solid #000000",
        }}>
          <h1 style={{ 
            fontSize: 32, 
            fontWeight: "900", 
            marginBottom: 16, 
            color: "#ede532", 
            lineHeight: 1.1,
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}>
            {t(lang, "welcomeTitle")}
          </h1>

          <p style={{ 
            fontSize: 16, 
            color: "#ffffff", 
            lineHeight: 1.5,
            marginBottom: 0,
          }}>
            {t(lang, "welcomeSubtitle")}
          </p>
        </div>

        {/* Features */}
        <div style={{ 
          background: "#ffffff", 
          border: "4px solid #000000", 
          padding: 20, 
          marginBottom: 16,
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 24 }}>📍</span>
              <span style={{ fontSize: 15, color: "#000000", fontWeight: "600" }}>
                {t(lang, "feature1").replace("📍 ", "")}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 24 }}>🎧</span>
              <span style={{ fontSize: 15, color: "#000000", fontWeight: "600" }}>
                {t(lang, "feature2").replace("🎧 ", "")}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 24 }}>🗺️</span>
              <span style={{ fontSize: 15, color: "#000000", fontWeight: "600" }}>
                {t(lang, "feature3").replace("🗺️ ", "")}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 24 }}>📱</span>
              <span style={{ fontSize: 15, color: "#000000", fontWeight: "600" }}>
                {t(lang, "feature4").replace("📱 ", "")}
              </span>
            </div>
          </div>
        </div>

        {/* Location Tip - Yellow box, black text, larger and more visible */}
        <div style={{ 
          background: "#ede532", 
          padding: 18, 
          marginBottom: 16,
          border: "4px solid #000000",
        }}>
          <p style={{ 
            fontSize: 15, 
            margin: 0, 
            color: "#000000", 
            lineHeight: 1.5,
            fontWeight: "700",
          }}>
            💡 {t(lang, "locationTip").replace("💡 ", "")}
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
          {/* Start Exploring - BIGGER, goes to map view */}
          <Link to="/trail?view=map" style={{ textDecoration: "none" }}>
            <button style={{ 
              width: "100%", 
              background: "#000000", 
              color: "#ede532", 
              border: "4px solid #000000", 
              padding: "22px 24px", 
              fontSize: 20, 
              fontWeight: "900", 
              cursor: "pointer", 
              borderRadius: 0,
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}>
              {t(lang, "startExploring")} {lang === "ur" ? "←" : "→"}
            </button>
          </Link>

          <Link to="/listen" style={{ textDecoration: "none" }}>
            <button style={{ 
              width: "100%", 
              background: "#ffffff", 
              color: "#000000", 
              border: "4px solid #000000", 
              padding: "16px 24px", 
              fontSize: 16, 
              fontWeight: "900", 
              cursor: "pointer", 
              borderRadius: 0,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}>
              🎧 {t(lang, "listenTitle")}
            </button>
          </Link>

          {/* Nearby Stops - White background to match others */}
          <Link to="/nearby" style={{ textDecoration: "none" }}>
            <button style={{ 
              width: "100%", 
              background: "#ffffff", 
              color: "#000000", 
              border: "4px solid #000000", 
              padding: "16px 24px", 
              fontSize: 16, 
              fontWeight: "900", 
              cursor: "pointer", 
              borderRadius: 0,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}>
              📍 {t(lang, "nearbyStops")}
            </button>
          </Link>

          <Link to="/community" style={{ textDecoration: "none" }}>
            <button style={{ 
              width: "100%", 
              background: "#ffffff", 
              color: "#000000", 
              border: "4px solid #000000", 
              padding: "16px 24px", 
              fontSize: 16, 
              fontWeight: "900", 
              cursor: "pointer", 
              borderRadius: 0,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}>
              💬 {t(lang, "communityResponses")}
            </button>
          </Link>

          <Link to="/about" style={{ textDecoration: "none" }}>
            <button style={{ 
              width: "100%", 
              background: "#ffffff", 
              color: "#000000", 
              border: "4px solid #000000", 
              padding: "16px 24px", 
              fontSize: 16, 
              fontWeight: "900", 
              cursor: "pointer", 
              borderRadius: 0,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}>
              ℹ️ {t(lang, "aboutTheTrail")}
            </button>
          </Link>

          <Link to="/support" style={{ textDecoration: "none" }}>
            <button style={{ 
              width: "100%", 
              background: "#ffffff", 
              color: "#000000", 
              border: "4px solid #000000", 
              padding: "16px 24px", 
              fontSize: 16, 
              fontWeight: "900", 
              cursor: "pointer", 
              borderRadius: 0,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}>
              ❤️ {t(lang, "supportUs")}
            </button>
          </Link>
        </div>

        {/* Chartist Ale Trail - deliberately styled as an aside, not a seventh
            equal button. Most walkers will not be doing it, but it should be
            findable by the ones who want it. */}
        {showAleTrail && (
          <div
            style={{
              background: "#ffffff",
              border: "4px solid #000000",
              marginBottom: 24,
            }}
          >
            <div
              style={{
                background: "#000000",
                padding: "6px 14px",
                fontSize: 11,
                fontWeight: "900",
                color: "#ede532",
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
            >
              {t(lang, "aleTrailAside")}
            </div>

            <div style={{ padding: 18 }}>
              <h2
                style={{
                  margin: "0 0 8px 0",
                  fontSize: 20,
                  fontWeight: "900",
                  color: "#000000",
                  textTransform: "uppercase",
                  lineHeight: 1.15,
                  letterSpacing: "1px",
                }}
              >
                🍺 {t(lang, "aleTrailTitle")}
              </h2>

              <p
                style={{
                  margin: "0 0 14px 0",
                  fontSize: 15,
                  color: "#000000",
                  lineHeight: 1.5,
                }}
              >
                {t(lang, "aleTrailTeaser")}
              </p>

              <Link to="/ale-trail" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    width: "100%",
                    background: "#ede532",
                    color: "#000000",
                    border: "4px solid #000000",
                    padding: "14px 20px",
                    fontSize: 15,
                    fontWeight: "900",
                    cursor: "pointer",
                    borderRadius: 0,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  {t(lang, "aleTrailTitle")} {lang === "ur" ? "←" : "→"}
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* Sponsor logos */}
        <div style={{ 
          background: "#ffffff", 
          border: "4px solid #000000", 
          padding: 20,
        }}>
          <p style={{ 
            fontSize: 11, 
            color: "#000000", 
            textAlign: "center", 
            margin: "0 0 16px 0",
            textTransform: "uppercase",
            letterSpacing: "2px",
            fontWeight: "bold",
          }}>
            {t(lang, "supportedBy")}
          </p>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
            <img src={heritageFund} alt="Heritage Fund" style={{ height: 70 }} />
            <img src={newportCC} alt="Newport City Council" style={{ height: 50 }} />
          </div>
        </div>
      </div>
    </div>
  );
}