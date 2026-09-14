'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { atendimentoService } from '@/services/atendimentoService';
import { useRouter } from 'next/navigation';

export default function TriagemPage() {
  const router = useRouter();
  const [atendimentoId, setAtendimentoId] = useState('');
  const [queixaPrincipal, setQueixaPrincipal] = useState('');
  
  // Sinais Vitais
  const [frequenciaCardiaca, setFrequenciaCardiaca] = useState(80);
  const [pressaoSistolica, setPressaoSistolica] = useState(120);
  const [pressaoDiastolica, setPressaoDiastolica] = useState(80);
  const [temperatura, setTemperatura] = useState(36.5);
  const [saturacaoOxigenio, setSaturacaoOxigenio] = useState(98);
  const [escalaDor, setEscalaDor] = useState(0);

  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);

    try {
      await atendimentoService.realizarTriagem(Number(atendimentoId), {
        frequenciaCardiaca: Number(frequenciaCardiaca),
        pressaoSistolica: Number(pressaoSistolica),
        pressaoDiastolica: Number(pressaoDiastolica),
        temperatura: Number(temperatura),
        saturacaoOxigenio: Number(saturacaoOxigenio),
        escalaDor: Number(escalaDor),
      });

      alert('Triagem realizada com sucesso! Paciente inserido na fila priorizada.');
      router.push('/dashboard');
    } catch (err) {
      alert('Erro ao registrar triagem. Verifique se o ID do atendimento está correto.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight">Nova Triagem de Paciente</h1>
            <p className="text-sm text-slate-400 mt-1">
              Insira os sinais vitais coletados para acionar o algoritmo de priorização.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-xl space-y-6">
            {/* ID do Atendimento */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">ID do Atendimento</label>
              <input
                type="number"
                required
                value={atendimentoId}
                onChange={(e) => setAtendimentoId(e.target.value)}
                placeholder="Ex: 1"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Queixa Principal */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Queixa Principal / Sintomas</label>
              <textarea
                rows={3}
                value={queixaPrincipal}
                onChange={(e) => setQueixaPrincipal(e.target.value)}
                placeholder="Relato do paciente na recepção..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="border-t border-slate-800 pt-6">
              <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">Sinais Vitais</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Freq. Cardíaca (BPM)</label>
                  <input
                    type="number"
                    value={frequenciaCardiaca}
                    onChange={(e) => setFrequenciaCardiaca(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Saturação O₂ (%)</label>
                  <input
                    type="number"
                    value={saturacaoOxigenio}
                    onChange={(e) => setSaturacaoOxigenio(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Pressão Sistólica (mmHg)</label>
                  <input
                    type="number"
                    value={pressaoSistolica}
                    onChange={(e) => setPressaoSistolica(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Pressão Diastólica (mmHg)</label>
                  <input
                    type="number"
                    value={pressaoDiastolica}
                    onChange={(e) => setPressaoDiastolica(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Temperatura (°C)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={temperatura}
                    onChange={(e) => setTemperatura(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Escala de Dor (0 a 10)</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={escalaDor}
                    onChange={(e) => setEscalaDor(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={enviando}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 font-semibold rounded-lg text-white shadow-lg transition disabled:opacity-50"
            >
              {enviando ? 'Processando Triagem...' : 'Calcular Risco e Enviar para Fila'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}