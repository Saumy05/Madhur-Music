import React from 'react';
import { RouteObject, Navigate } from 'react-router';
import { PromoterLoginPage } from '../auth/PromoterLoginPage';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

import { PromoterDashboardPage } from '../pages/PromoterDashboardPage';
import { PromoterVenuesTicketsPage } from '../pages/PromoterVenuesTicketsPage';
import { PromoterCampaignsSponsorsPage } from '../pages/PromoterCampaignsSponsorsPage';
import { PromoterSettingsPage } from '../pages/PromoterSettingsPage';

export const promoterPublicRoutes: RouteObject[] = [
  {
    path: 'promoter/login',
    element: <PromoterLoginPage />,
  },
];

export const promoterProtectedRoutes: RouteObject[] = [
  { index: true, element: <Navigate to="dashboard" replace /> },
  { path: 'dashboard', element: <ProtectedRoute allowedRoles={['EVENT_PROMOTER']}><PromoterDashboardPage /></ProtectedRoute> },
  { path: 'events', element: <ProtectedRoute allowedRoles={['EVENT_PROMOTER']}><PromoterDashboardPage /></ProtectedRoute> },
  { path: 'venues', element: <ProtectedRoute allowedRoles={['EVENT_PROMOTER']}><PromoterVenuesTicketsPage /></ProtectedRoute> },
  { path: 'artists', element: <ProtectedRoute allowedRoles={['EVENT_PROMOTER']}><PromoterVenuesTicketsPage /></ProtectedRoute> },
  { path: 'tickets', element: <ProtectedRoute allowedRoles={['EVENT_PROMOTER']}><PromoterVenuesTicketsPage /></ProtectedRoute> },
  { path: 'campaigns', element: <ProtectedRoute allowedRoles={['EVENT_PROMOTER']}><PromoterCampaignsSponsorsPage /></ProtectedRoute> },
  { path: 'sponsors', element: <ProtectedRoute allowedRoles={['EVENT_PROMOTER']}><PromoterCampaignsSponsorsPage /></ProtectedRoute> },
  { path: 'settings', element: <ProtectedRoute allowedRoles={['EVENT_PROMOTER']}><PromoterSettingsPage /></ProtectedRoute> },
];
