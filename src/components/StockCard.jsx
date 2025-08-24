import React from 'react';

const StockCard = ({ stock, onRemove }) => {
  const isPositive = stock.change > 0;
  const changeColor = isPositive ? 'text-green-600' : 'text-red-600';
  const priceChange = parseFloat(stock.change).toFixed(2);
  const percentChange = parseFloat(stock.changePercent).toFixed(2);

  const handleDeepLink = () => {
    chrome.tabs.create({ url: `https://www.google.com/search?q=${stock.name}` });
  };

  return (
    <div className="p-4 border-b border-gray-100 flex items-center justify-between hover:bg-gray-50">
      <div onClick={handleDeepLink} className="cursor-pointer flex-1 mr-4">
        <h3 className="text-lg font-semibold text-gray-800">{stock.name} ({stock.ticker})</h3>
        <p className={`text-sm ${changeColor}`}>{isPositive ? '+' : ''}{priceChange} ({isPositive ? '+' : ''}{percentChange}%) today</p>
      </div>
      <div className="text-right flex items-center space-x-4">
        <div className="min-w-[100px]">
          <p className="text-xl font-bold">{parseFloat(stock.price).toFixed(2)}</p>
          <p className="text-xs text-gray-500">H: {parseFloat(stock.high).toFixed(2)} / L: {parseFloat(stock.low).toFixed(2)}</p>
        </div>
        <button
          onClick={() => onRemove(stock.ticker)}
          className="bg-red-500 text-white text-sm px-2 py-1 rounded hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default StockCard;