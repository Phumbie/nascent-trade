import { Asset } from './asset.types';

export enum OrderSide {
  BUY = 'BUY',
  SELL = 'SELL',
}

export enum OrderType {
  LIMIT = 'LIMIT',
  MARKET = 'MARKET',
}

export interface OrderFormData {
  asset: Asset;
  side: OrderSide;
  type: OrderType;
  quantity: number;
  price?: number;
  notional: number;
}

export interface SubmittedOrder extends OrderFormData {
  id: string;
  timestamp: number;
}

