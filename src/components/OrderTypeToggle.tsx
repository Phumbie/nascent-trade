import React from 'react';
import { OrderType } from '../../types';

interface OrderTypeToggleProps {
  value: OrderType;
  onChange: (type: OrderType) => void;
}

export const OrderTypeToggle: React.FC<OrderTypeToggleProps> = ({
  value,
  onChange,
}) => {
  const types = Object.values(OrderType);

  return (
    <div className="grid grid-cols-2 gap-2">
      {types.map((type) => (
        <button
          key={type}
          type="button"
          onClick={() => onChange(type)}
          className={`
            px-4 py-2 rounded-lg font-medium transition-all text-sm
            ${value === type
              ? 'bg-primary text-white'
              : 'bg-surface-hover text-text-secondary hover:text-text-primary border border-border'
            }
          `}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

