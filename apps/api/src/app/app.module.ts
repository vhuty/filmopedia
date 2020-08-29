import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '../config/config.module';

/* ORM modules */
import { MovieModule } from './movie/movie.module';
import { GenreModule } from './genre/genre.module';

import { ConfigService } from '../config/config.service';
import { AppService } from './app.service';

import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot(ConfigService.getTypeOrmModuleOptions()),
    MovieModule,
    GenreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
