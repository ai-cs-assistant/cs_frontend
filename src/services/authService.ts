import axios from 'axios';

const API_URL = '/auth';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  username: string;
  role: string;
}

const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/login`, data);
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<void> => {
    await axios.post(`${API_URL}/register`, data);
  },

  logout: (): void => {
    localStorage.removeItem('user');
  },

  getCurrentUser: (): AuthResponse | null => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  }
};

// 設定 axios 攔截器
axios.interceptors.request.use(
  (config) => {
    const user = authService.getCurrentUser();
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authService.logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default authService;