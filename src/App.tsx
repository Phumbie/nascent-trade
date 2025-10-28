import React, { useState } from 'react';
import { OrderBook, OrderEntry, AssetSelector, TradesList } from './components';
import { useAssetSelection, useOrderBook, useOrderEntry, useTrades } from './hooks';
import { OrderSide } from './types';

function App() {
  const { selectedAsset, setSelectedAsset } = useAssetSelection();
  const { orderBook, loading } = useOrderBook(selectedAsset);
  const { submitOrder, submitting, error, success } = useOrderEntry();
  const { trades, addTrade, clearTrades } = useTrades();

  const [prefillPrice, setPrefillPrice] = useState<number | undefined>();
  const [prefillSide, setPrefillSide] = useState<OrderSide | undefined>();

  const handlePriceClick = (price: number, side: OrderSide) => {
    setPrefillPrice(price);
    setPrefillSide(side);
  };

  const handleOrderSubmit = async (order: any) => {
    try {
      const result = await submitOrder(order);
      addTrade(result);
      setPrefillPrice(undefined);
      setPrefillSide(undefined);
    } catch (err) {
      // Error handled in hook
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-surface">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-text-primary">
              Crypto Trading Platform
            </h1>
            <AssetSelector value={selectedAsset} onChange={setSelectedAsset} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {loading && !orderBook ? (
          <div className="text-center py-12 text-text-secondary">
            Loading order book...
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Order Book - 2 columns on large screens */}
              <div className="lg:col-span-2">
                {orderBook && (
                  <OrderBook
                    bids={orderBook.bids}
                    asks={orderBook.asks}
                    spread={orderBook.spread}
                    spreadPercent={orderBook.spreadPercent}
                    onPriceClick={handlePriceClick}
                    asset={selectedAsset}
                  />
                )}
              </div>

              {/* Order Entry - 1 column */}
              <div>
                <OrderEntry
                  selectedAsset={selectedAsset}
                  prefillPrice={prefillPrice}
                  prefillSide={prefillSide}
                  onSubmit={handleOrderSubmit}
                  submitting={submitting}
                />
              </div>
            </div>

            {/* Trades List (Bonus Feature) */}
            {trades.length > 0 && (
              <div className="mt-6">
                <TradesList trades={trades} onClear={clearTrades} />
              </div>
            )}
          </>
        )}
      </main>

      {/* Toast Notifications */}
      {success && (
        <div className="fixed bottom-4 right-4 bg-buy text-white px-6 py-3 rounded-lg shadow-xl animate-pulse">
          <p className="font-semibold">✓ Order Placed Successfully!</p>
          <p className="text-sm opacity-90">ID: {success.id.slice(0, 8)}...</p>
        </div>
      )}
      {error && (
        <div className="fixed bottom-4 right-4 bg-sell text-white px-6 py-3 rounded-lg shadow-xl animate-pulse">
          <p className="font-semibold">✗ Error</p>
          <p className="text-sm opacity-90">{error}</p>
        </div>
      )}
    </div>
  );
}

export default App;
