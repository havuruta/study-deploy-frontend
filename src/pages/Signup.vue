<template>
  <div class="signup">
    <h1>회원가입</h1>
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
      <button type="submit">회원가입</button>
    </form>
    <!-- 모달 -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <p>{{ modalMessage }}</p>
        <button @click="closeModal">닫기</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  email: '',
  password: '',
  nickname: '',
  gender: 'MALE'
})
const showModal = ref(false)
const modalMessage = ref('')
const closeModal = () => {
  showModal.value = false
}
const openModal = (message: string) => {
  modalMessage.value = message
  showModal.value = true
}

const handleSubmit = async () => {
  try {
    const registerData = {
      email: form.value.email,
      password: form.value.password,
      nickname: form.value.nickname,
      gender: form.value.gender
    }
    await authStore.register(registerData)
    router.push('/login')
  } catch (error: any) {
    modalMessage.value = error.response?.data?.message || '회원가입에 실패했습니다.'
    showModal.value = true
    console.error('회원가입 실패:', error)
  }
}
</script>

<style scoped>
.signup {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input, select {
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

button:hover {
  background-color: var(--secondary-color);
}
</style> 