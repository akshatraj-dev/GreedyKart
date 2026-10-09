import React, { useState } from 'react';
import {
  X,
  User,
  Package,
  Sparkles,
  MapPin,
  LogOut,
  CheckCircle2,
  Truck,
  ShoppingBag,
  Play,
  Lock,
  Mail,
  Phone,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { CheckoutOrder, Product, StyleVariant, UserAccount } from '../../types/store';
import { ProductSvgArtwork } from '../product/ProductSvgArtwork';

interface AccountDashboardModalProps {
  isOpen: boolean;
  user: UserAccount | null;
  orders: CheckoutOrder[];
  onClose: () => void;
  onLogin: (account: UserAccount) => void;
  onLogout: () => void;
  onUpdateUser: (account: UserAccount) => void;
  onAdvanceOrderStatus: (orderId: string) => void;
  onReorderItems: (order: CheckoutOrder) => void;
  onViewProductTransformation: (product: Product, variant?: StyleVariant) => void;
}

const AVATAR_EMOJIS = ['😎', '💅', '💀', '👑', '🔥', '🎀', '🚀', '🤡'];

const ORDER_STEPS: NonNullable<CheckoutOrder['status']>[] = [
  'Processing',
  'Dispatched',
  'Out for Delivery',
  'Delivered',
];

export const AccountDashboardModal: React.FC<AccountDashboardModalProps> = ({
  isOpen,
  user,
  orders,
  onClose,
  onLogin,
  onLogout,
  onUpdateUser,
  onAdvanceOrderStatus,
  onReorderItems,
  onViewProductTransformation,
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [activeTab, setActiveTab] = useState<'orders' | 'aura' | 'address' | 'profile'>(
    'orders'
  );

  // Auth form state
  const [emailInput, setEmailInput] = useState('aarav@regretkart.in');
  const [passwordInput, setPasswordInput] = useState('maincharacter2026');
  const [nameInput, setNameInput] = useState('Aarav Sharma');
  const [phoneInput, setPhoneInput] = useState('+91 98765 43210');
  const [addressInput, setAddressInput] = useState(
    '42 Film City Road, Bandra West, Mumbai'
  );
  const [postalInput, setPostalInput] = useState('400050');
  const [selectedEmoji, setSelectedEmoji] = useState('😎');
  const [authError, setAuthError] = useState('');

  // Profile / Address edit state
  const [editName, setEditName] = useState(user?.name || 'Aarav Sharma');
  const [editPhone, setEditPhone] = useState(user?.phone || '+91 98765 43210');
  const [editAddress, setEditAddress] = useState(
    user?.address || '42 Film City Road, Bandra West, Mumbai'
  );
  const [editPostal, setEditPostal] = useState(user?.postalCode || '400050');
  const [editEmoji, setEditEmoji] = useState(user?.avatarEmoji || '😎');
  const [savedBanner, setSavedBanner] = useState(false);

  if (!isOpen) return null;

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !passwordInput.trim()) {
      setAuthError('Please enter your email and password.');
      return;
    }
    if (authMode === 'signup' && !nameInput.trim()) {
      setAuthError('Please enter your full name.');
      return;
    }

    setAuthError('');
    const newAccount: UserAccount = {
      id: `usr-${Date.now()}`,
      name: authMode === 'signup' ? nameInput.trim() : emailInput.split('@')[0] === 'aarav' ? 'Aarav Sharma' : nameInput.trim() || 'Main Character User',
      email: emailInput.trim(),
      phone: phoneInput.trim() || '+91 98765 43210',
      address: addressInput.trim() || '42 Film City Road, Bandra West, Mumbai',
      postalCode: postalInput.trim() || '400050',
      avatarEmoji: selectedEmoji,
      memberSince: 'October 2026',
    };

    setEditName(newAccount.name);
    setEditPhone(newAccount.phone);
    setEditAddress(newAccount.address);
    setEditPostal(newAccount.postalCode);
    setEditEmoji(newAccount.avatarEmoji);

    onLogin(newAccount);
  };

  const handleInstantDemoLogin = () => {
    const demoUser: UserAccount = {
      id: 'usr-demo-01',
      name: 'Aarav Sharma',
      email: 'aarav@regretkart.in',
      phone: '+91 98765 43210',
      address: '42 Film City Road, Bandra West, Mumbai',
      postalCode: '400050',
      avatarEmoji: '😎',
      memberSince: 'October 2026',
    };
    setEditName(demoUser.name);
    setEditPhone(demoUser.phone);
    setEditAddress(demoUser.address);
    setEditPostal(demoUser.postalCode);
    setEditEmoji(demoUser.avatarEmoji);
    onLogin(demoUser);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    onUpdateUser({
      ...user,
      name: editName.trim() || user.name,
      phone: editPhone.trim() || user.phone,
      address: editAddress.trim() || user.address,
      postalCode: editPostal.trim() || user.postalCode,
      avatarEmoji: editEmoji,
    });
    setSavedBanner(true);
    window.setTimeout(() => setSavedBanner(false), 1800);
  };

  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);
  const totalItemsPurchased = orders.reduce(
    (sum, o) => sum + o.items.reduce((acc, i) => acc + i.quantity, 0),
    0
  );
  const auraPoints = totalItemsPurchased * 10000;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="RegretKart Account Login and Dashboard"
    >
      <div className="relative w-full max-w-5xl rounded-3xl bg-[#FFFBEB] border-2 border-zinc-950 shadow-[8px_8px_0px_#18181B] overflow-hidden max-h-[92vh] flex flex-col">
        {/* Top Rainbow Accent Strip */}
        <div className="h-2 w-full bg-gradient-to-r from-violet-600 via-pink-500 via-amber-400 via-lime-400 to-cyan-400 shrink-0" />

        {/* Modal Header */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 bg-white border-b-2 border-zinc-950 shrink-0">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-pink-600 text-white font-bold text-lg border-2 border-zinc-950 shadow-[2px_2px_0px_#18181B]">
              {user ? user.avatarEmoji : '🔐'}
            </span>
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-black text-zinc-950 tracking-tight">
                {user ? `${user.name}'s RegretKart Dashboard 💀💅` : 'RegretKart Account Login 😭💸'}
              </h2>
              <p className="text-xs text-zinc-600 font-medium">
                {user
                  ? `${user.email} · Member Since ${user.memberSince}`
                  : 'Sign in to track your impulse orders, replay transformations & check your Aura score'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close account modal"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold text-zinc-900 bg-zinc-100 hover:bg-pink-200 border-2 border-zinc-950 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span>Close</span>
          </button>
        </div>

        {/* Modal Content Area */}
        {!user ? (
          /* ======================== ACCOUNT LOGIN / SIGN UP VIEW ======================== */
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Promo Column */}
            <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-[#4F46E5] via-[#9333EA] to-[#E11D48] text-white p-6 sm:p-8 border-2 border-zinc-950 shadow-[5px_5px_0px_#18181B] flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-yellow-300 text-zinc-950 font-mono text-xs font-black border border-zinc-950">
                  👑 MAIN CHARACTER CLUB
                </span>
                <h3 className="mt-4 font-display text-2xl sm:text-3xl font-black leading-tight">
                  Welcome to RegretKart Account Club 💀🔥
                </h3>
                <p className="mt-2 text-sm text-white/90 leading-relaxed">
                  “You Didn't Need It. You Bought It Anyway.” Log in to view all your orders, live delivery status, and Aura points.
                </p>

                <ul className="mt-5 space-y-2.5 text-xs font-bold text-yellow-200">
                  <li className="flex items-center gap-2">
                    <span>📦</span>
                    <span>Track live order delivery stages & itemized receipts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>🎬</span>
                    <span>Replay 4-scene transformations directly from your orders</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>✨</span>
                    <span>Earn +10,000 Main Character Aura per impulse buy</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>⚡</span>
                    <span>1-click Express Checkout with saved address</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-5 border-t border-white/25">
                <button
                  type="button"
                  onClick={handleInstantDemoLogin}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-black text-zinc-950 bg-gradient-to-r from-yellow-300 via-lime-300 to-cyan-300 hover:brightness-105 border-2 border-zinc-950 shadow-[3px_3px_0px_#18181B] cursor-pointer"
                >
                  <span>⚡ 1-Click Demo Login (With Sample Orders)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Login / Sign Up Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border-2 border-zinc-950 shadow-[5px_5px_0px_#18181B]">
              <div className="flex items-center gap-2 p-1 bg-violet-100 border border-zinc-900 rounded-xl w-fit mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    setAuthError('');
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-black transition-all cursor-pointer ${
                    authMode === 'login'
                      ? 'bg-gradient-to-r from-violet-600 to-pink-600 text-white'
                      : 'text-zinc-700 hover:text-zinc-950'
                  }`}
                >
                  Sign In 🔐
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signup');
                    setAuthError('');
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-black transition-all cursor-pointer ${
                    authMode === 'signup'
                      ? 'bg-gradient-to-r from-violet-600 to-pink-600 text-white'
                      : 'text-zinc-700 hover:text-zinc-950'
                  }`}
                >
                  Create Account ✨
                </button>
              </div>

              {authError && (
                <div className="mb-4 p-3 rounded-xl bg-red-100 border-2 border-red-600 text-xs font-bold text-red-800">
                  {authError}
                </div>
              )}

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {authMode === 'signup' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-zinc-800 mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={nameInput}
                          onChange={(e) => setNameInput(e.target.value)}
                          placeholder="Aarav Sharma"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border-2 border-zinc-900 text-sm font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-zinc-800 mb-1">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          value={phoneInput}
                          onChange={(e) => setPhoneInput(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border-2 border-zinc-900 text-sm font-medium"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-black text-zinc-800 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="you@regretkart.in"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border-2 border-zinc-900 text-sm font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-zinc-800 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border-2 border-zinc-900 text-sm font-medium"
                    />
                  </div>
                </div>

                {authMode === 'signup' && (
                  <>
                    <div>
                      <label className="block text-xs font-black text-zinc-800 mb-1">
                        Default Delivery Address
                      </label>
                      <input
                        type="text"
                        value={addressInput}
                        onChange={(e) => setAddressInput(e.target.value)}
                        placeholder="42 Film City Road, Bandra West, Mumbai"
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-zinc-900 text-sm font-medium"
                      />
                    </div>

                    <div>
                      <span className="block text-xs font-black text-zinc-800 mb-1.5">
                        Pick Your Gen-Z Avatar Emoji:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {AVATAR_EMOJIS.map((em) => (
                          <button
                            key={em}
                            type="button"
                            onClick={() => setSelectedEmoji(em)}
                            className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center border-2 cursor-pointer transition-transform ${
                              selectedEmoji === em
                                ? 'bg-yellow-300 border-zinc-950 scale-110 shadow-[2px_2px_0px_#18181B]'
                                : 'bg-zinc-50 border-zinc-300'
                            }`}
                          >
                            {em}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-black text-white bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 border-2 border-zinc-950 shadow-[4px_4px_0px_#18181B] cursor-pointer"
                >
                  <span>
                    {authMode === 'login'
                      ? 'Login to Account Dashboard 🚀'
                      : 'Create My RegretKart Account 💅'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* ======================== LOGGED-IN ACCOUNT DASHBOARD VIEW ======================== */
          <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
            {/* Left Sidebar Navigation */}
            <aside className="w-full md:w-64 bg-white border-b-2 md:border-b-0 md:border-r-2 border-zinc-950 p-4 sm:p-5 flex flex-col justify-between shrink-0">
              <div className="space-y-4">
                {/* User Mini Card */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-yellow-200 via-pink-200 to-violet-200 border-2 border-zinc-950 shadow-[3px_3px_0px_#18181B]">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{user.avatarEmoji}</span>
                    <div className="min-w-0">
                      <div className="font-display text-sm font-black text-zinc-950 truncate">
                        {user.name}
                      </div>
                      <div className="text-[11px] font-mono font-bold text-fuchsia-800 truncate">
                        +{auraPoints.toLocaleString()} Aura 🔥
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation Tabs */}
                <nav className="flex md:flex-col gap-2 overflow-x-auto no-scrollbar">
                  {[
                    {
                      id: 'orders' as const,
                      label: `My Orders (${orders.length})`,
                      icon: Package,
                    },
                    {
                      id: 'aura' as const,
                      label: 'Regret & Aura Stats',
                      icon: Sparkles,
                    },
                    {
                      id: 'address' as const,
                      label: 'Saved Address',
                      icon: MapPin,
                    },
                    {
                      id: 'profile' as const,
                      label: 'Account Profile',
                      icon: User,
                    },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-extrabold border-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                          isActive
                            ? 'bg-gradient-to-r from-violet-600 to-pink-600 text-white border-zinc-950 shadow-[3px_3px_0px_#18181B]'
                            : 'bg-zinc-50 text-zinc-700 border-transparent hover:border-zinc-300'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="hidden md:block pt-4 border-t border-zinc-200">
                <button
                  type="button"
                  onClick={onLogout}
                  className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-black text-red-700 bg-red-50 hover:bg-red-100 border-2 border-red-300 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </aside>

            {/* Right Main Dashboard Panel */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
              {/* Top Summary KPI Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-yellow-200 border-2 border-zinc-950 shadow-[3px_3px_0px_#18181B]">
                  <span className="text-xs font-mono font-bold text-zinc-700 uppercase">
                    📦 Total Orders
                  </span>
                  <div className="mt-1 font-display text-2xl font-black text-zinc-950 tabular-nums">
                    {orders.length} Orders
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-pink-200 border-2 border-zinc-950 shadow-[3px_3px_0px_#18181B]">
                  <span className="text-xs font-mono font-bold text-zinc-700 uppercase">
                    💸 Impulse Regret Spent
                  </span>
                  <div className="mt-1 font-display text-2xl font-black text-zinc-950 tabular-nums">
                    ₹{totalSpent.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-cyan-200 border-2 border-zinc-950 shadow-[3px_3px_0px_#18181B]">
                  <span className="text-xs font-mono font-bold text-zinc-700 uppercase">
                    🔥 Main Character Aura
                  </span>
                  <div className="mt-1 font-display text-2xl font-black text-zinc-950 tabular-nums">
                    +{auraPoints.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* TAB 1: MY ORDERS */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-black text-zinc-950">
                      Order History & Live Delivery Tracking ({orders.length})
                    </h3>
                  </div>

                  {orders.length === 0 ? (
                    <div className="p-10 rounded-2xl bg-white border-2 border-zinc-950 text-center">
                      <ShoppingBag className="w-10 h-10 text-fuchsia-600 mx-auto mb-3" />
                      <h4 className="font-display text-lg font-black text-zinc-950">
                        No Impulse Regrets Yet 😭
                      </h4>
                      <p className="mt-1 text-xs text-zinc-600 max-w-sm mx-auto">
                        Add any ordinary product to your bag and complete checkout to see your orders and live tracking here!
                      </p>
                    </div>
                  ) : (
                    orders.map((order) => {
                      const currentStatus = order.status || 'Dispatched';
                      const stepIndex = ORDER_STEPS.indexOf(currentStatus);

                      return (
                        <div
                          key={order.orderId}
                          className="p-5 rounded-2xl bg-white border-2 border-zinc-950 shadow-[4px_4px_0px_#18181B] space-y-4"
                        >
                          {/* Order Header */}
                          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-zinc-200">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-sm font-black text-zinc-950">
                                  Order #{order.orderId}
                                </span>
                                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-lime-300 text-zinc-950 border border-zinc-950">
                                  {currentStatus} 🚚
                                </span>
                                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-violet-100 text-violet-900">
                                  {order.paymentMethod}
                                </span>
                              </div>
                              <p className="text-xs text-zinc-500 mt-0.5">
                                Placed {order.placedDate || 'Today'} at {order.placedAt} · Ship to:{' '}
                                {order.address} ({order.postalCode})
                              </p>
                            </div>

                            <div className="text-right">
                              <div className="font-mono text-lg font-black text-zinc-950 tabular-nums">
                                ₹{order.total.toLocaleString('en-IN')}
                              </div>
                              <div className="text-[11px] text-zinc-500">
                                {order.shipping === 0
                                  ? 'Free VIP Delivery'
                                  : `Includes ₹${order.shipping} shipping`}
                              </div>
                            </div>
                          </div>

                          {/* 4-Stage Delivery Progress Bar */}
                          <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-200">
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="text-[11px] font-bold text-zinc-700 inline-flex items-center gap-1.5">
                                <Truck className="w-3.5 h-3.5 text-fuchsia-600" />
                                <span>Delivery Pipeline</span>
                              </span>
                              {currentStatus !== 'Delivered' && (
                                <button
                                  type="button"
                                  onClick={() => onAdvanceOrderStatus(order.orderId)}
                                  className="text-[11px] font-bold text-fuchsia-700 hover:underline cursor-pointer"
                                >
                                  Simulate Next Delivery Step →
                                </button>
                              )}
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                              {ORDER_STEPS.map((st, idx) => {
                                const isDone = idx <= stepIndex;
                                return (
                                  <div key={st} className="space-y-1">
                                    <div
                                      className={`h-2 rounded-full ${
                                        isDone
                                          ? 'bg-gradient-to-r from-violet-600 to-pink-500'
                                          : 'bg-zinc-200'
                                      }`}
                                    />
                                    <div
                                      className={`text-[10px] font-bold truncate ${
                                        isDone ? 'text-zinc-950' : 'text-zinc-400'
                                      }`}
                                    >
                                      {st}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Ordered Items List (Real Photo + SVG Rig + Watch Animation CTA) */}
                          <div className="space-y-2.5">
                            {order.items.map((item) => {
                              const variantObj =
                                item.product.variants.find((v) => v.id === item.variantId) ||
                                item.product.variants[0];
                              return (
                                <div
                                  key={`${order.orderId}-${item.product.id}-${item.variantId}`}
                                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-[#FAF8F5] border border-zinc-200"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="relative w-14 h-14 rounded-lg bg-zinc-900 overflow-hidden shrink-0 border border-zinc-300">
                                      <img
                                        src={item.product.photoUrl}
                                        alt={item.product.name}
                                        referrerPolicy="no-referrer"
                                        style={{
                                          filter:
                                            item.product.photoFilter &&
                                            item.product.photoFilter !== 'none'
                                              ? item.product.photoFilter
                                              : undefined,
                                        }}
                                        className="w-full h-full object-cover"
                                      />
                                      <div className="absolute bottom-0.5 right-0.5 w-6 h-6 rounded bg-white/95 p-0.5 border border-zinc-300">
                                        <ProductSvgArtwork
                                          productId={item.product.archetypeId}
                                          variant={variantObj}
                                          className="w-full h-full"
                                        />
                                      </div>
                                    </div>

                                    <div>
                                      <div className="font-display text-sm font-black text-zinc-950">
                                        {item.product.name}{' '}
                                        <span className="text-xs font-mono text-zinc-500">
                                          × {item.quantity}
                                        </span>
                                      </div>
                                      <div className="text-xs text-zinc-600">
                                        Style: {item.variantName} · Mode:{' '}
                                        <span className="font-semibold text-fuchsia-700">
                                          {item.product.transformation.modeName}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex items-center justify-between sm:justify-end gap-3">
                                    <span className="font-mono text-sm font-bold text-zinc-950 tabular-nums">
                                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        onClose();
                                        onViewProductTransformation(item.product, variantObj);
                                      }}
                                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black text-zinc-950 bg-yellow-300 hover:bg-yellow-400 border border-zinc-950 cursor-pointer whitespace-nowrap"
                                    >
                                      <Play className="w-3 h-3 fill-current" />
                                      <span>Replay Animation</span>
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Order Footer Actions */}
                          <div className="flex items-center justify-end gap-3 pt-2">
                            <button
                              type="button"
                              onClick={() => onReorderItems(order)}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black text-white bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 border-2 border-zinc-950 shadow-[2px_2px_0px_#18181B] cursor-pointer"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                              <span>Buy Again (Add All to Bag) 🛍️</span>
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}

              {/* TAB 2: REGRET & AURA STATS */}
              {activeTab === 'aura' && (
                <div className="space-y-4">
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-[#4F46E5] via-[#9333EA] to-[#E11D48] text-white border-2 border-zinc-950 shadow-[4px_4px_0px_#18181B]">
                    <span className="px-2.5 py-0.5 rounded-full bg-yellow-300 text-zinc-950 text-xs font-black">
                      👑 CERTIFIED DELULU VIP
                    </span>
                    <h3 className="mt-3 font-display text-2xl font-black">
                      Your Main Character Energy Report 💀🔥
                    </h3>
                    <p className="mt-1 text-sm text-white/90">
                      Every ordinary item you bought unlocked 10,000 Aura points and 0% financial responsibility.
                    </p>
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-zinc-950">
                      <div className="p-3 rounded-xl bg-yellow-300 border border-zinc-950">
                        <div className="text-[11px] font-bold">Items Unlocked</div>
                        <div className="font-display text-xl font-black">{totalItemsPurchased}</div>
                      </div>
                      <div className="p-3 rounded-xl bg-lime-300 border border-zinc-950">
                        <div className="text-[11px] font-bold">Delusion Level</div>
                        <div className="font-display text-xl font-black">300% MAX</div>
                      </div>
                      <div className="p-3 rounded-xl bg-cyan-300 border border-zinc-950">
                        <div className="text-[11px] font-bold">Regret Level</div>
                        <div className="font-display text-xl font-black">Worth It 💅</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3 & TAB 4: SAVED ADDRESS / PROFILE */}
              {(activeTab === 'address' || activeTab === 'profile') && (
                <form
                  onSubmit={handleSaveProfile}
                  className="p-6 rounded-2xl bg-white border-2 border-zinc-950 shadow-[4px_4px_0px_#18181B] space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-black text-zinc-950">
                      {activeTab === 'address'
                        ? 'Saved Delivery Address & Contact 📍'
                        : 'Profile & Gen-Z Avatar Settings 😎'}
                    </h3>
                    {savedBanner && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-lime-300 text-zinc-950 text-xs font-black border border-zinc-950">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Saved!</span>
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="block text-xs font-black text-zinc-800 mb-1.5">
                      Your Avatar Emoji:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {AVATAR_EMOJIS.map((em) => (
                        <button
                          key={em}
                          type="button"
                          onClick={() => setEditEmoji(em)}
                          className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center border-2 cursor-pointer ${
                            editEmoji === em
                              ? 'bg-yellow-300 border-zinc-950 shadow-[2px_2px_0px_#18181B]'
                              : 'bg-zinc-50 border-zinc-300'
                          }`}
                        >
                          {em}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-zinc-800 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-zinc-900 text-sm font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-zinc-800 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-zinc-900 text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-black text-zinc-800 mb-1">
                        Delivery Street Address
                      </label>
                      <input
                        type="text"
                        value={editAddress}
                        onChange={(e) => setEditAddress(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-zinc-900 text-sm font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-zinc-800 mb-1">
                        PIN / Postal Code
                      </label>
                      <input
                        type="text"
                        value={editPostal}
                        onChange={(e) => setEditPostal(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-zinc-900 text-sm font-mono font-bold"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={onLogout}
                      className="md:hidden inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-black text-red-700 bg-red-50 border-2 border-red-300 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black text-zinc-950 bg-lime-300 hover:bg-lime-400 border-2 border-zinc-950 shadow-[3px_3px_0px_#18181B] cursor-pointer"
                    >
                      <span>Save Account Details ✨</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
