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
    blog: {
      path: 'blog',
      getHref: () => '/blog',
    },
    editor: {
      path: 'editor/:id?', // 這裡使用 :id?，表示 id 是可選的
      getHref: (id?: string) => (id ? `/editor/${id}` : '/editor'),
    },
  },
} as const;
