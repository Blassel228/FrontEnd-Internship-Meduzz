export interface User{
    id: string,
    username: string,
    email: string
}

export interface UserSelfUpdateData {
  username: string;
  password: string;
}
