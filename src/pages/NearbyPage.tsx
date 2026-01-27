import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { Lang } from "../lib/types";
import { useTrail } from "../state/useTrail";
import { haversineMetres } from "../lib/geo";
import { t } from "../lib/i18n";

function getStopTitle(stop: any, lang: Lang): string {
  if (lang === "en") return stop.title;
  const key = "title_" + lang;
  const translated = stop[key];
  if (translated && translated.length > 0) return translated;
  return stop.title; // Fall back to English
}

export default function NearbyPage({ lang }: { lang: Lang }) {
  const { data, err, loading } = useTrail();
  const [pos, setPos] = useState<{ lat: number; lng: number } | null>(null);
  const [geoErr, setGeoErr] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoErr("Geolocation not supported.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (p) => setPos({ lat: p.coords.latitude, lng: p.coords.longitude }),
      (e) => setGeoErr(e.message),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  const trail = data?.trails?.[0] ?? null;

  const sortedStops = useMemo(() => {
    if (!pos || !trail) return [];
    return trail.stops
      .map((s) => ({
        stop: s,
        metres: haversineMetres(pos, { lat: s.lat, lng: s.lng }),
      }))
      .sort((a, b) => a.metres - b.metres);
  }, [pos, trail]);

  const nearbyStops = sortedStops.filter((x) => x.metres <= (trail?.nearbyRadiusMetres || 500));

  if (loading) {
    return (
      <div style={{ padding: 24, background: "#ede532", minHeight: "100vh" }}>
        <p style={{ fontSize: 18, color: "#000000", fontWeight: "bold" }}>Loading...</p>
      </div>
    );
  }

  if (err || !data || !trail) {
    return (
      <div style={{ padding: 24, background: "#ede532", minHeight: "100vh" }}>
        <p style={{ color: "#000000" }}>Could not load trail data.</p>
        <Link to="/" style={{ color: "#000000", fontWeight: "bold" }}>{t(lang, "backToHome")}</Link>
      </div>
    );
  }

  const formatDistance = (metres: number) => {
    if (metres < 1000) return Math.round(metres) + "m";
    return (metres / 1000).toFixed(1) + "km";
  };

  return (
    <div style={{ background: "#ede532", minHeight: "100vh", padding: 16 }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <Link to="/" style={{ 
          display: "inline-block", 
          color: "#000000", 
          fontWeight: "900", 
          fontSize: 16, 
          textDecoration: "none", 
          marginBottom: 16,
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}>
          ← {t(lang, "backToHome")}
        </Link>

        <h1 style={{ 
          margin: "0 0 16px 0", 
          fontSize: 28, 
          fontWeight: "900", 
          color: "#000000",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}>
          {t(lang, "nearbyTitle")}
        </h1>

        {!pos ? (
          <div style={{ background: "#ffffff", border: "4px solid #000000", padding: 20, textAlign: "center" }}>
            <p style={{ fontSize: 17, color: "#000000", margin: 0, fontWeight: "bold" }}>
              {geoErr ? geoErr : t(lang, "requestingLocation")}
            </p>
            {geoErr && (
              <p style={{ fontSize: 14, color: "#333333", marginTop: 12 }}>
                {t(lang, "enableLocationServices")}
              </p>
            )}
          </div>
        ) : (
          <div>
            {nearbyStops.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <h2 style={{ fontSize: 18, color: "#000000", marginBottom: 12, fontWeight: "900", textTransform: "uppercase" }}>
                  {t(lang, "withinWalkingDistance")}
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {nearbyStops.map(({ stop, metres }) => (
                    <Link key={stop.number} to={"/stop/" + stop.number} style={{ textDecoration: "none" }}>
                      <div style={{ background: "#ffffff", border: "4px solid #000000", padding: 16, display: "flex", gap: 16, alignItems: "center" }}>
                        <div style={{ background: "#000000", color: "#ede532", width: 50, height: 50, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: "900", flexShrink: 0 }}>
                          {stop.number}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: "900", fontSize: 17, color: "#000000", textTransform: "uppercase" }}>
                            {getStopTitle(stop, lang)}
                          </div>
                          <div style={{ fontSize: 14, color: "#666666", marginTop: 4 }}>
                            {formatDistance(metres)} {t(lang, "away")}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <h2 style={{ fontSize: 18, color: "#000000", marginBottom: 12, fontWeight: "900", textTransform: "uppercase" }}>
              {nearbyStops.length > 0 ? t(lang, "otherStops") : t(lang, "allStopsByDistance")}
            </h2>
            
            {nearbyStops.length === 0 && (
              <p style={{ fontSize: 14, color: "#333333", marginBottom: 16 }}>{t(lang, "notNearAnyStops")}</p>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {sortedStops
                .filter((x) => x.metres > (trail?.nearbyRadiusMetres || 500))
                .map(({ stop, metres }) => (
                  <Link key={stop.number} to={"/stop/" + stop.number} style={{ textDecoration: "none" }}>
                    <div style={{ background: "#ffffff", border: "4px solid #000000", padding: 12, display: "flex", gap: 12, alignItems: "center" }}>
                      <div style={{ background: "#333333", color: "#ffffff", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: "900", flexShrink: 0 }}>
                        {stop.number}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: "900", fontSize: 16, color: "#000000", textTransform: "uppercase" }}>
                          {getStopTitle(stop, lang)}
                        </div>
                      </div>
                      <div style={{ fontSize: 14, color: "#666666", flexShrink: 0 }}>{formatDistance(metres)}</div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
