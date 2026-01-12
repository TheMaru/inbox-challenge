export type Message = {
  id?: number;
  subject: string;
  text: string;
  createdAt?: string;
};

export type MessageID = number | string;
