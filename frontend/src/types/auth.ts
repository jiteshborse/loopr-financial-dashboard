export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  location?: string;
  title?: string;
  lastLogin?: string;
}

export interface LoginResponse {
  message: string;
  user: AuthUser;
}