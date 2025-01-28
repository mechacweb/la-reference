import { create } from 'zustand';
import { supabase } from "@/integrations/supabase/client";
import { AuthState, User } from '@/lib/types';

interface AuthStore extends AuthState {
  login: (user: User) => void;
  logout: () => void;
  setLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  setLoading: (isLoading) => set({ isLoading }),
}));