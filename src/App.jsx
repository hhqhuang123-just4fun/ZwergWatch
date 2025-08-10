import React, { useState } from 'react';
import Header from './components/Header.jsx';
import Tabs from './components/Tabs.jsx';
import StockCard from './components/StockCard.jsx';
import './index.css';

const DUMMY_WATCHLIST = [
  { name: 'Amazon.com Inc', ticker: 'AMZN', price: '222.69', change: 0.44, changePercent: 0.20, high: '223.80', low: '221.88' },
  { name: 'Figma Ord Shs', ticker: 'FIGMA', price: '90.32', change: -3.18, changePercent: -3.40, high: '91.49', low: '76.65' },
];

const DUMMY_WISHLIST = [
  { name: 'Tesla Inc', ticker: 'TSLA', price: '250.10', change: 1.25, changePercent: 0.50, high: '255.00', low: '248.50' },
  { name: 'Apple Inc', ticker: 'AAPL', price: '185.75', change: 0.50, changePercent: 0.27, high: '186.20', low: '184.50' },
];

function App() {
  const [activeTab, setActiveTab] = useState('watchlist');
  const stocksToShow = activeTab === 'watchlist' ? DUMMY_WATCHLIST : DUMMY_WISHLIST;

  return (
    <div className="w-full h-full bg-white flex flex-col">
      <Header />
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 overflow-y-auto">
        {stocksToShow.map((stock) => (
          <StockCard key={stock.ticker} stock={stock} />
        ))}
      </div>
    </div>
  );
}

export default App;
