import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { Genre, Movie, MoviesResponse } from '@filmopedia/api-interfaces';
import { MoviesService } from '../core/movies.service';
import { pluck, tap } from 'rxjs/operators';

@Component({
  selector: 'filmopedia-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  projectName = '';
  currMoviesPage: number;
  totalMoviesPages: number;
  @ViewChild('moviesSection') moviesSectionRef: ElementRef;
  genres$: Observable<Genre[]>;
  movies$: Observable<Movie[]>;

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
    this.movies$ = this.moviesService.getMovies().pipe(
      tap((moviesResp: MoviesResponse) => {
        this.currMoviesPage = moviesResp.page;
        this.totalMoviesPages = moviesResp.total_pages;
      }),
      pluck('results')
    );
  }

  getGenreWallpaperPath(genre: string): string {
    const genreFileName = genre.toLowerCase().replace(/\s/g, '_');
    return `url('../../assets/images/genres/${genreFileName}.jpg')`;
  }

  navigateMoviesPage(page: number): void {
    window.scroll({
      top: this.moviesSectionRef.nativeElement.offsetTop - 80,
    });
    this.moviesService.changeMoviesPage(page);
  }
}
