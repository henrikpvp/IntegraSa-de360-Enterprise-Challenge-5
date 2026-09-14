import axios from 'axios';
import Cookies from 'js-cookie';
import { ENV } from '@/config';

export const api = axios.create({
  baseURL: ENV.API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: ENV.TIMEOUT || 15000,
});

// Interceptor para injetar o token JWT em todas as requisições ao Backend Java
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get(ENV.TOKEN_KEY || 'integrasaude_token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para capturar erros de autenticação (401/403)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // Limpa todas as credenciais salvas no cliente
      const tokenKey = ENV.TOKEN_KEY || 'integrasaude_token';
      Cookies.remove(tokenKey, { path: '/' });
      
      if (typeof window !== 'undefined') {
        localStorage.removeItem(tokenKey);
        localStorage.removeItem('integrasaude_email');
        localStorage.removeItem('integrasaude_perfil');

        // Evita loop de redirecionamento se já estiver na página de login
        if (!window.location.pathname.startsWith('/login')) {
          window.location.href = '/login?expired=true';
        }
      }
    }

    return Promise.reject(error);
  }
);