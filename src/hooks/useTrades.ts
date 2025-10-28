import { useState, useCallback } from 'react';
import { SubmittedOrder } from '../types';

export const useTrades = () => {
  const [trades, setTrades] = useState<SubmittedOrder[]>([]);

  const addTrade = useCallback((trade: SubmittedOrder) => {
    setTrades(prev => [trade, ...prev]); // Newest first
  }, []);

  const clearTrades = useCallback(() => {
    setTrades([]);
  }, []);

  return { trades, addTrade, clearTrades };
};

