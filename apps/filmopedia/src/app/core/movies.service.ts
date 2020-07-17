import { Injectable } from '@angular/core';

import { Movie } from '@filmopedia/api-interfaces';
import { BehaviorSubject, Observable } from 'rxjs';

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
  private favoriteMovies$ = new BehaviorSubject<string[]>([]);

  constructor() {
    for (let i = 0; i < 13; i++) {
      this.movies.push({
        id: `${i}`,
        name: 'Avatar',
        genres: ['Action', 'Sci-Fi'],
        year: '2009',
        countries: ['USA'],
        posterURL: 'https://movieposters2.com/images/1397414-b.jpg',
      });
    }

    const favMoviesStr = localStorage.getItem('favoriteMovies');
    if (favMoviesStr) {
      this.favoriteMovies$.next(JSON.parse(favMoviesStr));
    }
    this.favoriteMovies$.subscribe((moviesIds: string[]) => {
      localStorage.setItem('favoriteMovies', JSON.stringify(moviesIds));
    });
  }

  public getMovies(): Movie[] {
    return this.movies;
  }

  public getMoviesGenres(): string[] {
    return this.moviesGenres;
  }

  public getFavoriteMovies(): Observable<string[]> {
    return this.favoriteMovies$.asObservable();
  }

  public addMovieToFavorites(movieId: string): void {
    const favMoviesIds = this.favoriteMovies$.getValue();
    favMoviesIds.push(movieId);
    this.favoriteMovies$.next(favMoviesIds);
  }

  public removeMovieFromFavorites(movieId: string): void {
    const favMoviesIds = this.favoriteMovies$.getValue();
    favMoviesIds.splice(favMoviesIds.indexOf(movieId), 1);
    this.favoriteMovies$.next(favMoviesIds);
  }
}
