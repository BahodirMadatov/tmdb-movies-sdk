// Typed models for the TmdbMovies SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Movie {
  adult?: boolean
  backdrop_path?: string
  belongs_to_collection?: Record<string, any>
  budget?: number
  genre_ids?: any[]
  genres?: any[]
  homepage?: string
  id?: number
  imdb_id?: string
  origin_country?: any[]
  original_language?: string
  original_title?: string
  overview?: string
  popularity?: number
  poster_path?: string
  production_companies?: any[]
  production_countries?: any[]
  release_date?: string
  revenue?: number
  runtime?: number
  spoken_languages?: any[]
  status?: string
  tagline?: string
  title?: string
  video?: boolean
  vote_average?: number
  vote_count?: number
}

export interface MovieLoadMatch {
  id: number
  append_to_response?: string
  language?: string
}

export interface MovieListMatch {
  include_adult?: boolean
  language?: string
  page?: number
  primary_release_year?: string
  query: string
  region?: string
  year?: string
}

