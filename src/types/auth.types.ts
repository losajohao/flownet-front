export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

export interface LoginCredentials {
  email: string;
  pwd: string;
}

export interface LoginResponse {
  user?: User;
  message?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

