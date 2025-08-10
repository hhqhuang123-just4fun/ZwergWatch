import React from 'react';

const Header = () => {
  return (
    <div className="p-4 border-b border-gray-200">
      <input
        type="text"
        placeholder="Search for a stock..."
        className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default Header;