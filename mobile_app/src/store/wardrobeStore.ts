import { create } from 'zustand';
import { WardrobeItem } from '../types';

interface WardrobeState {
    items: WardrobeItem[];
    isLoading: boolean;
    error: string | null;
    setItems: (items: WardrobeItem[]) => void;
    addItem: (item: WardrobeItem) => void;
    removeItem: (id: string) => void;
}

const INITIAL_WARDROBE: WardrobeItem[] = [
    {
        id: '1',
        userId: 'user-1',
        imageUrl: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=600',
        category: 'Bottoms',
        color: 'Beige',
        style: 'Chino',
        material: 'Cotton',
        createdAt: Date.now(),
        brand: 'Dockers',
        size: '32',
    },
    {
        id: '2',
        userId: 'user-1',
        imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600',
        category: 'Tops',
        color: 'White',
        style: 'Basic',
        material: 'Cotton',
        createdAt: Date.now(),
        brand: 'Uniqlo',
        size: 'L',
    },
    {
        id: '3',
        userId: 'user-1',
        imageUrl: 'https://images.unsplash.com/photo-1551028919-ac66c5f8b9b9?auto=format&fit=crop&q=80&w=600',
        category: 'Outerwear',
        color: 'Black',
        style: 'Leather Jacket',
        material: 'Leather',
        createdAt: Date.now(),
        brand: 'AllSaints',
        size: 'M',
    },
    {
        id: '4',
        userId: 'user-1',
        imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=600',
        category: 'Shoes',
        color: 'Blue',
        style: 'Heels',
        material: 'Suede',
        createdAt: Date.now(),
        brand: 'Zara',
        size: '39',
    },
];

export const useWardrobeStore = create<WardrobeState>((set) => ({
    items: INITIAL_WARDROBE,
    isLoading: false,
    error: null,
    setItems: (items) => set({ items }),
    addItem: (item) => set((state) => ({ items: [item, ...state.items] })),
    removeItem: (id) => set((state) => ({ items: state.items.filter(i => i.id !== id) })),
}));
