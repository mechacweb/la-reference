import { create } from 'zustand';
import { supabase } from "@/integrations/supabase/client";
import { AuthState, User } from '@/lib/types';

interface AuthStore extends AuthState {
  login: (email: string, password: string, role?: string) => Promise<void>;
  signup: (email: string, password: string, firstName: string, lastName: string, role: string) => Promise<void>;
  logout: () => Promise<void>;
  setLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: async (email, password) => {
    try {
      set({ isLoading: true });
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;

      if (data.user) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profileData) {
          set({
            user: {
              id: data.user.id,
              email: data.user.email!,
              name: `${profileData.first_name} ${profileData.last_name}`,
              role: profileData.role,
            },
            isAuthenticated: true,
          });
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  signup: async (email, password, firstName, lastName, role) => {
    try {
      set({ isLoading: true });
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            role: role,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        set({
          user: {
            id: data.user.id,
            email: data.user.email!,
            name: `${firstName} ${lastName}`,
            role: role as 'admin' | 'commercial' | 'employee',
          },
          isAuthenticated: true,
        });
      }
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  logout: async () => {
    try {
      set({ isLoading: true });
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  setLoading: (isLoading) => set({ isLoading }),
}));

// Initialize auth state from session
supabase.auth.getSession().then(({ data: { session } }) => {
  if (session?.user) {
    supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single()
      .then(({ data: profile }) => {
        if (profile) {
          useAuthStore.setState({
            user: {
              id: session.user.id,
              email: session.user.email!,
              name: `${profile.first_name} ${profile.last_name}`,
              role: profile.role,
            },
            isAuthenticated: true,
          });
        }
      });
  }
});

// Listen for auth changes
supabase.auth.onAuthStateChange(async (event, session) => {
  if (event === 'SIGNED_IN' && session?.user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (profile) {
      useAuthStore.setState({
        user: {
          id: session.user.id,
          email: session.user.email!,
          name: `${profile.first_name} ${profile.last_name}`,
          role: profile.role,
        },
        isAuthenticated: true,
      });
    }
  } else if (event === 'SIGNED_OUT') {
    useAuthStore.setState({ user: null, isAuthenticated: false });
  }
});