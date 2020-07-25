export interface MoviesResponse {
  page: number;
  total_pages: number;
  total_results: number;
  results: Movie[];
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
