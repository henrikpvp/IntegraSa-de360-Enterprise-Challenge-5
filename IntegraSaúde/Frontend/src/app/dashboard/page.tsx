'use client';

import { useEffect, useState } from 'react';
import { atendimentoService } from '@/services/atendimentoService';
import { FilaAtendimento } from '@/types';
import { RiscoBadge } from '@/components/RiscoBadge';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import FadeIn from '@/components/animations/FadeIn';

export default function DashboardPage() {
  const [fila, setFila] = useState<FilaAtendimento[]>([]);
  const [carregando, setCarregando] = useState(true);
  const { usuario } = useAuth();

 const carregarFila = async () => {
    try {
      const data = await atendimentoService.obterFilaPriorizada();
      setFila(data || []);
    } catch (err) {
      console.error('Erro ao carregar fila:', err);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarFila();
    const interval = setInterval(carregarFila, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleChamarPaciente = async (id: number) => {
    try {
      await atendimentoService.finalizarAtendimento(id);
      carregarFila();
    } catch (err) {
      alert('Erro ao chamar paciente.');
    }
  };

  const metricas = [
    {
      label: 'Pacientes em espera',
      value: '128',
      detail: '+12% vs ontem',
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      label: 'Tempo médio',
      value: '11 min',
      detail: '-4 min vs média',
      icon: (
        <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      label: 'Casos críticos',
      value: '23',
      detail: 'Prioridade máxima',
      icon: (
        <svg className="w-5 h-5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      label: 'Acurácia Algorítmica',
      value: '96%',
      detail: 'Score de triagem IA',
      icon: (
        <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
  ];

  return (
    <FadeIn className="space-y-6 py-4 px-2 sm:px-4 max-w-7xl mx-auto">
      
      {/* SEÇÃO DE MÉTRICAS */}
      <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {metricas.map((card) => (
          <div
            key={card.label}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{card.label}</span>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                {card.icon}
              </div>
            </div>
            <div className="mt-3">
              <p className="text-3xl font-extrabold text-slate-900 tracking-tight">{card.value}</p>
              <p className="mt-1 text-xs font-medium text-slate-500">{card.detail}</p>
            </div>
          </div>
        ))}
      </section>

      {/* PAINEL DA FILA PRIORIZADA */}
      <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-6">
        
        {/* HEADER DA SEÇÃO */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                Operação Ativa
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <h2 className="mt-1.5 text-2xl font-bold text-slate-900 tracking-tight">
              Fila de Atendimento Priorizada
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Ordenação em tempo real pelo algoritmo preditivo</p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={carregarFila}
              isLoading={carregando}
              className="border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold px-4 py-2"
            >
              <svg className="w-4 h-4 mr-1.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Atualizar agora
            </Button>

            <div className="hidden sm:flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              {usuario?.email || 'Operador'}
            </div>
          </div>
        </div>

        {/* TABELA DE PACIENTES */}
        <div className="overflow-hidden rounded-xl border border-slate-200/80">
          {carregando && fila.length === 0 ? (
            <div className="p-8 space-y-4">
              {[1, 2, 3].map((n) => (
                <div key={n} className="animate-pulse flex items-center justify-between">
                  <div className="h-4 bg-slate-200 rounded w-48"></div>
                  <div className="h-6 bg-slate-200 rounded-full w-20"></div>
                  <div className="h-4 bg-slate-200 rounded w-16"></div>
                  <div className="h-8 bg-slate-200 rounded-lg w-24"></div>
                </div>
              ))}
            </div>
          ) : fila.length === 0 ? (
            <div className="py-12 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-400 mb-3">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-slate-600 font-semibold text-sm">Nenhum paciente aguardando</p>
              <p className="text-slate-400 text-xs mt-1">A fila de espera está vazia neste momento.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <th className="px-6 py-4">Posição</th>
                    <th className="px-6 py-4">Paciente</th>
                    <th className="px-6 py-4">Risco</th>
                    <th className="px-6 py-4">Tempo Espera</th>
                    <th className="px-6 py-4">Score Prioridade</th>
                    <th className="px-6 py-4 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {fila.map((item, index) => {
                    const inicial = item.nomePaciente ? item.nomePaciente.charAt(0).toUpperCase() : 'P';

                    return (
                      <tr key={item.atendimentoId} className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-6 py-4 text-xs font-bold text-slate-400">
                          #{String(index + 1).padStart(2, '0')}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                              {inicial}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900">{item.nomePaciente}</p>
                              <p className="text-[11px] text-slate-400">Atendimento #{item.atendimentoId}</p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <RiscoBadge risco={item.nivelRisco} />
                        </td>

                        <td className="px-6 py-4 text-xs font-medium text-slate-600">
                          {item.tempoEsperaMinutos} min
                        </td>

                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/60">
                            {item.pontuacaoPrioridade.toFixed(1)} pts
                          </span>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <Button
                            size="sm"
                            onClick={() => handleChamarPaciente(item.atendimentoId)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-3.5 py-1.5 rounded-lg shadow-sm transition-all"
                          >
                            Chamar Atendimento
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </FadeIn>
  );
}