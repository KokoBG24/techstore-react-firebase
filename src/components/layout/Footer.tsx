// src/components/layout/Footer.tsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="py-5" style={{ backgroundColor: '#1a252f', color: 'white' }}>
      <Container>
        <Row>
          <Col md={4} className="mb-4">
            <h5 className="mb-3"><i className="bi bi-laptop"></i> TechStore</h5>
            <p className="text-muted">
              Вашият доверен партньор за всички електронни устройства и аксесоари. 
              Качество, гаранция и конкурентни цени.
            </p>
          </Col>
          
          <Col md={2} className="mb-4">
            <h5 className="mb-3">Магазин</h5>
            <ul className="list-unstyled">
              <li><Link to="/category/smartphones" className="text-muted text-decoration-none">Смартфони</Link></li>
              <li><Link to="/category/laptops" className="text-muted text-decoration-none">Лаптопи</Link></li>
              <li><Link to="/category/tvs" className="text-muted text-decoration-none">Телевизори</Link></li>
              <li><Link to="/category/accessories" className="text-muted text-decoration-none">Аксесоари</Link></li>
            </ul>
          </Col>
          
          <Col md={2} className="mb-4">
            <h5 className="mb-3">Поддръжка</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-muted text-decoration-none">Контакти</a></li>
              <li><a href="#" className="text-muted text-decoration-none">Доставка</a></li>
              <li><a href="#" className="text-muted text-decoration-none">Връщане</a></li>
              <li><a href="#" className="text-muted text-decoration-none">Гаранция</a></li>
            </ul>

            {/* 🔥 Социални икони под Поддръжка */}
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="footer-social facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="footer-social instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="footer-social twitter">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="footer-social youtube">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </Col>
          
          <Col md={2} className="mb-4">
            <h5 className="mb-3">Компанията</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-muted text-decoration-none">За нас</a></li>
              <li><a href="#" className="text-muted text-decoration-none">Кариери</a></li>
              <li><a href="#" className="text-muted text-decoration-none">Партньори</a></li>
              <li><a href="#" className="text-muted text-decoration-none">Блог</a></li>
            </ul>
          </Col>
          
          <Col md={2} className="mb-4">
            <h5 className="mb-3">Контакти</h5>
            <ul className="list-unstyled text-muted">
              <li><i className="bi bi-geo-alt me-2"></i> София, България</li>
              <li><i className="bi bi-telephone me-2"></i> +359 888 123 456</li>
              <li><i className="bi bi-envelope me-2"></i> info@techstore.bg</li>
            </ul>
          </Col>
        </Row>
        
        <hr className="my-4" />
        
        <Row className="align-items-center">
          <Col md={6}>
            <p className="text-muted mb-0">© 2023 TechStore. Всички права запазени.</p>
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