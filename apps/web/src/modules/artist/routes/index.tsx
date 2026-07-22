import React from 'react';
import { RouteObject, Navigate } from 'react-router';
import { ArtistLoginPage } from '../auth/ArtistLoginPage';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

import { ArtistProfilePage } from '../pages/ArtistProfilePage';
import { ArtistDashboardPage } from '../pages/ArtistDashboardPage';
import { ArtistMerchPage } from '../pages/ArtistMerchPage';
import { ArtistFinancesPage } from '../pages/ArtistFinancesPage';
import { ArtistMarketingPage } from '../pages/ArtistMarketingPage';
import { ArtistNewsroomPage } from '../pages/ArtistNewsroomPage';
import { CreatorStudioPage } from '../pages/CreatorStudioPage';
import { AudioStemsStudioPage } from '../pages/AudioStemsStudioPage';
import { ArtistUploadPage } from '../pages/ArtistUploadPage';
import { ArtistSinglesAlbumsPage } from '../pages/ArtistSinglesAlbumsPage';
import { ArtistFollowersPage } from '../pages/ArtistFollowersPage';
import { ArtistCommentsPage } from '../pages/ArtistCommentsPage';
import { ArtistVerificationPage } from '../pages/ArtistVerificationPage';
import { ArtistSettingsPage } from '../pages/ArtistSettingsPage';

export const artistPublicRoutes: RouteObject[] = [
  {
    path: 'artist/login',
    element: <ArtistLoginPage />,
  },
];

export const artistProtectedRoutes: RouteObject[] = [
  { index: true, element: <Navigate to="dashboard" replace /> },
  { path: 'dashboard', element: <ProtectedRoute allowedRoles={['ARTIST']}><ArtistDashboardPage /></ProtectedRoute> },
  { path: 'upload', element: <ProtectedRoute allowedRoles={['ARTIST']}><ArtistUploadPage /></ProtectedRoute> },
  { path: 'music', element: <ProtectedRoute allowedRoles={['ARTIST']}><ArtistSinglesAlbumsPage /></ProtectedRoute> },
  { path: 'albums', element: <ProtectedRoute allowedRoles={['ARTIST']}><ArtistSinglesAlbumsPage /></ProtectedRoute> },
  { path: 'singles', element: <ProtectedRoute allowedRoles={['ARTIST']}><ArtistSinglesAlbumsPage /></ProtectedRoute> },
  { path: 'analytics', element: <ProtectedRoute allowedRoles={['ARTIST']}><ArtistFinancesPage /></ProtectedRoute> },
  { path: 'audience', element: <ProtectedRoute allowedRoles={['ARTIST']}><ArtistFollowersPage /></ProtectedRoute> },
  { path: 'followers', element: <ProtectedRoute allowedRoles={['ARTIST']}><ArtistFollowersPage /></ProtectedRoute> },
  { path: 'revenue', element: <ProtectedRoute allowedRoles={['ARTIST']}><ArtistFinancesPage /></ProtectedRoute> },
  { path: 'royalties', element: <ProtectedRoute allowedRoles={['ARTIST']}><ArtistFinancesPage /></ProtectedRoute> },
  { path: 'marketing', element: <ProtectedRoute allowedRoles={['ARTIST']}><ArtistMarketingPage /></ProtectedRoute> },
  { path: 'fan-club', element: <ProtectedRoute allowedRoles={['ARTIST']}><ArtistDashboardPage /></ProtectedRoute> },
  { path: 'collaborators', element: <ProtectedRoute allowedRoles={['ARTIST']}><ArtistDashboardPage /></ProtectedRoute> },
  { path: 'comments', element: <ProtectedRoute allowedRoles={['ARTIST']}><ArtistCommentsPage /></ProtectedRoute> },
  { path: 'events', element: <ProtectedRoute allowedRoles={['ARTIST']}><ArtistDashboardPage /></ProtectedRoute> },
  { path: 'verification', element: <ProtectedRoute allowedRoles={['ARTIST']}><ArtistVerificationPage /></ProtectedRoute> },
  { path: 'profile', element: <ProtectedRoute allowedRoles={['ARTIST']}><ArtistProfilePage /></ProtectedRoute> },
  { path: 'settings', element: <ProtectedRoute allowedRoles={['ARTIST']}><ArtistSettingsPage /></ProtectedRoute> },
  { path: 'merch', element: <ProtectedRoute allowedRoles={['ARTIST']}><ArtistMerchPage /></ProtectedRoute> },
  { path: 'finances', element: <ProtectedRoute allowedRoles={['ARTIST']}><ArtistFinancesPage /></ProtectedRoute> },
  { path: 'newsroom', element: <ProtectedRoute allowedRoles={['ARTIST']}><ArtistNewsroomPage /></ProtectedRoute> },
];

export const artistStudioRoutes: RouteObject[] = [
  {
    path: 'creator-studio',
    children: [
      { index: true, element: <ProtectedRoute allowedRoles={['ARTIST']}><CreatorStudioPage /></ProtectedRoute> }
    ]
  },
  {
    path: 'audio-stems-studio',
    children: [
      { index: true, element: <ProtectedRoute allowedRoles={['ARTIST']}><AudioStemsStudioPage /></ProtectedRoute> }
    ]
  }
];
