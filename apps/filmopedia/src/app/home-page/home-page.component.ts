import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

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
  genresSwiperConfig: SwiperConfigInterface = {
    speed: 500,
    autoplay: {
      delay: 4000,
    },
    slidesPerView: 1.2,
    centeredSlides: true,
    centeredSlidesBounds: true,
    spaceBetween: 15,
    mousewheel: true,
    loop: true,
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
        centeredSlides: false,
      },
      960: {
        slidesPerView: 5,
        centeredSlides: false,
      },
      1280: {
        slidesPerView: 6,
        centeredSlides: false,
      },
      1920: {
        slidesPerView: 8,
        centeredSlides: false,
      },
    },
  };

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

  navigateMoviesPage(page: number): void {
    window.scroll({
      top: this.moviesSectionRef.nativeElement.offsetTop - 80,
    });
    this.moviesService.changeMoviesPage(page);
  }
}
