import apiClient, { extractData, handleApiError, ApiResponse } from './api';
import { CharacterType, CharacterResponse, Character } from '../types/Character';

// Type definitions matching backend API responses
export interface ChatMessageRequest {
  message: string;
  characterId: CharacterType;
  sessionId?: string;
}

export interface ChatMessageResponse {
  response: CharacterResponse;
  characterId: CharacterType;
  response_time_ms: number;
  session_id: string;
}

export interface CharacterSwitchRequest {
  new_character: CharacterType;
  reset_conversation?: boolean;
}

export interface CharacterSwitchResponse {
  character: {
    id: CharacterType;
    name: string;
    chineseName: string;
    emoji: string;
  };
  introduction_message: CharacterResponse;
}

export interface CharacterInfo {
  id: CharacterType;
  name: string;
  chineseName: string;
  emoji: string;
  description: string;
  specialFeatures: string[];
}

export interface CharacterListResponse {
  characters: CharacterInfo[];
}

export interface EndSessionRequest {
  sessionId: string;
}

// Chat Service class
class ChatService {
  /**
   * Send a message to an AI character
   * @param characterId - The character to send the message to (sheep, rabbit, fox)
   * @param message - The user's message
   * @param sessionId - Optional session ID for tracking conversations
   * @returns Promise with character response and session info
   */
  async sendMessage(
    characterId: CharacterType,
    message: string,
    sessionId?: string
  ): Promise<ChatMessageResponse> {
    try {
      const requestData: ChatMessageRequest = {
        message: message.trim(),
        characterId,
        sessionId,
      };

      const response = await apiClient.post<ApiResponse<ChatMessageResponse>>(
        '/chat/message',
        requestData
      );

      return extractData(response);
    } catch (error) {
      const errorMessage = handleApiError(error);
      console.error('Failed to send message:', errorMessage);
      throw new Error(errorMessage);
    }
  }

  /**
   * Switch to a different AI character
   * @param newCharacter - The character to switch to (sheep, rabbit, fox)
   * @param resetConversation - Whether to reset the conversation history
   * @returns Promise with new character info and introduction message
   */
  async switchCharacter(
    newCharacter: CharacterType,
    resetConversation: boolean = true
  ): Promise<CharacterSwitchResponse> {
    try {
      const requestData: CharacterSwitchRequest = {
        new_character: newCharacter,
        reset_conversation: resetConversation,
      };

      const response = await apiClient.post<ApiResponse<CharacterSwitchResponse>>(
        '/chat/switch-character',
        requestData
      );

      return extractData(response);
    } catch (error) {
      const errorMessage = handleApiError(error);
      console.error('Failed to switch character:', errorMessage);
      throw new Error(errorMessage);
    }
  }

  /**
   * Get list of available AI characters
   * @returns Promise with array of character information
   */
  async getCharacters(): Promise<CharacterInfo[]> {
    try {
      const response = await apiClient.get<ApiResponse<CharacterListResponse>>(
        '/chat/characters'
      );

      const data = extractData(response);
      return data.characters;
    } catch (error) {
      const errorMessage = handleApiError(error);
      console.error('Failed to get characters:', errorMessage);
      throw new Error(errorMessage);
    }
  }

  /**
   * End the current chat session
   * @param sessionId - The session ID to end
   * @returns Promise that resolves when session is ended
   */
  async endSession(sessionId: string): Promise<void> {
    try {
      const requestData: EndSessionRequest = {
        sessionId,
      };

      await apiClient.post('/chat/end-session', requestData);
    } catch (error) {
      const errorMessage = handleApiError(error);
      console.error('Failed to end session:', errorMessage);
      // Don't throw error for session end failures - it's not critical
    }
  }

  /**
   * Check if the chat service is available
   * @returns Promise<boolean> indicating if the service is healthy
   */
  async checkHealth(): Promise<boolean> {
    try {
      const response = await apiClient.get('/health');
      return response.status === 200;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const chatService = new ChatService();

// Export class for testing purposes
export default ChatService;
