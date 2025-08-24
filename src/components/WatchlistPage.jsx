import React from 'react';
import StockCard from './StockCard.jsx';

const WatchlistPage = ({ watchlist, liveStockData, allSymbols, onRefresh, isLoading, onRemove, onBack }) => {
  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
        >
          &larr; Back to Home
        </button>
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className={`w-10 h-10 flex items-center justify-center p-2 rounded-full ${isLoading ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent border-solid rounded-full animate-spin"></div>
          ) : (
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 10v-5h-.582m-15.356-2A8.001 8.001 0 0119.418 15m0 0H15"></path>
            </svg>
          )}
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {isLoading && watchlist.length > 0 && (
          <p className="p-4 text-center text-gray-500">Loading data...</p>
        )}
        {!isLoading && watchlist.length > 0 ? (
          watchlist.map((stock) => {
            const liveData = liveStockData[stock.ticker];
            if (!liveData) {
              return <p key={stock.ticker} className="p-4 text-center text-gray-500">No data found for {stock.ticker}</p>;
            }
            const symbolInfo = allSymbols.find(s => s.symbol === stock.ticker);
            const transformedData = {
              ticker: liveData.symbol,
              name: symbolInfo ? `${symbolInfo.baseAsset}/${symbolInfo.quoteAsset}` : liveData.symbol,
              price: liveData.lastPrice,
              change: liveData.priceChange,
              changePercent: liveData.priceChangePercent,
              high: liveData.highPrice,
              low: liveData.lowPrice,
            };
            return <StockCard key={stock.ticker} stock={transformedData} onRemove={onRemove} />;
          })
        ) : (
          !isLoading && <p className="p-4 text-center text-gray-500">Your list is empty. Add a stock to get started.</p>
        )}
      </div>
    </div>
  );
};

export default WatchlistPage;