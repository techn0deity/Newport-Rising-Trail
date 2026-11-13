import { Link } from "react-router-dom";
import type { Lang } from "../lib/types";
import { useTrail } from "../state/useTrail";
import { t } from "../lib/i18n";

// Google Maps search by name and address rather than by coordinates. We have
// no surveyed lat/lng for these five, and a pin a few doors down the wrong end
// of High Street is worse than letting Maps do the lookup itself.
function directionsUrl(name: string, address: string): string {
  const q = encodeURIComponent(name + ", " + address + ", Newport, UK");
  return "https://www.google.com/maps/search/?api=1&query=" + q;
}

export default function AleTrailPage({ lang }: { lang: Lang }) {
  const { data, err, loading } = useTrail();
  const ale = data?.aleTrail;

  if (loading) {
    return (
      <div style={{ padding: 24, background: "#ede532", minHeight: "100vh" }}>
        <p style={{ fontSize: 18, color: "#000000", fontWeight: "bold" }}>Loading...</p>
      </div>
    );
  }

  // Switched off in the JSON, or data failed to load: send them home rather
  // than show an empty page.
  if (err || !ale || !ale.enabled) {
    return (
      <div style={{ padding: 24, background: "#ede532", minHeight: "100vh" }}>
        <Link to="/" style={{ color: "#000000", fontWeight: "bold" }}>
          {lang === "ur" ? "→" : "←"} {t(lang, "backToHome")}
        </Link>
      </div>
    );
  }

  return (
    <div style={{ background: "#ede532", minHeight: "100vh", padding: 16 }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <Link
          to="/"
          style={{
            display: "inline-block",
            color: "#000000",
            fontWeight: "900",
            fontSize: 16,
            textDecoration: "none",
            marginBottom: 16,
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          {lang === "ur" ? "→" : "←"} {t(lang, "backToHome")}
        </Link>

        {/* Header */}
        <div
          style={{
            background: "#000000",
            border: "4px solid #000000",
            padding: 24,
            marginBottom: 16,
          }}
        >
          <h1
            style={{
              margin: "0 0 14px 0",
              fontSize: 28,
              fontWeight: "900",
              color: "#ede532",
              lineHeight: 1.1,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            🍺 {t(lang, "aleTrailTitle")}
          </h1>
          <p style={{ margin: 0, fontSize: 16, color: "#ffffff", lineHeight: 1.5 }}>
            {t(lang, "aleTrailIntro")}
          </p>
        </div>

        {/* Marker hint */}
        <div
          style={{
            background: "#ede532",
            border: "4px solid #000000",
            padding: 18,
            marginBottom: 16,
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 15,
              color: "#000000",
              lineHeight: 1.5,
              fontWeight: "700",
            }}
          >
            💡 {t(lang, "aleTrailMarkerHint")}
          </p>
        </div>

        {/* The five venues */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
          {ale.venues.map((v, i) => (
            <div
              key={v.name}
              style={{
                background: "#ffffff",
                border: "4px solid #000000",
                padding: 16,
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  background: "#000000",
                  color: "#ede532",
                  width: 40,
                  height: 40,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  fontWeight: "900",
                }}
              >
                {i + 1}
              </div>

              {/* Venue names and addresses stay in English in every language */}
              <div style={{ flex: 1, minWidth: 0 }} dir="ltr">
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: "900",
                    color: "#000000",
                    textTransform: "uppercase",
                    lineHeight: 1.25,
                  }}
                >
                  {v.name}
                </div>
                <div style={{ fontSize: 14, color: "#000000", marginTop: 2 }}>{v.address}</div>
                {v.note && (
                  <div style={{ fontSize: 12, color: "#000000", opacity: 0.7, marginTop: 2 }}>
                    {v.note}
                  </div>
                )}
              </div>

              <a
                href={directionsUrl(v.name, v.address)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t(lang, "aleTrailDirections") + ": " + v.name}
                style={{
                  background: "#000000",
                  color: "#ede532",
                  textDecoration: "none",
                  padding: "12px 14px",
                  fontSize: 18,
                  fontWeight: "900",
                  flexShrink: 0,
                }}
              >
                ➔
              </a>
            </div>
          ))}
        </div>

        {/* Out to the website for the full write-up */}
        <a href={ale.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
          <button
            style={{
              width: "100%",
              background: "#000000",
              color: "#ede532",
              border: "4px solid #000000",
              padding: "18px 24px",
              fontSize: 16,
              fontWeight: "900",
              cursor: "pointer",
              borderRadius: 0,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            {t(lang, "aleTrailMore")} {lang === "ur" ? "←" : "→"}
          </button>
        </a>
      </div>
    </div>
  );
}
