import React from 'react';
import { ArchetypeId, StyleVariant } from '../../types/store';

interface ProductSvgArtworkProps {
  productId: ArchetypeId;
  variant: StyleVariant;
  className?: string;
  isHovered?: boolean;
}

export const ProductSvgArtwork: React.FC<ProductSvgArtworkProps> = ({
  productId,
  variant,
  className = 'w-full h-full',
  isHovered = false,
}) => {
  const { primaryColor, secondaryColor, accentHex } = variant;

  switch (productId) {
    case 'sunglasses':
      return (
        <svg
          viewBox="0 0 320 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          role="img"
          aria-label="Hero Sunglasses illustration"
        >
          <defs>
            <linearGradient id="sg-lens-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={primaryColor} />
              <stop offset="60%" stopColor="#18181B" />
              <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.85" />
            </linearGradient>
            <radialGradient id="sg-shadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#18181B" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#18181B" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="160" cy="182" rx={isHovered ? '88' : '96'} ry="12" fill="url(#sg-shadow)" />

          <g
            style={{
              transform: isHovered ? 'translateY(-6px) scale(1.03)' : 'translateY(0px) scale(1)',
              transformOrigin: '160px 110px',
              transition: 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <path
              d="M44 92 L92 64 C98 60 105 62 108 66"
              stroke={primaryColor}
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M276 92 L228 64 C222 60 215 62 212 66"
              stroke={primaryColor}
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path d="M36 92 H284" stroke={secondaryColor} strokeWidth="4.5" strokeLinecap="round" />
            <path
              d="M142 98 C152 88, 168 88, 178 98"
              stroke={primaryColor}
              strokeWidth="7"
              strokeLinecap="round"
            />
            <rect
              x="40"
              y="88"
              width="106"
              height="62"
              rx="14"
              fill="url(#sg-lens-grad)"
              stroke={primaryColor}
              strokeWidth="7"
            />
            <rect
              x="174"
              y="88"
              width="106"
              height="62"
              rx="14"
              fill="url(#sg-lens-grad)"
              stroke={primaryColor}
              strokeWidth="7"
            />
            <path
              d="M62 100 L88 138 M78 100 L96 126"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
              strokeOpacity="0.65"
            />
            <path
              d="M196 100 L222 138 M212 100 L230 126"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
              strokeOpacity="0.65"
            />
            <circle cx="50" cy="98" r="3" fill={accentHex} />
            <circle cx="136" cy="98" r="3" fill={accentHex} />
            <circle cx="184" cy="98" r="3" fill={accentHex} />
            <circle cx="270" cy="98" r="3" fill={accentHex} />
          </g>
        </svg>
      );

    case 'sneakers':
      return (
        <svg
          viewBox="0 0 320 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          role="img"
          aria-label="Velocity Apex Sneakers illustration"
        >
          <ellipse cx="160" cy="186" rx="104" ry="12" fill="#18181B" fillOpacity="0.12" />
          <g
            style={{
              transform: isHovered ? 'translateY(-7px) rotate(-4deg)' : 'translateY(0px) rotate(0deg)',
              transformOrigin: '160px 130px',
              transition: 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <g transform="translate(22, -16) scale(0.92)" opacity="0.55">
              <path
                d="M56 154 H260 C268 154 274 146 270 138 L254 114 L182 96 L136 66 H92 L62 110 C50 124 46 154 56 154 Z"
                fill={primaryColor}
              />
              <rect x="52" y="148" width="220" height="18" rx="9" fill="#FFFFFF" stroke="#18181B" strokeWidth="3" />
            </g>

            <path
              d="M52 152 H262 C272 152 276 140 268 130 L240 108 L178 90 L138 56 C134 52 126 52 120 56 L96 76 C88 68 74 68 68 78 L56 116 C46 130 44 152 52 152 Z"
              fill={primaryColor}
              stroke="#18181B"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <path
              d="M98 118 L156 104 L144 124 L214 116 L162 140 L170 124 L98 134 Z"
              fill={secondaryColor}
              stroke="#18181B"
              strokeWidth="2.5"
            />
            <path
              d="M138 72 L156 64 M150 82 L168 74 M162 92 L180 84 M174 100 L192 92"
              stroke="#FFFFFF"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <path
              d="M46 148 H270 C276 148 280 154 278 160 L272 168 C270 172 264 174 258 174 H54 C46 174 40 168 42 160 L46 148 Z"
              fill="#FFFFFF"
              stroke="#18181B"
              strokeWidth="4"
            />
            <rect x="70" y="156" width="36" height="8" rx="4" fill={accentHex} />
            <rect x="118" y="156" width="28" height="8" rx="4" fill={secondaryColor} />
            <rect x="210" y="156" width="42" height="8" rx="4" fill={accentHex} />
          </g>
        </svg>
      );

    case 'watch':
      return (
        <svg
          viewBox="0 0 320 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          role="img"
          aria-label="Sovereign Chrono Wristwatch illustration"
        >
          <ellipse cx="160" cy="192" rx="70" ry="10" fill="#18181B" fillOpacity="0.14" />
          <g
            style={{
              transform: isHovered ? 'translateY(-5px) scale(1.04)' : 'translateY(0px) scale(1)',
              transformOrigin: '160px 110px',
              transition: 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <rect x="132" y="18" width="56" height="44" rx="6" fill={primaryColor} stroke="#18181B" strokeWidth="3.5" />
            <line x1="132" y1="34" x2="188" y2="34" stroke="#18181B" strokeWidth="2.5" />
            <line x1="132" y1="48" x2="188" y2="48" stroke="#18181B" strokeWidth="2.5" />

            <rect x="132" y="154" width="56" height="44" rx="6" fill={primaryColor} stroke="#18181B" strokeWidth="3.5" />
            <line x1="132" y1="168" x2="188" y2="168" stroke="#18181B" strokeWidth="2.5" />
            <line x1="132" y1="182" x2="188" y2="182" stroke="#18181B" strokeWidth="2.5" />

            <rect x="214" y="100" width="12" height="18" rx="3" fill={secondaryColor} stroke="#18181B" strokeWidth="3" />

            <circle cx="160" cy="108" r="56" fill={primaryColor} stroke="#18181B" strokeWidth="4" />
            <circle cx="160" cy="108" r="44" fill="#09090B" stroke={secondaryColor} strokeWidth="3" />
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <line
                key={deg}
                x1="160"
                y1="69"
                x2="160"
                y2={deg % 90 === 0 ? '76' : '73'}
                stroke={secondaryColor}
                strokeWidth={deg % 90 === 0 ? '3' : '1.5'}
                transform={`rotate(${deg} 160 108)`}
              />
            ))}
            <line x1="160" y1="108" x2="142" y2="86" stroke={secondaryColor} strokeWidth="4" strokeLinecap="round" />
            <line x1="160" y1="108" x2="186" y2="84" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
            <circle cx="160" cy="108" r="5" fill={accentHex} />
          </g>
        </svg>
      );

    case 'headphones':
      return (
        <svg
          viewBox="0 0 320 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          role="img"
          aria-label="BassDrop Studio Headphones illustration"
        >
          <ellipse cx="160" cy="190" rx="84" ry="11" fill="#18181B" fillOpacity="0.13" />
          <g
            style={{
              transform: isHovered ? 'translateY(-6px) scale(1.03)' : 'translateY(0px) scale(1)',
              transformOrigin: '160px 110px',
              transition: 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <path
              d="M88 124 V96 C88 52 120 26 160 26 C200 26 232 52 232 96 V124"
              stroke={primaryColor}
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              d="M98 84 C98 54 125 34 160 34 C195 34 222 54 222 84"
              stroke={secondaryColor}
              strokeWidth="5"
              strokeLinecap="round"
            />
            <rect x="66" y="102" width="38" height="68" rx="19" fill={primaryColor} stroke="#18181B" strokeWidth="4" />
            <rect x="92" y="108" width="18" height="56" rx="9" fill="#18181B" />
            <circle cx="82" cy="136" r="8" fill={secondaryColor} />

            <rect x="216" y="102" width="38" height="68" rx="19" fill={primaryColor} stroke="#18181B" strokeWidth="4" />
            <rect x="210" y="108" width="18" height="56" rx="9" fill="#18181B" />
            <circle cx="238" cy="136" r="8" fill={secondaryColor} />
          </g>
        </svg>
      );

    case 'lipstick':
      return (
        <svg
          viewBox="0 0 320 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          role="img"
          aria-label="Velvet Nova Lipstick illustration"
        >
          <ellipse cx="160" cy="190" rx="68" ry="10" fill="#18181B" fillOpacity="0.13" />
          <g
            style={{
              transform: isHovered ? 'translateY(-6px) rotate(-3deg)' : 'translateY(0px) rotate(0deg)',
              transformOrigin: '160px 115px',
              transition: 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <path
              d="M126 96 V50 C126 36 164 22 164 40 V96 H126 Z"
              fill={primaryColor}
              stroke="#18181B"
              strokeWidth="3.5"
            />
            <ellipse
              cx="146"
              cy="42"
              rx="16"
              ry="9"
              transform="rotate(-24 146 42)"
              fill={secondaryColor}
              stroke="#18181B"
              strokeWidth="2.5"
            />
            <rect x="120" y="88" width="50" height="38" rx="4" fill="#F4F4F5" stroke="#18181B" strokeWidth="3.5" />
            <rect x="120" y="96" width="50" height="6" fill={accentHex} />
            <rect x="114" y="122" width="62" height="62" rx="8" fill="#18181B" stroke="#18181B" strokeWidth="3.5" />
            <rect x="124" y="132" width="8" height="42" rx="4" fill="#3F3F46" />
            <rect
              x="194"
              y="118"
              width="48"
              height="66"
              rx="8"
              transform="rotate(14 194 118)"
              fill={primaryColor}
              stroke="#18181B"
              strokeWidth="3.5"
            />
          </g>
        </svg>
      );

    case 'tshirt':
      return (
        <svg
          viewBox="0 0 320 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          role="img"
          aria-label="Deconstructed Celebrity Tee illustration"
        >
          <ellipse cx="160" cy="190" rx="88" ry="11" fill="#18181B" fillOpacity="0.12" />
          <g
            style={{
              transform: isHovered ? 'translateY(-5px) scale(1.03)' : 'translateY(0px) scale(1)',
              transformOrigin: '160px 110px',
              transition: 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <path d="M98 54 L54 84 L72 114 L104 94 Z" fill={primaryColor} stroke="#18181B" strokeWidth="3.5" strokeLinejoin="round" />
            <path d="M222 54 L266 84 L248 114 L216 94 Z" fill={primaryColor} stroke="#18181B" strokeWidth="3.5" strokeLinejoin="round" />
            <path
              d="M98 54 H222 V172 C222 176 218 180 214 180 H106 C102 180 98 176 98 172 V54 Z"
              fill={primaryColor}
              stroke="#18181B"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <path
              d="M128 54 C128 72 192 72 192 54 C192 48 128 48 128 54 Z"
              fill={secondaryColor}
              stroke="#18181B"
              strokeWidth="3.5"
            />
            <rect x="126" y="92" width="68" height="26" rx="4" fill={secondaryColor} stroke="#18181B" strokeWidth="2.5" />
            <path d="M138 105 H182" stroke="#18181B" strokeWidth="4" strokeLinecap="round" />
          </g>
        </svg>
      );

    case 'perfume':
      return (
        <svg
          viewBox="0 0 320 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          role="img"
          aria-label="Noir Plot-Twist Eau de Parfum illustration"
        >
          <ellipse cx="160" cy="190" rx="76" ry="10" fill="#18181B" fillOpacity="0.14" />
          <g
            style={{
              transform: isHovered ? 'translateY(-6px) scale(1.03)' : 'translateY(0px) scale(1)',
              transformOrigin: '160px 115px',
              transition: 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <rect x="138" y="28" width="44" height="28" rx="6" fill="#18181B" stroke={secondaryColor} strokeWidth="3" />
            <rect x="148" y="56" width="24" height="16" fill="#F59E0B" stroke="#18181B" strokeWidth="3" />
            <path
              d="M112 72 H208 L224 96 V166 C224 174 218 180 210 180 H110 C102 180 96 174 96 166 V96 L112 72 Z"
              fill={primaryColor}
              stroke="#18181B"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <path
              d="M106 112 H214 V164 C214 168 210 170 206 170 H114 C110 170 106 168 106 164 V112 Z"
              fill={secondaryColor}
              fillOpacity="0.45"
            />
            <rect x="124" y="102" width="72" height="48" rx="4" fill="#FAF8F5" stroke="#18181B" strokeWidth="3" />
            <line x1="138" y1="120" x2="182" y2="120" stroke="#18181B" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="146" y1="132" x2="174" y2="132" stroke={primaryColor} strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </svg>
      );

    case 'backpack':
      return (
        <svg
          viewBox="0 0 320 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          role="img"
          aria-label="Quantum Cram Backpack illustration"
        >
          <ellipse cx="160" cy="192" rx="84" ry="11" fill="#18181B" fillOpacity="0.14" />
          <g
            style={{
              transform: isHovered ? 'translateY(-6px) scale(1.03)' : 'translateY(0px) scale(1)',
              transformOrigin: '160px 115px',
              transition: 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <path d="M140 44 C140 26 180 26 180 44" stroke="#18181B" strokeWidth="7" strokeLinecap="round" />
            <path d="M104 68 C82 88 82 148 104 166" stroke="#18181B" strokeWidth="8" strokeLinecap="round" />
            <path d="M216 68 C238 88 238 148 216 166" stroke="#18181B" strokeWidth="8" strokeLinecap="round" />
            <path
              d="M102 92 C102 56 124 42 160 42 C196 42 218 56 218 92 V168 C218 176 212 182 204 182 H116 C108 182 102 176 102 168 V92 Z"
              fill={primaryColor}
              stroke="#18181B"
              strokeWidth="4"
            />
            <path d="M106 94 C122 82 198 82 214 94" stroke={secondaryColor} strokeWidth="5" strokeDasharray="6 4" />
            <rect x="118" y="114" width="84" height="52" rx="12" fill={secondaryColor} stroke="#18181B" strokeWidth="3.5" />
            <line x1="128" y1="130" x2="192" y2="130" stroke="#18181B" strokeWidth="3" strokeLinecap="round" />
            <rect
              x="152"
              y="58"
              width="16"
              height="16"
              rx="3"
              transform="rotate(45 160 66)"
              fill="#FAF8F5"
              stroke="#18181B"
              strokeWidth="2.5"
            />
          </g>
        </svg>
      );

    case 'jeans':
      return (
        <svg
          viewBox="0 0 320 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          role="img"
          aria-label="Selvedge Denim Jeans illustration"
        >
          <ellipse cx="160" cy="194" rx="76" ry="10" fill="#18181B" fillOpacity="0.14" />
          <g
            style={{
              transform: isHovered ? 'translateY(-6px) scale(1.04)' : 'translateY(0px) scale(1)',
              transformOrigin: '160px 110px',
              transition: 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Denim Legs & Waistband */}
            <path
              d="M112 30 H208 L224 176 H178 L160 98 L142 176 H96 L112 30 Z"
              fill={primaryColor}
              stroke="#18181B"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Waistband & Copper Button */}
            <rect x="112" y="30" width="96" height="18" fill={primaryColor} stroke="#18181B" strokeWidth="3.5" />
            <circle cx="160" cy="39" r="4" fill={accentHex} />
            {/* Contrast Gold/Amber Selvedge Stitching */}
            <path d="M114 68 Q134 68 138 48 M206 68 Q186 68 182 48" stroke={secondaryColor} strokeWidth="2.5" fill="none" />
            <line x1="160" y1="48" x2="160" y2="88" stroke={secondaryColor} strokeWidth="2.5" strokeDasharray="4 3" />
            {/* Turned-Up Selvedge Cuffs */}
            <rect x="94" y="164" width="50" height="14" rx="3" fill={secondaryColor} stroke="#18181B" strokeWidth="3" />
            <rect x="176" y="164" width="50" height="14" rx="3" fill={secondaryColor} stroke="#18181B" strokeWidth="3" />
          </g>
        </svg>
      );

    case 'shirt':
      return (
        <svg
          viewBox="0 0 320 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          role="img"
          aria-label="Button-Down Dress Shirt illustration"
        >
          <ellipse cx="160" cy="192" rx="86" ry="10" fill="#18181B" fillOpacity="0.13" />
          <g
            style={{
              transform: isHovered ? 'translateY(-6px) scale(1.03)' : 'translateY(0px) scale(1)',
              transformOrigin: '160px 110px',
              transition: 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Long Tailored Sleeves */}
            <path d="M104 52 L56 146 L82 158 L112 94 Z" fill={primaryColor} stroke="#18181B" strokeWidth="3.5" strokeLinejoin="round" />
            <path d="M216 52 L264 146 L238 158 L208 94 Z" fill={primaryColor} stroke="#18181B" strokeWidth="3.5" strokeLinejoin="round" />
            {/* Main Shirt Body */}
            <rect x="102" y="48" width="116" height="130" rx="8" fill={primaryColor} stroke="#18181B" strokeWidth="4" />
            {/* Center Button Placket */}
            <rect x="153" y="54" width="14" height="124" fill={secondaryColor} stroke="#18181B" strokeWidth="2.5" />
            {[74, 98, 122, 146].map((cy) => (
              <circle key={cy} cx="160" cy={cy} r="3" fill="#FFFFFF" stroke="#18181B" strokeWidth="1.5" />
            ))}
            {/* Pointed Spread Collar */}
            <path d="M128 42 L160 66 L140 76 L118 52 Z" fill={secondaryColor} stroke="#18181B" strokeWidth="3" />
            <path d="M192 42 L160 66 L180 76 L202 52 Z" fill={secondaryColor} stroke="#18181B" strokeWidth="3" />
            {/* Breast Pocket */}
            <path d="M178 86 H204 V112 L191 120 L178 112 V86 Z" fill={primaryColor} stroke="#18181B" strokeWidth="2.5" />
          </g>
        </svg>
      );

    case 'makeup':
      return (
        <svg
          viewBox="0 0 320 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          role="img"
          aria-label="Luxury Makeup Palette illustration"
        >
          <ellipse cx="160" cy="192" rx="92" ry="10" fill="#18181B" fillOpacity="0.14" />
          <g
            style={{
              transform: isHovered ? 'translateY(-6px) scale(1.03)' : 'translateY(0px) scale(1)',
              transformOrigin: '160px 110px',
              transition: 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Top Mirror Lid */}
            <rect x="76" y="24" width="168" height="74" rx="10" fill={primaryColor} stroke="#18181B" strokeWidth="4" />
            <rect x="88" y="34" width="144" height="54" rx="6" fill="#E0F2FE" stroke={secondaryColor} strokeWidth="2.5" />
            <path d="M104 42 L134 80 M122 42 L144 70" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
            {/* Bottom Palette Tray */}
            <rect x="68" y="102" width="184" height="76" rx="10" fill="#18181B" stroke={secondaryColor} strokeWidth="3.5" />
            {/* 6 Shimmering Eyeshadow Pans */}
            {[98, 134, 170].map((cx, i) => (
              <React.Fragment key={cx}>
                <circle cx={cx} cy="124" r="12" fill={i === 0 ? primaryColor : i === 1 ? secondaryColor : accentHex} stroke="#FFFFFF" strokeWidth="1.5" />
                <circle cx={cx} cy="154" r="12" fill={i === 0 ? accentHex : i === 1 ? primaryColor : secondaryColor} stroke="#FFFFFF" strokeWidth="1.5" />
              </React.Fragment>
            ))}
            {/* Blush Pan */}
            <rect x="196" y="114" width="42" height="52" rx="6" fill={primaryColor} stroke={secondaryColor} strokeWidth="2" />
          </g>
        </svg>
      );

    case 'frock':
      return (
        <svg
          viewBox="0 0 320 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          role="img"
          aria-label="Couture Party Frock illustration"
        >
          <ellipse cx="160" cy="194" rx="94" ry="10" fill="#18181B" fillOpacity="0.14" />
          <g
            style={{
              transform: isHovered ? 'translateY(-6px) scale(1.04)' : 'translateY(0px) scale(1)',
              transformOrigin: '160px 110px',
              transition: 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Sculpted Bodice */}
            <path
              d="M128 34 L144 46 H176 L192 34 L184 94 H136 L128 34 Z"
              fill={primaryColor}
              stroke="#18181B"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Flared Pleated A-Line Skirt */}
            <path
              d="M136 94 H184 L244 176 Q160 190 76 176 L136 94 Z"
              fill={primaryColor}
              stroke="#18181B"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Pleat Fold Lines */}
            <path
              d="M146 96 L112 178 M160 96 V182 M174 96 L208 178"
              stroke={secondaryColor}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Cinched Waist Ribbon Sash */}
            <rect x="132" y="88" width="56" height="12" rx="6" fill={secondaryColor} stroke="#18181B" strokeWidth="3" />
            <circle cx="160" cy="94" r="5" fill={accentHex} />
          </g>
        </svg>
      );

    case 'belt':
      return (
        <svg
          viewBox="0 0 320 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          role="img"
          aria-label="Signature Statement Belt illustration"
        >
          <ellipse cx="160" cy="188" rx="96" ry="11" fill="#18181B" fillOpacity="0.14" />
          <g
            style={{
              transform: isHovered ? 'translateY(-6px) scale(1.04)' : 'translateY(0px) scale(1)',
              transformOrigin: '160px 115px',
              transition: 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Coiled Leather Strap */}
            <ellipse cx="160" cy="112" rx="92" ry="42" fill="none" stroke={primaryColor} strokeWidth="22" />
            <ellipse cx="160" cy="112" rx="92" ry="42" fill="none" stroke="#18181B" strokeWidth="4" />
            <ellipse cx="160" cy="104" rx="70" ry="28" fill="none" stroke={primaryColor} strokeWidth="18" />
            <ellipse cx="160" cy="104" rx="70" ry="28" fill="none" stroke="#18181B" strokeWidth="3.5" />
            {/* Sculpted Gold Statement Buckle */}
            <rect
              x="124"
              y="122"
              width="72"
              height="46"
              rx="12"
              fill={secondaryColor}
              stroke="#18181B"
              strokeWidth="4"
            />
            <rect x="136" y="132" width="48" height="26" rx="6" fill={primaryColor} stroke="#18181B" strokeWidth="3" />
            <line x1="124" y1="145" x2="156" y2="145" stroke={accentHex} strokeWidth="6" strokeLinecap="round" />
          </g>
        </svg>
      );

    case 'socks':
      return (
        <svg
          viewBox="0 0 320 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          role="img"
          aria-label="Lightning Crew Socks illustration"
        >
          <ellipse cx="160" cy="190" rx="84" ry="10" fill="#18181B" fillOpacity="0.13" />
          <g
            style={{
              transform: isHovered ? 'translateY(-7px) rotate(-4deg)' : 'translateY(0px) rotate(0deg)',
              transformOrigin: '160px 115px',
              transition: 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Back Sock */}
            <g transform="translate(36, -8)" opacity="0.7">
              <path
                d="M124 34 H172 V126 C172 142 162 154 146 158 L102 170 C90 172 82 162 86 150 L124 118 V34 Z"
                fill={primaryColor}
                stroke="#18181B"
                strokeWidth="3.5"
              />
            </g>
            {/* Front Hero Sock */}
            <path
              d="M118 38 H168 V132 C168 148 158 160 142 164 L96 176 C82 178 74 166 80 152 L118 122 V38 Z"
              fill={primaryColor}
              stroke="#18181B"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Ribbed Cuff Stripes */}
            <rect x="118" y="48" width="50" height="8" fill={secondaryColor} />
            <rect x="118" y="62" width="50" height="8" fill={accentHex} />
            {/* Lightning Bolt Knit Graphic */}
            <path d="M146 78 L132 104 H146 L134 128" stroke={secondaryColor} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      );

    case 'slippers':
      return (
        <svg
          viewBox="0 0 320 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          role="img"
          aria-label="Cloud-Foam House Slippers illustration"
        >
          <ellipse cx="160" cy="188" rx="98" ry="11" fill="#18181B" fillOpacity="0.14" />
          <g
            style={{
              transform: isHovered ? 'translateY(-6px) scale(1.03)' : 'translateY(0px) scale(1)',
              transformOrigin: '160px 125px',
              transition: 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Plush Quilted Slipper Upper */}
            <path
              d="M58 148 C58 96 124 72 198 78 C242 82 268 112 266 148 Z"
              fill={primaryColor}
              stroke="#18181B"
              strokeWidth="4"
            />
            {/* Cozy Sherpa Collar Opening */}
            <ellipse cx="104" cy="116" rx="34" ry="20" transform="rotate(-18 104 116)" fill="#27272A" stroke={secondaryColor} strokeWidth="3.5" />
            {/* Quilted Puffer Ridges */}
            <path d="M148 78 C158 102 158 128 148 148 M188 78 C198 102 198 128 188 148 M224 88 C232 108 232 128 224 148" stroke="#18181B" strokeWidth="3" strokeLinecap="round" />
            {/* Thick Cloud Cushion Outsole */}
            <rect x="48" y="144" width="224" height="24" rx="12" fill={secondaryColor} stroke="#18181B" strokeWidth="4" />
          </g>
        </svg>
      );

    case 'necklace':
      return (
        <svg
          viewBox="0 0 320 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          role="img"
          aria-label="Royal Diamond Pendant Necklace illustration"
        >
          <ellipse cx="160" cy="194" rx="74" ry="9" fill="#18181B" fillOpacity="0.14" />
          <g
            style={{
              transform: isHovered ? 'translateY(-6px) scale(1.04)' : 'translateY(0px) scale(1)',
              transformOrigin: '160px 110px',
              transition: 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Gold Link Chain */}
            <path
              d="M88 28 C96 112 224 112 232 28"
              stroke={secondaryColor}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="8 4"
            />
            {/* Pendant Bail */}
            <rect x="153" y="88" width="14" height="20" rx="5" fill={secondaryColor} stroke="#18181B" strokeWidth="3" />
            {/* Diamond Halo Frame */}
            <rect
              x="126"
              y="104"
              width="68"
              height="80"
              rx="12"
              fill={secondaryColor}
              stroke="#18181B"
              strokeWidth="4"
            />
            {/* Faceted Emerald-Cut Center Gemstone */}
            <rect
              x="138"
              y="116"
              width="44"
              height="56"
              rx="6"
              fill={primaryColor}
              stroke="#FFFFFF"
              strokeWidth="2.5"
            />
            <path d="M146 124 L174 164 M174 124 L146 164" stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="2" />
            {/* Star Catchlight */}
            <path d="M188 96 L192 108 L204 112 L192 116 L188 128 L184 116 L172 112 L184 108 Z" fill="#FFFFFF" />
          </g>
        </svg>
      );
  }
};
