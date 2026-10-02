import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Lang, TrailStop } from "../lib/types";
import { useTrail } from "../state/useTrail";
import { haversineMetres } from "../lib/geo";
import { t } from "../lib/i18n";

// How far past a stop's own radius we still count as "you're here". City
// centre GPS is routinely 20-30m out, and a prompt that never fires is
// worse than one that fires a few paces early.
const SLACK_METRES = 20;

function getStopTitle(stop: TrailStop, lang: Lang): string {
  if (lang === "en") return stop.title;
  const translated = (stop as unknown as Record<string, string>)["title_" + lang];
  return translated && translated.length > 0 ? translated : stop.title;
}

export default function NearbyPrompt({ lang }: { lang: Lang }) {
  const { data } = useTrail();
  const navigate = useNavigate();
  const location = useLocation();

  const [near, setNear] = useState<TrailStop | null>(null);
  // Stops the walker has waved away. Cleared once they move off again, so
  // the same stop can prompt on a later visit but not three times a minute.
  const dismissed = useRef<Set<number>>(new Set());
  const [watching, setWatching] = useState(false);

  // Memoised: a fresh array each render would restart the GPS watch
  // constantly, which hammers the battery.
  const stops: TrailStop[] = useMemo(
    () => data?.trails?.[0]?.stops ?? [],
    [data]
  );

  // Only track position if location has already been granted elsewhere in
  // the app. We never put up a permission prompt unasked.
  useEffect(() => {
    if (!navigator.geolocation || !navigator.permissions?.query) return;
    let cancelled = false;
    navigator.permissions
      .query({ name: "geolocation" as PermissionName })
      .then((status) => {
        if (!cancelled) setWatching(status.state === "granted");
        status.onchange = () => setWatching(status.state === "granted");
      })
      .catch(() => {
        // Permissions API unavailable - stay quiet rather than guess.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!watching || stops.length === 0 || !navigator.geolocation) return;

    const id = navigator.geolocation.watchPosition(
      (pos) => {
        const here = { lat: pos.coords.latitude, lng: pos.coords.longitude };

        let closest: TrailStop | null = null;
        let closestDistance = Infinity;
        for (const s of stops) {
          const d = haversineMetres(here, { lat: s.lat, lng: s.lng });
          if (d < closestDistance) {
            closestDistance = d;
            closest = s;
          }
        }

        if (!closest) return;
        const limit = (closest.radiusMetres || 60) + SLACK_METRES;

        if (closestDistance <= limit) {
          // Re-arm any stop they have walked away from.
          for (const n of Array.from(dismissed.current)) {
            const s = stops.find((x) => x.number === n);
            if (!s) continue;
            const d = haversineMetres(here, { lat: s.lat, lng: s.lng });
            if (d > (s.radiusMetres || 60) + SLACK_METRES * 2) {
              dismissed.current.delete(n);
            }
          }
          if (!dismissed.current.has(closest.number)) setNear(closest);
        } else {
          setNear(null);
        }
      },
      () => {
        // Position unavailable (indoors, permission revoked). Say nothing.
      },
      { enableHighAccuracy: true, maximumAge: 15000, timeout: 20000 }
    );

    return () => navigator.geolocation.clearWatch(id);
  }, [watching, stops]);

  if (!near) return null;

  // Don't announce a stop to someone already reading it.
  if (location.pathname === "/stop/" + near.number) return null;

  return (
    <div
      role="status"
      style={{
        position: "fixed",
        left: 12,
        right: 12,
        bottom: 12,
        background: "#000000",
        border: "4px solid #ede532",
        padding: "14px 16px",
        zIndex: 1200,
        display: "flex",
        alignItems: "center",
        gap: 12,
        boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            color: "#ede532",
            fontSize: 11,
            fontWeight: "900",
            textTransform: "uppercase",
            letterSpacing: "1px",
            opacity: 0.75,
          }}
        >
          {t(lang, "youAreHere")}
        </div>
        <div
          style={{
            color: "#ede532",
            fontSize: 16,
            fontWeight: "900",
            textTransform: "uppercase",
            lineHeight: 1.25,
          }}
        >
          {near.number}. {getStopTitle(near, lang)}
        </div>
      </div>

      <button
        onClick={() => {
          const target = near.number;
          setNear(null);
          navigate("/stop/" + target);
        }}
        style={{
          background: "#ede532",
          color: "#000000",
          border: "none",
          padding: "12px 16px",
          fontSize: 14,
          fontWeight: "900",
          textTransform: "uppercase",
          letterSpacing: "1px",
          cursor: "pointer",
          borderRadius: 0,
          flexShrink: 0,
        }}
      >
        {t(lang, "openStop")}
      </button>

      <button
        onClick={() => {
          dismissed.current.add(near.number);
          setNear(null);
        }}
        aria-label={t(lang, "dismiss")}
        style={{
          background: "transparent",
          color: "#ede532",
          border: "2px solid #ede532",
          width: 40,
          height: 40,
          fontSize: 16,
          fontWeight: "900",
          cursor: "pointer",
          borderRadius: 0,
          flexShrink: 0,
        }}
      >
        ✕
      </button>
    </div>
  );
}
