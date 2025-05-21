<template>
  <div class="login">
    <h1>로그인</h1>
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="email">이메일</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">비밀번호</label>
        <input
          id="password"
          v-model="form.password"
          type="password"
          required
        />
      </div>
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? '로그인 중...' : '로그인' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  email: '',
  password: ''
})
const error = ref('')
const isLoading = ref(false)

const handleSubmit = async () => {
  error.value = ''
  isLoading.value = true
  
  try {
    await authStore.login(form.value.email, form.value.password)
    router.push('/')
  } catch (e) {
    if (axios.isAxiosError(e)) {
      if (e.response?.status === 400) {
        error.value = '이메일 또는 비밀번호가 올바르지 않습니다.'
      } else if (e.response?.status === 404) {
        error.value = '존재하지 않는 사용자입니다.'
      } else if (e.response?.status === 401) {
        error.value = '인증에 실패했습니다.'
      } else {
        error.value = '로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
      }
    } else {
      error.value = '로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
    }
    console.error('로그인 실패:', e)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:not(:disabled):hover {
  background-color: var(--secondary-color);
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error-message {
  background-color: #ffebee;
  color: #c62828;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  text-align: center;
}
</style> 