'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Clock, 
  Activity, 
  Search, 
  Plus, 
  BrainCircuit, 
  X, 
  CheckCircle2
} from 'lucide-react';

interface Paciente {
  id: number;
  nome: string;
  cpf: string;
  risco: 'Vermelho' | 'Laranja' | 'Amarelo' | 'Verde' | 'Azul';
  status: 'Aguardando Triagem' | 'Aguardando Médico' | 'Em Atendimento';
  hora: string;
  scoreNoShow: number;
}

export default function AtendimentoPage() {
  const [pacientes, setPacientes] = useState<Paciente[]>([
    { id: 1, nome: 'Ana Maria Souza', cpf: '***.482.910-**', risco: 'Vermelho', status: 'Aguardando Médico', hora: '10:12', scoreNoShow: 5 },
    { id: 2, nome: 'Carlos Eduardo Santos', cpf: '***.193.820-**', risco: 'Laranja', status: 'Aguardando Triagem', hora: '10:18', scoreNoShow: 18 },
    { id: 3, nome: 'Beatriz Lima', cpf: '***.901.332-**', risco: 'Amarelo', status: 'Em Atendimento', hora: '09:55', scoreNoShow: 12 },
    { id: 4, nome: 'João Pedro Oliveira', cpf: '***.112.453-**', risco: 'Verde', status: 'Aguardando Médico', hora: '10:25', scoreNoShow: 42 },
    { id: 5, nome: 'Mariana Costa', cpf: '***.774.120-**', risco: 'Azul', status: 'Aguardando Triagem', hora: '10:30', scoreNoShow: 8 },
  ]);

  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [novoNome, setNovoNome] = useState('');
  const [novoCpf, setNovoCpf] = useState('');
  const [novoRisco, setNovoRisco] = useState<'Vermelho' | 'Laranja' | 'Amarelo' | 'Verde' | 'Azul'>('Amarelo');
  const [mensagemAviso, setMensagemAviso] = useState<string | null>(null);

  const handleAtenderPaciente = (id: number, nome: string) => {
    setPacientes(prev =>
      prev.map(p => (p.id === id ? { ...p, status: 'Em Atendimento' } : p))
    );
    setMensagemAviso(`Paciente ${nome} encaminhado para o consultório!`);
    setTimeout(() => setMensagemAviso(null), 3000);
  };

  const handleAdicionarPaciente = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoNome) return;

    const novoPaciente: Paciente = {
      id: Date.now(),
      nome: novoNome,
      cpf: novoCpf || '***.000.000-**',
      risco: novoRisco,
      status: 'Aguardando Triagem',
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      scoreNoShow: Math.floor(Math.random() * 25) + 5,
    };

    setPacientes([novoPaciente, ...pacientes]);
    setNovoNome('');
    setNovoCpf('');
    setNovoRisco('Amarelo');
    setModalAberto(false);
  };

  const pacientesFiltrados = pacientes.filter(
    (p) => p.nome.toLowerCase().includes(busca.toLowerCase()) || p.cpf.includes(busca)
  );

  const getCorManchester = (risco: string) => {
    switch (risco) {
      case 'Vermelho': return { bg: 'bg-rose-500', text: 'text-white' };
      case 'Laranja': return { bg: 'bg-amber-500', text: 'text-white' };
      case 'Amarelo': return { bg: 'bg-yellow-400', text: 'text-slate-950' };
      case 'Verde': return { bg: 'bg-emerald-500', text: 'text-white' };
      case 'Azul': return { bg: 'bg-sky-500', text: 'text-white' };
      default: return { bg: 'bg-slate-500', text: 'text-white' };
    }
  };

  return (
    <div className="space-y-6">

      {/* FEEDBACK TEMPORÁRIO */}
      {mensagemAviso && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-500/30 text-emerald-900 dark:text-emerald-200 flex items-center gap-3 shadow-sm animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span className="text-sm font-medium">{mensagemAviso}</span>
        </div>
      )}

      {/* TÍTULO DA PÁGINA E BOTÃO DE NOVA TRIAGEM */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-bold text-xl sm:text-2xl leading-tight tracking-tight text-slate-900 dark:text-slate-100">
            IntegraSaúde
          </h1>
          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700/50 px-2 py-0.5 rounded uppercase tracking-wider inline-block mt-1 shadow-sm">
            360 ENTERPRISE
          </span>
        </div>

        <button
          onClick={() => setModalAberto(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-lg shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nova Triagem
        </button>
      </div>

      {/* IA PREDITIVA (Adaptado para Light & Dark Theme) */}
      <div className="p-4 rounded-xl border bg-slate-900 text-white dark:bg-slate-900/90 border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-600 text-white rounded-lg shadow-md shrink-0">
            <BrainCircuit className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-white flex items-center gap-2">
              Algoritmo Preditivo de Fila & No-Show
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold px-2 py-0.5 rounded-full uppercase">
                Ativo
              </span>
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">
              Tempo médio de espera estimado: <strong className="text-emerald-400">14 minutos</strong>. Taxa média de não comparecimento hoje: <strong className="text-emerald-400">8.4%</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* CARDS KPI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Aguardando Médicos</p>
            <p className="text-3xl font-bold mt-1 text-slate-900 dark:text-white">
              {pacientes.filter(p => p.status === 'Aguardando Médico').length}
            </p>
          </div>
          <div className="p-3 bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 rounded-xl">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="p-4 rounded-xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Em Atendimento</p>
            <p className="text-3xl font-bold mt-1 text-slate-900 dark:text-white">
              {pacientes.filter(p => p.status === 'Em Atendimento').length}
            </p>
          </div>
          <div className="p-3 bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-xl">
            <Activity className="w-6 h-6" />
          </div>
        </div>

        <div className="p-4 rounded-xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total na Fila</p>
            <p className="text-3xl font-bold mt-1 text-slate-900 dark:text-white">{pacientes.length}</p>
          </div>
          <div className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* TABELA DE PACIENTES */}
      <div className="border rounded-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-3 justify-between items-center">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input 
              type="text" 
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por nome ou CPF..." 
              className="w-full pl-9 pr-4 py-2 text-sm border rounded-lg bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">Paciente</th>
                <th className="p-4">Protocolo Manchester</th>
                <th className="p-4">Risco No-Show (IA)</th>
                <th className="p-4">Status</th>
                <th className="p-4">Chegada</th>
                <th className="p-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {pacientesFiltrados.length > 0 ? (
                pacientesFiltrados.map((paciente) => {
                  const cores = getCorManchester(paciente.risco);
                  return (
                    <tr key={paciente.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="p-4">
                        <p className="font-semibold text-slate-900 dark:text-slate-100">{paciente.nome}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{paciente.cpf}</p>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cores.bg} ${cores.text} shadow-sm`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                          {paciente.risco}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${paciente.scoreNoShow > 30 ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                              style={{ width: `${paciente.scoreNoShow}%` }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{paciente.scoreNoShow}%</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-slate-800 dark:text-slate-200 font-medium">{paciente.status}</span>
                      </td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">{paciente.hora}</td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => handleAtenderPaciente(paciente.id, paciente.nome)}
                          disabled={paciente.status === 'Em Atendimento'}
                          className={`px-3 py-1.5 font-semibold rounded-lg text-xs transition-colors ${
                            paciente.status === 'Em Atendimento'
                              ? 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500 cursor-not-allowed'
                              : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/60'
                          }`}
                        >
                          {paciente.status === 'Em Atendimento' ? 'Atendendo...' : 'Atender'}
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500 dark:text-slate-400">
                    Nenhum paciente encontrado na busca.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* MODAL DE NOVA TRIAGEM */}
      {modalAberto && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-w-md w-full p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-150">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Nova Triagem de Paciente</h3>
              <button 
                onClick={() => setModalAberto(false)} 
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdicionarPaciente} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Nome Completo</label>
                <input 
                  type="text"
                  required
                  value={novoNome}
                  onChange={(e) => setNovoNome(e.target.value)}
                  placeholder="Ex: Gabriel Alves"
                  className="w-full px-3 py-2 text-sm border rounded-lg bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">CPF (opcional)</label>
                <input 
                  type="text"
                  value={novoCpf}
                  onChange={(e) => setNovoCpf(e.target.value)}
                  placeholder="000.000.000-00"
                  className="w-full px-3 py-2 text-sm border rounded-lg bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Classificação Manchester (Risco)</label>
                <select 
                  value={novoRisco}
                  onChange={(e) => setNovoRisco(e.target.value as Paciente['risco'])}
                  className="w-full px-3 py-2 text-sm border rounded-lg bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors"
                >
                  <option value="Vermelho">Vermelho - Emergência</option>
                  <option value="Laranja">Laranja - Muito Urgente</option>
                  <option value="Amarelo">Amarelo - Urgente</option>
                  <option value="Verde">Verde - Pouco Urgente</option>
                  <option value="Azul">Azul - Não Urgente</option>
                </select>
              </div>

              <div className="pt-2 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setModalAberto(false)}
                  className="flex-1 py-2 text-sm font-medium border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2 text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors shadow-sm"
                >
                  Confirmar Entrada
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}