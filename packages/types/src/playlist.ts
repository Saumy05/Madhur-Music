export interface Playlist {
  id: string;
  name: string;
  description?: string;
  coverImageUrl?: string;
  ownerId: string;
  isPublic: boolean;
  tracksCount: number;
  createdAt: string;
  updatedAt: string;
}
