import React from 'react';
import { ArchetypeId, StyleVariant, TransformationStage } from '../../types/store';

interface CharacterIllustrationProps {
  productId: ArchetypeId;
  stage: TransformationStage;
  variant: StyleVariant;
  isTurboRunning?: boolean;
}

/**
 * Unified 400x400 SVG Character Rig supporting all 16 product archetypes.
 * Anchor coordinates:
 * - Portrait/Upper-Body Rigs (sunglasses, watch, headphones, lipstick, tshirt, perfume, backpack, shirt, makeup, necklace):
 *   - Eyes: Left (166, 156), Right (234, 156)
 *   - Ears: Left (128, 158), Right (272, 158)
 *   - Lips: (200, 188), Cheeks: (150, 172) & (250, 172)
 *   - Neck / Necklace Pendant Anchor: (200, 232)
 *   - Torso Center: (200, 272)
 *   - Executive Wrist: (242, 240)
 * - Full-Body Rigs (sneakers, jeans, frock, belt, socks, slippers):
 *   - Waist / Belt Anchor: (200, 212)
 *   - Legs / Jeans Anchor: (200, 276)
 *   - Feet / Ankles Anchor: Left (144, 344), Right (256, 326)
 */
export const CharacterIllustration: React.FC<CharacterIllustrationProps> = ({
  productId,
  stage,
  variant,
  isTurboRunning = false,
}) => {
  const isRevealed = stage === 'reveal' || stage === 'details';
  const isVisible = stage === 'transforming' || isRevealed;

  if (!isVisible) return null;

  const isFullBodyArchetype =
    productId === 'sneakers' ||
    productId === 'jeans' ||
    productId === 'frock' ||
    productId === 'belt' ||
    productId === 'socks' ||
    productId === 'slippers';

  if (isFullBodyArchetype) {
    return (
      <g
        className="transition-opacity duration-500"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isTurboRunning ? 'translateX(6px) skewX(-6deg)' : 'none',
        }}
      >
        {/* Dynamic Aura behind full-body character */}
        {isRevealed && (
          <circle
            cx="200"
            cy="210"
            r="142"
            fill={variant.accentHex}
            fillOpacity="0.14"
            stroke={variant.secondaryColor}
            strokeWidth="2"
            strokeDasharray="8 6"
          />
        )}

        {/* Dust clouds or Cozy Clouds near feet */}
        {isRevealed && (productId === 'sneakers' || productId === 'socks') && (
          <g fill="#E4E4E7" fillOpacity="0.75">
            <circle cx="88" cy="348" r="18" />
            <circle cx="110" cy="356" r="14" />
            <circle cx="72" cy="358" r="11" />
          </g>
        )}

        {isRevealed && productId === 'slippers' && (
          <g fill="#FFFFFF" fillOpacity="0.85" stroke={variant.secondaryColor} strokeWidth="2">
            <ellipse cx="144" cy="354" rx="48" ry="14" />
            <ellipse cx="256" cy="338" rx="48" ry="14" />
          </g>
        )}

        {/* Head & Hair */}
        <path
          d={
            productId === 'frock'
              ? 'M162 82 C154 126 158 158 170 172 H230 C242 158 246 126 238 82 C230 54 170 54 162 82 Z'
              : 'M172 78 C172 56 228 56 234 78 L244 64 L228 88 Z'
          }
          fill="#18181B"
        />

        {/* Royal Crown / Tiara when Frock or Slippers Revealed */}
        {isRevealed && (productId === 'frock' || productId === 'slippers') && (
          <path
            d="M184 66 L190 48 L200 60 L210 48 L216 66 Z"
            fill="#FACC15"
            stroke="#18181B"
            strokeWidth="2.5"
          />
        )}

        <circle cx="204" cy="94" r="26" fill="#FDBA74" stroke="#18181B" strokeWidth="3.5" />
        <path d="M190 88 L202 91 M212 91 L224 86" stroke="#18181B" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="196" cy="95" r="3" fill="#18181B" />
        <circle cx="216" cy="95" r="3" fill="#18181B" />
        <path d="M196 106 Q206 113 216 105" stroke="#18181B" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* Upper Torso (for non-frock full-body modes) */}
        {productId !== 'frock' && (
          <path
            d="M168 122 H234 L240 210 H164 L168 122 Z"
            fill="#18181B"
            stroke="#FFFFFF"
            strokeWidth="2.5"
          />
        )}

        {/* Arms */}
        <path
          d="M170 132 L132 172 L152 198"
          stroke={productId === 'frock' ? '#FDBA74' : '#18181B'}
          strokeWidth="15"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="154" cy="200" r="8" fill="#FDBA74" stroke="#18181B" strokeWidth="3" />

        <path
          d="M232 132 L272 162 L254 128"
          stroke={productId === 'frock' ? '#FDBA74' : '#18181B'}
          strokeWidth="15"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="252" cy="124" r="8" fill="#FDBA74" stroke="#18181B" strokeWidth="3" />

        {/* Base Legs (for sneakers, belt, socks, slippers; jeans & frock render their own garment over legs) */}
        {productId !== 'jeans' && (
          <>
            <path
              d="M178 208 L154 276 L144 334"
              stroke={productId === 'frock' ? '#FDBA74' : '#27272A'}
              strokeWidth={productId === 'frock' ? '14' : '22'}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M224 208 L250 262 L256 316"
              stroke={productId === 'frock' ? '#FDBA74' : '#27272A'}
              strokeWidth={productId === 'frock' ? '14' : '22'}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        )}
      </g>
    );
  }

  // Portrait / Upper-Body Rig for: sunglasses, watch, headphones, lipstick, tshirt, perfume, backpack, shirt, makeup, necklace
  return (
    <g className="transition-opacity duration-500" style={{ opacity: isVisible ? 1 : 0 }}>
      {isRevealed && (
        <g>
          <circle cx="200" cy="195" r="148" fill={variant.accentHex} fillOpacity="0.14" />
          <circle
            cx="200"
            cy="195"
            r="128"
            stroke={variant.secondaryColor}
            strokeOpacity="0.4"
            strokeWidth="2"
            strokeDasharray="10 8"
          />
        </g>
      )}

      {/* Back Hair Volume */}
      <path
        d={
          (productId === 'lipstick' || productId === 'makeup' || productId === 'necklace') &&
          isRevealed
            ? 'M116 146 C102 210 108 268 128 292 H272 C294 268 298 210 284 146 C276 86 244 64 200 64 C156 64 124 86 116 146 Z'
            : 'M128 148 C124 92 154 68 200 68 C246 68 276 92 272 148 Z'
        }
        fill="#18181B"
      />

      {productId === 'backpack' && isRevealed && (
        <path
          d="M112 246 C112 190 144 176 200 176 C256 176 288 190 288 246"
          fill={variant.primaryColor}
          stroke="#18181B"
          strokeWidth="4"
        />
      )}

      {/* Neck */}
      <rect
        x="178"
        y="202"
        width="44"
        height="48"
        rx="16"
        fill="#FDBA74"
        stroke="#18181B"
        strokeWidth="3.5"
      />

      {/* Base Torso (for non-tshirt and non-shirt modes) */}
      {productId !== 'tshirt' && productId !== 'shirt' && (
        <g>
          <path
            d="M96 368 L114 252 C118 234 136 226 158 226 H242 C264 226 282 234 286 252 L304 368 H96 Z"
            fill={
              productId === 'watch' || productId === 'necklace'
                ? '#09090B'
                : productId === 'perfume'
                ? '#1E1B4B'
                : productId === 'lipstick' || productId === 'makeup'
                ? variant.primaryColor
                : '#18181B'
            }
            stroke="#18181B"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {(productId === 'sunglasses' || productId === 'watch' || productId === 'perfume') && (
            <>
              <path
                d="M156 226 L138 198 L178 248 L200 286 Z"
                fill={productId === 'perfume' ? '#312E81' : '#27272A'}
                stroke="#18181B"
                strokeWidth="3.5"
              />
              <path
                d="M244 226 L262 198 L222 248 L200 286 Z"
                fill={productId === 'perfume' ? '#312E81' : '#27272A'}
                stroke="#18181B"
                strokeWidth="3.5"
              />
            </>
          )}

          {productId === 'watch' && (
            <g>
              <path d="M178 226 L200 278 L222 226 Z" fill="#FAFAFA" />
              <path
                d="M194 234 H206 L210 296 L200 310 L190 296 Z"
                fill={variant.primaryColor}
                stroke="#18181B"
                strokeWidth="2.5"
              />
            </g>
          )}

          {productId === 'backpack' && isRevealed && (
            <g>
              <path d="M144 226 L152 364" stroke={variant.primaryColor} strokeWidth="20" strokeLinecap="round" />
              <path d="M256 226 L248 364" stroke={variant.primaryColor} strokeWidth="20" strokeLinecap="round" />
              <rect x="172" y="268" width="56" height="68" rx="6" fill="#FAF8F5" stroke="#18181B" strokeWidth="3" />
              <text
                x="200"
                y="310"
                textAnchor="middle"
                fill="#DC2626"
                fontSize="24"
                fontWeight="800"
                fontFamily="Bricolage Grotesque, sans-serif"
              >
                A+
              </text>
            </g>
          )}
        </g>
      )}

      {(productId === 'tshirt' || productId === 'shirt') && (
        <path
          d="M104 368 L118 254 C122 236 140 228 160 228 H240 C260 228 278 236 282 254 L296 368 H104 Z"
          fill="#27272A"
          stroke="#18181B"
          strokeWidth="3.5"
        />
      )}

      {/* Left & Right Ears at (128, 158) and (272, 158) */}
      <circle cx="128" cy="158" r="14" fill="#FDBA74" stroke="#18181B" strokeWidth="3.5" />
      <circle cx="272" cy="158" r="14" fill="#FDBA74" stroke="#18181B" strokeWidth="3.5" />

      {(productId === 'lipstick' || productId === 'makeup' || productId === 'necklace') &&
        isRevealed && (
          <>
            <circle cx="124" cy="176" r="6" fill={variant.secondaryColor} stroke="#18181B" strokeWidth="2" />
            <circle cx="276" cy="176" r="6" fill={variant.secondaryColor} stroke="#18181B" strokeWidth="2" />
          </>
        )}

      {/* Main Head / Face Oval */}
      <path
        d="M134 134 C134 94 160 76 200 76 C240 76 266 94 266 134 V162 C266 198 238 222 200 222 C162 222 134 198 134 162 V134 Z"
        fill="#FDBA74"
        stroke="#18181B"
        strokeWidth="4"
      />

      {/* Rosy Blush Cheeks & Shimmer Eyeshadow when Makeup Mode is revealed */}
      {productId === 'makeup' && isRevealed && (
        <g>
          <ellipse cx="154" cy="172" rx="14" ry="8" fill={variant.primaryColor} fillOpacity="0.55" />
          <ellipse cx="246" cy="172" rx="14" ry="8" fill={variant.primaryColor} fillOpacity="0.55" />
          <path d="M152 148 Q166 140 180 148" stroke={variant.secondaryColor} strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M220 148 Q234 140 248 148" stroke={variant.secondaryColor} strokeWidth="6" strokeLinecap="round" fill="none" />
        </g>
      )}

      {/* Styled Front Hair / Fringe */}
      <path
        d="M132 136 C134 98 164 82 204 82 C238 82 266 100 268 134 C254 114 232 106 202 110 C172 114 148 118 132 136 Z"
        fill="#18181B"
      />

      {/* Eyebrows */}
      <path
        d={
          isRevealed
            ? 'M148 136 Q166 128 182 136 M218 136 Q234 126 252 134'
            : 'M150 138 Q166 134 182 138 M218 138 Q234 134 250 138'
        }
        stroke="#18181B"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      {/* Eyes at (166, 156) & (234, 156) */}
      <g>
        <ellipse cx="166" cy="156" rx="11" ry="8" fill="#FFFFFF" stroke="#18181B" strokeWidth="3" />
        <circle cx="166" cy="156" r="4.5" fill="#18181B" />
        <circle cx="168" cy="154" r="1.8" fill="#FFFFFF" />

        <ellipse cx="234" cy="156" rx="11" ry="8" fill="#FFFFFF" stroke="#18181B" strokeWidth="3" />
        <circle cx="234" cy="156" r="4.5" fill="#18181B" />
        <circle cx="236" cy="154" r="1.8" fill="#FFFFFF" />

        {(productId === 'lipstick' || productId === 'makeup') && isRevealed && (
          <>
            <path d="M152 154 L144 146" stroke="#18181B" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M248 154 L256 146" stroke="#18181B" strokeWidth="3.5" strokeLinecap="round" />
          </>
        )}
      </g>

      {/* Nose */}
      <path
        d="M200 152 V170 L194 174"
        stroke="#18181B"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Mouth / Lips at (200, 188) */}
      {(productId === 'lipstick' || productId === 'makeup') && isRevealed ? (
        <g>
          <path
            d="M180 188 C186 180 196 182 200 186 C204 182 214 180 220 188 C214 198 186 198 180 188 Z"
            fill={variant.primaryColor}
            stroke="#18181B"
            strokeWidth="2.5"
          />
          <path d="M188 190 Q200 194 212 190" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>
      ) : isRevealed ? (
        <path
          d="M182 188 Q202 202 222 184"
          stroke="#18181B"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
      ) : (
        <line
          x1="188"
          y1="190"
          x2="212"
          y2="190"
          stroke="#18181B"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      )}

      {/* Executive Raised Forearm for Watch Billionaire Mode */}
      {productId === 'watch' && (
        <g>
          <path
            d="M294 340 L264 252 L222 226 L196 254 L244 352 Z"
            fill="#18181B"
            stroke="#FAFAFA"
            strokeWidth="2.5"
          />
          <rect
            x="220"
            y="218"
            width="42"
            height="18"
            rx="4"
            transform="rotate(28 220 218)"
            fill="#FAFAFA"
            stroke="#18181B"
            strokeWidth="2.5"
          />
          <circle cx="210" cy="224" r="16" fill="#FDBA74" stroke="#18181B" strokeWidth="3.5" />
        </g>
      )}
    </g>
  );
};
