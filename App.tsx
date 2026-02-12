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
        <div className="max-w-7xl mx-auto px-4 py-32 text-center animate-fade-in">
          <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-8 text-indigo-600 shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Purchase Successful</h1>
          <p className="text-lg text-slate-600 mb-12 max-w-md mx-auto">
            Your transformation package is being prepared. Our team will contact your enterprise representative within the hour.
          </p>
          <button 
            onClick={() => {
              setIsOrderComplete(false);
              setCurrentPage(Page.Home);
            }}
            className="px-12 py-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 active:scale-95"
          >
            Back to Dashboard
          </button>
        </div>
      );
    }

    switch (currentPage) {
      case Page.Home:
        return (
          <div className="animate-fade-in">
            {/* Optimized Hero Section */}
            <section className="relative overflow-hidden pt-24 pb-32 hero-gradient text-white">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
              <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="max-w-3xl">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-bold uppercase tracking-widest mb-8 border border-white/10 backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 mr-2 animate-pulse"></span>
                    Now Scaling Globally
                  </span>
                  <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-[1.1] tracking-tighter">
                    Enterprise <br/>
                    <span className="text-indigo-400">Intelligence.</span>
                  </h1>
                  <p className="text-xl text-slate-300 mb-12 leading-relaxed font-light">
                    We've rebuilt the corporate landscape from the ground up. Experience a unified directory and procurement ecosystem designed for the high-velocity enterprise.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <button 
                      onClick={() => setCurrentPage(Page.Directory)}
                      className="w-full sm:w-auto px-10 py-5 bg-white text-slate-900 font-bold rounded-full hover:bg-indigo-50 transition-all shadow-2xl active:scale-95"
                    >
                      Find Partners
                    </button>
                    <button 
                      onClick={() => setCurrentPage(Page.Shop)}
                      className="w-full sm:w-auto px-10 py-5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-full border border-white/20 backdrop-blur-md transition-all active:scale-95"
                    >
                      Browse Solutions
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Core Value Props */}
            <section className="py-32 bg-white">
              <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                  <div className="lg:col-span-4">
                    <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">Built for Performance. <br/>Architected for Trust.</h2>
                    <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                      Our platform replaces patched-over legacy systems with a lean, purpose-built infrastructure that prioritizes the user experience above all else.
                    </p>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-indigo-600">99.9%</div>
                        <div className="text-xs text-slate-400 uppercase tracking-widest font-bold">Uptime</div>
                      </div>
                      <div className="w-px h-8 bg-slate-200"></div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-indigo-600">Green</div>
                        <div className="text-xs text-slate-400 uppercase tracking-widest font-bold">Web Vitals</div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group">
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 mb-8 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">Deep Directory</h3>
                      <p className="text-slate-500 leading-relaxed">Advanced taxonomies and real-time filtering to connect you with the right enterprise partners instantly.</p>
                    </div>
                    <div className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group">
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 mb-8 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">Unified Commerce</h3>
                      <p className="text-slate-500 leading-relaxed">A checkout flow so seamless, it feels purpose-built for your specific business logic. Frictionless procurement.</p>
                    </div>
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
        return <div className="p-20 text-center">Section under maintenance</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-indigo-100 selection:text-indigo-700">
      <Header 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
        cartCount={cartCount}
        onCartOpen={() => setIsCartOpen(true)}
      />
      <main className="flex-grow bg-[#fcfcfd]">
        {renderContent()}
      </main>
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout}
      />
      <footer className="bg-slate-900 text-slate-500 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 text-white mb-8">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20">C</div>
                <span className="text-2xl font-bold tracking-tight">CorpVision</span>
              </div>
              <p className="max-w-sm mb-10 text-lg leading-relaxed">
                Empowering the next generation of enterprise ecosystems with high-performance, design-first digital solutions.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Ecosystem</h4>
              <ul className="space-y-4">
                <li><button onClick={() => setCurrentPage(Page.Directory)} className="hover:text-white transition-colors">Directory Listing</button></li>
                <li><button onClick={() => setCurrentPage(Page.Shop)} className="hover:text-white transition-colors">Enterprise Store</button></li>
                <li><button onClick={() => setCurrentPage(Page.SubmitListing)} className="hover:text-white transition-colors">Partner Program</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Support</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Corporate Legal</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-sm">
            <p>&copy; 2024 CorpVision Global. All rights reserved.</p>
            <div className="mt-6 md:mt-0 flex items-center space-x-8">
              <span className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                <span className="text-white/80">Systems Operational</span>
              </span>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;