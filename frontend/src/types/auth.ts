export interface AuthUser {
  id: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  message: string;
  user: AuthUser;
}