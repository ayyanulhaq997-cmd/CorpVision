import React from 'react';
import { Product } from '../types.ts';

interface ShopPageProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ShopPage: React.FC<ShopPageProps> = ({ products, onAddToCart }) => {
  return (
    <div className="py-16 bg-white min-h-screen animate-page-in">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h1 className="text-6xl font-black text-slate-900 mb-6 tracking-tighter">Enterprise Solutions</h1>
            <p className="text-xl text-slate-500 leading-relaxed font-light">
              Premium software, infrastructure, and consulting services designed to scale with your organization's ambitions.
            </p>
          </div>
          <div className="flex space-x-2">
            <div className="px-4 py-2 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg border border-indigo-100">All Products</div>
            <div className="px-4 py-2 text-slate-400 text-xs font-bold hover:text-slate-600 cursor-pointer">Licenses</div>
            <div className="px-4 py-2 text-slate-400 text-xs font-bold hover:text-slate-600 cursor-pointer">Storage</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.map((product) => (
            <div key={product.id} className="group relative flex flex-col bg-white rounded-3xl transition-all duration-500">
              <div className="relative h-[400px] bg-slate-100 rounded-[2rem] overflow-hidden mb-8 shadow-sm group-hover:shadow-2xl transition-all duration-500">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <button 
                    onClick={() => onAddToCart(product)}
                    className="w-full py-4 bg-white text-slate-950 font-bold rounded-2xl shadow-xl hover:bg-indigo-600 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0"
                  >
                    Quick Add to Cart
                  </button>
                </div>
                <div className="absolute top-6 right-6">
                  <div className="px-5 py-2 bg-white/95 backdrop-blur-xl text-indigo-600 font-black rounded-full shadow-lg text-sm">
                    ${product.price.toLocaleString()}
                  </div>
                </div>
              </div>
              
              <div className="px-4">
                <span className="inline-block text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 mb-2">{product.category}</span>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">{product.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">{product.description}</p>
                <div className="flex items-center space-x-1">
                  <div className="h-1 w-8 bg-indigo-600 rounded-full"></div>
                  <div className="h-1 w-2 bg-slate-200 rounded-full"></div>
                  <div className="h-1 w-1 bg-slate-200 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;