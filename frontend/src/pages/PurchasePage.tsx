import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import bookImage from '../assets/bookImage.jpg';

function PurchasePage() {
  const navigate = useNavigate();
  const { title, bookID, price } = useParams();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookId: Number(bookID),
      title: title || 'No Project Found',
      price: Number(price),
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <WelcomeBand />
      <Container className="py-5">
        <Row>
          <Col md={6} className="mb-4">
            <img
              src={bookImage}
              alt={title}
              className="img-fluid rounded"
            />
          </Col>
          <Col md={6}>
            <h2 className="fw-bold mb-3">{title}</h2>
            <h3 className="text-primary mb-4">${price}</h3>
            <p className="lead mb-4">
              This is where you could add a detailed description of the book or
              project.
            </p>
            <ListGroup className="mb-4">
              <ListGroup.Item>
                <strong>Book ID: </strong> {bookID}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Format:</strong> Digital Download
              </ListGroup.Item>
            </ListGroup>
            <div className="d-grid gap-2">
              <Button
                variant="primary"
                size="lg"
                onClick={handleAddToCart}
                className="mb-2"
              >
                <i className="bi bi-cart-plus me-2"></i>
                Add to Cart
              </Button>
              <Button variant="outline-secondary" onClick={() => navigate(-1)}>
                <i className="bi bi-arrow-left me-2"></i>
                Go Back
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PurchasePage;
