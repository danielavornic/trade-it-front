export interface User {
  id?: number;
  username: string;
  email: string;
  name?: string;
  surname?: string;
  nr_tel?: string;
}

export interface UserWithPassword extends User {
  password: string;
}

export interface UserWithId extends User {
  user_id: string;
}

// for admin
export interface Admin extends User {
  adminSince: Date;
}
