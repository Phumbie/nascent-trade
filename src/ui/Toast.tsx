import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  variant: 'success' | 'error' | 'info';
  detail?: string;
  duration?: number;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ 
  message, 
  variant, 
  detail, 
  duration = 4000, 
  onClose
}) => {
  const bgColor = {
    success: 'bg-buy',
    error: 'bg-sell',
    info: 'bg-primary'
  }[variant];

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`fixed bottom-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg z-50`}>
      <p className="font-semibold">{message}</p>
      {detail && <p className="text-sm opacity-90">{detail}</p>}
    </div>
  );
};

