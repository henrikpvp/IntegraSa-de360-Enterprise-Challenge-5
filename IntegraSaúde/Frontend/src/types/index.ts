export type PerfilUsuario = 'ADMIN' | 'MEDICO' | 'RECEPCAO' | 'ENFERMEIRO';

export type NivelRisco = 'VERMELHO' | 'LARANJA' | 'AMARELO' | 'VERDE' | 'AZUL';

export type StatusAtendimento =
  | 'AGUARDANDO_TRIAGEM'
  | 'AGUARDANDO_CONSULTA'
  | 'EM_ATENDIMENTO'
  | 'FINALIZADO'
  | 'CANCELADO';

export interface Usuario {
  id?: number;
  nome?: string;
  email: string;
  perfil: PerfilUsuario;
  token?: string;
}

export interface Paciente {
  id: number;
  nome: string;
  cpf: string;
  dataNascimento: string;
  telefone?: string;
  cartaoSus?: string;
}

export interface SinaisVitais {
  frequenciaCardiaca: number;
  pressaoSistolica: number;
  pressaoDiastolica: number;
  temperatura: number;
  saturacaoOxigenio: number;
  escalaDor: number;
}

export interface Atendimento {
  id: number;
  paciente: Paciente;
  queixaPrincipal: string;
  nivelRisco?: NivelRisco;
  status: StatusAtendimento;
  sinaisVitais?: SinaisVitais;
  dataHoraChegada: string;
  dataHoraTriagem?: string;
  dataHoraFinalizacao?: string;
}

export interface FilaAtendimento {
  atendimentoId: number;
  nomePaciente: string;
  nivelRisco: NivelRisco;
  pontuacaoPrioridade: number;
  dataHoraChegada: string;
  tempoEsperaMinutos: number;
}

// DTOs para envio de formulários
export interface RegistrarRecepcaoDTO {
  pacienteId: number;
  queixaPrincipal: string;
}

export interface RealizarTriagemDTO {
  atendimentoId: number;
  vitais: SinaisVitais;
}

// Mapeamento visual para Badges e prioridade no Front-end
export const RISCO_CONFIG: Record<NivelRisco, { rotulo: string; corBg: string; corTexto: string }> = {
  VERMELHO: { rotulo: 'Emergência', corBg: 'bg-red-500', corTexto: 'text-white' },
  LARANJA: { rotulo: 'Muito Urgente', corBg: 'bg-orange-500', corTexto: 'text-white' },
  AMARELO: { rotulo: 'Urgente', corBg: 'bg-yellow-400', corTexto: 'text-slate-900' },
  VERDE: { rotulo: 'Pouco Urgente', corBg: 'bg-green-500', corTexto: 'text-white' },
  AZUL: { rotulo: 'Não Urgente', corBg: 'bg-blue-500', corTexto: 'text-white' },
};