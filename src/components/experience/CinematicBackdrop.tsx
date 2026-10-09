import React from 'react';
import { BackdropTheme, StyleVariant, TransformationStage } from '../../types/store';

interface CinematicBackdropProps {
  theme: BackdropTheme;
  stage: TransformationStage;
  variant: StyleVariant;
  isTurboRunning?: boolean;
  reducedMotion: boolean;
}

export const CinematicBackdrop: React.FC<CinematicBackdropProps> = ({
  theme,
  stage,
  variant,
  isTurboRunning = false,
  reducedMotion,
}) => {
  const isOrdinary = stage === 'idle' || stage === 'preparing';
  const isActive = stage === 'transforming' || stage === 'reveal' || stage === 'details';

  const getThemeGradient = () => {
    if (isOrdinary) {
      return 'from-zinc-950 via-zinc-900 to-zinc-950';
    }
    switch (theme) {
      case 'neon-hero':
        return 'from-zinc-950 via-amber-950/75 to-zinc-950';
      case 'action-kinetic':
        return 'from-zinc-950 via-red-950/80 to-slate-950';
      case 'billionaire-gold':
        return 'from-zinc-950 via-yellow-950/75 to-stone-950';
      case 'music-equalizer':
        return 'from-zinc-950 via-violet-950/85 to-cyan-950/70';
      case 'glamour-runway':
        return 'from-zinc-950 via-rose-950/80 to-fuchsia-950/75';
      case 'celebrity-carpet':
        return 'from-zinc-950 via-red-950/85 to-amber-950/60';
      case 'mystery-noir':
        return 'from-slate-950 via-indigo-950/85 to-violet-950/75';
      case 'college-orbit':
        return 'from-zinc-950 via-amber-950/70 to-emerald-950/70';
    }
  };

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden bg-gradient-to-br transition-colors duration-700 ${getThemeGradient()}`}
      aria-hidden="true"
    >
      {/* Dynamic Radial Spotlight */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: isOrdinary ? 0.25 : 0.85,
          background: `radial-gradient(circle at 50% 45%, ${variant.accentHex}38 0%, ${variant.primaryColor}18 45%, transparent 75%)`,
        }}
      />

      {/* Perspective Stage Floor Grid */}
      <div
        className="absolute inset-x-0 bottom-0 h-44 opacity-25"
        style={{
          backgroundImage: `linear-gradient(to right, ${variant.accentHex}33 1px, transparent 1px), linear-gradient(to bottom, ${variant.accentHex}33 1px, transparent 1px)`,
          backgroundSize: '36px 24px',
          transform: 'perspective(360px) rotateX(62deg)',
          transformOrigin: 'bottom center',
        }}
      />

      {/* Theme-specific atmospheric layers when transforming/revealed */}
      {isActive && (
        <>
          {/* Speed Lines for Sunglasses (Hero Reveal) and Sneakers (Action Hero) */}
          {(theme === 'neon-hero' || theme === 'action-kinetic') && !reducedMotion && (
            <div className="absolute inset-0 overflow-hidden opacity-45">
              {[14, 26, 38, 52, 66, 78, 88].map((topPct, idx) => (
                <div
                  key={topPct}
                  className="animate-speed-line absolute h-0.5 rounded-full"
                  style={{
                    top: `${topPct}%`,
                    width: isTurboRunning ? '58%' : '38%',
                    backgroundColor: idx % 2 === 0 ? variant.accentHex : '#FFFFFF',
                    animationDuration: isTurboRunning ? '0.28s' : `${0.5 + idx * 0.07}s`,
                    animationDelay: `${idx * 0.08}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Billionaire Gold Executive Light Beams */}
          {theme === 'billionaire-gold' && (
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="absolute -top-24 left-1/4 w-36 h-[140%] rotate-12 opacity-20"
                style={{
                  background: 'linear-gradient(90deg, transparent, #FDE047, transparent)',
                }}
              />
              <div
                className="absolute -top-24 right-1/4 w-28 h-[140%] -rotate-12 opacity-20"
                style={{
                  background: 'linear-gradient(90deg, transparent, #F59E0B, transparent)',
                }}
              />
            </div>
          )}

          {/* CSS Equalizer Bars for Headphones Music Video Mode */}
          {theme === 'music-equalizer' && (
            <div className="absolute inset-x-8 bottom-6 h-40 flex items-end justify-center gap-1.5 opacity-40">
              {Array.from({ length: 24 }).map((_, i) => {
                const staticHeight = 25 + ((i * 19) % 65);
                return (
                  <div
                    key={i}
                    className={`w-2.5 sm:w-3 rounded-t-sm ${reducedMotion ? '' : 'animate-eq-bar'}`}
                    style={{
                      height: `${staticHeight}%`,
                      background: `linear-gradient(to top, ${variant.primaryColor}, ${variant.secondaryColor}, #22D3EE)`,
                      animationDelay: `${(i % 6) * 0.09}s`,
                      animationDuration: `${0.45 + (i % 4) * 0.1}s`,
                    }}
                  />
                );
              })}
            </div>
          )}

          {/* Glamour Mode Runway Shimmer */}
          {theme === 'glamour-runway' && (
            <div className="absolute inset-0">
              {[
                { left: '16%', top: '22%', size: 14 },
                { left: '82%', top: '26%', size: 18 },
                { left: '22%', top: '68%', size: 12 },
                { left: '78%', top: '64%', size: 16 },
                { left: '50%', top: '14%', size: 15 },
              ].map((star, idx) => (
                <svg
                  key={idx}
                  viewBox="0 0 24 24"
                  className="absolute text-pink-300 opacity-70"
                  style={{
                    left: star.left,
                    top: star.top,
                    width: star.size * 2,
                    height: star.size * 2,
                  }}
                >
                  <path
                    d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"
                    fill="currentColor"
                  />
                </svg>
              ))}
            </div>
          )}

          {/* Celebrity Red Carpet Spotlight & Gentle Camera Strobe */}
          {theme === 'celebrity-carpet' && (
            <div className="absolute inset-0">
              <div
                className="absolute inset-x-0 bottom-0 h-24 opacity-45"
                style={{
                  background: 'linear-gradient(to top, #991B1B, transparent)',
                }}
              />
              {!reducedMotion && (
                <>
                  <div
                    className="absolute top-12 left-16 w-32 h-32 rounded-full bg-white blur-2xl"
                    style={{ animation: 'cameraFlashPulse 2.2s infinite 0.2s' }}
                  />
                  <div
                    className="absolute top-20 right-16 w-36 h-36 rounded-full bg-amber-100 blur-2xl"
                    style={{ animation: 'cameraFlashPulse 2.6s infinite 1.1s' }}
                  />
                </>
              )}
            </div>
          )}

          {/* Perfume Mysterious Volumetric Mist */}
          {theme === 'mystery-noir' && (
            <div className="absolute inset-0 overflow-hidden">
              <div
                className={`absolute inset-x-6 bottom-8 h-48 rounded-full blur-2xl ${
                  reducedMotion ? 'opacity-45' : 'animate-mist-drift'
                }`}
                style={{
                  background: `radial-gradient(ellipse at center, ${variant.secondaryColor}55 0%, ${variant.primaryColor}33 55%, transparent 80%)`,
                }}
              />
              <div
                className={`absolute inset-x-16 top-1/3 h-40 rounded-full blur-2xl ${
                  reducedMotion ? 'opacity-35' : 'animate-mist-drift'
                }`}
                style={{
                  animationDelay: '1.1s',
                  background: 'radial-gradient(ellipse at center, rgba(168,85,247,0.35) 0%, transparent 75%)',
                }}
              />
            </div>
          )}

          {/* College Legend Orbital Rings */}
          {theme === 'college-orbit' && (
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <div
                className="w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-dashed border-amber-400/60"
                style={{ transform: 'rotateX(55deg) rotateZ(-15deg)' }}
              />
              <div
                className="absolute w-80 h-80 sm:w-[430px] sm:h-[430px] rounded-full border border-emerald-400/40"
                style={{ transform: 'rotateX(65deg) rotateZ(22deg)' }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
