export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  toolCount?: number;
  featuredTools?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoriesResponse {
  featuredCategories: Category[];
  total?: number;
}
