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