import { Logger } from '@nestjs/common';

const env = new Proxy(process.env, {
  get(target, prop) {
    const key = String(prop);

    if (key in target) {
      return target[key];
    }

    Logger.error(`Missing "${key}" environment variable`, 'Environments');

    process.exit(9);
  },
});

export const environment = {
  database: {
    synchronize: env.ORM_SYNC?.toLowerCase() === 'true',
    autoLoadEntities: env.ORM_AUTO_ENTITIES?.toLowerCase() === 'true',
    dropSchema: env.ORM_DROP_SCHEMA?.toLowerCase() === 'true',
    host: env.DB_HOST,
    port: Number(env.DB_PORT),
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
  },
  credentials: {
    TMDbApiKey: env.TMDB_API_KEY,
  },
};
