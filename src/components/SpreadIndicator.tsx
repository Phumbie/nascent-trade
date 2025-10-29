import React from 'react';

interface SpreadIndicatorProps {
  spread: number;
  spreadPercent: number;
}

export const SpreadIndicator: React.FC<SpreadIndicatorProps> = ({
  spread,
  spreadPercent,
}) => {
  return (
    <div className="flex items-center justify-center gap-3 py-3 bg-surface-hover border-y border-border">
      <span className="text-xs text-text-muted uppercase tracking-wide">
        Spread
      </span>
      <span className="text-sm font-semibold text-text-primary font-mono">
        ${spread.toFixed(2)}
      </span>
      <span className="text-xs text-text-secondary font-mono">
        ({spreadPercent.toFixed(3)}%)
      </span>
    </div>
  );
};

