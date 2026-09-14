'use client';

import React from 'react';
import SidebarLayout from '@/components/layout/SidebarLayout';
import { AtendimentoProvider } from '@/context/AtendimentoContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AtendimentoProvider>
      <SidebarLayout>
        {children}
      </SidebarLayout>
    </AtendimentoProvider>
  );
}