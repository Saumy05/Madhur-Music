import { Track } from '@/shared/player/usePlayerStore';

export interface Album {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  releaseYear: number;
  trackCount: number;
  genre: string;
}

export interface Artist {
  id: string;
  name: string;
  avatarUrl: string;
  bannerUrl: string;
  monthlyListeners: string;
  bio: string;
  isVerified: boolean;
}

export interface Podcast {
  id: string;
  title: string;
  host: string;
  coverUrl: string;
  category: string;
  episodesCount: number;
  description: string;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  podcastTitle: string;
  coverUrl: string;
  duration: string;
  publishedDate: string;
  description: string;
}

export interface MerchItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  badge?: string;
  isSoldOut?: boolean;
}

export interface Concert {
  id: string;
  artistName: string;
  venue: string;
  city: string;
  date: string;
  time: string;
  imageUrl: string;
  ticketPrice: string;
  status: 'UPCOMING' | 'SELLING_FAST' | 'SOLD_OUT';
}

export interface SocialActivity {
  id: string;
  userName: string;
  userAvatar: string;
  action: string;
  targetName: string;
  targetType: 'TRACK' | 'PLAYLIST' | 'CONCERT' | 'PODCAST';
  timeAgo: string;
}

export const MOCK_TRACKS: Track[] = [
  {
    id: 'tr-1',
    title: 'Midnight Echoes (Demo)',
    artist: 'Luna Ray',
    album: 'Studio Sessions',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
    duration: 134,
    durationFormatted: '2:14',
    isSnippet: true,
    genre: 'Indie Pop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: 'tr-2',
    title: 'Velvet Sky (Acoustic)',
    artist: 'Luna Ray',
    album: 'Studio Sessions',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80',
    duration: 105,
    durationFormatted: '1:45',
    isSnippet: true,
    genre: 'Indie Pop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: 'tr-3',
    title: 'The Last Chorus',
    artist: 'Luna Ray',
    album: 'Studio Sessions',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    duration: 182,
    durationFormatted: '3:02',
    isSnippet: true,
    genre: 'Indie Pop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
  {
    id: 'tr-4',
    title: 'Aura of Serenity',
    artist: 'Aarav Sharma',
    album: 'Resonance',
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format&fit=crop&q=80',
    duration: 245,
    durationFormatted: '4:05',
    genre: 'Ambient Jazz',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  },
  {
    id: 'tr-5',
    title: 'Electric Horizon',
    artist: 'Kavya & The Beat',
    album: 'Synthetica',
    coverUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&auto=format&fit=crop&q=80',
    duration: 210,
    durationFormatted: '3:30',
    genre: 'Synthwave',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  },
  {
    id: 'tr-6',
    title: 'Sufi Soul Beats',
    artist: 'Rohan Verma',
    album: 'Mystic Journeys',
    coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80',
    duration: 312,
    durationFormatted: '5:12',
    genre: 'World Fusion',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
  },
];

export const MOCK_ALBUMS: Album[] = [
  {
    id: 'alb-1',
    title: 'Studio Sessions & Unreleased Snippets',
    artist: 'Luna Ray',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
    releaseYear: 2026,
    trackCount: 12,
    genre: 'Indie Pop',
  },
  {
    id: 'alb-2',
    title: 'Resonance (Spatial Audio Edition)',
    artist: 'Aarav Sharma',
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format&fit=crop&q=80',
    releaseYear: 2025,
    trackCount: 10,
    genre: 'Ambient Jazz',
  },
  {
    id: 'alb-3',
    title: 'Neon Nights & Starlight Echoes',
    artist: 'Kavya & The Beat',
    coverUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&auto=format&fit=crop&q=80',
    releaseYear: 2026,
    trackCount: 14,
    genre: 'Synthwave',
  },
];

export const MOCK_ARTISTS: Artist[] = [
  {
    id: 'art-1',
    name: 'Luna Ray',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&auto=format&fit=crop&q=80',
    monthlyListeners: '4,892,104',
    bio: 'Indie singer-songwriter blending lush acoustic harmonies with ambient soundscapes and soulful storytelling.',
    isVerified: true,
  },
  {
    id: 'art-2',
    name: 'Aarav Sharma',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&auto=format&fit=crop&q=80',
    monthlyListeners: '2,140,900',
    bio: 'Pioneer of modern Indian jazz fusion and spatial sound experiences.',
    isVerified: true,
  },
];

export const MOCK_PODCASTS: Podcast[] = [
  {
    id: 'pod-1',
    title: 'The Melodic Mindset',
    host: 'Ananya Roy',
    coverUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&auto=format&fit=crop&q=80',
    category: 'Music Culture & Craft',
    episodesCount: 48,
    description: 'In-depth interviews with independent artists, sound engineers, and creative visionaries.',
  },
  {
    id: 'pod-2',
    title: 'Behind the Beat Studio',
    host: 'Dev & Siddharth',
    coverUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&auto=format&fit=crop&q=80',
    category: 'Audio Engineering',
    episodesCount: 32,
    description: 'Deconstructing global hit records and sound design techniques in Dolby Atmos.',
  },
];

export const MOCK_PODCAST_EPISODES: PodcastEpisode[] = [
  {
    id: 'ep-1',
    title: 'Ep. 48: How Luna Ray Crafts Unreleased Demos',
    podcastTitle: 'The Melodic Mindset',
    coverUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&auto=format&fit=crop&q=80',
    duration: '42:18',
    publishedDate: 'Yesterday',
    description: 'Luna Ray breaks down her songwriting workflow and shares exclusive snippet previews.',
  },
  {
    id: 'ep-2',
    title: 'Ep. 32: Spatial Audio vs Stereo Mixing',
    podcastTitle: 'Behind the Beat Studio',
    coverUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&auto=format&fit=crop&q=80',
    duration: '38:05',
    publishedDate: '3 days ago',
    description: 'Exploring the boundary-pushing world of 3D audio staging for modern listeners.',
  },
];

export const MOCK_MERCH: MerchItem[] = [
  {
    id: 'merch-1',
    title: 'Backstage Studio Hoodie',
    price: 75.0,
    imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80',
    badge: 'Sold Out',
    isSoldOut: true,
  },
  {
    id: 'merch-2',
    title: 'Lunar Echoes Vinyl (Pink Marble Press)',
    price: 42.0,
    imageUrl: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&auto=format&fit=crop&q=80',
    badge: 'Member Only',
  },
  {
    id: 'merch-3',
    title: 'Artist Essentials Studio Kit',
    price: 35.0,
    imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80',
  },
];

export const MOCK_CONCERTS: Concert[] = [
  {
    id: 'conc-1',
    artistName: 'Luna Ray Live in Mumbai',
    venue: 'NCPA Experimental Theatre',
    city: 'Mumbai',
    date: 'AUG 14, 2026',
    time: '8:00 PM',
    imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop&q=80',
    ticketPrice: '₹1,499 onwards',
    status: 'SELLING_FAST',
  },
  {
    id: 'conc-2',
    artistName: 'Aarav Sharma Fusion Night',
    venue: 'Kingdom of Dreams',
    city: 'Gurugram',
    date: 'SEP 02, 2026',
    time: '7:30 PM',
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format&fit=crop&q=80',
    ticketPrice: '₹1,999 onwards',
    status: 'UPCOMING',
  },
];

export const MOCK_SOCIAL_ACTIVITIES: SocialActivity[] = [
  {
    id: 'soc-1',
    userName: 'Rhea Patel',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    action: 'liked track snippet',
    targetName: 'Midnight Echoes (Demo)',
    targetType: 'TRACK',
    timeAgo: '12m ago',
  },
  {
    id: 'soc-2',
    userName: 'Vivan Kapoor',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    action: 'joined Live Jam Room',
    targetName: 'Late Night Chill & Lo-Fi',
    targetType: 'PLAYLIST',
    timeAgo: '45m ago',
  },
];
