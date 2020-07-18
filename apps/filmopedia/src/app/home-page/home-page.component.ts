import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Movie } from '@filmopedia/api-interfaces';
import { MoviesService } from '../core/movies.service';

@Component({
  selector: 'filmopedia-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  projectName = '';
  moviesGenres: string[];
  movies: Movie[];

  constructor(
    private activeRoute: ActivatedRoute,
    private titleService: Title,
    private moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    this.activeRoute.data.subscribe((data: Data) => {
      this.titleService.setTitle(data['routeTitle']);
    });
    this.moviesGenres = this.moviesService.getMoviesGenres();
    this.movies = this.moviesService.getMovies();
  }

  getGenreWallpaperPath(genre: string): string {
    return `url('../../assets/images/genres/${genre}.jpg')`;
  }
}
