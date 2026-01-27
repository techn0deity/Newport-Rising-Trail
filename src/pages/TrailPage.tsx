import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import type { Lang } from "../lib/types";
import { useTrail } from "../state/useTrail";
import { t } from "../lib/i18n";
import TrailMap from "../ui/TrailMap";

function getStopTitle(stop: any, lang: Lang): string {
  if (lang === "en") return stop.title;
  const key = "title_" + lang;
  const translated = stop[key];
  if (translated && translated.length > 0) return translated;
  return stop.title;
}

export function TrailPage({ lang }: { lang: Lang }) {
  const { data, err, loading } = useTrail();
  const [searchParams] = useSearchParams();
  const initialView = searchParams.get("view") === "list" ? "list" : "map";
  const [view, setView] = useState<"list" | "map">(initialView);
  const [search, setSearch] = useState("");

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const viewParam = searchParams.get("view");
    if (viewParam === "list" || viewParam === "map") {
      setView(viewParam);
    }
  }, [searchParams]);

  if (loading) {
    return (
      <div style={{ padding: 24, background: "#ede532", minHeight: "100vh", width: "100%" }}>
        <p style={{ fontSize: 18, color: "#000000", fontWeight: "bold" }}>Loading...</p>
      </div>
    );
  }

  if (err || !data) {
    return (
      <div style={{ padding: 24, background: "#ede532", minHeight: "100vh", width: "100%" }}>
        <p style={{ color: "#000000" }}>Could not load trail data.</p>
        <Link to="/" style={{ color: "#000000", fontWeight: "bold" }}>{t(lang, "backToHome")}</Link>
      </div>
    );
  }

  const trail = data.trails[0];
  const filtered = trail.stops.filter((s) => {
    const title = getStopTitle(s, lang).toLowerCase();
    return title.includes(search.toLowerCase());
  });

  const HEADER_HEIGHT = 60;

  return (
    <div style={{ background: "#ede532", minHeight: "100vh", width: "100%", maxWidth: "100vw", overflow: "hidden" }}>
      {/* Fixed Header */}
      <div style={{ 
        position: "fixed",
        top: 75, // Below the main app header
        left: 0,
        right: 0,
        zIndex: 900,
        background: "#ede532",
        borderBottom: "4px solid #000000",
        padding: "10px 16px",
        height: HEADER_HEIGHT,
        boxSizing: "border-box",
      }}>
        <div style={{ 
          maxWidth: 800, 
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: 12,
          height: "100%",
        }}>
          {/* Back Button */}
          <Link to="/" style={{ 
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#000000",
            color: "#ede532",
            padding: "10px 14px",
            textDecoration: "none",
            fontWeight: "900",
            fontSize: 14,
            textTransform: "uppercase",
            letterSpacing: "1px",
            flexShrink: 0,
            whiteSpace: "nowrap",
          }}>
            ← {t(lang, "backToHome")}
          </Link>

          {/* View Toggle */}
          <div style={{ display: "flex", gap: 0, flex: 1 }}>
            <button
              onClick={() => setView("map")}
              style={{
                flex: 1,
                padding: "10px 12px",
                fontSize: 14,
                fontWeight: "900",
                border: "3px solid #000000",
                borderRight: "1.5px solid #000000",
                borderRadius: 0,
                cursor: "pointer",
                background: view === "map" ? "#000000" : "#ffffff",
                color: view === "map" ? "#ede532" : "#000000",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              {t(lang, "mapView")}
            </button>
            <button
              onClick={() => setView("list")}
              style={{
                flex: 1,
                padding: "10px 12px",
                fontSize: 14,
                fontWeight: "900",
                border: "3px solid #000000",
                borderLeft: "1.5px solid #000000",
                borderRadius: 0,
                cursor: "pointer",
                background: view === "list" ? "#000000" : "#ffffff",
                color: view === "list" ? "#ede532" : "#000000",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              {t(lang, "listView")}
            </button>
          </div>
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div style={{ height: HEADER_HEIGHT + 4 }} />

      {view === "map" ? (
        <div style={{ 
          width: "100%",
          height: `calc(100vh - 75px - ${HEADER_HEIGHT + 4}px)`,
          minHeight: 400,
          background: "#ffffff",
        }}>
          <TrailMap stops={trail.stops} lang={lang} />
        </div>
      ) : (
        <div style={{ padding: "16px" }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <h1 style={{ 
              margin: "0 0 16px 0", 
              fontSize: 24, 
              fontWeight: "900", 
              color: "#000000",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}>
              {t(lang, "trailTitle")}
            </h1>

            <input
              type="text"
              placeholder={t(lang, "searchPlaceholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 16px",
                fontSize: 16,
                border: "4px solid #000000",
                borderRadius: 0,
                marginBottom: 16,
                boxSizing: "border-box",
                fontWeight: "600",
              }}
            />

            <p style={{ 
              fontSize: 14, 
              color: "#000000", 
              marginBottom: 12,
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}>
              {t(lang, "showingStops")}: {filtered.length} / {trail.stops.length}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {filtered.map((stop) => (
                <Link key={stop.number} to={"/stop/" + stop.number} style={{ textDecoration: "none" }}>
                  <div style={{ 
                    background: "#ffffff", 
                    border: "4px solid #000000", 
                    padding: 16, 
                    display: "flex", 
                    gap: 16, 
                    alignItems: "center",
                  }}>
                    <div style={{ 
                      background: "#000000", 
                      color: "#ede532", 
                      width: 50, 
                      height: 50, 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center", 
                      fontSize: 20, 
                      fontWeight: "900", 
                      flexShrink: 0 
                    }}>
                      {stop.number}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: "900", fontSize: 17, color: "#000000", textTransform: "uppercase" }}>
                        {getStopTitle(stop, lang)}
                      </div>
                    </div>
                    <div style={{ color: "#000000", fontSize: 24, fontWeight: "900" }}>→</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
