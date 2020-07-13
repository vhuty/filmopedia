import { Injectable } from '@angular/core';

import { Movie } from '@filmopedia/api-interfaces';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  private moviesGenres: string[] = [
    'action',
    'adventures',
    'animation',
    'anime',
    'comedy',
    'detective',
    'documentary',
    'drama',
    'horror',
    'family',
    'fantasy',
    'historical',
    'medical',
    'musical',
    'romance',
    'sport',
    'fiction',
    'war',
    'western',
  ];
  private movies: Movie[] = [];

  constructor() {
    for (let i = 0; i < 13; i++) {
      this.movies.push({
        name: 'Avatar',
        genres: ['Action', 'Sci-Fi'],
        year: '2009',
        countries: ['USA'],
        posterURL: 'https://movieposters2.com/images/1397414-b.jpg',
      });
    }
  }

  public getMovies(): Movie[] {
    return this.movies;
  }

  public getMoviesGenres(): string[] {
    return this.moviesGenres;
  }
}
