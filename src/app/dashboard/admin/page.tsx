'use client'

import React, { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Users, CreditCard, FileText, Bell, CheckCircle, XCircle, Clock } from 'lucide-react'

interface DoctorSubscription {
  id: string
  hospital_name: string
  hospital_type: string
  subscription_plan: string
  subscription_status: string
  subscription_start: string | null
  subscription_end: string | null
  email: string
  created_at: string
}

export default function AdminDashboardPage() {
  const [doctors, setDoctors] = useState<DoctorSubscription[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalDoctors: 0,
    activeDoctors: 0,
    pendingDoctors: 0,
    totalRevenue: 0
  })

  useEffect(() => {
    fetchDoctors()
    fetchStats()
  }, [])

  const fetchDoctors = async () => {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select(`
          id,
          hospital_name,
          hospital_type,
          subscription_plan,
          subscription_status,
          subscription_start,
          subscription_end,
          created_at,
          users!inner(email)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error

      const formattedData = data?.map((doctor: any) => ({
        ...doctor,
        email: doctor.users?.email || 'N/A'
      })) || []

      setDoctors(formattedData)
    } catch (error) {
      console.error('Error fetching doctors:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const { data: doctorsData } = await supabase
        .from('doctors')
        .select('subscription_status')

      const { data: subscriptionsData } = await supabase
        .from('subscriptions')
        .select('amount')
        .eq('payment_status', 'paid')

      if (doctorsData) {
        const totalDoctors = doctorsData.length
        const activeDoctors = doctorsData.filter(d => d.subscription_status === 'active').length
        const pendingDoctors = doctorsData.filter(d => d.subscription_status === 'pending').length
        
        const totalRevenue = subscriptionsData?.reduce((sum, sub) => sum + Number(sub.amount), 0) || 0

        setStats({
          totalDoctors,
          activeDoctors,
          pendingDoctors,
          totalRevenue
        })
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const handleApproveSubscription = async (doctorId: string, plan: string) => {
    const startDate = new Date().toISOString().split('T')[0]
    const endDate = new Date()
    
    // 구독 기간 계산
    switch (plan) {
      case '1month':
        endDate.setMonth(endDate.getMonth() + 1)
        break
      case '6months':
        endDate.setMonth(endDate.getMonth() + 6)
        break
      case '12months':
        endDate.setFullYear(endDate.getFullYear() + 1)
        break
    }

    try {
      const { error } = await supabase
        .from('doctors')
        .update({
          subscription_status: 'active',
          subscription_start: startDate,
          subscription_end: endDate.toISOString().split('T')[0],
          is_approved: true
        })
        .eq('id', doctorId)

      if (error) throw error

      // 구독 테이블도 업데이트
      await supabase
        .from('subscriptions')
        .update({ payment_status: 'paid' })
        .eq('doctor_id', doctorId)

      alert('구독이 승인되었습니다!')
      fetchDoctors()
      fetchStats()
    } catch (error) {
      console.error('Error approving subscription:', error)
      alert('승인 중 오류가 발생했습니다.')
    }
  }

  const handleRejectSubscription = async (doctorId: string) => {
    try {
      const { error } = await supabase
        .from('doctors')
        .update({
          subscription_status: 'cancelled'
        })
        .eq('id', doctorId)

      if (error) throw error

      alert('구독이 거절되었습니다.')
      fetchDoctors()
      fetchStats()
    } catch (error) {
      console.error('Error rejecting subscription:', error)
      alert('거절 중 오류가 발생했습니다.')
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" />
          활성
        </span>
      case 'pending':
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <Clock className="w-3 h-3 mr-1" />
          대기
        </span>
      case 'cancelled':
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <XCircle className="w-3 h-3 mr-1" />
          거절
        </span>
      default:
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {status}
        </span>
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW'
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">로딩 중...</div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">관리자 대시보드</h1>
        <p className="text-gray-600">Obdoc 서비스 전체 관리</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">전체 병원</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalDoctors}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">활성 병원</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.activeDoctors}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">승인 대기</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.pendingDoctors}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <CreditCard className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">총 매출</p>
              <p className="text-2xl font-semibold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 구독 관리 테이블 */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">구독 관리</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  병원 정보
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  구독 플랜
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  구독 기간
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  액션
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {doctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {doctor.hospital_name || '병원명 미입력'}
                      </div>
                      <div className="text-sm text-gray-500">{doctor.email}</div>
                      <div className="text-xs text-gray-400">{doctor.hospital_type}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {doctor.subscription_plan === '1month' && '1개월 (110,000원)'}
                      {doctor.subscription_plan === '6months' && '6개월 (528,000원)'}
                      {doctor.subscription_plan === '12months' && '12개월 (799,000원)'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(doctor.subscription_status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {doctor.subscription_start && doctor.subscription_end ? (
                      <div>
                        <div>{doctor.subscription_start}</div>
                        <div className="text-xs text-gray-500">~ {doctor.subscription_end}</div>
                      </div>
                    ) : (
                      <span className="text-gray-400">미설정</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {doctor.subscription_status === 'pending' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleApproveSubscription(doctor.id, doctor.subscription_plan)}
                          className="text-green-600 hover:text-green-900"
                        >
                          승인
                        </button>
                        <button
                          onClick={() => handleRejectSubscription(doctor.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          거절
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
