import { Module } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { YoutubeService } from './youtube.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SongsController],
  providers: [SongsService, YoutubeService],
})
export class SongsModule {}
