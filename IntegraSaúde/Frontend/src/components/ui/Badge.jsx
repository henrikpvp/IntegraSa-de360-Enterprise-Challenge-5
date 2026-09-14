import { getRiskBadgeConfig } from '@/utils/formatters';

export function RiskBadge({ level }) {
  const config = getRiskBadgeConfig(level) || {
    bg: 'bg-slate-100',
    text: 'text-slate-700',
    label: 'Não classificado',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  );
}

export function StatusBadge({ status }) {
  const styles = {
    AGUARDANDO: 'bg-slate-100 text-slate-700 border-slate-200',
    EM_TRIAGEM: 'bg-purple-50 text-purple-700 border-purple-200',
    AGUARDANDO_MEDICO: 'bg-amber-50 text-amber-700 border-amber-200',
    EM_ATENDIMENTO: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    CONCLUIDO: 'bg-blue-50 text-blue-700 border-blue-200',
  };

  const statusFormatado = status
    ? status.replace(/_/g, ' ')
    : 'INDEFINIDO';

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border uppercase tracking-wider ${
        styles[status] || 'bg-slate-100 text-slate-700 border-slate-200'
      }`}
    >
      {statusFormatado}
    </span>
  );
}