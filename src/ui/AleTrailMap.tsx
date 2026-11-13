import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { layers, namedFlavor } from "@protomaps/basemaps";
import type { AleTrailVenue, Lang } from "../lib/types";
import { registerPmtilesProtocol } from "./TrailMap";

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// The five ale trail markers, on the same self-hosted basemap as the main
// trail so there is still no tile server anyone can rate-limit or block.
export default function AleTrailMap({
  venues,
  lang = "en",
}: {
  venues: AleTrailVenue[];
  lang?: Lang;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (mapRef.current) return;
    if (venues.length === 0) return;

    const lats = venues.map((v) => v.lat);
    const lngs = venues.map((v) => v.lng);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

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
            url: "pmtiles://https://pub-9c02976ca0004da69a10b0e066ed5a74.r2.dev/newport.pmtiles",
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors, tiles by <a href="https://protomaps.com" target="_blank" rel="noreferrer">Protomaps</a>',
          },
        },
        layers: layers("protomaps", namedFlavor("light"), {
          lang: lang === "cy" ? "cy" : "en",
        }),
      },
      center: [(minLng + maxLng) / 2, (minLat + maxLat) / 2],
      zoom: 14,
      maxZoom: 17,
    });

    map.on("load", () => {
      map.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat],
        ],
        { padding: 60, maxZoom: 16 }
      );
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");

    // Same rule as the main map: show the walker if they have already granted
    // location somewhere in the app, but never prompt unasked.
    const geolocate = new maplibregl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true,
      showUserLocation: true,
      showAccuracyCircle: true,
    });
    map.addControl(geolocate, "top-right");

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

    venues.forEach((v, i) => {
      const el = document.createElement("div");
      el.style.width = "32px";
      el.style.height = "32px";
      el.style.borderRadius = "50%";
      // Yellow fill, inverted from the main trail's black pins, so the two
      // sets never read as one numbered sequence.
      el.style.background = "#ede532";
      el.style.border = "3px solid #000000";
      el.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
      el.style.cursor = "pointer";
      el.style.display = "flex";
      el.style.alignItems = "center";
      el.style.justifyContent = "center";
      el.style.fontSize = "12px";
      el.style.fontWeight = "bold";
      el.style.color = "#000000";
      el.textContent = String(i + 1);

      let html =
        '<div style="min-width:160px;">' +
        '<strong style="display:block; font-size:15px; color:#000; line-height:1.3;">' +
        escapeHtml(v.name) +
        "</strong>" +
        '<span style="display:block; font-size:13px; color:#000; margin-top:2px;">' +
        escapeHtml(v.address) +
        "</span>";

      // Only the markers that are also main trail stops have a page to open.
      if (v.stopNumber) {
        html +=
          '<a href="/stop/' +
          v.stopNumber +
          '" style="display:inline-block; margin-top:8px; background:#000; color:#ede532; padding:7px 14px; border-radius:6px; text-decoration:none; font-size:13px; font-weight:bold;">' +
          viewLabel +
          "</a>";
      }

      html += "</div>";

      new maplibregl.Marker({ element: el })
        .setLngLat([v.lng, v.lat])
        .setPopup(new maplibregl.Popup({ offset: 18, closeButton: true }).setHTML(html))
        .addTo(map);
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [venues, lang]);

  return <div ref={ref} style={{ width: "100%", height: 320, overflow: "hidden" }} />;
}
