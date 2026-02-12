import React, { useState, useEffect } from 'react';
import { Page, Product, CartItem } from './types.ts';
import Header from './components/Header.tsx';
import DirectoryPage from './components/DirectoryPage.tsx';
import ShopPage from './components/ShopPage.tsx';
import SubmitListingPage from './components/SubmitListingPage.tsx';
import CartDrawer from './components/CartDrawer.tsx';
import CheckoutPage from './components/CheckoutPage.tsx';
import WordPressAdmin from './components/WordPressAdmin.tsx';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

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
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage, isAdminMode]);

  if (isAdminMode) {
    return (
      <div className="relative">
        <WordPressAdmin />
        <button 
          onClick={() => setIsAdminMode(false)}
          className="fixed bottom-6 right-6 z-[100] px-6 py-3 bg-indigo-600 text-white font-bold rounded-full shadow-2xl hover:bg-indigo-700 transition-all flex items-center space-x-2 border-2 border-white"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
          <span>View Public Site</span>
        </button>
      </div>
    );
  }

  const renderContent = () => {
    if (isOrderComplete) {
      return (
        <div className="max-w-3xl mx-auto px-4 py-40 text-center animate-page-in">
          <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-10 shadow-xl border border-green-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">Order Finalized.</h1>
          <p className="text-xl text-slate-500 mb-12 leading-relaxed">
            Your transaction was successful. We've sent the confirmation details and onboarding documentation to your primary email address.
          </p>
          <button 
            onClick={() => {
              setIsOrderComplete(false);
              setCurrentPage(Page.Home);
            }}
            className="px-12 py-5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-indigo-600 transition-all shadow-2xl active:scale-95"
          >
            Back to Dashboard
          </button>
        </div>
      );
    }

    switch (currentPage) {
      case Page.Home:
        return (
          <div className="animate-page-in">
            {/* Ultra-Modern Hero */}
            <section className="relative pt-32 pb-48 overflow-hidden bg-white">
              <div className="absolute inset-0 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.03]"></div>
              <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="max-w-4xl">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-black tracking-widest uppercase mb-12">
                    <span className="flex h-2 w-2 rounded-full bg-indigo-600 mr-2 animate-ping"></span>
                    Gutenberg Block Redesign
                  </div>
                  <h1 className="text-7xl md:text-9xl font-black text-slate-950 mb-10 tracking-tighter leading-[0.85]">
                    Velocity <br/>
                    <span className="text-indigo-600 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Meets Vision.</span>
                  </h1>
                  <p className="text-2xl text-slate-500 mb-16 leading-relaxed max-w-2xl font-light">
                    The next generation of corporate agility. A lean, purpose-built WordPress ecosystem for discovery and procurement.
                  </p>
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                    <button 
                      onClick={() => setCurrentPage(Page.Directory)}
                      className="px-12 py-6 bg-indigo-600 text-white font-black rounded-[2rem] hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-600/30 active:scale-95"
                    >
                      Browse Directory
                    </button>
                    <button 
                      onClick={() => setCurrentPage(Page.Shop)}
                      className="px-12 py-6 bg-slate-100 text-slate-900 font-black rounded-[2rem] hover:bg-slate-200 transition-all active:scale-95"
                    >
                      Visit Marketplace
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Visual Feature Grid */}
            <section className="py-32 bg-slate-50 border-y border-slate-100">
              <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                  <div className="group">
                    <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-sm mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">WordPress Powered</h3>
                    <p className="text-slate-500 leading-relaxed text-sm">Custom Post Types and Taxonomies built specifically for corporate directories. No bloat, just performance.</p>
                  </div>
                  <div className="group">
                    <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-sm mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">WooCommerce Flow</h3>
                    <p className="text-slate-500 leading-relaxed text-sm">A customized checkout experience that integrates perfectly with your corporate procurement workflows.</p>
                  </div>
                  <div className="group">
                    <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-sm mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Gutenberg-First</h3>
                    <p className="text-slate-500 leading-relaxed text-sm">Every element is a reusable block. Edit your layouts visually without compromising on speed or clean code standards.</p>
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
    <div className="min-h-screen flex flex-col selection:bg-indigo-600 selection:text-white">
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

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsAdminMode(true)}
        className="fixed bottom-6 right-6 z-50 px-6 py-3 bg-slate-900 text-white font-bold rounded-full shadow-2xl hover:bg-indigo-600 transition-all flex items-center space-x-2 border-2 border-white/10"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.158 12.786l-2.698 7.84c.806.236 1.657.365 2.54.365 1.047 0 2.05-.176 2.986-.502-.02-.03-.037-.064-.052-.098l-2.776-7.605zm11.594-1.036c0-1.259-.453-2.122-1.071-3.085l.013-.023c-.613-1.066-1.334-1.812-1.334-3.174 0-1.465 1.111-2.827 2.396-2.827.061 0 .12.001.177.003C21.456.93 18.33 0 14.852 0 8.79 0 3.731 4.156 2.22 9.754l6.095 16.712c1.97.777 4.12 1.206 6.37 1.206 1.34 0 2.636-.15 3.882-.435l-1.06-2.903c-.562-1.543-1.087-3.414-1.087-4.708 0-1.362.806-2.298 1.642-3.23.633-.679 1.314-1.41 1.314-2.656zm-17.776 1.95L3.62 20.306C1.4 18.152 0 15.138 0 11.803c0-2.316.677-4.475 1.848-6.29l4.128 11.188zm6.575-1.928l2.257-6.52c-.636-.183-1.4-.298-2.22-.298-.823 0-1.594.116-2.233.3l2.196 6.518z"/></svg>
        <span>WP Admin Dashboard</span>
      </button>

      <footer className="bg-slate-950 text-slate-400 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 text-white mb-8">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-black text-xl">C</div>
                <span className="text-2xl font-black tracking-tight">CorpVision</span>
              </div>
              <p className="max-w-sm text-lg font-light leading-relaxed">A high-performance WordPress Block Theme built for the global enterprise. Speed, scale, and simplicity.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Platform</h4>
              <ul className="space-y-4 text-sm">
                <li><button onClick={() => setCurrentPage(Page.Directory)} className="hover:text-white transition-colors">Directory</button></li>
                <li><button onClick={() => setCurrentPage(Page.Shop)} className="hover:text-white transition-colors">Marketplace</button></li>
                <li><button onClick={() => setCurrentPage(Page.SubmitListing)} className="hover:text-white transition-colors">Join Network</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Connect</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Support Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Partner API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press Room</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs font-medium opacity-40 uppercase tracking-widest">&copy; 2024 CorpVision Ecosystem. Powered by WordPress.</p>
            <div className="flex space-x-8 text-xs font-bold uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;