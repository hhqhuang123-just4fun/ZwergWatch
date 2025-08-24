import React, { useState, useEffect } from 'react';

const SearchPage = ({ onBack, addStock, allSymbols, onGoToStockDetail }) => {
  const [input, setInput] = useState('');
  const [filteredSymbols, setFilteredSymbols] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (input.length > 1) {
      const lowerInput = input.toLowerCase();
      const results = allSymbols
        .filter(symbol => 
          symbol.symbol.toLowerCase().includes(lowerInput) || 
          symbol.baseAsset.toLowerCase().includes(lowerInput) ||
          symbol.quoteAsset.toLowerCase().includes(lowerInput)
        )
        .slice(0, 5);
      setFilteredSymbols(results);
    } else {
      setFilteredSymbols([]);
    }
  }, [input, allSymbols]);

  const handleSelect = (symbol) => {
    onGoToStockDetail(symbol);
  };
  
  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
        >
          &larr; Back to Home
        </button>
      </div>
      <div className="relative flex-1 flex flex-col items-center justify-start">
        <div className="w-full relative">
          <input
            type="text"
            placeholder="Search for a stock..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {isFocused && filteredSymbols.length > 0 && (
            <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
              {filteredSymbols.map(symbol => (
                <li
                  key={symbol.symbol}
                  onMouseDown={() => handleSelect(symbol.symbol)}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                >
                  <span className="font-semibold">{symbol.symbol}</span> - <span className="text-gray-600">{symbol.baseAsset}/{symbol.quoteAsset}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;