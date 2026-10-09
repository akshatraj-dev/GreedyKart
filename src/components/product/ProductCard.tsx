import React, { useState } from 'react';
import { Eye, ShoppingBag, Check, Star, Camera, Sparkles } from 'lucide-react';
import { Product, StyleVariant } from '../../types/store';
import { ProductSvgArtwork } from './ProductSvgArtwork';

interface ProductCardProps {
  product: Product;
  cartQuantity: number;
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product, variant: StyleVariant, quantity: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  cartQuantity,
  onViewProduct,
  onAddToCart,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [activeVariant, setActiveVariant] = useState<StyleVariant>(product.variants[0]);
  const [viewMode, setViewMode] = useState<'dual' | 'photo' | 'svg'>('dual');
  const [imgError, setImgError] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, activeVariant, 1);
    setJustAdded(true);
    window.setTimeout(() => {
      setJustAdded(false);
    }, 1200);
  };

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex flex-col justify-between rounded-2xl bg-white border-2 border-zinc-950 shadow-[4px_4px_0px_#18181B] transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0px_#18181B] overflow-hidden"
    >
      {/* Top Visual Stage — Displays Real Studio Photo + Animated SVG Rig */}
      <div>
        <div
          onClick={() => onViewProduct(product)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onViewProduct(product);
            }
          }}
          aria-label={`View ${product.name} transformation experience`}
          className="relative h-64 w-full bg-gradient-to-br from-amber-50 via-pink-50 to-violet-100 flex flex-col justify-between p-4 cursor-pointer overflow-hidden border-b-2 border-zinc-950 focus-visible:outline-2 focus-visible:outline-fuchsia-600"
        >
          {/* Top-left mode & view switcher controls */}
          <div className="relative z-10 flex items-center justify-between gap-2 text-xs text-zinc-800 font-bold">
            <span className="truncate">
              {product.isFlagship ? '★ Flagship · ' : ''}
              {product.transformation.modeName}
            </span>

            {/* Interactive Media View Switcher (Dual Photo+SVG | Photo | Animated SVG) */}
            <div
              className="flex items-center gap-1 bg-white/90 backdrop-blur-xs p-0.5 rounded-md border border-zinc-200/80 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setViewMode('dual')}
                className={`px-1.5 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  viewMode === 'dual'
                    ? 'bg-zinc-900 text-white'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                Photo + Anim
              </button>
              <button
                type="button"
                onClick={() => setViewMode('photo')}
                aria-label="Show real studio photo"
                className={`px-1.5 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer whitespace-nowrap inline-flex items-center gap-0.5 ${
                  viewMode === 'photo'
                    ? 'bg-zinc-900 text-white'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                <Camera className="w-2.5 h-2.5" />
                <span>Photo</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('svg')}
                aria-label="Show animated SVG illustration"
                className={`px-1.5 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer whitespace-nowrap inline-flex items-center gap-0.5 ${
                  viewMode === 'svg'
                    ? 'bg-zinc-900 text-white'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                <Sparkles className="w-2.5 h-2.5" />
                <span>Rig</span>
              </button>
            </div>
          </div>

          {/* Central Media Area: Real Photo + Animated SVG Moving Together */}
          <div className="relative my-1 flex-1 flex items-center justify-center overflow-hidden">
            {viewMode === 'dual' && (
              <div className="w-full h-40 grid grid-cols-2 gap-2.5 items-center">
                {/* Left Panel: Real Studio Photograph with synchronized hover motion */}
                <div
                  className="relative h-full w-full rounded-xl overflow-hidden bg-zinc-900 border border-zinc-300/80 shadow-xs"
                  style={{
                    transform: isHovered
                      ? 'translateY(-6px) scale(1.03) rotate(-1.5deg)'
                      : 'translateY(0px) scale(1) rotate(0deg)',
                    transition: 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  {!imgError ? (
                    <img
                      src={product.photoUrl}
                      alt={`${product.name} studio photograph`}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={() => setImgError(true)}
                      style={{
                        filter:
                          product.photoFilter && product.photoFilter !== 'none'
                            ? product.photoFilter
                            : undefined,
                      }}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-200 text-xs text-zinc-600">
                      Studio Photo
                    </div>
                  )}
                  <span className="absolute bottom-1.5 left-2 text-[10px] font-mono text-white/95 bg-black/70 px-1.5 py-0.5 rounded">
                    Real Photo
                  </span>
                </div>

                {/* Right Panel: Interactive Animated SVG Rig with identical synchronized motion */}
                <div
                  className="relative h-full w-full rounded-xl bg-white/90 border border-zinc-200/90 flex items-center justify-center p-2 shadow-xs"
                  style={{
                    transform: isHovered
                      ? 'translateY(-6px) scale(1.03) rotate(1.5deg)'
                      : 'translateY(0px) scale(1) rotate(0deg)',
                    transition: 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <ProductSvgArtwork
                    productId={product.archetypeId}
                    variant={activeVariant}
                    isHovered={isHovered}
                    className="w-full h-full"
                  />
                  <span className="absolute bottom-1.5 right-2 text-[10px] font-mono text-zinc-900 bg-amber-300/90 px-1.5 py-0.5 rounded font-semibold">
                    Live Animation
                  </span>
                </div>
              </div>
            )}

            {viewMode === 'photo' && (
              <div className="relative w-full h-40 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-300">
                {!imgError ? (
                  <img
                    src={product.photoUrl}
                    alt={`${product.name} studio photograph`}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    onError={() => setImgError(true)}
                    style={{
                      filter:
                        product.photoFilter && product.photoFilter !== 'none'
                          ? product.photoFilter
                          : undefined,
                    }}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <ProductSvgArtwork
                    productId={product.archetypeId}
                    variant={activeVariant}
                    isHovered={isHovered}
                    className="w-full h-full"
                  />
                )}
              </div>
            )}

            {viewMode === 'svg' && (
              <div className="w-full h-40 flex items-center justify-center">
                <ProductSvgArtwork
                  productId={product.archetypeId}
                  variant={activeVariant}
                  isHovered={isHovered}
                  className="w-full h-full max-w-[240px]"
                />
              </div>
            )}
          </div>

          {/* Bottom Row on Stage: Color Variant Swatches & Emoji Signature */}
          <div
            className="relative z-10 flex items-center justify-between gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-1.5">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setActiveVariant(v)}
                  aria-label={`Preview ${v.name} color`}
                  className={`w-4 h-4 rounded-full border transition-transform cursor-pointer ${
                    activeVariant.id === v.id
                      ? 'scale-115 border-zinc-950 ring-1 ring-zinc-950/40'
                      : 'border-black/25 opacity-75 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: v.primaryColor }}
                />
              ))}
            </div>

            <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-600 tabular-nums">
              <span>{product.transformation.emojis.join(' ')}</span>
              {cartQuantity > 0 && (
                <span className="font-semibold text-zinc-900">
                  · Bag: {cartQuantity}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Card Content Body */}
        <div className="p-5 sm:p-6">
          {/* Clean Unboxed Metadata Row (Zero-Pill Discipline) */}
          <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1.5">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1 text-zinc-700 font-medium tabular-nums">
              <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
              {product.rating.toFixed(1)}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">{product.sku}</span>
          </div>

          {/* Title & Tabular Price */}
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-display text-lg font-bold text-zinc-950 tracking-tight">
              {product.name}
            </h3>
            <span className="font-mono text-base font-bold text-zinc-950 tabular-nums shrink-0">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Product Description */}
          <p className="mt-2 text-sm text-zinc-600 leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => onViewProduct(product)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold text-zinc-950 bg-gradient-to-r from-yellow-300 via-lime-300 to-cyan-300 hover:brightness-105 border-2 border-zinc-950 shadow-[2px_2px_0px_#18181B] transition-all cursor-pointer whitespace-nowrap shrink-0"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View Product</span>
        </button>

        <button
          type="button"
          onClick={handleQuickAdd}
          className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold border-2 border-zinc-950 shadow-[2px_2px_0px_#18181B] transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            justAdded
              ? 'bg-emerald-500 text-white'
              : 'bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white'
          }`}
        >
          {justAdded ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added ✨</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
};
