import apiClient from './apiClient';

export interface AuthResponse {
  token: string | null;
  username: string;
  email: string;
  role: string;
  displayName: string;
  message: string | null;
}

export interface UserProfile {
  username: string;
  email: string;
  role: string;
  displayName: string;
}

export const authService = {
  async login(username: string, password: string): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>('/auth/login', { username, password });
    if (data.token) {
      localStorage.setItem('velocita_token', data.token);
      localStorage.setItem('velocita_user', JSON.stringify(data));
    }
    return data;
  },

  async register(username: string, email: string, password: string): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>('/auth/register', { username, email, password });
    if (data.token) {
      localStorage.setItem('velocita_token', data.token);
      localStorage.setItem('velocita_user', JSON.stringify(data));
    }
    return data;
  },

  async getMe(): Promise<AuthResponse> {
    const { data } = await apiClient.get<AuthResponse>('/auth/me');
    return data;
  },

  logout(): void {
    localStorage.removeItem('velocita_token');
    localStorage.removeItem('velocita_user');
    window.location.href = '/login';
  },

  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('velocita_token');
  },

  getStoredUser(): UserProfile | null {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem('velocita_user');
    if (stored) {
      try { return JSON.parse(stored); } catch { return null; }
    }
    return null;
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
