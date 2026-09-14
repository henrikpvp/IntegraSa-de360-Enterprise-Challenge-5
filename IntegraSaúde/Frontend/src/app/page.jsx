'use client';

import Link from 'next/link';
import { useState } from 'react';
import FadeIn from '@/components/animations/FadeIn';

const metrics = [
  {
    label: 'Atendimentos Hoje',
    value: '3.482',
    change: '+24%',
    trend: 'up',
    icon: '📊',
  },
  {
    label: 'Tempo Médio de Espera',
    value: '11 min',
    change: '-4 min',
    trend: 'down',
    icon: '⏱️',
  },
  {
    label: 'Taxa de Satisfação',
    value: '96%',
    change: '+2%',
    trend: 'up',
    icon: '⭐',
  },
];

const features = [
  {
    icon: '🏥',
    title: 'Central de Urgência',
    desc: 'Sinais vitais, risco e histórico em um painel único integrado.',
  },
  {
    icon: '🎯',
    title: 'Prioridade Inteligente',
    desc: 'Algoritmo que reorganiza a fila com base em risco clínico.',
  },
  {
    icon: '⚡',
    title: 'Operação em Tempo Real',
    desc: 'Atualizações contínuas e visibilidade total da equipe.',
  },
];

const testimonials = [
  {
    name: 'Dra. Carla Simões',
    role: 'Coordenadora de Urgência',
    hospital: 'Hospital São Rafael',
    text: 'Integra Saúde reduziu nosso tempo de atendimento em 34% e melhorou a segurança clínica.',
  },
  {
    name: 'Dr. Felipe Rocha',
    role: 'Diretor de Operações',
    hospital: 'Clínica do Centro',
    text: 'Ferramenta indispensável. Total controle sobre fila e fluxo de pacientes em tempo real.',
  },
];

export default function LandingPage() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="relative z-20 border-b border-slate-200/50 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-10">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-xs font-black text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
              IS
            </div>
            <div>
              <p className="text-lg font-black tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">Integra Saúde</p>
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Gestão Clínica</p>
            </div>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/auth/login"
              className="btn-primary"
            >
              Acessar
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left Content */}
          <FadeIn className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-700">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              Plataforma de Saúde
            </div>

            {/* Headline */}
            <div className="space-y-6">
              <h1 className="text-5xl font-black leading-tight tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
                Operação
                <span className="block bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                  Inteligente
                </span>
              </h1>
              <p className="max-w-lg text-lg leading-relaxed text-slate-600 font-medium">
                Plataforma moderna para gestão hospitalar e atendimento clínico com priorização inteligente, triagem automática e visibilidade total da operação em tempo real.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <Link href="/auth/login" className="btn-primary">
                Iniciar Operação
              </Link>
              <Link href="#features" className="btn-outline">
                Saiba Mais
              </Link>
            </div>
          </FadeIn>

          {/* Right - Dashboard Preview */}
          <FadeIn delay={0.2} className="card p-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                    Status
                  </p>
                  <h3 className="text-2xl font-black text-slate-900">Operação Ativa</h3>
                </div>
                <div className="pulse-dot pulse-dot-success" />
              </div>

              {/* Quick Stats */}
              <div className="grid gap-4 grid-cols-2">
                <div className="rounded-lg bg-blue-50 p-4 border border-blue-200">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-2">
                    Fila
                  </p>
                  <p className="text-3xl font-black text-slate-900">128</p>
                  <p className="text-xs font-semibold text-green-600 mt-2">-14% em 2h</p>
                </div>
                <div className="rounded-lg bg-red-50 p-4 border border-red-200">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-2">
                    Crítico
                  </p>
                  <p className="text-3xl font-black text-red-600">23</p>
                  <p className="text-xs font-semibold text-red-600 mt-2">Máxima prioridade</p>
                </div>
              </div>

              {/* Patient List */}
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-600">
                  Fila Priorizada
                </p>
                <div className="space-y-2">
                  {['Ariane Costa', 'João Almeida', 'Lucas Rocha'].map((name, idx) => (
                    <div
                      key={name}
                      className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-3 hover:bg-slate-100 transition-colors"
                    >
                      <div>
                        <p className="text-sm font-bold text-slate-900">{name}</p>
                        <p className="text-xs text-slate-500">Aguardando triagem</p>
                      </div>
                      <span
                        className={`badge ${
                          idx === 2
                            ? 'badge-critical'
                            : idx === 1
                            ? 'badge-warning'
                            : 'badge-info'
                        }`}
                      >
                        {idx === 2 ? 'Crítico' : idx === 1 ? 'Alerta' : 'Normal'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-12 md:px-10">
        <div className="grid gap-6 sm:grid-cols-3">
          {metrics.map((metric, idx) => (
            <FadeIn key={metric.label} delay={idx * 0.1} className="card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                    {metric.label}
                  </p>
                  <p className="text-4xl font-black text-slate-900">{metric.value}</p>
                </div>
                <span className="text-3xl opacity-60">{metric.icon}</span>
              </div>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                {metric.change}
              </p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:px-10"
      >
        <div className="mb-16 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-700 mb-4">
            Recursos
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 max-w-3xl mx-auto">
            Soluções que deixam a operação mais ágil e segura
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, idx) => (
            <FadeIn
              key={feature.title}
              delay={idx * 0.12}
              className="card p-8 group cursor-pointer hover:border-blue-200"
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="text-4xl mb-4 inline-block group-hover:scale-125 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-sm leading-6 text-slate-600 mb-4">{feature.desc}</p>
              <div className="flex items-center gap-2 text-blue-600 font-bold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                <span>Saiba mais</span>
                <span>→</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:px-10">
        <div className="mb-16 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-700 mb-4">
            Histórias de Sucesso
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
            Transformando hospitais
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <FadeIn key={testimonial.name} className="card p-8">
              <p className="mb-6 text-lg font-medium leading-relaxed text-slate-700">
                "{testimonial.text}"
              </p>
              <div className="border-t border-slate-200 pt-6">
                <p className="font-black text-slate-900">{testimonial.name}</p>
                <p className="text-sm font-semibold text-blue-600">{testimonial.role}</p>
                <p className="text-xs text-slate-500">{testimonial.hospital}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 pb-24 md:px-10">
        <FadeIn className="card border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white p-12 text-center">
          <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-4 md:text-5xl">
            Pronto para transformar sua operação?
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Junte-se a hospitais de ponta que já confiam em Integra Saúde para gerenciar atendimento de forma inteligente.
          </p>
          <div className="flex flex-col gap-3 justify-center sm:flex-row">
            <Link href="/auth/login" className="btn-primary">
              Iniciar Agora
            </Link>
            <Link href="#" className="btn-secondary">
              Agendar Demo
            </Link>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}