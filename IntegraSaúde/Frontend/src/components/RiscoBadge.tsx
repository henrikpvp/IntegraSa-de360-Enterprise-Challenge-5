import { NivelRisco } from '@/types';

interface RiscoBadgeProps {
  risco?: NivelRisco;
}

export function RiscoBadge({ risco }: RiscoBadgeProps) {
  const styles: Record<NivelRisco, string> = {
    VERMELHO: 'bg-red-600 text-white animate-pulse shadow-xs',
    LARANJA: 'bg-orange-500 text-white shadow-xs',
    AMARELO: 'bg-amber-400 text-slate-950 font-bold shadow-xs',
    VERDE: 'bg-emerald-600 text-white shadow-xs',
    AZUL: 'bg-blue-500 text-white shadow-xs',
  };

  if (!risco || !styles[risco]) {
    return (
      <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-200 text-slate-700">
        NÃO TRIADO
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${styles[risco]}`}
    >
      {risco}
    </span>
  );
}