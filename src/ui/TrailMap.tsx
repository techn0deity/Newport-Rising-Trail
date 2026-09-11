import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Protocol } from "pmtiles";
import { layers, namedFlavor } from "@protomaps/basemaps";
import type { TrailStop } from "../lib/types";
import type { Lang } from "../lib/types";

// Register the pmtiles:// protocol once for the whole app. Our map file is
// a single static archive served from our own domain, so there is no tile
// server to depend on and nobody who can rate-limit or block us.
let protocolRegistered = false;
function registerPmtilesProtocol() {
  if (protocolRegistered) return;
  const protocol = new Protocol();
  maplibregl.addProtocol("pmtiles", protocol.tile);
  protocolRegistered = true;
}

function getStopTitle(stop: any, lang: Lang): string {
  if (lang === "en") return stop.title;
  const key = "title_" + lang;
  const translated = stop[key];
  if (translated && translated.length > 0) return translated;
  return stop.title;
}

export default function TrailMap({ stops, lang = "en" }: { stops: TrailStop[]; lang?: Lang }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (mapRef.current) return;

    const lats = stops.map(s => s.lat);
    const lngs = stops.map(s => s.lng);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    
    const centerLat = (minLat + maxLat) / 2;
    const centerLng = (minLng + maxLng) / 2;

    registerPmtilesProtocol();

    const map = new maplibregl.Map({
      container: ref.current,
      style: {
        version: 8,
        glyphs:
          "https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf",
        sprite: "https://protomaps.github.io/basemaps-assets/sprites/v4/light",
        sources: {
          protomaps: {
            type: "vector",
            // Served from Cloudflare R2, not Pages: Pages cannot do HTTP
            // byte serving, which PMTiles depends on.
            url: "pmtiles://https://pub-9c02976ca0004da69a10b0e066ed5a74.r2.dev/newport.pmtiles",
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors, tiles by <a href="https://protomaps.com" target="_blank" rel="noreferrer">Protomaps</a>',
          },
        },
        layers: layers("protomaps", namedFlavor("light"), {
          lang: lang === "cy" ? "cy" : "en",
        }),
      },
      center: [centerLng, centerLat],
      zoom: 13,
      maxZoom: 17,
    });

    map.on("load", () => {
      map.fitBounds(
        [[minLng, minLat], [maxLng, maxLat]],
        { padding: 50, maxZoom: 15 }
      );
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");

    // Show the walker's own position, with an accuracy ring, and keep it
    // updated as they move along the trail.
    const geolocate = new maplibregl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true,
      showUserLocation: true,
      showAccuracyCircle: true,
    });
    map.addControl(geolocate, "top-right");

    // If the visitor has already granted location permission elsewhere in
    // the app, start tracking straight away rather than making them tap.
    // If they haven't, do nothing - never prompt unasked.
    map.on("load", () => {
      if (!navigator.permissions?.query) return;
      navigator.permissions
        .query({ name: "geolocation" as PermissionName })
        .then((status) => {
          if (status.state === "granted") geolocate.trigger();
        })
        .catch(() => {
          // Permissions API unavailable - leave it to the button.
        });
    });

    const viewLabel = lang === "cy" ? "Gweld y safle" : "View details";

    stops.forEach((s) => {
      const el = document.createElement("div");
      el.style.width = "32px";
      el.style.height = "32px";
      el.style.borderRadius = "50%";
      el.style.background = "#000000";
      el.style.border = "3px solid #ede532";
      el.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
      el.style.cursor = "pointer";
      el.style.display = "flex";
      el.style.alignItems = "center";
      el.style.justifyContent = "center";
      el.style.fontSize = "12px";
      el.style.fontWeight = "bold";
      el.style.color = "#ede532";
      el.textContent = String(s.number);

      const title = getStopTitle(s, lang);

      const safeTitle = title
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      // Show the stop name first rather than jumping straight to the page,
      // so people can tell which marker they have tapped on a busy map.
      new maplibregl.Marker({ element: el })
        .setLngLat([s.lng, s.lat])
        .setPopup(
          new maplibregl.Popup({ offset: 18, closeButton: true }).setHTML(
            '<div style="min-width:150px;">' +
              '<strong style="display:block; font-size:15px; color:#000; margin-bottom:8px; line-height:1.3;">' +
              s.number + ". " + safeTitle +
              "</strong>" +
              '<a href="/stop/' + s.number + '" style="display:inline-block; background:#000; color:#ede532; padding:7px 14px; border-radius:6px; text-decoration:none; font-size:13px; font-weight:bold;">' +
              viewLabel +
              "</a>" +
            "</div>"
          )
        )
        .addTo(map);
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [stops, lang]);

  return (
    <div
      ref={ref}
      style={{ 
        width: "100%",
        height: "100%",
        minHeight: 450,
        overflow: "hidden",
      }}
    />
  );
}