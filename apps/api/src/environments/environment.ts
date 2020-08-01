import { resolve } from 'path';
import { config } from 'dotenv';

config({ path: resolve(__dirname, '../../.env') });

const env = new Proxy(process.env, {
  get(target, prop) {
    const key = String(prop);

    if (key in target) {
      return target[key];
    }

    throw new Error(`[Config] Missing "${key}" environment variable`);
  },
});

export const environment = {
  database: {
    synchronize: env.ORM_SYNC && env.ORM_SYNC.toLowerCase() === 'true',
    autoLoadEntities:
      env.ORM_AUTO_ENTITIES && env.ORM_AUTO_ENTITIES.toLowerCase() === 'true',

    host: env.DB_HOST,
    port: Number(env.DB_PORT),
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
  },
  credentials: {
    TMDbApiKey: env.TMDB_API_KEY,
  },
};
