import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductTransformationConfig, TransformationStage } from '../../types/store';

interface AnimatedHeadlineProps {
  config: ProductTransformationConfig;
  stage: TransformationStage;
  isTurboRunning?: boolean;
  reducedMotion: boolean;
}

export const AnimatedHeadline: React.FC<AnimatedHeadlineProps> = ({
  config,
  stage,
  isTurboRunning = false,
  reducedMotion,
}) => {
  const isRevealed = stage === 'reveal' || stage === 'details';

  return (
    <div className="relative z-20 text-center px-4 min-h-[108px] flex flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        {(stage === 'idle' || stage === 'preparing') && (
          <motion.div
            key="ordinary"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="max-w-xl"
          >
            <p className="text-xs font-mono tracking-wider text-zinc-400 mb-1.5">
              SCENE 01 · ORDINARY BEGINNING
            </p>
            <h3 className="font-display text-lg sm:text-2xl font-bold text-zinc-100 tracking-tight [text-wrap:balance]">
              {config.ordinaryCaption}
            </h3>
          </motion.div>
        )}

        {stage === 'transforming' && (
          <motion.div
            key="transforming"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.25 }}
            className="max-w-xl"
          >
            <p className="text-xs font-mono tracking-wider text-amber-300 mb-1.5">
              SCENE 02 · TRANSFORMATION IN PROGRESS
            </p>
            <h3 className="font-display text-lg sm:text-2xl font-bold text-amber-200 tracking-tight [text-wrap:balance]">
              {config.transformingCaption}
            </h3>
          </motion.div>
        )}

        {isRevealed && (
          <motion.div
            key="reveal"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 14, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            <p className="text-xs font-mono tracking-wider text-amber-400 mb-1">
              {config.modeName.toUpperCase()} · {config.emojis.join(' ')}
            </p>
            <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-tight [text-wrap:balance]">
              {isTurboRunning
                ? 'MAXIMUM VELOCITY: RESPONSIBILITIES CANNOT CATCH YOU.'
                : config.finalHeadline}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed [text-wrap:balance]">
              {config.supportingJoke}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
