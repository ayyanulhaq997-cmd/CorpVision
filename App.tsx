
import React, { useState, useEffect } from 'react';
import { Page, Product, CartItem } from './types';
import Header from './components/Header';
import DirectoryPage from './components/DirectoryPage';
import ShopPage from './components/ShopPage';
import SubmitListingPage from './components/SubmitListingPage';
import CartDrawer from './components/CartDrawer';
import CheckoutPage from './components/CheckoutPage';

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

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderContent = () => {
    if (isOrderComplete) {
      return (
        <div className="max-w-7xl mx-auto px-4 py-32 text-center animate-fade-in">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Order Confirmed!</h1>
          <p className="text-lg text-slate-600 mb-12 max-w-md mx-auto">
            Your enterprise transformation has begun. Check your email for receipt and access instructions.
          </p>
          <button 
            onClick={() => {
              setIsOrderComplete(false);
              setCurrentPage(Page.Home);
            }}
            className="px-10 py-4 bg-slate-900 text-white font-bold rounded-full hover:bg-indigo-600 transition-all shadow-xl active:scale-95"
          >
            Return to Dashboard
          </button>
        </div>
      );
    }

    switch (currentPage) {
      case Page.Home:
        return (
          <div className="animate-fade-in">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-20 pb-20 md:pt-32 md:pb-32 bg-slate-900 text-white">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-6 border border-indigo-500/30">
                  Platform Relaunch v2.0
                </span>
                <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight tracking-tight">
                  Modern Enterprise <br/>
                  <span className="bg-gradient-to-r from-indigo-400 to-teal-400 bg-clip-text text-transparent">Unified Infrastructure.</span>
                </h1>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12">
                  A sleek, high-performance ecosystem designed for the modern business world. 
                  Streamlined directory services and seamless e-commerce, built for speed.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <button 
                    onClick={() => setCurrentPage(Page.Directory)}
                    className="w-full sm:w-auto px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full transition-all shadow-lg shadow-indigo-500/25 active:scale-95"
                  >
                    Browse Directory
                  </button>
                  <button 
                    onClick={() => setCurrentPage(Page.Shop)}
                    className="w-full sm:w-auto px-10 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full backdrop-blur-sm transition-all border border-white/20 active:scale-95"
                  >
                    Visit Store
                  </button>
                </div>
              </div>
            </section>

            {/* Feature Grid */}
            <section className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">Engineered for Performance</h2>
                  <p className="text-slate-600">Built from the ground up to replace legacy infrastructure with lightning-fast experiences.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-colors group">
                    <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Ultra-Fast Loading</h3>
                    <p className="text-slate-600 leading-relaxed">Core Web Vitals scores optimized to stay in the green. Lean code for maximum responsiveness.</p>
                  </div>
                  <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-colors group">
                    <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Smart Directory</h3>
                    <p className="text-slate-600 leading-relaxed">Deeply searchable business listings with advanced filtering and intuitive navigation.</p>
                  </div>
                  <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-colors group">
                    <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Sleek Checkout</h3>
                    <p className="text-slate-600 leading-relaxed">A modern e-commerce experience that removes friction and drives higher conversion rates.</p>
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
        return <div className="p-20 text-center">Page under construction</div>;
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

      <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 text-white mb-6">
                <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white font-bold">C</div>
                <span className="text-xl font-bold tracking-tight">CorpVision</span>
              </div>
              <p className="max-w-sm mb-6">
                The future of corporate identity and digital ecosystems. 
                Redefining the relationship between businesses and technology through elegant design.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Platform</h4>
              <ul className="space-y-4 text-sm">
                <li><button onClick={() => setCurrentPage(Page.Directory)} className="hover:text-white transition-colors">Directory</button></li>
                <li><button onClick={() => setCurrentPage(Page.Shop)} className="hover:text-white transition-colors">Enterprise Store</button></li>
                <li><button onClick={() => setCurrentPage(Page.SubmitListing)} className="hover:text-white transition-colors">List Your Business</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs">
            <p>&copy; 2024 CorpVision Ecosystems. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span>System Status: Optimal</span>
              </span>
              <span>Built with React + Gemini AI</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
