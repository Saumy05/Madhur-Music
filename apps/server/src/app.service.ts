import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      status: 'ok',
      service: 'Madhur Server API (NestJS)',
      timestamp: new Date().toISOString(),
    };
  }
}
