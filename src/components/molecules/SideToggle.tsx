import React from 'react';
import { OrderSide } from '../../types';

interface SideToggleProps {
  value: OrderSide;
  onChange: (side: OrderSide) => void;
}

export const SideToggle: React.FC<SideToggleProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={() => onChange(OrderSide.BUY)}
        className={`
          px-4 py-3 rounded-lg font-semibold transition-all
          ${value === OrderSide.BUY
            ? 'bg-buy text-white shadow-lg'
            : 'bg-surface-hover text-text-secondary hover:text-buy border border-border'
          }
        `}
      >
        Buy
      </button>
      <button
        type="button"
        onClick={() => onChange(OrderSide.SELL)}
        className={`
          px-4 py-3 rounded-lg font-semibold transition-all
          ${value === OrderSide.SELL
            ? 'bg-sell text-white shadow-lg'
            : 'bg-surface-hover text-text-secondary hover:text-sell border border-border'
          }
        `}
      >
        Sell
      </button>
    </div>
  );
};

