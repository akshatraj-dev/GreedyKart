import React, { useState, useEffect, useMemo } from 'react';
import {
  ShoppingBag,
  Sparkles,
  Search,
  Play,
  Eye,
  SlidersHorizontal,
  ArrowUpRight,
  User,
} from 'lucide-react';
import { PRODUCTS, FLAGSHIP_PRODUCTS } from './data/products';
import {
  ArchetypeId,
  CartItem,
  CheckoutOrder,
  Product,
  ProductId,
  StyleVariant,
  UserAccount,
} from './types/store';
import { ProductCard } from './components/product/ProductCard';
import { ProductSvgArtwork } from './components/product/ProductSvgArtwork';
import { AnimatedProductExperience } from './components/experience/AnimatedProductExperience';
import { CartDrawer } from './components/cart/CartDrawer';
import { AccountDashboardModal } from './components/account/AccountDashboardModal';

const CATEGORIES = [
  'All Products',
  'Eyewear & Audio',
  'Footwear & Apparel',
  'Luxury & Beauty',
  'Everyday Carry',
] as const;

const countByArchetype = (archetype: ArchetypeId) =>
  PRODUCTS.filter((p) => p.archetypeId === archetype).length;

const ARCHETYPE_FILTERS: { id: 'all' | 'flagship' | ArchetypeId; label: string }[] = [
  { id: 'all', label: `All Catalog (${PRODUCTS.length})` },
  { id: 'flagship', label: `Flagship (${FLAGSHIP_PRODUCTS.length})` },
  { id: 'sunglasses', label: `Sunglasses (${countByArchetype('sunglasses')})` },
  { id: 'sneakers', label: `Sneakers (${countByArchetype('sneakers')})` },
  { id: 'watch', label: `Watches (${countByArchetype('watch')})` },
  { id: 'headphones', label: `Headphones (${countByArchetype('headphones')})` },
  { id: 'lipstick', label: `Lipsticks (${countByArchetype('lipstick')})` },
  { id: 'tshirt', label: `T-Shirts (${countByArchetype('tshirt')})` },
  { id: 'perfume', label: `Perfumes (${countByArchetype('perfume')})` },
  { id: 'backpack', label: `Backpacks (${countByArchetype('backpack')})` },
  { id: 'jeans', label: `Jeans (${countByArchetype('jeans')})` },
  { id: 'shirt', label: `Shirts (${countByArchetype('shirt')})` },
  { id: 'makeup', label: `Makeup (${countByArchetype('makeup')})` },
  { id: 'frock', label: `Frocks (${countByArchetype('frock')})` },
  { id: 'belt', label: `Belts (${countByArchetype('belt')})` },
  { id: 'socks', label: `Socks (${countByArchetype('socks')})` },
  { id: 'slippers', label: `Slippers (${countByArchetype('slippers')})` },
  { id: 'necklace', label: `Necklaces (${countByArchetype('necklace')})` },
];

type SortOption =
  | 'featured'
  | 'price-asc'
  | 'price-desc'
  | 'rating'
  | 'reviews-desc'
  | 'name-asc'
  | 'name-desc';

type PriceRangeFilter = 'all' | 'under-500' | '500-1500' | '1500-3000' | 'above-3000';

const PRICE_RANGE_OPTIONS: { id: PriceRangeFilter; label: string }[] = [
  { id: 'all', label: 'All Prices' },
  { id: 'under-500', label: 'Under ₹500' },
  { id: '500-1500', label: '₹500 – ₹1,500' },
  { id: '1500-3000', label: '₹1,500 – ₹3,000' },
  { id: 'above-3000', label: 'Above ₹3,000' },
];

const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: 'featured', label: 'Featured (Flagships First)' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Highest Rated (★)' },
  { id: 'reviews-desc', label: 'Most Popular (Reviews)' },
  { id: 'name-asc', label: 'Name: A to Z' },
  { id: 'name-desc', label: 'Name: Z to A' },
];

const INITIAL_SAMPLE_ORDERS: CheckoutOrder[] = [
  {
    orderId: 'RK-849201',
    customerName: 'Aarav Sharma',
    email: 'aarav@regretkart.in',
    phone: '+91 98765 43210',
    address: '42 Film City Road, Bandra West, Mumbai',
    postalCode: '400050',
    paymentMethod: 'UPI',
    items: [
      {
        product: FLAGSHIP_PRODUCTS[0],
        quantity: 1,
        variantId: FLAGSHIP_PRODUCTS[0].variants[0].id,
        variantName: FLAGSHIP_PRODUCTS[0].variants[0].name,
      },
      {
        product: FLAGSHIP_PRODUCTS[8] || FLAGSHIP_PRODUCTS[1],
        quantity: 1,
        variantId: (FLAGSHIP_PRODUCTS[8] || FLAGSHIP_PRODUCTS[1]).variants[0].id,
        variantName: (FLAGSHIP_PRODUCTS[8] || FLAGSHIP_PRODUCTS[1]).variants[0].name,
      },
    ],
    subtotal:
      FLAGSHIP_PRODUCTS[0].price +
      (FLAGSHIP_PRODUCTS[8] || FLAGSHIP_PRODUCTS[1]).price,
    shipping: 0,
    total:
      FLAGSHIP_PRODUCTS[0].price +
      (FLAGSHIP_PRODUCTS[8] || FLAGSHIP_PRODUCTS[1]).price,
    placedAt: '09:42 PM',
    placedDate: '08 Oct 2026',
    status: 'Out for Delivery',
  },
  {
    orderId: 'RK-710482',
    customerName: 'Aarav Sharma',
    email: 'aarav@regretkart.in',
    phone: '+91 98765 43210',
    address: '42 Film City Road, Bandra West, Mumbai',
    postalCode: '400050',
    paymentMethod: 'CARD',
    items: [
      {
        product: FLAGSHIP_PRODUCTS[15] || FLAGSHIP_PRODUCTS[2],
        quantity: 1,
        variantId: (FLAGSHIP_PRODUCTS[15] || FLAGSHIP_PRODUCTS[2]).variants[0].id,
        variantName: (FLAGSHIP_PRODUCTS[15] || FLAGSHIP_PRODUCTS[2]).variants[0].name,
      },
    ],
    subtotal: (FLAGSHIP_PRODUCTS[15] || FLAGSHIP_PRODUCTS[2]).price,
    shipping: 0,
    total: (FLAGSHIP_PRODUCTS[15] || FLAGSHIP_PRODUCTS[2]).price,
    placedAt: '04:15 PM',
    placedDate: '04 Oct 2026',
    status: 'Delivered',
  },
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Products');
  const [selectedArchetype, setSelectedArchetype] = useState<
    'all' | 'flagship' | ArchetypeId
  >('all');
  const [priceRange, setPriceRange] = useState<PriceRangeFilter>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const saved = window.localStorage.getItem('rk_user_account');
      return saved ? (JSON.parse(saved) as UserAccount) : null;
    } catch {
      return null;
    }
  });

  const [orderHistory, setOrderHistory] = useState<CheckoutOrder[]>(() => {
    try {
      const saved = window.localStorage.getItem('rk_order_history');
      return saved ? (JSON.parse(saved) as CheckoutOrder[]) : INITIAL_SAMPLE_ORDERS;
    } catch {
      return INITIAL_SAMPLE_ORDERS;
    }
  });

  useEffect(() => {
    try {
      if (currentUser) {
        window.localStorage.setItem('rk_user_account', JSON.stringify(currentUser));
      } else {
        window.localStorage.removeItem('rk_user_account');
      }
    } catch {
      // Ignore storage quota errors
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      window.localStorage.setItem('rk_order_history', JSON.stringify(orderHistory));
    } catch {
      // Ignore storage quota errors
    }
  }, [orderHistory]);

  // Respect system prefers-reduced-motion on initial load
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  const hasActiveFilters =
    selectedCategory !== 'All Products' ||
    selectedArchetype !== 'all' ||
    priceRange !== 'all' ||
    minRating > 0 ||
    sortBy !== 'featured' ||
    searchQuery.trim() !== '';

  const resetAllFilters = () => {
    setSelectedCategory('All Products');
    setSelectedArchetype('all');
    setPriceRange('all');
    setMinRating(0);
    setSortBy('featured');
    setSearchQuery('');
  };

  const filteredProducts = useMemo(() => {
    const filtered = PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All Products' || product.category === selectedCategory;
      const matchesArchetype =
        selectedArchetype === 'all'
          ? true
          : selectedArchetype === 'flagship'
          ? Boolean(product.isFlagship)
          : product.archetypeId === selectedArchetype;

      const matchesPrice =
        priceRange === 'all'
          ? true
          : priceRange === 'under-500'
          ? product.price < 500
          : priceRange === '500-1500'
          ? product.price >= 500 && product.price <= 1500
          : priceRange === '1500-3000'
          ? product.price > 1500 && product.price <= 3000
          : product.price > 3000;

      const matchesRating = minRating === 0 || product.rating >= minRating;

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query) ||
        product.archetypeId.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.transformation.modeName.toLowerCase().includes(query) ||
        product.transformation.finalHeadline.toLowerCase().includes(query);

      return (
        matchesCategory &&
        matchesArchetype &&
        matchesPrice &&
        matchesRating &&
        matchesSearch
      );
    });

    if (sortBy === 'price-asc') {
      return [...filtered].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return [...filtered].sort((a, b) => b.price - a.price);
    }
    if (sortBy === 'rating') {
      return [...filtered].sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    }
    if (sortBy === 'reviews-desc') {
      return [...filtered].sort((a, b) => b.reviewCount - a.reviewCount);
    }
    if (sortBy === 'name-asc') {
      return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortBy === 'name-desc') {
      return [...filtered].sort((a, b) => b.name.localeCompare(a.name));
    }
    return filtered;
  }, [selectedCategory, selectedArchetype, priceRange, minRating, searchQuery, sortBy]);

  const handleAddToCart = (
    product: Product,
    variant: StyleVariant,
    quantity: number
  ) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.variantId === variant.id
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [
        ...prev,
        {
          product,
          quantity,
          variantId: variant.id,
          variantName: variant.name,
        },
      ];
    });
  };

  const handleUpdateCartQuantity = (
    productId: string,
    variantId: string,
    delta: number
  ) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.variantId === variantId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveCartItem = (productId: string, variantId: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.variantId === variantId)
      )
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const getCartCountForProduct = (productId: ProductId): number => {
    return cartItems
      .filter((item) => item.product.id === productId)
      .reduce((sum, item) => sum + item.quantity, 0);
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const flagshipSunglasses = FLAGSHIP_PRODUCTS[0];

  const handleSelectProductById = (productId: ProductId) => {
    const found = PRODUCTS.find((p) => p.id === productId);
    if (found) {
      setActiveProduct(found);
    }
  };

  const handleOrderPlaced = (newOrder: CheckoutOrder) => {
    setOrderHistory((prev) => [newOrder, ...prev]);
  };

  const handleAdvanceOrderStatus = (orderId: string) => {
    const steps: NonNullable<CheckoutOrder['status']>[] = [
      'Processing',
      'Dispatched',
      'Out for Delivery',
      'Delivered',
    ];
    setOrderHistory((prev) =>
      prev.map((order) => {
        if (order.orderId !== orderId) return order;
        const currIdx = steps.indexOf(order.status || 'Dispatched');
        const nextStatus = steps[Math.min(steps.length - 1, currIdx + 1)];
        return { ...order, status: nextStatus };
      })
    );
  };

  const handleReorderItems = (order: CheckoutOrder) => {
    order.items.forEach((item) => {
      const variantObj =
        item.product.variants.find((v) => v.id === item.variantId) ||
        item.product.variants[0];
      handleAddToCart(item.product, variantObj, item.quantity);
    });
    setIsAccountOpen(false);
    setIsCartOpen(true);
  };

  const GENZ_HERO_EMOJIS = [
    { emoji: '💀', label: 'IJBOL / Dead' },
    { emoji: '😭', label: 'Crying in Broke' },
    { emoji: '💅', label: 'Slay Mode' },
    { emoji: '🔥', label: 'Lit Aura' },
    { emoji: '💸', label: 'RIP Wallet' },
    { emoji: '✨', label: 'Delulu Sparkle' },
    { emoji: '🤡', label: 'Impulse Clown' },
    { emoji: '👑', label: 'Main Character' },
    { emoji: '🫶', label: 'It’s Giving' },
    { emoji: '🎀', label: 'Coquette Regret' },
    { emoji: '🚀', label: 'Zero Chill' },
    { emoji: '⚡', label: 'Big Energy' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#FFFBEB] via-[#FDF2F8] to-[#EEF2FF] text-zinc-900">
      {/* Colorful Rainbow Top Strip */}
      <div className="h-2 w-full bg-gradient-to-r from-violet-600 via-pink-500 via-amber-400 via-lime-400 to-cyan-400" />

      {/* Top Navigation Bar — Colorful Gen-Z Pop Theme */}
      <header className="sticky top-0 z-30 flex items-center justify-between gap-8 px-6 lg:px-12 py-4 bg-white/90 backdrop-blur-md border-b-2 border-zinc-950 shadow-xs">
        {/* Zone 1: Bold, Large Colorful Brand Wordmark */}
        <a
          href="#top"
          className="font-display text-2xl sm:text-3xl font-black tracking-tight whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="bg-gradient-to-r from-violet-700 via-fuchsia-600 to-orange-500 bg-clip-text text-transparent">
            RegretKart
          </span>
          <span className="text-lg sm:text-xl" aria-hidden="true">
            💀💅✨
          </span>
          <span className="hidden xl:inline font-sans text-xs font-bold text-pink-600 bg-pink-100 border border-pink-300 px-2.5 py-0.5 rounded-full ml-1">
            You Didn't Need It. You Bought It Anyway. 😭💸
          </span>
        </a>

        {/* Zone 2: 4 concise single-line navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-bold text-zinc-700"
        >
          <a
            href="#catalog"
            className="hover:text-fuchsia-600 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Catalog ({PRODUCTS.length})
          </a>
          <button
            type="button"
            onClick={() => setActiveProduct(flagshipSunglasses)}
            className="hover:text-fuchsia-600 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Flagship Demo
          </button>
          <a
            href="#architecture"
            className="hover:text-fuchsia-600 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Transformations
          </a>
          <a
            href="#reviews"
            className="hover:text-fuchsia-600 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Reviews
          </a>
        </nav>

        {/* Zone 3: Account Login/Dashboard & Shopping Bag Drawer Trigger */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setIsAccountOpen(true)}
            aria-label={
              currentUser
                ? `Open Account Dashboard for ${currentUser.name}`
                : 'Open Account Login and Orders Dashboard'
            }
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-extrabold text-zinc-950 bg-yellow-300 hover:bg-yellow-400 border-2 border-zinc-950 shadow-[3px_3px_0px_#18181B] transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            {currentUser ? (
              <>
                <span>{currentUser.avatarEmoji}</span>
                <span>{currentUser.name.split(' ')[0]}</span>
                <span className="font-mono text-[11px] bg-white/80 px-1.5 py-0.2 rounded border border-zinc-900">
                  Orders ({orderHistory.length})
                </span>
              </>
            ) : (
              <>
                <User className="w-4 h-4 text-zinc-950" />
                <span>Account / Login</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            aria-label={`Open Shopping Bag with ${totalCartItems} items`}
            className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 border-2 border-zinc-950 shadow-[3px_3px_0px_#18181B] transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-4 h-4 text-yellow-300" />
            <span>Bag ({totalCartItems})</span>
            {totalCartAmount > 0 && (
              <span className="font-mono text-yellow-200 tabular-nums">
                · ₹{totalCartAmount.toLocaleString('en-IN')}
              </span>
            )}
          </button>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-12 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left Column: Colorful Gen-Z "Welcome to RegretKart" Stage with Gen-Z Emojis */}
            <div className="relative overflow-hidden lg:col-span-7 flex flex-col justify-between bg-gradient-to-br from-[#4F46E5] via-[#9333EA] to-[#E11D48] text-white rounded-3xl p-7 sm:p-10 lg:p-12 border-2 border-zinc-950 shadow-[6px_6px_0px_#18181B]">
              {/* Colorful Decorative Glow Orbs */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full bg-yellow-300/25 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-cyan-300/25 blur-3xl"
              />

              <div className="relative z-10">
                <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1 rounded-full bg-black/35 border border-white/25 text-xs font-mono text-yellow-300 tracking-wide">
                  <span>🌈 REGRETKART · GEN-Z DELULU EDITION</span>
                  <span aria-hidden="true">·</span>
                  <span>{PRODUCTS.length} PRODUCTS · REAL PHOTOS + ANIMATIONS</span>
                </div>

                {/* Floating Gen-Z Emoji Dock right above "Welcome to RegretKart" */}
                <div
                  className="mt-4 flex flex-wrap items-center gap-2"
                  aria-label="Gen-Z Emoji Reactions"
                >
                  {GENZ_HERO_EMOJIS.map((item, idx) => (
                    <span
                      key={item.emoji}
                      title={item.label}
                      style={{
                        animation: !reducedMotion
                          ? `floatSlow ${2.2 + (idx % 4) * 0.35}s ease-in-out infinite`
                          : undefined,
                      }}
                      className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/15 hover:bg-white/30 hover:scale-115 transition-transform border border-white/30 text-lg sm:text-xl shadow-xs select-none"
                    >
                      {item.emoji}
                    </span>
                  ))}
                </div>

                {/* Big, Bold "Welcome to RegretKart" with Gen-Z Emojis */}
                <h1 className="mt-5 font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.04] drop-shadow-[0_3px_0px_rgba(0,0,0,0.35)]">
                  Welcome to{' '}
                  <span className="bg-gradient-to-r from-yellow-300 via-lime-300 to-cyan-300 bg-clip-text text-transparent">
                    RegretKart
                  </span>{' '}
                  <span className="inline-block whitespace-nowrap text-3xl sm:text-5xl align-middle">
                    💀😭💅🔥
                  </span>
                </h1>

                {/* Bold Tagline with Expressive Gen-Z Emojis */}
                <p className="mt-3 font-display text-xl sm:text-3xl font-extrabold tracking-tight text-yellow-200 drop-shadow-[0_2px_0px_rgba(0,0,0,0.3)]">
                  “You Didn't Need It. You Bought It Anyway.” 💸🤡✨👑
                </p>

                {/* Gen-Z Vibe / Mood Stickers */}
                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-bold">
                  <span className="px-3 py-1 rounded-full bg-yellow-300 text-zinc-950 border border-zinc-950 shadow-[2px_2px_0px_#18181B]">
                    💀 Impulse Buy Core
                  </span>
                  <span className="px-3 py-1 rounded-full bg-lime-300 text-zinc-950 border border-zinc-950 shadow-[2px_2px_0px_#18181B]">
                    💅 100% Main Character Delulu
                  </span>
                  <span className="px-3 py-1 rounded-full bg-cyan-300 text-zinc-950 border border-zinc-950 shadow-[2px_2px_0px_#18181B]">
                    😭 Broke But Iconic
                  </span>
                  <span className="px-3 py-1 rounded-full bg-pink-300 text-zinc-950 border border-zinc-950 shadow-[2px_2px_0px_#18181B]">
                    🔥 +10,000 Aura Points
                  </span>
                </div>

                <p className="mt-4 text-sm sm:text-base text-white/95 leading-relaxed max-w-2xl font-medium">
                  Ordinary Products. Absolutely Unnecessary Transformations. Browse {PRODUCTS.length} everyday items—sunglasses, sneakers, watches, headphones, lipsticks, tees, perfumes, backpacks, jeans, shirts, makeup kits, frocks, belts, socks, slippers, and necklaces—each with its real studio photograph and synchronized 4-scene character animation.
                </p>
              </div>

              <div className="relative z-10 mt-8 pt-6 border-t border-white/25 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveProduct(flagshipSunglasses)}
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-black text-zinc-950 bg-gradient-to-r from-yellow-300 via-lime-300 to-cyan-300 hover:brightness-105 border-2 border-zinc-950 shadow-[4px_4px_0px_#18181B] transition-all cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Experience Hero Sunglasses (₹999) 😎🔥</span>
                  </button>

                  <a
                    href="#catalog"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-extrabold text-white bg-zinc-950/60 hover:bg-zinc-950/80 border-2 border-white/40 transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Browse All {PRODUCTS.length} Products 🛍️✨</span>
                  </a>
                </div>

                {/* Accessible Reduced Motion Toggle */}
                <button
                  type="button"
                  onClick={() => setReducedMotion((prev) => !prev)}
                  aria-pressed={reducedMotion}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono text-white bg-black/40 hover:bg-black/60 border border-white/25 transition-colors cursor-pointer whitespace-nowrap shrink-0 self-start sm:self-auto"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-yellow-300" />
                  <span>Reduced Motion: {reducedMotion ? 'ON' : 'OFF'}</span>
                </button>
              </div>
            </div>

            {/* Right Column: Colorful Flagship Showcase Card (Real Photo + SVG Rig) */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl bg-gradient-to-br from-[#FEF08A] via-[#FBCFE8] to-[#C4B5FD] border-2 border-zinc-950 shadow-[6px_6px_0px_#18181B] p-7 sm:p-9">
              <div>
                <div className="flex items-center justify-between text-xs text-zinc-800 font-bold">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/80 border border-zinc-900">
                    ★ FLAGSHIP · SCENE 01–04 🔥
                  </span>
                  <span className="font-mono text-sm font-black text-zinc-950 bg-lime-300 px-2.5 py-0.5 rounded-full border border-zinc-950 tabular-nums">
                    ₹{flagshipSunglasses.price.toLocaleString('en-IN')}
                  </span>
                </div>

                <h2 className="mt-3 font-display text-2xl font-black text-zinc-950">
                  {flagshipSunglasses.name} — Main Character Mode 😎✨
                </h2>

                <p className="mt-1 text-xs font-bold text-purple-900">
                  “{flagshipSunglasses.transformation.finalHeadline}” 💀
                </p>
              </div>

              <div
                onClick={() => setActiveProduct(flagshipSunglasses)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveProduct(flagshipSunglasses);
                  }
                }}
                aria-label="Open Hero Sunglasses transformation"
                className="my-5 grid grid-cols-2 gap-3 p-3 rounded-2xl bg-white/95 border-2 border-zinc-950 shadow-[4px_4px_0px_#18181B] cursor-pointer group hover:-translate-y-0.5 transition-all"
              >
                <div className="relative h-36 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-300">
                  <img
                    src={flagshipSunglasses.photoUrl}
                    alt="Hero Sunglasses studio photograph"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-1.5 left-2 text-[10px] font-mono text-white bg-fuchsia-600 px-1.5 py-0.5 rounded font-bold">
                    Real Studio Photo 📸
                  </span>
                </div>

                <div className="relative h-36 rounded-xl bg-gradient-to-br from-amber-50 to-pink-50 border border-zinc-300 flex items-center justify-center p-2">
                  <ProductSvgArtwork
                    productId="sunglasses"
                    variant={flagshipSunglasses.variants[0]}
                    className="w-full h-full"
                  />
                  <span className="absolute bottom-1.5 right-2 text-[10px] font-mono text-zinc-950 bg-lime-300 border border-zinc-900 px-1.5 py-0.5 rounded font-bold">
                    Animated Rig ⚡
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="text-xs font-bold text-zinc-800">
                  <span>Includes optical eye-lock + 😎 🔥 ✨ burst</span>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveProduct(flagshipSunglasses)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-black text-white bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 border-2 border-zinc-950 shadow-[3px_3px_0px_#18181B] transition-all cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Eye className="w-3.5 h-3.5 text-yellow-300" />
                  <span>View Product</span>
                </button>
              </div>
            </div>
          </div>

          {/* Direct Transformation Mode Launcher Strip (16 Flagship Archetypes) */}
          <div className="mt-7 p-4 rounded-2xl bg-gradient-to-r from-violet-100 via-pink-100 to-amber-100 border-2 border-zinc-950 shadow-[4px_4px_0px_#18181B] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-extrabold text-zinc-900 shrink-0">
              <Sparkles className="w-4 h-4 text-fuchsia-600" />
              <span>Instant 16-Mode Transformation Launcher 🚀💅:</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
              {FLAGSHIP_PRODUCTS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveProduct(item)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white hover:bg-yellow-300 text-zinc-900 border border-zinc-900 shadow-[2px_2px_0px_#18181B] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>{item.transformation.emojis[0]}</span>
                  <span>{item.name}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-70" />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Main Product Catalog Section with Complete Sort & Filter Console */}
        <section
          id="catalog"
          className="max-w-7xl mx-auto px-6 lg:px-12 py-10 border-t-2 border-zinc-900/15"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
            <div>
              <p className="text-xs font-mono font-bold text-fuchsia-700 uppercase tracking-wider">
                01. RegretKart Colorful Catalog · {PRODUCTS.length} Products With Real Photos & Animations 💀🛍️
              </p>
              <h2 className="mt-1 font-display text-3xl sm:text-4xl font-black bg-gradient-to-r from-violet-700 via-pink-600 to-orange-500 bg-clip-text text-transparent tracking-tight">
                You Didn't Need It. You Bought It Anyway. 😭💸
              </h2>
            </div>

            {/* Search & Primary Sort Dropdown */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-fuchsia-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${PRODUCTS.length} products, jeans, frock, necklace...`}
                  aria-label="Search products"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border-2 border-zinc-950 shadow-[3px_3px_0px_#18181B] text-sm font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-2 focus:outline-fuchsia-600"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label="Sort products"
                className="px-3.5 py-2.5 rounded-xl bg-yellow-300 border-2 border-zinc-950 shadow-[3px_3px_0px_#18181B] text-xs font-black text-zinc-950 cursor-pointer focus:outline-2 focus:outline-fuchsia-600"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    Sort By: {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Dedicated Colorful Sort & Filter Control Panel */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-white via-pink-50/70 to-violet-50/70 border-2 border-zinc-950 shadow-[5px_5px_0px_#18181B] mb-8 space-y-4">
            {/* Row 1: Category Filter Tabs + Results Counter */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 p-1 bg-violet-100/90 border border-zinc-900 rounded-xl w-fit max-w-full overflow-x-auto">
                {CATEGORIES.map((category) => {
                  const isActive = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3.5 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                        isActive
                          ? 'bg-gradient-to-r from-violet-600 to-pink-600 text-white shadow-xs'
                          : 'text-zinc-700 hover:text-zinc-950'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-zinc-700 tabular-nums">
                <span>
                  Showing <strong className="text-fuchsia-700 font-black">{filteredProducts.length}</strong> of{' '}
                  {PRODUCTS.length} products
                </span>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={resetAllFilters}
                    className="px-3 py-1 rounded-lg bg-lime-300 border border-zinc-950 text-zinc-950 font-sans font-black text-xs hover:bg-lime-400 transition-colors cursor-pointer"
                  >
                    Reset Filters ✨
                  </button>
                )}
              </div>
            </div>

            {/* Row 2: Quick Sort Pills + Price Filter + Rating Filter */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-3 border-t border-zinc-200 items-center">
              {/* Price Range Filter Buttons */}
              <div className="lg:col-span-5 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                <span className="text-xs font-black text-violet-800 mr-1 whitespace-nowrap shrink-0">
                  💸 Price:
                </span>
                {PRICE_RANGE_OPTIONS.map((range) => {
                  const isSelected = priceRange === range.id;
                  return (
                    <button
                      key={range.id}
                      type="button"
                      onClick={() => setPriceRange(range.id)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        isSelected
                          ? 'bg-pink-500 text-white border-zinc-950 shadow-[2px_2px_0px_#18181B]'
                          : 'bg-white text-zinc-700 border-zinc-300 hover:border-zinc-900'
                      }`}
                    >
                      {range.label}
                    </button>
                  );
                })}
              </div>

              {/* Customer Rating Filter Buttons */}
              <div className="lg:col-span-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                <span className="text-xs font-black text-violet-800 mr-1 whitespace-nowrap shrink-0">
                  ⭐ Rating:
                </span>
                {[
                  { val: 0, label: 'All ★' },
                  { val: 4.8, label: '4.8★ & Up' },
                  { val: 4.9, label: '4.9★ Top' },
                ].map((r) => {
                  const isSelected = minRating === r.val;
                  return (
                    <button
                      key={r.val}
                      type="button"
                      onClick={() => setMinRating(r.val)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        isSelected
                          ? 'bg-yellow-300 text-zinc-950 border-zinc-950 shadow-[2px_2px_0px_#18181B]'
                          : 'bg-white text-zinc-700 border-zinc-300 hover:border-zinc-900'
                      }`}
                    >
                      {r.label}
                    </button>
                  );
                })}
              </div>

              {/* Quick Sort Pills */}
              <div className="lg:col-span-4 flex items-center gap-1.5 overflow-x-auto no-scrollbar lg:justify-end">
                <span className="text-xs font-black text-violet-800 mr-1 whitespace-nowrap shrink-0">
                  ⚡ Quick Sort:
                </span>
                {[
                  { id: 'featured' as SortOption, label: 'Featured' },
                  { id: 'price-asc' as SortOption, label: '₹ Low–High' },
                  { id: 'price-desc' as SortOption, label: '₹ High–Low' },
                  { id: 'rating' as SortOption, label: 'Top Rated' },
                ].map((s) => {
                  const isSelected = sortBy === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSortBy(s.id)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        isSelected
                          ? 'bg-cyan-300 text-zinc-950 border-zinc-950 shadow-[2px_2px_0px_#18181B]'
                          : 'bg-white text-zinc-700 border-zinc-300 hover:border-zinc-900'
                      }`}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Row 3: Product Type / Archetype Filter Bar (All 16 Product Types) */}
            <div className="pt-3 border-t border-zinc-200 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              <span className="text-xs font-black text-violet-800 mr-1 whitespace-nowrap shrink-0">
                🛍️ Product Type:
              </span>
              {ARCHETYPE_FILTERS.map((af) => {
                const isSelected = selectedArchetype === af.id;
                return (
                  <button
                    key={af.id}
                    type="button"
                    onClick={() => setSelectedArchetype(af.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      isSelected
                        ? 'bg-lime-300 text-zinc-950 border-zinc-950 shadow-[2px_2px_0px_#18181B]'
                        : 'bg-white text-zinc-700 border-zinc-300 hover:border-zinc-900'
                    }`}
                  >
                    {af.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3-Column Product Grid (All matching products) */}
          {filteredProducts.length === 0 ? (
            <div className="p-12 rounded-2xl bg-white border-2 border-zinc-950 shadow-[4px_4px_0px_#18181B] text-center">
              <h3 className="font-display text-lg font-bold text-zinc-900">
                No Ordinary Products Found 😭
              </h3>
              <p className="mt-1 text-sm text-zinc-600">
                Try clearing your search or price/rating filter to restore all {PRODUCTS.length} transformations.
              </p>
              <button
                type="button"
                onClick={resetAllFilters}
                className="mt-4 px-4 py-2 rounded-lg text-xs font-bold bg-gradient-to-r from-violet-600 to-pink-600 text-white cursor-pointer"
              >
                Reset All Filters ✨
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  cartQuantity={getCartCountForProduct(product.id)}
                  onViewProduct={(prod) => setActiveProduct(prod)}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </section>

        {/* Transformation Architecture Showcase Section */}
        <section
          id="architecture"
          className="max-w-7xl mx-auto px-6 lg:px-12 py-14 border-t-2 border-zinc-900/15"
        >
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-mono font-bold text-fuchsia-700 uppercase tracking-wider">
              02. Interactive Motion Engine ✨🔥
            </p>
            <h2 className="mt-1 font-display text-3xl font-black text-zinc-950 tracking-tight [text-wrap:balance]">
              Four Scenes of Unnecessary Drama for Every Product 💅
            </h2>
            <p className="mt-2 text-sm text-zinc-700 leading-relaxed">
              Every single one of our {PRODUCTS.length} catalog items pairs a real studio product photograph with a 4-stage interactive SVG character transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01. Preparing 🛍️',
                title: 'The Ordinary Beginning',
                desc: 'Starts with a studio photograph and clean vector illustration of the everyday product floating innocently on stage.',
                bg: 'bg-yellow-100',
              },
              {
                step: '02. Transforming ⚡',
                title: 'Precision Character Lock-In',
                desc: 'Sunglasses align with eyes, headphones clamp onto ears, and 4-piece T-shirts stitch onto the torso.',
                bg: 'bg-pink-100',
              },
              {
                step: '03. Hero Reveal 🔥',
                title: 'Cinematic Aura & Punchline',
                desc: 'Custom speed lines, concert equalizers, noir mist, and contextual emoji bursts frame the hero pose.',
                bg: 'bg-violet-100',
              },
              {
                step: '04. Product Details 💸',
                title: 'Real E-Commerce Checkout',
                desc: 'Inspect the real studio photo, switch color editions live on the character, replay the animation, or add to bag.',
                bg: 'bg-cyan-100',
              },
            ].map((card) => (
              <div
                key={card.step}
                className={`p-6 rounded-2xl ${card.bg} border-2 border-zinc-950 shadow-[4px_4px_0px_#18181B] flex flex-col justify-between`}
              >
                <div>
                  <span className="font-mono text-xs font-black text-fuchsia-700">
                    {card.step}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-extrabold text-zinc-950">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-800 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Verified Customer Testimonials (Claim-to-Proof Adjacency) */}
        <section
          id="reviews"
          className="max-w-7xl mx-auto px-6 lg:px-12 py-14 border-t-2 border-zinc-900/15"
        >
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-mono font-bold text-fuchsia-700 uppercase tracking-wider">
              03. Customer Field Reports 💀💅
            </p>
            <h2 className="mt-1 font-display text-3xl font-black text-zinc-950 tracking-tight">
              Verified Buyers Who Bought It Anyway 😭💸
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  'Before buying the ₹999 Hero Sunglasses, I walked into grocery stores like a background extra. Now I pause for 3 seconds at automatic sliding doors waiting for my neon speed lines.',
                name: 'Rohan Kulkarni',
                role: 'Senior Product Analyst',
                org: 'Bengaluru Tech Park',
                item: 'Hero Sunglasses · ₹999 😎',
              },
              {
                quote:
                  'Checked the Sovereign Chrono Watch during a Monday budget meeting. Did not become the CEO, but three colleagues asked if I had just closed a Series B round.',
                name: 'Meera Nair',
                role: 'Operations Lead',
                org: 'Kochi Maritime Logistics',
                item: 'Sovereign Chrono Wristwatch · ₹4,999 💸',
              },
              {
                quote:
                  'Submitted my final semester dissertation at 11:59 PM wearing the Quantum Cram Backpack. My sleep schedule is gone, but the orbital book animation was 100% accurate.',
                name: 'Kabir Verma',
                role: 'Final-Year Architecture Student',
                org: 'SPA New Delhi',
                item: 'Quantum Cram Backpack · ₹1,299 📚',
              },
            ].map((review) => (
              <blockquote
                key={review.name}
                className="p-6 rounded-2xl bg-white border-2 border-zinc-950 shadow-[4px_4px_0px_#18181B] flex flex-col justify-between"
              >
                <p className="text-sm text-zinc-800 leading-relaxed font-medium">
                  “{review.quote}”
                </p>
                <footer className="mt-6 pt-4 border-t border-zinc-200">
                  <div className="font-display text-sm font-bold text-zinc-950">
                    {review.name}
                  </div>
                  <div className="text-xs text-zinc-600 mt-0.5">
                    {review.role} · {review.org}
                  </div>
                  <div className="text-xs font-mono font-bold text-fuchsia-700 mt-1">
                    Purchased: {review.item}
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </section>
      </main>

      {/* Colorful Storefront Footer */}
      <footer className="border-t-2 border-zinc-950 bg-gradient-to-r from-violet-950 via-fuchsia-950 to-zinc-950 text-white px-6 lg:px-12 py-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-300">
          <div>
            <span className="font-display font-black text-yellow-300 text-sm">
              RegretKart 💀💅✨
            </span>{' '}
            · “You Didn't Need It. You Bought It Anyway.” · {PRODUCTS.length} Products · All prices in INR (₹)
          </div>
          <div className="flex items-center gap-6 font-semibold">
            <a href="#catalog" className="hover:text-yellow-300 transition-colors">
              Catalog ({PRODUCTS.length})
            </a>
            <button
              type="button"
              onClick={() => setActiveProduct(flagshipSunglasses)}
              className="hover:text-yellow-300 transition-colors cursor-pointer"
            >
              Sunglasses Demo
            </button>
            <button
              type="button"
              onClick={() => setIsAccountOpen(true)}
              className="hover:text-yellow-300 transition-colors cursor-pointer"
            >
              {currentUser ? `My Account (${orderHistory.length} Orders)` : 'Account Login'}
            </button>
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="hover:text-yellow-300 transition-colors cursor-pointer"
            >
              Shopping Bag ({totalCartItems})
            </button>
          </div>
        </div>
      </footer>

      {/* Interactive Main Character Energy Transformation Modal */}
      <AnimatedProductExperience
        product={activeProduct}
        allProducts={PRODUCTS}
        reducedMotion={reducedMotion}
        getCartCountForProduct={getCartCountForProduct}
        onClose={() => setActiveProduct(null)}
        onSelectProduct={handleSelectProductById}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-Over Shopping Cart & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        items={cartItems}
        user={currentUser}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onOrderPlaced={handleOrderPlaced}
        onOpenAccountDashboard={() => setIsAccountOpen(true)}
      />

      {/* Account Login & Orders Dashboard Modal */}
      <AccountDashboardModal
        isOpen={isAccountOpen}
        user={currentUser}
        orders={orderHistory}
        onClose={() => setIsAccountOpen(false)}
        onLogin={(account) => setCurrentUser(account)}
        onLogout={() => setCurrentUser(null)}
        onUpdateUser={(account) => setCurrentUser(account)}
        onAdvanceOrderStatus={handleAdvanceOrderStatus}
        onReorderItems={handleReorderItems}
        onViewProductTransformation={(prod) => setActiveProduct(prod)}
      />
    </div>
  );
}
