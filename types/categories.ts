export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
}

export interface Tool {
  id: string;
  title: string;
  description: string;
  link: string;
  pricing: string;
  tags: string[];
  categoryId: string;
}

export interface CategoriesResponse {
  featuredCategories: Category[];
}

export interface ToolsResponse {
  featuredTools: Tool[];
}
