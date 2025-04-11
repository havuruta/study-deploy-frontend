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

export interface TokenResponse {
  data: {
    grantType: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresIn: number;
  };
}

export interface UserInfoResponse {
  data: {
    email: string;
    nickname: string;
    gender: 'MALE' | 'FEMALE';
    createdAt: string;
  };
}

export interface UserInfo {
  email: string;
  nickname: string;
  gender: 'MALE' | 'FEMALE';
  createdAt: string;
}

export const authService = {
  async login(credentials: { email: string; password: string }) {
    try {
      const response = await axios.post<TokenResponse>('/auth/login', credentials);
      console.log('로그인 응답:', response.data);
      
      const token = response.data.data?.accessToken;
      console.log('추출된 토큰:', token);
      
      if (token) {
        localStorage.setItem('token', token);
      }
      
      return response.data;
    } catch (error) {
      console.error('로그인 실패:', error);
      throw error;
    }
  },

  async register(data: RegisterRequest) {
    try {
      const response = await axios.post<TokenResponse>('/auth/signup', data);
      console.log('회원가입 응답:', response.data);
      const token = response.data.data?.accessToken;
      console.log('저장할 토큰:', token);
      if (token) {
        localStorage.setItem('token', token);
      }
      return response.data;
    } catch (error) {
      console.error('회원가입 실패:', error);
      throw error;
    }
  },

  logout: async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await axios.post('/auth/logout', {
          accessToken: token
        });
      } catch (error) {
        console.error('로그아웃 실패:', error);
      }
    }
    localStorage.removeItem('token');
    window.location.href = '/login';
  },

  async getCurrentUser() {
    const token = localStorage.getItem('token');
    console.log('사용할 토큰:', token);
    if (!token) {
      throw new Error('No token found');
    }
    const response = await axios.get<UserInfoResponse>('/users/info');
    return response.data;
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },

  getToken() {
    return localStorage.getItem('token');
  }
}; 