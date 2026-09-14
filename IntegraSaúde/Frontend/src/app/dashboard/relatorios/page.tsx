'use client';

import React from 'react';
import FadeIn from '@/components/animations/FadeIn';

interface KPIItem {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  color: string;
  badgeBg: string;
  icon: React.ReactNode;
}

interface ChartDataPoint {
  hora: string;
  vermelho: number;
  amarelo: number;
  verde: number;
  azul: number;
}

export default function RelatoriosPage() {
  const kpis: KPIItem[] = [
    {
      title: 'Atendimentos Hoje',
      value: '42',
      change: '+12%',
      trend: 'up',
      color: 'bg-emerald-500',
      badgeBg: 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/60',
      icon: (
        <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: 'Tempo Médio de Espera',
      value: '18 min',
      change: '-4 min',
      trend: 'down',
      color: 'bg-sky-500',
      badgeBg: 'bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-400 border-sky-200/60 dark:border-sky-800/60',
      icon: (
        <svg className="w-5 h-5 text-sky-600 dark:text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Pacientes em Fila',
      value: '07',
      change: 'Normal',
      trend: 'neutral',
      color: 'bg-amber-500',
      badgeBg: 'bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 border-amber-200/60 dark:border-amber-800/60',
      icon: (
        <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Casos Críticos (Vermelho)',
      value: '01',
      change: 'Atendido',
      trend: 'neutral',
      color: 'bg-rose-500',
      badgeBg: 'bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-400 border-rose-200/60 dark:border-rose-800/60',
      icon: (
        <svg className="w-5 h-5 text-rose-600 dark:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
  ];

  // MOCK DE DADOS PARA O GRÁFICO VISUAL
  const mockChartData: ChartDataPoint[] = [
    { hora: '08:00', vermelho: 1, amarelo: 4, verde: 8, azul: 3 },
    { hora: '10:00', vermelho: 2, amarelo: 6, verde: 12, azul: 5 },
    { hora: '12:00', vermelho: 0, amarelo: 8, verde: 15, azul: 4 },
    { hora: '14:00', vermelho: 1, amarelo: 5, verde: 10, azul: 6 },
    { hora: '16:00', vermelho: 3, amarelo: 7, verde: 9, azul: 2 },
    { hora: '18:00', vermelho: 0, amarelo: 3, verde: 6, azul: 1 },
  ];

  return (
    <FadeIn className="space-y-6 py-4 px-2 sm:px-4 max-w-7xl mx-auto">
      
      {/* HEADER DA PÁGINA */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Métricas & Relatórios
            </h1>
            <span className="bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-700/50">
              Ao Vivo
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Visão geral do fluxo e desempenho do atendimento hospitalar
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Período:</span>
          <select className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500/20 transition-colors">
            <option>Hoje</option>
            <option>Últimos 7 dias</option>
            <option>Mês Atual</option>
          </select>
        </div>
      </div>

      {/* CARDS DE KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden flex flex-col justify-between transition-colors"
          >
            <div className={`absolute top-0 left-0 right-0 h-1 ${kpi.color}`} />
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  {kpi.title}
                </span>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60">
                  {kpi.icon}
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {kpi.value}
                </span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${kpi.badgeBg}`}>
                  {kpi.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SEÇÃO PRINCIPAL DE ANÁLISE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* GRÁFICO DE DISTRIBUIÇÃO */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Fluxo de Triagem por Horário
              </h2>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Distribuição volumétrica de triagens classificadas
              </p>
            </div>
            
            {/* LEGENDA DE RISCO */}
            <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Emergência</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Urgência</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Pouco Urg.</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span> Não Urg.</span>
            </div>
          </div>

          {/* VISUALIZADOR DE BARRAS POR HORÁRIO */}
          <div className="pt-4">
            <div className="h-52 flex items-end justify-between gap-3 sm:gap-6 px-2 border-b border-slate-200 dark:border-slate-800 pb-2">
              {mockChartData.map((d, i) => {
                const hVermelho = (d.vermelho / 25) * 100;
                const hAmarelo = (d.amarelo / 25) * 100;
                const hVerde = (d.verde / 25) * 100;
                const hAzul = (d.azul / 25) * 100;

                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <div className="w-full max-w-[36px] bg-slate-100 dark:bg-slate-800 rounded-t-lg overflow-hidden flex flex-col-reverse h-full justify-start transition-all group-hover:opacity-90">
                      <div style={{ height: `${hAzul}%` }} className="bg-sky-500 w-full" title={`Não Urgente: ${d.azul}`} />
                      <div style={{ height: `${hVerde}%` }} className="bg-emerald-500 w-full" title={`Pouco Urgente: ${d.verde}`} />
                      <div style={{ height: `${hAmarelo}%` }} className="bg-amber-500 w-full" title={`Urgência: ${d.amarelo}`} />
                      <div style={{ height: `${hVermelho}%` }} className="bg-rose-500 w-full" title={`Emergência: ${d.vermelho}`} />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">{d.hora}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RESUMO DE EFICIÊNCIA OPERACIONAL */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between transition-colors">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
              Resumo Operacional
            </h2>
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Capacidade da Recepção</p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500">Atendimentos em ritmo ideal</p>
                </div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-1 rounded-md border border-emerald-200/60 dark:border-emerald-800/60">
                  92%
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Triagem Inicial</p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500">Tempo médio de avaliação</p>
                </div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-200/60 dark:bg-slate-700 px-2 py-1 rounded-md">
                  4.2 min
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Taxa de Encaminhamento</p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500">Direcionados a consultórios</p>
                </div>
                <span className="text-xs font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/80 px-2 py-1 rounded-md border border-sky-200/60 dark:border-sky-800/60">
                  98%
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center">
              Dados atualizados sincronizados via Backend BFF
            </p>
          </div>
        </div>

      </div>
    </FadeIn>
  );
}