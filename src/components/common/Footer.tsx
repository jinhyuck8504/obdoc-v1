import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Company Information */}
          <div>
            <div className="text-lg font-semibold text-gray-900 mb-4">
              Obdoc
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p>상호명: 브랜뉴메디 | 대표자명: 최진혁</p>
              <p>사업자등록번호: 534-05-02170</p>
              <p>통신판매업신고번호: 2024-서울은평-0264</p>
              <p>문의: brandnewmedi@naver.com</p>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <div className="text-lg font-semibold text-gray-900 mb-4">
              법적 정보
            </div>
            <div className="space-y-2">
              <Link 
                href="/terms" 
                className="block text-sm text-gray-600 hover:text-blue-600"
              >
                이용약관
              </Link>
              <Link 
                href="/privacy" 
                className="block text-sm text-gray-600 hover:text-blue-600"
              >
                개인정보처리방침
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            Copyright © Obdoc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}