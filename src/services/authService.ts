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

  logout: async (): Promise<void> => {
    const currentUser = authService.getCurrentUser();
    
    if (!currentUser?.token) {
      throw new Error('未登入狀態，無法執行登出操作');
    }

    try {
      // 呼叫後端登出 API，帶上 token
      await axios.post(`${API_URL}/logout`, null, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    } catch (error: any) {
      // 如果是 401 未授權錯誤，可能是 token 已過期，直接清除本地狀態
      if (error.response?.status === 401) {
        console.warn('登出時 token 已失效');
      } else {
        console.error('登出時發生錯誤:', error);
        throw new Error('登出失敗，請稍後再試');
      }
    } finally {
      // 清除本地儲存
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
      
      // 清除 axios 預設 headers
      delete axios.defaults.headers.common['Authorization'];
      
      // 重導向到登入頁面
      window.location.href = '/login';
    }
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