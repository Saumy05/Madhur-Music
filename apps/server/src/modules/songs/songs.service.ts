import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { YoutubeService } from './youtube.service';
import { CreateSongDto } from './dto/create-song.dto';

@Injectable()
export class SongsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly youtube: YoutubeService,
  ) {}

  // ── Helpers ──────────────────────────────────────────────────────────────────

  private async upsertArtist(artistName: string, coverUrl?: string) {
    let artist = await this.prisma.artist.findFirst({
      where: { name: { equals: artistName, mode: 'insensitive' } },
    });
    if (!artist) {
      artist = await this.prisma.artist.create({
        data: {
          name: artistName,
          imageUrl: coverUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
        },
      });
    }
    return artist;
  }

  private async upsertAlbum(albumTitle: string, artistId: string, coverUrl?: string) {
    let album = await this.prisma.album.findFirst({
      where: { title: { equals: albumTitle, mode: 'insensitive' }, artistId },
    });
    if (!album) {
      album = await this.prisma.album.create({
        data: {
          title: albumTitle,
          coverUrl: coverUrl || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
          releaseYear: new Date().getFullYear(),
          artistId,
        },
      });
    }
    return album;
  }

  // ── Admin: create directly as PUBLISHED ───────────────────────────────────

  async create(dto: CreateSongDto) {
    const artist = await this.upsertArtist(dto.artistName, dto.coverUrl);
    const albumId = dto.albumTitle
      ? (await this.upsertAlbum(dto.albumTitle, artist.id, dto.coverUrl)).id
      : null;

    return this.prisma.song.create({
      data: {
        title: dto.title,
        durationSec: dto.durationSec,
        audioUrl: dto.audioUrl,
        coverUrl: dto.coverUrl || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
        explicit: dto.explicit ?? false,
        status: 'PUBLISHED',
        artistId: artist.id,
        albumId,
      },
      include: { artist: true, album: true },
    });
  }

  // ── User: submit YouTube link → PENDING ───────────────────────────────────

  async submit(youtubeUrl: string, playlistId: string | undefined, submittedById: string | undefined) {
    // Sanitise: only pass submittedById if it's a valid MongoDB ObjectId (24-char hex)
    const validObjectId = /^[0-9a-fA-F]{24}$/;
    const safeSubmitterId = submittedById && validObjectId.test(submittedById)
      ? submittedById
      : null;

    // 1. Fetch metadata from YouTube
    const meta = await this.youtube.getTrackInfo(youtubeUrl);

    // 2. Upsert artist
    const artist = await this.upsertArtist(meta.artist, meta.coverUrl);

    // 3. Create song as PENDING
    const song = await this.prisma.song.create({
      data: {
        title: meta.title,
        durationSec: meta.durationSec,
        audioUrl: meta.audioUrl,
        coverUrl: meta.coverUrl,
        explicit: false,
        status: 'PENDING',
        artistId: artist.id,
        submittedById: safeSubmitterId,
      },
      include: { artist: true },
    });

    // 4. Add to playlist immediately if provided
    if (playlistId) {
      const playlist = await this.prisma.playlist.findUnique({ where: { id: playlistId } });
      if (playlist) {
        await this.prisma.playlistSong.upsert({
          where: { playlistId_songId: { playlistId, songId: song.id } },
          create: { playlistId, songId: song.id },
          update: {},
        });
      }
    }

    // 5. Create admin notification
    const submitterName = safeSubmitterId
      ? (await this.prisma.user.findUnique({ where: { id: safeSubmitterId } }))?.displayName || 'A user'
      : 'A user';

    await this.prisma.notification.create({
      data: {
        type: 'SONG_SUBMISSION',
        title: 'New Song Submission',
        body: `"${song.title}" by ${song.artist.name} — submitted by ${submitterName}`,
        songId: song.id,
      },
    });

    return { song, message: 'Song submitted for review. It will appear to all users once an admin approves it.' };
  }

  // ── Catalog fetch — visibility rules ─────────────────────────────────────

  async findAll(userId?: string, isAdmin = false) {
    if (isAdmin) {
      // Admin sees everything
      return this.prisma.song.findMany({
        include: { artist: true, album: true, submittedBy: { select: { id: true, displayName: true, username: true } } },
        orderBy: { createdAt: 'desc' },
      });
    }

    // Regular users: PUBLISHED songs + their own PENDING/REJECTED submissions
    return this.prisma.song.findMany({
      where: {
        OR: [
          { status: 'PUBLISHED' },
          ...(userId ? [{ submittedById: userId, status: { in: ['PENDING', 'REJECTED'] as any } }] : []),
        ],
      },
      include: { artist: true, album: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findPending() {
    return this.prisma.song.findMany({
      where: { status: 'PENDING' },
      include: {
        artist: true,
        submittedBy: { select: { id: true, displayName: true, username: true, avatarUrl: true } },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async findOne(id: string) {
    const song = await this.prisma.song.findUnique({
      where: { id },
      include: { artist: true, album: true },
    });
    if (!song) throw new NotFoundException(`Song with ID "${id}" not found`);
    return song;
  }

  // ── Approval workflow ─────────────────────────────────────────────────────

  async approve(id: string) {
    await this.findOne(id);
    const song = await this.prisma.song.update({
      where: { id },
      data: { status: 'PUBLISHED' },
      include: { artist: true },
    });

    // Mark related notifications as read
    await this.prisma.notification.updateMany({
      where: { songId: id, read: false },
      data: { read: true },
    });

    return { song, message: 'Song approved and now visible to all users.' };
  }

  async reject(id: string) {
    await this.findOne(id);
    const song = await this.prisma.song.update({
      where: { id },
      data: { status: 'REJECTED' },
    });

    await this.prisma.notification.updateMany({
      where: { songId: id, read: false },
      data: { read: true },
    });

    return { song, message: 'Song rejected. Only the submitter can see it.' };
  }

  async incrementPlay(id: string) {
    return this.prisma.song.update({
      where: { id },
      data: { playsCount: { increment: 1 } },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.song.delete({ where: { id } });
  }
}
