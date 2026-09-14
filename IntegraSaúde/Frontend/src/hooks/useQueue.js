'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { atendimentoService } from '@/services/atendimentoService';

export function useQueue(options = { autoRefresh: false, interval: 30000 }) {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchQueue = useCallback(async (isSilent = false) => {
    try {
      if (!isSilent) setLoading(true);
      else setRefreshing(true);

      const data = await atendimentoService.getFilaAtendimento();
      setQueue(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error('Erro no uso do hook useQueue:', err);
      setError('Erro ao carregar fila de atendimento.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchQueue();

    if (options.autoRefresh) {
      const timer = setInterval(() => {
        fetchQueue(true); // Atualização em segundo plano sem zerar o estado visual
      }, options.interval);

      return () => clearInterval(timer);
    }
  }, [fetchQueue, options.autoRefresh, options.interval]);

  return {
    queue,
    loading,
    refreshing,
    error,
    refetch: () => fetchQueue(false),
    silentRefetch: () => fetchQueue(true),
  };
}