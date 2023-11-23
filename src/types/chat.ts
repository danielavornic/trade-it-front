export interface Message {
  id?: number;
  sender: {
    id: number;
    username: string;
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
    name: string;
    surname: string;
  };
  user2: {
    id: number;
    username: string;
    email: string;
    name: string;
    surname: string;
  };
  isRead: boolean;
  messages: Message[];
}

export interface ChatRoomListItem {
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
}
