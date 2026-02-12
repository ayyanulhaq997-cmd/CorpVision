import React, { useState } from 'react';
import { MOCK_LISTINGS, MOCK_PRODUCTS } from '../constants.tsx';

const WordPressAdmin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'listings' | 'products'>('dashboard');

  return (
    <div className="flex h-screen bg-[#f0f0f1] font-sans text-[#3c434a]">
      {/* WP Sidebar */}
      <div className="w-48 bg-[#1d2327] flex flex-col">
        <div className="p-4 flex items-center space-x-2 text-white/50 hover:text-white cursor-pointer transition-colors">
          <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12.158 12.786l-2.698 7.84c.806.236 1.657.365 2.54.365 1.047 0 2.05-.176 2.986-.502-.02-.03-.037-.064-.052-.098l-2.776-7.605zm11.594-1.036c0-1.259-.453-2.122-1.071-3.085l.013-.023c-.613-1.066-1.334-1.812-1.334-3.174 0-1.465 1.111-2.827 2.396-2.827.061 0 .12.001.177.003C21.456.93 18.33 0 14.852 0 8.79 0 3.731 4.156 2.22 9.754l6.095 16.712c1.97.777 4.12 1.206 6.37 1.206 1.34 0 2.636-.15 3.882-.435l-1.06-2.903c-.562-1.543-1.087-3.414-1.087-4.708 0-1.362.806-2.298 1.642-3.23.633-.679 1.314-1.41 1.314-2.656zm-17.776 1.95L3.62 20.306C1.4 18.152 0 15.138 0 11.803c0-2.316.677-4.475 1.848-6.29l4.128 11.188zm6.575-1.928l2.257-6.52c-.636-.183-1.4-.298-2.22-.298-.823 0-1.594.116-2.233.3l2.196 6.518z"/></svg>
          </div>
          <span className="text-sm font-bold">CorpVision</span>
        </div>
        
        <nav className="mt-4 flex-grow">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-3 ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-indigo-400'}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            <span>Dashboard</span>
          </button>
          
          <div className="mt-4 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Content</div>
          
          <button 
            onClick={() => setActiveTab('listings')}
            className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-3 ${activeTab === 'listings' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-indigo-400'}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            <span>Listings</span>
          </button>

          <div className="mt-4 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">WooCommerce</div>

          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-3 ${activeTab === 'products' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-indigo-400'}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            <span>Products</span>
          </button>
        </nav>
      </div>

      {/* Main Admin Area */}
      <div className="flex-grow flex flex-col overflow-hidden">
        {/* Admin Bar */}
        <header className="h-8 bg-[#1d2327] text-slate-300 text-xs flex items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <span className="hover:text-white cursor-pointer">WP Core v6.4.1</span>
            <span className="hover:text-white cursor-pointer">0 Comments</span>
            <span className="hover:text-white cursor-pointer">+ New</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Howdy, Admin</span>
            <div className="w-5 h-5 bg-slate-600 rounded-full"></div>
          </div>
        </header>

        {/* Content Container */}
        <main className="flex-grow overflow-y-auto p-8">
          {activeTab === 'dashboard' && (
            <div className="animate-page-in">
              <h1 className="text-2xl font-light text-slate-900 mb-8">Dashboard Overview</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-6 shadow-sm border-l-4 border-indigo-600">
                  <h3 className="text-slate-500 text-sm font-bold uppercase mb-2">Total Listings</h3>
                  <div className="text-3xl font-light">1,248</div>
                  <div className="text-green-600 text-xs mt-2 font-bold">↑ 12% this month</div>
                </div>
                <div className="bg-white p-6 shadow-sm border-l-4 border-amber-500">
                  <h3 className="text-slate-500 text-sm font-bold uppercase mb-2">Pending Review</h3>
                  <div className="text-3xl font-light">24</div>
                  <div className="text-slate-400 text-xs mt-2 font-bold italic">Requires action</div>
                </div>
                <div className="bg-white p-6 shadow-sm border-l-4 border-blue-500">
                  <h3 className="text-slate-500 text-sm font-bold uppercase mb-2">Monthly Sales</h3>
                  <div className="text-3xl font-light">$42,900</div>
                  <div className="text-green-600 text-xs mt-2 font-bold">↑ 8% this month</div>
                </div>
              </div>
              
              <div className="bg-white p-8 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-6 pb-4 border-b">At a Glance</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-indigo-600 hover:underline cursor-pointer">4 Posts</span>
                    <span className="text-slate-500">2 Pages</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-indigo-600 hover:underline cursor-pointer">1,248 Listings</span>
                    <span className="text-slate-500">24 Categories</span>
                  </div>
                </div>
                <p className="mt-8 text-xs text-slate-400 italic">You are using WordPress with the custom <strong>CorpVision Block Theme</strong>.</p>
              </div>
            </div>
          )}

          {activeTab === 'listings' && (
            <div className="animate-page-in">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-light text-slate-900">Business Listings (CPT)</h1>
                <button className="px-4 py-2 border border-indigo-600 text-indigo-600 text-xs font-bold rounded hover:bg-indigo-50 transition-colors">Add New Listing</button>
              </div>
              
              <div className="bg-white shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#f9f9f9] border-b text-slate-500 font-bold">
                    <tr>
                      <th className="px-6 py-3 font-bold">Business Name</th>
                      <th className="px-6 py-3 font-bold">Category</th>
                      <th className="px-6 py-3 font-bold">Industry</th>
                      <th className="px-6 py-3 font-bold">Status</th>
                      <th className="px-6 py-3 font-bold">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {MOCK_LISTINGS.map(l => (
                      <tr key={l.id} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="font-bold text-indigo-600 cursor-pointer">{l.name}</div>
                          <div className="flex space-x-3 mt-1 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold text-slate-400">
                            <button className="text-blue-500 hover:text-blue-700">Edit</button>
                            <button className="text-blue-500 hover:text-blue-700">Quick Edit</button>
                            <button className="text-red-500 hover:text-red-700">Trash</button>
                            <button className="text-blue-500 hover:text-blue-700">View</button>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-500">{l.category}</td>
                        <td className="px-6 py-4 text-slate-500">{l.industry}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase tracking-tighter">Published</span>
                        </td>
                        <td className="px-6 py-4 text-slate-400 text-xs">2024/05/12</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="animate-page-in">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-light text-slate-900">WooCommerce Products</h1>
                <button className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded hover:bg-indigo-700 transition-colors">Add Product</button>
              </div>

              <div className="bg-white shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#f9f9f9] border-b text-slate-500 font-bold">
                    <tr>
                      <th className="px-6 py-3 font-bold">Product</th>
                      <th className="px-6 py-3 font-bold">Price</th>
                      <th className="px-6 py-3 font-bold">Category</th>
                      <th className="px-6 py-3 font-bold">Stock</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {MOCK_PRODUCTS.map(p => (
                      <tr key={p.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 flex items-center space-x-3">
                          <img src={p.image} className="w-8 h-8 rounded border" />
                          <span className="font-bold text-indigo-600">{p.name}</span>
                        </td>
                        <td className="px-6 py-4">${p.price}</td>
                        <td className="px-6 py-4 text-slate-500">{p.category}</td>
                        <td className="px-6 py-4">
                          <span className="text-green-600 font-bold">In stock</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default WordPressAdmin;