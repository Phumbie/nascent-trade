import React, { useState, useEffect } from 'react';
import { OrderBook, OrderEntry, AssetSelector, TradesList } from './components';
import { Button } from './ui';
import { useAssetSelection, useOrderBook, useOrderEntry, useTrades } from './hooks';
import { OrderSide } from './types';

function App() {
  const { selectedAsset, setSelectedAsset } = useAssetSelection();
  const { orderBook, loading } = useOrderBook(selectedAsset);
  const { submitOrder, submitting, error, success, clearMessages } = useOrderEntry();
  const { trades, addTrade, clearTrades } = useTrades();

  const [prefillPrice, setPrefillPrice] = useState<number | undefined>();
  const [prefillSide, setPrefillSide] = useState<OrderSide | undefined>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Auto-dismiss toast notifications after 4 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        clearMessages();
      }, 4000); // 4 seconds

      return () => clearTimeout(timer);
    }
  }, [success, error, clearMessages]);

  const handlePriceClick = (price: number, side: OrderSide) => {
    setPrefillPrice(price);
    setPrefillSide(side);
    // Auto-open sidebar on mobile when clicking a price
    setIsSidebarOpen(true);
  };

  const handleOrderSubmit = async (order: any) => {
    try {
      const result = await submitOrder(order);
      addTrade(result);
      setPrefillPrice(undefined);
      setPrefillSide(undefined);
      // Close sidebar after successful order
      setIsSidebarOpen(false);
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
            {/* Mobile Place Order Button */}
            <div className="lg:hidden mb-4">
              <Button
                variant="primary"
                fullWidth
                onClick={() => setIsSidebarOpen(true)}
              >
                Place Order
              </Button>
            </div>

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

              {/* Order Entry - Hidden on mobile, visible on desktop */}
              <div className="hidden lg:block">
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

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-background z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-surface">
            <h2 className="text-lg font-semibold text-text-primary">Place Order</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-text-secondary hover:text-text-primary text-2xl w-8 h-8 flex items-center justify-center"
            >
              ×
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <OrderEntry
              selectedAsset={selectedAsset}
              prefillPrice={prefillPrice}
              prefillSide={prefillSide}
              onSubmit={handleOrderSubmit}
              submitting={submitting}
            />
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      {success && (
        <div className="fixed bottom-4 right-4 bg-buy text-white px-6 py-3 rounded-lg">
          <p className="font-semibold">✓ Order Placed Successfully!</p>
          <p className="text-sm opacity-90">ID: {success.id.slice(0, 8)}...</p>
        </div>
      )}
      {error && (
        <div className="fixed bottom-4 right-4 bg-sell text-white px-6 py-3 rounded-lg">
          <p className="font-semibold">✗ Error</p>
          <p className="text-sm opacity-90">{error}</p>
        </div>
      )}
    </div>
  );
}

export default App;
