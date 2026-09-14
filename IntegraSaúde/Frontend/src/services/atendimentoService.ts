import { api } from './api';
import { Atendimento, FilaAtendimento, SinaisVitais } from '@/types';

export interface RegistrarRecepcaoDTO {
  pacienteId: number;
  queixaPrincipal: string;
}

export const atendimentoService = {
  // Registrar a entrada do paciente na recepção
  registrarRecepcao: async (data: RegistrarRecepcaoDTO): Promise<Atendimento> => {
    try {
      const response = await api.post<Atendimento>('/atendimentos/recepcao', data);
      return response.data;
    } catch (error: any) {
      console.error('Erro ao registrar recepção:', error);
      throw new Error(error.response?.data?.message || 'Erro ao registrar entrada na recepção.');
    }
  },

  // Gravar a triagem com os sinais vitais
  realizarTriagem: async (atendimentoId: number, vitais: SinaisVitais): Promise<Atendimento> => {
    try {
      const response = await api.put<Atendimento>(`/atendimentos/${atendimentoId}/triagem`, vitais);
      return response.data;
    } catch (error: any) {
      console.error('Erro ao realizar triagem:', error);
      throw new Error(error.response?.data?.message || 'Erro ao salvar triagem do paciente.');
    }
  },

  // Buscar a fila priorizada pelo algoritmo de predição/Manchester
  obterFilaPriorizada: async (status?: string): Promise<FilaAtendimento[]> => {
    try {
      const response = await api.get<FilaAtendimento[]>('/atendimentos/fila', {
        params: status ? { status } : undefined,
      });
      return response.data;
    } catch (error: any) {
      console.error('Erro ao obter fila priorizada:', error);
      throw new Error(error.response?.data?.message || 'Erro ao carregar fila de atendimento.');
    }
  },

  // Concluir/Finalizar o atendimento médico
  finalizarAtendimento: async (atendimentoId: number): Promise<Atendimento> => {
    try {
      const response = await api.patch<Atendimento>(`/atendimentos/${atendimentoId}/finalizar`);
      return response.data;
    } catch (error: any) {
      console.error('Erro ao finalizar atendimento:', error);
      throw new Error(error.response?.data?.message || 'Erro ao finalizar atendimento.');
    }
  },
};