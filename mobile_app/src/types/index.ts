// Shared Types for the Mobile App
export type SubscriptionPlan = 'basic' | 'premium' | 'gold';

export interface User {
  id: string;
  name: string;
  nickname: string;
  email: string;
  avatarUrl: string;
  plan: SubscriptionPlan;
  styleTags: string[];
  isPrivate: boolean;
  height?: string;
}

export interface WardrobeItem {
  id: string;
  userId: string;
  imageUrl: string;
  category: string;
  color: string;
  style: string;
  material: string;
  createdAt: number;
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
