'use client'

import React from 'react'
import { Calendar, Users, Search, CheckSquare } from 'lucide-react'

export default function DoctorDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">원장님 대시보드</h1>
        <p className="text-gray-600">오늘의 일정과 환자 현황을 확인하세요</p>
      </div>

      {/* 위젯 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* 오늘 할 일 */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <CheckSquare className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">오늘 할 일</p>
              <p className="text-2xl font-semibold text-gray-900">5</p>
            </div>
          </div>
        </div>

        {/* 총 환자 수 */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">총 환자</p>
              <p className="text-2xl font-semibold text-gray-900">24</p>
            </div>
          </div>
        </div>

        {/* 오늘 예약 */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">오늘 예약</p>
              <p className="text-2xl font-semibold text-gray-900">8</p>
            </div>
          </div>
        </div>

        {/* 빠른 검색 */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Search className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">빠른 검색</p>
              <input 
                type="text" 
                placeholder="환자 검색..."
                className="mt-2 w-full px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 환자 현황 */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">환자 현황</h2>
            </div>
            <div className="p-6">
              <div className="text-center py-12 text-gray-500">
                환자 데이터를 불러오는 중...
              </div>
            </div>
          </div>
        </div>

        {/* 일정 캘린더 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">일정</h2>
            </div>
            <div className="p-6">
              <div className="text-center py-12 text-gray-500">
                캘린더를 불러오는 중...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}