# Supabase 설정 가이드

## 1. Supabase 프로젝트 생성

1. [Supabase](https://supabase.com)에 접속하여 계정 생성
2. "New Project" 클릭
3. 프로젝트 이름: `obdoc-mvp`
4. 데이터베이스 비밀번호 설정 (안전한 비밀번호 사용)
5. 지역: `Northeast Asia (Seoul)` 선택
6. "Create new project" 클릭

## 2. 이메일 인증 비활성화 설정

1. Supabase 대시보드에서 `Authentication` → `Settings` 이동
2. `Email confirmation` 섹션에서:
   - "Enable email confirmations" **체크 해제**
   - "Enable email change confirmations" **체크 해제**
3. `Save` 클릭

## 3. 데이터베이스 스키마 생성

1. Supabase 대시보드에서 `SQL Editor` 이동
2. "New query" 클릭
3. `database/schema.sql` 파일 내용을 복사하여 붙여넣기
4. `Run` 클릭하여 실행

## 4. RLS 정책 설정

1. 같은 SQL Editor에서 "New query" 클릭
2. `database/rls-policies.sql` 파일 내용을 복사하여 붙여넣기
3. `Run` 클릭하여 실행

## 5. 테스트 데이터 삽입

1. 같은 SQL Editor에서 "New query" 클릭
2. `database/sample-data.sql` 파일 내용을 복사하여 붙여넣기
3. `Run` 클릭하여 실행

## 6. 환경 변수 설정

1. Supabase 대시보드에서 `Settings` → `API` 이동
2. 다음 값들을 복사:
   - `Project URL`
   - `anon public` key
   - `service_role` key (보안 주의!)

3. `obdoc-mvp/.env.local` 파일 생성:
```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
NEXTAUTH_SECRET=your_random_secret_here
NEXTAUTH_URL=http://localhost:3000
```

## 7. 테스트 계정 정보

설정 완료 후 다음 계정으로 테스트 가능:

### 관리자 계정
- 이메일: `admin@obdoc.co.kr`
- 비밀번호: Supabase Auth에서 직접 생성 필요

### 원장 계정
- 이메일: `doctor1@hospital.com`
- 비밀번호: Supabase Auth에서 직접 생성 필요

### 환자 계정
- 휴대폰: `010-3333-3333`
- 비밀번호: Supabase Auth에서 직접 생성 필요

## 8. 개발 서버 재시작

환경 변수 설정 후 개발 서버를 재시작하세요:
```bash
npm run dev
```

이제 실제 데이터베이스와 연동된 페이지를 확인할 수 있습니다!