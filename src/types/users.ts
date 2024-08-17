
export type SignInRequest = {
    username: string;
    password: string;
  };
export type SignInResponse = Promise<{
    data: User;
    token: string;
}>;
export type SignUpRequest = {
    email: string;
    name: string;
    password: string;
    phone: string;
  };
export type SignUpResponse = Promise<{
    accessToken: string;
  }>;
export interface User {
    id: string;
    id_doctor: string;
    id_manager: string;
    name: string;
    age: number;
    address: string;
    gender: string;
    phone: string;
    password: string;
    role: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface UserDetail extends User{
    permission_id: number[];
    api_actions: string[];
}