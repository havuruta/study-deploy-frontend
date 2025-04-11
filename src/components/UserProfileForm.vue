<template>
  <div class="profile-form">
    <h2>프로필 수정</h2>
    <div v-if="loading" class="loading">로딩 중...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <form v-else @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">닉네임</label>
        <input
          type="text"
          id="name"
          v-model="profile.name"
          required
        />
      </div>
      <div class="form-group">
        <label for="gender">성별</label>
        <select id="gender" v-model="profile.gender" required>
          <option value="MALE">남성</option>
          <option value="FEMALE">여성</option>
        </select>
      </div>
      <button type="submit">저장</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getUserInfo, updateUserInfo } from '../api/user';

const profile = ref({
  name: '',
  gender: '',
});
const loading = ref(true);
const error = ref('');

const loadUserInfo = async () => {
  try {
    loading.value = true;
    error.value = '';
    console.log('사용자 정보 로딩 시작');
    
    const userInfo = await getUserInfo();
    console.log('사용자 정보 로딩 완료:', userInfo);
    
    profile.value = {
      name: userInfo.name,
      gender: userInfo.gender,
    };
  } catch (err) {
    console.error('사용자 정보 로딩 실패:', err);
    error.value = '사용자 정보를 불러오는데 실패했습니다.';
  } finally {
    loading.value = false;
  }
};

const handleSubmit = async () => {
  try {
    loading.value = true;
    error.value = '';
    await updateUserInfo(profile.value);
    console.log('프로필 업데이트 성공');
  } catch (err) {
    console.error('프로필 업데이트 실패:', err);
    error.value = '프로필 업데이트에 실패했습니다.';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  console.log('UserProfileForm 마운트됨');
  loadUserInfo();
});
</script>

<style scoped>
.profile-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.loading {
  text-align: center;
  padding: 20px;
  color: #666;
}

.error {
  text-align: center;
  padding: 20px;
  color: red;
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
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style> 