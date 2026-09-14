import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased flex flex-col">
      {/* SIDEBAR FIXA */}
      <Sidebar />

      {/* ÁREA DE CONTEÚDO */}
      <div className="flex flex-col flex-1 lg:pl-72 transition-all duration-200">
        <Header />

        <main className="flex-1 px-4 py-6 sm:px-6 md:px-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}