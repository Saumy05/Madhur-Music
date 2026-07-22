import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('System')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  @ApiOperation({ summary: 'API Health Check' })
  @ApiResponse({ status: 200, description: 'Return system health status details.' })
  getHealth() {
    return this.appService.getHealth();
  }
}
