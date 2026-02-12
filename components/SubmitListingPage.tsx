import React, { useState } from 'react';
import { generateListingDescription } from '../services/geminiService.ts';
import { Page, BusinessListing } from '../types.ts';

interface SubmitListingPageProps {
  onAddListing: (listing: Omit<BusinessListing, 'id' | 'rating' | 'status'>) => void;
  onNavigate: (page: Page) => void;
}

const SubmitListingPage: React.FC<SubmitListingPageProps> = ({ onAddListing, onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    industry: 'Technology',
    keywords: '',
    description: '',
    location: '',
    category: 'Technology'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleGenerateAI = async () => {
    if (!formData.name || !formData.keywords) {
      alert('Please enter a business name and some keywords first!');
      return;
    }
    setIsGenerating(true);
    const aiDesc = await generateListingDescription(formData.name, formData.industry, formData.keywords);
    setFormData(prev => ({ ...prev, description: aiDesc }));
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddListing({
      name: formData.name,
      industry: formData.industry,
      description: formData.description,
      location: formData.location,
      category: formData.category,
      image: `https://picsum.photos/seed/${formData.name.replace(/\s/g, '')}/400/300`
    });
    setIsSubmitted(true);
    setTimeout(() => onNavigate(Page.Directory), 2000);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center animate-page-in">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Submission Received!</h2>
        <p className="text-slate-600">Your business listing is being reviewed. You will be redirected shortly.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 animate-page-in">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">Join the Network</h1>
        <p className="text-lg text-slate-600">Showcase your business to our global corporate audience.</p>
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Business Name</label>
            <input 
              required
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(p => ({...p, name: e.target.value}))}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="e.g. Acme Corp"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Primary Industry</label>
            <select 
              value={formData.industry}
              onChange={(e) => setFormData(p => ({...p, industry: e.target.value}))}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            >
              <option>Technology</option>
              <option>Finance</option>
              <option>Health</option>
              <option>Retail</option>
              <option>Logistics</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Keywords for AI Assistant</label>
          <input 
            type="text"
            value={formData.keywords}
            onChange={(e) => setFormData(p => ({...p, keywords: e.target.value}))}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            placeholder="e.g. cloud, scalable, security, enterprise"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-semibold text-slate-700">Business Description</label>
            <button 
              type="button"
              onClick={handleGenerateAI}
              disabled={isGenerating}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1 disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>{isGenerating ? 'Drafting...' : 'AI Assist: Draft Bio'}</span>
            </button>
          </div>
          <textarea 
            required
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData(p => ({...p, description: e.target.value}))}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
            placeholder="Tell us what makes your business unique..."
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Headquarters Location</label>
          <input 
            required
            type="text"
            value={formData.location}
            onChange={(e) => setFormData(p => ({...p, location: e.target.value}))}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            placeholder="e.g. New York, NY"
          />
        </div>
        <button 
          type="submit"
          className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-indigo-600 transition-all shadow-xl active:scale-[0.98]"
        >
          Submit Listing for Review
        </button>
      </form>
    </div>
  );
};

export default SubmitListingPage;