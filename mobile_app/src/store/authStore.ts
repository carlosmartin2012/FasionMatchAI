import { create } from 'zustand';
import { supabase } from '../services/supabase';
import { User } from '@supabase/supabase-js';

interface AuthState {
    user: User | null;
    session: any | null;
    isLoading: boolean;
    setSession: (session: any) => void;
    signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    session: null,
    isLoading: true,
    setSession: (session) => set({
        session,
        user: session?.user ?? null,
        isLoading: false
    }),
    signOut: async () => {
        await supabase.auth.signOut();
        set({ user: null, session: null });
    },
}));
