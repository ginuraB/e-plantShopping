// CartItem.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeItem } from './CartSlice';

const CartItem = () => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cart.reduce((sum, item) => sum + item.cost * item.quantity, 0).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      handleRemove(item);
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div>
      {cart.map(item => (
        <div key={item.name}>
          <h3>{item.name}</h3>
          <p>Price: ${item.cost}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => handleDecrement(item)}>-</button>
          <button onClick={() => handleIncrement(item)}>+</button>
          <button onClick={() => handleRemove(item)}>Remove</button>
          <p>Subtotal: ${(item.cost * item.quantity).toFixed(2)}</p>
        </div>
      ))}
      <h2>Total: ${calculateTotalAmount()}</h2>
    </div>
  );
};

export default CartItem;
