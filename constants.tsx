
import { BusinessListing, Product } from './types.ts';

export const CATEGORIES = ['Technology', 'Finance', 'Health', 'Retail', 'Logistics'];
export const INDUSTRIES = ['B2B', 'B2C', 'Enterprise', 'Startup'];

export const MOCK_LISTINGS: BusinessListing[] = [
  {
    id: '1',
    name: 'Nexus Tech Solutions',
    category: 'Technology',
    industry: 'Enterprise',
    description: 'Providing cutting-edge cloud infrastructure for Fortune 500 companies.',
    location: 'San Francisco, CA',
    rating: 4.8,
    image: 'https://picsum.photos/seed/tech1/400/300',
    // Fixed: Added missing 'status' property required by BusinessListing type
    status: 'published'
  },
  {
    id: '2',
    name: 'Quantum Finance Group',
    category: 'Finance',
    industry: 'B2B',
    description: 'Next-generation algorithmic trading and wealth management tools.',
    location: 'London, UK',
    rating: 4.9,
    image: 'https://picsum.photos/seed/finance1/400/300',
    // Fixed: Added missing 'status' property required by BusinessListing type
    status: 'published'
  },
  {
    id: '3',
    name: 'GreenLeaf Logistics',
    category: 'Logistics',
    industry: 'B2C',
    description: 'Eco-friendly shipping and supply chain management for small businesses.',
    location: 'Berlin, Germany',
    rating: 4.5,
    image: 'https://picsum.photos/seed/logistics1/400/300',
    // Fixed: Added missing 'status' property required by BusinessListing type
    status: 'published'
  },
  {
    id: '4',
    name: 'VitalHealth Systems',
    category: 'Health',
    industry: 'Enterprise',
    description: 'Comprehensive health monitoring software for hospital networks.',
    location: 'Boston, MA',
    rating: 4.7,
    image: 'https://picsum.photos/seed/health1/400/300',
    // Fixed: Added missing 'status' property required by BusinessListing type
    status: 'published'
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Enterprise License',
    price: 999.00,
    category: 'Software',
    description: 'Full access for up to 50 users with 24/7 priority support.',
    image: 'https://picsum.photos/seed/sw1/400/400',
    // Fixed: Added missing 'stock' property required by Product type
    stock: 100
  },
  {
    id: 'p2',
    name: 'Cloud Storage Pro',
    price: 49.99,
    category: 'Storage',
    description: '1TB of encrypted cloud storage with automatic redundancy.',
    image: 'https://picsum.photos/seed/sw2/400/400',
    // Fixed: Added missing 'stock' property required by Product type
    stock: 500
  },
  {
    id: 'p3',
    name: 'Security Audit Pack',
    price: 249.00,
    category: 'Consulting',
    description: 'Full penetration testing and security compliance report.',
    image: 'https://picsum.photos/seed/sw3/400/400',
    // Fixed: Added missing 'stock' property required by Product type
    stock: 10
  }
];
