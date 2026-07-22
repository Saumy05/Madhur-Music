import React from 'react';
import { RouteObject, Navigate } from 'react-router';
import { LabelLoginPage } from '../auth/LabelLoginPage';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

import { LabelDashboardPage } from '../pages/LabelDashboardPage';
import { LabelArtistsPage } from '../pages/LabelArtistsPage';
import { LabelAlbumsCatalogPage } from '../pages/LabelAlbumsCatalogPage';
import { LabelContractsCopyrightPage } from '../pages/LabelContractsCopyrightPage';
import { LabelRoyaltiesRevenuePage } from '../pages/LabelRoyaltiesRevenuePage';
import { LabelSettingsPage } from '../pages/LabelSettingsPage';

export const labelPublicRoutes: RouteObject[] = [
  {
    path: 'label/login',
    element: <LabelLoginPage />,
  },
];

export const labelProtectedRoutes: RouteObject[] = [
  { index: true, element: <Navigate to="dashboard" replace /> },
  { path: 'dashboard', element: <ProtectedRoute allowedRoles={['MUSIC_LABEL']}><LabelDashboardPage /></ProtectedRoute> },
  { path: 'artists', element: <ProtectedRoute allowedRoles={['MUSIC_LABEL']}><LabelArtistsPage /></ProtectedRoute> },
  { path: 'albums', element: <ProtectedRoute allowedRoles={['MUSIC_LABEL']}><LabelAlbumsCatalogPage /></ProtectedRoute> },
  { path: 'catalog', element: <ProtectedRoute allowedRoles={['MUSIC_LABEL']}><LabelAlbumsCatalogPage /></ProtectedRoute> },
  { path: 'contracts', element: <ProtectedRoute allowedRoles={['MUSIC_LABEL']}><LabelContractsCopyrightPage /></ProtectedRoute> },
  { path: 'copyright', element: <ProtectedRoute allowedRoles={['MUSIC_LABEL']}><LabelContractsCopyrightPage /></ProtectedRoute> },
  { path: 'royalties', element: <ProtectedRoute allowedRoles={['MUSIC_LABEL']}><LabelRoyaltiesRevenuePage /></ProtectedRoute> },
  { path: 'revenue', element: <ProtectedRoute allowedRoles={['MUSIC_LABEL']}><LabelRoyaltiesRevenuePage /></ProtectedRoute> },
  { path: 'settings', element: <ProtectedRoute allowedRoles={['MUSIC_LABEL']}><LabelSettingsPage /></ProtectedRoute> },
];
