import { Component, OnInit, Input } from '@angular/core';

import { Movie } from '@filmopedia/api-interfaces';
import { MoviesService } from './../../core/movies.service';

@Component({
  selector: 'filmopedia-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  @Input() movie: Movie;
  isFavoriteMovie = false;

  constructor(public moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService.getFavoriteMovies().subscribe((moviesId: number[]) => {
      this.isFavoriteMovie = moviesId.includes(this.movie.id);
    });
  }

  getCorrectMoviePosterPath(): string {
    const posterPath = this.movie.poster_path || this.movie.backdrop_path;
    return `https://image.tmdb.org/t/p/w440_and_h660_face${posterPath}`;
  }
}
