export type ArchetypeId =
  | 'sunglasses'
  | 'sneakers'
  | 'watch'
  | 'headphones'
  | 'lipstick'
  | 'tshirt'
  | 'perfume'
  | 'backpack'
  | 'jeans'
  | 'shirt'
  | 'makeup'
  | 'frock'
  | 'belt'
  | 'socks'
  | 'slippers'
  | 'necklace';

export type ProductId = string;

export type TransformationStage =
  | 'idle'
  | 'preparing'
  | 'transforming'
  | 'reveal'
  | 'details';

export type BackdropTheme =
  | 'neon-hero'
  | 'action-kinetic'
  | 'billionaire-gold'
  | 'music-equalizer'
  | 'glamour-runway'
  | 'celebrity-carpet'
  | 'mystery-noir'
  | 'college-orbit';

export interface StyleVariant {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentHex: string;
}

export interface ProductTransformationConfig {
  productId: ProductId;
  archetypeId: ArchetypeId;
  modeName: string;
  ordinaryCaption: string;
  transformingCaption: string;
  finalHeadline: string;
  supportingJoke: string;
  emojis: [string, string, string];
  backdropTheme: BackdropTheme;
  impactWord: string;
  specialActionLabel?: string;
  stageTimings: {
    preparingMs: number;
    transformingMs: number;
    revealMs: number;
  };
}

export interface Product {
  id: ProductId;
  archetypeId: ArchetypeId;
  sku: string;
  name: string;
  tagline: string;
  price: number;
  category:
    | 'Eyewear & Audio'
    | 'Footwear & Apparel'
    | 'Luxury & Beauty'
    | 'Everyday Carry';
  rating: number;
  reviewCount: number;
  description: string;
  mundaneReality: string;
  cinematicPromise: string;
  photoUrl: string;
  photoFilter?: string;
  isFlagship?: boolean;
  variants: StyleVariant[];
  transformation: ProductTransformationConfig;
}

export interface CartItem {
  product: Product;
  quantity: number;
  variantId: string;
  variantName: string;
}

export interface CheckoutOrder {
  orderId: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  paymentMethod: 'COD' | 'UPI' | 'CARD';
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  placedAt: string;
  placedDate?: string;
  status?: 'Processing' | 'Dispatched' | 'Out for Delivery' | 'Delivered';
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  avatarEmoji: string;
  memberSince: string;
}

