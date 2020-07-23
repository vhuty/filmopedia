import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { Genre } from '@filmopedia/api-interfaces';
import { environment } from './../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  private readonly baseURL = 'https://api.themoviedb.org/3';
  private favoriteMovies$ = new BehaviorSubject<string[]>([]);

  constructor(private http: HttpClient) {
    const favMoviesStr = localStorage.getItem('favoriteMovies');
    if (favMoviesStr) {
      this.favoriteMovies$.next(JSON.parse(favMoviesStr));
    }
    this.favoriteMovies$.subscribe((moviesIds: string[]) => {
      localStorage.setItem('favoriteMovies', JSON.stringify(moviesIds));
    });
  }

  public getMoviesGenres(): Observable<Genre[]> {
    return this.http
      .get(`${this.baseURL}/genre/movie/list?api_key=${environment.apiKey}`)
      .pipe(pluck('genres'));
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
