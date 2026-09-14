'use client';

import React from 'react';
import { Bell } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  // Mapeia o título dinâmico com base na rota atual
  const getPageTitle = () => {
    if (pathname?.includes('/configuracoes')) return 'Configurações';
    if (pathname?.includes('/pacientes')) return 'Pacientes & Clientes';
    if (pathname?.includes('/agenda')) return 'Lembretes & Agenda';
    if (pathname?.includes('/historico')) return 'Histórico Clínico';
    if (pathname?.includes('/financeiro')) return 'Administrativo & Financeiro';
    return 'Fila de Atendimento';
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] px-6 transition-colors">
      {/* Breadcrumb Dinâmico */}
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
        <span>Painel Operacional</span>
        <span>/</span>
        <span className="text-slate-900 dark:text-slate-100 font-semibold">
          {getPageTitle()}
        </span>
      </div>

      {/* Ações: Notificações e Perfil */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
        </button>

        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
            GH
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
              Gabriel Henrik
            </p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              Administrador / Médico
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}