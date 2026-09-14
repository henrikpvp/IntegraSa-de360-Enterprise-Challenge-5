import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-teal-600">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">IntegraSaúde 360</h1>
          <p className="mt-1 text-sm text-slate-500">Acesse o sistema de gestão de atendimento</p>
        </div>

        <div className="space-y-4 text-center">
          <p className="text-sm text-slate-600">
            A rota principal de login foi movida para a área de autenticação.
          </p>
          <Link
            href="/auth/login"
            className="inline-flex w-full items-center justify-center rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-500"
          >
            Ir para a página de login
          </Link>
        </div>
      </div>
    </main>
  );
}