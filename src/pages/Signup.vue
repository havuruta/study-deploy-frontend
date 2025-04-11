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

const handleSubmit = async () => {
  try {
    await authStore.register(form.value)
    router.push('/login')
  } catch (error) {
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