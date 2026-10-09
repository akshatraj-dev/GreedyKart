import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import {
  Product,
  ProductId,
  StyleVariant,
  TransformationStage,
} from '../../types/store';
import { CinematicBackdrop } from './CinematicBackdrop';
import { EmojiParticles } from './EmojiParticles';
import { TransformationSequence } from './TransformationSequence';
import { AnimatedHeadline } from './AnimatedHeadline';
import { TransformationControls } from './TransformationControls';
import { ProductPurchasePanel } from './ProductPurchasePanel';

interface AnimatedProductExperienceProps {
  product: Product | null;
  allProducts: Product[];
  reducedMotion: boolean;
  getCartCountForProduct: (productId: ProductId) => number;
  onClose: () => void;
  onSelectProduct: (productId: ProductId) => void;
  onAddToCart: (product: Product, variant: StyleVariant, quantity: number) => void;
}

const STAGE_STEPS: { id: TransformationStage; label: string }[] = [
  { id: 'preparing', label: '01. Ordinary' },
  { id: 'transforming', label: '02. Transform' },
  { id: 'reveal', label: '03. Hero Reveal' },
  { id: 'details', label: '04. Shop' },
];

export const AnimatedProductExperience: React.FC<AnimatedProductExperienceProps> = ({
  product,
  allProducts,
  reducedMotion,
  getCartCountForProduct,
  onClose,
  onSelectProduct,
  onAddToCart,
}) => {
  const [stage, setStage] = useState<TransformationStage>('idle');
  const [selectedVariant, setSelectedVariant] = useState<StyleVariant | null>(null);
  const [burstKey, setBurstKey] = useState<number>(0);
  const [isTurboRunning, setIsTurboRunning] = useState<boolean>(false);

  const timersRef = useRef<number[]>([]);

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach((timerId) => window.clearTimeout(timerId));
    timersRef.current = [];
  }, []);

  const startTransformationSequence = useCallback(
    (targetProduct: Product) => {
      clearAllTimers();
      setIsTurboRunning(false);
      setStage('preparing');

      const { preparingMs, transformingMs, revealMs } =
        targetProduct.transformation.stageTimings;

      const t1 = window.setTimeout(
        () => {
          setStage('transforming');
          setBurstKey((prev) => prev + 1);
        },
        reducedMotion ? 450 : preparingMs
      );

      const t2 = window.setTimeout(
        () => {
          setStage('reveal');
          setBurstKey((prev) => prev + 1);
        },
        reducedMotion ? 950 : preparingMs + transformingMs
      );

      const t3 = window.setTimeout(
        () => {
          setStage('details');
        },
        reducedMotion ? 1350 : preparingMs + transformingMs + revealMs
      );

      timersRef.current.push(t1, t2, t3);
    },
    [clearAllTimers, reducedMotion]
  );

  // Trigger sequence whenever product changes or opens
  useEffect(() => {
    if (!product) {
      clearAllTimers();
      setStage('idle');
      return;
    }

    setSelectedVariant(product.variants[0]);
    startTransformationSequence(product);

    return () => {
      clearAllTimers();
    };
  }, [product, clearAllTimers, startTransformationSequence]);

  // Escape key handler
  useEffect(() => {
    if (!product) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        clearAllTimers();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, clearAllTimers, onClose]);

  if (!product) return null;

  const activeVariant = selectedVariant || product.variants[0];

  const handleReplay = () => {
    startTransformationSequence(product);
  };

  const handleCycleStyle = () => {
    const currentIndex = product.variants.findIndex((v) => v.id === activeVariant.id);
    const nextVariant = product.variants[(currentIndex + 1) % product.variants.length];
    setSelectedVariant(nextVariant);
    setBurstKey((prev) => prev + 1);
  };

  const handleSkipToDetails = () => {
    clearAllTimers();
    setStage('details');
    setBurstKey((prev) => prev + 1);
  };

  const handleTriggerSpecialAction = () => {
    // Sneakers "UNLOCK RUNNING MODE" special overdrive animation
    setIsTurboRunning((prev) => !prev);
    setStage('reveal');
    setBurstKey((prev) => prev + 1);
  };

  const handleCloseModal = () => {
    clearAllTimers();
    onClose();
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} Main Character Energy transformation`}
      >
        <motion.div
          key={product.id}
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-6xl rounded-2xl overflow-hidden bg-zinc-950 border border-white/15 shadow-2xl flex flex-col lg:flex-row max-h-[94vh]"
        >
          {/* Left / Top: Cinematic Transformation Stage */}
          <div className="relative flex-1 flex flex-col justify-between min-h-[420px] sm:min-h-[500px] overflow-hidden">
            {/* Dynamic Backdrop */}
            <CinematicBackdrop
              theme={product.transformation.backdropTheme}
              stage={stage}
              variant={activeVariant}
              isTurboRunning={isTurboRunning}
              reducedMotion={reducedMotion}
            />

            {/* Contextual Emoji Particles */}
            <EmojiParticles
              emojis={product.transformation.emojis}
              stage={stage}
              burstKey={burstKey}
              reducedMotion={reducedMotion}
            />

            {/* Stage Header Bar */}
            <div className="relative z-20 flex items-center justify-between gap-3 px-4 sm:px-6 pt-4">
              {/* Interactive Scene Progress Bar */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {STAGE_STEPS.map((step) => {
                  const isActiveStep = stage === step.id;
                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => {
                        clearAllTimers();
                        setStage(step.id);
                        if (step.id === 'transforming' || step.id === 'reveal') {
                          setBurstKey((prev) => prev + 1);
                        }
                      }}
                      className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        isActiveStep
                          ? 'bg-amber-400 text-zinc-950 font-bold'
                          : 'bg-white/10 text-zinc-300 hover:bg-white/20'
                      }`}
                    >
                      {step.label}
                    </button>
                  );
                })}
              </div>

              {/* Mobile-visible Close button on stage top-right */}
              <button
                type="button"
                onClick={handleCloseModal}
                aria-label="Close modal"
                className="lg:hidden inline-flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900/90 text-zinc-200 hover:text-white border border-white/15 cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Central Unified Real-Photo + SVG Character Alignment Stage */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-2">
              <TransformationSequence
                product={product}
                stage={stage}
                variant={activeVariant}
                isTurboRunning={isTurboRunning}
                reducedMotion={reducedMotion}
              />

              <AnimatedHeadline
                config={product.transformation}
                stage={stage}
                isTurboRunning={isTurboRunning}
                reducedMotion={reducedMotion}
              />
            </div>

            {/* Bottom Stage Controls & Product Switcher */}
            <TransformationControls
              product={product}
              allProducts={allProducts}
              stage={stage}
              isTurboRunning={isTurboRunning}
              onReplay={handleReplay}
              onCycleStyle={handleCycleStyle}
              onSkipToDetails={handleSkipToDetails}
              onTriggerSpecialAction={handleTriggerSpecialAction}
              onSelectProduct={onSelectProduct}
            />
          </div>

          {/* Right / Bottom: Contiguous Product Details & Purchase Panel */}
          <ProductPurchasePanel
            product={product}
            selectedVariant={activeVariant}
            stage={stage}
            cartCountForProduct={getCartCountForProduct(product.id)}
            onSelectVariant={(v) => {
              setSelectedVariant(v);
              setBurstKey((prev) => prev + 1);
            }}
            onAddToCart={onAddToCart}
            onReplay={handleReplay}
            onCycleStyle={handleCycleStyle}
            onClose={handleCloseModal}
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
