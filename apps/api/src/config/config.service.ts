import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';

import { environment } from '@environment';

const {
  database: {
    host,
    port,
    database,
    username,
    password,
    synchronize,
    autoLoadEntities,
    dropSchema,
  },
} = environment;

@Injectable()
export class ConfigService {
  static getTypeOrmModuleOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host,
      port,
      database,
      username,
      password,
      synchronize,
      autoLoadEntities,
      dropSchema,
    };
  }

  getTypeOrmConnectionOptions(entities: Function[]): ConnectionOptions {
    return {
      type: 'postgres',
      host,
      port,
      database,
      username,
      password,
      entities,
    };
  }

  getCredentialsConfig() {
    return environment.credentials;
  }

  getDatabaseConfig() {
    return environment.database;
  }
}
