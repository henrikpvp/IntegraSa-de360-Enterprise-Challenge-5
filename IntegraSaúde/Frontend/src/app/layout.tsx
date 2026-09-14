import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/context/AuthContext';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Integra Saúde | Gestão Clínica e Operação Hospitalar',
  description: 'Sistema moderno para gestão clínica, fila de atendimento e operação hospitalar.',
  keywords: ['Saúde', 'Gestão Hospitalar', 'Operação Clínica', 'Atendimento Médico'],
  authors: [{ name: 'Integra Saúde' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable}`}>
      <body className="min-h-screen bg-transparent text-slate-900 antialiased selection:bg-emerald-500 selection:text-white">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}