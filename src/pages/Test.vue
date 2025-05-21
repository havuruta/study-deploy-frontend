<template>
  <div class="test-container">
    <h2>인증 시스템 테스트</h2>
    
    <div class="test-section">
      <h3>1. 현재 상태</h3>
      <div class="status-info">
        <div class="status-item">
          <h4>인증 상태</h4>
          <p :class="{ 'status-active': authStore.isAuthenticated }">
            {{ authStore.isAuthenticated ? '인증됨' : '인증되지 않음' }}
          </p>
        </div>
        <div class="status-item">
          <h4>토큰 상태</h4>
          <p>Access Token: {{ accessToken ? '있음' : '없음' }}</p>
          <p>Refresh Token: {{ refreshToken ? '있음' : '없음' }}</p>
        </div>
      </div>
    </div>

    <div class="test-section">
      <h3>2. 계정 테스트</h3>
      <div class="form-group">
        <input v-model="testEmail" type="email" placeholder="테스트 이메일" />
        <input v-model="testPassword" type="password" placeholder="테스트 비밀번호" />
      </div>
      <div class="button-group">
        <button @click="testLogin" :disabled="isLoading">로그인</button>
        <button @click="testLogout" :disabled="isLoading">로그아웃</button>
      </div>
    </div>

    <div class="test-section">
      <h3>3. API 테스트</h3>
      <div class="button-group">
        <button @click="testUserInfo" :disabled="isLoading">사용자 정보 조회</button>
        <button @click="testRefreshToken" :disabled="isLoading">토큰 갱신</button>
        <button @click="testProtectedRoute" :disabled="isLoading">보호된 라우트 접근</button>
      </div>
    </div>

    <div class="test-section">
      <h3>4. 테스트 결과</h3>
      <div class="result-container">
        <div class="result-header">
          <span>상태: {{ testStatus }}</span>
          <button @click="clearResult" class="clear-btn">초기화</button>
        </div>
        <pre class="test-result">{{ testResult }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import axios from 'axios'

// axios 기본 설정
axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.withCredentials = true

const router = useRouter()
const authStore = useAuthStore()
const isLoading = ref(false)
const testResult = ref('')
const testStatus = ref('대기 중')
const accessToken = ref('')
const refreshToken = ref('')
const testEmail = ref('test@test.com')
const testPassword = ref('test123!@#')

// 쿠키에서 토큰 추출
const extractTokens = () => {
  const cookies = document.cookie.split('; ')
  accessToken.value = cookies.find(row => row.startsWith('access_token='))?.split('=')[1] || ''
  refreshToken.value = cookies.find(row => row.startsWith('refresh_token='))?.split('=')[1] || ''
  return { accessToken: accessToken.value, refreshToken: refreshToken.value }
}

// 로그인 테스트
const testLogin = async () => {
  try {
    isLoading.value = true
    testStatus.value = '진행 중'
    testResult.value = '로그인 시도 중...'
    
    // authStore.login 대신 직접 API 호출
    const response = await axios.post('/auth/login', {
      email: testEmail.value,
      password: testPassword.value
    })
    
    extractTokens()
    
    testStatus.value = '성공'
    testResult.value = '로그인 성공!\n' + 
      'Access Token: ' + accessToken.value + '\n' +
      'Refresh Token: ' + refreshToken.value
  } catch (error: any) {
    testStatus.value = '실패'
    testResult.value = '로그인 실패: ' + (error.response?.data?.message || error.message)
  } finally {
    isLoading.value = false
  }
}

// 로그아웃 테스트
const testLogout = async () => {
  try {
    isLoading.value = true
    testStatus.value = '진행 중'
    testResult.value = '로그아웃 시도 중...'

    // 쿠키 기반 인증이므로 토큰 정보를 요청 본문에 포함하지 않음
    const response = await axios.post('/auth/logout', {}, {
      withCredentials: true,
      // 리다이렉션 방지
      validateStatus: function (status) {
        return status >= 200 && status < 300
      }
    })

    console.log('로그아웃 응답:', response.data)
    testStatus.value = '성공'
    testResult.value = '로그아웃 성공!\n' +
      '응답: ' + JSON.stringify(response.data, null, 2)

    // 토큰 상태 업데이트
    extractTokens()
  } catch (error: any) {
    testStatus.value = '실패'
    testResult.value = '로그아웃 실패: ' + (error.response?.data?.message || error.message)
  } finally {
    isLoading.value = false
  }
}

// 사용자 정보 조회 테스트
const testUserInfo = async () => {
  try {
    isLoading.value = true
    testStatus.value = '진행 중'
    testResult.value = '사용자 정보 조회 중...'
    
    const response = await axios.get('/users/info')
    testStatus.value = '성공'
    testResult.value = '사용자 정보:\n' + JSON.stringify(response.data, null, 2)
  } catch (error: any) {
    testStatus.value = '실패'
    testResult.value = '사용자 정보 조회 실패: ' + (error.response?.data?.message || error.message)
  } finally {
    isLoading.value = false
  }
}

// 토큰 갱신 테스트
const testRefreshToken = async () => {
  try {
    isLoading.value = true
    testStatus.value = '진행 중'
    testResult.value = '토큰 갱신 시도 중...'
    
    const response = await axios.post('/auth/reissue')
    
    testStatus.value = '성공'
    testResult.value = '토큰 갱신 성공!\n' +
      '응답: ' + JSON.stringify(response.data, null, 2)
  } catch (error: any) {
    testStatus.value = '실패'
    testResult.value = '토큰 갱신 실패: ' + (error.response?.data?.message || error.message)
  } finally {
    isLoading.value = false
  }
}

// 보호된 라우트 접근 테스트
const testProtectedRoute = async () => {
  try {
    isLoading.value = true
    testStatus.value = '진행 중'
    testResult.value = '보호된 라우트 접근 시도 중...'
    
    await router.push('/user-info')
    testStatus.value = '성공'
    testResult.value = '보호된 라우트 접근 성공!'
  } catch (error: any) {
    testStatus.value = '실패'
    testResult.value = '보호된 라우트 접근 실패: ' + (error.response?.data?.message || error.message)
  } finally {
    isLoading.value = false
  }
}

// 결과 초기화
const clearResult = () => {
  testResult.value = ''
  testStatus.value = '대기 중'
}

// 초기 토큰 상태 확인
onMounted(() => {
  extractTokens()
})
</script>

<style scoped>
.test-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.test-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
}

.status-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 15px 0;
}

.status-item {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 4px;
}

.status-item h4 {
  margin: 0 0 10px 0;
  color: #666;
}

.status-active {
  color: #4CAF50;
  font-weight: bold;
}

.form-group {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.form-group input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.button-group {
  display: flex;
  gap: 10px;
  margin: 15px 0;
  flex-wrap: wrap;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #45a049;
}

.result-container {
  background-color: #f8f9fa;
  border-radius: 4px;
  overflow: hidden;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background-color: #e9ecef;
  border-bottom: 1px solid #ddd;
}

.clear-btn {
  padding: 5px 10px;
  background-color: #dc3545;
  font-size: 0.9em;
}

.clear-btn:hover {
  background-color: #c82333;
}

.test-result {
  padding: 15px;
  margin: 0;
  white-space: pre-wrap;
  font-family: monospace;
  max-height: 300px;
  overflow-y: auto;
}
</style> 