import React from 'react';

const StockCard = ({ stock }) => {
  const isPositive = stock.change > 0;
  const changeColor = isPositive ? 'text-green-600' : 'text-red-600';

  return (
    <div className="p-4 border-b border-gray-100 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{stock.name} ({stock.ticker})</h3>
        <p className={`text-sm ${changeColor}`}>{isPositive ? '+' : ''}{stock.change} ({isPositive ? '+' : ''}{stock.changePercent}%) today</p>
      </div>
      <div className="text-right">
        <p className="text-xl font-bold">{stock.price}</p>
        <p className="text-xs text-gray-500">High: {stock.high} / Low: {stock.low}</p>
      </div>
    </div>
  );
};

export default StockCard;