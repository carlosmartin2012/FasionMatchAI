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

export const useWardrobeStore = create<WardrobeState>((set) => ({
    items: [],
    isLoading: false,
    error: null,
    setItems: (items) => set({ items }),
    addItem: (item) => set((state) => ({ items: [item, ...state.items] })),
    removeItem: (id) => set((state) => ({ items: state.items.filter(i => i.id !== id) })),
}));
