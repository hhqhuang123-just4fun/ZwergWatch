import React from 'react';
import zwergLogo from '../assets/zwerg.png'; // Make sure this path is correct

const HomePage = ({ onSwitchMode }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 space-y-8">
      <img src={zwergLogo} alt="ZwergWatch Logo" className="w-32 h-32 mb-8" />
      <div className="flex space-x-4">
        <button
          onClick={() => onSwitchMode('search')}
          className="px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search for a Stock
        </button>
        <button
          onClick={() => onSwitchMode('watchlist')}
          className="px-6 py-3 text-lg font-semibold text-blue-500 bg-white border border-blue-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Watchlist
        </button>
      </div>
    </div>
  );
};

export default HomePage;