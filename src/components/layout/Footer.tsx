import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="py-5" style={{ backgroundColor: "#1a252f", color: "white" }}>
      <Container>
        <Row>
          <Col md={4} className="mb-4">
            <h5 className="mb-3">
              <i className="bi bi-laptop"></i> TechStore
            </h5>
            <p className="text-muted">
              Your trusted partner for computer hardware, electronics, and accessories.
              Quality products, warranty support, and competitive prices.
            </p>
          </Col>

          <Col md={2} className="mb-4">
            <h5 className="mb-3">Shop</h5>
            <ul className="list-unstyled">
              <li><Link to="/category/smartphones" className="text-muted text-decoration-none">Smartphones</Link></li>
              <li><Link to="/category/laptops" className="text-muted text-decoration-none">Laptops</Link></li>
              <li><Link to="/category/tvs" className="text-muted text-decoration-none">TVs</Link></li>
              <li><Link to="/category/accessories" className="text-muted text-decoration-none">Accessories</Link></li>
            </ul>
          </Col>

          <Col md={2} className="mb-4">
            <h5 className="mb-3">Support</h5>
            <ul className="list-unstyled">
              <li><Link to="/about" className="text-muted text-decoration-none">Contact</Link></li>
              <li><Link to="/promotions" className="text-muted text-decoration-none">Delivery</Link></li>
              <li><Link to="/orders" className="text-muted text-decoration-none">Returns</Link></li>
              <li><Link to="/about" className="text-muted text-decoration-none">Warranty</Link></li>
            </ul>

            <div className="d-flex gap-3 mt-3">
              <a href="https://facebook.com" className="footer-social facebook" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://instagram.com" className="footer-social instagram" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://twitter.com" className="footer-social twitter" aria-label="Twitter">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="https://youtube.com" className="footer-social youtube" aria-label="YouTube">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </Col>

          <Col md={2} className="mb-4">
            <h5 className="mb-3">Company</h5>
            <ul className="list-unstyled">
              <li><Link to="/about" className="text-muted text-decoration-none">About Us</Link></li>
              <li><Link to="/about" className="text-muted text-decoration-none">Careers</Link></li>
              <li><Link to="/about" className="text-muted text-decoration-none">Partners</Link></li>
              <li><Link to="/promotions" className="text-muted text-decoration-none">Blog</Link></li>
            </ul>
          </Col>

          <Col md={2} className="mb-4">
            <h5 className="mb-3">Contact</h5>
            <ul className="list-unstyled text-muted">
              <li><i className="bi bi-geo-alt me-2"></i> Sofia, Bulgaria</li>
              <li><i className="bi bi-telephone me-2"></i> +359 888 123 456</li>
              <li><i className="bi bi-envelope me-2"></i> info@techstore.bg</li>
            </ul>
          </Col>
        </Row>

        <hr className="my-4" />

        <Row className="align-items-center">
          <Col md={6}>
            <p className="text-muted mb-0">Copyright 2023 TechStore. All rights reserved.</p>
          </Col>
          <Col md={6} className="text-md-end">
            <img
              src="https://www.pngall.com/wp-content/uploads/2/Payment-Method-PNG-Image.png"
              alt="Payment Methods"
              height="30"
            />
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
