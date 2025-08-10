import React from 'react';

const Tabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex justify-center border-b border-gray-200">
      <button
        onClick={() => onTabChange('watchlist')}
        className={`px-4 py-2 text-sm font-medium ${
          activeTab === 'watchlist'
            ? 'text-blue-600 border-b-2 border-blue-600'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        Watchlist
      </button>
      <button
        onClick={() => onTabChange('wishlist')}
        className={`px-4 py-2 text-sm font-medium ${
          activeTab === 'wishlist'
            ? 'text-blue-600 border-b-2 border-blue-600'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        Wishlist
      </button>
    </div>
  );
};

export default Tabs;