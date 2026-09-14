'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Sidebar({ isOpen = false, onClose = () => {} }) {
  const pathname = usePathname();
  const { usuario, logout } = useAuth();

  const links = [
    {
      href: '/dashboard/atendimento',
      label: 'Fila de Atendimento',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    },
    {
      href: '/dashboard/pacientes',
      label: 'Cadastro de Pacientes',
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    },
    {
      href: '/dashboard/relatorios',
      label: 'Relatórios & Métricas',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    },
  ];

  const nomeUsuario = usuario?.email ? usuario.email.split('@')[0] : 'Atendimento Geral';
  const inicial = nomeUsuario.charAt(0).toUpperCase();

  return (
    <>
      {/* OVERLAY MOBILE */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* ASIDE / SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col justify-between border-r border-slate-200/80 bg-white/95 p-5 backdrop-blur-xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* LOGO */}
          <div className="mb-8 flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-lg font-black text-white shadow-[0_10px_24px_rgba(16,185,129,0.25)]">
              IS
            </div>
          <div>
              <h1 className="font-bold text-base leading-tight tracking-tight text-slate-900 dark:text-white">
                IntegraSaúde
              </h1>
              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                360 ENTERPRISE
              </span>
            </div>
          </div>

          {/* NAV LINKS */}
          <nav className="space-y-1.5">
            {links.map((link) => {
              const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-[0_12px_28px_rgba(16,185,129,0.25)]'
                      : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                  }`}
                >
                  <svg className="h-5 w-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d={link.icon} />
                  </svg>
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* FOOTER USER / LOGOUT */}
        <div className="space-y-3 border-t border-slate-200/80 pt-4">
          <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3 border border-slate-100">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
              {inicial}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-slate-800 truncate capitalize">
                {nomeUsuario}
              </p>
              <p className="text-[11px] text-slate-500">Unidade Central</p>
            </div>
          </div>

          <button
            onClick={() => logout && logout()}
            className="flex w-full items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-50"
          >
            <svg className="h-5 w-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sair do sistema
          </button>
        </div>
      </aside>
    </>
  );
}