'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import LoadingSpinner from '../common/LoadingSpinner'

interface AuthGuardProps {
  children: React.ReactNode
  requiredRole?: 'doctor' | 'patient' | 'admin'
}

export default function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const router = useRouter()
  // TODO: Implement auth state management
  const isLoading = false
  const user = null
  
  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!user) {
    router.push('/login')
    return null
  }

  // TODO: Check user role if requiredRole is specified
  if (requiredRole && user.role !== requiredRole) {
    router.push('/unauthorized')
    return null
  }

  return <>{children}</>
}