import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { pluck, switchMap } from 'rxjs/operators';

import { Genre, MoviesResponse } from '@filmopedia/api-interfaces';
import { environment } from './../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  private readonly baseURL = 'https://api.themoviedb.org/3';
  private favoriteMovies$ = new BehaviorSubject<number[]>([]);
  private currMoviesPage$ = new BehaviorSubject<number>(1);

  constructor(private http: HttpClient) {
    const favMoviesStr = localStorage.getItem('favoriteMovies');
    if (favMoviesStr) {
      this.favoriteMovies$.next(JSON.parse(favMoviesStr));
    }
    this.favoriteMovies$.subscribe((moviesIds: number[]) => {
      localStorage.setItem('favoriteMovies', JSON.stringify(moviesIds));
    });
    this.currMoviesPage$.subscribe();
  }

  public getMoviesGenres(): Observable<Genre[]> {
    return this.http
      .get(`${this.baseURL}/genre/movie/list?api_key=${environment.apiKey}`)
      .pipe(pluck('genres'));
  }

  public getMovies(): Observable<MoviesResponse> {
    return this.currMoviesPage$.pipe(
      switchMap((page: number) =>
        this.http.get<MoviesResponse>(
          `${this.baseURL}/movie/popular?api_key=${environment.apiKey}&page=${page}`
        )
      )
    );
  }

  public getFavoriteMovies(): Observable<number[]> {
    return this.favoriteMovies$.asObservable();
  }

  public addMovieToFavorites(movieId: number): void {
    const favMoviesIds = this.favoriteMovies$.getValue();
    favMoviesIds.push(movieId);
    this.favoriteMovies$.next(favMoviesIds);
  }

  public removeMovieFromFavorites(movieId: number): void {
    const favMoviesIds = this.favoriteMovies$.getValue();
    favMoviesIds.splice(favMoviesIds.indexOf(movieId), 1);
    this.favoriteMovies$.next(favMoviesIds);
  }

  public changeMoviesPage(page: number): void {
    this.currMoviesPage$.next(page);
  }
}
