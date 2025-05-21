import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/api/authService'

interface User {
  id: number
  email: string
  name: string
  gender: string
  nickname?: string
  createdAt?: string
}

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const setUser = (userData: User | null) => {
    user.value = userData
    isAuthenticated.value = !!userData
  }

  const setError = (message: string) => {
    error.value = message
    setTimeout(() => {
      error.value = null
    }, 3000)
  }

  const login = async (email: string, password: string) => {
    try {
      isLoading.value = true
      const response = await authService.login({ email, password })
      await checkAuth()
      router.push('/')
    } catch (err: any) {
      setError(err.response?.data?.message || '로그인에 실패했습니다.')
    } finally {
      isLoading.value = false
    }
  }

  const register = async (data: { email: string; password: string; nickname: string; gender: string }) => {
    try {
      isLoading.value = true
      await authService.register(data)
      await login(data.email, data.password)
    } catch (err: any) {
      setError(err.response?.data?.message || '회원가입에 실패했습니다.')
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
      setUser(null)
      router.push('/login')
    } catch (err: any) {
      setError(err.response?.data?.message || '로그아웃에 실패했습니다.')
    }
  }

  const checkAuth = async () => {
    try {
      const response = await authService.getCurrentUser()
      setUser(response.data)
    } catch (err) {
      setUser(null)
    }
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    checkAuth
  }
}) 