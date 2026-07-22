import React from 'react';
import { RouteObject, Navigate } from 'react-router';
import { AdminLoginPage } from '../auth/AdminLoginPage';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

import { AdminPanelPage } from '../pages/AdminPanelPage';
import { AdminUsersPage } from '../pages/AdminUsersPage';
import { AdminArtistsLabelsPage } from '../pages/AdminArtistsLabelsPage';
import { AdminSubscriptionsPaymentsPage } from '../pages/AdminSubscriptionsPaymentsPage';
import { AdminRolesPermissionsPage } from '../pages/AdminRolesPermissionsPage';
import { AdminAuditLogsSettingsPage } from '../pages/AdminAuditLogsSettingsPage';
import { AdminSettingsPage } from '../pages/AdminSettingsPage';
import { AdminSongsPage } from '../pages/AdminSongsPage';

export const adminPublicRoutes: RouteObject[] = [
  {
    path: 'admin/login',
    element: <AdminLoginPage />,
  },
];

export const adminProtectedRoutes: RouteObject[] = [
  { index: true, element: <Navigate to="dashboard" replace /> },
  { path: 'dashboard', element: <ProtectedRoute allowedRoles={['ADMIN', 'ADMINISTRATOR']}><AdminPanelPage /></ProtectedRoute> },
  { path: 'users', element: <ProtectedRoute allowedRoles={['ADMIN', 'ADMINISTRATOR']}><AdminUsersPage /></ProtectedRoute> },
  { path: 'songs', element: <ProtectedRoute allowedRoles={['ADMIN', 'ADMINISTRATOR']}><AdminSongsPage /></ProtectedRoute> },
  { path: 'artists', element: <ProtectedRoute allowedRoles={['ADMIN', 'ADMINISTRATOR']}><AdminArtistsLabelsPage /></ProtectedRoute> },
  { path: 'labels', element: <ProtectedRoute allowedRoles={['ADMIN', 'ADMINISTRATOR']}><AdminArtistsLabelsPage /></ProtectedRoute> },
  { path: 'subscriptions', element: <ProtectedRoute allowedRoles={['ADMIN', 'ADMINISTRATOR']}><AdminSubscriptionsPaymentsPage /></ProtectedRoute> },
  { path: 'revenue', element: <ProtectedRoute allowedRoles={['ADMIN', 'ADMINISTRATOR']}><AdminSubscriptionsPaymentsPage /></ProtectedRoute> },
  { path: 'roles', element: <ProtectedRoute allowedRoles={['ADMIN', 'ADMINISTRATOR']}><AdminRolesPermissionsPage /></ProtectedRoute> },
  { path: 'permissions', element: <ProtectedRoute allowedRoles={['ADMIN', 'ADMINISTRATOR']}><AdminRolesPermissionsPage /></ProtectedRoute> },
  { path: 'system-settings', element: <ProtectedRoute allowedRoles={['ADMIN', 'ADMINISTRATOR']}><AdminAuditLogsSettingsPage /></ProtectedRoute> },
  { path: 'audit-logs', element: <ProtectedRoute allowedRoles={['ADMIN', 'ADMINISTRATOR']}><AdminAuditLogsSettingsPage /></ProtectedRoute> },
  { path: 'settings', element: <ProtectedRoute allowedRoles={['ADMIN', 'ADMINISTRATOR']}><AdminSettingsPage /></ProtectedRoute> },
];
