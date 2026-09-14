'use client';
import React from 'react';
import { Clock, Plus } from 'lucide-react';

export default function LembretesPage() {
  const compromissos = [
    { id: 1, hora: '08:00', titulo: 'Reunião Clínica Semanal', tipo: 'Interno' },
    { id: 2, hora: '10:30', titulo: 'Atendimento Prioritário - Paciente Maria', tipo: 'Consulta' },
    { id: 3, hora: '14:00', titulo: 'Treinamento do Algoritmo de IA com a Equipe', tipo: 'Treinamento' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Agenda & Lembretes</h2>
          <p className="text-slate-500 text-sm">Organização de consultas, turnos e compromissos operacionais.</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2">
          <Plus className="w-4 h-4" /> Novo Lembrete
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {compromissos.map((item) => (
          <div key={item.id} className="p-4 border rounded-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-3">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-lg">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-600">{item.hora}</span>
              <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm mt-0.5">{item.titulo}</h4>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full mt-2 inline-block">{item.tipo}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}