import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

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
    component: () => import('../pages/Profile.vue')
  },
  {
    path: '/user-info',
    name: 'user-info',
    component: () => import('../pages/UserInfo.vue'),
    meta: { requiresAuth: true }
  }
]

// 라우터 생성
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 네비게이션 가드
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !token) {
    next('/login')
  } else if (!requiresAuth && token && (to.path === '/login' || to.path === '/signup')) {
    next('/user-info')
  } else {
    next()
  }
})

// 라우터 에러 핸들링
router.onError((error) => {
  console.error('라우터 에러:', error)
})

export default router