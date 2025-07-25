import Link from 'next/link'
import { ArrowRight, Users, BarChart3, MessageCircle } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="text-blue-600">Obdoc</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            비만치료의 흐름을 설계하다
          </p>
          <p className="text-lg text-gray-500 mb-12 max-w-3xl mx-auto">
            대한민국 모든 비만 클리닉과 고객들을 연결하는 필수적인 파트너가 되어, 
            데이터 기반의 상호작용을 통해 고객의 목표 달성률을 높이고 병의원의 지속 가능한 성장을 돕습니다.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              원장님 가입하기
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              로그인
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            왜 Obdoc을 선택해야 할까요?
          </h2>
          <p className="text-lg text-gray-600">
            비만 관리 후 고객 관리 부재 문제를 해결하는 통합 솔루션
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              통합 고객 관리
            </h3>
            <p className="text-gray-600">
              원장님과 고객이 함께 사용하는 플랫폼으로 지속적인 관리와 소통이 가능합니다.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <BarChart3 className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              데이터 기반 분석
            </h3>
            <p className="text-gray-600">
              실시간 감량 데이터와 진행 상황을 시각적으로 확인하고 분석할 수 있습니다.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
              <MessageCircle className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              동기부여 커뮤니티
            </h3>
            <p className="text-gray-600">
              성공 다이어트 챌린지 게시판을 통해 고객들의 지속적인 동기부여를 제공합니다.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              간단하고 투명한 요금제
            </h2>
            <p className="text-lg text-gray-600">
              병원 규모에 맞는 합리적인 가격으로 시작하세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="border border-gray-200 rounded-lg p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">1개월</h3>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                110,000원
                <span className="text-base font-normal text-gray-500">/월</span>
              </div>
              <p className="text-gray-600 mb-6">단기 체험용</p>
            </div>

            <div className="border-2 border-blue-500 rounded-lg p-8 text-center relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  추천
                </span>
              </div>
              <div className="absolute -top-4 right-4">
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  20% 할인
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">6개월</h3>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                528,000원
                <span className="text-base font-normal text-gray-500">/6개월</span>
              </div>
              <div className="text-sm text-gray-500 line-through mb-2">
                정가: 660,000원
              </div>
              <div className="text-sm text-blue-600 font-medium mb-4">
                월 88,000원 (22,000원 절약)
              </div>
              <p className="text-gray-600 mb-6">가장 인기있는 플랜</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-8 text-center relative">
              <div className="absolute -top-4 right-4">
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  39% 할인
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">12개월</h3>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                799,000원
                <span className="text-base font-normal text-gray-500">/년</span>
              </div>
              <div className="text-sm text-gray-500 line-through mb-2">
                정가: 1,320,000원
              </div>
              <div className="text-sm text-green-600 font-medium mb-4">
                월 66,583원 (521,000원 절약)
              </div>
              <p className="text-gray-600 mb-6">최대 할인 혜택</p>
            </div>
          </div>

          {/* 가격 안내 문구 */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                • 모든 가격은 <span className="font-semibold text-gray-800">VAT 포함</span> 가격입니다
              </p>
              <p className="text-sm text-gray-600">
                • <span className="font-semibold text-gray-800">세금계산서 발행</span> 가능합니다
              </p>
              <p className="text-sm text-gray-600">
                • 베타 버전에서는 <span className="font-semibold text-blue-600">무통장 입금</span>만 지원됩니다
              </p>
              <p className="text-xs text-gray-500 mt-3">
                결제 완료 후 관리자 승인을 통해 서비스가 활성화됩니다
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/signup"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              지금 시작하기
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
