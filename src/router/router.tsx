import { useMemo } from 'react';
import { RouterProvider,createBrowserRouter } from 'react-router-dom';

import { paths } from './path';
import { ProtectedRoute } from './protectedRoute';

import { AppRoot, AppRootErrorBoundary } from '../pages/root';

export const createAppRouter = () =>
  createBrowserRouter(
    [
      {
        path: paths.public.login.path,
        lazy: async () => {
          const {LoginRoute} = await import('../pages/login');
          console.log('LoginRoute:', LoginRoute); 
          return { Component: LoginRoute };
        },
      },
      {
        path: paths.proteced.root.path,
        element: (
          <ProtectedRoute>
            <AppRoot />
          </ProtectedRoute>
        ),
        ErrorBoundary: AppRootErrorBoundary,
        children: [
          {
            path: paths.proteced.dashboard.path,
            lazy: async () => {
              const { DashboardRoute } = await import('../pages/dashboard');
              return { Component: DashboardRoute};
            },
            ErrorBoundary: AppRootErrorBoundary,
          }, 
          {
            path: paths.proteced.blog.path,
            lazy: async () => {
              const { Blog } = await import('../pages/blog');
              return { Component: Blog};
            },
            ErrorBoundary: AppRootErrorBoundary,
          }, 
          {
            path: paths.proteced.editor.path,
            lazy: async () => {
              const { Editor } = await import('../pages/editor');
              return { Component: Editor};
            },
            ErrorBoundary: AppRootErrorBoundary,
          }, 
        ],
      },
      // {
      //   path: '*',
      //   lazy: async () => {
      //     const { NotFoundRoute } = await import('./routes/not-found');
      //     return {
      //       Component: NotFoundRoute,
      //     };
      //   },
      //   ErrorBoundary: AppRootErrorBoundary,
      // },
    ],
    { basename: '/admin' }
  );

export const AppRouter = () => {
  const router = useMemo(() => createAppRouter(), []);
  return <RouterProvider router={router} />;
};
