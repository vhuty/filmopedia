import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '@filmopedia/api-interfaces';

@Component({
  selector: 'filmopedia-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  @Input() movie: Movie;

  constructor() {}

  ngOnInit(): void {}
}
