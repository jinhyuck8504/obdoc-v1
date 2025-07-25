'use client'

import React from 'react'
import { Users, TrendingDown, TrendingUp, Target } from 'lucide-react'

export default function PatientStatus() {
  // TODO: Fetch real data from API
  const stats = {
    totalPatients: 45,
    activePatients: 38,
    weightLossThisMonth: 12,
    goalAchieved: 8,
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">고객 현황</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-blue-600">{stats.totalPatients}</p>
          <p className="text-sm text-gray-600">전체 고객</p>
        </div>
        
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <TrendingDown className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-green-600">{stats.weightLossThisMonth}</p>
          <p className="text-sm text-gray-600">이번 달 감량</p>
        </div>
        
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-purple-600">{stats.activePatients}</p>
          <p className="text-sm text-gray-600">활성 고객</p>
        </div>
        
        <div className="text-center p-4 bg-orange-50 rounded-lg">
          <Target className="w-8 h-8 text-orange-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-orange-600">{stats.goalAchieved}</p>
          <p className="text-sm text-gray-600">목표 달성</p>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <span className="font-medium text-green-600">+15%</span> 지난 달 대비 증가
        </p>
      </div>
    </div>
  )
}