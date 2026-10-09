import React from 'react';
import { RotateCcw, Palette, Zap, FastForward, ArrowRight } from 'lucide-react';
import { Product, ProductId, TransformationStage } from '../../types/store';

interface TransformationControlsProps {
  product: Product;
  allProducts: Product[];
  stage: TransformationStage;
  isTurboRunning: boolean;
  onReplay: () => void;
  onCycleStyle: () => void;
  onSkipToDetails: () => void;
  onTriggerSpecialAction: () => void;
  onSelectProduct: (productId: ProductId) => void;
}

export const TransformationControls: React.FC<TransformationControlsProps> = ({
  product,
  allProducts,
  stage,
  isTurboRunning,
  onReplay,
  onCycleStyle,
  onSkipToDetails,
  onTriggerSpecialAction,
  onSelectProduct,
}) => {
  const isAnimating = stage === 'preparing' || stage === 'transforming';
  const flagshipProducts = allProducts.filter((p) => p.isFlagship);

  const handleNextProduct = () => {
    const currentIndex = allProducts.findIndex((p) => p.id === product.id);
    const nextItem = allProducts[(currentIndex + 1) % allProducts.length];
    if (nextItem) {
      onSelectProduct(nextItem.id);
    }
  };

  return (
    <div className="relative z-20 flex flex-col gap-3 px-4 pb-4 pt-2 border-t border-white/10 bg-zinc-950/80 backdrop-blur-md">
      {/* Primary Stage Action Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        <button
          type="button"
          onClick={onReplay}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-zinc-100 bg-zinc-800/90 hover:bg-zinc-700 border border-white/15 transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-amber-400"
        >
          <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
          <span>Replay Transformation</span>
        </button>

        <button
          type="button"
          onClick={onCycleStyle}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-zinc-100 bg-zinc-800/90 hover:bg-zinc-700 border border-white/15 transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-amber-400"
        >
          <Palette className="w-3.5 h-3.5 text-amber-400" />
          <span>Try Another Style</span>
        </button>

        {product.transformation.specialActionLabel && (
          <button
            type="button"
            onClick={onTriggerSpecialAction}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-amber-400 ${
              isTurboRunning
                ? 'bg-red-500 text-white border border-red-300'
                : 'bg-amber-400 text-zinc-950 hover:bg-amber-300'
            }`}
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>{product.transformation.specialActionLabel}</span>
          </button>
        )}

        {isAnimating && (
          <button
            type="button"
            onClick={onSkipToDetails}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900/80 border border-white/10 transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-amber-400"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span>Skip to Reveal</span>
          </button>
        )}

        <button
          type="button"
          onClick={handleNextProduct}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-amber-300 hover:text-amber-200 bg-zinc-900/90 border border-amber-400/30 transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          <span>Next of {allProducts.length} Items</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Quick Flagship Mode Switcher Bar */}
      <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto py-1 no-scrollbar">
        <span className="text-[11px] font-mono text-zinc-400 mr-1 whitespace-nowrap shrink-0">
          Modes:
        </span>
        {flagshipProducts.map((item) => {
          const isCurrentArchetype = item.archetypeId === product.archetypeId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectProduct(item.id)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-amber-400 ${
                isCurrentArchetype
                  ? 'bg-amber-400 text-zinc-950 font-semibold'
                  : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white border border-white/10'
              }`}
            >
              {item.name.split(' ').slice(-1)[0]}
            </button>
          );
        })}
      </div>
    </div>
  );
};
