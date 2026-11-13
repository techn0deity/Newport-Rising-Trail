export type TrailStop = {
  number: number;
  title: string;
  title_cy?: string;
  title_pl?: string;
  title_uk?: string;
  title_pa?: string;
  title_ur?: string;
  title_hu?: string;
  lat: number;
  lng: number;
  radiusMetres: number;
  wixUrl: string;
  wixUrl_cy?: string;
  audioUrl?: string;
  narrationUrl?: string;
  narrationUrl_cy?: string;
  audioTranscript?: string;
  audioTranscript_cy?: string;
  audioFiles?: {
    title: string;
    title_cy?: string;
    description?: string;
    description_cy?: string;
    url: string;
  }[];
  videoUrl?: string;
  imageUrls?: string[];
  communityContent?: {
    imageUrl?: string;
    text?: string;
    author?: string;
  }[];
  credits?: string;
    matterportUrl?: string;

};

export type Trail = {
  id: string;
  title: string;
  title_cy?: string;
  narrator?: string;
  narrator_cy?: string;
  nearbyRadiusMetres: number;
  stops: TrailStop[];
};

// The Chartist Ale Trail: a short, separate walk of five ceramic markers on
// pubs and former pubs. Venue names and addresses stay in English in every
// language, as the credits field does - they are proper nouns on a street sign.
export type AleTrailVenue = {
  name: string;
  // Omitted where the building address is itself the name, as at 22-23 High
  // Street, whose occupant changes but whose ceramic marker does not.
  address?: string;
  note?: string;
  lat: number;
  lng: number;
  // The Carpenters Arms and the Murenger are also stops on the main trail.
  // Where a venue is, we link through to the stop rather than repeat it.
  stopNumber?: number;
  description?: string;
  description_cy?: string;
  description_pl?: string;
  description_uk?: string;
  description_pa?: string;
  description_ur?: string;
  description_hu?: string;
};

export type AleTrail = {
  enabled: boolean;
  url: string;
  venues: AleTrailVenue[];
};

export type TrailResponse = {
  trails: Trail[];
  aleTrail?: AleTrail;
};

export type Lang = "en" | "cy" | "pl" | "uk" | "pa" | "ur" | "hu";
