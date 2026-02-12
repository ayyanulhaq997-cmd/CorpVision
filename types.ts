
export interface BusinessListing {
  id: string;
  name: string;
  category: string;
  industry: string;
  description: string;
  location: string;
  rating: number;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export enum Page {
  Home = 'home',
  Directory = 'directory',
  Shop = 'shop',
  Checkout = 'checkout',
  SubmitListing = 'submit-listing'
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
