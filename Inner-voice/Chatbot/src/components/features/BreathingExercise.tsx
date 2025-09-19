import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface BreathingExerciseProps {
  onComplete?: () => void;
  onClose?: () => void;
}

type BreathingPhase = 'inhale' | 'hold' | 'exhale' | 'pause';

export function BreathingExercise({ onComplete, onClose }: BreathingExerciseProps) {
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<BreathingPhase>('inhale');
  const [timeLeft, setTimeLeft] = useState(4);
  const [cycle, setCycle] = useState(0);
  const [totalCycles] = useState(5); // 5 breathing cycles

  // Breathing pattern: 4-4-4-4 (inhale-hold-exhale-pause)
  const phaseDurations = {
    inhale: 4,
    hold: 4,
    exhale: 4,
    pause: 2
  };

  const phaseInstructions = {
    inhale: 'Breathe in deeply...',
    hold: 'Hold your breath...',
    exhale: 'Breathe out slowly...',
    pause: 'Relax...'
  };

  const phaseColors = {
    inhale: 'bg-blue-500',
    hold: 'bg-purple-500',
    exhale: 'bg-green-500',
    pause: 'bg-gray-400'
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      // Move to next phase
      const phases: BreathingPhase[] = ['inhale', 'hold', 'exhale', 'pause'];
      const currentIndex = phases.indexOf(currentPhase);
      const nextPhase = phases[(currentIndex + 1) % phases.length];

      if (nextPhase === 'inhale' && currentPhase === 'pause') {
        // Completed a full cycle
        setCycle(prev => {
          const newCycle = prev + 1;
          if (newCycle >= totalCycles) {
            // Exercise complete
            setIsActive(false);
            onComplete?.();
            return newCycle;
          }
          return newCycle;
        });
      }

      setCurrentPhase(nextPhase);
      setTimeLeft(phaseDurations[nextPhase]);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, currentPhase, cycle, totalCycles, onComplete]);

  const handleStart = () => {
    setIsActive(true);
    setCurrentPhase('inhale');
    setTimeLeft(phaseDurations.inhale);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setCurrentPhase('inhale');
    setTimeLeft(phaseDurations.inhale);
    setCycle(0);
  };

  const progress = cycle >= totalCycles ? 100 : ((cycle + (1 - timeLeft / phaseDurations[currentPhase])) / totalCycles) * 100;
  const isComplete = cycle >= totalCycles;

  return (
    <div className="bg-white/95 rounded-xl p-6 shadow-lg border border-purple-200 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Breathing Exercise</h3>
          <p className="text-sm text-gray-600">Luna's Deep Relaxation Practice</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{cycle}/{totalCycles} cycles</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-purple-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Breathing Indicator */}
      <div className="text-center mb-6">
        <div className={`mx-auto w-32 h-32 rounded-full ${phaseColors[currentPhase]} flex items-center justify-center transition-all duration-1000 ${
          isActive ? 'animate-pulse' : ''
        }`}>
          <div className="text-white font-bold">
            <div className="text-2xl">{timeLeft}</div>
            <div className="text-sm">{phaseInstructions[currentPhase]}</div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center mb-6">
        {!isActive && !isComplete && (
          <p className="text-gray-600 text-sm mb-4">
            Follow the circle's rhythm and breathe deeply, letting tension slowly fade away.
          </p>
        )}
        {isComplete && (
          <div className="text-center">
            <p className="text-green-600 font-medium mb-2">🌟 Exercise Complete!</p>
            <p className="text-gray-600 text-sm">
              You did great! How do you feel? I hope you're feeling more peaceful now.
            </p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3">
        {!isComplete && (
          <>
            {!isActive ? (
              <button
                onClick={handleStart}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                <Play size={16} />
                Start
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                <Pause size={16} />
                Pause
              </button>
            )}
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <RotateCcw size={16} />
              Reset
            </button>
          </>
        )}
        {isComplete && (
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            <RotateCcw size={16} />
            Practice Again
          </button>
        )}
      </div>

      {/* Tips */}
      <div className="mt-4 p-3 bg-purple-50 rounded-lg">
        <p className="text-xs text-purple-700">
          💡 Tip: Practice works better in a quiet environment. Focus on the feeling of breathing and let other thoughts flow naturally.
        </p>
      </div>
    </div>
  );
}