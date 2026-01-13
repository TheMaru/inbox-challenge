import type { MessageID } from '../types';

export const Pages = {
  LANDING_PAGE: '/',
  CREATION_PAGE: '/create',
  MESSAGE_PAGE: {
    path: '/messages/:id',
    url: (id: MessageID) => `/messages/${id}`,
  },
} as const;
