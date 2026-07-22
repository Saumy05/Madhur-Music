import React from 'react';
import { RouteObject, Navigate } from 'react-router';
import { PodcastLoginPage } from '../auth/PodcastLoginPage';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

import { PodcastHostDashboardPage } from '../pages/PodcastHostDashboardPage';
import { PodcastEpisodesStudioPage } from '../pages/PodcastEpisodesStudioPage';
import { PodcastStudioPage } from '../pages/PodcastStudioPage';
import { PodcastAudienceSponsorsPage } from '../pages/PodcastAudienceSponsorsPage';
import { PodcastSettingsPage } from '../pages/PodcastSettingsPage';

export const podcastPublicRoutes: RouteObject[] = [
  {
    path: 'podcast/login',
    element: <PodcastLoginPage />,
  },
];

export const podcastProtectedRoutes: RouteObject[] = [
  { index: true, element: <Navigate to="dashboard" replace /> },
  { path: 'dashboard', element: <ProtectedRoute allowedRoles={['PODCAST_HOST']}><PodcastHostDashboardPage /></ProtectedRoute> },
  { path: 'episodes', element: <ProtectedRoute allowedRoles={['PODCAST_HOST']}><PodcastEpisodesStudioPage /></ProtectedRoute> },
  { path: 'upload-episode', element: <ProtectedRoute allowedRoles={['PODCAST_HOST']}><PodcastEpisodesStudioPage /></ProtectedRoute> },
  { path: 'series', element: <ProtectedRoute allowedRoles={['PODCAST_HOST']}><PodcastStudioPage /></ProtectedRoute> },
  { path: 'audience', element: <ProtectedRoute allowedRoles={['PODCAST_HOST']}><PodcastAudienceSponsorsPage /></ProtectedRoute> },
  { path: 'revenue', element: <ProtectedRoute allowedRoles={['PODCAST_HOST']}><PodcastAudienceSponsorsPage /></ProtectedRoute> },
  { path: 'sponsors', element: <ProtectedRoute allowedRoles={['PODCAST_HOST']}><PodcastAudienceSponsorsPage /></ProtectedRoute> },
  { path: 'settings', element: <ProtectedRoute allowedRoles={['PODCAST_HOST']}><PodcastSettingsPage /></ProtectedRoute> },
];
