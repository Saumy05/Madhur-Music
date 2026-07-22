export interface Track {
  id: string;
  title: string;
  durationSeconds: number;
  audioUrl: string;
  coverImageUrl?: string;
  artistId: string;
  albumId?: string;
  genre?: string;
  explicit: boolean;
  playsCount: number;
  likesCount: number;
  createdAt: string;
}
