'use client';
import React from 'react';

export default function ConfiguracoesPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Configurações do Sistema
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Gerencie dados da conta, permissões e parâmetros do algoritmo de IA.
        </p>
      </div>

      <div className="border rounded-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 p-6 space-y-6 shadow-sm">
        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">
            Perfil do Usuário
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Informações pessoais e cargo na unidade de saúde.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Nome Completo
              </label>
              <input 
                type="text" 
                defaultValue="Gabriel Henrik" 
                className="w-full px-3 py-2 border rounded-lg text-sm bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors" 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                E-mail Corporativo
              </label>
              <input 
                type="email" 
                defaultValue="gabriel@integrasaude.com" 
                className="w-full px-3 py-2 border rounded-lg text-sm bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors" 
              />
            </div>
          </div>
        </div>

        <hr className="border-slate-200 dark:border-slate-800" />

        <div className="flex justify-end">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors">
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
}