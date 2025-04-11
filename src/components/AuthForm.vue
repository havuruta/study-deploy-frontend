<template>
    <form @submit.prevent="handleSubmit">
      <h2>{{ title }}</h2>
      <input v-model="form.email" type="email" placeholder="이메일" required />
      <input v-model="form.password" type="password" placeholder="비밀번호" required />
      <button type="submit">확인</button>
    </form>
  </template>
  
  <script setup>
  import { reactive } from 'vue';
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({ title: String });
  const emit = defineEmits(['submit']);
  
  const form = reactive({ email: '', password: '' });
  
  const handleSubmit = () => emit('submit', form);
  </script>
  