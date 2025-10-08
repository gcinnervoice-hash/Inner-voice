import apiClient, { extractData, handleApiError, ApiResponse } from './api';
import {
  AuthResponse,
  RefreshTokenResponse,
  LoginData,
  RegistrationData,
  UserProfile
} from '../types/Auth';
import { googleAuthService } from './googleAuthService';

// Local storage keys
const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'user_profile';

// Auth Service class
class AuthService {
  /**
   * Register a new user
   * @param data - Registration data (email, username, password, etc.)
   * @returns Promise with auth response containing user and tokens
   */
  async register(data: RegistrationData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<ApiResponse<AuthResponse>>(
        '/auth/register',
        data
      );

      const authData = extractData(response);

      // Store tokens and user data
      this.storeAuthData(authData);

      return authData;
    } catch (error) {
      const errorMessage = handleApiError(error);
      console.error('Registration failed:', errorMessage);
      throw new Error(errorMessage);
    }
  }

  /**
   * Login user with email and password
   * @param email - User's email address
   * @param password - User's password
   * @returns Promise with auth response containing user and tokens
   */
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const loginData: LoginData = { email, password };

      const response = await apiClient.post<ApiResponse<AuthResponse>>(
        '/auth/login',
        loginData
      );

      const authData = extractData(response);

      // Store tokens and user data
      this.storeAuthData(authData);

      return authData;
    } catch (error) {
      const errorMessage = handleApiError(error);
      console.error('Login failed:', errorMessage);
      throw new Error(errorMessage);
    }
  }

  /**
   * Logout current user
   * Clears local storage and notifies backend
   */
  async logout(): Promise<void> {
    try {
      // Call backend logout endpoint
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Logout request failed:', error);
      // Continue with local logout even if backend fails
    } finally {
      // Clear local storage
      this.clearAuthData();
    }
  }

  /**
   * Refresh access token using refresh token
   * @returns Promise with new access token
   */
  async refreshAccessToken(): Promise<string> {
    try {
      const refreshToken = this.getRefreshToken();

      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await apiClient.post<ApiResponse<RefreshTokenResponse>>(
        '/auth/refresh',
        { refreshToken }
      );

      const tokenData = extractData(response);

      // Update stored access token
      localStorage.setItem(TOKEN_KEY, tokenData.accessToken);

      return tokenData.accessToken;
    } catch (error) {
      const errorMessage = handleApiError(error);
      console.error('Token refresh failed:', errorMessage);

      // Clear auth data if refresh fails (token expired)
      this.clearAuthData();

      throw new Error(errorMessage);
    }
  }

  /**
   * Get current user profile from backend
   * @returns Promise with user profile
   */
  async getCurrentUser(): Promise<UserProfile> {
    try {
      const response = await apiClient.get<ApiResponse<UserProfile>>('/auth/me');

      const userProfile = extractData(response);

      // Update stored user data
      localStorage.setItem(USER_KEY, JSON.stringify(userProfile));

      return userProfile;
    } catch (error) {
      const errorMessage = handleApiError(error);
      console.error('Failed to get current user:', errorMessage);
      throw new Error(errorMessage);
    }
  }

  /**
   * Login with Google credential (ID token)
   * @param credential - Google ID token
   * @returns Promise with auth response
   */
  async loginWithGoogle(credential: string): Promise<AuthResponse> {
    try {
      const authResponse = await googleAuthService.loginWithCredential(credential);

      // Store tokens and user data
      this.storeAuthData(authResponse);

      return authResponse;
    } catch (error) {
      const errorMessage = handleApiError(error);
      console.error('Google login failed:', errorMessage);
      throw new Error(errorMessage);
    }
  }

  /**
   * Login with Google user info
   * @param userInfo - Google user profile data
   * @returns Promise with auth response
   */
  async loginWithGoogleUserInfo(userInfo: any): Promise<AuthResponse> {
    try {
      const authResponse = await googleAuthService.loginWithUserInfo(userInfo);

      // Store tokens and user data
      this.storeAuthData(authResponse);

      return authResponse;
    } catch (error) {
      const errorMessage = handleApiError(error);
      console.error('Google userinfo login failed:', errorMessage);
      throw new Error(errorMessage);
    }
  }

  /**
   * Store authentication data in local storage
   * @param authData - Auth response from backend
   */
  storeAuthData(authData: AuthResponse): void {
    localStorage.setItem(TOKEN_KEY, authData.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, authData.refreshToken);
    localStorage.setItem(USER_KEY, JSON.stringify(authData.user));
  }

  /**
   * Clear all authentication data from local storage
   */
  clearAuthData(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  /**
   * Get stored access token
   * @returns Access token or null
   */
  getAccessToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  /**
   * Get stored refresh token
   * @returns Refresh token or null
   */
  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  /**
   * Get stored user profile
   * @returns User profile or null
   */
  getStoredUser(): UserProfile | null {
    const userJson = localStorage.getItem(USER_KEY);
    if (!userJson) return null;

    try {
      return JSON.parse(userJson);
    } catch (error) {
      console.error('Failed to parse stored user data:', error);
      return null;
    }
  }

  /**
   * Check if user is authenticated (has valid token)
   * @returns boolean indicating authentication status
   */
  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    return !!token;
  }

  /**
   * Validate email format
   * @param email - Email address to validate
   * @returns boolean indicating if email is valid
   */
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate password strength
   * @param password - Password to validate
   * @returns Object with validation result and message
   */
  validatePassword(password: string): { valid: boolean; message: string } {
    if (password.length < 3) {
      return {
        valid: false,
        message: 'Password must be at least 3 characters long',
      };
    }

    return { valid: true, message: '' };
  }

  /**
   * Validate username
   * @param username - Username to validate
   * @returns Object with validation result and message
   */
  validateUsername(username: string): { valid: boolean; message: string } {
    if (username.length < 1) {
      return {
        valid: false,
        message: 'Username is required',
      };
    }

    if (username.length > 100) {
      return {
        valid: false,
        message: 'Username must be less than 100 characters',
      };
    }

    return { valid: true, message: '' };
  }
}

// Export singleton instance
export const authService = new AuthService();

// Export class for testing purposes
export default AuthService;
