
import React from 'react';
import Card from './Card';
import Button from './Button';
import { View } from '../types';

interface ProductGalleryProps {
  setView: (view: View) => void;
}

const mockProducts = [
  { id: '1', name: 'Classic White Tee', imageUrl: 'https://picsum.photos/seed/product1/400/400' },
  { id: '2', name: 'Denim Jeans', imageUrl: 'https://picsum.photos/seed/product2/400/400' },
  { id: '3', name: 'Leather Jacket', imageUrl: 'https://picsum.photos/seed/product3/400/400' },
  { id: '4', name: 'Gold Necklace', imageUrl: 'https://picsum.photos/seed/product4/400/400' },
  { id: '5', name: 'Running Sneakers', imageUrl: 'https://picsum.photos/seed/product5/400/400' },
];

const ProductGallery: React.FC<ProductGalleryProps> = ({ setView }) => {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Your Products</h2>
        <Button onClick={() => setView(View.NEW_PROJECT)}>Add New Product</Button>
      </div>
      {mockProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockProducts.map((product) => (
            <Card key={product.id} className="p-0 overflow-hidden">
              <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-white">{product.name}</h3>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-16">
          <h3 className="text-xl font-semibold mb-2">No products yet</h3>
          <p className="text-dark-text-secondary mb-4">Upload your first product to get started.</p>
          <Button onClick={() => setView(View.NEW_PROJECT)}>Upload Product</Button>
        </Card>
      )}
    </div>
  );
};

export default ProductGallery;
