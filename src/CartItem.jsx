import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    const total = cart.reduce((sum, item) => {
      const itemCost = parseFloat(item.cost) || 0; // Ensure cost is a valid number
      const itemQuantity = parseInt(item.quantity, 10) || 0; // Ensure quantity is a valid number
      const itemTotal = itemCost * itemQuantity;
      console.log(`Item: ${item.name}, Cost: ${itemCost}, Quantity: ${itemQuantity}, Subtotal: ${itemTotal}`); // Debugging line
      return sum + itemTotal;
    }, 0);
    console.log("Total Amount:", total); // Debugging line
    return total.toFixed(2); // Format to 2 decimal places for display
  };

  // Calculate total cost based on quantity for an individual item
  const calculateTotalCost = (item) => {
    const itemCost = parseFloat(item.cost) || 0;  // Ensure cost is a valid number
    const itemQuantity = parseInt(item.quantity, 10) || 0;  // Ensure quantity is a valid number
    const itemTotalCost = itemCost * itemQuantity;
    console.log(`Subtotal for item ${item.name}: ${itemTotalCost}`); // Debugging line
    return itemTotalCost.toFixed(2);
  };

  const handleContinueShopping = () => {
    onContinueShopping && onContinueShopping();
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

  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">Price: ${item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Subtotal: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'>
        Total Amount: ${calculateTotalAmount()}
      </div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
