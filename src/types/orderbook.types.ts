export interface OrderBookLevel {
  price: number;
  quantity: number;
}

export interface OrderBookData {
  lastUpdateId: number;
  bids: [string, string][];
  asks: [string, string][];
}

export interface ProcessedOrderBook {
  bids: OrderBookLevel[];
  asks: OrderBookLevel[];
  spread: number;
  spreadPercent: number;
}

