'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Usuario, PerfilUsuario } from '@/types';
import { api } from '@/services/api';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const TOKEN_KEY = 'integrasaude_token';

interface AuthContextType {
  usuario: Usuario | null;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const token = Cookies.get(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY);
      const email = localStorage.getItem('integrasaude_email');
      const perfil = localStorage.getItem('integrasaude_perfil') as PerfilUsuario;

      if (token && email && perfil) {
        setUsuario({ token, email, perfil });
      }
    } catch (error) {
      console.error('Erro ao ler credenciais de sessão:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, senha: string) => {
    const response = await api.post('/auth/login', { email, senha });
    const { token, perfil } = response.data;

    // Salva no Cookie para o middleware.js ler no servidor
    Cookies.set(TOKEN_KEY, token, { expires: 1, path: '/' });

    // Salva no localStorage para persistência client-side rápida
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem('integrasaude_email', email);
    localStorage.setItem('integrasaude_perfil', perfil);

    setUsuario({ token, email, perfil });
    router.push('/dashboard');
  };

  const logout = () => {
    Cookies.remove(TOKEN_KEY, { path: '/' });
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('integrasaude_email');
    localStorage.removeItem('integrasaude_perfil');
    setUsuario(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        login,
        logout,
        isAuthenticated: !!usuario,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
  }
  return context;
};