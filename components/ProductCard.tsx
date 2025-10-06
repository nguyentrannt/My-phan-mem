
import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const mainImage = product.image || 'https://picsum.photos/400/400';

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col">
      <div className="relative">
        <a href={product.url} target="_blank" rel="noopener noreferrer">
          <img 
            src={mainImage} 
            alt={product.name} 
            className="w-full h-64 object-cover object-center"
          />
        </a>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 truncate" title={product.name}>
          {product.name}
        </h3>
        
        <p className="text-xl font-bold text-indigo-600 my-2">
          {product.price}
        </p>

        <div className="flex-grow"></div> {}

        <div className="mt-4">
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
          >
            Xem sản phẩm
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
