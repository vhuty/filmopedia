import { createConnection } from 'typeorm';

import { ConfigService } from '../../config/config.service';

const config = new ConfigService();

export const getConnection = () => {
  return createConnection(config.getTypeOrmConnectionOptions());
}