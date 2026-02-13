import { create } from 'zustand';
import { WardrobeItem } from '../types';
import { supabase } from '../services/supabase';

interface WardrobeState {
    items: WardrobeItem[];
    isLoading: boolean;
    error: string | null;
    fetchItems: (userId: string) => Promise<void>;
    addItem: (item: Partial<WardrobeItem>) => Promise<void>;
    removeItem: (id: string) => Promise<void>;
}

export const useWardrobeStore = create<WardrobeState>((set, get) => ({
    items: [],
    isLoading: false,
    error: null,

    fetchItems: async (userId: string) => {
        set({ isLoading: true, error: null });
        const { data, error } = await supabase
            .from('wardrobe_items')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) {
            set({ error: error.message, isLoading: false });
        } else {
            set({ items: data as WardrobeItem[], isLoading: false });
        }
    },

    addItem: async (item) => {
        const { data, error } = await supabase
            .from('wardrobe_items')
            .insert([item])
            .select()
            .single();

        if (error) {
            set({ error: error.message });
        } else {
            set((state) => ({ items: [data as WardrobeItem, ...state.items] }));
        }
    },

    removeItem: async (id) => {
        const { error } = await supabase
            .from('wardrobe_items')
            .delete()
            .eq('id', id);

        if (error) {
            set({ error: error.message });
        } else {
            set((state) => ({ items: state.items.filter(i => i.id !== id) }));
        }
    },
}));
