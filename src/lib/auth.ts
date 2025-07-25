import { supabase } from './supabase'

export interface User {
  id: string
  email?: string
  phone?: string
  role: 'doctor' | 'patient' | 'admin'
  isActive: boolean
}

export const auth = {
  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) {
        console.error('Login error:', error)
        return { data: null, error }
      }
      
      return { data, error: null }
    } catch (error) {
      console.error('Login exception:', error)
      return { data: null, error: { message: '로그인 중 오류가 발생했습니다.' } }
    }
  },

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      return { error }
    } catch (error) {
      console.error('Logout error:', error)
      return { error: { message: '로그아웃 중 오류가 발생했습니다.' } }
    }
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) return null

      // 사용자 프로필 정보 가져오기
      const { data: profile, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error || !profile) {
        console.error('Profile fetch error:', error)
        return null
      }

      return {
        id: profile.id,
        email: profile.email,
        phone: profile.phone,
        role: profile.role,
        isActive: profile.is_active
      }
    } catch (error) {
      console.error('Get current user error:', error)
      return null
    }
  },

  async resetPassword(email: string) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email)
      return { error }
    } catch (error) {
      console.error('Reset password error:', error)
      return { error: { message: '비밀번호 재설정 중 오류가 발생했습니다.' } }
    }
  }
}