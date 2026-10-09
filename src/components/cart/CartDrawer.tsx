import React, { useState, useEffect } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, CheckCircle2, ArrowLeft } from 'lucide-react';
import { CartItem, CheckoutOrder, UserAccount } from '../../types/store';
import { ProductSvgArtwork } from '../product/ProductSvgArtwork';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  user?: UserAccount | null;
  onClose: () => void;
  onUpdateQuantity: (productId: string, variantId: string, delta: number) => void;
  onRemoveItem: (productId: string, variantId: string) => void;
  onClearCart: () => void;
  onOrderPlaced?: (order: CheckoutOrder) => void;
  onOpenAccountDashboard?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  items,
  user,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderPlaced,
  onOpenAccountDashboard,
}) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');
  const [customerName, setCustomerName] = useState(user?.name || 'Aarav Sharma');
  const [email, setEmail] = useState(user?.email || 'aarav@regretkart.in');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
  const [address, setAddress] = useState(
    user?.address || '42 Film City Road, Bandra West, Mumbai'
  );
  const [postalCode, setPostalCode] = useState(user?.postalCode || '400050');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'UPI' | 'CARD'>('COD');
  const [confirmedOrder, setConfirmedOrder] = useState<CheckoutOrder | null>(null);
  const [formError, setFormError] = useState<string>('');

  useEffect(() => {
    if (user) {
      setCustomerName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      setAddress(user.address);
      setPostalCode(user.postalCode);
    }
  }, [user]);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal === 0 ? 0 : subtotal >= 1500 ? 0 : 99;
  const total = subtotal + shipping;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !address.trim() || !postalCode.trim()) {
      setFormError('Please complete all required delivery fields.');
      return;
    }
    setFormError('');
    const newOrder: CheckoutOrder = {
      orderId: `RK-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName: customerName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
      postalCode: postalCode.trim(),
      paymentMethod,
      items: [...items],
      subtotal,
      shipping,
      total,
      placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      placedDate: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      status: 'Dispatched',
    };
    setConfirmedOrder(newOrder);
    onOrderPlaced?.(newOrder);
    onClearCart();
    setStep('confirmed');
  };

  const handleCloseDrawer = () => {
    if (step === 'confirmed') {
      setStep('cart');
      setConfirmedOrder(null);
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag and Checkout"
    >
      <div className="relative w-full max-w-md bg-[#FAF8F5] text-zinc-900 h-full shadow-2xl flex flex-col justify-between border-l border-zinc-200">
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 bg-white">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-zinc-900" />
            <h2 className="font-display text-lg font-bold text-zinc-950">
              {step === 'cart' && `Shopping Bag (${items.reduce((acc, i) => acc + i.quantity, 0)})`}
              {step === 'checkout' && 'Express Checkout'}
              {step === 'confirmed' && 'Order Confirmed'}
            </h2>
          </div>

          <button
            type="button"
            onClick={handleCloseDrawer}
            aria-label="Close shopping bag"
            className="p-2 rounded-lg text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 'cart' && (
            <>
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-2xl bg-zinc-200/70 flex items-center justify-center mb-4">
                    <ShoppingBag className="w-7 h-7 text-zinc-500" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-zinc-900">
                    Your Bag Has Zero Main-Character Energy
                  </h3>
                  <p className="mt-1.5 text-sm text-zinc-600 max-w-xs">
                    Select any ordinary product from the catalog to unlock its cinematic transformation or add it to your bag.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Free Shipping Progress Note */}
                  <div className="p-3 rounded-lg bg-zinc-100 border border-zinc-200 text-xs text-zinc-700">
                    {subtotal >= 1500 ? (
                      <span className="font-semibold text-emerald-700">
                        Complimentary VIP Express Delivery unlocked (Order ≥ ₹1,500).
                      </span>
                    ) : (
                      <span>
                        Add{' '}
                        <strong className="font-mono tabular-nums">
                          ₹{(1500 - subtotal).toLocaleString('en-IN')}
                        </strong>{' '}
                        more for complimentary VIP Express Delivery.
                      </span>
                    )}
                  </div>

                  {items.map((item) => {
                    const variantObj =
                      item.product.variants.find((v) => v.id === item.variantId) ||
                      item.product.variants[0];
                    return (
                      <div
                        key={`${item.product.id}-${item.variantId}`}
                        className="flex gap-4 p-3.5 rounded-xl bg-white border border-zinc-200"
                      >
                        <div className="relative w-20 h-20 rounded-lg bg-zinc-900 overflow-hidden shrink-0 border border-zinc-200">
                          <img
                            src={item.product.photoUrl}
                            alt={item.product.name}
                            referrerPolicy="no-referrer"
                            style={{
                              filter:
                                item.product.photoFilter && item.product.photoFilter !== 'none'
                                  ? item.product.photoFilter
                                  : undefined,
                            }}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-1 right-1 w-7 h-7 rounded bg-white/90 p-0.5 border border-zinc-300 shadow-xs">
                            <ProductSvgArtwork
                              productId={item.product.archetypeId}
                              variant={variantObj}
                              className="w-full h-full"
                            />
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-display text-sm font-bold text-zinc-950 truncate">
                              {item.product.name}
                            </h4>
                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.product.id, item.variantId)}
                              aria-label={`Remove ${item.product.name}`}
                              className="text-zinc-400 hover:text-red-600 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <p className="text-xs text-zinc-500 mt-0.5 truncate">
                            {item.variantName} · {item.product.transformation.modeName}
                          </p>

                          <div className="mt-3 flex items-center justify-between">
                            <div className="inline-flex items-center border border-zinc-200 rounded-md bg-zinc-50">
                              <button
                                type="button"
                                onClick={() =>
                                  onUpdateQuantity(item.product.id, item.variantId, -1)
                                }
                                aria-label={`Decrease quantity of ${item.product.name}`}
                                className="px-2.5 py-1 text-xs font-bold text-zinc-700 hover:text-zinc-950 cursor-pointer"
                              >
                                −
                              </button>
                              <span className="px-2 font-mono text-xs font-semibold tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  onUpdateQuantity(item.product.id, item.variantId, 1)
                                }
                                aria-label={`Increase quantity of ${item.product.name}`}
                                className="px-2.5 py-1 text-xs font-bold text-zinc-700 hover:text-zinc-950 cursor-pointer"
                              >
                                +
                              </button>
                            </div>

                            <span className="font-mono text-sm font-bold text-zinc-950 tabular-nums">
                              ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {step === 'checkout' && (
            <form id="wse-checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
              <button
                type="button"
                onClick={() => setStep('cart')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-zinc-950 mb-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Bag</span>
              </button>

              {formError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                  {formError}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-zinc-800 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 bg-white text-sm text-zinc-900 focus:outline-2 focus:outline-zinc-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-800 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 bg-white text-sm text-zinc-900 focus:outline-2 focus:outline-zinc-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-800 mb-1">
                    PIN / Postal Code
                  </label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 bg-white text-sm font-mono text-zinc-900 focus:outline-2 focus:outline-zinc-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-800 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 bg-white text-sm text-zinc-900 focus:outline-2 focus:outline-zinc-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-800 mb-1">
                  Delivery Address
                </label>
                <textarea
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 bg-white text-sm text-zinc-900 focus:outline-2 focus:outline-zinc-900"
                />
              </div>

              <div>
                <span className="block text-xs font-semibold text-zinc-800 mb-2">
                  Payment Method
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      { id: 'COD', label: 'Cash on Delivery' },
                      { id: 'UPI', label: 'Instant UPI' },
                      { id: 'CARD', label: 'Credit / Debit' },
                    ] as const
                  ).map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      className={`px-3 py-2.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap truncate ${
                        paymentMethod === method.id
                          ? 'bg-zinc-950 text-white border-zinc-950'
                          : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400'
                      }`}
                    >
                      {method.label}
                    </button>
                  ))}
                </div>
              </div>
            </form>
          )}

          {step === 'confirmed' && confirmedOrder && (
            <div className="py-4 space-y-5">
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                <div className="flex items-center gap-2.5 mb-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Order #{confirmedOrder.orderId} Confirmed
                  </span>
                </div>
                <h3 className="font-display text-xl font-extrabold">
                  Main Character Package Dispatched
                </h3>
                <p className="mt-1 text-xs text-emerald-800 leading-relaxed">
                  Delivering to {confirmedOrder.customerName} at {confirmedOrder.address} (
                  {confirmedOrder.postalCode}). Payment mode: {confirmedOrder.paymentMethod}.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-zinc-200 space-y-2.5">
                <div className="text-xs font-semibold text-zinc-500 border-b border-zinc-100 pb-2">
                  Receipt Summary · Placed at {confirmedOrder.placedAt}
                </div>
                {confirmedOrder.items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.variantId}`}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="text-zinc-800 font-medium">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="font-mono font-semibold tabular-nums">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
                <div className="pt-2 border-t border-zinc-200 flex items-center justify-between text-sm font-bold text-zinc-950">
                  <span>Total Paid / Due</span>
                  <span className="font-mono tabular-nums">
                    ₹{confirmedOrder.total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-6 border-t border-zinc-200 bg-white">
          {step === 'cart' && items.length > 0 && (
            <div className="space-y-3">
              <div className="space-y-1.5 text-xs text-zinc-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono font-semibold text-zinc-900 tabular-nums">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-mono font-semibold text-zinc-900 tabular-nums">
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-zinc-200 flex justify-between text-base font-bold text-zinc-950">
                  <span>Total</span>
                  <span className="font-mono tabular-nums">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep('checkout')}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-bold text-zinc-950 bg-amber-400 hover:bg-amber-300 transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 'checkout' && (
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-bold text-zinc-950">
                <span>Order Total ({paymentMethod})</span>
                <span className="font-mono tabular-nums">
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>
              <button
                type="submit"
                form="wse-checkout-form"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-bold text-white bg-zinc-950 hover:bg-zinc-800 transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Confirm Order · ₹{total.toLocaleString('en-IN')}</span>
              </button>
            </div>
          )}

          {step === 'confirmed' && (
            <div className="space-y-2.5">
              {onOpenAccountDashboard && (
                <button
                  type="button"
                  onClick={() => {
                    handleCloseDrawer();
                    onOpenAccountDashboard();
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-black text-zinc-950 bg-yellow-300 hover:bg-yellow-400 border-2 border-zinc-950 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>Track Order in Account Dashboard 📦</span>
                </button>
              )}
              <button
                type="button"
                onClick={handleCloseDrawer}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-bold text-white bg-zinc-950 hover:bg-zinc-800 transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Continue Browsing Transformations</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
