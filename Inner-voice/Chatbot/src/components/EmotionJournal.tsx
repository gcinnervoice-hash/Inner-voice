/**
 * Emotion Journal Component
 *
 * Displays user's emotion cards in a beautiful, immersive way that matches
 * the project's nature-based aesthetic. Integrates with ConversationContext
 * to preserve chat state when navigating back.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, Sparkles, Trash2, BarChart3, Grid3x3, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { emotionService, GetEmotionCardsFilters } from '../services/emotionService';
import { EmotionCard as EmotionCardType, EmotionCardStats } from '../types/Emotion';
import { CompactEmotionCard, EmotionCardSkeleton, EmotionCardEmptyState } from './EmotionCard';
import { getEmotionTheme } from '../themes/emotion-themes';
import { useTheme } from '../contexts/ThemeContext';
import { useConversation } from '../App';
import * as Dialog from './ui/Dialog';

type ViewMode = 'grid' | 'calendar';

/**
 * Emotion Journal Component
 *
 * Features:
 * - Calendar and grid view modes
 * - Filtering by emotion, character, tags, date range
 * - Statistics panel with emotion trends
 * - Beautiful vintage postcard-style cards
 * - Preserves chat conversation when navigating back
 */
export const EmotionJournal: React.FC = () => {
  const navigate = useNavigate();
  const { settings } = useTheme();
  const { currentCharacter } = useConversation();

  // State
  const [cards, setCards] = useState<EmotionCardType[]>([]);
  const [stats, setStats] = useState<EmotionCardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statsError, setStatsError] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<EmotionCardType | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('calendar');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Filters
  const [filters, setFilters] = useState<GetEmotionCardsFilters>({
    limit: 50,
    offset: 0
  });

  // Load emotion cards when filters change
  useEffect(() => {
    loadCards();
  }, [filters]);

  // Load stats once on component mount (stats show overall patterns, not filtered data)
  useEffect(() => {
    loadStats();
  }, []);

  const loadCards = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await emotionService.getEmotionCards(filters);
      setCards(response.cards);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to load emotion cards';
      setError(errorMsg);
      console.error('Error loading cards:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      setIsLoadingStats(true);
      setStatsError(null);
      const statsData = await emotionService.getStats();

      // Ensure averageIntensity is a number
      if (statsData && typeof statsData.averageIntensity === 'string') {
        statsData.averageIntensity = parseFloat(statsData.averageIntensity);
      }

      setStats(statsData);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to load statistics';
      setStatsError(errorMsg);
      console.error('Error loading stats:', err);
    } finally {
      setIsLoadingStats(false);
    }
  };

  const handleCardClick = (card: EmotionCardType) => {
    setSelectedCard(card);
  };

  const handleDeleteAll = async () => {
    try {
      const count = await emotionService.deleteAllCards();
      setShowDeleteConfirm(false);
      setCards([]);
      setStats(null);
      alert(`Successfully deleted ${count} emotion card${count === 1 ? '' : 's'}`);
    } catch (err) {
      alert('Failed to delete emotion cards');
      console.error('Error deleting cards:', err);
    }
  };


  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleToday = () => {
    setCurrentMonth(new Date());
  };

  // Group cards by date for calendar view
  const cardsByDate = useMemo(() => {
    const grouped: { [key: string]: EmotionCardType[] } = {};
    cards.forEach(card => {
      const date = new Date(card.timestamp);
      const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(card);
    });
    return grouped;
  }, [cards]);

  const isForestTheme = settings.theme === 'forest';
  const headerClasses = isForestTheme
    ? 'from-emerald-900/95 to-emerald-800/90 text-white border-b border-emerald-700/50'
    : 'from-gray-100/95 to-gray-50/90 text-gray-900 border-b border-gray-200/50';

  const cardBgClasses = isForestTheme
    ? 'bg-emerald-950/70 border-emerald-700/50 text-white'
    : 'bg-white/70 border-gray-200/50 text-gray-900';

  const buttonClasses = isForestTheme
    ? 'bg-emerald-700 hover:bg-emerald-600 text-white border-emerald-600'
    : 'bg-purple-500 hover:bg-purple-600 text-white border-purple-400';

  const bgGradient = isForestTheme
    ? 'bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950'
    : 'bg-gradient-to-br from-gray-50 via-white to-gray-100';

  return (
    <div className={`min-h-screen ${bgGradient} backdrop-blur-sm`}>
      {/* Header */}
      <div className={`sticky top-0 z-40 bg-gradient-to-r ${headerClasses} shadow-lg backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate('/app')}
              className={`flex items-center gap-2 ${isForestTheme ? 'text-emerald-100 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors font-medium`}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to {currentCharacter.name}</span>
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('calendar')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'calendar'
                    ? isForestTheme ? 'bg-emerald-700 text-white' : 'bg-purple-500 text-white'
                    : isForestTheme ? 'text-emerald-100 hover:bg-emerald-800/50' : 'text-gray-600 hover:bg-gray-200/50'
                }`}
                title="Calendar view"
              >
                <Calendar className="w-5 h-5" />
              </button>

              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? isForestTheme ? 'bg-emerald-700 text-white' : 'bg-purple-500 text-white'
                    : isForestTheme ? 'text-emerald-100 hover:bg-emerald-800/50' : 'text-gray-600 hover:bg-gray-200/50'
                }`}
                title="Grid view"
              >
                <Grid3x3 className="w-5 h-5" />
              </button>

              <button
                onClick={() => setShowStats(!showStats)}
                className={`p-2 rounded-lg transition-colors ${
                  isForestTheme ? 'text-emerald-100 hover:bg-emerald-800/50' : 'text-gray-600 hover:bg-gray-200/50'
                }`}
                title="Toggle statistics"
              >
                <BarChart3 className="w-5 h-5" />
              </button>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded-lg transition-colors ${
                  isForestTheme ? 'text-emerald-100 hover:bg-emerald-800/50' : 'text-gray-600 hover:bg-gray-200/50'
                }`}
                title="Toggle filters"
              >
                <Tag className="w-5 h-5" />
              </button>

              {cards.length > 0 && (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className={`p-2 rounded-lg transition-colors ${
                    isForestTheme ? 'text-red-300 hover:bg-red-900/30' : 'text-red-600 hover:bg-red-100/70'
                  }`}
                  title="Delete all cards"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Title */}
          <div className="flex items-center gap-3">
            <Sparkles className={`w-8 h-8 ${isForestTheme ? 'text-emerald-300' : 'text-purple-500'}`} />
            <div>
              <h1 className="text-3xl font-bold">Your Emotion Journal</h1>
              <p className={`text-sm mt-1 ${isForestTheme ? 'text-emerald-200' : 'text-gray-600'}`}>
                {stats ? `${stats.totalCards} emotion card${stats.totalCards === 1 ? '' : 's'} saved` : 'Loading...'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Panel */}
        {showStats && (
          <div className={`mb-8 rounded-2xl overflow-hidden ${cardBgClasses} shadow-lg border-2 backdrop-blur-sm`}>
            {/* Stats Loading State */}
            {isLoadingStats && (
              <div className="p-6 flex items-center justify-center gap-3">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-emerald-400 to-purple-500 animate-pulse"></div>
                <p className={isForestTheme ? 'text-emerald-200' : 'text-gray-600'}>Loading statistics...</p>
              </div>
            )}

            {/* Stats Error State */}
            {statsError && !isLoadingStats && (
              <div className={`p-6 flex items-start gap-3 ${isForestTheme ? 'bg-red-900/20 border-t-2 border-red-700' : 'bg-red-50 border-t-2 border-red-200'}`}>
                <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isForestTheme ? 'text-red-300' : 'text-red-600'}`} />
                <div>
                  <p className={`font-semibold ${isForestTheme ? 'text-red-200' : 'text-red-800'}`}>
                    Couldn't load statistics
                  </p>
                  <p className={`text-sm mt-1 ${isForestTheme ? 'text-red-300' : 'text-red-700'}`}>
                    {statsError}
                  </p>
                  <button
                    onClick={loadStats}
                    className={`text-sm font-semibold mt-2 px-3 py-1 rounded transition-colors ${
                      isForestTheme
                        ? 'text-emerald-300 hover:bg-emerald-700/30'
                        : 'text-purple-600 hover:bg-purple-50'
                    }`}
                  >
                    Try again
                  </button>
                </div>
              </div>
            )}

            {/* Stats Content */}
            {stats && !isLoadingStats && !statsError && (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Total Cards */}
                  <div>
                    <div className={`text-sm font-medium ${isForestTheme ? 'text-emerald-300' : 'text-gray-600'} mb-2`}>
                      Total Cards
                    </div>
                    <div className={`text-4xl font-bold ${isForestTheme ? 'text-emerald-100' : 'text-purple-600'}`}>
                      {stats.totalCards}
                    </div>
                  </div>

                  {/* Average Intensity */}
                  <div>
                    <div className={`text-sm font-medium ${isForestTheme ? 'text-emerald-300' : 'text-gray-600'} mb-2`}>
                      Average Intensity
                    </div>
                    <div className={`text-4xl font-bold ${isForestTheme ? 'text-emerald-100' : 'text-purple-600'}`}>
                      {typeof stats.averageIntensity === 'number' ? stats.averageIntensity.toFixed(1) : '0.0'}/10
                    </div>
                    <div className={`text-xs mt-1 ${isForestTheme ? 'text-emerald-400' : 'text-purple-500'}`}>
                      {stats.totalCards > 0 && stats.averageIntensity > 6 ? '⚠️ Higher intensity' : '✨ Steady'}
                    </div>
                  </div>

                  {/* Most Common Tag */}
                  <div>
                    <div className={`text-sm font-medium ${isForestTheme ? 'text-emerald-300' : 'text-gray-600'} mb-2`}>
                      Top Tag
                    </div>
                    <div className={`text-2xl font-bold ${isForestTheme ? 'text-emerald-100' : 'text-purple-600'}`}>
                      {stats.mostCommonTags && stats.mostCommonTags.length > 0 ? stats.mostCommonTags[0].tag : 'N/A'}
                    </div>
                    {stats.mostCommonTags && stats.mostCommonTags[0] && (
                      <div className={`text-xs mt-1 ${isForestTheme ? 'text-emerald-400' : 'text-purple-500'}`}>
                        {stats.mostCommonTags[0].count}x mentioned
                      </div>
                    )}
                  </div>

                  {/* Emotion Breakdown */}
                  <div>
                    <div className={`text-sm font-medium ${isForestTheme ? 'text-emerald-300' : 'text-gray-600'} mb-2`}>
                      Breakdown
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className={`text-sm ${isForestTheme ? 'text-emerald-200' : 'text-gray-700'}`}>
                          Positive: {stats.categoryBreakdown?.positive || 0}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <span className={`text-sm ${isForestTheme ? 'text-emerald-200' : 'text-gray-700'}`}>
                          Negative: {stats.categoryBreakdown?.negative || 0}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                        <span className={`text-sm ${isForestTheme ? 'text-emerald-200' : 'text-gray-700'}`}>
                          Mixed: {stats.categoryBreakdown?.mixed || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Empty Stats State */}
            {stats && stats.totalCards === 0 && !isLoadingStats && !statsError && (
              <div className={`p-6 text-center ${isForestTheme ? 'border-t-2 border-emerald-700' : 'border-t-2 border-gray-200'}`}>
                <p className={isForestTheme ? 'text-emerald-200' : 'text-gray-600'}>
                  No emotion cards yet. Start chatting to generate your first card!
                </p>
              </div>
            )}
          </div>
        )}

        {/* Filters Panel */}
        {showFilters && (
          <div className={`mb-8 ${cardBgClasses} rounded-2xl p-6 shadow-lg border-2 backdrop-blur-sm`}>
            <h3 className="text-lg font-bold mb-4">Filter Emotion Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Emotion filter placeholder - can be expanded */}
              <div>
                <label className={`block text-sm font-semibold ${isForestTheme ? 'text-emerald-100' : 'text-gray-700'} mb-2`}>
                  Emotion Type
                </label>
                <select className={`w-full px-4 py-2 rounded-xl border-2 ${
                  isForestTheme
                    ? 'border-emerald-700 bg-emerald-900/50 text-white focus:border-emerald-500'
                    : 'border-gray-200 bg-white text-gray-900 focus:border-purple-400'
                } focus:outline-none transition-colors`}>
                  <option>All Emotions</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setFilters({ limit: 50, offset: 0 });
                    setShowFilters(false);
                  }}
                  className={`w-full px-4 py-2 rounded-xl font-semibold transition-colors ${isForestTheme ? 'bg-emerald-700 hover:bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className={`mb-8 ${isForestTheme ? 'bg-red-900/30 border-red-700/50 text-red-200' : 'bg-red-50 border-red-200 text-red-800'} border-2 rounded-2xl p-6 flex items-start gap-3`}>
            <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="block mb-1">Error loading emotion cards</strong>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <EmotionCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && cards.length === 0 && !error && (
          <EmotionCardEmptyState
            onCreateFirst={() => navigate('/app')}
          />
        )}

        {/* Calendar View */}
        {!isLoading && cards.length > 0 && viewMode === 'calendar' && (
          <>
            {/* Month Navigation */}
            <div className={`mb-6 flex items-center justify-between ${cardBgClasses} rounded-2xl p-4 shadow-lg border-2 backdrop-blur-sm`}>
              <button
                onClick={handlePreviousMonth}
                className={`p-2 rounded-lg transition-colors ${
                  isForestTheme ? 'hover:bg-emerald-700/50 text-emerald-300' : 'hover:bg-gray-200/50 text-gray-600'
                }`}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="text-center flex-1">
                <h2 className="text-2xl font-bold">
                  {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleToday}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    isForestTheme
                      ? 'bg-emerald-700 hover:bg-emerald-600 text-white'
                      : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                  }`}
                >
                  Today
                </button>
                <button
                  onClick={handleNextMonth}
                  className={`p-2 rounded-lg transition-colors ${
                    isForestTheme ? 'hover:bg-emerald-700/50 text-emerald-300' : 'hover:bg-gray-200/50 text-gray-600'
                  }`}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className={`${cardBgClasses} rounded-2xl p-6 shadow-lg border-2 backdrop-blur-sm`}>
              {/* Day headers */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className={`text-center font-bold py-2 ${isForestTheme ? 'text-emerald-300' : 'text-gray-700'}`}>
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar days */}
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: getFirstDayOfMonth(currentMonth) }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}
                {Array.from({ length: getDaysInMonth(currentMonth) }).map((_, dayIndex) => {
                  const day = dayIndex + 1;
                  const dateKey = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  const dayCards = cardsByDate[dateKey] || [];
                  const isToday = new Date().toDateString() === new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toDateString();

                  return (
                    <div
                      key={day}
                      className={`aspect-square border-2 rounded-xl p-2 transition-all duration-200 ${
                        isToday
                          ? isForestTheme ? 'border-emerald-500 bg-emerald-700/30' : 'border-purple-500 bg-purple-50'
                          : isForestTheme ? 'border-emerald-700/50 hover:border-emerald-600 hover:shadow-md hover:bg-emerald-800/20' : 'border-gray-200 hover:border-purple-300 hover:shadow-md hover:bg-gray-100/50'
                      }`}
                    >
                      <div className={`text-sm font-semibold mb-1 ${isToday ? (isForestTheme ? 'text-emerald-100' : 'text-purple-700') : (isForestTheme ? 'text-emerald-300' : 'text-gray-700')}`}>
                        {day}
                      </div>
                      {dayCards.length > 0 && (
                        <div className="space-y-1">
                          {dayCards.slice(0, 3).map(card => {
                            const theme = getEmotionTheme(card.primaryEmotion);
                            return (
                              <div
                                key={card.id}
                                onClick={() => handleCardClick(card)}
                                className="text-xs px-1 py-0.5 rounded cursor-pointer hover:opacity-80 transition-opacity truncate"
                                style={{ backgroundColor: theme.color, color: '#fff' }}
                                title={theme.displayName}
                              >
                                {theme.emoji}
                              </div>
                            );
                          })}
                          {dayCards.length > 3 && (
                            <div className={`text-xs font-semibold px-1 ${isForestTheme ? 'text-emerald-300' : 'text-purple-600'}`}>
                              +{dayCards.length - 3}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* Grid View */}
        {!isLoading && cards.length > 0 && viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => (
              <CompactEmotionCard
                key={card.id}
                card={card}
                onClick={() => handleCardClick(card)}
                compact={true}
              />
            ))}
          </div>
        )}
      </div>

      {/* Card Detail Dialog */}
      {selectedCard && (
        <Dialog.Root open={!!selectedCard} onOpenChange={() => setSelectedCard(null)}>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content className="max-w-2xl">
              <Dialog.Title>Emotion Card</Dialog.Title>
              <div className="mt-4">
                <CompactEmotionCard
                  card={selectedCard}
                  compact={false}
                  showFullTimestamp={true}
                />
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedCard(null)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-colors ${buttonClasses}`}
                >
                  Close
                </button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}

      {/* Delete All Confirmation Dialog */}
      {showDeleteConfirm && (
        <Dialog.Root open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content>
              <Dialog.Title>Delete All Emotion Cards?</Dialog.Title>
              <div className="mt-4">
                <div className={`${isForestTheme ? 'bg-red-900/30 border-red-700/50 text-red-200' : 'bg-red-50 border-red-200 text-red-900'} border-2 rounded-xl p-4`}>
                  <p className="font-semibold mb-2">
                    ⚠️ This action cannot be undone!
                  </p>
                  <p className="text-sm">
                    All {stats?.totalCards || 0} emotion cards will be permanently deleted from your journal.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-colors ${
                    isForestTheme
                      ? 'bg-emerald-900/50 text-emerald-100 hover:bg-emerald-800/50 border border-emerald-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAll}
                  className="flex-1 px-6 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors"
                >
                  Yes, Delete All
                </button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </div>
  );
};

export default EmotionJournal;
