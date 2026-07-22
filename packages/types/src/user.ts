export type UserRole =
  | 'USER'
  | 'LISTENER'
  | 'ARTIST'
  | 'MUSIC_LABEL'
  | 'PODCAST_HOST'
  | 'EVENT_PROMOTER'
  | 'MODERATOR'
  | 'ADMIN'
  | 'ADMINISTRATOR';

export type SubscriptionPlan =
  | 'FREE'
  | 'BACKSTAGE_VIP'
  | 'STANDARD'
  | 'ARTIST_PRO'
  | 'PREMIUM'
  | 'ENTERPRISE'
  | 'BUSINESS'
  | 'INTERNAL';

export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  role: UserRole;
  subscriptionPlan?: SubscriptionPlan;
  isVip?: boolean;
  createdAt: string;
  updatedAt: string;
}

