import { useState, useEffect, useCallback } from 'react';
import { getOrderbook } from '../services';
import { Asset, OrderBookData, ProcessedOrderBook, OrderBookLevel } from '../types';

export const useOrderBook = (asset: Asset) => {
  const [orderBook, setOrderBook] = useState<ProcessedOrderBook | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrderBook = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getOrderbook(asset);
      const processed = processOrderBook(data);
      setOrderBook(processed);
    } catch (err) {
      setError('Failed to fetch order book');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [asset]);

  useEffect(() => {
    fetchOrderBook();
    // Poll every 5 seconds
    const interval = setInterval(fetchOrderBook, 5000);
    return () => clearInterval(interval);
  }, [fetchOrderBook]);

  return { orderBook, loading, error, refresh: fetchOrderBook };
};

// Process raw API data into display format
const processOrderBook = (data: OrderBookData): ProcessedOrderBook => {
  const bids: OrderBookLevel[] = data.bids.slice(0, 20).map(([price, qty]) => ({
    price: parseFloat(price),
    quantity: parseFloat(qty),
  }));

  const asks: OrderBookLevel[] = data.asks.slice(0, 20).map(([price, qty]) => ({
    price: parseFloat(price),
    quantity: parseFloat(qty),
  }));

  const spread = asks[0]?.price - bids[0]?.price;
  const spreadPercent = (spread / bids[0]?.price) * 100;

  return { bids, asks, spread, spreadPercent };
};

