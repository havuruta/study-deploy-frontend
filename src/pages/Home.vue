<template>
  <div class="home">
    <h1>홈</h1>
    <div v-if="isAuthenticated" class="user-info">
      <h2>환영합니다!</h2>
      <p>이메일: {{ user?.email }}</p>
      <p>닉네임: {{ user?.nickname }}</p>
      <p>성별: {{ user?.gender === 'MALE' ? '남성' : '여성' }}</p>
      <p>가입일: {{ formatDate(user?.createdAt) }}</p>
      <div class="button-group">
        <router-link to="/profile" class="button">프로필 수정</router-link>
        <router-link to="/user-info" class="button">상세 정보</router-link>
        <router-link to="/test" class="button test-button">인증 테스트</router-link>
      </div>
    </div>
    <div v-else class="auth-buttons">
      <router-link to="/login" class="button">로그인</router-link>
      <router-link to="/signup" class="button">회원가입</router-link>
      <router-link to="/test" class="button test-button">인증 테스트</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated)
const user = computed(() => authStore.user)

const formatDate = (dateString?: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script> 

<style scoped>
.home {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.user-info {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
}

.user-info h2 {
  color: var(--primary-color);
  margin-bottom: 15px;
}

.user-info p {
  margin: 8px 0;
  font-size: 16px;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.auth-buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.button {
  display: inline-block;
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: var(--secondary-color);
}

.test-button {
  background-color: #2196F3;
}

.test-button:hover {
  background-color: #1976D2;
}
</style> 