import { useState, useEffect } from 'react';

type CalculationField = 'quantity' | 'price' | 'notional';

export const useAutoCalculation = () => {
  const [quantity, setQuantityState] = useState<string>('');
  const [price, setPriceState] = useState<string>('');
  const [notional, setNotionalState] = useState<string>('');
  const [lastEdited, setLastEdited] = useState<CalculationField>('quantity');

  useEffect(() => {
    const q = parseFloat(quantity) || 0;
    const p = parseFloat(price) || 0;
    const n = parseFloat(notional) || 0;

    if (lastEdited === 'quantity' || lastEdited === 'price') {
      if (q > 0 && p > 0) {
        setNotionalState((q * p).toFixed(2));
      }
    } else if (lastEdited === 'notional') {
      if (n > 0 && p > 0) {
        setQuantityState((n / p).toFixed(8));
      }
    }
  }, [quantity, price, notional, lastEdited]);

  const setQuantity = (val: string) => {
    setQuantityState(val);
    setLastEdited('quantity');
  };

  const setPrice = (val: string) => {
    setPriceState(val);
    setLastEdited('price');
  };

  const setNotional = (val: string) => {
    setNotionalState(val);
    setLastEdited('notional');
  };

  const reset = () => {
    setQuantityState('');
    setPriceState('');
    setNotionalState('');
  };

  return {
    quantity,
    price,
    notional,
    setQuantity,
    setPrice,
    setNotional,
    reset,
  };
};

