import axios from 'axios';

interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  email: string;
  password: string;
  nickname: string;
}

interface LogoutData {
  refreshToken: string;
}

export const login = async (data: LoginData) => {
  const res = await axios.post('/auth/login', data);
  return res.data.response;
};

export const signup = async (data: SignupData) => {
  const res = await axios.post('/auth/signup', data);
  return res.data.response;
};

export const reissue = async (refreshToken: string) => {
  const res = await axios.post('/auth/reissue', { refreshToken });
  return res.data.response;
};

export const logout = async (data: LogoutData) => {
  await axios.post('/auth/logout', data);
};
