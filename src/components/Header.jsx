import React, { useState, useEffect } from 'react';

const Header = ({ addStock, allSymbols, onRefresh, isLoading }) => {
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
    addStock(symbol);
    setInput('');
    setFilteredSymbols([]);
  };

  return (
    <div className="p-4 border-b border-gray-200 flex items-center space-x-2">
      <div className="relative flex-1">
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
  );
};

export default Header;