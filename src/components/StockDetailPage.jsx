import React from 'react';
import StockCard from './StockCard.jsx';

const StockDetailPage = ({ stock, onBack, onAdd, onRemove }) => {
  if (!stock) {
    return (
      <div className="flex flex-col h-full p-4">
        <button
          onClick={onBack}
          className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none mb-4"
        >
          &larr; Back to Search
        </button>
        <p className="text-center text-gray-500">Stock not found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
        >
          &larr; Back to Search
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Stock Details</h2>
        <StockCard stock={stock} onRemove={onRemove} />
        <button
          onClick={() => onAdd(stock.ticker)}
          className="w-full mt-4 px-6 py-3 text-lg font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Add to Watchlist
        </button>
      </div>
    </div>
  );
};

export default StockDetailPage;