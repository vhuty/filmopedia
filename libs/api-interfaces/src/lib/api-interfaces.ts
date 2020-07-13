export interface Message {
  message: string;
}

/**
 * @property {string} name - name of the movie.
 * @property {string[]} genres - list of movie's genres.
 * @property {string} year - year when the movie came out.
 * @property {string[]} countries - list of countries which has developed the movie.
 * @property {string} posterURL - URL of the movie poster image.
 */
export interface Movie {
  name: string;
  genres: string[];
  year: string;
  countries: string[];
  posterURL: string;
}
