import React, { ReactNode } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

interface AppRouterProps {
  children: ReactNode;
}

export default function AppRouter({ children }: AppRouterProps) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-emerald-500 selection:text-white flex flex-col transition-colors duration-200">
      {/* SIDEBAR FIXA */}
      <Sidebar />

      {/* ÁREA PRINCIPAL DA APLICAÇÃO */}
      <div className="flex flex-col flex-1 lg:pl-64 transition-all duration-200">
        <Header />

        <main className="flex-1 px-4 py-6 sm:px-6 md:px-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}