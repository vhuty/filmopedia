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
  }
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
    };
  }

  getTypeOrmConnectionOptions(): ConnectionOptions {
    return {
      type: 'postgres',
      host,
      port,
      database,
      username,
      password,
    };
  }

  getCredentialsConfig() {
    return environment.credentials;
  }

  getDatabaseConfig() {
    return environment.database;
  }
}
