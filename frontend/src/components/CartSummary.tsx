import { useNavigate } from 'react-router-dom'; // Import for navigation
import { useCart } from '../context/CartContext'; // Import custom hook for cart context

// CartSummary component to display cart total and navigate to cart page
const CartSummary = () => {
  const navigate = useNavigate(); // Hook for programmatic navigation
  const { cart } = useCart(); // Get cart data from context

  // Calculate total amount of items in cart
  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div
      style={{
        position: 'fixed', // Fixed position on screen
        top: '10px',
        right: '20px',
        background: '#f8f9fa',
        padding: '10px  15px',
        borderRadius: '8px',
        cursor: 'pointer', // Change cursor on hover
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2', // Add shadow for depth
        fontSize: '16px',
      }}
      onClick={() => navigate('/cart')} // Navigate to cart page on click
    >
      🛒 <strong>{totalAmount.toFixed(2)}</strong>{' '}
      {/* Display cart icon and total amount */}
    </div>
  );
};

export default CartSummary;
