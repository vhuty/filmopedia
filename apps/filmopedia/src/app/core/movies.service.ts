import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { pluck, switchMap, catchError } from 'rxjs/operators';

import {
  Genre,
  MoviesResponse,
  ResponseError,
  MovieDetails,
  Movie,
} from '@filmopedia/api-interfaces';
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

  public getMovieDetails(movieId: number): Observable<MovieDetails | string> {
    return this.http
      .get<MovieDetails>(
        `${this.baseURL}/movie/${movieId}?api_key=${environment.apiKey}&append_to_response=videos,images`
      )
      .pipe(catchError(this.handleRequestError));
  }

  public getMoviesGenres(): Observable<Genre[]> {
    return this.http
      .get(`${this.baseURL}/genre/movie/list?api_key=${environment.apiKey}`)
      .pipe(pluck('genres'));
  }

  public getMovies(): Observable<MoviesResponse | string> {
    return this.currMoviesPage$.pipe(
      switchMap((page: number) =>
        this.http.get<MoviesResponse>(
          `${this.baseURL}/movie/popular?api_key=${environment.apiKey}&page=${page}`
        )
      ),
      catchError(this.handleRequestError)
    );
  }

  public getSimilarMovies(movieId: number): Observable<Movie[]> {
    return this.http
      .get<MoviesResponse>(
        `${this.baseURL}/movie/${movieId}/similar?api_key=${environment.apiKey}`
      )
      .pipe(pluck('results'));
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

  private handleRequestError(errorResp: HttpErrorResponse): Observable<string> {
    const error: ResponseError = errorResp.error;
    console.error(error);
    const errorMsg =
      error.status_code === 34
        ? 'Sorry, we could not find the requested movie.'
        : 'Oops, something went wrong.';
    return throwError(errorMsg);
  }
}
