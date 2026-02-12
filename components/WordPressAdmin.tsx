import React, { useState } from 'react';
import { BusinessListing, Product } from '../types.ts';
import { CATEGORIES, INDUSTRIES } from '../constants.tsx';

interface WordPressAdminProps {
  listings: BusinessListing[];
  products: Product[];
  onAddListing: (listing: Omit<BusinessListing, 'id' | 'rating' | 'status'>) => void;
  onAddProduct: (product: Omit<Product, 'id' | 'stock'>) => void;
}

const WordPressAdmin: React.FC<WordPressAdminProps> = ({ listings, products, onAddListing, onAddProduct }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'listings' | 'products'>('dashboard');
  const [showAddForm, setShowAddForm] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // New Listing Form State
  const [listingForm, setListingForm] = useState({
    name: '',
    category: CATEGORIES[0],
    industry: INDUSTRIES[0],
    description: '',
    location: ''
  });

  // New Product Form State
  const [productForm, setProductForm] = useState({
    name: '',
    price: 0,
    category: 'Software',
    description: ''
  });

  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleListingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!listingForm.name || !listingForm.description) return;

    onAddListing({
      ...listingForm,
      image: `https://picsum.photos/seed/${Date.now()}/400/300`
    });
    
    setListingForm({ name: '', category: CATEGORIES[0], industry: INDUSTRIES[0], description: '', location: '' });
    setShowAddForm(false);
    showToast('Listing successfully published to database.');
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name) return;

    onAddProduct({
      ...productForm,
      price: productForm.price || 0,
      image: `https://picsum.photos/seed/${Date.now()}/400/400`
    });
    
    setProductForm({ name: '', price: 0, category: 'Software', description: '' });
    setShowAddForm(false);
    showToast('Product successfully added to inventory.');
  };

  return (
    <div className="flex h-screen bg-[#f0f0f1] font-sans text-[#3c434a]">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-12 left-1/2 transform -translate-x-1/2 z-[200] bg-[#2271b1] text-white px-6 py-3 rounded shadow-lg animate-page-in font-bold text-sm">
          {notification}
        </div>
      )}

      {/* WP Sidebar */}
      <div className="w-48 bg-[#1d2327] flex flex-col flex-shrink-0">
        <div className="p-4 flex items-center space-x-2 text-white/50 hover:text-white cursor-pointer transition-colors">
          <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center font-black">W</div>
          <span className="text-sm font-bold">CorpVision</span>
        </div>
        
        <nav className="mt-4 flex-grow">
          <button 
            onClick={() => { setActiveTab('dashboard'); setShowAddForm(false); }}
            className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-3 transition-colors ${activeTab === 'dashboard' ? 'bg-[#2271b1] text-white' : 'text-slate-400 hover:bg-[#2c3338] hover:text-[#72aee6]'}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            <span>Dashboard</span>
          </button>
          
          <div className="mt-4 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Content</div>
          
          <button 
            onClick={() => { setActiveTab('listings'); setShowAddForm(false); }}
            className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-3 transition-colors ${activeTab === 'listings' ? 'bg-[#2271b1] text-white' : 'text-slate-400 hover:bg-[#2c3338] hover:text-[#72aee6]'}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            <span>Listings</span>
          </button>

          <div className="mt-4 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">WooCommerce</div>

          <button 
            onClick={() => { setActiveTab('products'); setShowAddForm(false); }}
            className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-3 transition-colors ${activeTab === 'products' ? 'bg-[#2271b1] text-white' : 'text-slate-400 hover:bg-[#2c3338] hover:text-[#72aee6]'}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            <span>Products</span>
          </button>
        </nav>
      </div>

      <div className="flex-grow flex flex-col overflow-hidden">
        <header className="h-8 bg-[#1d2327] text-slate-300 text-xs flex items-center justify-between px-4 flex-shrink-0">
          <div className="flex items-center space-x-4">
            <span className="hover:text-[#72aee6] cursor-pointer">WP Core v6.4.1</span>
            <span className="hover:text-[#72aee6] cursor-pointer">0 Comments</span>
            <span className="hover:text-[#72aee6] cursor-pointer">+ New</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Howdy, Admin</span>
            <div className="w-5 h-5 bg-slate-600 rounded-full border border-white/10"></div>
          </div>
        </header>

        <main className="flex-grow overflow-y-auto p-8">
          {showAddForm && activeTab === 'listings' && (
            <div className="animate-page-in max-w-2xl bg-white p-8 border border-[#ccd0d4] shadow-sm">
              <h1 className="text-xl font-bold mb-6 text-slate-900 border-b pb-4">Add New Business Listing</h1>
              <form onSubmit={handleListingSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Company Name</label>
                    <input required type="text" className="w-full border border-[#8c8f94] p-2 text-sm focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] outline-none" value={listingForm.name} onChange={e => setListingForm({...listingForm, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Headquarters</label>
                    <input required type="text" className="w-full border border-[#8c8f94] p-2 text-sm focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] outline-none" value={listingForm.location} onChange={e => setListingForm({...listingForm, location: e.target.value})} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                    <select className="w-full border border-[#8c8f94] p-2 text-sm" value={listingForm.category} onChange={e => setListingForm({...listingForm, category: e.target.value})}>
                      {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Industry</label>
                    <select className="w-full border border-[#8c8f94] p-2 text-sm" value={listingForm.industry} onChange={e => setListingForm({...listingForm, industry: e.target.value})}>
                      {INDUSTRIES.map(i => <option key={i}>{i}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                  <textarea required rows={4} className="w-full border border-[#8c8f94] p-2 text-sm focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] outline-none" value={listingForm.description} onChange={e => setListingForm({...listingForm, description: e.target.value})} />
                </div>
                <div className="flex space-x-3 pt-4 border-t">
                  <button type="submit" className="px-6 py-2 bg-[#2271b1] text-white text-xs font-bold rounded hover:bg-[#135e96] transition-colors">Publish</button>
                  <button type="button" onClick={() => setShowAddForm(false)} className="px-6 py-2 bg-white border border-[#2271b1] text-[#2271b1] text-xs font-bold rounded hover:bg-slate-50 transition-colors">Cancel</button>
                </div>
              </form>
            </div>
          )}

          {showAddForm && activeTab === 'products' && (
            <div className="animate-page-in max-w-2xl bg-white p-8 border border-[#ccd0d4] shadow-sm">
              <h1 className="text-xl font-bold mb-6 text-slate-900 border-b pb-4">Add New WooCommerce Product</h1>
              <form onSubmit={handleProductSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Product Name</label>
                    <input required type="text" className="w-full border border-[#8c8f94] p-2 text-sm outline-none focus:border-[#2271b1]" value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Regular Price ($)</label>
                    <input required type="number" step="0.01" className="w-full border border-[#8c8f94] p-2 text-sm outline-none focus:border-[#2271b1]" value={productForm.price} onChange={e => setProductForm({...productForm, price: parseFloat(e.target.value) || 0})} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Product Category</label>
                  <input type="text" className="w-full border border-[#8c8f94] p-2 text-sm" placeholder="e.g. Software, Licenses" value={productForm.category} onChange={e => setProductForm({...productForm, category: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Short Description</label>
                  <textarea required rows={4} className="w-full border border-[#8c8f94] p-2 text-sm outline-none focus:border-[#2271b1]" value={productForm.description} onChange={e => setProductForm({...productForm, description: e.target.value})} />
                </div>
                <div className="flex space-x-3 pt-4 border-t">
                  <button type="submit" className="px-6 py-2 bg-[#2271b1] text-white text-xs font-bold rounded hover:bg-[#135e96] transition-colors">Save Product</button>
                  <button type="button" onClick={() => setShowAddForm(false)} className="px-6 py-2 bg-white border border-[#2271b1] text-[#2271b1] text-xs font-bold rounded hover:bg-slate-50 transition-colors">Cancel</button>
                </div>
              </form>
            </div>
          )}

          {!showAddForm && activeTab === 'dashboard' && (
            <div className="animate-page-in">
              <h1 className="text-2xl font-light text-slate-900 mb-8 tracking-tight">WordPress Dashboard Overview</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-6 shadow-sm border border-[#ccd0d4] border-l-4 border-l-[#2271b1]">
                  <h3 className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-2">Total Listings</h3>
                  <div className="text-3xl font-light text-slate-900">{listings.length}</div>
                  <div className="text-green-600 text-[10px] mt-2 font-bold flex items-center">
                    <span className="mr-1">●</span> Real-time Sync Active
                  </div>
                </div>
                <div className="bg-white p-6 shadow-sm border border-[#ccd0d4] border-l-4 border-l-[#d63638]">
                  <h3 className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-2">Pending Review</h3>
                  <div className="text-3xl font-light text-slate-900">{listings.filter(l => l.status === 'pending').length}</div>
                  <div className="text-slate-400 text-[10px] mt-2 font-bold italic">Moderation required</div>
                </div>
                <div className="bg-white p-6 shadow-sm border border-[#ccd0d4] border-l-4 border-l-[#68de7c]">
                  <h3 className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-2">WooCommerce Items</h3>
                  <div className="text-3xl font-light text-slate-900">{products.length}</div>
                  <div className="text-blue-600 text-[10px] mt-2 font-bold">Marketplace Live</div>
                </div>
              </div>
              
              <div className="bg-white p-8 border border-[#ccd0d4] shadow-sm">
                <h3 className="font-bold text-slate-900 mb-6 pb-4 border-b">At a Glance</h3>
                <div className="grid grid-cols-2 gap-8 text-sm">
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-[#2271b1] hover:underline cursor-pointer font-medium">4 Posts</span>
                    <span className="text-slate-400 font-medium">2 Pages</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-[#2271b1] hover:underline cursor-pointer font-medium">{listings.length} Listings</span>
                    <span className="text-slate-400 font-medium">{CATEGORIES.length} Categories</span>
                  </div>
                </div>
                <p className="mt-8 text-[11px] text-slate-400 italic">You are running WordPress 6.4.1 with the custom <strong>CorpVision Pro</strong> theme.</p>
              </div>
            </div>
          )}

          {!showAddForm && activeTab === 'listings' && (
            <div className="animate-page-in">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-light text-slate-900 tracking-tight">Business Directory (Custom Post Type)</h1>
                <button onClick={() => setShowAddForm(true)} className="px-4 py-2 bg-[#2271b1] text-white text-xs font-bold rounded hover:bg-[#135e96] transition-colors shadow-sm">Add New Listing</button>
              </div>
              
              <div className="bg-white shadow-sm border border-[#ccd0d4] overflow-hidden">
                <table className="w-full text-left text-[13px] border-collapse">
                  <thead className="bg-[#f6f7f7] border-b border-[#ccd0d4] text-slate-700 font-bold">
                    <tr>
                      <th className="px-6 py-3 font-bold border-r border-white/50">Business Name</th>
                      <th className="px-6 py-3 font-bold border-r border-white/50">Category</th>
                      <th className="px-6 py-3 font-bold border-r border-white/50">Industry</th>
                      <th className="px-6 py-3 font-bold border-r border-white/50">Status</th>
                      <th className="px-6 py-3 font-bold">Published</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0f0f1]">
                    {listings.map(l => (
                      <tr key={l.id} className="hover:bg-[#f6f7f7] transition-colors group">
                        <td className="px-6 py-4">
                          <div className="font-bold text-[#2271b1] cursor-pointer hover:text-[#135e96]">{l.name}</div>
                          <div className="flex space-x-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold text-[#2271b1]">
                            <button className="hover:underline">Edit</button>
                            <span className="text-slate-300">|</span>
                            <button className="hover:underline">Quick Edit</button>
                            <span className="text-slate-300">|</span>
                            <button className="text-[#d63638] hover:underline">Trash</button>
                            <span className="text-slate-300">|</span>
                            <button className="hover:underline">Preview</button>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-600">{l.category}</td>
                        <td className="px-6 py-4 text-slate-600">{l.industry}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-tighter ${l.status === 'published' ? 'bg-[#edfaef] text-[#1c6431]' : 'bg-[#fcf3ef] text-[#912d2b]'}`}>
                            {l.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-400 text-xs">May 12, 2024</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {!showAddForm && activeTab === 'products' && (
            <div className="animate-page-in">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-light text-slate-900 tracking-tight">WooCommerce Products</h1>
                <button onClick={() => setShowAddForm(true)} className="px-4 py-2 bg-[#2271b1] text-white text-xs font-bold rounded hover:bg-[#135e96] shadow-sm">Add Product</button>
              </div>

              <div className="bg-white shadow-sm border border-[#ccd0d4] overflow-hidden">
                <table className="w-full text-left text-[13px] border-collapse">
                  <thead className="bg-[#f6f7f7] border-b border-[#ccd0d4] text-slate-700 font-bold">
                    <tr>
                      <th className="px-6 py-3 font-bold border-r border-white/50">Product</th>
                      <th className="px-6 py-3 font-bold border-r border-white/50">Price</th>
                      <th className="px-6 py-3 font-bold border-r border-white/50">Category</th>
                      <th className="px-6 py-3 font-bold">Stock</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0f0f1]">
                    {products.map(p => (
                      <tr key={p.id} className="hover:bg-[#f6f7f7] transition-colors">
                        <td className="px-6 py-4 flex items-center space-x-3">
                          <img src={p.image} className="w-8 h-8 rounded border border-[#ccd0d4] object-cover bg-slate-100" />
                          <span className="font-bold text-[#2271b1] cursor-pointer">{p.name}</span>
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-900">${p.price.toFixed(2)}</td>
                        <td className="px-6 py-4 text-slate-600">{p.category}</td>
                        <td className="px-6 py-4">
                          <span className="text-[#1c6431] font-bold">{p.stock} In stock</span>
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