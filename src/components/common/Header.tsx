'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogOut, User } from 'lucide-react'
import { auth } from '@/lib/auth'

export default function Header() {
  const router = useRouter()

  const handleLogout = async () => {
    await auth.signOut()
    router.push('/login')
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-blue-600">Obdoc</div>
            </Link>
            <div className="ml-2 text-sm text-gray-500">
              비만치료의 흐름을 설계하다
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
              대시보드
            </Link>
            <Link href="/community" className="text-gray-700 hover:text-blue-600">
              커뮤니티
            </Link>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
              <User className="h-5 w-5" />
              <span className="hidden md:block">내 정보</span>
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-700 hover:text-red-600"
            >
              <LogOut className="h-5 w-5" />
              <span className="hidden md:block">로그아웃</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}