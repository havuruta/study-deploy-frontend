<script setup lang="ts">
import { RouterView } from 'vue-router';
import { computed } from 'vue'
import { authService } from './api/authService'

const isAuthenticated = computed(() => !!authService.getToken())

const handleLogout = () => {
  authService.logout()
}
</script>

<template>
  <div class="app">
    <nav class="nav">
      <router-link to="/">홈</router-link>
      <template v-if="isAuthenticated">
        <router-link to="/profile">프로필</router-link>
        <router-link to="/user-info">사용자 정보</router-link>
        <button @click="handleLogout">로그아웃</button>
      </template>
      <template v-else>
        <router-link to="/login">로그인</router-link>
        <router-link to="/signup">회원가입</router-link>
      </template>
    </nav>

    <main class="main">
      <div class="container">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style>
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.nav {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.nav a {
  text-decoration: none;
  color: #333;
  padding: 5px 10px;
  border-radius: 4px;
}

.nav a:hover {
  background-color: #e0e0e0;
}

.nav button {
  margin-left: auto;
  padding: 5px 10px;
  background-color: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.nav button:hover {
  background-color: #cc0000;
}

.main {
  margin-top: 20px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
