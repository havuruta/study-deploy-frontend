<template>
  <div class="profile">
    <h1>프로필 수정</h1>
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
          disabled
        />
        <p class="hint">이메일은 수정할 수 없습니다.</p>
      </div>
      <div class="form-group">
        <label for="nickname">닉네임</label>
        <input
          id="nickname"
          v-model="form.nickname"
          type="text"
          required
        />
      </div>
      <div class="form-group">
        <label for="gender">성별</label>
        <select
          id="gender"
          v-model="form.gender"
          required
        >
          <option value="MALE">남성</option>
          <option value="FEMALE">여성</option>
        </select>
      </div>
      <div class="form-group">
        <label for="currentPassword">현재 비밀번호</label>
        <input
          id="currentPassword"
          v-model="form.currentPassword"
          type="password"
          placeholder="비밀번호를 변경하려면 입력하세요"
        />
      </div>
      <div class="form-group">
        <label for="newPassword">새 비밀번호</label>
        <input
          id="newPassword"
          v-model="form.newPassword"
          type="password"
          placeholder="새 비밀번호를 입력하세요"
        />
      </div>
      <div class="form-group">
        <label for="confirmPassword">새 비밀번호 확인</label>
        <input
          id="confirmPassword"
          v-model="form.confirmPassword"
          type="password"
          placeholder="새 비밀번호를 다시 입력하세요"
        />
      </div>
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? '저장 중...' : '저장' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import axios from '@/api/axios'

const router = useRouter()
const authStore = useAuthStore()
const isLoading = ref(false)
const error = ref('')

const form = ref({
  email: '',
  nickname: '',
  gender: 'MALE' as 'MALE' | 'FEMALE',
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

onMounted(async () => {
  try {
    const user = authStore.user
    if (user) {
      form.value = {
        ...form.value,
        email: user.email,
        nickname: user.nickname,
        gender: user.gender
      }
    }
  } catch (e) {
    console.error('사용자 정보 로드 실패:', e)
    error.value = '사용자 정보를 불러오는데 실패했습니다.'
  }
})

const handleSubmit = async () => {
  if (form.value.newPassword && form.value.newPassword !== form.value.confirmPassword) {
    error.value = '새 비밀번호가 일치하지 않습니다.'
    return
  }

  isLoading.value = true
  error.value = ''

  try {
    const updateData: any = {
      nickname: form.value.nickname,
      gender: form.value.gender
    }

    if (form.value.newPassword) {
      if (!form.value.currentPassword) {
        error.value = '현재 비밀번호를 입력해주세요.'
        return
      }
      updateData.currentPassword = form.value.currentPassword
      updateData.newPassword = form.value.newPassword
    }

    const response = await axios.post('/users/info', updateData)
    if (response.data) {
      await authStore.checkAuth()
      router.push('/')
    }
  } catch (e) {
    if (axios.isAxiosError(e)) {
      if (e.response?.status === 400) {
        error.value = '입력한 정보가 올바르지 않습니다.'
      } else if (e.response?.status === 401) {
        error.value = '현재 비밀번호가 올바르지 않습니다.'
      } else {
        error.value = '프로필 수정에 실패했습니다. 다시 시도해주세요.'
      }
    } else {
      error.value = '프로필 수정에 실패했습니다. 다시 시도해주세요.'
    }
    console.error('프로필 수정 실패:', e)
  } finally {
    isLoading.value = false
  }
}
</script> 

<style scoped>
.profile {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.hint {
  font-size: 12px;
  color: #666;
  margin-top: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
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