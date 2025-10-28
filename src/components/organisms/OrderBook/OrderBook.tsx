import React from 'react';
import { OrderBookLevel, OrderSide } from '../../../types';
import { OrderBookRow } from '../../molecules/OrderBookRow';
import { SpreadIndicator } from '../../molecules/SpreadIndicator';
import { Card } from '../../molecules/Card';

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

        {/* Scrollable orderbook content */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {/* Asks (reversed so best ask is closest to spread) */}
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

          {/* Spread */}
          <div className="py-2">
            <SpreadIndicator spread={spread} spreadPercent={spreadPercent} />
          </div>

          {/* Bids */}
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

