export interface Message {
  message: string;
}

/**
 * Defines Movie object.
 * @property {string} id - unique id of the movie.
 * @property {string} name - name of the movie.
 * @property {string[]} genres - list of movie's genres.
 * @property {string} year - year when the movie came out.
 * @property {string[]} countries - list of countries which has developed the movie.
 * @property {string} posterURL - URL of the movie poster image.
 */
export interface Movie {
  id: string;
  name: string;
  genres: string[];
  year: string;
  countries: string[];
  posterURL: string;
}
