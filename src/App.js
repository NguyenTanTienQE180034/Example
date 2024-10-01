import React, { useState } from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap-icons/font/bootstrap-icons.css';

function BasicExample() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const itemExists = prevCart.find((cartItem) => cartItem.id === item.id);

      if (itemExists) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const increaseQuantity = (itemId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (itemId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === itemId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== itemId) // Xóa sản phẩm khỏi giỏ hàng
    );
  };

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <Container>
      {/* Navbar with Cart icon */}
      <Row>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container fluid>
            <Navbar.Brand href="#">Pizza house</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="#action2">About us</Nav.Link>
                <Nav.Link href="#action2">Contact</Nav.Link>
              </Nav>
              <Form className="d-flex">
                <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
                <Button variant="outline-success">Search</Button>
              </Form>
              <Button variant="outline-primary" className="ms-3" onClick={() => setShowCart(true)}>
                <i className="bi bi-cart"></i> {/* Icon giỏ hàng */}
                <span> ({cartItemCount})</span> {/* Số lượng sản phẩm trong giỏ */}
              </Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Row>
      <Row>
      <Carousel>
          <Carousel.Item interval={1000}>
            <img
              src="pizza1.jpg"
              alt="First slide"
              className="d-block w-130"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={1000}>
            <img
              src="pizza2.jpg"
              alt="First slide"
              className="d-block w-130"
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={1000}>
            <img
              src="pizza3.jpg"
              alt="First slide"
              className="d-block w-130"
            />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={1000}>
            <img
              src="pizza4.jpg"
              alt="Fourth slide"
              className="d-block w-130"
            />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={1000}>
            <img
              src="pizza5.jpg"
              alt="First slide"
              className="d-block w-130"
            />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Row>

      {/* Cards for Products */}
      <Row md={4} className="mt-5">
        {["menu1.jpg", "menu2.jpg", "menu3.jpg", "menu4.jpg"].map((image, index) => (
          <Col key={index}>
            <Card>
              <Card.Img variant="top" src={image} />
              <Card.Body>
                <Card.Title>Card Title {index + 1}</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => addToCart({ id: index + 1, title: `Item ${index + 1}` })}
                >
                  Buy
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Cart Modal */}
      <Modal show={showCart} onHide={() => setShowCart(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>{item.title}</h5>
                  <p>
                    Quantity: {item.quantity}{' '}
                    <Button variant="outline-success" onClick={() => increaseQuantity(item.id)}>
                      +
                    </Button>{' '}
                    <Button variant="outline-danger" onClick={() => decreaseQuantity(item.id)}>
                      -
                    </Button>
                  </p>
                </div>
                <Button variant="outline-danger" onClick={() => removeFromCart(item.id)}>
                  Remove
                </Button>
              </div>
            ))
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCart(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default BasicExample;
