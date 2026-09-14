'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Paciente {
  id: number;
  nome: string;
  idade: number;
  prioridade: 'Baixa' | 'Média' | 'Alta' | 'Urgente';
  tempoEspera: string;
  status: 'Aguardando' | 'Em Atendimento' | 'Concluído';
  riscoIA: 'Baixo' | 'Médio' | 'Alto';
  sintomas: string;
}

interface AtendimentoContextData {
  pacientes: Paciente[];
  atenderPaciente: (id: number) => void;
  concluirAtendimento: (id: number) => void;
  adicionarPaciente: (paciente: Omit<Paciente, 'id' | 'status'>) => void;
}

const AtendimentoContext = createContext<AtendimentoContextData>({} as AtendimentoContextData);

export const AtendimentoProvider = ({ children }: { children: ReactNode }) => {
  const [pacientes, setPacientes] = useState<Paciente[]>([
    { id: 1, nome: 'Ana Maria Silva', idade: 42, prioridade: 'Alta', tempoEspera: '25 min', status: 'Aguardando', riscoIA: 'Alto', sintomas: 'Dor no peito e falta de ar' },
    { id: 2, nome: 'Carlos Eduardo', idade: 29, prioridade: 'Média', tempoEspera: '15 min', status: 'Aguardando', riscoIA: 'Médio', sintomas: 'Febre alta persistente' },
    { id: 3, nome: 'João Pedro Santos', idade: 61, prioridade: 'Urgente', tempoEspera: '05 min', status: 'Aguardando', riscoIA: 'Alto', sintomas: 'Suspeita de AVC / Desorientação' },
    { id: 4, nome: 'Mariana Lima', idade: 35, prioridade: 'Baixa', tempoEspera: '40 min', status: 'Concluído', riscoIA: 'Baixo', sintomas: 'Renovação de receita' },
  ]);

  const atenderPaciente = (id: number) => {
    setPacientes(prev =>
      prev.map(p => (p.id === id ? { ...p, status: 'Em Atendimento' } : p))
    );
  };

  const concluirAtendimento = (id: number) => {
    setPacientes(prev =>
      prev.map(p => (p.id === id ? { ...p, status: 'Concluído' } : p))
    );
  };

  const adicionarPaciente = (novo: Omit<Paciente, 'id' | 'status'>) => {
    const novoPaciente: Paciente = {
      ...novo,
      id: Date.now(),
      status: 'Aguardando',
    };
    setPacientes(prev => [novoPaciente, ...prev]);
  };

  return (
    <AtendimentoContext.Provider value={{ pacientes, atenderPaciente, concluirAtendimento, adicionarPaciente }}>
      {children}
    </AtendimentoContext.Provider>
  );
};

export const useAtendimento = () => useContext(AtendimentoContext);