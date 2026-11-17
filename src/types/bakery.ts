export type ProductCategory =
  | 'All Products'
  | 'Cakes'
  | 'Pastries'
  | 'Breads'
  | 'Cookies'
  | 'Biscuits'
  | 'Savouries'
  | 'Desserts';

export type GalleryCategory =
  | 'All'
  | 'Cakes'
  | 'Pastries'
  | 'Breads'
  | 'Cookies & Biscuits'
  | 'Savouries'
  | 'Desserts';

export interface BakeryProduct {
  id: string;
  name: string;
  category: Exclude<ProductCategory, 'All Products'>;
  shortDescription: string;
  fullDescription: string;
  image: string;
  alt: string;
  featured?: boolean;
  occasions: string;
}

export interface CategoryShowcaseItem {
  id: string;
  title: string;
  filterCategory: ProductCategory;
  description: string;
  image: string;
  alt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: Exclude<GalleryCategory, 'All'>;
  caption: string;
  image: string;
  alt: string;
  aspectClass: string;
}
