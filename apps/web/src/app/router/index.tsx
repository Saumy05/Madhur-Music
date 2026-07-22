import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router';

// Layouts
import { PublicLayout } from '../layouts/PublicLayout';
import { ListenerLayout } from '../layouts/ListenerLayout';
import { ArtistLayout } from '../layouts/ArtistLayout';
import { AdminLayout } from '../layouts/AdminLayout';
import { ModeratorLayout } from '../layouts/ModeratorLayout';
import { PodcastLayout } from '../layouts/PodcastLayout';
import { PromoterLayout } from '../layouts/PromoterLayout';
import { LabelLayout } from '../layouts/LabelLayout';

// Auth Guards
import { ProtectedRoute } from '@/shared/components/auth/ProtectedRoute';
import { AdminProtectedRoute } from '@/shared/components/auth/AdminProtectedRoute';

// Module Route Exports
import { listenerPublicRoutes, listenerProtectedRoutes } from '../../modules/listener';
import { artistPublicRoutes, artistProtectedRoutes, artistStudioRoutes } from '../../modules/artist';
import { adminPublicRoutes, adminProtectedRoutes } from '../../modules/admin';
import { labelPublicRoutes, labelProtectedRoutes } from '../../modules/label';
import { podcastPublicRoutes, podcastProtectedRoutes } from '../../modules/podcast';
import { promoterPublicRoutes, promoterProtectedRoutes } from '../../modules/promoter';
import { moderatorPublicRoutes, moderatorProtectedRoutes } from '../../modules/moderator';

export const router = createBrowserRouter([
  // 1. PUBLIC ROUTES (PublicLayout)
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      ...listenerPublicRoutes,
      ...artistPublicRoutes,
      ...adminPublicRoutes,
      ...labelPublicRoutes,
      ...podcastPublicRoutes,
      ...promoterPublicRoutes,
      ...moderatorPublicRoutes,
    ],
  },

  // 2. PROTECTED ROUTES (Role Layouts)
  {
    path: '/listener',
    element: (
      <ProtectedRoute allowedRoles={['USER', 'LISTENER']}>
        <ListenerLayout />
      </ProtectedRoute>
    ),
    children: listenerProtectedRoutes,
  },
  {
    path: '/artist',
    element: (
      <ProtectedRoute allowedRoles={['ARTIST']}>
        <ArtistLayout />
      </ProtectedRoute>
    ),
    children: artistProtectedRoutes,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute allowedRoles={['ARTIST']}>
        <ArtistLayout />
      </ProtectedRoute>
    ),
    children: artistStudioRoutes,
  },
  {
    path: '/admin',
    element: (
      <AdminProtectedRoute>
        <AdminLayout />
      </AdminProtectedRoute>
    ),
    children: adminProtectedRoutes,
  },
  {
    path: '/label',
    element: (
      <ProtectedRoute allowedRoles={['MUSIC_LABEL']}>
        <LabelLayout />
      </ProtectedRoute>
    ),
    children: labelProtectedRoutes,
  },
  {
    path: '/podcast',
    element: (
      <ProtectedRoute allowedRoles={['PODCAST_HOST']}>
        <PodcastLayout />
      </ProtectedRoute>
    ),
    children: podcastProtectedRoutes,
  },
  {
    path: '/promoter',
    element: (
      <ProtectedRoute allowedRoles={['EVENT_PROMOTER']}>
        <PromoterLayout />
      </ProtectedRoute>
    ),
    children: promoterProtectedRoutes,
  },
  {
    path: '/moderator',
    element: (
      <ProtectedRoute allowedRoles={['MODERATOR']}>
        <ModeratorLayout />
      </ProtectedRoute>
    ),
    children: moderatorProtectedRoutes,
  },

  // Fallback Catch-All
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);
