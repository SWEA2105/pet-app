import { create } from 'zustand'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

interface AuthState {
  user: User | null
  isLoading: boolean
  setUser: (user: User | null) => void
  signOut: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: { id: '00000000-0000-0000-0000-000000000000', user_metadata: { full_name: 'Guest User' } } as any,
  isLoading: false,
  setUser: (user) => set({ user, isLoading: false }),
  signOut: async () => {
    await supabase.auth.signOut()
    set({ user: null })
  },
}))
