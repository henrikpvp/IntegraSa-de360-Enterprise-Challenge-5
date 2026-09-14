'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';

export default function RelatoriosPage() {
  const [periodo, setPeriodo] = useState<'hoje' | 'semana' | 'mes'>('hoje');

  // Dados simulados representativos para exibição das métricas do algoritmo
  const kpis = {
    totalAtendimentos: periodo === 'hoje' ? 142 : periodo === 'semana' ? 980 : 3850,
    tempoMedioEspera: periodo === 'hoje' ? '14 min' : periodo === 'semana' ? '18 min' : '16 min',
    casosCriticos: periodo === 'hoje' ? 12 : periodo === 'semana' ? 84 : 310,
    precisaoAlgoritmo: '98.4%',
  };

  const distribuicaoRisco = [
    { nivel: 'VERMELHO', quantidade: 8, porcentagem: '6%', cor: 'bg-red-600' },
    { nivel: 'LARANJA', quantidade: 24, porcentagem: '17%', cor: 'bg-orange-500' },
    { nivel: 'AMARELO', quantidade: 58, porcentagem: '41%', cor: 'bg-yellow-400' },
    { nivel: 'VERDE', quantidade: 40, porcentagem: '28%', cor: 'bg-green-600' },
    { nivel: 'AZUL', quantidade: 12, porcentagem: '8%', cor: 'bg-blue-500' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Relatórios & Métricas</h1>
            <p className="text-sm text-slate-400 mt-1">
              Análise operacional e desempenho do algoritmo preditivo de triagem.
            </p>
          </div>

          {/* Filtro de Período */}
          <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800 self-start">
            <button
              onClick={() => setPeriodo('hoje')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition ${
                periodo === 'hoje' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Hoje
            </button>
            <button
              onClick={() => setPeriodo('semana')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition ${
                periodo === 'semana' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Últimos 7 dias
            </button>
            <button
              onClick={() => setPeriodo('mes')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition ${
                periodo === 'mes' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Mês Atual
            </button>
          </div>
        </div>

        {/* Cards de KPIs Principais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-lg">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total de Atendimentos</span>
            <div className="text-3xl font-bold text-white mt-2">{kpis.totalAtendimentos}</div>
            <span className="text-xs text-emerald-400 font-medium mt-2 inline-block">↑ +12% vs período anterior</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-lg">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Tempo Médio de Espera</span>
            <div className="text-3xl font-bold text-blue-400 mt-2">{kpis.tempoMedioEspera}</div>
            <span className="text-xs text-emerald-400 font-medium mt-2 inline-block">↓ -4 min com triagem IA</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-lg">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Atendimentos Críticos</span>
            <div className="text-3xl font-bold text-red-400 mt-2">{kpis.casosCriticos}</div>
            <span className="text-xs text-slate-400 mt-2 inline-block">Vermelho / Laranja</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-lg">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Acurácia da Priorização</span>
            <div className="text-3xl font-bold text-emerald-400 mt-2">{kpis.precisaoAlgoritmo}</div>
            <span className="text-xs text-slate-400 mt-2 inline-block">Score Preditivo de Risco</span>
          </div>
        </div>

        {/* Seção Gráfica e Detalhamento */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Distribuição de Risco (Manchester) */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-xl">
            <h2 className="text-lg font-bold mb-1">Distribuição por Nível de Risco</h2>
            <p className="text-xs text-slate-400 mb-6">Classificação gerada na triagem inicial do paciente</p>

            <div className="space-y-4">
              {distribuicaoRisco.map((item) => (
                <div key={item.nivel} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-300">{item.nivel}</span>
                    <span className="text-slate-400">
                      {item.quantidade} pac. ({item.porcentagem})
                    </span>
                  </div>
                  <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className={`h-full ${item.cor} rounded-full transition-all duration-500`}
                      style={{ width: item.porcentagem }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resumo da Operação Hospitalar */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-xl flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold mb-1">Status da Fila</h2>
              <p className="text-xs text-slate-400 mb-6">Situação atual da emergência</p>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                  <span className="text-xs font-medium text-slate-300">Aguardando Triagem</span>
                  <span className="text-sm font-bold text-yellow-400">4 pac.</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                  <span className="text-xs font-medium text-slate-300">Aguardando Médico</span>
                  <span className="text-sm font-bold text-blue-400">9 pac.</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                  <span className="text-xs font-medium text-slate-300">Em Consulta Ativa</span>
                  <span className="text-sm font-bold text-emerald-400">3 pac.</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <button
                onClick={() => window.print()}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition"
              >
                Exportar Relatório PDF
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}