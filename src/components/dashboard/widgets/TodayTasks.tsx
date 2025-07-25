'use client'

import React from 'react'
import { CheckCircle, Clock, AlertCircle } from 'lucide-react'

export default function TodayTasks() {
  // TODO: Fetch real data from API
  const tasks = [
    { id: 1, title: '김철수 환자 상담', time: '10:00', status: 'pending' },
    { id: 2, title: '이영희 환자 체중 측정', time: '14:00', status: 'completed' },
    { id: 3, title: '박민수 환자 식단 검토', time: '16:00', status: 'urgent' },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'urgent':
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-green-200'
      case 'urgent':
        return 'bg-red-50 border-red-200'
      default:
        return 'bg-yellow-50 border-yellow-200'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">오늘 할 일</h2>
      
      {tasks.length === 0 ? (
        <div className="text-center py-8">
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">오늘 예정된 작업이 없습니다</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`p-3 rounded-lg border ${getStatusColor(task.status)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(task.status)}
                  <div>
                    <p className="font-medium text-gray-900">{task.title}</p>
                    <p className="text-sm text-gray-600">{task.time}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}