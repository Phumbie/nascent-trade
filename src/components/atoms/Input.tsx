import React from 'react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  fullWidth = false,
  leftAddon,
  rightAddon,
  className = '',
  ...props
}) => {
  return (
    <div className={`${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-1.5">
          {label}
        </label>
      )}
      <div className={`
        flex items-center gap-2 
        bg-surface border rounded-lg
        transition-colors
        ${error ? 'border-sell' : 'border-border hover:border-primary/50 focus-within:border-primary'}
      `}>
        {leftAddon && (
          <div className="pl-3 text-text-muted text-sm">
            {leftAddon}
          </div>
        )}
        <input
          className={`
            flex-1 bg-transparent px-3 py-2.5 
            text-text-primary placeholder-text-muted
            outline-none
            ${className}
          `}
          {...props}
        />
        {rightAddon && (
          <div className="pr-3 text-text-muted text-sm font-medium">
            {rightAddon}
          </div>
        )}
      </div>
      {error && (
        <span className="block mt-1 text-xs text-sell">{error}</span>
      )}
      {helperText && !error && (
        <span className="block mt-1 text-xs text-text-muted">{helperText}</span>
      )}
    </div>
  );
};

