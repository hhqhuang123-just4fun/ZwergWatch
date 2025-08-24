import React, { useState, useEffect, useCallback } from 'react';
import HomePage from './components/HomePage.jsx';
import WatchlistPage from './components/WatchlistPage.jsx';
import SearchPage from './components/SearchPage.jsx';
import StockDetailPage from './components/StockDetailPage.jsx';
import { fetchExchangeInfo, fetchLiveStockData } from './api/binanceApi.js';
import './index.css';

function App() {
  const [watchlist, setWatchlist] = useState([]);
  const [liveStockData, setLiveStockData] = useState({});
  const [allSymbols, setAllSymbols] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState('home'); // new state for page management
  const [selectedStock, setSelectedStock] = useState(null); // state for the single stock page

  // Load user's watchlist from storage
  useEffect(() => {
    chrome.storage.local.get(['watchlist'], (result) => {
      setWatchlist(result.watchlist || []);
    });
  }, []);

  // Save user's watchlist to storage whenever it changes
  useEffect(() => {
    chrome.storage.local.set({ watchlist });
  }, [watchlist]);

  // Fetch the initial list of all tradable symbols once on mount
  useEffect(() => {
    const getExchangeInfo = async () => {
      const symbols = await fetchExchangeInfo();
      setAllSymbols(symbols);
    };
    getExchangeInfo();
  }, []);

  const fetchAndSetData = useCallback(async () => {
    setIsLoading(true);
    const tickers = watchlist;
    const data = await fetchLiveStockData(tickers);
    setLiveStockData(data);
    setIsLoading(false);
  }, [watchlist]);

  // Fetch live data for the user's lists and set up a refresh interval
  useEffect(() => {
    fetchAndSetData();
    const interval = setInterval(fetchAndSetData, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [fetchAndSetData]);

  const addStock = (symbol) => {
    // Only add a stock if it's not already in the list
    if (!watchlist.find(s => s.ticker === symbol)) {
      setWatchlist(prev => [...prev, { ticker: symbol }]);
    }
  };

  const removeStock = (tickerToRemove) => {
    setWatchlist(prev => prev.filter(stock => stock.ticker !== tickerToRemove));
  };
  
  const handleGoToStockDetail = (symbol) => {
    const liveData = liveStockData[symbol];
    const symbolInfo = allSymbols.find(s => s.symbol === symbol);
    if (liveData && symbolInfo) {
      const transformedData = {
        ticker: liveData.symbol,
        name: `${symbolInfo.baseAsset}/${symbolInfo.quoteAsset}`,
        price: liveData.lastPrice,
        change: liveData.priceChange,
        changePercent: liveData.priceChangePercent,
        high: liveData.highPrice,
        low: liveData.lowPrice,
      };
      setSelectedStock(transformedData);
      setCurrentPage('stock-detail');
    }
  };

  // Render the correct page based on the current state
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onSwitchMode={setCurrentPage} />;
      case 'watchlist':
        return <WatchlistPage 
          watchlist={watchlist} 
          liveStockData={liveStockData} 
          allSymbols={allSymbols}
          onRefresh={fetchAndSetData}
          isLoading={isLoading}
          onRemove={removeStock}
          onBack={() => setCurrentPage('home')}
        />;
      case 'search':
        return <SearchPage 
          onBack={() => setCurrentPage('home')}
          allSymbols={allSymbols}
          onGoToStockDetail={handleGoToStockDetail}
        />;
      case 'stock-detail':
        return <StockDetailPage 
          stock={selectedStock}
          onBack={() => setCurrentPage('search')}
          onAdd={addStock}
          onRemove={removeStock}
        />;
      default:
        return <HomePage onSwitchMode={setCurrentPage} />;
    }
  };

  return (
    <div className="w-full h-full bg-white flex flex-col">
      {renderPage()}
    </div>
  );
}

export default App;