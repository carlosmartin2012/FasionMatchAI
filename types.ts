// Data Models reflecting the Schema requirements

export type SubscriptionPlan = 'basic' | 'premium' | 'gold';

export interface User {
  id: string;
  name: string;
  nickname: string;
  email: string;
  avatarUrl: string;
  plan: SubscriptionPlan;
  styleTags: string[]; // e.g., 'minimal', 'boho', 'street'
  isPrivate: boolean;
  height?: string; // e.g. "175cm"
}

export interface WardrobeItem {
  id: string;
  userId: string;
  imageUrl: string; // Base64 or URL
  category: string;
  color: string;
  style: string;
  material: string;
  createdAt: number;
  // Retail Details
  brand?: string;
  shopLink?: string;
  sku?: string;
  size?: string;
}

export interface BrandProduct {
  id: string;
  brandName: string;
  name: string;
  price: number;
  currency: string;
  buyLink: string;
  imageUrl: string;
  category: string;
  tags: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  relatedProducts?: BrandProduct[];
  timestamp: number;
}

export interface AnalysisResult {
  category: string;
  color: string;
  style: string;
  material: string;
}

export interface Influencer {
  id: string;
  name: string;
  handle: string;
  imageUrl: string;
  gender: 'female' | 'male';
  styleTags: string[];
  wardrobe: WardrobeItem[];
  height?: string;
}
