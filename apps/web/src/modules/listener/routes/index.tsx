import React from 'react';
import { RouteObject, Navigate } from 'react-router';
import { ListenerLoginPage } from '../auth/ListenerLoginPage';

import { HomePage } from '../pages/music/HomePage';
import { ExplorePage } from '../pages/music/ExplorePage';
import { AdvancedExplorePage } from '../pages/music/AdvancedExplorePage';
import { GenrePage } from '../pages/music/GenrePage';
import { ChartsPage } from '../pages/music/ChartsPage';
import { SearchPage } from '../pages/music/SearchPage';
import { DjModePage } from '../pages/music/DjModePage';
import { AudioLabPage } from '../pages/music/AudioLabPage';
import { FocusModePage } from '../pages/music/FocusModePage';
import { RadioPage } from '../pages/music/RadioPage';
import { ArtistRadioPage } from '../pages/music/ArtistRadioPage';
import { MoodRadioPage } from '../pages/music/MoodRadioPage';
import { EqualizerPresetsPage } from '../pages/music/EqualizerPresetsPage';
import { SpatialCalibratorPage } from '../pages/music/SpatialCalibratorPage';
import { SongIdentifierPage } from '../pages/music/SongIdentifierPage';
import { AudioVisualizerPage } from '../pages/music/AudioVisualizerPage';
import { SubmitSongPage } from '../pages/music/SubmitSongPage';

import { PodcastsHubPage } from '../pages/podcasts/PodcastsHubPage';
import { PodcastPlayerPage } from '../pages/podcasts/PodcastPlayerPage';
import { PodcastSubscriptionsPage } from '../pages/podcasts/PodcastSubscriptionsPage';

import { SocialHubPage } from '../pages/social/SocialHubPage';
import { ActivityFeedPage } from '../pages/social/ActivityFeedPage';
import { FriendProfilePage } from '../pages/social/FriendProfilePage';
import { JamRoomPage } from '../pages/social/JamRoomPage';
import { GroupSessionPage } from '../pages/social/GroupSessionPage';
import { FanClubPage } from '../pages/social/FanClubPage';
import { FanLeaderboardPage } from '../pages/social/FanLeaderboardPage';
import { MusicTriviaPage } from '../pages/social/MusicTriviaPage';
import { BackstagePassPage } from '../pages/social/BackstagePassPage';
import { PartySyncPage } from '../pages/social/PartySyncPage';
import { VipRewardsPage } from '../pages/social/VipRewardsPage';

import { ConcertsHubPage } from '../pages/concerts/ConcertsHubPage';
import { ConcertMapPage } from '../pages/concerts/ConcertMapPage';
import { LiveEventPage } from '../pages/concerts/LiveEventPage';
import { MusicNearYouPage } from '../pages/concerts/MusicNearYouPage';

import { LibraryPage } from '../pages/library/LibraryPage';
import { PlaylistDetailPage } from '../pages/library/PlaylistDetailPage';
import { SmartPlaylistPage } from '../pages/library/SmartPlaylistPage';
import { AdvancedPlaylistEditorPage } from '../pages/library/AdvancedPlaylistEditorPage';
import { AlbumDetailPage } from '../pages/library/AlbumDetailPage';
import { MusicVideoPage } from '../pages/library/MusicVideoPage';
import { LyricsPage } from '../pages/library/LyricsPage';
import { LyricTranslatorPage } from '../pages/library/LyricTranslatorPage';
import { LyricsEditorPage } from '../pages/library/LyricsEditorPage';
import { DownloadsPage } from '../pages/library/DownloadsPage';
import { OfflineVaultPage } from '../pages/library/OfflineVaultPage';

import { SignupPage } from '../auth/SignupPage';
import { AuthPage } from '../pages/account/AuthPage';
import { OnboardingPage } from '../pages/account/OnboardingPage';
import { WelcomePage } from '../pages/account/WelcomePage';
import { SettingsPage } from '../pages/account/SettingsPage';
import { NotificationsPage } from '../pages/account/NotificationsPage';
import { DevicesPage } from '../pages/account/DevicesPage';
import { SleepTimerPage } from '../pages/account/SleepTimerPage';
import { SmartAlarmPage } from '../pages/account/SmartAlarmPage';
import { YourYearPage } from '../pages/account/YourYearPage';
import { ListeningInsightsPage } from '../pages/account/ListeningInsightsPage';
import { UserProfilePage } from '../pages/account/UserProfilePage';
import { UserPanelPage } from '../pages/account/UserPanelPage';
import { FamilySharingPage } from '../pages/account/FamilySharingPage';
import { DarkModeTogglePage } from '../pages/account/DarkModeTogglePage';
import { AudioCachePage } from '../pages/account/AudioCachePage';
import { PricingPage } from '../pages/account/PricingPage';
import { PremiumPage } from '../pages/account/PremiumPage';
import { CheckoutPage } from '../pages/account/CheckoutPage';
import { HelpSupportPage } from '../pages/account/HelpSupportPage';

import { LandingPage } from '../pages/corporate/LandingPage';
import { AppStorePreviewPage } from '../pages/corporate/AppStorePreviewPage';
import { StyleGuidePage } from '../pages/corporate/StyleGuidePage';

// Public routes rendered under PublicLayout
export const listenerPublicRoutes: RouteObject[] = [
  { index: true, element: <LandingPage /> },
  { path: 'signup', element: <SignupPage /> },
  { path: 'listener/login', element: <ListenerLoginPage /> },
  { path: 'login', element: <Navigate to="/listener/login" replace /> },
  { path: 'app-store-preview', element: <AppStorePreviewPage /> },
  { path: 'style-guide', element: <StyleGuidePage /> },
  { path: 'welcome', element: <WelcomePage /> },
];

// Protected routes rendered under ListenerLayout
export const listenerProtectedRoutes: RouteObject[] = [
  { index: true, element: <HomePage /> },
  { path: 'explore', element: <ExplorePage /> },
  { path: 'explore/advanced', element: <AdvancedExplorePage /> },
  { path: 'genre/:slug', element: <GenrePage /> },
  { path: 'charts', element: <ChartsPage /> },
  { path: 'search', element: <SearchPage /> },
  { path: 'dj-mode', element: <DjModePage /> },
  { path: 'audio-lab', element: <AudioLabPage /> },
  { path: 'focus-mode', element: <FocusModePage /> },
  { path: 'radio', element: <RadioPage /> },
  { path: 'radio/artist', element: <ArtistRadioPage /> },
  { path: 'radio/mood', element: <MoodRadioPage /> },
  { path: 'equalizer-presets', element: <EqualizerPresetsPage /> },
  { path: 'spatial-calibrator', element: <SpatialCalibratorPage /> },
  { path: 'song-identifier', element: <SongIdentifierPage /> },
  { path: 'audio-visualizer', element: <AudioVisualizerPage /> },
  { path: 'submit-song', element: <SubmitSongPage /> },

  { path: 'podcasts', element: <PodcastsHubPage /> },
  { path: 'podcasts/player/:id', element: <PodcastPlayerPage /> },
  { path: 'podcast-subscriptions', element: <PodcastSubscriptionsPage /> },

  { path: 'social', element: <SocialHubPage /> },
  { path: 'social/feed', element: <ActivityFeedPage /> },
  { path: 'social/friend/:id', element: <FriendProfilePage /> },
  { path: 'social/jam', element: <JamRoomPage /> },
  { path: 'social/group-session', element: <GroupSessionPage /> },
  { path: 'fan-club', element: <FanClubPage /> },
  { path: 'fan-club/leaderboard', element: <FanLeaderboardPage /> },
  { path: 'fan-club/trivia', element: <MusicTriviaPage /> },
  { path: 'backstage', element: <BackstagePassPage /> },
  { path: 'party-sync', element: <PartySyncPage /> },
  { path: 'vip-rewards', element: <VipRewardsPage /> },

  { path: 'concerts', element: <ConcertsHubPage /> },
  { path: 'concerts/map', element: <ConcertMapPage /> },
  { path: 'concerts/live/:id', element: <LiveEventPage /> },
  { path: 'music-near-you', element: <MusicNearYouPage /> },

  { path: 'library', element: <LibraryPage /> },
  { path: 'playlist/:id', element: <PlaylistDetailPage /> },
  { path: 'playlist/smart/:id', element: <SmartPlaylistPage /> },
  { path: 'playlist/advanced-editor/:id', element: <AdvancedPlaylistEditorPage /> },
  { path: 'album/:id', element: <AlbumDetailPage /> },
  { path: 'music-video/:id', element: <MusicVideoPage /> },
  { path: 'lyrics', element: <LyricsPage /> },
  { path: 'lyrics/translator', element: <LyricTranslatorPage /> },
  { path: 'lyrics-editor', element: <LyricsEditorPage /> },
  { path: 'downloads', element: <DownloadsPage /> },
  { path: 'offline-vault', element: <OfflineVaultPage /> },

  { path: 'user-profile', element: <UserProfilePage /> },
  { path: 'user-panel', element: <UserPanelPage /> },
  { path: 'auth', element: <AuthPage /> },
  { path: 'onboarding', element: <OnboardingPage /> },
  { path: 'settings', element: <SettingsPage /> },
  { path: 'notifications', element: <NotificationsPage /> },
  { path: 'devices', element: <DevicesPage /> },
  { path: 'family-sharing', element: <FamilySharingPage /> },
  { path: 'dark-mode-settings', element: <DarkModeTogglePage /> },
  { path: 'audio-cache', element: <AudioCachePage /> },
  { path: 'sleep-timer', element: <SleepTimerPage /> },
  { path: 'smart-alarm', element: <SmartAlarmPage /> },
  { path: 'your-year', element: <YourYearPage /> },
  { path: 'listening-insights', element: <ListeningInsightsPage /> },
  { path: 'pricing', element: <PricingPage /> },
  { path: 'premium', element: <PremiumPage /> },
  { path: 'checkout', element: <CheckoutPage /> },
  { path: 'help', element: <HelpSupportPage /> },
];
