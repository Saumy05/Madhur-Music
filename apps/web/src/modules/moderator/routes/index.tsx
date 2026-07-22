import React from 'react';
import { RouteObject, Navigate } from 'react-router';
import { ModeratorLoginPage } from '../auth/ModeratorLoginPage';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

import { ModeratorDashboardPage } from '../pages/ModeratorDashboardPage';
import { ModeratorContentReportsPage } from '../pages/ModeratorContentReportsPage';
import { ModeratorCopyrightClaimsPage } from '../pages/ModeratorCopyrightClaimsPage';
import { ModeratorVerificationsQueuePage } from '../pages/ModeratorVerificationsQueuePage';
import { ModeratorSettingsPage } from '../pages/ModeratorSettingsPage';

export const moderatorPublicRoutes: RouteObject[] = [
  {
    path: 'moderator/login',
    element: <ModeratorLoginPage />,
  },
];

export const moderatorProtectedRoutes: RouteObject[] = [
  { index: true, element: <Navigate to="dashboard" replace /> },
  { path: 'dashboard', element: <ProtectedRoute allowedRoles={['MODERATOR']}><ModeratorDashboardPage /></ProtectedRoute> },
  { path: 'reported-songs', element: <ProtectedRoute allowedRoles={['MODERATOR']}><ModeratorContentReportsPage /></ProtectedRoute> },
  { path: 'reported-podcasts', element: <ProtectedRoute allowedRoles={['MODERATOR']}><ModeratorContentReportsPage /></ProtectedRoute> },
  { path: 'copyright-claims', element: <ProtectedRoute allowedRoles={['MODERATOR']}><ModeratorCopyrightClaimsPage /></ProtectedRoute> },
  { path: 'artist-verification', element: <ProtectedRoute allowedRoles={['MODERATOR']}><ModeratorVerificationsQueuePage /></ProtectedRoute> },
  { path: 'user-reports', element: <ProtectedRoute allowedRoles={['MODERATOR']}><ModeratorContentReportsPage /></ProtectedRoute> },
  { path: 'settings', element: <ProtectedRoute allowedRoles={['MODERATOR']}><ModeratorSettingsPage /></ProtectedRoute> },
];
