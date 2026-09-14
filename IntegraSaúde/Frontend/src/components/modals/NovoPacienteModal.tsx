'use client';

import React, { useState } from 'react';
import { X, UserPlus, AlertTriangle } from 'lucide-react';
import { useAtendimento, Paciente } from '@/context/AtendimentoContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NovoPacienteModal({ isOpen, onClose }: ModalProps) {
  const { adicionarPaciente } = useAtendimento();

  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [prioridade, setPrioridade] = useState<Paciente['prioridade']>('Média');
  const [riscoIA, setRiscoIA] = useState<Paciente['riscoIA']>('Médio');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !idade || !sintomas) return;

    adicionarPaciente({
      nome,
      idade: Number(idade),
      sintomas,
      prioridade,
      riscoIA,
      tempoEspera: '0 min',
    });

    // Limpa os campos e fecha o modal
    setNome('');
    setIdade('');
    setSintomas('');
    setPrioridade('Média');
    setRiscoIA('Médio');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-6">
        
        {/* Cabeçalho do Modal */}
        <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-lg">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Nova Triagem de Paciente</h3>
              <p className="text-xs text-slate-500">Cadastre a entrada e sintomas na recepção</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Nome Completo</label>
              <input 
                type="text" 
                required
                placeholder="Ex: Maria Oliveira"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Idade</label>
              <input 
                type="number" 
                required
                placeholder="Ex: 34"
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Sintomas Queixados / Relato</label>
            <textarea 
              required
              rows={2}
              placeholder="Descreva brevemente os sintomas relatados na recepção..."
              value={sintomas}
              onChange={(e) => setSintomas(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Prioridade Clinica</label>
              <select 
                value={prioridade}
                onChange={(e) => setPrioridade(e.target.value as Paciente['prioridade'])}
                className="w-full px-3 py-2 border rounded-lg text-sm bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Baixa">Baixa</option>
                <option value="Média">Média</option>
                <option value="Alta">Alta</option>
                <option value="Urgente">Urgente</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Predição / Risco IA</label>
              <select 
                value={riscoIA}
                onChange={(e) => setRiscoIA(e.target.value as Paciente['riscoIA'])}
                className="w-full px-3 py-2 border rounded-lg text-sm bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Baixo">Baixo</option>
                <option value="Médio">Médio</option>
                <option value="Alto">Alto</option>
              </select>
            </div>
          </div>

          {/* Rodapé e Botões */}
          <div className="flex justify-end gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              Adicionar à Fila
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}