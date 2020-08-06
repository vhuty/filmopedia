import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genreWallpaper',
})
export class GenreWallpaperPipe implements PipeTransform {
  transform(genreName: string): string {
    const genreFileName = genreName.toLowerCase().replace(/\s/g, '_');
    return `url('../../assets/images/genres/${genreFileName}.jpg')`;
  }
}
