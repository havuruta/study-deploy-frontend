<template>
  <div class="user-info">
    <h1>사용자 정보</h1>
    <div v-if="user" class="user-details">
      <p>이메일: {{ user.email }}</p>
      <p>닉네임: {{ user.nickname }}</p>
      <p>성별: {{ user.gender === 'MALE' ? '남성' : '여성' }}</p>
      <p>가입일: {{ new Date(user.createdAt).toLocaleDateString() }}</p>
    </div>
    <button @click="goToProfile">프로필 수정</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const user = computed(() => authStore.user)

const goToProfile = () => {
  router.push('/profile')
}
</script>

<style scoped>
.user-info {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.user-details {
  margin-bottom: 20px;
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