import React from 'react';

interface CardProps {
  title?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  actions,
  children,
  className = '',
}) => {
  return (
    <div className={`bg-surface border border-border rounded-xl ${className}`}>
      {(title || actions) && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
          {title && (
            <h3 className="text-lg font-semibold text-text-primary">
              {title}
            </h3>
          )}
          {actions && <div>{actions}</div>}
        </div>
      )}
      <div className="p-4 flex-1 min-h-0">
        {children}
      </div>
    </div>
  );
};

