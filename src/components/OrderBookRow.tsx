import React from 'react';
import { OrderSide } from '../types';

interface OrderBookRowProps {
  price: number;
  quantity: number;
  side: OrderSide;
  onClick: () => void;
}

export const OrderBookRow: React.FC<OrderBookRowProps> = ({
  price,
  quantity,
  side,
  onClick,
}) => {
  const isBuy = side === OrderSide.BUY;
  
  return (
    <div
      onClick={onClick}
      className="grid grid-cols-2 gap-4 px-4 py-2 cursor-pointer hover:bg-surface-hover transition-colors"
    >
      <span className={`font-mono text-sm ${isBuy ? 'text-buy' : 'text-sell'}`}>
        {price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </span>
      <span className="font-mono text-sm text-text-primary text-right">
        {quantity.toFixed(8)}
      </span>
    </div>
  );
};

