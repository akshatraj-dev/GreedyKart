import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TransformationStage } from '../../types/store';

interface EmojiParticlesProps {
  emojis: [string, string, string];
  stage: TransformationStage;
  burstKey: number;
  reducedMotion: boolean;
}

interface ParticleItem {
  id: string;
  emoji: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  scale: number;
  delay: number;
  rotate: number;
}

const PARTICLE_VECTORS = [
  { startX: 35, startY: 52, endX: 18, endY: 22, scale: 1.15, delay: 0.04, rotate: -18 },
  { startX: 65, startY: 52, endX: 82, endY: 20, scale: 1.2, delay: 0.08, rotate: 22 },
  { startX: 28, startY: 62, endX: 14, endY: 42, scale: 1.0, delay: 0.14, rotate: -14 },
  { startX: 72, startY: 62, endX: 86, endY: 40, scale: 1.05, delay: 0.18, rotate: 16 },
  { startX: 46, startY: 38, endX: 36, endY: 14, scale: 1.25, delay: 0.1, rotate: -10 },
  { startX: 54, startY: 38, endX: 64, endY: 14, scale: 1.15, delay: 0.22, rotate: 12 },
  { startX: 32, startY: 45, endX: 22, endY: 30, scale: 0.95, delay: 0.26, rotate: -20 },
  { startX: 68, startY: 45, endX: 78, endY: 28, scale: 0.95, delay: 0.3, rotate: 20 },
];

export const EmojiParticles: React.FC<EmojiParticlesProps> = ({
  emojis,
  stage,
  burstKey,
  reducedMotion,
}) => {
  const [activeParticles, setActiveParticles] = useState<ParticleItem[]>([]);

  useEffect(() => {
    const shouldEmit = stage === 'transforming' || stage === 'reveal' || burstKey > 0;
    if (!shouldEmit) {
      setActiveParticles([]);
      return;
    }

    const generated: ParticleItem[] = PARTICLE_VECTORS.map((vec, index) => ({
      id: `${stage}-${burstKey}-${index}`,
      emoji: emojis[index % emojis.length],
      ...vec,
    }));

    setActiveParticles(generated);

    const cleanupTimer = window.setTimeout(() => {
      setActiveParticles([]);
    }, reducedMotion ? 1400 : 2100);

    return () => {
      window.clearTimeout(cleanupTimer);
    };
  }, [stage, burstKey, emojis, reducedMotion]);

  return (
    <div
      className="pointer-events-none select-none absolute inset-0 overflow-hidden z-20"
      aria-hidden="true"
    >
      <AnimatePresence>
        {activeParticles.map((p) => (
          <motion.span
            key={p.id}
            initial={
              reducedMotion
                ? { opacity: 0, left: `${p.endX}%`, top: `${p.endY}%`, scale: 0.9 }
                : {
                    opacity: 0,
                    left: `${p.startX}%`,
                    top: `${p.startY}%`,
                    scale: 0.3,
                    rotate: 0,
                  }
            }
            animate={
              reducedMotion
                ? { opacity: [0, 0.95, 0], scale: 1 }
                : {
                    opacity: [0, 1, 1, 0],
                    left: `${p.endX}%`,
                    top: `${p.endY}%`,
                    scale: [0.3, p.scale, p.scale * 0.9],
                    rotate: p.rotate,
                  }
            }
            exit={{ opacity: 0 }}
            transition={{
              duration: reducedMotion ? 0.8 : 1.45,
              delay: reducedMotion ? 0 : p.delay,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute text-2xl sm:text-3xl drop-shadow-md will-change-transform"
          >
            {p.emoji}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
};
