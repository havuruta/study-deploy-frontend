<template>
    <AuthForm title="로그인" @submit="handleLogin" />
  </template>
  
  <script setup>
  import AuthForm from '@/components/AuthForm.vue';
  import { login } from '@/api/auth';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const handleLogin = async (formData) => {
    try {
      const { data } = await login(formData);
      localStorage.setItem('token', data.response.accessToken);
      router.push('/');
    } catch (err) {
      alert('로그인 실패');
    }
  };
  </script>
  