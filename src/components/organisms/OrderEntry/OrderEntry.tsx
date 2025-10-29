import React, { useState, useEffect } from 'react';
import { Asset, OrderSide, OrderType } from '../../../types';
import { Card } from '../../molecules/Card';
import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import { OrderTypeToggle } from '../../molecules/OrderTypeToggle';
import { SideToggle } from '../../molecules/SideToggle';
import { useAutoCalculation } from '../../../hooks/useAutoCalculation';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
            ⚡ Market orders execute at best available price
          </p>
        )}
      </form>
    </Card>
  );
};

