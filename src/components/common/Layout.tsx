'use client'

import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { User } from '@/lib/auth'

interface LayoutProps {
  children: React.ReactNode
  user?: User | null
  showHeader?: boolean
  showFooter?: boolean
}

export default function Layout({ 
  children, 
  user, 
  showHeader = true, 
  showFooter = true 
}: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {showHeader && <Header />}
      <main className="flex-1">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  )
}