import React from 'react';
import { SubmittedOrder, OrderSide } from '../../../types';
import { Card } from '../../molecules/Card';
import { Button } from '../../atoms/Button';

interface TradesListProps {
  trades: SubmittedOrder[];
  onClear?: () => void;
}

export const TradesList: React.FC<TradesListProps> = ({ trades, onClear }) => {
  if (trades.length === 0) return null; // Hide if no trades

  return (
    <Card 
      title="Your Trades" 
      actions={onClear && <Button variant="secondary" size="sm" onClick={onClear}>Clear</Button>}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-text-muted uppercase border-b border-border">
              <th className="px-3 py-2 text-left">Time</th>
              <th className="px-3 py-2 text-left">Asset</th>
              <th className="px-3 py-2 text-left">Side</th>
              <th className="px-3 py-2 text-left">Type</th>
              <th className="px-3 py-2 text-right">Price</th>
              <th className="px-3 py-2 text-right">Quantity</th>
              <th className="px-3 py-2 text-right">Notional</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr 
                key={trade.id} 
                className="border-b border-border/50 hover:bg-surface-hover transition-colors"
              >
                <td className="px-3 py-3 text-sm text-text-secondary font-mono">
                  {new Date(trade.timestamp).toLocaleTimeString()}
                </td>
                <td className="px-3 py-3 text-sm font-semibold text-text-primary">{trade.asset}</td>
                <td className="px-3 py-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${
                    trade.side === OrderSide.BUY 
                      ? 'bg-buy/20 text-buy' 
                      : 'bg-sell/20 text-sell'
                  }`}>
                    {trade.side}
                  </span>
                </td>
                <td className="px-3 py-3 text-sm text-text-secondary">{trade.type}</td>
                <td className="px-3 py-3 text-sm text-right font-mono text-text-primary">
                  {trade.price ? `$${trade.price.toLocaleString()}` : 'Market'}
                </td>
                <td className="px-3 py-3 text-sm text-right font-mono text-text-primary">
                  {trade.quantity.toFixed(8)}
                </td>
                <td className="px-3 py-3 text-sm text-right font-mono text-text-primary">
                  ${trade.notional.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

