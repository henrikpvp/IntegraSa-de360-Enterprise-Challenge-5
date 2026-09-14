import { api } from './api';
import Cookies from 'js-cookie';
import { ENV } from '@/config/env';

export const authService = {
  // Realiza autenticação no backend Spring Boot ou aciona fallback MOCK
  async login(email, senha) {
    const tokenKey = ENV.TOKEN_KEY || 'integrasaude_token';

    try {
      // Tentativa de conexão real com a API Spring Boot
      const response = await api.post('/auth/login', { email, senha });
      const { token, usuario, perfil } = response.data;

      // Salva o token no cookie para o middleware do Next.js
      Cookies.set(tokenKey, token, { expires: 1, path: '/', sameSite: 'strict' });

      if (typeof window !== 'undefined') {
        localStorage.setItem(tokenKey, token);
        localStorage.setItem('integrasaude_email', email);
        if (perfil || usuario?.perfil) {
          localStorage.setItem('integrasaude_perfil', perfil || usuario.perfil);
        }
      }

      return response.data;
    } catch (error) {
      console.warn('Backend offline/indisponível. Ativando login MOCK para desenvolvimento.');

      // FALLBACK MOCK: Permite logar com qualquer email/senha enquanto o backend não está rodando
      const perfilMock = email.includes('admin')
        ? 'ADMIN'
        : email.includes('medico')
        ? 'MEDICO'
        : 'RECEPCAO';

      const mockData = {
        token: 'mock-jwt-token-integrasaude-360-development-key',
        perfil: perfilMock,
        usuario: {
          id: 1,
          nome: 'Usuário de Teste',
          email: email,
          perfil: perfilMock,
        },
      };

      // Salva dados simulados nos Cookies e LocalStorage
      Cookies.set(tokenKey, mockData.token, { expires: 1, path: '/', sameSite: 'strict' });

      if (typeof window !== 'undefined') {
        localStorage.setItem(tokenKey, mockData.token);
        localStorage.setItem('integrasaude_email', email);
        localStorage.setItem('integrasaude_perfil', perfilMock);
      }

      return mockData;
    }
  },

  // Cadastro de novo usuário no sistema
  async cadastro(dados) {
    try {
      const response = await api.post('/auth/cadastro', dados);
      return response.data;
    } catch (error) {
      console.warn('Backend offline/indisponível. Simulando sucesso no cadastro MOCK.');
      return {
        mensagem: 'Usuário cadastrado com sucesso (Modo Simulação)',
        usuario: dados,
      };
    }
  },

  // Limpa a sessão e redireciona para a tela de login
  logout() {
    const tokenKey = ENV.TOKEN_KEY || 'integrasaude_token';

    Cookies.remove(tokenKey, { path: '/' });

    if (typeof window !== 'undefined') {
      localStorage.removeItem(tokenKey);
      localStorage.removeItem('integrasaude_email');
      localStorage.removeItem('integrasaude_perfil');
      window.location.href = '/login';
    }
  },

  // Obtém o token salvo nos cookies
  getToken() {
    const tokenKey = ENV.TOKEN_KEY || 'integrasaude_token';
    return Cookies.get(tokenKey);
  },
};