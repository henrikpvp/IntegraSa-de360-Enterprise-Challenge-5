import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const ENV = process.env;

export const api = axios.create({
  baseURL: ENV.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: (ENV.TIMEOUT ? parseInt(ENV.TIMEOUT) : undefined) || 15000,
});

// Interceptor de Requisição: Injeta o JWT via Cookies (ou Fallback localStorage)
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    let token: string | undefined;

    if (typeof window !== 'undefined') {
      const tokenKey = ENV.TOKEN_KEY || 'integrasaude_token';
      token = Cookies.get(tokenKey) || localStorage.getItem(tokenKey) || undefined;
    }

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Interceptor de Resposta: Trata sessão expirada (401)
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      const tokenKey = ENV.TOKEN_KEY || 'integrasaude_token';

      if (typeof window !== 'undefined') {
        Cookies.remove(tokenKey, { path: '/' });
        localStorage.removeItem(tokenKey);
        localStorage.removeItem('integrasaude_email');
        localStorage.removeItem('integrasaude_perfil');

        if (!window.location.pathname.startsWith('/login')) {
          window.location.href = '/login?expired=true';
        }
      }
    }

    return Promise.reject(error);
  }
);