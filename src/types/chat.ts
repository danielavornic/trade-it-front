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
  targetUser: {
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
  targetUser: {
    id: number;
    username: string;
    email: string;
  };
  messages: Message[];
  isRead: boolean;
}
