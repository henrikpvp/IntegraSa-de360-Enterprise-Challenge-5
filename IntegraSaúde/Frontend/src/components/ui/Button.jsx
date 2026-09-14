export default function Button({
  children,
  variant = 'primary',
  isLoading = false,
  disabled = false,
  type = 'button',
  className = '',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0';

  const variants = {
    primary:
      'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-[0_14px_28px_rgba(16,185,129,0.28)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(16,185,129,0.32)] active:translate-y-0',
    secondary: 'bg-slate-100 text-slate-800 hover:bg-slate-200 active:bg-slate-300',
    outline:
      'border border-slate-200 bg-white text-slate-700 hover:border-emerald-200 hover:bg-emerald-50 active:bg-emerald-100',
    danger: 'bg-rose-500 text-white hover:bg-rose-600 active:bg-rose-700',
  };

  const selectedVariant = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      className={`${base} ${selectedVariant} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <svg className="h-4 w-4 animate-spin text-current" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Carregando...
        </span>
      ) : (
        children
      )}
    </button>
  );
}