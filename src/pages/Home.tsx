import { Link } from "react-router-dom";
import type { Lang } from "../lib/types";
import { useTrail } from "../state/useTrail";
import { pickLang } from "../lib/i18n";

export default function Home({ lang }: { lang: Lang }) {
  const { data, err, loading } = useTrail();

  if (loading) return <div>Loading…</div>;
  if (err || !data) return <div>Couldn’t load trail data. {err}</div>;

  const trail = data.trails[0];

  return (
    <div>
      <h1>{pickLang(lang, trail.title, trail.title_cy)}</h1>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Link to="/trail">
          <button>Open trail</button>
        </Link>
        <Link to="/nearby">
          <button>Nearby stops</button>
        </Link>
      </div>

      <p style={{ marginTop: 12 }}>Stops: {trail.stops.length}</p>

      <p style={{ opacity: 0.8 }}>
        Location is used only to show nearby stops - it isn’t stored.
      </p>
    </div>
  );
}

