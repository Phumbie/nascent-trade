import React, { useState, useEffect } from 'react';
import { Asset, OrderSide, OrderType } from '../../types';
import { Card } from '../Card';
import { OrderTypeToggle } from '../OrderTypeToggle';
import { SideToggle } from '../SideToggle';
import { Button, Input } from '../../ui';
import { useAutoCalculation } from '../../hooks/useAutoCalculation';

interface OrderEntryProps {
  selectedAsset: Asset;
  prefillPrice?: number;
  prefillSide?: OrderSide;
  onSubmit: (order: any) => Promise<void>;
  submitting: boolean;
}

export const OrderEntry: React.FC<OrderEntryProps> = ({
  selectedAsset,
  prefillPrice,
  prefillSide,
  onSubmit,
  submitting
}) => {
  const [orderType, setOrderType] = useState<OrderType>(OrderType.LIMIT);
  const [side, setSide] = useState<OrderSide>(OrderSide.BUY);
  const { quantity, price, notional, setQuantity, setPrice, setNotional, reset } = useAutoCalculation();
  
  // Field-specific error states
  const [errors, setErrors] = useState({
    price: '',
    quantity: '',
    notional: ''
  });

  // Handle prefills from orderbook clicks
  useEffect(() => {
    if (prefillPrice !== undefined) {
      setPrice(prefillPrice.toString());
      // Automatically switch to LIMIT order when clicking a price (only if currently on MARKET)
      setOrderType(OrderType.LIMIT);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefillPrice]);

  useEffect(() => {
    if (prefillSide) {
      setSide(prefillSide);
    }
  }, [prefillSide]);

  // Validation functions
  const validatePrice = (value: string): string => {
    if (orderType === OrderType.MARKET) return '';
    
    const num = parseFloat(value);
    if (!value) return 'Price is required';
    if (isNaN(num)) return 'Price must be a valid number';
    if (num <= 0) return 'Price must be greater than 0';
    return '';
  };

  const validateQuantity = (value: string): string => {
    const num = parseFloat(value);
    if (!value) return 'Quantity is required';
    if (isNaN(num)) return 'Quantity must be a valid number';
    if (num <= 0) return 'Quantity must be greater than 0';
    return '';
  };

  const validateNotional = (value: string): string => {
    const num = parseFloat(value);
    if (!value) return 'Notional is required';
    if (isNaN(num)) return 'Notional must be a valid number';
    if (num <= 0) return 'Notional must be greater than 0';
    return '';
  };

  // Handle onBlur validation
  const handlePriceBlur = () => {
    setErrors(prev => ({ ...prev, price: validatePrice(price) }));
  };

  const handleQuantityBlur = () => {
    setErrors(prev => ({ ...prev, quantity: validateQuantity(quantity) }));
  };

  const handleNotionalBlur = () => {
    setErrors(prev => ({ ...prev, notional: validateNotional(notional) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields on submit
    const priceError = validatePrice(price);
    const quantityError = validateQuantity(quantity);
    const notionalError = validateNotional(notional);

    setErrors({
      price: priceError,
      quantity: quantityError,
      notional: notionalError
    });

    if (priceError || quantityError || notionalError) {
      return;
    }

    const orderData = {
      asset: selectedAsset,
      side,
      type: orderType,
      quantity: parseFloat(quantity),
      ...(orderType === OrderType.LIMIT && { price: parseFloat(price) }),
      notional: parseFloat(notional)
    };

    await onSubmit(orderData);
    reset();
    setErrors({ price: '', quantity: '', notional: '' });
  };

  const isValid = () => {
    const q = parseFloat(quantity);
    const n = parseFloat(notional);
    
    if (q <= 0 || n <= 0 || isNaN(q) || isNaN(n)) return false;
    if (orderType === OrderType.LIMIT) {
      const p = parseFloat(price);
      if (p <= 0 || isNaN(p)) return false;
    }
    return true;
  };

  return (
    <Card title="Place Order">
      <form onSubmit={handleSubmit} className="space-y-4">
        <OrderTypeToggle value={orderType} onChange={setOrderType} />

        <SideToggle value={side} onChange={setSide} />

        <div className="space-y-3">
          {orderType === OrderType.LIMIT && (
            <Input
              label="Price"
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              onBlur={handlePriceBlur}
              error={errors.price}
              rightAddon="USD"
              fullWidth
              placeholder="0.00"
              required
            />
          )}

          <Input
            label="Quantity"
            type="number"
            step="0.00000001"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            onBlur={handleQuantityBlur}
            error={errors.quantity}
            rightAddon={selectedAsset}
            fullWidth
            placeholder="0.00000000"
            required
          />

          <Input
            label="Notional"
            type="number"
            step="0.01"
            value={notional}
            onChange={(e) => setNotional(e.target.value)}
            onBlur={handleNotionalBlur}
            error={errors.notional}
            rightAddon="USD"
            fullWidth
            placeholder="0.00"
            required
          />
        </div>

        <Button
          type="submit"
          variant={side === OrderSide.BUY ? 'success' : 'danger'}
          size="lg"
          fullWidth
          disabled={!isValid()}
          loading={submitting}
        >
          {side === OrderSide.BUY ? 'Buy' : 'Sell'} {selectedAsset}
        </Button>

        {orderType === OrderType.MARKET && (
          <p className="text-xs text-text-muted text-center">
             Market orders execute at best available price
          </p>
        )}
      </form>
    </Card>
  );
};

