import { Asset, OrderBookData, OrderFormData, SubmittedOrder } from '../types';

const API_BASE = '/orderbook';
const TRADE_API = '/trade';

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

