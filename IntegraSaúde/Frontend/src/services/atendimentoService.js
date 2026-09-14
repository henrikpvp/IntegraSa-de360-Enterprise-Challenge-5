import { api } from './api';

export const atendimentoService = {
  // Buscar fila completa por status
  async getFilaAtendimento(status) {
    try {
      const response = await api.get('/atendimentos/fila', {
        params: status ? { status } : undefined,
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar fila de atendimento:', error);
      throw error.response?.data?.message || 'Erro ao carregar fila de atendimento.';
    }
  },

  // Criar novo atendimento (Entrada do paciente)
  async criarAtendimento(pacienteData) {
    try {
      // Aceita tanto o id numérico/string quanto um objeto { pacienteId }
      const payload = typeof pacienteData === 'object' ? pacienteData : { pacienteId: pacienteData };
      const response = await api.post('/atendimentos', payload);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar atendimento:', error);
      throw error.response?.data?.message || 'Erro ao registrar atendimento.';
    }
  },

  // Registrar Triagem do paciente
  async registrarTriagem(atendimentoId, dadosTriagem) {
    try {
      const response = await api.post(`/atendimentos/${atendimentoId}/triagem`, dadosTriagem);
      return response.data;
    } catch (error) {
      console.error('Erro ao registrar triagem:', error);
      throw error.response?.data?.message || 'Erro ao salvar triagem do paciente.';
    }
  },

  // Chamar próximo paciente ou alterar status
  async atualizarStatus(atendimentoId, status) {
    try {
      const response = await api.patch(`/atendimentos/${atendimentoId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar status do atendimento:', error);
      throw error.response?.data?.message || 'Erro ao alterar status do atendimento.';
    }
  },
};