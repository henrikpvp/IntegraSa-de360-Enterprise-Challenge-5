'use client';

import React from 'react';
import { FileText, Search, UserRound, CalendarClock, Pill, AlertCircle } from 'lucide-react';

const historicos = [
  {
    nome: 'Ana Maria Souza',
    idade: '42 anos',
    cpf: '***.482.910-**',
    ultimaConsulta: '12/08/2026',
    medico: 'Dr. Ricardo Almeida',
    especialidade: 'Cardiologia',
    resumo: 'Paciente com acompanhamento de hipertensão arterial e histórico de síncope recorrente.',
    status: 'Estável',
  },
  {
    nome: 'Carlos Eduardo Santos',
    idade: '31 anos',
    cpf: '***.193.820-**',
    ultimaConsulta: '08/08/2026',
    medico: 'Dra. Beatriz Costa',
    especialidade: 'Clínica Geral',
    resumo: 'Paciente em recuperação pós-exame de rotina sem intercorrências destacadas.',
    status: 'Em acompanhamento',
  },
  {
    nome: 'João Pedro Oliveira',
    idade: '58 anos',
    cpf: '***.112.453-**',
    ultimaConsulta: '04/08/2026',
    medico: 'Dr. Felipe Nunes',
    especialidade: 'Endocrinologia',
    resumo: 'Controle de diabetes com ajuste recente de medicação e monitoramento de glicemia.',
    status: 'Atenção',
  },
];

export default function HistoricoClinicoPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Histórico Clínico</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Acompanhamento completo de pacientes, consultas e evolução clínica.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
          <Search className="h-4 w-4" />
          <span>Buscar paciente</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Total</p>
            <FileText className="h-5 w-5 text-emerald-600" />
          </div>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">128</p>
          <p className="mt-2 text-xs text-emerald-600">+12% este mês</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Em acompanhamento</p>
            <UserRound className="h-5 w-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">84</p>
          <p className="mt-2 text-xs text-blue-600">Acompanhamento ativo</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Alertas</p>
            <AlertCircle className="h-5 w-5 text-amber-500" />
          </div>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">09</p>
          <p className="mt-2 text-xs text-amber-600">Requer atenção</p>
        </div>
      </div>

      <div className="space-y-4">
        {historicos.map((paciente) => (
          <div
            key={paciente.cpf}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-3">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">{paciente.nome}</h2>
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400">
                    {paciente.status}
                  </span>
                </div>

                <div className="grid gap-2 text-sm text-slate-600 dark:text-slate-300 md:grid-cols-2">
                  <p><strong>Idade:</strong> {paciente.idade}</p>
                  <p><strong>CPF:</strong> {paciente.cpf}</p>
                  <p><strong>Última consulta:</strong> {paciente.ultimaConsulta}</p>
                  <p><strong>Médico:</strong> {paciente.medico}</p>
                </div>
              </div>

              <div className="rounded-xl bg-slate-100 p-3 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                <p className="font-semibold">{paciente.especialidade}</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Atendimento em evolução
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
              <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                <strong>Resumo clínico:</strong> {paciente.resumo}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
                <CalendarClock className="h-4 w-4" />
                Ver evolução
              </button>
              <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
                <Pill className="h-4 w-4" />
                Medicamentos
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
