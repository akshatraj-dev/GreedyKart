import React from 'react';
import { motion } from 'motion/react';
import { Product, StyleVariant, TransformationStage } from '../../types/store';
import { CharacterIllustration } from './CharacterIllustration';
import { ProductStage } from './ProductStage';

interface TransformationSequenceProps {
  product: Product;
  stage: TransformationStage;
  variant: StyleVariant;
  isTurboRunning?: boolean;
  reducedMotion: boolean;
}

export const TransformationSequence: React.FC<TransformationSequenceProps> = ({
  product,
  stage,
  variant,
  isTurboRunning = false,
  reducedMotion,
}) => {
  const isOrdinary = stage === 'idle' || stage === 'preparing';
  const isTransforming = stage === 'transforming';
  const isRevealed = stage === 'reveal' || stage === 'details';

  const transitionSpec = reducedMotion
    ? { duration: 0.15 }
    : { duration: 0.75, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

  // Synchronized motion keyframes applied to the Real Studio Photo so it performs the same animation as the SVG stage
  const getPhotoMotionAnimate = () => {
    if (reducedMotion) {
      return { scale: 1, rotate: 0, y: 0 };
    }
    if (isOrdinary) {
      return {
        scale: 1.04,
        rotate: -2,
        y: [0, -8, 0],
      };
    }
    if (isTransforming) {
      switch (product.archetypeId) {
        case 'sunglasses':
          return { scale: [1.05, 1.22, 1], rotate: [-6, 8, 0], y: [8, -10, 0] };
        case 'sneakers':
        case 'socks':
        case 'slippers':
          return { scale: [1, 1.25, 1], rotate: [0, -360, -4], y: [0, -32, 0] };
        case 'watch':
        case 'belt':
        case 'necklace':
          return { scale: [1, 1.2, 1.02], rotate: [0, 15, 0], y: [0, -12, 0] };
        case 'headphones':
          return { scale: [1, 1.18, 1], rotate: [-5, 5, 0], y: [10, -10, 0] };
        case 'lipstick':
        case 'makeup':
          return { scale: [1, 1.16, 1], rotate: [0, -12, -3], y: [12, -14, 0] };
        case 'tshirt':
        case 'shirt':
        case 'jeans':
          return { scale: [0.88, 1.15, 1], rotate: [-8, 6, 0], y: [-16, 0, 0] };
        case 'frock':
          return { scale: [1, 1.18, 1], rotate: [0, 360, 0], y: [8, -12, 0] };
        case 'perfume':
          return { scale: [1, 1.14, 1], rotate: [0, 8, 3], y: [8, -10, 0] };
        case 'backpack':
          return { scale: [1, 1.18, 1], rotate: [-4, 6, 0], y: [0, -18, 0] };
      }
    }
    if (isTurboRunning) {
      return { scale: 1.06, rotate: -6, x: [0, 4, -4, 0] };
    }
    return { scale: 1, rotate: 0, y: 0 };
  };

  return (
    <div className="relative w-full max-w-[680px] mx-auto flex flex-col items-center justify-center select-none px-2">
      {/* Comic-Style Impact Starburst Badge on Reveal */}
      {isRevealed && (
        <motion.div
          initial={
            reducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4, rotate: -18 }
          }
          animate={{ opacity: 1, scale: 1, rotate: -8 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute -top-3 right-4 sm:right-8 z-30 px-3.5 py-1 bg-amber-400 text-zinc-950 font-display font-extrabold text-xs sm:text-sm tracking-tight border-2 border-zinc-950 shadow-[3px_3px_0px_#18181B]"
        >
          {isTurboRunning ? 'MACH 3 OVERDRIVE!' : product.transformation.impactWord}
        </motion.div>
      )}

      {/* Unified Side-by-Side & Fused Stage: Real Photo Animation + Character SVG Animation Together */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-5 items-center">
        {/* LEFT / TOP STAGE: Real Product Photograph with Synchronized Animation & Live Effects */}
        <div className="sm:col-span-5 flex flex-col items-center justify-center">
          <motion.div
            animate={getPhotoMotionAnimate()}
            transition={
              isOrdinary && !reducedMotion
                ? { y: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }, duration: 0.5 }
                : transitionSpec
            }
            className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-2xl overflow-hidden bg-zinc-900 border-2 shadow-[0_18px_38px_rgba(0,0,0,0.55)]"
            style={{
              borderColor: isRevealed ? variant.accentHex : 'rgba(255,255,255,0.22)',
            }}
          >
            {/* The Real Product Studio Photograph */}
            <img
              src={product.photoUrl}
              alt={`${product.name} real photo`}
              referrerPolicy="no-referrer"
              style={{
                filter:
                  product.photoFilter && product.photoFilter !== 'none'
                    ? product.photoFilter
                    : undefined,
              }}
              className="w-full h-full object-cover"
            />

            {/* Synchronized Optical Flash Overlay on Real Photo during Transformation */}
            {(isTransforming || stage === 'reveal') && (
              <motion.div
                initial={{ opacity: 0.9 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="pointer-events-none absolute inset-0 bg-white"
              />
            )}

            {/* Shimmering Lens Sweep across Real Photo when Revealed */}
            {isRevealed && !reducedMotion && (
              <div
                className="pointer-events-none absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent"
                style={{ animation: 'lensSweep 2.4s ease-in-out infinite' }}
              />
            )}

            {/* Archetype-Specific Live Animated Effects Overlaid Directly on the Real Photo */}
            {!isOrdinary && (
              <svg
                viewBox="0 0 200 200"
                className="pointer-events-none absolute inset-0 w-full h-full"
              >
                {/* Sunglasses / Shirt / Jeans: Glowing Neon Target & Speed Glint on Real Photo */}
                {(product.archetypeId === 'sunglasses' ||
                  product.archetypeId === 'jeans' ||
                  product.archetypeId === 'shirt') && (
                  <g>
                    <rect
                      x="14"
                      y="14"
                      width="172"
                      height="172"
                      rx="16"
                      fill="none"
                      stroke={variant.secondaryColor}
                      strokeWidth="2.5"
                      strokeDasharray="10 6"
                      opacity="0.75"
                    />
                    <path
                      d="M28 42 L64 24 M136 176 L172 158"
                      stroke={variant.accentHex}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  </g>
                )}

                {/* Sneakers / Socks / Slippers: High-Voltage Lightning Arcs & Cloud Sparks on Real Photo */}
                {(product.archetypeId === 'sneakers' ||
                  product.archetypeId === 'socks' ||
                  product.archetypeId === 'slippers') && (
                  <g stroke={variant.secondaryColor} strokeWidth="3" fill="none" strokeLinecap="round">
                    <path d="M18 148 L56 132 L46 154 L92 138" />
                    <path d="M116 54 L154 38 L142 60 L182 44" />
                  </g>
                )}

                {/* Watch / Belt: Spinning Golden Chrono Hands / Power Ring Overlaid on Real Photo */}
                {(product.archetypeId === 'watch' || product.archetypeId === 'belt') && (
                  <g>
                    <circle
                      cx="100"
                      cy="100"
                      r="72"
                      fill="none"
                      stroke={variant.secondaryColor}
                      strokeWidth="2.5"
                      strokeDasharray="4 8"
                      opacity="0.75"
                    />
                    <motion.line
                      x1="100"
                      y1="100"
                      x2="100"
                      y2="46"
                      stroke={variant.secondaryColor}
                      strokeWidth="3"
                      strokeLinecap="round"
                      animate={!reducedMotion ? { rotate: 360 } : { rotate: 45 }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
                      style={{ transformOrigin: '100px 100px' }}
                    />
                  </g>
                )}

                {/* Headphones: Animated Equalizer Bars along bottom of Real Photo */}
                {product.archetypeId === 'headphones' && (
                  <g opacity="0.85">
                    {[24, 42, 60, 78, 96, 114, 132, 150, 168].map((xPos, i) => (
                      <rect
                        key={xPos}
                        x={xPos}
                        y={155 - (i % 3) * 14}
                        width="10"
                        height={24 + (i % 3) * 14}
                        rx="3"
                        fill={i % 2 === 0 ? variant.secondaryColor : variant.accentHex}
                      />
                    ))}
                  </g>
                )}

                {/* Lipstick / Makeup / Frock / Necklace: Glamour Sparkle Stars & Diamond Rays on Real Photo */}
                {(product.archetypeId === 'lipstick' ||
                  product.archetypeId === 'makeup' ||
                  product.archetypeId === 'frock' ||
                  product.archetypeId === 'necklace') && (
                  <g fill={variant.secondaryColor}>
                    <path d="M36 28 L40 40 L52 44 L40 48 L36 60 L32 48 L20 44 L32 40 Z" />
                    <path d="M162 36 L165 46 L175 49 L165 52 L162 62 L159 52 L149 49 L159 46 Z" />
                    <path d="M154 142 L157 150 L165 153 L157 156 L154 164 L151 156 L143 153 L151 150 Z" />
                  </g>
                )}

                {/* T-Shirt: Red Carpet VIP Frame & Flash Star on Real Photo */}
                {product.archetypeId === 'tshirt' && (
                  <g>
                    <path
                      d="M16 168 Q100 188 184 168"
                      stroke="#DC2626"
                      strokeWidth="8"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <circle cx="38" cy="38" r="10" fill="#FFFFFF" fillOpacity="0.75" />
                    <circle cx="164" cy="48" r="8" fill="#FEF08A" fillOpacity="0.75" />
                  </g>
                )}

                {/* Perfume: Volumetric Mist Plumes over Real Perfume Photo */}
                {product.archetypeId === 'perfume' && (
                  <g>
                    <circle cx="65" cy="145" r="38" fill={variant.secondaryColor} fillOpacity="0.28" />
                    <circle cx="135" cy="135" r="44" fill={variant.accentHex} fillOpacity="0.24" />
                  </g>
                )}

                {/* Backpack: Orbiting Mini Study Icons around Real Backpack Photo */}
                {product.archetypeId === 'backpack' && (
                  <g>
                    <ellipse
                      cx="100"
                      cy="100"
                      rx="84"
                      ry="34"
                      transform="rotate(-18 100 100)"
                      fill="none"
                      stroke={variant.secondaryColor}
                      strokeWidth="2.5"
                      strokeDasharray="6 4"
                    />
                    <rect x="22" y="72" width="22" height="16" rx="3" fill="#EF4444" stroke="#18181B" strokeWidth="2" />
                    <rect x="156" y="102" width="22" height="16" rx="3" fill="#10B981" stroke="#18181B" strokeWidth="2" />
                  </g>
                )}
              </svg>
            )}

            {/* Bottom Caption inside Real Photo Stage */}
            <div className="absolute inset-x-0 bottom-0 px-3 py-1.5 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex items-center justify-between text-[11px] font-mono text-white">
              <span>REAL PHOTO</span>
              <span className="text-amber-300 font-semibold">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
            </div>
          </motion.div>
        </div>

        {/* RIGHT / MAIN STAGE: Unified 400x400 SVG Character + Product Alignment Animation */}
        <div className="sm:col-span-7 flex items-center justify-center">
          <div className="relative w-full max-w-[300px] sm:max-w-[340px] aspect-square flex items-center justify-center">
            <motion.svg
              viewBox="0 0 400 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full overflow-visible drop-shadow-[0_20px_35px_rgba(0,0,0,0.45)]"
              role="img"
              aria-label={`${product.name} ${product.transformation.modeName} transformation stage`}
              animate={
                reducedMotion
                  ? { scale: 1 }
                  : stage === 'transforming'
                  ? { scale: 1.04 }
                  : isRevealed
                  ? { scale: 1 }
                  : { scale: 0.98 }
              }
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Floor Pedestal Shadow */}
              <ellipse cx="200" cy="370" rx="124" ry="14" fill="#000000" fillOpacity="0.45" />
              <ellipse
                cx="200"
                cy="370"
                rx="92"
                ry="8"
                fill={variant.accentHex}
                fillOpacity={isRevealed ? '0.35' : '0.12'}
              />

              {/* Layer 1: Character Rig */}
              <CharacterIllustration
                productId={product.archetypeId}
                stage={stage}
                variant={variant}
                isTurboRunning={isTurboRunning}
              />

              {/* Layer 2: Product Stage */}
              <ProductStage
                productId={product.archetypeId}
                stage={stage}
                variant={variant}
                isTurboRunning={isTurboRunning}
                reducedMotion={reducedMotion}
              />
            </motion.svg>
          </div>
        </div>
      </div>
    </div>
  );
};
