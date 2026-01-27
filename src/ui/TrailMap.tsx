import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { TrailStop } from "../lib/types";
import type { Lang } from "../lib/types";

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

    const map = new maplibregl.Map({
      container: ref.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution: "OpenStreetMap contributors",
          },
        },
        layers: [
          {
            id: "osm",
            type: "raster",
            source: "osm",
            minzoom: 0,
            maxzoom: 19,
          },
        ],
      },
      center: [centerLng, centerLat],
      zoom: 13,
    });

    map.on("load", () => {
      map.fitBounds(
        [[minLng, minLat], [maxLng, maxLat]],
        { padding: 50, maxZoom: 15 }
      );
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");

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

      new maplibregl.Marker({ element: el })
        .setLngLat([s.lng, s.lat])
        .setPopup(
          new maplibregl.Popup({ offset: 15 }).setHTML(
            "<strong>" + s.number + ". " + title + "</strong><br><a href='/stop/" + s.number + "' style='color: #000000;'>View details</a>"
          )
        )
        .addTo(map);

      el.addEventListener("click", () => {
        window.location.href = "/stop/" + s.number;
      });
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
