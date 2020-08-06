import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  Title,
  DomSanitizer,
  SafeResourceUrl,
} from '@angular/platform-browser';

import { Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { MovieDetails } from '@filmopedia/api-interfaces';
import { environment } from './../../environments/environment';

import { MoviesService } from './../core/movies.service';
@Component({
  selector: 'filmopedia-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss'],
})
export class MoviePageComponent implements OnInit, OnDestroy {
  movie: MovieDetails;
  movieSub: Subscription;
  movieTrailerSrc: SafeResourceUrl;
  isFavoriteMovie: boolean;
  errorMsg: string;
  movieRating = 0;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    public moviesService: MoviesService,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params: Params) => params['id']),
        tap((movieId: string) => {
          this.moviesService
            .getFavoriteMovies()
            .subscribe((favMovies: number[]) => {
              this.isFavoriteMovie = favMovies.includes(Number(movieId));
            });
        }),
        switchMap((movieId: string) =>
          this.moviesService.getMovieDetails(movieId)
        )
      )
      .subscribe(
        (movie: MovieDetails) => {
          this.movie = movie;
          this.titleService.setTitle(
            `${movie.title} | ${environment.projectName}`
          );
          this.setMovieTrailerSrc();
          setTimeout(() => (this.movieRating = movie.vote_average * 10), 500);
        },
        (errorMsg: string) => (this.errorMsg = errorMsg)
      );
  }

  setMovieTrailerSrc(): void {
    const trailer = this.movie.videos.results.find(
      (video) => video.type === 'Trailer'
    );
    this.movieTrailerSrc = this._sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${trailer.key}`
    );
  }

  ngOnDestroy(): void {
    if (this.movieSub) {
      this.movieSub.unsubscribe();
    }
  }
}
