'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authService } from '@/services/authService';
import Button from '@/components/ui/Button';
import FadeIn from '@/components/animations/FadeIn';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.login(email, senha);
      router.push('/dashboard/atendimento');
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          'Falha ao autenticar. Verifique suas credenciais.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 dark:bg-slate-950 px-4 py-10 transition-colors">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-800 bg-white dark:bg-slate-900 shadow-2xl backdrop-blur-md lg:grid-cols-[1.05fr_0.95fr] transition-colors">
        
        {/* HERO / ESQUERDA */}
        <div className="relative overflow-hidden bg-slate-900 p-8 text-white sm:p-10 lg:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.15),transparent_40%)]" />
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 font-black text-white shadow-md shadow-emerald-500/20">
                  IS
                </div>
                <div>
                  <p className="text-xl font-bold tracking-tight text-white">Integra Saúde 360</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-400">Gestão Hospitalar</p>
                </div>
              </div>

              <div className="space-y-4">
                <span className="inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-300">
                  Acesso Restrito
                </span>
                <h1 className="max-w-md text-3xl font-extrabold tracking-tight text-slate-100 sm:text-4xl leading-tight">
                  Mais agilidade na operação, mais segurança para o cuidado.
                </h1>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              {[
                'Acompanhamento em tempo real da operação hospitalar',
                'Priorização inteligente por risco e tempo de espera',
                'Decisões clínicas com suporte preditivo seguro',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-800/40 p-3.5 backdrop-blur-sm">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-xs font-medium text-slate-300 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FORMULÁRIO / DIREITA */}
        <FadeIn className="flex items-center justify-center p-6 sm:p-8 lg:p-10 bg-white dark:bg-slate-900 transition-colors">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center lg:text-left">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Autenticação</p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Entrar no sistema</h2>
              <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">Acesse o painel operacional da sua unidade.</p>
            </div>

            {error && (
              <div className="mb-6 rounded-xl border border-rose-200 dark:border-rose-800/60 bg-rose-50 dark:bg-rose-950/50 p-3.5 text-xs font-medium text-rose-700 dark:text-rose-300 flex items-start gap-2.5">
                <svg className="w-4 h-4 text-rose-500 dark:text-rose-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  E-mail institucional
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nome@hospital.com"
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 outline-none transition placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  Senha
                </label>
                <input
                  type="password"
                  required
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 outline-none transition placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="flex items-center justify-between gap-3 pt-1 text-xs text-slate-500 dark:text-slate-400">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 dark:border-slate-700 text-emerald-600 focus:ring-emerald-500 cursor-pointer bg-slate-100 dark:bg-slate-800" />
                  <span>Lembrar acesso</span>
                </label>
                <Link href="/auth/cadastro" className="font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:underline transition-colors">
                  Solicitar cadastro
                </Link>
              </div>

              <Button type="submit" isLoading={loading} className="w-full mt-2 py-3 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold rounded-xl shadow-md shadow-emerald-600/20 transition-all active:scale-[0.99]">
                Entrar no sistema
              </Button>
            </form>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}