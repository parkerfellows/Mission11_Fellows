import { useNavigate, useParams } from 'react-router-dom'; // Import hooks for navigation and URL parameters
import WelcomeBand from '../components/WelcomeBand'; // Import header component
import { useCart } from '../context/CartContext'; // Import custom hook for cart functionality
import { CartItem } from '../types/CartItem'; // Import type definition for cart items
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap'; // Import Bootstrap components
import bookImage from '../assets/bookImage.jpg'; // Import default book image

/**
 * PurchasePage component displays details about a book/project and allows adding it to cart
 */
function PurchasePage() {
  const navigate = useNavigate(); // Hook for programmatic navigation
  const { title, bookID, price } = useParams(); // Extract URL parameters
  const { addToCart } = useCart(); // Get addToCart function from cart context

  /**
   * Handles adding the current book to the cart
   * Creates a CartItem object and navigates to cart page after adding
   */
  const handleAddToCart = () => {
    // Create new cart item from URL parameters
    const newItem: CartItem = {
      bookId: Number(bookID),
      title: title || 'No Project Found', // Fallback if title is undefined
      price: Number(price),
    };
    addToCart(newItem); // Add item to cart
    navigate('/cart'); // Navigate to cart page
  };

  return (
    <>
      <WelcomeBand /> {/* Display welcome header */}
      <Container className="py-5">
        <Row>
          {/* Left column with book image */}
          <Col md={6} className="mb-4">
            <img src={bookImage} alt={title} className="img-fluid rounded" />
          </Col>
          {/* Right column with book details and action buttons */}
          <Col md={6}>
            <h2 className="fw-bold mb-3">{title}</h2> {/* Book title */}
            <h3 className="text-primary mb-4">${price}</h3> {/* Book price */}
            <p className="lead mb-4">
              This is where you could add a detailed description of the book or
              project.
            </p>
            {/* Book details list */}
            <ListGroup className="mb-4">
              <ListGroup.Item>
                <strong>Book ID: </strong> {bookID}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Format:</strong> Digital Download
              </ListGroup.Item>
            </ListGroup>
            {/* Action buttons */}
            <div className="d-grid gap-2">
              <Button
                variant="primary"
                size="lg"
                onClick={handleAddToCart}
                className="mb-2"
              >
                <i className="bi bi-cart-plus me-2"></i> {/* Cart icon */}
                Add to Cart
              </Button>
              <Button variant="outline-secondary" onClick={() => navigate(-1)}>
                <i className="bi bi-arrow-left me-2"></i>{' '}
                {/* Back arrow icon */}
                Go Back
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PurchasePage; // Export component for use in router
