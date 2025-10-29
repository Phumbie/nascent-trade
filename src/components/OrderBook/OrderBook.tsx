import React from 'react';
import { OrderBookLevel, OrderSide } from '../../types';
import { OrderBookRow } from '../OrderBookRow';
import { SpreadIndicator } from '../SpreadIndicator';
import { Card } from '../Card';

interface OrderBookProps {
  bids: OrderBookLevel[];
  asks: OrderBookLevel[];
  spread: number;
  spreadPercent: number;
  onPriceClick: (price: number, side: OrderSide) => void;
  asset: string;
}

export const OrderBook: React.FC<OrderBookProps> = ({
  bids,
  asks,
  spread,
  spreadPercent,
  onPriceClick,
  asset
}) => {
  return (
    <Card title={`${asset} Order Book`} className="h-[calc(100dvh-120px)] flex flex-col">
      <div className="flex flex-col h-full min-h-0">
        {/* Header - fixed at top */}
        <div className="grid grid-cols-2 gap-4 px-4 py-2 text-xs font-semibold text-text-muted uppercase border-b border-border shrink-0">
          <span>Price (USD)</span>
          <span className="text-right">Quantity ({asset})</span>
        </div>

        {/* Asks Section - Top scrollable area (Sell Orders) */}
        <div className="flex-1 overflow-y-auto min-h-0 scrollbar-thin">
          <div className="space-y-0.5 py-2">
            {[...asks].reverse().map((ask, idx) => (
              <OrderBookRow
                key={`ask-${idx}`}
                price={ask.price}
                quantity={ask.quantity}
                side={OrderSide.SELL}
                onClick={() => onPriceClick(ask.price, OrderSide.SELL)}
              />
            ))}
          </div>
        </div>

        {/* Spread - Fixed in middle */}
        <div className="shrink-0 py-2 bg-surface border-y border-border">
          <SpreadIndicator spread={spread} spreadPercent={spreadPercent} />
        </div>

        {/* Bids Section - Bottom scrollable area (Buy Orders) */}
        <div className="flex-1 overflow-y-auto min-h-0 scrollbar-thin">
          <div className="space-y-0.5 py-2">
            {bids.map((bid, idx) => (
              <OrderBookRow
                key={`bid-${idx}`}
                price={bid.price}
                quantity={bid.quantity}
                side={OrderSide.BUY}
                onClick={() => onPriceClick(bid.price, OrderSide.BUY)}
              />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

