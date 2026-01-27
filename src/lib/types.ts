export type Lang = "en" | "cy" | "pl" | "uk" | "pa" | "ur" | "hu";

export type TrailStop = {
  number: number;
  title: string;
  title_cy?: string;
  title_pl?: string;
  title_uk?: string;
  title_pa?: string;
  title_ur?: string;
  title_hu?: string;
  
  description?: string;
  description_cy?: string;
  description_pl?: string;
  description_uk?: string;
  description_pa?: string;
  description_ur?: string;
  description_hu?: string;
  
  lat: number;
  lng: number;
  radiusMetres: number;

  wixUrl: string;
  wixUrl_cy?: string;

  audioUrl?: string;
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
};

export type Trail = {
  id: string;
  title: string;
  title_cy?: string;
  nearbyRadiusMetres: number;
  stops: TrailStop[];
};

export type TrailResponse = {
  trails: Trail[];
};