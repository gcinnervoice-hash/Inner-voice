/**
 * Emotion Service
 *
 * Frontend API service for emotion card operations.
 * Handles communication with the backend emotion endpoints.
 */

import apiClient, { extractData, handleApiError, ApiResponse } from './api';
import { EmotionCard, EmotionCardStats } from '../types/Emotion';
import { CharacterType } from '../types/Character';
import { PrimaryEmotion } from '../themes/emotion-themes';

/**
 * Analyze Conversation Request
 */
export interface AnalyzeConversationRequest {
  sessionId: string;
  characterUsed: CharacterType;
}

/**
 * Analyze Conversation Response
 */
export interface AnalyzeConversationResponse {
  card: EmotionCard;
  message: string;
  conversationDeleted: boolean;
}

/**
 * Get Emotion Cards Request (filters)
 */
export interface GetEmotionCardsFilters {
  startDate?: Date;
  endDate?: Date;
  emotion?: PrimaryEmotion;
  character?: CharacterType;
  tags?: string[];
  limit?: number;
  offset?: number;
}

/**
 * Get Emotion Cards Response
 */
export interface GetEmotionCardsResponse {
  cards: EmotionCard[];
  total: number;
  hasMore: boolean;
  stats?: EmotionCardStats;
}

/**
 * Emotion Service Class
 */
class EmotionService {
  /**
   * Analyze conversation and create emotion card
   *
   * Sends conversation to backend for OpenAI analysis.
   * Creates emotion card and deletes original conversation.
   *
   * @param sessionId - Chat session ID
   * @param characterUsed - Character used in conversation
   * @returns Promise<AnalyzeConversationResponse> - Created emotion card
   */
  async analyzeConversation(
    sessionId: string,
    characterUsed: CharacterType
  ): Promise<AnalyzeConversationResponse> {
    try {
      const requestData: AnalyzeConversationRequest = {
        sessionId,
        characterUsed
      };

      const response = await apiClient.post<ApiResponse<AnalyzeConversationResponse>>(
        '/emotion/analyze',
        requestData
      );

      return extractData(response);
    } catch (error) {
      const errorMessage = handleApiError(error);
      console.error('Failed to analyze conversation:', errorMessage);
      throw new Error(errorMessage);
    }
  }

  /**
   * Get emotion cards with optional filtering
   *
   * @param filters - Optional filters (date range, emotion, character, tags)
   * @returns Promise<GetEmotionCardsResponse> - Emotion cards with metadata
   */
  async getEmotionCards(
    filters?: GetEmotionCardsFilters
  ): Promise<GetEmotionCardsResponse> {
    try {
      // Build query string from filters
      const params = new URLSearchParams();

      if (filters?.startDate) {
        params.append('startDate', filters.startDate.toISOString());
      }
      if (filters?.endDate) {
        params.append('endDate', filters.endDate.toISOString());
      }
      if (filters?.emotion) {
        params.append('emotion', filters.emotion);
      }
      if (filters?.character) {
        params.append('character', filters.character);
      }
      if (filters?.tags && filters.tags.length > 0) {
        params.append('tags', filters.tags.join(','));
      }
      if (filters?.limit !== undefined) {
        params.append('limit', filters.limit.toString());
      }
      if (filters?.offset !== undefined) {
        params.append('offset', filters.offset.toString());
      }

      const queryString = params.toString();
      const url = queryString ? `/emotion/cards?${queryString}` : '/emotion/cards';

      const response = await apiClient.get<ApiResponse<GetEmotionCardsResponse>>(url);

      return extractData(response);
    } catch (error) {
      const errorMessage = handleApiError(error);
      console.error('Failed to get emotion cards:', errorMessage);
      throw new Error(errorMessage);
    }
  }

  /**
   * Get recent emotion cards
   *
   * @param limit - Number of recent cards to retrieve (default: 10)
   * @returns Promise<EmotionCard[]> - Recent emotion cards
   */
  async getRecentCards(limit: number = 10): Promise<EmotionCard[]> {
    try {
      const response = await apiClient.get<ApiResponse<{ cards: EmotionCard[] }>>(
        `/emotion/cards/recent?limit=${limit}`
      );

      const data = extractData(response);
      return data.cards;
    } catch (error) {
      const errorMessage = handleApiError(error);
      console.error('Failed to get recent emotion cards:', errorMessage);
      throw new Error(errorMessage);
    }
  }

  /**
   * Get a specific emotion card by ID
   *
   * @param cardId - Emotion card ID
   * @returns Promise<EmotionCard> - Emotion card
   */
  async getCardById(cardId: string): Promise<EmotionCard> {
    try {
      const response = await apiClient.get<ApiResponse<{ card: EmotionCard }>>(
        `/emotion/cards/${cardId}`
      );

      const data = extractData(response);
      return data.card;
    } catch (error) {
      const errorMessage = handleApiError(error);
      console.error('Failed to get emotion card:', errorMessage);
      throw new Error(errorMessage);
    }
  }

  /**
   * Get emotion card statistics
   *
   * @returns Promise<EmotionCardStats> - Comprehensive statistics
   */
  async getStats(): Promise<EmotionCardStats> {
    try {
      const response = await apiClient.get<ApiResponse<{ stats: EmotionCardStats }>>(
        '/emotion/stats'
      );

      const data = extractData(response);
      return data.stats;
    } catch (error) {
      const errorMessage = handleApiError(error);
      console.error('Failed to get emotion statistics:', errorMessage);
      throw new Error(errorMessage);
    }
  }

  /**
   * Delete a specific emotion card
   *
   * @param cardId - Emotion card ID to delete
   * @returns Promise<boolean> - True if deleted successfully
   */
  async deleteCard(cardId: string): Promise<boolean> {
    try {
      const response = await apiClient.delete<ApiResponse<{ deleted: boolean }>>(
        `/emotion/cards/${cardId}`
      );

      const data = extractData(response);
      return data.deleted;
    } catch (error) {
      const errorMessage = handleApiError(error);
      console.error('Failed to delete emotion card:', errorMessage);
      throw new Error(errorMessage);
    }
  }

  /**
   * Delete all emotion cards for the user
   *
   * DANGER: This permanently deletes all emotion cards.
   * Requires confirmation parameter.
   *
   * @returns Promise<number> - Number of cards deleted
   */
  async deleteAllCards(): Promise<number> {
    try {
      const response = await apiClient.delete<ApiResponse<{ deleted: boolean; count: number }>>(
        '/emotion/cards?confirm=true'
      );

      const data = extractData(response);
      return data.count;
    } catch (error) {
      const errorMessage = handleApiError(error);
      console.error('Failed to delete all emotion cards:', errorMessage);
      throw new Error(errorMessage);
    }
  }

  /**
   * Check if the emotion service is available
   *
   * @returns Promise<boolean> - True if service is healthy
   */
  async checkHealth(): Promise<boolean> {
    try {
      const response = await apiClient.get('/emotion/health');
      return response.status === 200;
    } catch (error) {
      console.error('Emotion service health check failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const emotionService = new EmotionService();

// Export class for testing purposes
export default EmotionService;
