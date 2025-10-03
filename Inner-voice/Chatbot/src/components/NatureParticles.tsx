import React, { useMemo } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface Particle {
  id: number;
  left: string;
  delay: string;
  duration: string;
  size: number;
  opacity: number;
}

// Generate random particles with varied properties
const generateParticles = (count: number, seed: number = 0): Particle[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + seed,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 10}s`,
    duration: `${15 + Math.random() * 15}s`, // 15-30s duration
    size: 0.5 + Math.random() * 1.5, // 0.5-2x size
    opacity: 0.3 + Math.random() * 0.5, // 0.3-0.8 opacity
  }));
};

export const NatureParticles: React.FC = () => {
  const { settings } = useTheme();

  // Generate particles once and memoize
  const particles = useMemo(() => {
    const isForest = settings.theme === 'forest';
    // Forest: more particles (leaves, pollen), Mountain: fewer (snow)
    const count = isForest ? 25 : 20;
    return generateParticles(count);
  }, [settings.theme]);

  const isForest = settings.theme === 'forest';

  if (isForest) {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
        {/* Falling Leaves Layer 1 - Large leaves */}
        {particles.slice(0, 8).map((particle) => (
          <div
            key={`leaf-large-${particle.id}`}
            className="absolute animate-float-leaf"
            style={{
              left: particle.left,
              top: '-10%',
              animationDelay: particle.delay,
              animationDuration: particle.duration,
              opacity: particle.opacity * 0.6,
            }}
          >
            <svg
              width={24 * particle.size}
              height={24 * particle.size}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
              }}
            >
              <path
                d="M17 8C15.5 5 12 3 9 4C6 5 4 8 5 11C6 14 9 15 11 15C11 15 11 18 9 20C9 20 12 21 15 19C18 17 19 14 18 11C17 8 14 7 12 8C10 9 9 11 10 13"
                fill="#10B981"
                opacity="0.7"
              />
              <path
                d="M9 4C9 4 11 8 11 15"
                stroke="#047857"
                strokeWidth="1"
                strokeLinecap="round"
                opacity="0.5"
              />
            </svg>
          </div>
        ))}

        {/* Falling Leaves Layer 2 - Medium leaves */}
        {particles.slice(8, 16).map((particle) => (
          <div
            key={`leaf-medium-${particle.id}`}
            className="absolute animate-float-leaf-slow"
            style={{
              left: particle.left,
              top: '-10%',
              animationDelay: particle.delay,
              animationDuration: `${parseFloat(particle.duration) * 1.2}s`,
              opacity: particle.opacity * 0.5,
            }}
          >
            <svg
              width={18 * particle.size}
              height={18 * particle.size}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C10 4 8 7 9 10C10 13 13 14 15 13C17 12 18 9 17 7C16 5 14 4 12 5"
                fill="#34D399"
                opacity="0.6"
              />
            </svg>
          </div>
        ))}

        {/* Fireflies - Glowing particles */}
        {particles.slice(16, 20).map((particle) => (
          <div
            key={`firefly-${particle.id}`}
            className="absolute animate-firefly-float"
            style={{
              left: particle.left,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: particle.delay,
              animationDuration: `${8 + Math.random() * 8}s`,
            }}
          >
            <div
              className="rounded-full animate-pulse-firefly"
              style={{
                width: `${4 * particle.size}px`,
                height: `${4 * particle.size}px`,
                background: 'radial-gradient(circle, rgba(251, 191, 36, 0.9) 0%, rgba(251, 191, 36, 0.3) 40%, transparent 70%)',
                boxShadow: `0 0 ${8 * particle.size}px rgba(251, 191, 36, 0.6)`,
                opacity: particle.opacity,
              }}
            />
          </div>
        ))}

        {/* Floating Pollen - Small particles */}
        {particles.slice(20).map((particle) => (
          <div
            key={`pollen-${particle.id}`}
            className="absolute animate-float-pollen"
            style={{
              left: particle.left,
              top: `${Math.random() * 100}%`,
              animationDelay: particle.delay,
              animationDuration: `${6 + Math.random() * 6}s`,
            }}
          >
            <div
              className="rounded-full"
              style={{
                width: `${2 * particle.size}px`,
                height: `${2 * particle.size}px`,
                background: 'rgba(209, 250, 229, 0.6)',
                boxShadow: '0 0 4px rgba(209, 250, 229, 0.4)',
                opacity: particle.opacity * 0.7,
              }}
            />
          </div>
        ))}
      </div>
    );
  } else {
    // Mountain theme - Snowfall
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
        {/* Large Snowflakes */}
        {particles.slice(0, 7).map((particle) => (
          <div
            key={`snow-large-${particle.id}`}
            className="absolute animate-snowfall"
            style={{
              left: particle.left,
              top: '-10%',
              animationDelay: particle.delay,
              animationDuration: particle.duration,
              opacity: particle.opacity * 0.8,
            }}
          >
            <svg
              width={16 * particle.size}
              height={16 * particle.size}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.5))',
              }}
            >
              <path
                d="M12 2L12 22M2 12L22 12M5 5L19 19M19 5L5 19"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.9"
              />
              <circle cx="12" cy="12" r="2" fill="white" opacity="0.8" />
            </svg>
          </div>
        ))}

        {/* Medium Snowflakes */}
        {particles.slice(7, 14).map((particle) => (
          <div
            key={`snow-medium-${particle.id}`}
            className="absolute animate-snowfall-slow"
            style={{
              left: particle.left,
              top: '-10%',
              animationDelay: particle.delay,
              animationDuration: `${parseFloat(particle.duration) * 1.3}s`,
              opacity: particle.opacity * 0.6,
            }}
          >
            <svg
              width={12 * particle.size}
              height={12 * particle.size}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L12 20M6 12L18 12M8 8L16 16M16 8L8 16"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.7"
              />
            </svg>
          </div>
        ))}

        {/* Small Snow Particles */}
        {particles.slice(14).map((particle) => (
          <div
            key={`snow-small-${particle.id}`}
            className="absolute animate-snowfall-drift"
            style={{
              left: particle.left,
              top: '-10%',
              animationDelay: particle.delay,
              animationDuration: `${parseFloat(particle.duration) * 0.8}s`,
            }}
          >
            <div
              className="rounded-full"
              style={{
                width: `${4 * particle.size}px`,
                height: `${4 * particle.size}px`,
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.4) 70%, transparent 100%)',
                boxShadow: '0 0 8px rgba(255, 255, 255, 0.6)',
                opacity: particle.opacity * 0.7,
              }}
            />
          </div>
        ))}

        {/* Mist Particles - Floating slowly */}
        {particles.slice(0, 5).map((particle) => (
          <div
            key={`mist-${particle.id}`}
            className="absolute animate-mist-drift"
            style={{
              left: particle.left,
              top: `${30 + Math.random() * 40}%`,
              animationDelay: particle.delay,
              animationDuration: `${20 + Math.random() * 15}s`,
            }}
          >
            <div
              className="rounded-full blur-xl"
              style={{
                width: `${40 * particle.size}px`,
                height: `${40 * particle.size}px`,
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
                opacity: particle.opacity * 0.4,
              }}
            />
          </div>
        ))}
      </div>
    );
  }
};
