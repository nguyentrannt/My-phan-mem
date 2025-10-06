
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white mt-12">
      <div className="container mx-auto px-4 py-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Product Inventory Viewer. All rights reserved.</p>
        <p className="text-sm mt-1">
          Crafted with <i className="fas fa-heart text-red-500"></i> using React & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
