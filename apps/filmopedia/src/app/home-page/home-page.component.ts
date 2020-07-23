import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { Genre } from '@filmopedia/api-interfaces';
import { MoviesService } from '../core/movies.service';

@Component({
  selector: 'filmopedia-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  projectName = '';
  genres$: Observable<Genre[]>;

  constructor(
    private activeRoute: ActivatedRoute,
    private titleService: Title,
    private moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    this.activeRoute.data.subscribe((data: Data) => {
      this.titleService.setTitle(data['routeTitle']);
    });
    this.genres$ = this.moviesService.getMoviesGenres();
  }

  getGenreWallpaperPath(genre: string): string {
    const genreFileName = genre.toLowerCase().replace(/\s/g, '_');
    return `url('../../assets/images/genres/${genreFileName}.jpg')`;
  }
}
