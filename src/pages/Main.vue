<template>
  <div class="main">
    <h1>메인 페이지</h1>
    <div class="button-container">
      <button @click="goToUserInfo" class="info-button">회원 정보 보기</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goToUserInfo = () => {
  router.push('/user-info');
};
</script>

<style scoped>
.main {
  text-align: center;
  padding: 20px;
}

.button-container {
  margin-top: 20px;
}

.info-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.info-button:hover {
  background-color: #45a049;
}
</style> 