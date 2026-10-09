import React, { useState } from 'react';
import { ShoppingBag, Check, Star, RotateCcw, Palette, X, Camera } from 'lucide-react';
import { Product, StyleVariant, TransformationStage } from '../../types/store';
import { ProductSvgArtwork } from '../product/ProductSvgArtwork';

interface ProductPurchasePanelProps {
  product: Product;
  selectedVariant: StyleVariant;
  stage: TransformationStage;
  cartCountForProduct: number;
  onSelectVariant: (variant: StyleVariant) => void;
  onAddToCart: (product: Product, variant: StyleVariant, quantity: number) => void;
  onReplay: () => void;
  onCycleStyle: () => void;
  onClose: () => void;
}

export const ProductPurchasePanel: React.FC<ProductPurchasePanelProps> = ({
  product,
  selectedVariant,
  stage,
  cartCountForProduct,
  onSelectVariant,
  onAddToCart,
  onReplay,
  onCycleStyle,
  onClose,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [justAdded, setJustAdded] = useState<boolean>(false);

  const handleAdd = () => {
    onAddToCart(product, selectedVariant, quantity);
    setJustAdded(true);
    window.setTimeout(() => {
      setJustAdded(false);
    }, 1400);
  };

  return (
    <div className="flex flex-col justify-between bg-[#FAF8F5] text-zinc-900 p-5 sm:p-7 lg:w-[440px] shrink-0 border-t lg:border-t-0 lg:border-l border-zinc-200 overflow-y-auto">
      <div>
        {/* Top Metadata Row & Close Button */}
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">{product.sku}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close transformation experience"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-700 hover:text-zinc-950 bg-zinc-200/70 hover:bg-zinc-200 transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-zinc-900"
          >
            <X className="w-4 h-4" />
            <span>Close</span>
          </button>
        </div>

        {/* Product Title & Price */}
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
          {product.name}
        </h2>

        <div className="mt-2 flex items-baseline justify-between gap-4 border-b border-zinc-200 pb-3.5">
          <div className="font-mono text-2xl font-bold text-zinc-950 tabular-nums">
            ₹{product.price.toLocaleString('en-IN')}
          </div>

          {/* Unboxed Rating Metadata */}
          <div className="flex items-center gap-1.5 text-xs text-zinc-600 font-medium">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span className="font-mono font-semibold text-zinc-900 tabular-nums">
              {product.rating.toFixed(1)}
            </span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">
              {product.reviewCount.toLocaleString()} demo reviews
            </span>
          </div>
        </div>

        {/* Real Studio Photograph + Animated SVG Twin Preview */}
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <div className="relative h-28 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-200">
            <img
              src={product.photoUrl}
              alt={`${product.name} real studio photo`}
              referrerPolicy="no-referrer"
              style={{
                filter:
                  product.photoFilter && product.photoFilter !== 'none'
                    ? product.photoFilter
                    : undefined,
              }}
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-1.5 left-2 inline-flex items-center gap-1 text-[10px] font-mono text-white bg-black/70 px-1.5 py-0.5 rounded">
              <Camera className="w-2.5 h-2.5" />
              <span>Real Studio Photo</span>
            </span>
          </div>

          <div className="relative h-28 rounded-xl bg-[#F4F1EA] border border-zinc-200 p-2 flex items-center justify-center">
            <ProductSvgArtwork
              productId={product.archetypeId}
              variant={selectedVariant}
              className="w-full h-full"
            />
            <span className="absolute bottom-1.5 right-2 text-[10px] font-mono text-zinc-800 bg-amber-300/90 px-1.5 py-0.5 rounded font-semibold">
              Vector Rig
            </span>
          </div>
        </div>

        {/* Product Description */}
        <p className="mt-3.5 text-sm text-zinc-700 leading-relaxed">
          {product.description}
        </p>

        {/* Reality vs. Main Character Energy Comparison */}
        <div className="mt-3.5 pt-3.5 border-t border-zinc-200/80 space-y-2 text-xs">
          <div>
            <span className="font-semibold text-zinc-900">Ordinary Reality: </span>
            <span className="text-zinc-600">{product.mundaneReality}</span>
          </div>
          <div>
            <span className="font-semibold text-amber-700">Main Character Effect: </span>
            <span className="text-zinc-700">{product.cinematicPromise}</span>
          </div>
        </div>

        {/* Style / Edition Selector */}
        <div className="mt-4 pt-3.5 border-t border-zinc-200/80">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-zinc-900">
              Style Edition:{' '}
              <span className="font-normal text-zinc-600">{selectedVariant.name}</span>
            </span>
            <button
              type="button"
              onClick={onCycleStyle}
              className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 hover:text-amber-800 underline underline-offset-2 cursor-pointer whitespace-nowrap shrink-0"
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Try Another Style</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {product.variants.map((v) => {
              const isSelected = v.id === selectedVariant.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => onSelectVariant(v)}
                  className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-left text-xs font-medium border transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-900 text-white border-zinc-900'
                      : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full shrink-0 border border-black/20"
                    style={{ backgroundColor: v.primaryColor }}
                  />
                  <span className="truncate">{v.name.split('/')[0].trim()}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Purchase Module Footer */}
      <div className="mt-5 pt-4 border-t border-zinc-200 space-y-3">
        {/* Quantity & Primary Add to Cart CTA */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center border border-zinc-300 rounded-lg bg-white shrink-0"
            aria-label="Product quantity"
          >
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
              className="px-3 py-2.5 text-sm font-bold text-zinc-700 hover:text-zinc-950 cursor-pointer"
            >
              −
            </button>
            <span className="px-2.5 font-mono text-sm font-semibold tabular-nums text-zinc-900">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(10, q + 1))}
              aria-label="Increase quantity"
              className="px-3 py-2.5 text-sm font-bold text-zinc-700 hover:text-zinc-950 cursor-pointer"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className={`flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-zinc-950 ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-zinc-950 text-white hover:bg-zinc-800'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>
                  Add to Cart · ₹{(product.price * quantity).toLocaleString('en-IN')}
                </span>
              </>
            )}
          </button>
        </div>

        {/* Secondary Replay & Status Row */}
        <div className="flex items-center justify-between text-xs text-zinc-500 pt-1">
          <button
            type="button"
            onClick={onReplay}
            className="inline-flex items-center gap-1.5 font-semibold text-zinc-700 hover:text-zinc-950 cursor-pointer whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Replay Transformation</span>
          </button>

          <span className="font-mono tabular-nums">
            {cartCountForProduct > 0
              ? `In Bag: ${cartCountForProduct}`
              : stage === 'details'
              ? 'Transformation Complete'
              : 'Stage Active'}
          </span>
        </div>
      </div>
    </div>
  );
};
