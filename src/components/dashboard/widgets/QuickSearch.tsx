'use client'

import React, { useState } from 'react'
import { Search, User } from 'lucide-react'

export default function QuickSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  
  // TODO: Fetch real data from API
  const patients = [
    { id: 1, name: '김철수', phone: '010-1234-5678', lastVisit: '2024-01-15' },
    { id: 2, name: '이영희', phone: '010-2345-6789', lastVisit: '2024-01-14' },
    { id: 3, name: '박민수', phone: '010-3456-7890', lastVisit: '2024-01-13' },
  ]

  const filteredPatients = patients.filter(patient =>
    patient.name.includes(searchTerm) || patient.phone.includes(searchTerm)
  )

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">빠른 고객 검색</h2>
      
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="고객명 또는 전화번호로 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {filteredPatients.length === 0 ? (
          <div className="text-center py-4">
            <User className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 text-sm">
              {searchTerm ? '검색 결과가 없습니다' : '고객을 검색해보세요'}
            </p>
          </div>
        ) : (
          filteredPatients.map((patient) => (
            <div
              key={patient.id}
              className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{patient.name}</p>
                  <p className="text-sm text-gray-600">{patient.phone}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">최근 방문</p>
                  <p className="text-sm text-gray-700">{patient.lastVisit}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}