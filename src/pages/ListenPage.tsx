import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { Lang, TrailStop } from "../lib/types";
import { useTrail } from "../state/useTrail";
import { t } from "../lib/i18n";

const PROGRESS_KEY = "newport-rising-listen";

function getStopTitle(stop: TrailStop, lang: Lang): string {
  if (lang === "en") return stop.title;
  const translated = (stop as unknown as Record<string, string>)["title_" + lang];
  return translated && translated.length > 0 ? translated : stop.title;
}

// Welsh narration when we have it, English otherwise.
function narrationFor(stop: TrailStop, lang: Lang): string | undefined {
  if (lang === "cy" && stop.narrationUrl_cy && stop.narrationUrl_cy.length > 0) {
    return stop.narrationUrl_cy;
  }
  return stop.narrationUrl;
}

type Saved = { number: number; time: number };

function readSaved(): Saved | null {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Saved;
    if (typeof parsed.number === "number" && typeof parsed.time === "number") {
      return parsed;
    }
  } catch {
    // Private browsing or blocked storage - start from the beginning.
  }
  return null;
}

export default function ListenPage({ lang }: { lang: Lang }) {
  const { data, err, loading } = useTrail();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  // Set once from storage, then applied when the audio element is ready.
  const resumeTo = useRef<number | null>(null);
  const restored = useRef(false);

  const trail = data?.trails?.[0];
  const stops: TrailStop[] = (trail?.stops ?? []).filter((s) => narrationFor(s, lang));
  const current = stops[index];
  const currentSrc = current ? narrationFor(current, lang) : undefined;

  // Pick up where they left off, once the data has arrived.
  useEffect(() => {
    if (restored.current || stops.length === 0) return;
    restored.current = true;
    const saved = readSaved();
    if (!saved) return;
    const at = stops.findIndex((s) => s.number === saved.number);
    if (at >= 0) {
      setIndex(at);
      resumeTo.current = saved.time;
    }
  }, [stops]);

  // Remember position, but not on every tick - once every few seconds is plenty.
  useEffect(() => {
    const el = audioRef.current;
    if (!el || !current) return;
    let last = 0;
    const onTime = () => {
      const now = Date.now();
      if (now - last < 4000) return;
      last = now;
      try {
        localStorage.setItem(
          PROGRESS_KEY,
          JSON.stringify({ number: current.number, time: el.currentTime })
        );
      } catch {
        // Storage unavailable - progress just won't persist.
      }
    };
    el.addEventListener("timeupdate", onTime);
    return () => el.removeEventListener("timeupdate", onTime);
  }, [current]);

  // Lock screen / car controls: title, artwork and skip buttons.
  useEffect(() => {
    if (!("mediaSession" in navigator) || !current || !trail) return;

    navigator.mediaSession.metadata = new MediaMetadata({
      title: current.number + ". " + getStopTitle(current, lang),
      artist: trail.narrator || "",
      album: lang === "cy" && trail.title_cy ? trail.title_cy : trail.title,
      artwork: [
        { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
    });

    const set = (action: MediaSessionAction, handler: (() => void) | null) => {
      try {
        navigator.mediaSession.setActionHandler(action, handler);
      } catch {
        // Not every browser supports every action.
      }
    };

    set("play", () => void audioRef.current?.play());
    set("pause", () => audioRef.current?.pause());
    set("previoustrack", index > 0 ? () => go(index - 1) : null);
    set("nexttrack", index < stops.length - 1 ? () => go(index + 1) : null);

    return () => {
      set("play", null);
      set("pause", null);
      set("previoustrack", null);
      set("nexttrack", null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, index, stops.length, lang, trail]);

  function go(next: number, autoplay = true) {
    if (next < 0 || next >= stops.length) return;
    setIndex(next);
    resumeTo.current = null;
    const el = audioRef.current;
    if (el && autoplay) {
      // The source changes on re-render; play once it has loaded.
      window.setTimeout(() => void el.play().catch(() => undefined), 0);
    }
  }

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
        <Link to="/" style={{ color: "#000000", fontWeight: "bold" }}>
          {t(lang, "backToHome")}
        </Link>
      </div>
    );
  }

  return (
    <div style={{ background: "#ede532", minHeight: "100vh", padding: 16, paddingBottom: 180 }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
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

        <h1
          style={{
            margin: "0 0 8px 0",
            fontSize: 28,
            fontWeight: "900",
            color: "#000000",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          {t(lang, "listenTitle")}
        </h1>

        <p style={{ margin: "0 0 20px 0", fontSize: 15, lineHeight: 1.5, color: "#000000" }}>
          {t(lang, "listenIntro")}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {stops.map((s, i) => {
            const isCurrent = i === index;
            return (
              <div
                key={s.number}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  background: isCurrent ? "#000000" : "#ffffff",
                  border: "4px solid #000000",
                  padding: 14,
                }}
              >
                <button
                  onClick={() => go(i)}
                  aria-label={getStopTitle(s, lang)}
                  style={{
                    background: isCurrent ? "#ede532" : "#000000",
                    color: isCurrent ? "#000000" : "#ede532",
                    border: "none",
                    width: 44,
                    height: 44,
                    flexShrink: 0,
                    fontSize: 16,
                    fontWeight: "900",
                    cursor: "pointer",
                    borderRadius: 0,
                  }}
                >
                  {isCurrent && playing ? "❚❚" : "▶"}
                </button>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontWeight: "900",
                      fontSize: 16,
                      color: isCurrent ? "#ede532" : "#000000",
                      textTransform: "uppercase",
                      lineHeight: 1.25,
                    }}
                  >
                    {s.number}. {getStopTitle(s, lang)}
                  </div>
                  {isCurrent && (
                    <div style={{ fontSize: 12, color: "#ede532", opacity: 0.75, marginTop: 2 }}>
                      {t(lang, "nowPlaying")}
                    </div>
                  )}
                </div>

                <Link
                  to={"/stop/" + s.number}
                  style={{
                    color: isCurrent ? "#ede532" : "#000000",
                    fontSize: 22,
                    fontWeight: "900",
                    textDecoration: "none",
                    flexShrink: 0,
                    padding: "0 4px",
                  }}
                  aria-label={t(lang, "readMoreOnWebsite")}
                >
                  {lang === "ur" ? "←" : "→"}
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Player, pinned to the bottom so it stays put while the list scrolls */}
      {current && (
        <div
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            background: "#000000",
            borderTop: "4px solid #ede532",
            padding: "12px 16px",
            paddingBottom: "max(12px, env(safe-area-inset-bottom, 12px))",
            zIndex: 900,
          }}
        >
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <div
              style={{
                color: "#ede532",
                fontSize: 14,
                fontWeight: "900",
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginBottom: 8,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {current.number}. {getStopTitle(current, lang)}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button
                onClick={() => go(index - 1)}
                disabled={index === 0}
                aria-label={t(lang, "previous")}
                style={{
                  background: "transparent",
                  color: "#ede532",
                  border: "2px solid #ede532",
                  width: 44,
                  height: 44,
                  fontSize: 15,
                  fontWeight: "900",
                  cursor: index === 0 ? "default" : "pointer",
                  opacity: index === 0 ? 0.35 : 1,
                  borderRadius: 0,
                  flexShrink: 0,
                }}
              >
                ⏮
              </button>

              <audio
                ref={audioRef}
                controls
                preload="metadata"
                src={currentSrc}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onEnded={() => go(index + 1)}
                onLoadedMetadata={() => {
                  const el = audioRef.current;
                  if (el && resumeTo.current != null) {
                    el.currentTime = resumeTo.current;
                    resumeTo.current = null;
                  }
                }}
                style={{ flex: 1, minWidth: 0, height: 44 }}
              />

              <button
                onClick={() => go(index + 1)}
                disabled={index >= stops.length - 1}
                aria-label={t(lang, "next")}
                style={{
                  background: "transparent",
                  color: "#ede532",
                  border: "2px solid #ede532",
                  width: 44,
                  height: 44,
                  fontSize: 15,
                  fontWeight: "900",
                  cursor: index >= stops.length - 1 ? "default" : "pointer",
                  opacity: index >= stops.length - 1 ? 0.35 : 1,
                  borderRadius: 0,
                  flexShrink: 0,
                }}
              >
                ⏭
              </button>
            </div>

            {trail.narrator && (
              <p style={{ margin: "8px 0 0 0", fontSize: 11, color: "#ede532", opacity: 0.6 }}>
                {t(lang, "narratedBy")} {trail.narrator}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
