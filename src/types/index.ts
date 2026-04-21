/* ─── Legacy types (preserved from existing app) ─── */
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  available: boolean;
  lastUpdated: string;
}

export interface User {
  email: string;
  isAdmin: boolean;
}

export interface AppState {
  products: Product[];
  user: User | null;
  view: 'public' | 'login' | 'dashboard';
}

/* ─── Positivus Auth types ─── */
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

/* ─── Project types ─── */
export type ProjectStatus = 'active' | 'completed' | 'paused';

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectInput {
  title: string;
  description: string;
  status: ProjectStatus;
}

/* ─── API types ─── */
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

/* ─── Contact form ─── */
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  subject: 'general' | 'services' | 'pricing' | 'other';
}
