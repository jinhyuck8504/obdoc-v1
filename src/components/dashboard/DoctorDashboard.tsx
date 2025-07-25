'use client'

import React from 'react'
import TodayTasks from './widgets/TodayTasks'
import PatientStatus from './widgets/PatientStatus'
import Calendar from './widgets/Calendar'
import QuickSearch from './widgets/QuickSearch'

export default function DoctorDashboard() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">원장님 대시보드</h1>
        <p className="text-gray-600">오늘의 주요 정보를 한눈에 확인하세요</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* 오늘 할 일 */}
        <div className="lg:col-span-1">
          <TodayTasks />
        </div>

        {/* 고객 현황 */}
        <div className="lg:col-span-1">
          <PatientStatus />
        </div>

        {/* 빠른 검색 */}
        <div className="lg:col-span-1 xl:col-span-1">
          <QuickSearch />
        </div>

        {/* 일정 캘린더 */}
        <div className="lg:col-span-2 xl:col-span-3">
          <Calendar />
        </div>
      </div>
    </div>
  )
}