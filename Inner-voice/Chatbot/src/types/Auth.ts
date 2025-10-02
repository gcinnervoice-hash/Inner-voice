import { CharacterType } from './Character';

// User profile type
export interface UserProfile {
  id: string;
  username: string;
  email: string;
  preferred_character?: CharacterType;
  is_premium: boolean;
  theme_preference?: string;
  created_at: Date;
  last_active: Date;
}

// Registration data
export interface RegistrationData {
  email: string;
  username: string;
  password: string;
  preferred_character?: CharacterType;
  theme_preference?: string;
}

// Login data
export interface LoginData {
  email: string;
  password: string;
}

// Auth response from backend
export interface AuthResponse {
  user: UserProfile;
  accessToken: string;
  refreshToken: string;
  expires_in: number;
}

// Token refresh response
export interface RefreshTokenResponse {
  accessToken: string;
  expires_in: number;
}

// Auth context state
export interface AuthState {
  user: UserProfile | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Auth context actions
export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegistrationData) => Promise<void>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
  clearError: () => void;
}
