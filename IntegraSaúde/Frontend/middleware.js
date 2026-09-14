import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('integrasaude_token')?.value;
  const { pathname } = request.nextUrl;

  // Protege a rota principal do dashboard e todas as suas sub-rotas
  const isDashboardRoute =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/atendimento') ||
    pathname.startsWith('/pacientes') ||
    pathname.startsWith('/relatorios') ||
    pathname.startsWith('/triagem');

  // Rotas públicas de autenticação
  const isAuthRoute =
    pathname.startsWith('/login') ||
    pathname.startsWith('/cadastro');

  // 1. Se tentar acessar página privada sem token -> Redireciona para /login
  if (isDashboardRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    // Guarda a página que tentou acessar para redirecionar de volta após o login
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Se já estiver logado e tentar acessar /login ou /cadastro -> Redireciona para o Dashboard
  if (isAuthRoute && token) {
    const dashboardUrl = new URL('/dashboard/atendimento', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/atendimento/:path*',
    '/pacientes/:path*',
    '/relatorios/:path*',
    '/triagem/:path*',
    '/login',
    '/cadastro',
  ],
};