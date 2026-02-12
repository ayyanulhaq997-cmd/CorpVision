
import React from 'react';
import { MOCK_PRODUCTS } from '../constants.tsx';
import { Product } from '../types.ts';

interface ShopPageProps {
  onAddToCart: (product: Product) => void;
}

const ShopPage: React.FC<ShopPageProps> = ({ onAddToCart }) => {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Enterprise Store</h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Streamlined procurement for your business needs. Quality software and services, one click away.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_PRODUCTS.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
              <div className="h-64 bg-slate-100 overflow-hidden relative group">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-indigo-600 font-bold text-sm shadow-sm">
                  ${product.price.toLocaleString()}
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <span className="text-xs font-bold text-indigo-600 uppercase mb-2 tracking-widest">{product.category}</span>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{product.name}</h3>
                <p className="text-slate-600 text-sm mb-6 flex-grow">{product.description}</p>
                <button 
                  onClick={() => onAddToCart(product)}
                  className="w-full py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-indigo-600 transition-all shadow-lg active:scale-95 flex items-center justify-center space-x-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Add to Order</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
