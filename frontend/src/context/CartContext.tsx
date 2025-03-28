import { createContext, ReactNode, useContext, useState } from 'react'; // Import React hooks and types
import { CartItem } from '../types/CartItem'; // Import CartItem type definition

// Define the shape of the cart context
interface CartContextType {
  cart: CartItem[]; // Array of items in the cart
  addToCart: (item: CartItem) => void; // Function to add items to cart
  removeFromCart: (bookId: number) => void; // Function to remove items from cart
  clearCart: () => void; // Function to clear all items from cart
}

// Create a context for cart management with undefined as initial value
const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * CartProvider component that manages cart state and provides cart functionality
 * @param {ReactNode} children - Child components that will have access to cart context
 */
export const CartProvider = ({ children }: { children: ReactNode }) => {
  // State to store cart items
  const [cart, setCart] = useState<CartItem[]>([]);

  /**
   * Add an item to the cart
   * If the item already exists, update its price (quantity)
   * Otherwise, add as a new item
   * @param {CartItem} item - The item to add to the cart
   */
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      // Check if item already exists in cart
      const existingItem = prevCart.find((c) => c.bookId === item.bookId);

      // If item exists, update its price (effectively increasing quantity)
      const updatedCart = prevCart.map((c) =>
        c.bookId === item.bookId ? { ...c, price: c.price + item.price } : c
      );

      // Return updated cart if item exists, otherwise add new item
      return existingItem ? updatedCart : [...prevCart, item];
    });
  };

  /**
   * Remove an item from the cart by its bookId
   * @param {number} bookId - ID of the book to remove
   */
  const removeFromCart = (bookId: number) => {
    setCart((prevCart) => prevCart.filter((c) => c.bookId !== bookId));
  };

  /**
   * Clear all items from the cart
   */
  const clearCart = () => {
    setCart(() => []);
  };

  // Provide cart state and functions to children components
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

/**
 * Custom hook to access cart context
 * @returns {CartContextType} Cart context with state and functions
 * @throws {Error} If used outside of CartProvider
 */
export const useCart = () => {
  const context = useContext(CartContext);
  // Ensure hook is used within CartProvider
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
