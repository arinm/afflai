// Tool Interface
export interface Tool {
  id: string;
  title: string;
  link: string;
  description: string;
  pricing: string;
  tags: string[];
}

// Category Interface
export interface Category {
  category: string;
  tools: Tool[];
}

// Master File Interface
export interface MasterFile {
  categories: string[];
  categoryFiles: Record<string, string>;
  metadata: {
    version: string;
    lastUpdated: string;
    totalTools: number;
    description: string;
  };
}

// Filter Options Interface
export interface FilterOptions {
  priceRanges?: string[];
  tags?: string[];
  searchTerm?: string;
}

// Search Result Interface
export interface SearchResult {
  tool: Tool;
  category: string;
  relevanceScore: number;
}

// User Interface (if you implement user accounts)
export interface User {
  id: string;
  name: string;
  email: string;
  favorites: string[]; // Tool IDs
  history: {
    toolId: string;
    timestamp: number;
  }[];
}

// Affiliate Link Tracking
export interface AffiliateClick {
  toolId: string;
  category: string;
  timestamp: number;
  referrer?: string;
  userId?: string;
}