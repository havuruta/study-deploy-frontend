import { defineStore } from 'pinia'
import { ref } from 'vue'
import { authService } from '@/api/authService'
import router from '@/router'

interface User {
  email: string
  nickname: string
  gender: 'MALE' | 'FEMALE'
  createdAt: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isAuthenticated = ref(false)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const setToken = (newToken: string) => {
    token.value = newToken
    isAuthenticated.value = true
    localStorage.setItem('token', newToken)
  }

  const setUser = (newUser: User) => {
    user.value = newUser
  }

  const setError = (message: string) => {
    error.value = message
    setTimeout(() => {
      error.value = null
    }, 3000)
  }

  const login = async (credentials: { email: string; password: string }) => {
    isLoading.value = true
    error.value = null
    try {
      const response = await authService.login(credentials)
      setToken(response.data.accessToken)
      const userInfo = await authService.getCurrentUser()
      setUser(userInfo.data)
      return userInfo.data
    } catch (error) {
      setError('로그인에 실패했습니다. 다시 시도해주세요.')
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const register = async (userData: {
    email: string
    password: string
    nickname: string
    gender: 'MALE' | 'FEMALE'
  }) => {
    isLoading.value = true
    error.value = null
    try {
      const response = await authService.register(userData)
      setToken(response.data.accessToken)
      const userInfo = await authService.getCurrentUser()
      setUser(userInfo.data)
      return userInfo.data
    } catch (error) {
      setError('회원가입에 실패했습니다. 다시 시도해주세요.')
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    isAuthenticated.value = false
    localStorage.removeItem('token')
    router.push('/login')
  }

  const checkAuth = async () => {
    isLoading.value = true
    error.value = null
    try {
      const storedToken = localStorage.getItem('token')
      if (storedToken) {
        setToken(storedToken)
        const userInfo = await authService.getCurrentUser()
        setUser(userInfo.data)
      }
    } catch (error) {
      setError('인증 확인에 실패했습니다. 다시 로그인해주세요.')
      logout()
    } finally {
      isLoading.value = false
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    checkAuth
  }
}) 