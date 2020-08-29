import 'reflect-metadata';
import { HttpService } from '@nestjs/common/http';
import { Logger } from '@nestjs/common';
import { getConnection } from './connection';

import { ConfigService } from '@api/config/config.service';
import { Genre } from '@api/app/genre/genre.entity';

async function importGenres() {
  const config = new ConfigService();
  const { TMDbApiKey } = config.getCredentialsConfig();

  const url = new URL('https://api.themoviedb.org/3/genre/movie/list');
  url.searchParams.append('api_key', TMDbApiKey);

  try {
    const genres = await fetchGenres(url.href);

    const connection = await getConnection([Genre]);
    const genreRepository = connection.getRepository(Genre);

    /* Truncate genres table */
    await genreRepository.clear();

    /* Save new genre entities */
    await genreRepository.save(genres);

    Logger.log(`Success: ${genres.length} genres imported`, 'Database import');
  } catch (err) {
    console.error(err);
  }
}

async function fetchGenres(url: string): Promise<Genre[]> {
  const http = new HttpService();

  const { data } = await http.get(url).toPromise();
  const genresDto: GenreDto[] = data.genres;

  /* Generate genre slug and cast a DTO to the ORM Genre entity */
  const genres: Genre[] = genresDto.map(({ id, name }) => {
    const slug = name.toLowerCase().replace(/\W/g, '_');

    return { id, name, slug };
  });

  return genres;
}

type GenreDto = {
  id: number;
  name: string;
};

export { importGenres };
