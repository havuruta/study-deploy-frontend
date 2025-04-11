import axios from './axios';

export interface UserInfo {
  email: string;
  name: string;
  gender: string;
  profileImageUrl: string;
}

export const getUserInfo = async (): Promise<UserInfo> => {
  try {
    console.log('getUserInfo 호출 시작');
    const token = localStorage.getItem('token');
    console.log('현재 토큰:', token);
    
    const response = await axios.get('/users/info');
    console.log('API 응답:', response);
    
    if (!response.data) {
      throw new Error('서버에서 데이터를 받지 못했습니다');
    }
    
    return response.data;
  } catch (error) {
    console.error('getUserInfo 에러:', error);
    if (error.response) {
      console.error('에러 응답:', error.response.data);
      console.error('에러 상태:', error.response.status);
    }
    throw error;
  }
};

export const updateUserInfo = async (data: { name: string; gender: string }): Promise<void> => {
  try {
    console.log('updateUserInfo 호출:', data);
    const response = await axios.post('/users/info', data);
    console.log('업데이트 응답:', response);
  } catch (error) {
    console.error('updateUserInfo 에러:', error);
    throw error;
  }
}; 