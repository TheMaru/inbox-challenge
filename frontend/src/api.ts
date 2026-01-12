import type { Message, MessageID } from './types';

const API_BASE_URL = 'http://localhost:8080/api/messages';

export const api = {
  getAll: async (): Promise<Message[]> => {
    const res = await fetch(API_BASE_URL);

    return res.json();
  },

  getOne: async (id: MessageID): Promise<Message> => {
    const res = await fetch(`${API_BASE_URL}/${id}`);

    if (!res.ok) {
      throw new Error('Message not found');
    }

    return res.json();
  },

  create: async (message: Message): Promise<Message> => {
    const res = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    });

    if (!res.ok) {
      throw new Error('Failed to create message');
    }

    return res.json();
  },

  delete: async (id: MessageID): Promise<void> => {
    const res = await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });

    if (!res.ok) {
      throw new Error('Failed to delete');
    }
  },
};
