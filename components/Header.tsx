
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center space-x-4">
          <i className="fas fa-store text-3xl text-indigo-600"></i>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            Danh sách sản phẩm
          </h1>
        </div>
        <p className="text-gray-500 mt-1">Xem thông tin sản phẩm và tình trạng tồn kho.</p>
      </div>
    </header>
  );
};

export default Header;
