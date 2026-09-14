import '@/styles/globals.css';

export const metadata = {
  title: 'Integra Saúde | Gestão Hospitalar',
  description: 'Plataforma moderna para gestão hospitalar e atendimento clínico',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-teal-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}