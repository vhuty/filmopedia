import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NbPopoverDirective } from '@nebular/theme';

import { environment } from './../../../environments/environment.prod';
import { MoviesService } from './../../core/movies.service';
import { FavoriteMovie } from '@filmopedia/api-interfaces';

@Component({
  selector: 'filmopedia-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  projectName = '';
  favoriteMovies: FavoriteMovie[];
  favoriteMoviesSub: Subscription;
  @ViewChild(NbPopoverDirective) favoriteMoviesPopover: NbPopoverDirective;

  constructor(public moviesService: MoviesService, private router: Router) {}

  ngOnInit(): void {
    this.projectName = environment.projectName;
    this.favoriteMoviesSub = this.moviesService
      .getFavoriteMovies()
      .subscribe((favMovies) => {
        this.favoriteMovies = favMovies;
      });
  }

  navigateToFavoriteMoviePage(movieId: number): void {
    this.favoriteMoviesPopover.hide();
    this.router.navigateByUrl(`movie/${movieId}`);
  }

  ngOnDestroy(): void {
    this.favoriteMoviesSub?.unsubscribe();
  }
}
