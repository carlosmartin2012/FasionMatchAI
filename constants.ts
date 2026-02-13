import { BrandProduct, Influencer, User } from './types';

export const CURRENT_USER: User = {
  id: 'user-1',
  name: 'Alex Morgan',
  nickname: '@alexm_style',
  email: 'alex.morgan@example.com',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  plan: 'gold',
  styleTags: ['minimal', 'chic', 'neutral'],
  isPrivate: false,
  height: '172cm'
};

export const PRICING_PLANS = [
  {
    id: 'basic',
    name: 'BASIC',
    priceMonthly: 0,
    priceYearly: 0,
    features: [
      'Digital Wardrobe (up to 50 items)',
      'Basic AI Outfit Generator',
      'Community Access',
      'Standard Support'
    ],
    cta: 'CURRENT PLAN'
  },
  {
    id: 'premium',
    name: 'PREMIUM',
    priceMonthly: 9.99,
    priceYearly: 89.99, // ~25% discount
    features: [
      'Unlimited Wardrobe Items',
      'Advanced AI Analysis (Fabric & Cut)',
      'Brand Catalog Integration',
      'Priority Support',
      '2x AI Tokens'
    ],
    cta: 'UPGRADE'
  },
  {
    id: 'gold',
    name: 'GOLD',
    priceMonthly: 24.99,
    priceYearly: 239.99, // ~20% discount
    features: [
      'Everything in Premium',
      'DAILY Proactive AI Looks',
      'Personal Shopper Agent',
      'Exclusive Brand Discounts',
      'Early Access to New Features',
      'Unlimited AI Tokens'
    ],
    description: "Your AI Stylist sends you a curated look every morning.",
    cta: 'GO GOLD',
    isHighlighted: true
  }
];

// Mock Catalog simulating the Brand API integration
export const MOCK_CATALOG: BrandProduct[] = [
  {
    id: 'zara-001',
    brandName: 'Zara',
    name: 'Oversized Linen Blazer',
    price: 89.90,
    currency: 'USD',
    buyLink: '#',
    imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600',
    category: 'Outerwear',
    tags: ['minimal', 'office', 'summer']
  },
  {
    id: 'mango-023',
    brandName: 'Mango',
    name: 'Pleated Wide-Leg Trousers',
    price: 59.99,
    currency: 'USD',
    buyLink: '#',
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-b84917147c27?auto=format&fit=crop&q=80&w=600',
    category: 'Bottoms',
    tags: ['elegant', 'evening', 'classic']
  },
  // ... (rest of catalog same structure, omitting to save space if unchanged, but for safety keeping 2 examples)
];

export const MOCK_INFLUENCERS: Influencer[] = [
  {
    id: 'inf-1',
    name: 'Elena Silva',
    handle: '@elenasilva',
    imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=400',
    gender: 'female',
    height: '175cm',
    styleTags: ['Minimal', 'Chic', 'Monochrome'],
    wardrobe: [
      { 
        id: 'i1', userId: 'inf-1', imageUrl: 'https://images.unsplash.com/photo-1604085572504-a392ddf0d86a?auto=format&fit=crop&q=80&w=600', 
        category: 'Tops', color: 'White', style: 'Blouse', material: 'Silk', createdAt: Date.now(),
        brand: 'Massimo Dutti', size: 'M', sku: 'MD-9921', shopLink: 'https://massimodutti.com'
      },
      { 
        id: 'i2', userId: 'inf-1', imageUrl: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&q=80&w=600', 
        category: 'Accessories', color: 'Black', style: 'Bag', material: 'Leather', createdAt: Date.now(),
        brand: 'Celine', size: 'One Size', sku: 'CL-BAG-01', shopLink: 'https://celine.com'
      },
      { 
        id: 'i3', userId: 'inf-1', imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=600', 
        category: 'Shoes', color: 'Blue', style: 'Heels', material: 'Suede', createdAt: Date.now(),
        brand: 'Jimmy Choo', size: '38', sku: 'JC-HEEL-22', shopLink: 'https://jimmychoo.com'
      },
      { 
        id: 'i4', userId: 'inf-1', imageUrl: 'https://images.unsplash.com/photo-1550614000-4b9519e0037a?auto=format&fit=crop&q=80&w=600', 
        category: 'Outerwear', color: 'Beige', style: 'Trench', material: 'Cotton', createdAt: Date.now(),
        brand: 'Burberry', size: 'UK 10', sku: 'BUR-TR-88', shopLink: 'https://burberry.com'
      },
    ]
  },
  {
    id: 'inf-2',
    name: 'Marcus Chen',
    handle: '@marcus_c',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    gender: 'male',
    height: '182cm',
    styleTags: ['Streetwear', 'Oversized', 'Urban'],
    wardrobe: [
      { 
        id: 'i5', userId: 'inf-2', imageUrl: 'https://images.unsplash.com/photo-1559551409-dadc959f76b8?auto=format&fit=crop&q=80&w=600', 
        category: 'Outerwear', color: 'Beige', style: 'Jacket', material: 'Cotton', createdAt: Date.now(),
        brand: 'Carhartt', size: 'L', sku: 'CH-WIP-01', shopLink: 'https://carhartt.com'
      },
      { 
        id: 'i6', userId: 'inf-2', imageUrl: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?auto=format&fit=crop&q=80&w=600', 
        category: 'Bottoms', color: 'Grey', style: 'Jeans', material: 'Denim', createdAt: Date.now(),
        brand: 'Acne Studios', size: '32/32', sku: 'AC-JN-99', shopLink: 'https://acnestudios.com'
      },
    ]
  },
  // ... keeping only top 2 influencers for brevity, assume others follow same pattern
];

export const INITIAL_USER_STYLE_TAGS = ['minimal', 'chic', 'neutral'];