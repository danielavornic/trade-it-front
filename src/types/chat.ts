export interface Message {
  id?: number;
  sender: {
    id: number;
    username: string;
    email: string;
  };
  text: string;
  timestamp: string;
}

export interface ChatRoom {
  id: number;
  user1: {
    id: number;
    username: string;
    email: string;
  };
  user2: {
    id: number;
    username: string;
    email: string;
  };
  lastMessage: Message;
  isRead: boolean;
  timestamp: string;
  messages: Message[];
}
