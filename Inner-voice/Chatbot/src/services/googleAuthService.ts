import apiClient, { extractData, handleApiError, ApiResponse } from './api';
import { AuthResponse } from '../types/Auth';

/**
 * Google OAuth Authentication Service
 * Handles communication with backend for Google OAuth
 */
class GoogleAuthService {
  /**
   * Login with Google ID token (credential)
   * @param credential - Google ID token from OAuth response
   * @returns Promise with auth response containing user and tokens
   */
  async loginWithCredential(credential: string): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<ApiResponse<AuthResponse>>(
        '/auth/google/token',
        { credential }
      );

      const authData = extractData(response);
      return authData;
    } catch (error) {
      const errorMessage = handleApiError(error);
      console.error('Google credential login failed:', errorMessage);
      throw new Error(errorMessage);
    }
  }

  /**
   * Login with Google user info
   * Alternative method that sends user info directly
   * @param userInfo - Google user profile information
   * @returns Promise with auth response
   */
  async loginWithUserInfo(userInfo: any): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<ApiResponse<AuthResponse>>(
        '/auth/google/userinfo',
        { userInfo }
      );

      const authData = extractData(response);
      return authData;
    } catch (error) {
      const errorMessage = handleApiError(error);
      console.error('Google userinfo login failed:', errorMessage);
      throw new Error(errorMessage);
    }
  }

  /**
   * Initiate Google OAuth flow (redirect method)
   * Redirects to backend which then redirects to Google
   */
  initiateGoogleOAuth(): void {
    const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    window.location.href = `${backendUrl}/api/auth/google`;
  }

  /**
   * Handle Google OAuth callback
   * Extract tokens from URL params after Google redirects back
   * @returns Auth tokens or null if not present
   */
  handleGoogleCallback(): { accessToken: string; refreshToken: string } | null {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('token');
    const refreshToken = params.get('refresh');

    if (accessToken && refreshToken) {
      // Clear params from URL
      window.history.replaceState({}, document.title, window.location.pathname);

      return { accessToken, refreshToken };
    }

    return null;
  }
}

// Export singleton instance
export const googleAuthService = new GoogleAuthService();

// Export class for testing purposes
export default GoogleAuthService;
