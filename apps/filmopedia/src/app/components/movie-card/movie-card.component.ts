import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Movie } from '@filmopedia/api-interfaces';
import { MoviesService } from './../../core/movies.service';

@Component({
  selector: 'filmopedia-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit, OnDestroy {
  @Input() movie: Movie;
  isFavoriteMovie: boolean;
  isFavoriteMovieSub: Subscription;

  constructor(public moviesService: MoviesService) {}

  ngOnInit(): void {
    this.isFavoriteMovieSub = this.moviesService
      .isFavoriteMovie(this.movie.id)
      .subscribe((isFavorite) => (this.isFavoriteMovie = isFavorite));
  }

  ngOnDestroy(): void {
    this.isFavoriteMovieSub?.unsubscribe();
  }
}
