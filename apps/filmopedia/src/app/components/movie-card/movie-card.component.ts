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
    this.moviesService.getFavoriteMovies().subscribe((moviesId: string[]) => {
      this.isFavoriteMovie = moviesId.includes(this.movie.id);
    });
  }
}
