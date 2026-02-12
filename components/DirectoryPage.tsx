import React, { useState, useMemo } from 'react';
import { MOCK_LISTINGS, CATEGORIES, INDUSTRIES } from '../constants.tsx';

const DirectoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredListings = useMemo(() => {
    return MOCK_LISTINGS.filter((listing) => {
      const matchesSearch = 
        listing.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        listing.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || listing.category === selectedCategory;
      const matchesIndustry = selectedIndustry === 'All' || listing.industry === selectedIndustry;
      return matchesSearch && matchesCategory && matchesIndustry;
    });
  }, [searchTerm, selectedCategory, selectedIndustry]);

  return (
    <div className="py-12 bg-slate-50/50 min-h-screen animate-page-in">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <nav className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
              <a href="#" className="hover:text-indigo-600">Home</a>
              <span>/</span>
              <span className="text-slate-900">Directory</span>
            </nav>
            <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter">Global Partners</h1>
            <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
              Find, compare, and connect with the world's leading enterprise service providers.
            </p>
          </div>
          <div className="flex items-center bg-white p-1 rounded-xl shadow-sm border border-slate-200">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-6 rounded-3xl shadow-xl shadow-indigo-900/5 border border-slate-200/60 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Search Network</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Company name, role, or region..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all text-slate-900 font-medium placeholder:text-slate-400"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-4 top-4.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Category</label>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all font-medium appearance-none cursor-pointer"
              >
                <option>All</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Industry</label>
              <select 
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full px-4 py-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all font-medium appearance-none cursor-pointer"
              >
                <option>All</option>
                {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Listings Result */}
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
          : "flex flex-col space-y-6"
        }>
          {filteredListings.length > 0 ? (
            filteredListings.map((listing) => (
              <div 
                key={listing.id} 
                className={`bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group relative ${viewMode === 'list' ? 'flex' : 'flex flex-col'}`}
              >
                <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 h-auto' : 'h-64'}`}>
                  <img src={listing.image} alt={listing.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/95 backdrop-blur shadow-sm text-indigo-600 text-[10px] font-black rounded-full uppercase tracking-tighter">
                      {listing.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center mb-1 space-x-2">
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{listing.name}</h3>
                        <div className="flex items-center justify-center w-5 h-5 bg-blue-100 rounded-full text-blue-600" title="Verified Partner">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M2.166 4.9L9.03 1.62a1 1 0 01.938 0l6.865 3.28A1 1 0 0117.434 5.8v4.904a7 7 0 01-3.235 5.892l-3.83 2.502a1 1 0 01-1.077 0l-3.83-2.502a7 7 0 01-3.235-5.892V5.8a1 1 0 01.599-.9zM10.5 8a1 1 0 00-1-1h-.01a1 1 0 100 2h.01a1 1 0 001-1zm-.5 3a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{listing.industry}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center text-amber-500 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 ${i < Math.floor(listing.rating) ? 'fill-current' : 'fill-slate-200'}`} viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">{listing.rating} / 5.0</span>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 text-sm mb-8 line-clamp-2 leading-relaxed">{listing.description}</p>
                  
                  <div className="mt-auto flex items-center justify-between border-t border-slate-50 pt-6">
                    <div className="flex items-center text-slate-400 text-xs font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-indigo-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {listing.location}
                    </div>
                    <button className="text-indigo-600 text-xs font-black uppercase tracking-widest flex items-center group-hover:translate-x-1 transition-transform">
                      Details
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-32 text-center bg-white rounded-3xl border border-slate-100 border-dashed">
              <div className="p-6 bg-slate-50 inline-flex rounded-full mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No matching partners</h3>
              <p className="text-slate-500 max-w-xs mx-auto">Try refining your filters or using broader search terms.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DirectoryPage;