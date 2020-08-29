import { createConnection } from 'typeorm';

import { ConfigService } from '@api/config/config.service';

const config = new ConfigService();

export const getConnection = (entities: Function[]) => {
  return createConnection(config.getTypeOrmConnectionOptions(entities));
};
