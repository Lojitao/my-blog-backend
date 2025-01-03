export const paths = {
  public: {
    login: {
      path: '/login',
      getHref: (redirectTo?: string | null | undefined) =>
        `/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    }
  },

  proteced: {
    root: {
      path: '/',
      getHref: () => '/',
    },
    dashboard: {
      path: 'dashboard',
      getHref: () => '/dashboard',
    },
  },
} as const;
