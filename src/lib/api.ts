import type { TrailResponse } from "./types";

// Served from our own domain by Cloudflare: fast, unmetered, and it works
// offline once the service worker has cached it.
const PRIMARY = "/chartist_trail.json";

// Fallback only. GitHub rate-limits this and it is not a CDN, so it is
// used solely when our own copy cannot be reached.
const FALLBACK =
  "https://raw.githubusercontent.com/techn0deity/Newport-Rising-Trail/main/public/chartist_trail.json";

function parseTrail(text: string, source: string): TrailResponse {
  if (!text || text.trim().length === 0) {
    throw new Error(`Trail data at ${source} was empty.`);
  }
  try {
    return JSON.parse(text) as TrailResponse;
  } catch {
    throw new Error(
      `Trail data at ${source} was not valid JSON. First 200 characters: ${text.slice(0, 200)}`
    );
  }
}

async function load(url: string): Promise<TrailResponse> {
  const res = await fetch(url);
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Failed to load trail data (${res.status}) from ${url}`);
  }
  return parseTrail(text, url);
}

export async function fetchTrailData(): Promise<TrailResponse> {
  try {
    return await load(PRIMARY);
  } catch (primaryError) {
    try {
      return await load(FALLBACK);
    } catch {
      // Report the primary failure: it is the one worth fixing.
      throw primaryError;
    }
  }
}