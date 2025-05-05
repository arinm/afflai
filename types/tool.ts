export interface Tool {
  id: string;
  title: string;
  description: string;
  link: string;
  pricing: string;
  tags: string[];
  categoryId: string;
  imageUrl?: string;
  features?: string[];
  rating?: number;
  reviewCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ToolsResponse {
  featuredTools: Tool[];
  total?: number;
  page?: number;
  limit?: number;
}
