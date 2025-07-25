import { createClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'

// 환경 변수 확인
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// 유효한 환경 변수인지 확인하는 함수
const isValidSupabaseConfig = (url?: string, key?: string): boolean => {
  if (!url || !key) return false
  if (url.includes('your_supabase_url_here') || key.includes('your_supabase_anon_key_here')) return false
  try {
    new URL(url) // URL 유효성 검사
    return true
  } catch {
    return false
  }
}

// 더미 클라이언트 (환경 변수가 없을 때)
const createDummySupabaseClient = () => ({
  auth: {
    signInWithPassword: async () => ({ data: null, error: { message: 'Supabase가 설정되지 않았습니다.' } }),
    signOut: async () => ({ error: null }),
    getUser: async () => ({ data: { user: null }, error: null }),
    resetPasswordForEmail: async () => ({ error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        single: async () => ({ data: null, error: null })
      })
    })
  })
})

// 조건부로 클라이언트 생성
let supabaseClient: any
let supabaseAdminClient: any

if (!isValidSupabaseConfig(supabaseUrl, supabaseAnonKey)) {
  console.warn('Supabase 환경 변수가 올바르게 설정되지 않았습니다. 더미 클라이언트를 사용합니다.')
  supabaseClient = createDummySupabaseClient()
  supabaseAdminClient = createDummySupabaseClient()
} else {
  // 실제 Supabase 클라이언트
  supabaseClient = createBrowserClient(supabaseUrl!, supabaseAnonKey!)
  supabaseAdminClient = createClient(
    supabaseUrl!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey!
  )
}

export const supabase = supabaseClient
export const supabaseAdmin = supabaseAdminClient