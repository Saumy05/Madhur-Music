import {
  Controller, Get, Post, Patch, Body, Param, Delete, Query, UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SongsService } from './songs.service';
import { YoutubeService } from './youtube.service';
import { CreateSongDto } from './dto/create-song.dto';
import { SubmitSongDto } from './dto/submit-song.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Songs')
@Controller('songs')
export class SongsController {
  constructor(
    private readonly songsService: SongsService,
    private readonly youtubeService: YoutubeService,
  ) {}

  // ── YouTube metadata (must come before :id route) ──────────────────────────

  @Get('youtube-info')
  @ApiOperation({ summary: 'Fetch YouTube video metadata from a URL (no download)' })
  @ApiQuery({ name: 'url', description: 'Full YouTube video URL' })
  getYoutubeInfo(@Query('url') url: string) {
    return this.youtubeService.getTrackInfo(url);
  }

  // ── Pending submissions (admin only) ───────────────────────────────────────

  @Get('pending')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'List all pending song submissions (Admin only)' })
  findPending() {
    return this.songsService.findPending();
  }

  // ── Catalog ────────────────────────────────────────────────────────────────

  @Get()
  @ApiOperation({ summary: 'Retrieve songs — PUBLISHED for all; PENDING/REJECTED filtered by userId' })
  @ApiQuery({ name: 'userId', required: false })
  @ApiQuery({ name: 'admin', required: false })
  findAll(@Query('userId') userId?: string, @Query('admin') admin?: string) {
    return this.songsService.findAll(userId, admin === 'true');
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get song details by ID' })
  findOne(@Param('id') id: string) {
    return this.songsService.findOne(id);
  }

  // ── User submission ────────────────────────────────────────────────────────

  @Post('submit')
  @ApiOperation({ summary: 'User submits a YouTube link — saved as PENDING until admin approves' })
  @ApiResponse({ status: 201, description: 'Song submitted for review.' })
  submit(@Body() dto: SubmitSongDto) {
    return this.songsService.submit(dto.youtubeUrl, dto.playlistId, dto.submittedById);
  }

  // ── Admin: add directly as PUBLISHED ──────────────────────────────────────

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Admin adds a song directly as PUBLISHED' })
  create(@Body() dto: CreateSongDto) {
    return this.songsService.create(dto);
  }

  // ── Approval workflow ──────────────────────────────────────────────────────

  @Patch(':id/approve')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Approve a pending song submission (Admin only)' })
  approve(@Param('id') id: string) {
    return this.songsService.approve(id);
  }

  @Patch(':id/reject')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Reject a pending song submission (Admin only)' })
  reject(@Param('id') id: string) {
    return this.songsService.reject(id);
  }

  @Patch(':id/play')
  @ApiOperation({ summary: 'Increment play count for a song' })
  incrementPlay(@Param('id') id: string) {
    return this.songsService.incrementPlay(id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Delete a song from the catalog' })
  remove(@Param('id') id: string) {
    return this.songsService.remove(id);
  }
}
