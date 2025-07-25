'use client'

import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react'

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  
  // TODO: Fetch real appointments from API
  const appointments = [
    { id: 1, date: '2024-01-15', time: '10:00', patient: '김철수', type: '상담' },
    { id: 2, date: '2024-01-15', time: '14:00', patient: '이영희', type: '체중측정' },
    { id: 3, date: '2024-01-16', time: '11:00', patient: '박민수', type: '식단상담' },
  ]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Previous month's days
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    
    return days
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월`
  }

  const hasAppointment = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return appointments.some(apt => apt.date === dateStr)
  }

  const days = getDaysInMonth(currentDate)
  const weekDays = ['일', '월', '화', '수', '목', '금', '토']

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <CalendarIcon className="w-5 h-5 mr-2" />
          일정 캘린더
        </h2>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <span className="font-medium text-gray-900">
            {formatDate(currentDate)}
          </span>
          
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div
            key={index}
            className={`
              p-2 text-center text-sm h-10 flex items-center justify-center relative
              ${day ? 'hover:bg-gray-100 cursor-pointer' : ''}
              ${day && hasAppointment(day) ? 'bg-blue-50 text-blue-600 font-medium' : ''}
              ${!day ? 'text-gray-300' : 'text-gray-900'}
            `}
          >
            {day}
            {day && hasAppointment(day) && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-2">오늘의 예약</h3>
        <div className="space-y-2">
          {appointments
            .filter(apt => apt.date === new Date().toISOString().split('T')[0])
            .map(apt => (
              <div key={apt.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div>
                  <span className="text-sm font-medium">{apt.time}</span>
                  <span className="text-sm text-gray-600 ml-2">{apt.patient}</span>
                </div>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {apt.type}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}