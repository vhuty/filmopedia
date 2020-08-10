import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  Title,
  DomSanitizer,
  SafeResourceUrl,
} from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { MovieDetails, Movie } from '@filmopedia/api-interfaces';
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
  similarMovies: Movie[];
  similarMoviesSub: Subscription;
  movieTrailerSrc: SafeResourceUrl;
  isFavoriteMovie: boolean;
  errorMsg: string;
  movieRating = 0;
  similarMovieHoveredCardId: number | null;
  similarMoviesSwiperConfig: SwiperConfigInterface = {
    speed: 500,
    slidesPerView: 2,
    spaceBetween: 15,
    mousewheel: true,
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      599: {
        slidesPerView: 4,
      },
      960: {
        slidesPerView: 5,
        autoHeight: true,
      },
      1280: {
        slidesPerView: 6,
        autoHeight: true,
      },
    },
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    public moviesService: MoviesService,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.params
      .pipe(
        map((params: Params) => Number(params['id'])),
        tap((movieId: number) => {
          this.moviesService
            .getFavoriteMovies()
            .subscribe((favMovies: number[]) => {
              this.isFavoriteMovie = favMovies.includes(movieId);
            });
          this.similarMoviesSub = this.moviesService
            .getSimilarMovies(movieId)
            .subscribe((movies: Movie[]) => {
              this.similarMovies = movies;
            });
        }),
        switchMap((movieId: number) =>
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
    if (this.similarMoviesSub) {
      this.similarMoviesSub.unsubscribe();
    }
  }
}
