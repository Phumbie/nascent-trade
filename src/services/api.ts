import { Asset, OrderBookData, OrderFormData, SubmittedOrder } from '../types';

// Use environment variable for API base URL, default to empty for local dev (uses proxy)
// @ts-ignore - process.env is available at runtime in React apps
const API_BASE_URL = process.env.REACT_APP_API_URL || '';

const API_BASE = `${API_BASE_URL}/orderbook`;
const TRADE_API = `${API_BASE_URL}/trade`;

export const getOrderbook = async (asset: Asset): Promise<OrderBookData> => {
  const response = await fetch(`${API_BASE}/${asset}`);
  if (!response.ok) {
    throw new Error('Failed to fetch orderbook');
  }
  return response.json();
};

export const sendTrade = async (order: OrderFormData): Promise<SubmittedOrder> => {
  const response = await fetch(TRADE_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to submit order');
  }

  return response.json();
};

