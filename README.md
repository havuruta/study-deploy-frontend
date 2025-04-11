## `study-deploy-frontend` – JWT 인증 프론트(Vue)

### 개요
Vue + Vite 기반의 프론트엔드 애플리케이션.  
JWT 기반 인증 흐름을 통해 로그인 상태를 관리하며 백엔드와 연동합니다.

### 주요 기능
- 로그인 / 회원가입 폼
- 로그인 시 JWT Access/Refresh 토큰 저장
- `/users/info` 호출 시 토큰 자동 전송 및 사용자 정보 렌더링
- 토큰 만료 또는 인증 실패 시 자동 로그아웃 처리 예정

### 기술 스택
- Vue 3 (Composition API)
- Vite
- Axios
- TypeScript (optional)
- Pinia (선택적 상태 관리)
