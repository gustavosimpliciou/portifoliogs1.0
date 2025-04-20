// Define type for product
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

// Define type for cart item (product with quantity)
export interface CartItem {
  product: Product;
  quantity: number;
}

// Define type for category filter
export type Category = 'All' | 'Camisetas' | 'Calças' | 'Vestidos' | 'Jaquetas' | 'Calçados' | 'Camisas' | 'Moletons' | 'Saias';

// Define type for sort options
export type SortOption = 'default' | 'price-asc' | 'price-desc';