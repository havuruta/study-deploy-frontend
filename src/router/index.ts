import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// 동적 라우트 정의
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../pages/Signup.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../pages/Profile.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/user-info',
    name: 'user-info',
    component: () => import('../pages/UserInfo.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../pages/Test.vue')
  }
]

// 라우터 생성
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 네비게이션 가드
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth) {
    try {
      await authStore.checkAuth()
      if (!authStore.isAuthenticated) {
        next({ name: 'login', query: { message: '로그인이 필요합니다.' } })
        return
      }
    } catch (error) {
      next({ name: 'login', query: { message: '인증에 실패했습니다.' } })
      return
    }
  }
  
  next()
})

// 라우터 에러 핸들링
router.onError((error) => {
  console.error('라우터 에러:', error)
})

export default router