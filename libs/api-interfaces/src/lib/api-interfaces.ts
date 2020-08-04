export interface MoviesResponse {
  page: number;
  total_pages: number;
  total_results: number;
  results: Movie[];
}

export interface MovieDetails {
  id: number;
  imdb_id: string | null;
  homepage: string | null;
  adult: boolean;
  video: boolean;
  title: string;
  budget: number;
  revenue: number;
  popularity: number;
  vote_average: number;
  release_date: string;
  vote_count: number;
  runtime: number | null;
  tagline: string | null;
  poster_path: string | null;
  backdrop_path: string | null;
  original_title: string;
  original_language: string;
  overview: string | null;
  status:
    | 'Rumored'
    | 'Planned'
    | 'In Production'
    | 'Post Production'
    | 'Released'
    | 'Canceled';
  genres: Genre[];
  production_companies: {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  spoken_languages: {
    iso_639_1: string;
    name: string;
  }[];
  belongs_to_collection: object | null;
  videos?: {
    results: {
      id: string;
      key: string;
      name: string;
      site: string;
      size: number;
      type: string;
      iso_639_1: string;
      iso_3166_1: string;
    }[];
  };
}

export interface Movie {
  id: number;
  title: string;
  original_title: string;
  original_language: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  genre_ids: number[];
  popularity: number;
  vote_count: number;
  vote_average: number;
  video: boolean;
  adult: boolean;
}

/**
 * Defines Genre object.
 */
export interface Genre {
  id: number;
  name: string;
}

export interface ResponseError {
  status_code: number;
  status_message: string;
}
