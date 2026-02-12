import React, { useState, useEffect } from 'react';
import { Page, Product, CartItem } from './types.ts';
import Header from './components/Header.tsx';
import DirectoryPage from './components/DirectoryPage.tsx';
import ShopPage from './components/ShopPage.tsx';
import SubmitListingPage from './components/SubmitListingPage.tsx';
import CartDrawer from './components/CartDrawer.tsx';
import CheckoutPage from './components/CheckoutPage.tsx';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? {...i, quantity: i.quantity + 1} : i);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentPage(Page.Checkout);
  };

  const handleCompleteOrder = () => {
    setCart([]);
    setIsOrderComplete(true);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderContent = () => {
    if (isOrderComplete) {
      return (
        <div className="max-w-7xl mx-auto px-4 py-32 text-center animate-fade-up">
          <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Transaction Confirmed</h1>
          <p className="text-slate-600 mb-12 max-w-md mx-auto">
            Your enterprise solutions have been provisioned. Welcome to the future of corporate agility.
          </p>
          <button 
            onClick={() => {
              setIsOrderComplete(false);
              setCurrentPage(Page.Home);
            }}
            className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-all shadow-lg"
          >
            Return to Dashboard
          </button>
        </div>
      );
    }

    switch (currentPage) {
      case Page.Home:
        return (
          <div className="animate-fade-up">
            {/* Enterprise Hero */}
            <section className="relative pt-20 pb-32 overflow-hidden bg-slate-950">
              <div className="absolute inset-0 hero-pattern opacity-20"></div>
              <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-xs font-bold tracking-widest uppercase mb-10">
                    <span className="flex h-2 w-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></span>
                    Enterprise 3.0 Platform
                  </div>
                  <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter leading-[1.05]">
                    Reimagining <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-300">Corporate Vision.</span>
                  </h1>
                  <p className="text-xl text-slate-400 mb-12 leading-relaxed font-light">
                    A lean, high-performance ecosystem for the modern enterprise. We've removed the bloat to deliver absolute clarity and speed in directory services and procurement.
                  </p>
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                    <button 
                      onClick={() => setCurrentPage(Page.Directory)}
                      className="px-10 py-5 bg-white text-slate-950 font-bold rounded-2xl hover:bg-indigo-50 transition-all shadow-xl"
                    >
                      Explore Directory
                    </button>
                    <button 
                      onClick={() => setCurrentPage(Page.Shop)}
                      className="px-10 py-5 bg-slate-900 text-white font-bold rounded-2xl border border-white/10 hover:bg-slate-800 transition-all"
                    >
                      Business Solutions
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Metrics Section */}
            <section className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
                    <div className="text-4xl font-bold text-indigo-600 mb-2">1.2s</div>
                    <div className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Avg Load Time</div>
                    <p className="text-slate-500 text-sm">Engineered for speed, achieving green Core Web Vitals across all mobile devices.</p>
                  </div>
                  <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
                    <div className="text-4xl font-bold text-indigo-600 mb-2">500+</div>
                    <div className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Verified Partners</div>
                    <p className="text-slate-500 text-sm">A strictly curated directory of world-class corporate service providers.</p>
                  </div>
                  <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
                    <div className="text-4xl font-bold text-indigo-600 mb-2">99.9%</div>
                    <div className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Checkout Success</div>
                    <p className="text-slate-500 text-sm">Seamless procurement flow designed for minimum friction and maximum security.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );
      case Page.Directory:
        return <DirectoryPage />;
      case Page.Shop:
        return <ShopPage onAddToCart={handleAddToCart} />;
      case Page.SubmitListing:
        return <SubmitListingPage onNavigate={setCurrentPage} />;
      case Page.Checkout:
        return <CheckoutPage cart={cart} onComplete={handleCompleteOrder} onNavigate={setCurrentPage} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
        cartCount={cartCount}
        onCartOpen={() => setIsCartOpen(true)}
      />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout}
      />
      <footer className="bg-slate-950 text-slate-500 py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="mb-8 flex justify-center items-center space-x-3 text-white">
             <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold">C</div>
             <span className="text-xl font-bold tracking-tight">CorpVision</span>
          </div>
          <p className="text-sm mb-8">Ground-up redesign for the high-velocity enterprise.</p>
          <div className="flex justify-center space-x-8 text-xs font-bold uppercase tracking-widest text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="mt-12 text-xs opacity-40">&copy; 2024 CorpVision Global. Built for Performance.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;