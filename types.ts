export interface BusinessListing {
  id: string;
  name: string;
  category: string;
  industry: string;
  description: string;
  location: string;
  rating: number;
  image: string;
  status: 'published' | 'pending' | 'draft';
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export enum Page {
  Home = 'home',
  Directory = 'directory',
  Shop = 'shop',
  Checkout = 'checkout',
  SubmitListing = 'submit-listing',
  Admin = 'admin'
}

export interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}