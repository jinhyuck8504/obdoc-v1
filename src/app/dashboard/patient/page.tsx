import React from 'react'

export default function PatientDashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">나의 대시보드</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-2">나의 리포트</h3>
          <p className="text-gray-500">건강 데이터가 여기에 표시됩니다.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-2">나의 일정</h3>
          <p className="text-gray-500">예약 일정이 여기에 표시됩니다.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-2">커뮤니티</h3>
          <p className="text-gray-500">커뮤니티 바로가기가 여기에 있습니다.</p>
        </div>
      </div>
    </div>
  )
}