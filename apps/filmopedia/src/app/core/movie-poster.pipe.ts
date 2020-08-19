import { Pipe, PipeTransform } from '@angular/core';
import { Movie, MovieDetails, FavoriteMovie } from '@filmopedia/api-interfaces';

@Pipe({
  name: 'moviePoster',
})
export class MoviePosterPipe implements PipeTransform {
  transform(
    movie: Movie | MovieDetails | FavoriteMovie,
    posterSize: 'regular' | 'small' = 'regular'
  ): string {
    const primaryPosterPath = movie.poster_path || movie.backdrop_path;
    if (!primaryPosterPath) {
      return '../../assets/images/poster-not-available.jpg';
    }
    return posterSize === 'regular'
      ? `https://image.tmdb.org/t/p/w440_and_h660_face${primaryPosterPath}`
      : `https://image.tmdb.org/t/p/w220_and_h330_face${primaryPosterPath}`;
  }
}
