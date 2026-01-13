import type { MessageID } from '../types';

export const Pages = {
  LANDING_PAGE: '/',
  CREATION_PAGE: '/create',
  MESSAGE_PAGE: (id: MessageID) => `/messages/${id}`,
} as const;
