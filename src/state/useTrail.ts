import { useEffect, useState } from "react";
import type { TrailResponse } from "../lib/types";
import { fetchTrailData } from "../lib/api";

export function useTrail() {
  const [data, setData] = useState<TrailResponse | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        const d = await fetchTrailData();
        if (!cancelled) setData(d);
      } catch (e: any) {
        if (!cancelled) setErr(e?.message ?? "Failed to load data");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, err, loading };
}
