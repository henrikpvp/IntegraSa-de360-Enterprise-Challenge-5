'use client';

import React, { useState, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Activity, 
  Users, 
  Clock, 
  History, 
  Bell, 
  DollarSign, 
  Settings, 
  Sun, 
  Moon, 
  LogOut,
  ChevronRight,
  User,
  Shield,
  LucideIcon
} from 'lucide-react';
import { authService } from '@/services/authService';

interface MenuItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface SidebarLayoutProps {
  children: ReactNode;
}

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [menuNotifAberto, setMenuNotifAberto] = useState<boolean>(false);
  const [menuPerfilAberto, setMenuPerfilAberto] = useState<boolean>(false);
  
  const pathname = usePathname();

  const listaNotificacoes = [
    { id: 1, texto: 'Paciente Ana Maria chegou à recepção.', hora: 'Há 5 min' },
    { id: 2, texto: 'Alerta de IA: Tempo de espera elevado no Consultório 2.', hora: 'Há 12 min' },
    { id: 3, texto: 'Relatório financeiro mensal gerado.', hora: 'Há 1 hora' },
  ];

  const toggleTheme = (): void => {
    setIsDarkMode(!isDarkMode);
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark');
    }
  };

  const menuItems: MenuItem[] = [
    { label: 'Fila de Atendimento', href: '/dashboard/atendimento', icon: Activity },
    { label: 'Pacientes & Clientes', href: '/dashboard/pacientes', icon: Users },
    { label: 'Lembretes & Agenda', href: '/dashboard/lembretes', icon: Clock },
    { label: 'Histórico Clínico', href: '/dashboard/historico', icon: History },
    { label: 'Administrativo & Financeiro', href: '/dashboard/financeiro', icon: DollarSign },
    { label: 'Configurações', href: '/dashboard/configuracoes', icon: Settings },
  ];

  return (
    <div className={`min-h-screen flex transition-colors duration-200 ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* SIDEBAR LATERAL */}
      <aside className={`w-64 border-r flex flex-col justify-between p-4 transition-colors duration-200 ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div>
          {/* Logo / Marca */}
          <div className="flex items-center gap-3 px-2 py-3 mb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="bg-emerald-600 text-white p-2 rounded-lg shadow-md">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-base leading-tight tracking-tight text-slate-900 dark:text-white">
                IntegraSaúde
              </h1>
              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                360 ENTERPRISE
              </span>
            </div>
          </div>

          {/* Menu de Navegação */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-emerald-600 text-white shadow-sm' 
                      : isDarkMode 
                        ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-200' 
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 opacity-75" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Rodapé da Sidebar (Modo Dark + Logout) */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <button
            type="button"
            onClick={toggleTheme}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isDarkMode ? 'bg-slate-800 text-amber-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <div className="flex items-center gap-2">
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span>{isDarkMode ? 'Modo Claro' : 'Modo Escuro'}</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => authService.logout()}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sair da Conta</span>
          </button>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL (HEADER TOPBAR + CONTEÚDO) */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* HEADER SUPERIOR */}
        <header className={`h-16 border-b px-6 flex items-center justify-between transition-colors duration-200 relative ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <span>Painel Operacional</span>
            <span>/</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {menuItems.find(i => i.href === pathname)?.label || 'Visão Geral'}
            </span>
          </div>

          {/* Notificação + Perfil */}
          <div className="flex items-center gap-4">
            
            {/* Sininho de Notificação com Dropdown */}
            <div className="relative">
              <button 
                type="button" 
                aria-label="Notificações"
                onClick={() => {
                  setMenuNotifAberto(!menuNotifAberto);
                  setMenuPerfilAberto(false);
                }}
                className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
              >
                <Bell className="w-5 h-5" />
                {listaNotificacoes.length > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse" />
                )}
              </button>

              {menuNotifAberto && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 p-3 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-800">
                    <h4 className="font-semibold text-sm text-slate-900 dark:text-white">Central de Notificações</h4>
                    <span className="text-xs text-emerald-500 font-medium">{listaNotificacoes.length} novas</span>
                  </div>
                  <div className="space-y-2 mt-2 max-h-60 overflow-y-auto">
                    {listaNotificacoes.map((notif) => (
                      <div key={notif.id} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-xs border border-slate-100 dark:border-slate-800/80">
                        <p className="text-slate-800 dark:text-slate-200 font-medium">{notif.texto}</p>
                        <span className="text-slate-400 text-[10px] block mt-1">{notif.hora}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800" />

            {/* Avatar / Perfil com Dropdown */}
            <div className="relative">
              <div 
                onClick={() => {
                  setMenuPerfilAberto(!menuPerfilAberto);
                  setMenuNotifAberto(false);
                }}
                className="flex items-center gap-3 cursor-pointer select-none p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-semibold text-sm">
                  GH
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-semibold leading-none text-slate-800 dark:text-slate-200">Gabriel Henrik</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Administrador / Médico</p>
                </div>
              </div>

              {menuPerfilAberto && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 p-2 text-sm animate-in fade-in zoom-in-95 duration-150">
                  <div className="p-2 border-b border-slate-200 dark:border-slate-800">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">Gabriel Henrik</p>
                    <p className="text-xs text-slate-400">gabriel@integrasaude.com</p>
                  </div>
                  <Link 
                    href="/dashboard/configuracoes" 
                    onClick={() => setMenuPerfilAberto(false)}
                    className="flex items-center gap-2 px-3 py-2 mt-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span>Meu Perfil</span>
                  </Link>
                  <button 
                    type="button"
                    onClick={() => authService.logout()} 
                    className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 font-medium transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sair da Conta</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* CONTEÚDO DAS PÁGINAS */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>

    </div>
  );
}