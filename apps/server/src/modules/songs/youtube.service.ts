import { Injectable, BadRequestException } from '@nestjs/common';

export interface YoutubeTrackInfo {
  title: string;
  artist: string;
  durationSec: number;
  coverUrl: string;
  audioUrl: string;
  videoId: string;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function extractVideoId(url: string): string | null {
  try {
    const u = new URL(url);
    // youtu.be/<id>
    if (u.hostname === 'youtu.be') return u.pathname.slice(1).split('?')[0];
    // youtube.com/watch?v=<id>  or  /embed/<id>  or /v/<id>
    const v = u.searchParams.get('v');
    if (v) return v;
    const parts = u.pathname.split('/').filter(Boolean);
    const idx = parts.findIndex((p) => ['embed', 'v', 'shorts'].includes(p));
    if (idx !== -1) return parts[idx + 1];
  } catch {/* malformed URL */}
  return null;
}

/**
 * Extract `"lengthSeconds":"NNN"` from the embedded ytInitialData JSON that
 * YouTube bakes into every watch page. This is fragile but is a best-effort
 * fallback; we default to 0 if it fails.
 */
async function scrapeDuration(videoId: string): Promise<number> {
  try {
    const res = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });
    if (!res.ok) return 0;
    const html = await res.text();

    // Pattern 1 – ytInitialData "lengthSeconds":"NNN"
    const m1 = html.match(/"lengthSeconds"\s*:\s*"(\d+)"/);
    if (m1) return parseInt(m1[1], 10);

    // Pattern 2 – microformat approxDurationMs
    const m2 = html.match(/"approxDurationMs"\s*:\s*"(\d+)"/);
    if (m2) return Math.round(parseInt(m2[1], 10) / 1000);
  } catch {/* network / parse error */}
  return 0;
}

// ── Service ────────────────────────────────────────────────────────────────────

@Injectable()
export class YoutubeService {
  async getTrackInfo(url: string): Promise<YoutubeTrackInfo> {
    const videoId = extractVideoId(url);
    if (!videoId) {
      throw new BadRequestException('Invalid or unsupported YouTube URL');
    }

    // 1. Official oEmbed API — no key required, always works
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
    let title = 'Unknown Title';
    let artist = 'Unknown Artist';

    try {
      const oembedRes = await fetch(oembedUrl, {
        headers: { 'User-Agent': 'Madhur/1.0 (+https://madhur.com)' },
      });
      if (oembedRes.ok) {
        const data = await oembedRes.json() as {
          title?: string;
          author_name?: string;
        };
        title = data.title || title;
        artist = data.author_name || artist;
      }
    } catch {
      throw new BadRequestException('Could not reach YouTube. Check the URL and try again.');
    }

    // 2. Thumbnail — YouTube CDN, no auth needed
    // maxresdefault is best quality; hqdefault always exists as fallback
    const coverUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

    // 3. Duration via page scrape (best-effort, defaults to 0)
    const durationSec = await scrapeDuration(videoId);

    // 4. The audioUrl IS the YouTube URL — the player handles streaming
    const audioUrl = `https://www.youtube.com/watch?v=${videoId}`;

    return { title, artist, durationSec, coverUrl, audioUrl, videoId };
  }
}
