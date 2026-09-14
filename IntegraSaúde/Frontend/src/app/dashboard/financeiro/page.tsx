'use client';
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function FinanceiroPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Administrativo & Financeiro</h2>
        <p className="text-slate-500 text-sm">Resumo de faturamento, convênios e indicadores financeiros da clínica.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase">Faturamento Mensal</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">R$ 142.850,00</p>
          <span className="text-xs text-emerald-500 font-semibold flex items-center gap-1 mt-2">
            <ArrowUpRight className="w-3 h-3" /> +12.4% em relação ao mês anterior
          </span>
        </div>

        <div className="p-4 border rounded-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase">Atendimentos por Convênio</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">384</p>
          <span className="text-xs text-slate-400 mt-2 block">Unimed, SulAmérica e Bradesco</span>
        </div>

        <div className="p-4 border rounded-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase">Glosas Recusadas</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">1.2%</p>
          <span className="text-xs text-emerald-500 font-semibold mt-2 block">Abaixo do limite de tolerância</span>
        </div>
      </div>
    </div>
  );
}