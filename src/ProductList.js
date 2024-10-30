// ProductList.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from './CartSlice';

const ProductList = () => {
  const dispatch = useDispatch();

  const products = [
    { name: 'Spider Plant', cost: 12, image: 'path/to/image1' },
    { name: 'Snake Plant', cost: 15, image: 'path/to/image2' },
    // Add more products as needed
  ];

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  return (
    <div>
      {products.map(product => (
        <div key={product.name}>
          <h3>{product.name}</h3>
          <p>Price: ${product.cost}</p>
          <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
