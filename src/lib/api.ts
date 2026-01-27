import type { TrailResponse } from "./types";

const ENDPOINT = "https://raw.githubusercontent.com/techn0deity/Newport-Rising-Trail/main/chartist_trail.json";

export async function fetchTrailData(): Promise<TrailResponse> {
  const res = await fetch(ENDPOINT, { cache: "no-store" });

  const text = await res.text(); // read raw body once

  if (!res.ok) {
    throw new Error(`Failed to load trail data (${res.status}) - ${text.slice(0, 200)}`);
  }

  // Helpful if Wix returns HTML or empty responses
  if (!text || text.trim().length === 0) {
    throw new Error("Trail endpoint returned an empty response body.");
  }

  try {
    return JSON.parse(text) as TrailResponse;
  } catch {
    throw new Error(
      `Trail endpoint returned non-JSON. First 200 chars: ${text.slice(0, 200)}`
    );
  }
}
