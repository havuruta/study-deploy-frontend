import axios from './axios';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  nickname: string;
  gender: string;
}

export interface UserInfo {
  id: number;
  email: string;
  name: string;
  gender: string;
}

export const authService = {
  async login(credentials: LoginRequest) {
    try {
      await axios.post('/auth/login', credentials);
      return true;
    } catch (error) {
      console.error('로그인 실패:', error);
      throw error;
    }
  },

  async register(data: RegisterRequest) {
    try {
      await axios.post('/auth/signup', data);
      return true;
    } catch (error) {
      console.error('회원가입 실패:', error);
      throw error;
    }
  },

  async logout() {
    try {
      await axios.post('/auth/logout', {
        accessToken: document.cookie.split('; ').find(row => row.startsWith('accessToken='))?.split('=')[1],
        refreshToken: document.cookie.split('; ').find(row => row.startsWith('refreshToken='))?.split('=')[1]
      });
      window.location.href = '/login';
    } catch (error) {
      console.error('로그아웃 실패:', error);
      throw error;
    }
  },

  async getCurrentUser() {
    try {
      const response = await axios.get('/users/info');
      return response.data;
    } catch (error) {
      console.error('사용자 정보 조회 실패:', error);
      throw error;
    }
  }
}; 