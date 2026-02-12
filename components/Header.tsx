
import React from 'react';
import { Page } from '../types';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  cartCount: number;
  onCartOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, cartCount, onCartOpen }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 cursor-pointer group"
          onClick={() => onNavigate(Page.Home)}
        >
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:bg-indigo-700 transition-colors">
            C
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">CorpVision</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          {[
            { id: Page.Home, label: 'Home' },
            { id: Page.Directory, label: 'Directory' },
            { id: Page.Shop, label: 'Products' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
                currentPage === item.id ? 'text-indigo-600' : 'text-slate-600'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <button 
            onClick={onCartOpen}
            className="relative p-2 text-slate-600 hover:text-indigo-600 transition-colors active:scale-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
          <button 
            onClick={() => onNavigate(Page.SubmitListing)}
            className="hidden sm:block px-5 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-full hover:bg-slate-800 transition-all shadow-sm active:scale-95"
          >
            List Business
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
