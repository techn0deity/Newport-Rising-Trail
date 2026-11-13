import { useState } from "react";
import { Link } from "react-router-dom";
import type { AleTrailVenue, Lang } from "../lib/types";
import { useTrail } from "../state/useTrail";
import { t } from "../lib/i18n";
import AleTrailMap from "../ui/AleTrailMap";

// Venue text falls back to English until a translation is filled in, the same
// way the Welsh narration slots do.
function venueText(v: AleTrailVenue, lang: Lang): string | undefined {
  if (lang !== "en") {
    const translated = (v as unknown as Record<string, string>)["description_" + lang];
    if (translated && translated.length > 0) return translated;
  }
  return v.description;
}

export default function AleTrailPage({ lang }: { lang: Lang }) {
  const { data, err, loading } = useTrail();
  const ale = data?.aleTrail;

  // Which row is open. Only one at a time, so the list stays scannable.
  const [open, setOpen] = useState<number | null>(null);

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

        {/* The five markers, on our own basemap */}
        <div style={{ border: "4px solid #000000", marginBottom: 16, background: "#ffffff" }}>
          <AleTrailMap venues={ale.venues} lang={lang} />
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

        {/* Venue list - tap a row to read why it is on the trail */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
          {ale.venues.map((v, i) => {
            const isOpen = open === i;
            const text = venueText(v, lang);
            return (
              <div key={v.name} style={{ background: "#ffffff", border: "4px solid #000000" }}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  style={{
                    width: "100%",
                    background: isOpen ? "#000000" : "#ffffff",
                    border: "none",
                    borderRadius: 0,
                    padding: 16,
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    cursor: "pointer",
                    textAlign: lang === "ur" ? "right" : "left",
                  }}
                >
                  <span
                    style={{
                      background: isOpen ? "#ede532" : "#000000",
                      color: isOpen ? "#000000" : "#ede532",
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
                  </span>

                  {/* Names and addresses stay in English in every language */}
                  <span style={{ flex: 1, minWidth: 0 }} dir="ltr">
                    <span
                      style={{
                        display: "block",
                        fontSize: 16,
                        fontWeight: "900",
                        color: isOpen ? "#ede532" : "#000000",
                        textTransform: "uppercase",
                        lineHeight: 1.25,
                      }}
                    >
                      {v.name}
                    </span>
                    {v.address && (
                      <span
                        style={{
                          display: "block",
                          fontSize: 14,
                          color: isOpen ? "#ede532" : "#000000",
                          opacity: isOpen ? 0.8 : 1,
                          marginTop: 2,
                        }}
                      >
                        {v.address}
                      </span>
                    )}
                    {v.note && (
                      <span
                        style={{
                          display: "block",
                          fontSize: 12,
                          color: isOpen ? "#ede532" : "#000000",
                          opacity: 0.7,
                          marginTop: 2,
                        }}
                      >
                        {v.note}
                      </span>
                    )}
                  </span>

                  <span
                    aria-hidden="true"
                    style={{
                      flexShrink: 0,
                      fontSize: 18,
                      fontWeight: "900",
                      color: isOpen ? "#ede532" : "#000000",
                      padding: "0 4px",
                    }}
                  >
                    {isOpen ? "▲" : "▼"}
                  </span>
                </button>

                {isOpen && (
                  <div style={{ padding: "0 16px 16px 16px", borderTop: "4px solid #000000" }}>
                    {text && (
                      <p
                        style={{
                          margin: "16px 0 0 0",
                          fontSize: 15,
                          color: "#000000",
                          lineHeight: 1.6,
                        }}
                      >
                        {text}
                      </p>
                    )}

                    {/* Two of the five are also main trail stops, with their
                        own images, audio and narration already in place. */}
                    {v.stopNumber && (
                      <Link to={"/stop/" + v.stopNumber} style={{ textDecoration: "none" }}>
                        <button
                          style={{
                            width: "100%",
                            marginTop: 14,
                            background: "#000000",
                            color: "#ede532",
                            border: "4px solid #000000",
                            padding: "14px 18px",
                            fontSize: 14,
                            fontWeight: "900",
                            cursor: "pointer",
                            borderRadius: 0,
                            textTransform: "uppercase",
                            letterSpacing: "1px",
                          }}
                        >
                          {t(lang, "aleTrailAlsoStop")} ({v.stopNumber}){" "}
                          {lang === "ur" ? "←" : "→"}
                        </button>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Out to the website for the full write-up */}
        <a
          href={ale.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
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
