import { Controller, Get } from '@nestjs/common';

import { ConfigService } from '../../config/config.service';

@Controller('movies')
export class MovieController {
  constructor(
    private readonly config: ConfigService
  ) {}
}
