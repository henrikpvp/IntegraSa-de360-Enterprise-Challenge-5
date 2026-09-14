// Máscara de CPF: 000.000.000-00
export const formatCPF = (value) => {
  if (!value) return '';
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    .slice(0, 14);
};

// Máscara de Telefone: (00) 00000-0000 ou (00) 0000-0000
export const formatPhone = (value) => {
  if (!value) return '';
  const cleanValue = value.replace(/\D/g, '');
  
  if (cleanValue.length <= 10) {
    return cleanValue
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .slice(0, 14);
  }

  return cleanValue
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .slice(0, 15);
};

// Formatação de data/hora padrão brasileiro
export const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

// Mapeamento visual para Níveis de Risco (Manchester / Cores)
export const getRiskBadgeConfig = (level) => {
  switch (level?.toUpperCase()) {
    case 'VERMELHO':
    case 'EMERGENCIA':
      return { label: 'Emergência', bg: 'bg-red-500', text: 'text-white' };
    case 'LARANJA':
    case 'MUITO_URGENTE':
      return { label: 'Muito Urgente', bg: 'bg-orange-500', text: 'text-white' };
    case 'AMARELO':
    case 'URGENTE':
      return { label: 'Urgente', bg: 'bg-yellow-400', text: 'text-slate-900' };
    case 'VERDE':
    case 'POUCO_URGENTE':
      return { label: 'Pouco Urgente', bg: 'bg-green-500', text: 'text-white' };
    case 'AZUL':
    case 'NAO_URGENTE':
    default:
      return { label: 'Não Urgente', bg: 'bg-blue-500', text: 'text-white' };
  }
};