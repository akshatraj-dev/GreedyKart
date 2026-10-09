import React from 'react';
import { motion } from 'motion/react';
import { ArchetypeId, StyleVariant, TransformationStage } from '../../types/store';

interface ProductStageProps {
  productId: ArchetypeId;
  stage: TransformationStage;
  variant: StyleVariant;
  isTurboRunning?: boolean;
  reducedMotion: boolean;
}

export const ProductStage: React.FC<ProductStageProps> = ({
  productId,
  stage,
  variant,
  isTurboRunning = false,
  reducedMotion,
}) => {
  const { primaryColor, secondaryColor, accentHex } = variant;
  const isOrdinary = stage === 'idle' || stage === 'preparing';
  const isTransforming = stage === 'transforming';
  const isRevealed = stage === 'reveal' || stage === 'details';
  const isFitted = isTransforming || isRevealed;

  const transitionSpec = reducedMotion
    ? { duration: 0.15 }
    : { duration: 0.75, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

  switch (productId) {
    case 'sunglasses': {
      return (
        <g>
          {(isTransforming || stage === 'reveal') && (
            <motion.circle
              cx="200"
              cy="156"
              r="18"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="6"
              initial={{ scale: 0.4, opacity: 0.95 }}
              animate={{ scale: 4.5, opacity: 0 }}
              transition={{ duration: reducedMotion ? 0.2 : 0.75, ease: 'easeOut' }}
            />
          )}

          <motion.g
            initial={{ x: 0, y: 38, scale: 1.38, rotate: -6 }}
            animate={
              isOrdinary
                ? { x: 0, y: 38, scale: 1.38, rotate: -4 }
                : { x: 0, y: 0, scale: 1, rotate: 0 }
            }
            transition={transitionSpec}
            style={{ transformOrigin: '200px 156px' }}
          >
            <path d="M128 154 L136 146 M272 154 L264 146" stroke={primaryColor} strokeWidth="6" strokeLinecap="round" />
            <path d="M132 142 H268" stroke={secondaryColor} strokeWidth="4" strokeLinecap="round" />
            <path d="M188 150 C194 144 206 144 212 150" stroke={primaryColor} strokeWidth="5.5" strokeLinecap="round" />
            <rect x="136" y="140" width="56" height="34" rx="8" fill={primaryColor} stroke={secondaryColor} strokeWidth="3.5" />
            <rect x="208" y="140" width="56" height="34" rx="8" fill={primaryColor} stroke={secondaryColor} strokeWidth="3.5" />
            <path d="M146 146 L162 168 M156 146 L166 160" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.8" />
            <path d="M218 146 L234 168 M228 146 L238 160" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.8" />
            <circle cx="142" cy="146" r="2.2" fill={accentHex} />
            <circle cx="258" cy="146" r="2.2" fill={accentHex} />
          </motion.g>
        </g>
      );
    }

    case 'sneakers': {
      return (
        <g>
          <motion.g
            initial={{ x: -24, y: -110, scale: 1.5, rotate: 0 }}
            animate={
              isOrdinary
                ? { x: -24, y: -110, scale: 1.55, rotate: -6 }
                : isTransforming && !reducedMotion
                ? { x: 0, y: [-120, -165, 0], scale: [1.5, 1.35, 1], rotate: [0, -360, 12] }
                : { x: 0, y: 0, scale: 1, rotate: 12 }
            }
            transition={transitionSpec}
            style={{ transformOrigin: '144px 344px' }}
          >
            <path d="M112 348 H178 C182 348 184 342 180 338 L166 328 L146 318 L124 322 L112 348 Z" fill={primaryColor} stroke="#18181B" strokeWidth="3.5" />
            <path d="M128 334 L154 330 L146 340 L170 336" stroke={secondaryColor} strokeWidth="3" strokeLinecap="round" />
            <rect x="108" y="346" width="76" height="9" rx="4.5" fill="#FFFFFF" stroke="#18181B" strokeWidth="3" />
          </motion.g>

          <motion.g
            initial={{ x: 24, y: -95, scale: 1.5, rotate: 0 }}
            animate={
              isOrdinary
                ? { x: 24, y: -95, scale: 1.55, rotate: 4 }
                : isTransforming && !reducedMotion
                ? { x: 0, y: [-100, -155, 0], scale: [1.5, 1.35, 1], rotate: [0, 360, -16] }
                : { x: 0, y: 0, scale: 1, rotate: -16 }
            }
            transition={transitionSpec}
            style={{ transformOrigin: '256px 326px' }}
          >
            <path d="M224 330 H290 C294 330 296 324 292 320 L278 310 L258 300 L236 304 L224 330 Z" fill={primaryColor} stroke="#18181B" strokeWidth="3.5" />
            <path d="M240 316 L266 312 L258 322 L282 318" stroke={secondaryColor} strokeWidth="3" strokeLinecap="round" />
            <rect x="220" y="328" width="76" height="9" rx="4.5" fill="#FFFFFF" stroke="#18181B" strokeWidth="3" />
          </motion.g>

          {(isRevealed || isTurboRunning) && (
            <g stroke={secondaryColor} strokeWidth="3.5" strokeLinecap="round" fill="none">
              <path d="M92 342 L114 332 L106 350 L128 342" />
              <path d="M294 316 L318 306 L308 324 L334 314" />
              {isTurboRunning && (
                <circle cx="200" cy="230" r="152" stroke={accentHex} strokeWidth="4" strokeDasharray="16 10" />
              )}
            </g>
          )}
        </g>
      );
    }

    case 'watch': {
      return (
        <motion.g
          initial={{ x: -42, y: -40, scale: 1.65, rotate: 0 }}
          animate={
            isOrdinary
              ? { x: -42, y: -40, scale: 1.65, rotate: 0 }
              : isTransforming
              ? { x: -20, y: -20, scale: 1.35, rotate: 14 }
              : { x: 0, y: 0, scale: 0.72, rotate: 28 }
          }
          transition={transitionSpec}
          style={{ transformOrigin: '242px 240px' }}
        >
          <rect x="222" y="182" width="40" height="116" rx="8" fill={primaryColor} stroke="#18181B" strokeWidth="4" />
          <circle cx="242" cy="240" r="38" fill={primaryColor} stroke="#18181B" strokeWidth="4" />
          <circle cx="242" cy="240" r="29" fill="#09090B" stroke={secondaryColor} strokeWidth="3" />
          <motion.line
            x1="242"
            y1="240"
            x2="242"
            y2="218"
            stroke={secondaryColor}
            strokeWidth="3.5"
            strokeLinecap="round"
            animate={isTransforming && !reducedMotion ? { rotate: 720 } : { rotate: 45 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            style={{ transformOrigin: '242px 240px' }}
          />
          <motion.line
            x1="242"
            y1="240"
            x2="260"
            y2="240"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
            animate={isTransforming && !reducedMotion ? { rotate: 1440 } : { rotate: 120 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            style={{ transformOrigin: '242px 240px' }}
          />
          {isRevealed && (
            <path d="M268 206 L272 218 L284 222 L272 226 L268 238 L264 226 L252 222 L264 218 Z" fill="#FEF08A" />
          )}
        </motion.g>
      );
    }

    case 'headphones': {
      return (
        <motion.g
          initial={{ x: 0, y: 56, scale: 1.18, rotate: -6 }}
          animate={
            isOrdinary
              ? { x: 0, y: 56, scale: 1.18, rotate: -4 }
              : { x: 0, y: 0, scale: 1, rotate: 0 }
          }
          transition={transitionSpec}
          style={{ transformOrigin: '200px 140px' }}
        >
          <path
            d="M122 154 V126 C122 76 156 56 200 56 C244 56 278 76 278 126 V154"
            stroke={primaryColor}
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M134 114 C134 78 162 64 200 64 C238 64 266 78 266 114"
            stroke={secondaryColor}
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <rect x="102" y="126" width="30" height="62" rx="15" fill={primaryColor} stroke="#18181B" strokeWidth="4" />
          <circle cx="117" cy="157" r="7" fill={secondaryColor} />
          <rect x="268" y="126" width="30" height="62" rx="15" fill={primaryColor} stroke="#18181B" strokeWidth="4" />
          <circle cx="283" cy="157" r="7" fill={secondaryColor} />

          {isFitted && (
            <g stroke={secondaryColor} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.85">
              <path d="M90 140 C80 150 80 166 90 176" />
              <path d="M76 130 C62 146 62 170 76 186" />
              <path d="M310 140 C320 150 320 166 310 176" />
              <path d="M324 130 C338 146 338 170 324 186" />
            </g>
          )}
        </motion.g>
      );
    }

    case 'lipstick': {
      return (
        <g>
          <motion.g
            initial={{ x: -84, y: -35, scale: 1.35, rotate: 0 }}
            animate={
              isOrdinary
                ? { x: -84, y: -35, scale: 1.35, rotate: -4 }
                : isTransforming
                ? { x: -45, y: -45, scale: 1.1, rotate: -24 }
                : { x: 0, y: 0, scale: 0.85, rotate: -18 }
            }
            transition={transitionSpec}
            style={{ transformOrigin: '284px 248px' }}
          >
            <motion.g animate={isOrdinary ? { y: 24 } : { y: 0 }} transition={transitionSpec}>
              <path d="M268 232 V186 C268 174 300 162 300 178 V232 H268 Z" fill={primaryColor} stroke="#18181B" strokeWidth="3.5" />
              <ellipse cx="284" cy="178" rx="14" ry="8" transform="rotate(-22 284 178)" fill={secondaryColor} stroke="#18181B" strokeWidth="2.5" />
            </motion.g>
            <rect x="262" y="224" width="44" height="36" rx="4" fill="#F4F4F5" stroke="#18181B" strokeWidth="3.5" />
            <rect x="262" y="232" width="44" height="6" fill={accentHex} />
            <rect x="258" y="256" width="52" height="56" rx="8" fill="#18181B" stroke="#FFFFFF" strokeWidth="2.5" />
            <motion.rect
              x="258"
              y="176"
              width="52"
              height="68"
              rx="8"
              fill={primaryColor}
              stroke="#18181B"
              strokeWidth="3.5"
              animate={isOrdinary ? { y: 20, x: 0, rotate: 0, opacity: 1 } : { y: -65, x: 55, rotate: 32, opacity: 0 }}
              transition={transitionSpec}
            />
          </motion.g>
        </g>
      );
    }

    case 'tshirt': {
      const partOffset = isOrdinary;
      return (
        <g>
          <motion.path
            d="M118 232 L72 268 L94 304 L126 280 Z"
            fill={primaryColor}
            stroke="#18181B"
            strokeWidth="4"
            strokeLinejoin="round"
            initial={{ x: -52, y: -68, rotate: -28, scale: 1.1 }}
            animate={partOffset ? { x: -52, y: -68, rotate: -28, scale: 1.1 } : { x: 0, y: 0, rotate: 0, scale: 1 }}
            transition={transitionSpec}
          />
          <motion.path
            d="M282 232 L328 268 L306 304 L274 280 Z"
            fill={primaryColor}
            stroke="#18181B"
            strokeWidth="4"
            strokeLinejoin="round"
            initial={{ x: 52, y: -68, rotate: 28, scale: 1.1 }}
            animate={partOffset ? { x: 52, y: -68, rotate: 28, scale: 1.1 } : { x: 0, y: 0, rotate: 0, scale: 1 }}
            transition={transitionSpec}
          />
          <motion.g
            initial={{ x: 0, y: -36, scale: 1.08 }}
            animate={partOffset ? { x: 0, y: -36, scale: 1.08 } : { x: 0, y: 0, scale: 1 }}
            transition={transitionSpec}
          >
            <path d="M118 232 H282 L292 368 H108 L118 232 Z" fill={primaryColor} stroke="#18181B" strokeWidth="4" strokeLinejoin="round" />
            <rect x="152" y="268" width="96" height="34" rx="6" fill={secondaryColor} stroke="#18181B" strokeWidth="3" />
            <text x="200" y="290" textAnchor="middle" fill="#18181B" fontSize="13" fontWeight="800" fontFamily="Bricolage Grotesque, sans-serif">
              VIP ONLY
            </text>
          </motion.g>
          <motion.path
            d="M164 230 C164 252 236 252 236 230 C236 222 164 222 164 230 Z"
            fill={secondaryColor}
            stroke="#18181B"
            strokeWidth="4"
            initial={{ x: 0, y: -115, scale: 1.25 }}
            animate={partOffset ? { x: 0, y: -115, scale: 1.25 } : { x: 0, y: 0, scale: 1 }}
            transition={transitionSpec}
          />
          {isRevealed && (
            <g>
              <rect x="56" y="330" width="12" height="50" rx="4" fill="#FACC15" stroke="#18181B" strokeWidth="2.5" />
              <rect x="332" y="330" width="12" height="50" rx="4" fill="#FACC15" stroke="#18181B" strokeWidth="2.5" />
              <path d="M68 342 Q200 378 332 342" stroke="#DC2626" strokeWidth="12" strokeLinecap="round" fill="none" />
            </g>
          )}
        </g>
      );
    }

    case 'perfume': {
      return (
        <g>
          {isFitted && (
            <motion.g
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 0.75, scale: 1.08 }}
              transition={{ duration: 0.8 }}
            >
              <circle cx="156" cy="196" r="46" fill={secondaryColor} fillOpacity="0.22" />
              <circle cx="218" cy="176" r="62" fill={accentHex} fillOpacity="0.18" />
              <circle cx="256" cy="210" r="44" fill={secondaryColor} fillOpacity="0.2" />
            </motion.g>
          )}

          <motion.g
            initial={{ x: 72, y: -44, scale: 1.38, rotate: 0 }}
            animate={
              isOrdinary
                ? { x: 72, y: -44, scale: 1.38, rotate: 0 }
                : { x: 0, y: 0, scale: 0.9, rotate: 12 }
            }
            transition={transitionSpec}
            style={{ transformOrigin: '128px 268px' }}
          >
            <motion.rect
              x="108"
              y="186"
              width="40"
              height="24"
              rx="5"
              fill="#18181B"
              stroke={secondaryColor}
              strokeWidth="3"
              animate={isOrdinary ? { y: 0, x: 0, rotate: 0 } : { y: -48, x: -28, rotate: -25 }}
              transition={transitionSpec}
            />
            <rect x="118" y="210" width="20" height="14" fill="#F59E0B" stroke="#18181B" strokeWidth="3" />
            <path
              d="M90 224 H166 L178 244 V302 C178 308 172 312 166 312 H90 C84 312 78 308 78 302 V244 L90 224 Z"
              fill={primaryColor}
              stroke="#18181B"
              strokeWidth="3.5"
            />
            <rect x="100" y="248" width="56" height="36" rx="4" fill="#FAF8F5" stroke="#18181B" strokeWidth="2.5" />
          </motion.g>
        </g>
      );
    }

    case 'backpack': {
      const orbitItems = [
        { label: 'BOOK', angleOffset: -65, x: 96, y: 112, color: '#EF4444' },
        { label: 'NOTE', angleOffset: -20, x: 146, y: 62, color: '#F59E0B' },
        { label: 'PEN', angleOffset: 25, x: 256, y: 64, color: '#3B82F6' },
        { label: 'THESIS', angleOffset: 70, x: 304, y: 116, color: '#10B981' },
      ];

      return (
        <g>
          {isFitted &&
            orbitItems.map((item, idx) => (
              <motion.g
                key={item.label}
                initial={{ x: 200, y: 220, scale: 0.2, opacity: 0 }}
                animate={
                  isTransforming
                    ? { x: item.x, y: item.y, scale: 1.05, opacity: 1, rotate: item.angleOffset / 2 }
                    : { x: item.x, y: item.y + 12, scale: 0.92, opacity: 0.95, rotate: item.angleOffset / 3 }
                }
                transition={{
                  ...transitionSpec,
                  delay: reducedMotion ? 0 : idx * 0.08,
                }}
              >
                <rect x="-22" y="-16" width="44" height="32" rx="5" fill={item.color} stroke="#18181B" strokeWidth="3" />
                <line x1="-14" y1="-4" x2="14" y2="-4" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
                <line x1="-14" y1="5" x2="8" y2="5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
              </motion.g>
            ))}

          <motion.g
            initial={{ x: 0, y: 0, scale: 1.15 }}
            animate={
              isOrdinary
                ? { x: 0, y: 0, scale: 1.15 }
                : isTransforming
                ? { x: 0, y: 24, scale: 1.05 }
                : { x: 102, y: 62, scale: 0.68 }
            }
            transition={transitionSpec}
            style={{ transformOrigin: '200px 220px' }}
          >
            <path d="M180 144 C180 128 220 128 220 144" stroke="#18181B" strokeWidth="7" strokeLinecap="round" fill="none" />
            <path
              d="M142 188 C142 152 164 140 200 140 C236 140 258 152 258 188 V264 C258 272 252 278 244 278 H156 C148 278 142 272 142 264 V188 Z"
              fill={primaryColor}
              stroke="#18181B"
              strokeWidth="4"
            />
            <path
              d={isTransforming ? 'M148 188 Q200 162 252 188 Q200 208 148 188 Z' : 'M148 188 Q200 178 252 188'}
              fill={isTransforming ? '#18181B' : 'none'}
              stroke={secondaryColor}
              strokeWidth="4.5"
            />
            <rect x="158" y="212" width="84" height="48" rx="10" fill={secondaryColor} stroke="#18181B" strokeWidth="3.5" />
          </motion.g>
        </g>
      );
    }

    case 'jeans': {
      // Denim Jeans unfold and lock onto full-body character's waist & legs (y=204 to y=342)
      return (
        <motion.g
          initial={{ x: 0, y: -56, scale: 1.25, rotate: -6 }}
          animate={
            isOrdinary
              ? { x: 0, y: -56, scale: 1.25, rotate: -4 }
              : isTransforming && !reducedMotion
              ? { x: 0, y: [-50, -10, 0], scale: [1.25, 1.08, 1], rotate: [-8, 4, 0] }
              : { x: 0, y: 0, scale: 1, rotate: 0 }
          }
          transition={transitionSpec}
          style={{ transformOrigin: '200px 270px' }}
        >
          {/* Tailored Selvedge Denim Jeans Fitted on Character Legs */}
          <path
            d="M164 204 H240 L268 322 H238 L204 246 L162 340 H132 L164 204 Z"
            fill={primaryColor}
            stroke="#18181B"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* Waistband & Copper Button */}
          <rect x="164" y="204" width="76" height="14" fill={primaryColor} stroke="#18181B" strokeWidth="3" />
          <circle cx="202" cy="211" r="3.5" fill={accentHex} />
          {/* Selvedge Cuffs at ankles */}
          <rect x="128" y="330" width="38" height="12" rx="3" fill={secondaryColor} stroke="#18181B" strokeWidth="3" />
          <rect x="234" y="312" width="38" height="12" rx="3" fill={secondaryColor} stroke="#18181B" strokeWidth="3" />
        </motion.g>
      );
    }

    case 'shirt': {
      // Button-Down Executive Shirt snaps collar, sleeves & button placket onto portrait torso (y=228 to 368)
      return (
        <motion.g
          initial={{ x: 0, y: -48, scale: 1.15, rotate: 4 }}
          animate={
            isOrdinary
              ? { x: 0, y: -48, scale: 1.15, rotate: 3 }
              : { x: 0, y: 0, scale: 1, rotate: 0 }
          }
          transition={transitionSpec}
          style={{ transformOrigin: '200px 290px' }}
        >
          {/* Tailored Sleeves */}
          <path d="M118 232 L76 312 L104 326 L126 276 Z" fill={primaryColor} stroke="#18181B" strokeWidth="4" strokeLinejoin="round" />
          <path d="M282 232 L324 312 L296 326 L274 276 Z" fill={primaryColor} stroke="#18181B" strokeWidth="4" strokeLinejoin="round" />
          {/* Crisp Button-Down Torso */}
          <path d="M118 232 H282 L292 368 H108 L118 232 Z" fill={primaryColor} stroke="#18181B" strokeWidth="4" strokeLinejoin="round" />
          {/* Center Button Placket */}
          <rect x="192" y="232" width="16" height="136" fill={secondaryColor} stroke="#18181B" strokeWidth="3" />
          {[254, 282, 310, 338].map((cy) => (
            <circle key={cy} cx="200" cy={cy} r="3.5" fill="#FFFFFF" stroke="#18181B" strokeWidth="2" />
          ))}
          {/* Sharp Spread Collar locking around neck */}
          <path d="M164 222 L200 248 L176 262 L152 234 Z" fill={secondaryColor} stroke="#18181B" strokeWidth="3.5" />
          <path d="M236 222 L200 248 L224 262 L248 234 Z" fill={secondaryColor} stroke="#18181B" strokeWidth="3.5" />
        </motion.g>
      );
    }

    case 'makeup': {
      // Makeup Compact Palette opens and sweeps brush across character's face
      return (
        <g>
          {/* Floating Makeup Compact Palette */}
          <motion.g
            initial={{ x: -82, y: -42, scale: 1.35, rotate: -4 }}
            animate={
              isOrdinary
                ? { x: -82, y: -42, scale: 1.35, rotate: -4 }
                : { x: 0, y: 0, scale: 0.82, rotate: -12 }
            }
            transition={transitionSpec}
            style={{ transformOrigin: '284px 276px' }}
          >
            <rect x="234" y="218" width="104" height="52" rx="8" fill={primaryColor} stroke="#18181B" strokeWidth="3.5" />
            <rect x="242" y="224" width="88" height="40" rx="4" fill="#E0F2FE" stroke={secondaryColor} strokeWidth="2" />
            <rect x="228" y="272" width="116" height="52" rx="8" fill="#18181B" stroke={secondaryColor} strokeWidth="3.5" />
            <circle cx="252" cy="298" r="10" fill={primaryColor} />
            <circle cx="278" cy="298" r="10" fill={secondaryColor} />
            <circle cx="304" cy="298" r="10" fill={accentHex} />
          </motion.g>

          {/* Animated Plush Makeup Brush sweeping across cheeks */}
          {isFitted && (
            <motion.g
              initial={{ x: 140, y: 170, rotate: -35 }}
              animate={
                isTransforming && !reducedMotion
                  ? { x: [140, 245, 130], y: [170, 170, 260], rotate: [-35, 35, -20] }
                  : { x: 124, y: 268, rotate: -25 }
              }
              transition={{ duration: 1.1, ease: 'easeInOut' }}
            >
              <rect x="-6" y="0" width="12" height="54" rx="4" fill={secondaryColor} stroke="#18181B" strokeWidth="3" />
              <path d="M-16 0 C-18 -24 18 -24 16 0 Z" fill={primaryColor} stroke="#18181B" strokeWidth="3" />
            </motion.g>
          )}
        </g>
      );
    }

    case 'frock': {
      // Couture Party Frock spins and locks onto full-body character (y=122 to y=318)
      return (
        <motion.g
          initial={{ x: 0, y: 24, scale: 1.2, rotate: 0 }}
          animate={
            isOrdinary
              ? { x: 0, y: 24, scale: 1.2, rotate: 0 }
              : isTransforming && !reducedMotion
              ? { x: 0, y: 0, scale: [1.2, 1.08, 1], rotate: [0, 360, 0] }
              : { x: 0, y: 0, scale: 1, rotate: 0 }
          }
          transition={transitionSpec}
          style={{ transformOrigin: '200px 215px' }}
        >
          {/* Sculpted Couture Bodice */}
          <path
            d="M168 122 L182 134 H222 L236 122 L228 196 H176 L168 122 Z"
            fill={primaryColor}
            stroke="#18181B"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Flared Pleated Ballroom Skirt */}
          <path
            d="M176 196 H228 L296 308 Q202 326 108 308 L176 196 Z"
            fill={primaryColor}
            stroke="#18181B"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* Pleat Highlights */}
          <path
            d="M188 198 L148 310 M202 198 V314 M216 198 L256 310"
            stroke={secondaryColor}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Waist Sash */}
          <rect x="172" y="190" width="60" height="12" rx="6" fill={secondaryColor} stroke="#18181B" strokeWidth="3" />
          <circle cx="202" cy="196" r="5" fill={accentHex} />
        </motion.g>
      );
    }

    case 'belt': {
      // Statement Leather Belt uncoils and locks onto full-body character's waist at (200, 206)
      return (
        <g>
          {isFitted && (
            <motion.circle
              cx="202"
              cy="206"
              r="20"
              fill="none"
              stroke={secondaryColor}
              strokeWidth="5"
              initial={{ scale: 0.4, opacity: 0.9 }}
              animate={{ scale: 3.8, opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            />
          )}
          <motion.g
            initial={{ x: 0, y: -8, scale: 1.85, rotate: -8 }}
            animate={
              isOrdinary
                ? { x: 0, y: -8, scale: 1.85, rotate: -6 }
                : { x: 0, y: 0, scale: 1, rotate: 0 }
            }
            transition={transitionSpec}
            style={{ transformOrigin: '202px 206px' }}
          >
            {/* Fitted Waist Strap */}
            <rect x="160" y="196" width="84" height="20" rx="5" fill={primaryColor} stroke="#18181B" strokeWidth="3.5" />
            {/* Center Gold Boss Buckle */}
            <rect x="184" y="191" width="36" height="30" rx="6" fill={secondaryColor} stroke="#18181B" strokeWidth="3.5" />
            <rect x="191" y="197" width="22" height="18" rx="3" fill={primaryColor} stroke="#18181B" strokeWidth="2.5" />
            <line x1="184" y1="206" x2="202" y2="206" stroke={accentHex} strokeWidth="4" strokeLinecap="round" />
          </motion.g>
        </g>
      );
    }

    case 'socks': {
      // Lightning Crew Socks pull up over ankles & feet (144, 344) and (256, 326)
      return (
        <g>
          {/* Left Crew Sock */}
          <motion.g
            initial={{ x: -24, y: -115, scale: 1.55, rotate: -8 }}
            animate={
              isOrdinary
                ? { x: -24, y: -115, scale: 1.55, rotate: -8 }
                : { x: 0, y: 0, scale: 1, rotate: 8 }
            }
            transition={transitionSpec}
            style={{ transformOrigin: '144px 334px' }}
          >
            <path
              d="M132 292 H158 V342 C158 350 150 354 140 354 H114 C108 354 106 346 112 340 L132 328 V292 Z"
              fill={primaryColor}
              stroke="#18181B"
              strokeWidth="3.5"
            />
            <rect x="132" y="298" width="26" height="6" fill={secondaryColor} />
            <path d="M146 310 L138 324 H148 L140 338" stroke={secondaryColor} strokeWidth="3" strokeLinecap="round" />
          </motion.g>

          {/* Right Crew Sock */}
          <motion.g
            initial={{ x: 24, y: -100, scale: 1.55, rotate: 8 }}
            animate={
              isOrdinary
                ? { x: 24, y: -100, scale: 1.55, rotate: 8 }
                : { x: 0, y: 0, scale: 1, rotate: -12 }
            }
            transition={transitionSpec}
            style={{ transformOrigin: '256px 318px' }}
          >
            <path
              d="M244 276 H270 V326 C270 334 262 338 252 338 H226 C220 338 218 330 224 324 L244 312 V276 Z"
              fill={primaryColor}
              stroke="#18181B"
              strokeWidth="3.5"
            />
            <rect x="244" y="282" width="26" height="6" fill={secondaryColor} />
            <path d="M258 294 L250 308 H260 L252 322" stroke={secondaryColor} strokeWidth="3" strokeLinecap="round" />
          </motion.g>
        </g>
      );
    }

    case 'slippers': {
      // Plush Cloud-Foam House Slippers lock onto feet (144, 344) & (256, 326)
      return (
        <g>
          {/* Left Cloud Slipper */}
          <motion.g
            initial={{ x: -26, y: -115, scale: 1.55, rotate: -5 }}
            animate={
              isOrdinary
                ? { x: -26, y: -115, scale: 1.55, rotate: -5 }
                : { x: 0, y: 0, scale: 1, rotate: 6 }
            }
            transition={transitionSpec}
            style={{ transformOrigin: '144px 344px' }}
          >
            <path
              d="M106 346 C106 322 136 314 172 318 C184 320 190 332 188 346 Z"
              fill={primaryColor}
              stroke="#18181B"
              strokeWidth="3.5"
            />
            <rect x="102" y="344" width="90" height="12" rx="6" fill={secondaryColor} stroke="#18181B" strokeWidth="3" />
          </motion.g>

          {/* Right Cloud Slipper */}
          <motion.g
            initial={{ x: 26, y: -100, scale: 1.55, rotate: 5 }}
            animate={
              isOrdinary
                ? { x: 26, y: -100, scale: 1.55, rotate: 5 }
                : { x: 0, y: 0, scale: 1, rotate: -10 }
            }
            transition={transitionSpec}
            style={{ transformOrigin: '256px 326px' }}
          >
            <path
              d="M218 328 C218 304 248 296 284 300 C296 302 302 314 300 328 Z"
              fill={primaryColor}
              stroke="#18181B"
              strokeWidth="3.5"
            />
            <rect x="214" y="326" width="90" height="12" rx="6" fill={secondaryColor} stroke="#18181B" strokeWidth="3" />
          </motion.g>
        </g>
      );
    }

    case 'necklace': {
      // Royal Diamond-Sapphire Pendant Necklace clasps around character's neck at (200, 242)
      return (
        <motion.g
          initial={{ x: 0, y: -42, scale: 1.55 }}
          animate={
            isOrdinary
              ? { x: 0, y: -42, scale: 1.55 }
              : { x: 0, y: 0, scale: 1 }
          }
          transition={transitionSpec}
          style={{ transformOrigin: '200px 248px' }}
        >
          {/* Gold Chain Draping Around Neck */}
          <path
            d="M168 214 C172 262 228 262 232 214"
            stroke={secondaryColor}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="6 3"
            fill="none"
          />
          {/* Diamond Halo & Sapphire Pendant */}
          <rect
            x="182"
            y="244"
            width="36"
            height="44"
            rx="8"
            fill={secondaryColor}
            stroke="#18181B"
            strokeWidth="3.5"
          />
          <rect
            x="188"
            y="250"
            width="24"
            height="32"
            rx="4"
            fill={primaryColor}
            stroke="#FFFFFF"
            strokeWidth="2"
          />
          {/* Sparkling Diamond Catchlights */}
          {isFitted && (
            <g fill="#FFFFFF">
              <path d="M224 236 L227 246 L237 249 L227 252 L224 262 L221 252 L211 249 L221 246 Z" />
              <path d="M172 264 L174 271 L181 273 L174 275 L172 282 L170 275 L163 273 L170 271 Z" />
            </g>
          )}
        </motion.g>
      );
    }
  }
};
